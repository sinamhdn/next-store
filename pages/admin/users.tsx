import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  CircularProgress,
  Grid,
  List,
  ListItemButton,
  Typography,
  Card,
  Button,
  ListItem,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@mui/material";
import { Store } from "../../components/Store";
import Layout from "../../components/Layout";
import { getError } from "../../utils/error";

type TUser = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

interface IState {
  loading: boolean;
  error: string;
  users: TUser[];
  successDelete?: boolean;
  loadingDelete?: boolean;
}

interface IAction {
  type:
    | "FETCH_REQUEST"
    | "FETCH_SUCCESS"
    | "FETCH_FAIL"
    | "DELETE_REQUEST"
    | "DELETE_SUCCESS"
    | "DELETE_FAIL"
    | "DELETE_RESET";
  payload?: any;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function AdminUsers() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const initialState: IState = {
    loading: true,
    users: [],
    error: "",
  };
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    const redirectLogin = () => router.push("/login");
    if (!userInfo) {
      redirectLogin();
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete, router, userInfo]);

  const { enqueueSnackbar } = useSnackbar();

  const deleteHandler = async (userId: string) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
      enqueueSnackbar("User deleted successfully", { variant: "success" });
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout title="Users">
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
                <ListItemButton>
                  <ListItemText primary="Orders"></ListItemText>
                </ListItemButton>
              </Link>
              <Link component={NextLink} href="/admin/products">
                <ListItemButton>
                  <ListItemText primary="Products"></ListItemText>
                </ListItemButton>
              </Link>
              <Link component={NextLink} href="/admin/users">
                <ListItemButton selected>
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
                  Users
                </Typography>
                {loadingDelete && <CircularProgress />}
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
                          <TableCell>NAME</TableCell>
                          <TableCell>EMAIL</TableCell>
                          <TableCell>ISADMIN</TableCell>
                          <TableCell>ACTIONS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user: TUser) => (
                          <TableRow key={user._id}>
                            <TableCell>{user._id.substring(20, 24)}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.isAdmin ? "YES" : "NO"}</TableCell>
                            <TableCell>
                              <Link
                                component={NextLink}
                                href={`/admin/user/${user._id}`}
                              >
                                <Button size="small" variant="contained">
                                  Edit
                                </Button>
                              </Link>{" "}
                              <Button
                                onClick={() => deleteHandler(user._id)}
                                size="small"
                                variant="contained"
                              >
                                Delete
                              </Button>
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

export default dynamic(() => Promise.resolve(AdminUsers), { ssr: false });
