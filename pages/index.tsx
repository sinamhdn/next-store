/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { Grid, Link, Typography } from "@mui/material";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../components/Store";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";

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
}

const Home: NextPage<IProps> = (props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts } = props;
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
      <Carousel className="mt1" animation="slide">
        {featuredProducts.map((product: TProduct) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link>
              <img
                src={product.featuredImage}
                alt={product.name}
                className="featured-images"
              ></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Typography variant="h2">Popular Products</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
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
    "-reviews"
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
};
