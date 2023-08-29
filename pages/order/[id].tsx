import Image from "next/image";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { NextPage, GetStaticProps } from "next";
import React, { useContext, useEffect, useReducer } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js/dist/types/types/enums";
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Button,
  Card,
  List,
  ListItem,
} from "@mui/material";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import { Store } from "../../components/Store";

interface Props {
  params: { id: string | number };
}

interface IOrder {
  _id?: string;
  user?: number;
  orderItems?: {
    _id: string;
    name: string;
    quantity?: number;
    image: string;
    price?: number;
    slug?: string;
  }[];
  shippingAddress?: {
    fullName?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    location?: {
      lat?: string;
      lng?: string;
      address?: string;
      name?: string;
      vicinity?: string;
      googleAddressId?: string;
    };
  };
  paymentMethod?: string;
  paymentResult?: { id?: string; status?: string; email_address?: string };
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt?: string;
}

interface IState {
  loading: boolean;
  order: IOrder;
  error: string;
  successPay?: boolean;
  loadingDeliver?: boolean;
  successDeliver?: boolean;
  loadingPay?: boolean;
  errorPay?: string;
  errorDeliver?: string;
}

interface IAction {
  type?:
    | "FETCH_REQUEST"
    | "FETCH_SUCCESS"
    | "FETCH_FAIL"
    | "PAY_REQUEST"
    | "PAY_SUCCESS"
    | "PAY_FAIL"
    | "PAY_RESET"
    | "DELIVER_REQUEST"
    | "DELIVER_SUCCESS"
    | "DELIVER_FAIL"
    | "DELIVER_RESET";
  payload?: any;
}

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: "",
      };
    default:
      return state;
  }
}

const Order: NextPage<Props> = ({ params }) => {
  const orderId = params.id;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const initialState: IState = {
    loading: true,
    order: {},
    error: "",
  };
  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, initialState);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  useEffect(() => {
    const redirectLogin = () => router.push("/login");
    if (!userInfo) {
      redirectLogin();
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: { state: SCRIPT_LOADING_STATE.PENDING, message: "pending" },
        });
      };
      loadPaypalScript();
    }
  }, [
    order,
    successPay,
    successDeliver,
    orderId,
    paypalDispatch,
    router,
    userInfo,
  ]);

  const { enqueueSnackbar } = useSnackbar();

  function createOrder(data: CreateOrderData, actions: CreateOrderActions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice?.toString() ?? "0" },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data: OnApproveData, actions: OnApproveActions) {
    if (actions.order) {
      return actions.order.capture().then(async function (details) {
        try {
          dispatch({ type: "PAY_REQUEST" });
          const { data } = await axios.put(
            `/api/orders/${order._id}/pay`,
            details,
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          dispatch({ type: "PAY_SUCCESS", payload: data });
          enqueueSnackbar("Order is paid", { variant: "success" });
        } catch (err) {
          dispatch({ type: "PAY_FAIL", payload: getError(err) });
          enqueueSnackbar(getError(err), { variant: "error" });
        }
      });
    }
    return Promise.reject();
  }

  function onError(err: Record<string, unknown>) {
    enqueueSnackbar(getError(err), { variant: "error" });
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      enqueueSnackbar("Order is delivered", { variant: "success" });
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography component="h1" variant="h1">
        Order {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className="error">{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className="section">
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress?.fullName}, {shippingAddress?.address},{" "}
                  {shippingAddress?.city}, {shippingAddress?.postalCode},{" "}
                  {shippingAddress?.country}
                  &nbsp;
                  {shippingAddress?.location && (
                    <Link
                      variant="button"
                      target="_new"
                      href={`https://maps.google.com?q=${shippingAddress.location.lat},${shippingAddress.location.lng}`}
                    >
                      Show On Map
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  Status:{" "}
                  {isDelivered
                    ? `delivered at ${deliveredAt}`
                    : "not delivered"}
                </ListItem>
              </List>
            </Card>
            <Card className="section">
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
                <ListItem>
                  Status: {isPaid ? `paid at ${paidAt}` : "not paid"}
                </ListItem>
              </List>
            </Card>
            <Card className="section">
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems?.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>${item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className="section">
              <List>
                <ListItem>
                  <Typography variant="h2">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {!isPaid && (
                  <ListItem>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <div className="full-width">
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                  </ListItem>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver && <CircularProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </Button>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  return { props: { params } };
};

export default dynamic(() => Promise.resolve(Order), { ssr: false });
