import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";
import { getError } from "../utils/error";
import { Store } from "../components/Store";

type Library =
  | "core"
  | "maps"
  | "places"
  | "geocoding"
  | "routes"
  | "marker"
  | "geometry"
  | "elevation"
  | "streetView"
  | "journeySharing"
  | "drawing"
  | "visualization";

const defaultLocation = { lat: 45.516, lng: -73.56 };
const libs: Library[] = ["places"];

const Map: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  useEffect(() => {
    const getUserCurrentLocation = () => {
      if (!navigator.geolocation) {
        enqueueSnackbar("Geolocation is not supported by this browser", {
          variant: "error",
        });
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    };
    const fetchGoogleApiKey = async () => {
      try {
        const { data } = await axios("/api/keys/google", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setGoogleApiKey(data);
        getUserCurrentLocation();
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    };
    fetchGoogleApiKey();
  }, [enqueueSnackbar, userInfo.token]);

  interface TMap extends google.maps.Map {
    center?: {
      lat: Function;
      lng: Function;
    };
    getPlaces: Function;
  }

  const mapRef = useRef<google.maps.Map | null>(null);
  const placeRef = useRef<
    google.maps.places.SearchBox | google.maps.Map | null
  >(null);
  const markerRef = useRef<google.maps.Map | google.maps.Marker | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onIdle = () => {
    setLocation({
      lat: (mapRef?.current as TMap)?.center?.lat(),
      lng: (mapRef?.current as TMap)?.center?.lng(),
    });
  };

  const onLoadPlaces = (place: google.maps.places.SearchBox) => {
    placeRef.current = place;
  };

  const onPlacesChanged = () => {
    const place = (placeRef.current as TMap)?.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const onConfirm = () => {
    const places = (placeRef.current as TMap)?.getPlaces();
    if (places && places.length === 1) {
      dispatch({
        type: "SAVE_SHIPPING_ADDRESS_MAP_LOCATION",
        payload: {
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id,
        },
      });
      enqueueSnackbar("location selected successfully", {
        variant: "success",
      });
      router.push("/shipping");
    }
  };

  const onMarkerLoad = (marker: google.maps.Marker) => {
    markerRef.current = marker;
  };

  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address"></input>
              <button type="button" className="primary" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <CircularProgress />
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });
