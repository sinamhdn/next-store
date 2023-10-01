import React from "react";
import Cookies from "js-cookie";

type TState = {
  darkMode: boolean;
  cart: {
    cartItems: any[];
    shippingAddress: {
      location: any;
      address: string;
      fullName: string;
      city: string;
      country: string;
      postalCode: number | string;
    };
    paymentMethod: string;
  };
  userInfo: any;
};

interface ContextProps {
  state: TState;
  // dispatch: React.Dispatch<React.SetStateAction<string>>;
  dispatch: React.Dispatch<{ type: string; payload?: any }>;
}

export const Store = React.createContext<ContextProps>({} as ContextProps);

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems") ? Cookies.get("cartItems") : [],
    shippingAddress: Cookies.get("shippingAddress")
      ? Cookies.get("shippingAddress")
      : { location: {} },
    paymentMethod: Cookies.get("paymentMethod")
      ? Cookies.get("paymentMethod")
      : "",
  },
  userInfo: Cookies.get("userInfo") ? Cookies.get("userInfo") : null,
};

function reducer(state: TState, action: { type: string; payload?: any }) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case "SAVE_SHIPPING_ADDRESS_MAP_LOCATION":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            location: action.payload,
          },
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value: ContextProps = { state, dispatch };
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}
