import { GetServerSideProps } from "next";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { getError } from "../../../utils/error";
import { Store } from "../../../components/Store";
import Layout from "../../../components/Layout";

interface IState {
  loading: boolean;
  error: string;
  loadingUpdate?: boolean;
  errorUpdate?: string;
}

interface IAction {
  type:
    | "FETCH_REQUEST"
    | "FETCH_SUCCESS"
    | "FETCH_FAIL"
    | "UPDATE_REQUEST"
    | "UPDATE_SUCCESS"
    | "UPDATE_FAIL"
    | "UPLOAD_REQUEST"
    | "UPLOAD_SUCCESS"
    | "UPLOAD_FAIL";
  payload?: any;
}

function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

function UserEdit({ params }: { params: { id: string } }) {
  const userId = params.id;
  const { state } = useContext(Store);
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [isAdmin, setIsAdmin] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { userInfo } = state;

  useEffect(() => {
    const redirectLogin = () => router.push("/login");
    if (!userInfo) {
      redirectLogin();
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/users/${userId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          setIsAdmin(data.isAdmin);
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("name", data.name);
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      fetchData();
    }
  }, [router, setValue, userId, userInfo]);

  const submitHandler = async ({ name }: { name?: string }) => {
    closeSnackbar();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/admin/users/${userId}`,
        {
          name,
          isAdmin,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      enqueueSnackbar("User updated successfully", { variant: "success" });
      router.push("/admin/users");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout title={`Edit User ${userId}`}>
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
                  Edit User {userId}
                </Typography>
              </ListItem>
              <ListItem>
                {loading && <CircularProgress></CircularProgress>}
                {error && <Typography className="error">{error}</Typography>}
              </ListItem>
              <ListItem>
                <form onSubmit={handleSubmit(submitHandler)} className="form">
                  <List>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Name"
                            error={Boolean(errors.name)}
                            helperText={errors.name ? "Name is required" : ""}
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <FormControlLabel
                        label="Is Admin"
                        control={
                          <Checkbox
                            onClick={(e: React.FormEvent) =>
                              setIsAdmin((e.target as HTMLInputElement).checked)
                            }
                            checked={isAdmin}
                            name="isAdmin"
                          />
                        }
                      ></FormControlLabel>
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        Update
                      </Button>
                      {loadingUpdate && <CircularProgress />}
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(UserEdit), { ssr: false });
