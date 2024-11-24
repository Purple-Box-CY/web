import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import CurrentLocationMarker from "./markers/currentLocationMarker";
import Filter from "./filter";
import { ClusteredMarkers } from "./clusteredMarkers";
import { service } from "../../api/services";
import { CollectionCategory, IMapItem } from "../../data/map";
import { useLocation } from "react-router";
import { CircularProgress, Button, Modal, Box } from "@mui/material";

interface MapProps {}

export const DEFAULT_LNG = 33.02602093610927;
export const DEFAULT_LAT = 34.663160656079064;

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
  const [clickPosition, setClickPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [customMarkers, setCustomMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [selectValue, setSelectValue] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);


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
    const { latLng } = ev;
    console.log(ev)
    const lat = 1;
    const lng = 1;

    if (addButtonVisible) {
      setModalOpen(false); // Закрыть модалку при повторном клике
      setAddButtonVisible(false);
    } else {
      setClickPosition({ lat, lng });
      setAddButtonVisible(true);
    }
    setCustomMarkers((prev) => [...prev, { lat, lng }]);
  };

  const handleSubmit = () => {
    setLoading(true);
    const payload = { type: selectValue, description, coordinates: clickPosition };

    // service
    //   .addMarker(payload)
    //   .then(() => {
    //     alert("Marker added successfully!");
    //     setModalOpen(false);
    //     setSelectValue("");
    //     setDescription("");
    //   })
    //   .catch((error: any) => {
    //     console.error("Error adding marker: ", error);
    //     alert("Error adding marker!");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };


  // const handleAddMarker = () => {
  //   setModalOpen(true); // Открыть модалку
  // };

  const CustomIcon = ({ lat, lng }: { lat: number; lng: number }) => {
    return (
        <Marker
            position={{ lat, lng }}
            icon={{
              url: "https://maps.google.com/mapfiles/kml/shapes/star.png", // Замените на свою кастомную иконку
              // scaledSize: { width: 32, height: 32 }, // Размер иконки
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
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            icon={{
                              url: "https://maps.google.com/mapfiles/kml/shapes/star.png", // Замените на свою иконку
                              // scaledSize: { width: 32, height: 32 },
                            }}
                        />
                    ))}
                  </Map>

              )}
            </APIProvider>
        )}

        {addButtonVisible && (
            <div
                style={{
                        position: "absolute",
                        bottom: "0",
                        left: 0,
                        width: "100%",
                        padding: "16px",}}
            >
              {!modalOpen ? (
                  <div
                      style={{
                          position: "fixed",
                          bottom: "calc(50px + 6px)",
                          left: 0,
                          width: "100%",
                          backgroundColor: "white",
                          zIndex: 20,
                          padding: "16px",
                          display: "flex",
                          justifyContent: "center",
                      }}
                  >
                      <Button
                          variant="contained"
                          color="primary"
                          style={{
                              width: "90%",
                              height: "50px",
                              fontSize: "16px",
                              textTransform: "none",
                          }}
                          onClick={() => setModalOpen(true)}
                      >
                          Добавить метку
                      </Button>
                  </div>

              ) : (
                  <div
                      style={{
                          position: "fixed",
                          bottom: "calc(50px + 6px)", // Учитываем высоту навигации + 6 пикселей
                          left: 0,
                          width: "100%",
                          backgroundColor: "white",
                          zIndex: 30, // Выше кнопки
                          boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.2)",
                          padding: "16px",
                          transition: "transform 0.3s ease-in-out", // Анимация выезда
                          transform: modalOpen ? "translateY(0)" : "translateY(100%)", // Выезд формы
                      }}
                  >
                      <div
                          style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingBottom: "16px",
                          }}
                      >
                          <h3 style={{ margin: 0 }}>Add New Box</h3>
                          <Button
                              onClick={() => {
                                  setModalOpen(false);

                                }}
                              style={{
                                  fontSize: "20px",
                                  color: "#A531B5",
                                  cursor: "pointer",
                              }}
                          >
                              ✕
                          </Button>
                      </div>
                      <form>
                          {/* Поле выбора типа */}
                          <div style={{ marginBottom: "16px" }}>
                              <label htmlFor="select-field">Select Type:</label>
                              <select
                                  id="select-field"
                                  style={{
                                      width: "100%",
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                      borderRadius: "4px",
                                      marginTop: "8px",
                                  }}
                                  value={selectValue}
                                  onChange={(e) => setSelectValue(e.target.value)}
                              >
                                  <option value="" disabled>
                                      Choose type...
                                  </option>
                                  <option value="type1">📦 Box Type 1</option>
                                  <option value="type2">🎁 Box Type 2</option>
                                  <option value="type3">📂 Box Type 3</option>
                              </select>
                          </div>

                          {/* Поле для описания */}
                          <div style={{ marginBottom: "16px" }}>
                              <label htmlFor="description-field">Description:</label>
                              <textarea
                                  id="description-field"
                                  style={{
                                      width: "100%",
                                      padding: "8px",
                                      border: "1px solid #ccc",
                                      borderRadius: "4px",
                                      marginTop: "8px",
                                      resize: "none",
                                  }}
                                  rows={4}
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                              ></textarea>
                          </div>

                          {/* Кнопка отправки */}
                          <div style={{ marginTop: "16px" }}>
                              <Button
                                  variant="contained"
                                  color="primary"
                                  style={{
                                      width: "100%",
                                      height: "50px",
                                      textTransform: "none",
                                  }}
                                  disabled={!selectValue || !description || loading}
                                  onClick={handleSubmit}
                              >
                                  {loading ? <CircularProgress size={24} /> : "Submit"}
                              </Button>
                          </div>
                      </form>
                  </div>

              )}
            </div>
        )}
      </div>
  );
};

export default MapComponent;
