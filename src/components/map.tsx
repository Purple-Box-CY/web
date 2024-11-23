import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { CustomAdvancedMarker } from "./userMarker";

interface MapProps {}

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
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
          <Map
            className={"h-full"}
            defaultCenter={{
              lat: userLocation?.latitude ?? 34.671290150121045,
              lng: userLocation?.longitude ?? 33.043203321639744,
            }}
            defaultZoom={12}
            mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
          >
            <CustomAdvancedMarker
              latitude={userLocation?.latitude ?? 33.043203321639744}
              longitude={userLocation?.longitude ?? 34.671290150121045}
            />
          </Map>
        </APIProvider>
      )}
    </div>
  );
};

export default MapComponent;
