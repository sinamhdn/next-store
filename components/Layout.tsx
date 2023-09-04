import React, { useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Store } from "../components/Store";
import { getError } from "../utils/error";
import type { ReactNode } from "react";

export const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function Layout({
  title,
  global_title,
  description,
  children,
}: {
  title?: string;
  global_title?: string;
  description?: string;
  children?: ReactNode;
}) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

  const [sidbarVisible, setSidebarVisible] = useState(false);

  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [query, setQuery] = useState("");

  const queryChangeHandler: React.ChangeEventHandler<HTMLElement> = (
    e: React.ChangeEvent<HTMLElement>
  ) => {
    setQuery((e.target as HTMLInputElement)?.value);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

  const loginClickHandler: React.MouseEventHandler = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget as HTMLAnchorElement);
  };

  const loginMenuCloseHandler = (e: React.MouseEvent, redirect: string) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippinhAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Store` : "Store"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <AppBar position="sticky" className="navbar">
        <Toolbar className="toolbar">
          <Box display="flex" alignItems="center">
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={sidebarOpenHandler}
              className="menu-button"
            >
              <MenuIcon className="navbar-button" />
            </IconButton>
            <Link
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
                textDecoration: "none",
                "&:hover": {
                  filter: "brightness(80%)",
                },
              }}
              component={NextLink}
              href="/"
            >
              <FontAwesomeIcon icon={faBox} size="lg" />
              <Typography
                sx={{
                  padding: "0 0.25rem",
                }}
                className="brand"
              >
                {global_title ? `${global_title} Store` : "Store"}
              </Typography>
            </Link>
          </Box>
          <Drawer
            anchor="left"
            open={sidbarVisible}
            onClose={sidebarCloseHandler}
          >
            <List>
              <ListItem>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Shopping by category</Typography>
                  <IconButton aria-label="close" onClick={sidebarCloseHandler}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              </ListItem>
              <Divider light />
              {categories.map((category) => (
                <Link
                  component={NextLink}
                  key={category}
                  href={`/search?category=${category}`}
                >
                  <ListItemButton component="a" onClick={sidebarCloseHandler}>
                    <ListItemText primary={category}></ListItemText>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Drawer>

          <div className="search-section">
            <form onSubmit={submitHandler} className="search-form">
              <InputBase
                name="query"
                className="search-input"
                placeholder="Search products"
                onChange={queryChangeHandler}
              />
              <IconButton
                type="submit"
                className="icon-button"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </form>
          </div>
          <div>
            <Switch
              checked={darkMode}
              onChange={darkModeChangeHandler}
              className="mode-checkbox"
            ></Switch>
            <Link
              sx={{
                textDecoration: "none",
                "&:hover": { filter: "brightness(75%)" },
              }}
              component={NextLink}
              href="/cart"
            >
              <Typography component="span">
                {cart.cartItems.length > 0 ? (
                  <Badge color="secondary" badgeContent={cart.cartItems.length}>
                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                  </Badge>
                ) : (
                  <FontAwesomeIcon icon={faCartShopping} size="lg" />
                )}
              </Typography>
            </Link>
            {userInfo ? (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={loginClickHandler}
                  className="navbar-button"
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem
                    sx={{ hover: { filter: "brightness(80%)" } }}
                    onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    sx={{ hover: { filter: "brightness(80%)" } }}
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                  >
                    Order Hisotry
                  </MenuItem>
                  {userInfo.isAdmin && (
                    <MenuItem
                      sx={{ hover: { filter: "brightness(80%)" } }}
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/admin/dashboard")
                      }
                    >
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <MenuItem
                    sx={{ hover: { filter: "brightness(80%)" } }}
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link
                sx={{ hover: { filter: "brightness(80%)" } }}
                component={NextLink}
                href="/login"
              >
                <Typography component="span">Login</Typography>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container className="main">{children}</Container>
      <Container
        className="footer-container"
        sx={{ marginTop: "15px", marginBottom: "5px" }}
      >
        <footer className="footer">
          <Typography>All rights reserved. Store.</Typography>
        </footer>
      </Container>
    </div>
  );
}
