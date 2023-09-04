/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { Grid, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../components/Store";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";

const styleCarousel = {
  borderRadius: "20px",
  marginTop: "5px",
  // marginBottom: "5px",
};

interface TProduct {
  _id: string;
  image: string;
  name: string;
  rating: number;
  price: number;
  slug: string;
  featuredImage: string;
}

interface IProps {
  topRatedProducts: TProduct[];
  featuredProducts: TProduct[];
  newProducts: TProduct[];
}

const Home: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts, newProducts } = props;
  const addToCartHandler = async (product: TProduct) => {
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
    <Layout>
      <Carousel
        sx={styleCarousel}
        indicatorContainerProps={{
          style: {
            margin: "-14px",
            padding: "0",
            background: "red",
            opacity: "0",
          },
        }}
        navButtonsProps={{
          style: {
            backgroundColor: "#00000000",
            color: "#ffff",
          },
        }}
        className="mt1 feature-image--container"
        animation="slide"
        NextIcon={<NavigateNextIcon fontSize="large" />}
        PrevIcon={<NavigateBeforeIcon fontSize="large" />}
      >
        {featuredProducts.map((product: TProduct) => (
          <Link
            component={NextLink}
            key={product._id}
            href={`/product/${product.slug}`}
          >
            <img
              src={product.featuredImage}
              alt={product.name}
              className="featured-images"
            ></img>
          </Link>
        ))}
      </Carousel>
      <Typography
        sx={{
          paddingTop: "1.25em",
          paddingBottom: "0.25em",
          textAlign: "center",
          fontWeight: "700",
        }}
        variant="h2"
      >
        Popular Products
      </Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={2} sm={4} xs={6} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        sx={{
          paddingTop: "1.25em",
          paddingBottom: "0.25em",
          textAlign: "center",
          fontWeight: "700",
        }}
        variant="h2"
      >
        New Products
      </Typography>
      <Grid container spacing={3}>
        {newProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  await db.connect();

  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-numReviews"
  )
    .lean()
    .sort({
      rating: -1,
    })
    .limit(3);

  const topRatedProductsDocs = await Product.find({}, "-numReviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);

  const newProductsDocs = await Product.find({}, "-createdAt")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(18);

  await db.disconnect();

  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
      newProducts: newProductsDocs.map(db.convertDocToObj),
    },
  };
};
