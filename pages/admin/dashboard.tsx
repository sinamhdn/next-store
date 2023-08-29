import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
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
  CardContent,
  CardActions,
} from "@mui/material";
import { getError } from "../../utils/error";
import { Store } from "../../components/Store";
import Layout from "../../components/Layout";

interface IState {
  loading: boolean;
  error: string;
  summary: {
    ordersPrice: number;
    ordersCount: number;
    productsCount: number;
    usersCount: number;
    salesData: any[];
  };
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
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    const redirectLogin = () => router.push("/login");
    if (!userInfo) {
      redirectLogin();
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`, {
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
    <Layout title="Admin Dashboard">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className="section">
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItemButton selected component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItemButton>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItemButton component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItemButton>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItemButton component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItemButton>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItemButton component="a">
                  <ListItemText primary="Users"></ListItemText>
                </ListItemButton>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className="section">
            <List>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className="error">{error}</Typography>
                ) : (
                  <Grid container spacing={5}>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            ${summary.ordersPrice}
                          </Typography>
                          <Typography>Sales</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/orders" passHref>
                            <Button size="small" color="primary">
                              View sales
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.ordersCount}
                          </Typography>
                          <Typography>Orders</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/orders" passHref>
                            <Button size="small" color="primary">
                              View orders
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.productsCount}
                          </Typography>
                          <Typography>Products</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/products" passHref>
                            <Button size="small" color="primary">
                              View products
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.usersCount}
                          </Typography>
                          <Typography>Users</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/admin/users" passHref>
                            <Button size="small" color="primary">
                              View users
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </ListItem>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Sales Chart
                </Typography>
              </ListItem>
              <ListItem>
                <Bar
                  data={{
                    labels: summary.salesData.map(
                      (x: { _id: string }) => x._id
                    ),
                    datasets: [
                      {
                        label: "Sales",
                        backgroundColor: "rgba(162, 222, 208, 1)",
                        data: summary.salesData.map(
                          (x: { totalSales: number }) => x.totalSales
                        ),
                      },
                    ],
                  }}
                  options={{
                    plugins: { legend: { display: true, position: "right" } },
                  }}
                ></Bar>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
