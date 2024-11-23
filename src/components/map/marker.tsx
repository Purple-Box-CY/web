import React, { FunctionComponent } from "react";
import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import { CollectionCategory } from "../../data/map";
import { ReactComponent as PaperMarkerIcon } from "../../assets/paper.svg";
import { ReactComponent as PlasticMarkerIcon } from "../../assets/plastic.svg";
import { ReactComponent as ClothMarkerIcon } from "../../assets/cloth.svg";
import { ReactComponent as ElectronicDevicesMarkerIcon } from "../../assets/electronic_devices.svg";
import { ReactComponent as BatteriesMarkerIcon } from "../../assets/batteries.svg";
import { ReactComponent as GlassMarkerIcon } from "../../assets/glass.svg";
import { ReactComponent as GreenPointsMarkerIcon } from "../../assets/green_points.svg";
import { ReactComponent as MultiboxMarkerIcon } from "../../assets/multibox.svg";
import {NavLink} from "react-router";

interface Props {
  latitude: number;
  longitude: number;
  type: CollectionCategory;
  description: string;
  id: string;
  openedInfoId: string | null;
  setOpenedInfoId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
  latitude,
  longitude,
  type,
  description,
  id,
  setOpenedInfoId,
  openedInfoId,
}) => {
  const position = {
    lat: latitude,
    lng: longitude,
  };

  const renderMarker = () => {
    switch (type) {
      case CollectionCategory.Paper:
        return <PaperMarkerIcon />;
      case CollectionCategory.Plastic:
        return <PlasticMarkerIcon />;
      case CollectionCategory.Electronic:
        return <ElectronicDevicesMarkerIcon />;
      case CollectionCategory.Cloth:
        return <ClothMarkerIcon />;
      case CollectionCategory.Multibox:
        return <MultiboxMarkerIcon />;
      case CollectionCategory.Glass:
        return <GlassMarkerIcon />;
      case CollectionCategory.GreenPoint:
        return <GreenPointsMarkerIcon />;
      case CollectionCategory.Battery:
        return <BatteriesMarkerIcon />;
    }
  };

  return (
    <>
      <AdvancedMarker
        onClick={() => {
          setOpenedInfoId(id);
        }}
        position={position}
        title={"current location"}
      >
        {renderMarker()}

        {openedInfoId === id && (
          <InfoWindow
            onClose={() => {
              setOpenedInfoId(null);
            }}
            position={position}
            maxWidth={200}
          >
            <NavLink to={'/box-item'}>
              <p className={"mt-4"}>{description}</p>
              <p className={"font-bold"}>{type}</p>
            </NavLink>
          </InfoWindow>
        )}
      </AdvancedMarker>
    </>
  );
};
