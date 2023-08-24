import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Store } from "../components/Store";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { getError } from "../utils/error";

const defaultLocation = { lat: 45.516, lng: -73.56 };
const libs = ["places"];

function Map() {
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

  type TMap = {
    center: {
      lat: Function;
      lng: Function;
    };
    getPlaces: Function;
  };

  const mapRef = useRef<TMap | null>(null);
  const placeRef = useRef<TMap | null>(null);
  const markerRef = useRef<TMap | null>(null);

  const onLoad = (map: TMap) => {
    mapRef.current = map;
  };

  const onIdle = () => {
    setLocation({
      lat: mapRef.current?.center.lat(),
      lng: mapRef.current?.center.lng(),
    });
  };

  const onLoadPlaces = (place: TMap) => {
    placeRef.current = place;
  };

  const onPlacesChanged = () => {
    const place = placeRef.current?.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const onConfirm = () => {
    const places = placeRef.current?.getPlaces();
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

  const onMarkerLoad = (marker: TMap) => {
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
}

export default dynamic(() => Promise.resolve(Map), { ssr: false });
