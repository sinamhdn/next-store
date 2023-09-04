import NextLink from "next/link";
import React from "react";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
} from "@mui/material";

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
    <Card
      sx={{
        borderRadius: "5px",
        // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Link
        sx={{ textDecoration: "None" }}
        component={NextLink}
        href={`/product/${product.slug}`}
        passHref
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  width: "100%",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  "&:not(:hover)": {
                    textOverflow: "ellipsis",
                  },
                  "&:hover": {
                    overflow: "visible",
                    display: "inline-block",
                    animationName: "scroll-text",
                    animationDuration: "7s",
                    animationTimingFunction: "linear",
                    animationDelay: "0s",
                    animationIterationCount: "infinite",
                    animationDirection: "normal",
                  },
                  "&:focus": {
                    display: "inline-block",
                    animationName: "scroll-text",
                    animationDuration: "7s",
                    animationTimingFunction: "linear",
                    animationDelay: "0s",
                    animationIterationCount: "infinite",
                    animationDirection: "normal",
                  },
                  "@keyframes scroll-text": {
                    "0%": {
                      transform: "translateX(0%)",
                    },
                    "90%": {
                      transform: "translateX(-100%)",
                    },
                    "95%": {
                      transform: "translateX(0%)",
                    },
                    "100%": {
                      transform: "translateX(0%)",
                    },
                  },
                }}
              >
                {product.name}
              </Typography>
              <Rating
                size="small"
                value={product.rating as number}
                readOnly
              ></Rating>
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ fontSize: { md: "1rem", sm: "0.75rem", xs: "0.7rem" } }}
        >
          ${product.price}
        </Typography>
        <Button
          size="small"
          color="primary"
          sx={{ minWidth: "fit-content" }}
          onClick={() => addToCartHandler(product)}
        >
          <FontAwesomeIcon size={"lg"} icon={faCartPlus} />
        </Button>
      </CardActions>
    </Card>
  );
}
