import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@mui/material";
import { getError } from "../../utils/error";
import { Store } from "../../components/Store";
import Layout from "../../components/Layout";

type TOrder = {
  _id: string;
  user: { name: string };
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: string;
  deliveredAt: string;
};

interface IState {
  loading: boolean;
  orders: TOrder[];
  error: string;
  userInfo?: any;
}

interface IAction {
  type: "FETCH_REQUEST" | "FETCH_SUCCESS" | "FETCH_FAIL";
  payload?: any;
}

function reducer(state: IState, action: IAction) {
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

function AdminOrders() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const initialState: IState = {
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
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [router, userInfo]);
  return (
    <Layout title="Orders">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className="section">
            <List>
              <Link component={NextLink} href="/admin/dashboard">
                <ListItemButton>
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItemButton>
              </Link>
              <Link component={NextLink} href="/admin/orders">
                <ListItemButton selected>
                  <ListItemText primary="Orders"></ListItemText>
                </ListItemButton>
              </Link>
              <Link component={NextLink} href="/admin/products">
                <ListItemButton>
                  <ListItemText primary="Products"></ListItemText>
                </ListItemButton>
              </Link>
              <Link component={NextLink} href="/admin/users">
                <ListItemButton>
                  <ListItemText primary="Users"></ListItemText>
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
                  Orders
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
                          <TableCell>USER</TableCell>
                          <TableCell>DATE</TableCell>
                          <TableCell>TOTAL</TableCell>
                          <TableCell>PAID</TableCell>
                          <TableCell>DELIVERED</TableCell>
                          <TableCell>ACTION</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order: TOrder) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id.substring(20, 24)}</TableCell>
                            <TableCell>
                              {order.user ? order.user.name : "DELETED USER"}
                            </TableCell>
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
}

export default dynamic(() => Promise.resolve(AdminOrders), { ssr: false });
