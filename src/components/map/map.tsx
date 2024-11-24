import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import CurrentLocationMarker from "./markers/currentLocationMarker";
import Filter from "./filter";
import { ClusteredMarkers } from "./clusteredMarkers";
import { service } from "../../api/services";
import { CollectionCategory, IMapItem } from "../../data/map";

interface MapProps {}

export const DEFAULT_LNG = 33.02602093610927;
export const DEFAULT_LAT = 34.663160656079064;

const MapComponent = (props: MapProps) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [mapItems, setMapItems] = useState<IMapItem[]>([]);

  const [category, setCategory] = React.useState<CollectionCategory | null>(
    null,
  );

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

  useEffect(() => {
    service.getMarkers().then((res) => {
      setMapItems(res.data.items);
    });
  }, [category]);

  return (
    <div className={"h-svh relative"}>
      <div className={"absolute z-10 top-4 left-2 right-2"}>
        <Filter category={category} setCategory={setCategory} />
      </div>

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
            disableDefaultUI
          >
            {mapItems.map((item, index) => {
              return (
                <div key={item.uid}>
                  <ClusteredMarkers mapItems={mapItems} />
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
