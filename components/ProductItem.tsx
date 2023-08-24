import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import Rating from "@mui/material/Rating";

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

export default function ProductItem({
  product,
  addToCartHandler,
}: {
  product: TProduct;
  addToCartHandler: Function;
}) {
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating as number} readOnly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
