import React, { FunctionComponent } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { CollectionCategory } from "../../data/map";
import { ReactComponent as PaperMarkerIcon } from "../../assets/paper.svg";

interface Props {
  latitude: number;
  longitude: number;
  type: CollectionCategory;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
  latitude,
  longitude,
  type,
}) => {
  const position = {
    lat: latitude,
    lng: longitude,
  };

  const renderMarker = () => {
    switch (type) {
      case CollectionCategory.Paper:
        return <PaperMarkerIcon />;
    }
  };

  return (
    <>
      <AdvancedMarker position={position} title={"current location"}>
        {renderMarker()}
      </AdvancedMarker>
    </>
  );
};
