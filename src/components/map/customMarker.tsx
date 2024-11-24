import type { Marker } from "@googlemaps/markerclusterer";
import React, { useCallback } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { CollectionCategory, IMapItem } from "../../data/map";
import { ReactComponent as PaperMarkerIcon } from "../../assets/paper.svg";
import { ReactComponent as PlasticMarkerIcon } from "../../assets/plastic.svg";
import { ReactComponent as ClothMarkerIcon } from "../../assets/cloth.svg";
import { ReactComponent as ElectronicDevicesMarkerIcon } from "../../assets/electronic_devices.svg";
import { ReactComponent as BatteriesMarkerIcon } from "../../assets/batteries.svg";
import { ReactComponent as GlassMarkerIcon } from "../../assets/glass.svg";
import { ReactComponent as GreenPointsMarkerIcon } from "../../assets/green_points.svg";
import { ReactComponent as MultiboxMarkerIcon } from "../../assets/multibox.svg";

export const iconMapping = {
  [CollectionCategory.Paper]: <PaperMarkerIcon />,
  [CollectionCategory.Plastic]: <PlasticMarkerIcon />,
  [CollectionCategory.Electronic]: <ElectronicDevicesMarkerIcon />,
  [CollectionCategory.Cloth]: <ClothMarkerIcon />,
  [CollectionCategory.Multibox]: <MultiboxMarkerIcon />,
  [CollectionCategory.Glass]: <GlassMarkerIcon />,
  [CollectionCategory.GreenPoint]: <GreenPointsMarkerIcon />,
  [CollectionCategory.Battery]: <BatteriesMarkerIcon />,
};


export type CustomMarkerProps = {
  mapItem: IMapItem;
  onClick: (mapItem: IMapItem) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

/**
 * Wrapper Component for an AdvancedMarker for a single mapItem.
 */
export const CustomMarker = (props: CustomMarkerProps) => {
  const { mapItem, onClick, setMarkerRef } = props;

  const handleClick = useCallback(() => onClick(mapItem), [onClick, mapItem]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, mapItem.uid),
    [setMarkerRef, mapItem.uid],
  );

  const renderMarker = () => {
    switch (mapItem.type) {
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
    <AdvancedMarker position={mapItem.location} ref={ref} onClick={handleClick}>
      {renderMarker()}
    </AdvancedMarker>
  );
};
