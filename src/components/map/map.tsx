import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { IMapItem, mapItems } from "../../data/map";
import { CustomAdvancedMarker } from "./marker";
import CurrentLocationMarker from "./markers/currentLocationMarker";

interface MapProps {}

export const DEFAULT_LNG = 33.02602093610927;
export const DEFAULT_LAT = 34.663160656079064;

const MapComponent = (props: MapProps) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [selectedMarker, setSelectedMarker] = useState<IMapItem | null>(null);

  const onMarkerClick = (marker: IMapItem) => {
    setSelectedMarker(marker);
  };
  // TODO detect current user position
  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //
  //         setUserLocation({ latitude, longitude });
  //       },
  //
  //       (error) => {
  //         console.error("Error get user location: ", error);
  //       },
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser");
  //   }
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     getUserLocation();
  //   }, 1000);
  // }, []);

  const [openedInfoId, setOpenedInfoId] = useState<string | null>(null);

  return (
    <div className={"h-svh"}>
      {process.env.REACT_APP_GOOGLE_MAP_KEY && (
        <APIProvider
          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
          version={"beta"}
        >
          <Map
            className={"h-full"}
            defaultCenter={{
              lat: userLocation?.latitude ?? DEFAULT_LAT,
              lng: userLocation?.longitude ?? DEFAULT_LNG,
            }}
            defaultZoom={13}
            mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
          >
            {mapItems.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    onMarkerClick(item);
                  }}
                >
                  <CustomAdvancedMarker
                    key={index}
                    id={item.id}
                    latitude={item.location?.lat ?? DEFAULT_LAT}
                    longitude={item.location?.lng ?? DEFAULT_LNG}
                    type={item.type}
                    description={item.description}
                    openedInfoId={openedInfoId}
                    setOpenedInfoId={setOpenedInfoId}
                  />
                </div>
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
