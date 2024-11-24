import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import CurrentLocationMarker from "./markers/currentLocationMarker";
import Filter from "./filter";
import { ClusteredMarkers } from "./clusteredMarkers";
import { service } from "../../api/services";
import { CollectionCategory, IMapItem } from "../../data/map";
import { useLocation } from "react-router";
import { CircularProgress, Button, Modal, Box } from "@mui/material";
import { iconMapping } from "./customMarker";

interface MapProps {}

export const DEFAULT_LNG = 33.02602093610927;
export const DEFAULT_LAT = 34.663160656079064;

const formatCategoryName = (key: string): string =>
  key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const MapComponent = (props: MapProps) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [mapItems, setMapItems] = useState<IMapItem[]>([]);
  const location = useLocation(); // Получаем переданное состояние
  const [category, setCategory] = React.useState<CollectionCategory | null>(
    location.state?.filterCategory || null, // Устанавливаем начальное значение категории
  );
  const [addButtonVisible, setAddButtonVisible] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [customMarkers, setCustomMarkers] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [selectValue, setSelectValue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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
    setLoading(true);
    service
      .getMarkers(category)
      .then((res) => {
        setMapItems(res.data.items);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  const handleMapClick = (ev: any) => {
    const { latLng } = ev?.detail;
    console.log(ev);
    const lat = latLng.lat;
    const lng = latLng.lng;

    if (addButtonVisible) {
      setModalOpen(false);
      setAddButtonVisible(false);
      setCustomMarkers([]);
    } else {
      setClickPosition({ lat, lng });
      setAddButtonVisible(true);
      setCustomMarkers((prev) => [...prev, { lat, lng }]);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const payload = {
      type: selectValue as CollectionCategory,
      description: description,
      latitude: customMarkers[customMarkers.length - 1]?.lat?.toString() || "",
      longitude: customMarkers[customMarkers.length - 1]?.lng?.toString() || "",
    };

    service
      .addMarker(payload)
      .then(() => {
        setModalOpen(false);
        setSelectValue("");
        setDescription("");
        setAddButtonVisible(false);
        setCustomMarkers([]);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 6000);
      })
      .catch((error: any) => {
        console.error("Error adding marker: ", error);
        alert("Error adding marker!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const CustomMarker = ({ lat, lng }: { lat: number; lng: number }) => {
    return (
      <Marker
        position={{ lat, lng }}
        icon={{
          url: "https://d3v8wzla6n4b2q.cloudfront.net/public/uploads/markers/8fe96dfc1759e10d15423badd3a47f0b3f98449b.png",
        }}
      />
    );
  };

  const defaultCenter = {
    lat: userLocation?.latitude ?? DEFAULT_LAT,
    lng: userLocation?.longitude ?? DEFAULT_LNG,
  };

  return (
    <div className={"h-svh relative bg-white"}>
      <div className={"absolute z-10 top-4 left-2 right-2"}>
        <Filter category={category} setCategory={setCategory} />
      </div>

      {process.env.REACT_APP_GOOGLE_MAP_KEY && (
        <APIProvider
          apiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
          version={"beta"}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "#A531B5",
                left: "50%",
                top: "50%",
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : (
            <Map
              className={"h-full"}
              defaultCenter={defaultCenter}
              onClick={handleMapClick}
              defaultZoom={13}
              mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
              disableDefaultUI
            >
              {mapItems.map((item, index) => (
                <div key={item.uid}>
                  <ClusteredMarkers mapItems={mapItems} />
                </div>
              ))}

              <CurrentLocationMarker
                width={24}
                height={24}
                longitude={userLocation?.longitude ?? DEFAULT_LNG}
                latitude={userLocation?.latitude ?? DEFAULT_LAT}
              />

              {customMarkers.map((marker, index) => (
                <CustomMarker key={index} lat={marker.lat} lng={marker.lng} />
              ))}
            </Map>
          )}
        </APIProvider>
      )}

      {addButtonVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "2",
            left: 0,
            width: "100%",
            padding: "16px",
          }}
        >
          {!modalOpen ? (
            <div
                style={{
                  position: "fixed",
                  bottom: "calc(50px + 6px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "100%",
                  maxWidth: "500px",
                  backgroundColor: "white",
                  zIndex: 20,
                  padding: "16px",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "25px 25px 0 0",
                }}

            >
              <button
                style={{
                  width: "90%",
                  height: "50px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  color: "white",
                  backgroundColor: "#A531B5",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => setModalOpen(true)}
              >
                Add new box
              </button>
            </div>
          ) : (
            <div
              style={{
                position: "fixed",
                bottom: "60px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "500px",
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "25px 25px 0 0",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>
                  Add new box
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "black",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  ✕
                </button>
              </div>
              <form>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="select-field"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Select box type
                  </label>
                  <div
                    id="select-field"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {selectValue || "Select box type"}
                    <span style={{ fontSize: "14px", color: "#aaa" }}>▼</span>
                  </div>
                  {dropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        borderRadius: "12px",
                        marginTop: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}
                    >
                      {Object.entries(iconMapping).map(([key, Icon]) => (
                        <div
                          key={key}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #f0f0f0",
                          }}
                          onClick={() => {
                            setSelectValue(key);
                            setDropdownOpen(false);
                          }}
                        >
                          {Icon}
                          <span style={{ marginLeft: "8px" }}>
                            {formatCategoryName(key)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="description-field"
                    style={{
                      display: "block",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Box description
                  </label>
                  <textarea
                    id="description-field"
                    style={{
                      width: "100%",
                      height: "80px",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "12px",
                      resize: "none",
                    }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor:
                        selectValue && description ? "#A531B5" : "#ccc",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      cursor:
                        selectValue && description ? "pointer" : "not-allowed",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                    disabled={!selectValue || !description}
                  >
                    Add new box
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
      {showNotification && (
        <div
            style={{
              position: "fixed",
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 48px)",
              maxWidth: "480px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "20px 28px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "12px",
              textAlign: "left",
            }}


        >
          <span style={{ marginRight: "16px", fontSize: "20px" }}>✅</span>
          <span style={{ flex: 1, textAlign: "left" }}>
            Thank you! The box will appear on the map after moderation. It
            usually takes a few days.
          </span>
          <button
            onClick={() => setShowNotification(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "16px",
              padding: "8px",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
