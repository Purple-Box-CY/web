import React from "react";
import { ReactComponent as CurrentLocationIcon } from "../../../assets/current-location.svg";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface CurrentLocationProps {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
}

const CurrentLocationMarker = (props: CurrentLocationProps) => {
  const { height, width, latitude, longitude } = props;

  return (
    <AdvancedMarker
      position={{
        lat: latitude,
        lng: longitude,
      }}
      title={"current location"}
    >
      <CurrentLocationIcon width={width} height={height} />
    </AdvancedMarker>
  );
};

export default CurrentLocationMarker;
