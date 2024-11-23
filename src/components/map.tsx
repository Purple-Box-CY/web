import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

interface MapProps {}

const MapComponent = (props: MapProps) => {
  const position = { lat: 34.750010483720224, lng: 32.47341310253257 };

  return (
    <div className={"text-3xl h-svh"}>
      {process.env.REACT_APP_GOOGLE_MAP_KEY && (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
          <Map
            className={"h-full"}
            defaultCenter={position}
            defaultZoom={10}
            mapId="DEMO_MAP_ID"
          >
            <AdvancedMarker position={position} />
          </Map>
        </APIProvider>
      )}
    </div>
  );
};

export default MapComponent;
