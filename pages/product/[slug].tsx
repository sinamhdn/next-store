import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import type { NextPage, GetServerSideProps } from "next";
import React, { useContext, useEffect, useCallback, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import { useSnackbar } from "notistack";
import Rating from "@mui/material/Rating";
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import Product from "../../models/Product";
import db from "../../utils/db";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import { Store } from "../../components/Store";

interface Props {
  product: {
    _id: number | string;
    name: string;
    description: string;
    image: string;
    brand: string;
    category: string;
    rating: number;
    numReviews: number;
    price: number | string;
    countInstock: number;
    slug: string;
  };
}

const ProductScreen: NextPage<Props> = (props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { product } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar("Review submitted successfully", { variant: "success" });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }, [enqueueSnackbar, product._id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className="section">
        <Link component={NextLink} href="/search" passHref>
          <Typography>back to all products</Typography>
        </Link>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100%"
            style={{ width: "100%", height: "unset" }}
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Rating value={product.rating} readOnly></Rating>
              <Link component={NextLink} href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInstock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <List>
        <ListItem>
          <Typography id="reviews" variant="h2">
            Customer Reviews
          </Typography>
        </ListItem>
        {reviews.length === 0 && <ListItem>No review</ListItem>}
        {reviews.map(
          (review: {
            _id: number | string;
            name: string;
            createdAt: string;
            rating: number;
            comment: string;
          }) => (
            <ListItem key={review._id}>
              <Grid container>
                <Grid item className="review-item">
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>
                  <Typography>{review.createdAt.substring(0, 10)}</Typography>
                </Grid>
                <Grid item>
                  <Rating value={review.rating} readOnly></Rating>
                  <Typography>{review.comment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          )
        )}
        <ListItem>
          {userInfo ? (
            <form onSubmit={submitHandler} className="review-form">
              <List>
                <ListItem>
                  <Typography variant="h2">Leave your review</Typography>
                </ListItem>
                <ListItem>
                  <TextField
                    multiline
                    variant="outlined"
                    fullWidth
                    name="review"
                    label="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e: React.SyntheticEvent) => {
                      setRating(Number((e.target as HTMLInputElement).value));
                    }}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>

                  {loading && <CircularProgress></CircularProgress>}
                </ListItem>
              </List>
            </form>
          ) : (
            <Typography variant="h2">
              Please{" "}
              <Link
                component={NextLink}
                href={`/login?redirect=/product/${product.slug}`}
              >
                login
              </Link>{" "}
              to write a review
            </Typography>
          )}
        </ListItem>
      </List>
    </Layout>
  );
};

export default ProductScreen;

export const getServerSideProps: GetServerSideProps = async (context) => {
  interface Params extends ParsedUrlQuery {
    slug: string;
  }
  const { params } = context;
  const { slug } = params as Params;

  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
};
