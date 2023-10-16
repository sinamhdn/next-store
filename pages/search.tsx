import type { GetServerSideProps } from "next";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import type { SortOrder } from "mongoose";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
  Rating,
  Pagination,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CancelIcon from "@mui/icons-material/Cancel";
import type { SelectChangeEvent } from "@mui/material";
import db from "../utils/db";
import Product from "../models/Product";
import { Store } from "../components/Store";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";

const PAGE_SIZE = 9;

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

type TProduct = {
  _id?: number | string;
  name?: string;
  category?: string;
  brand?: string;
  image?: string;
  rating?: string | number;
  price?: string | number;
  slug?: string;
};

interface ISearchProp {
  products: TProduct[];
  countProducts: number;
  categories: string[];
  brands: string[];
  pages: string;
}

const Search: NextPage<ISearchProp> = (props) => {
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;
  const { products, countProducts, categories, brands, pages } = props;

  type TFilterSearch = {
    page?: number;
    category?: string;
    brand?: string;
    sort?: string;
    min?: number;
    max?: number;
    searchQuery?: string;
    price?: string;
    rating?: number;
  };

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }: TFilterSearch) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = String(page);
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating.toString();
    if (min) query.min ? query.min : Number(query.min) === 0 ? 0 : min;
    if (max) query.max ? query.max : Number(query.max) === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const { state, dispatch } = useContext(Store);

  const categoryHandler = (e: SelectChangeEvent<string>) => {
    filterSearch({ category: e.target.value });
  };

  const pageHandler = (e: React.ChangeEvent<unknown>, page: number) => {
    filterSearch({ page });
  };

  const brandHandler = (e: SelectChangeEvent<string>) => {
    filterSearch({ brand: e.target.value });
  };

  const sortHandler = (e: SelectChangeEvent<string>) => {
    filterSearch({ sort: e.target.value });
  };

  const priceHandler = (e: SelectChangeEvent<string>) => {
    filterSearch({ price: e.target.value });
  };

  const ratingHandler = (e: SelectChangeEvent<string>) => {
    filterSearch({ rating: Number(e.target.value) });
  };

  const addToCartHandler = async (product: TProduct) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    // router.push("/cart");
  };

  return (
    <Layout title="Search">
      <Grid className="mt1" container spacing={1}>
        <Grid item xs={12} md={3}>
          <List>
            <ListItem sx={{ textAlign: "center" }}>
              <Box className="full-width">
                <FormControl
                  variant="standard"
                  className="full-width-form"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel id="category-select-standard-label">
                    <Typography>Categories</Typography>
                  </InputLabel>
                  <Select
                    fullWidth
                    value={category as string}
                    onChange={categoryHandler}
                    className="search-page-select-box"
                  >
                    <MenuItem value="all">All</MenuItem>
                    {categories &&
                      categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </ListItem>
            <ListItem sx={{ textAlign: "center" }}>
              <Box className="full-width">
                <FormControl
                  variant="standard"
                  className="full-width-form"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel id="category-select-standard-label">
                    <Typography>Brands</Typography>
                  </InputLabel>
                  <Select
                    value={brand as string}
                    onChange={brandHandler}
                    fullWidth
                    className="search-page-select-box"
                  >
                    <MenuItem value="all">All</MenuItem>
                    {brands &&
                      brands.map((brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </ListItem>
            <ListItem sx={{ textAlign: "center" }}>
              <Box className="full-width">
                <FormControl
                  variant="standard"
                  className="full-width-form"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel id="category-select-standard-label">
                    <Typography>Prices</Typography>
                  </InputLabel>
                  <Select
                    value={price as string}
                    onChange={priceHandler}
                    fullWidth
                    className="search-page-select-box"
                  >
                    <MenuItem value="all">All</MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price.value} value={price.value}>
                        {price.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </ListItem>
            <ListItem sx={{ textAlign: "center" }}>
              <Box className="full-width">
                <FormControl
                  variant="standard"
                  className="full-width-form"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <InputLabel id="category-select-standard-label">
                    <Typography>Ratings</Typography>
                  </InputLabel>
                  <Select
                    value={rating as string}
                    onChange={ratingHandler}
                    fullWidth
                    className="search-page-select-box"
                  >
                    <MenuItem value="all">All</MenuItem>
                    {ratings.map((rating) => (
                      <MenuItem
                        sx={{ dispaly: "flex" }}
                        key={rating}
                        value={rating}
                      >
                        <Rating value={rating} readOnly />
                        <Typography component="span">&amp; Up</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products.length === 0 ? "No" : countProducts} Results
              {query !== "all" && query !== "" && " : " + query}
              {category !== "all" && " : " + category}
              {brand !== "all" && " : " + brand}
              {price !== "all" && " : Price " + price}
              {rating !== "all" && " : Rating " + rating + " & up"}
              {(query !== "all" && query !== "") ||
              category !== "all" ||
              brand !== "all" ||
              rating !== "all" ||
              price !== "all" ? (
                <Button onClick={() => router.push("/search")}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="category-select-standard-label">
                  <Typography component="span" className="sort">
                    Sort by
                  </Typography>
                </InputLabel>
                <Select
                  value={sort as string}
                  onChange={sortHandler}
                  className="search-page-select-box"
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="lowest">Price: Low to High</MenuItem>
                  <MenuItem value="highest">Price: High to Low</MenuItem>
                  <MenuItem value="toprated">Customer Reviews</MenuItem>
                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid className="mt1" container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product._id}>
                <ProductItem
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            className="mt1"
            defaultPage={parseInt((router.query.page as string) || "1")}
            count={Number(pages)}
            onChange={pageHandler}
          ></Pagination>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async function ({
  query,
}) {
  await db.connect();
  const pageSize: number = Number(query.pageSize || PAGE_SIZE);
  const page: number = Number(query.page || 1);
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number((price as string).split("-")[0]),
            $lte: Number((price as string).split("-")[1]),
          },
        }
      : {};

  const order:
    | { featured: SortOrder }
    | { price: SortOrder }
    | { rating: SortOrder }
    | { createdAt: SortOrder }
    | { _id: SortOrder } =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct("category");
  const brands = await Product.find().distinct("brand");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
};
