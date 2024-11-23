import React, { FunctionComponent, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { ReactComponent as CurrentLocationIcon } from "../assets/current-location.svg";

interface Props {
  latitude: number;
  longitude: number;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
  latitude,
  longitude,
}) => {
  const position = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <>
      <AdvancedMarker position={position} title={"current location"}>
        <CurrentLocationIcon width={24} height={24} />
      </AdvancedMarker>
    </>
  );
};
