import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { CustomMarker } from "./customMarker";
import { CollectionCategory, IMapItem } from "../../data/map";
import { NavLink } from "react-router";

import blue from "../../assets/03_blue.png";
import green from "../../assets/05_green.png";
import brown from "../../assets/02_brown.png";
import purple from "../../assets/01_purple.png";
import white_electronics from "../../assets/08_white.png";
import white_bataries from "../../assets/07_white.png";
import green_point from "../../assets/09_green.png";
import red from "../../assets/06_red.png";

export type ClusteredMarkersProps = {
  mapItems: IMapItem[];
};

/**
 * The ClusteredTreeMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredMarkers = ({ mapItems }: ClusteredMarkersProps) => {
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [selectedTreeKey, setSelectedTreeKey] = useState<string | null>(null);

  const selectedTree = useMemo(
    () =>
      mapItems && selectedTreeKey
        ? mapItems.find((t) => t.uid === selectedTreeKey)!
        : null,
    [mapItems, selectedTreeKey],
  );

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const map = useMap();
  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  useEffect(() => {
    if (!clusterer) return;

    clusterer.clearMarkers();
    clusterer.addMarkers(Object.values(markers));
  }, [clusterer, markers]);

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((markers) => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      } else {
        const { [key]: _, ...newMarkers } = markers;

        return newMarkers;
      }
    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedTreeKey(null);
  }, []);

  const handleMarkerClick = useCallback((tree: IMapItem) => {
    setSelectedTreeKey(tree.uid);
  }, []);

  const renderMarker = (type: CollectionCategory) => {
    switch (type) {
      case CollectionCategory.Paper:
        return <img className={"w-[160px]"} src={brown} alt="" />;
      case CollectionCategory.Plastic:
        return <img className={"w-[160px]"} src={blue} alt="" />;
      case CollectionCategory.Electronic:
        return <img className={"w-[160px]"} src={white_electronics} alt="" />;
      case CollectionCategory.Cloth:
        return <img className={"w-[160px]"} src={purple} alt="" />;
      case CollectionCategory.Multibox:
        return <img className={"w-[160px]"} src={red} alt="" />;
      case CollectionCategory.Glass:
        return <img className={"w-[160px]"} src={green} alt="" />;
      case CollectionCategory.GreenPoint:
        return <img className={"w-[160px]"} src={green_point} alt="" />;
      case CollectionCategory.Battery:
        return <img className={"w-[160px]"} src={white_bataries} alt="" />;
    }
  };

  return (
    <>
      {mapItems.map((mapItem) => (
        <CustomMarker
          key={mapItem.uid}
          mapItem={mapItem}
          onClick={handleMarkerClick}
          setMarkerRef={setMarkerRef}
        />
      ))}

      {selectedTreeKey && (
        <InfoWindow
          anchor={markers[selectedTreeKey]}
          onCloseClick={handleInfoWindowClose}
          maxWidth={200}
        >
          <NavLink to={`/${selectedTreeKey}`}>
            <p className={"mt-4"}>{selectedTree?.name}</p>
            <p className={"font-bold mt-1"}>{selectedTree?.description}</p>

            <div className={"flex justify-center"}>
              {selectedTree?.type && renderMarker(selectedTree?.type)}
            </div>
          </NavLink>
        </InfoWindow>
      )}
    </>
  );
};
