import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { mapItems } from "../../data/map";
import { CustomAdvancedMarker } from "./marker";
import CurrentLocationMarker from "./markers/currentLocationMarker";

interface MapProps {}

export const DEFAULT_LNG = 33.043203321639744;
export const DEFAULT_LAT = 34.671290150121045;

const MapComponent = (props: MapProps) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ latitude, longitude });
        },

        (error) => {
          console.error("Error get user location: ", error);
        },
      );
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className={"text-3xl h-svh"}>
      {process.env.REACT_APP_GOOGLE_MAP_KEY && (
        <APIProvider
          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
          version={"beta"}
        >
          <Map
            className={"h-full"}
            defaultCenter={{
              lat: userLocation?.latitude ?? 34.671290150121045,
              lng: userLocation?.longitude ?? 33.043203321639744,
            }}
            defaultZoom={13}
            mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
          >
            {mapItems.map((item, index) => {
              return (
                <CustomAdvancedMarker
                  key={index}
                  latitude={item.location?.lat ?? DEFAULT_LAT}
                  longitude={item.location?.lng ?? DEFAULT_LNG}
                  type={item.type}
                />
              );
            })}
            <CurrentLocationMarker
              width={24}
              height={24}
              longitude={userLocation?.longitude ?? DEFAULT_LNG}
              latitude={userLocation?.latitude ?? DEFAULT_LAT}
            />
          </Map>
        </APIProvider>
      )}
    </div>
  );
};

export default MapComponent;
