import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  ListItemText,
  Link,
} from "@mui/material";
import Layout from "../components/Layout";
import { Store } from "../components/Store";
import { getError } from "../utils/error";

enum EActionType {
  FETCH_REQUEST = "FETCH_REQUEST",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_FAIL = "FETCH_FAIL",
}

interface IOrder {
  _id: string;
  user: number;
  orderItems: {
    name: string;
    quantity: number;
    image: string;
    price: number;
  }[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    location: {
      lat?: string;
      lng?: string;
      address?: string;
      name?: string;
      vicinity?: string;
      googleAddressId?: string;
    };
  };
  paymentMethod: string;
  paymentResult: { id?: string; status?: string; email_address?: string };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
}

type TState = {
  loading: boolean;
  error: string;
  orders: IOrder[];
};

type TAction =
  | {
      type: EActionType.FETCH_REQUEST;
      payload?: any;
    }
  | {
      type: EActionType.FETCH_SUCCESS;
      payload?: any;
    }
  | {
      type: EActionType.FETCH_FAIL;
      payload?: any;
    };

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const OrderHistory: NextPage = () => {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  const initialState: TState = {
    loading: true,
    orders: [],
    error: "",
  };

  const [{ loading, error, orders }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const redirectLogin = () => router.push("/login");
    if (!userInfo) {
      redirectLogin();
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: EActionType.FETCH_REQUEST });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: EActionType.FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: EActionType.FETCH_FAIL, payload: getError(err) });
      }
    };
    fetchOrders();
  }, [router, userInfo]);
  return (
    <Layout title="Order History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className="section">
            <List>
              <Link component={NextLink} href="/profile">
                <ListItemButton component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItemButton>
              </Link>
              <Link component={NextLink} href="/order-history">
                <ListItemButton selected component="a">
                  <ListItemText primary="Order History"></ListItemText>
                </ListItemButton>
              </Link>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className="section">
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Order History
                </Typography>
              </ListItem>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className="error">{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAID</TableCell>
                          <TableCell>DELIVERED</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order: IOrder) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell>
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : "not paid"}
                            </TableCell>
                            <TableCell>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : "not delivered"}
                            </TableCell>
                            <TableCell>
                              <Link
                                component={NextLink}
                                href={`/order/${order._id}`}
                              >
                                <Button variant="contained">Details</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
