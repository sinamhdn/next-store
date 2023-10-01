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
  // useThemeProps,
} from "@mui/material";
// import { ThemeProvider, useTheme } from "@emotion/react";
// import Theme from "./Theme";

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
    <Box
      sx={{
        transition: "transform .2s",
        "&:hover": { transform: "scale(1.01)" },
      }}
    >
      <Card
        sx={{
          borderRadius: "10px",
          // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Link
          sx={{
            textDecoration: "None",
            color: "unset",
            backgroundColor: "unset",
            "&:hover": {
              color: "unset",
              backgroundColor: "unset",
            },
            "&:focus": {
              color: "unset",
              backgroundColor: "unset",
            },
          }}
          component={NextLink}
          href={`/product/${product.slug}`}
          passHref
        >
          <CardActionArea
            sx={{
              color: "unset",
            }}
          >
            <CardMedia
              component="img"
              image={product.image}
              title={product.name}
            ></CardMedia>
          </CardActionArea>
        </Link>
      </Card>
      <Card
        sx={{
          borderRadius: "10px",
          margin: "4px 0",
          // boxShadow: "5px 5px 10px #bebebe, -5px -5px 10px #ffffff",
          // "&light": { backgroundColor: "#cccccc" },
          // backgroundColor: "#EADCA6",
          // boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Link
          sx={{
            textDecoration: "None",
            color: "unset",
            backgroundColor: "unset",
            "&:hover": {
              color: "unset",
              backgroundColor: "unset",
            },
            "&:focus": {
              color: "unset",
              backgroundColor: "unset",
            },
          }}
          component={NextLink}
          href={`/product/${product.slug}`}
          passHref
        >
          <CardActionArea
            sx={{
              color: "unset",
            }}
          >
            <CardContent>
              <Box sx={{ overflow: "hidden" }}>
                <Typography
                  sx={{
                    color: "text.primary",
                    // fontWeight: 700,
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
      </Card>
      <Card sx={{ borderRadius: "10px" }}>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
    </Box>
  );
}
