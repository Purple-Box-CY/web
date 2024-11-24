import { InfoWindow, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { type Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { CustomMarker } from "./customMarker";
import { IMapItem } from "../../data/map";
import { NavLink } from "react-router";

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
  // const clusterer = useMemo(() => {
  //   if (!map) return null;
  //
  //   return new MarkerClusterer({ map });
  // }, [map]);
  //
  // useEffect(() => {
  //   if (!clusterer) return;
  //
  //   clusterer.clearMarkers();
  //   clusterer.addMarkers(Object.values(markers));
  // }, [clusterer, markers]);

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
            <p className={"mt-4"}>{selectedTree?.description}</p>
            <p className={"font-bold"}>{selectedTree?.type}</p>
          </NavLink>
        </InfoWindow>
      )}
    </>
  );
};
