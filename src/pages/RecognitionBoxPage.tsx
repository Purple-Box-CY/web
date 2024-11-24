import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { ReactComponent as CancelIcon } from "../assets/close.svg";
import { ReactComponent as CheckIcon } from "../assets/approve.svg";
import { ReactComponent as CheckSmallIcon } from "../assets/close_small.svg";
import { ReactComponent as RecogniteIcon } from "../assets/recognite.svg";
import { camera } from "../api/services";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PaperMarkerIcon } from "../assets/paper.svg";
import { ReactComponent as PlasticMarkerIcon } from "../assets/plastic.svg";
import { ReactComponent as ClothMarkerIcon } from "../assets/cloth.svg";
import { ReactComponent as ElectronicDevicesMarkerIcon } from "../assets/electronic_devices.svg";
import { ReactComponent as BatteriesMarkerIcon } from "../assets/batteries.svg";
import { ReactComponent as GlassMarkerIcon } from "../assets/glass.svg";

enum CollectionCategory {
  Plastic = "plastic",
  Glass = "glass",
  Paper = "paper",
  Cloth = "cloth",
  Electronic = "electronic",
  Battery = "battery",
  None = "None",
}

const renderIcon = (type: CollectionCategory) => {
  switch (type.toLowerCase()) {
    case CollectionCategory.Plastic:
      return <PlasticMarkerIcon style={{ width: "32px", height: "32px" }} />;
    case CollectionCategory.Glass:
      return <GlassMarkerIcon style={{ width: "32px", height: "32px" }} />;
    case CollectionCategory.Paper:
      return <PaperMarkerIcon style={{ width: "32px", height: "32px" }} />;
    case CollectionCategory.Cloth:
      return <ClothMarkerIcon style={{ width: "32px", height: "32px" }} />;
    case CollectionCategory.Electronic:
      return (
        <ElectronicDevicesMarkerIcon
          style={{ width: "32px", height: "32px" }}
        />
      );
    case CollectionCategory.Battery:
      return <BatteriesMarkerIcon style={{ width: "32px", height: "32px" }} />;
  }
};

const RecognitionBox: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модалки
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const [photo, setPhoto] = useState<string | null>(null); // Сохранённая фотография
  const [result, setResult] = useState<string | null>(null); // Результат запроса
  const [value, setValue] = useState<string | null>(null); // Результат запроса

  const navigate = useNavigate();

  useEffect(() => {
    const setRealVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--real-vh", `${vh}px`);
    };

    setRealVH();
    window.addEventListener("resize", setRealVH);

    return () => {
      window.removeEventListener("resize", setRealVH);
    };
  }, []);

  const capturePhoto = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhoto(imageSrc);
        setIsModalOpen(true);
        setIsLoading(true);

        try {
          const formData = new FormData();
          formData.append("image", imageSrc);

          const response = await camera.getRecognitionItem(imageSrc, "box");
          console.log("response", response);
          if (response?.data) {
            console.log(response.data.data);
            setResult(response.data.data.category);
            setValue(response.data.data.value);
          } else {
            console.error("Error from backend: Invalid response");
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPhoto(null);
    setResult(null);
  };

  const retakePhoto = () => {
    setPhoto(null);
    navigate("/");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "calc(var(--real-vh, 1vh) * 100)",
        backgroundColor: "black",
        overflow: "hidden",
        maxWidth: "500px",
      }}
    >
      {/* Камера или фото */}
      {photo ? (
        <img
          src={photo}
          alt="Captured"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "environment",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {/* Рамка */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "80%",
          height: "60%",
          border: "4px solid white",
          borderRadius: "15px",
          zIndex: 2,
        }}
      />

      {/* Текст */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: 0,
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          zIndex: 3,
        }}
      >
        {photo ? "REVIEW YOUR PHOTO" : "TAKE A PHOTO OF THE BOX"}
      </div>

      {!isModalOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
            boxSizing: "border-box",
            zIndex: 3,
          }}
        >
          <button
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "2px solid white",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={retakePhoto}
          >
            <CancelIcon width="32px" height="32px" fill="white" />
          </button>

          <button
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              border: "2px solid white",
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={capturePhoto}
          >
            <CheckIcon width="32px" height="32px" />
          </button>
        </div>
      )}

      {isModalOpen && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "60%",
            backgroundColor: "white",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "40px",
              height: "40px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
            onClick={closeModal}
          >
            <CheckSmallIcon width="40px" height="40px" fill="black" />
          </button>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <RecogniteIcon width="60px" height="60px" />

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "40px",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                One moment...
              </p>

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  border: "6px solid #ccc",
                  borderTop: "6px solid #000",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <RecogniteIcon width="60px" height="60px" />
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: "40px",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                My answer is
              </p>

              {result?.toLowerCase() === CollectionCategory.None || !result ? (
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "40px",
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  I don't recognize the box in the photo
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {renderIcon(result as CollectionCategory)}
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "24px",
                      lineHeight: "40px",
                      color: "#000",
                      textAlign: "center",
                    }}
                  >
                    {result}
                  </p>
                </div>
              )}
            </div>
          )}
          {result && result.toLowerCase() !== "none" && (
            <>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "#4A90E2",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  width: "calc(100% - 40px)",
                  maxWidth: "400px",
                }}
                onClick={() => navigate(`/info/${value}`)}
              >
                Read more
              </button>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "#2ECC71",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "center",
                  width: "calc(100% - 40px)",
                  maxWidth: "400px",
                }}
                onClick={() =>
                  navigate("/", { state: { filterCategory: result } })
                }
              >
                Find on map
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecognitionBox;
