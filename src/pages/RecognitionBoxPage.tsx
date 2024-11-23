import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { ReactComponent as CancelIcon } from '../assets/close.svg';
import { ReactComponent as CheckIcon } from '../assets/approve.svg';

const RecognitionBox: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модалки
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    const [photo, setPhoto] = useState<string | null>(null); // Сохранённая фотография
    const [result, setResult] = useState<string | null>(null); // Результат запроса

    useEffect(() => {
        const setRealVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--real-vh', `${vh}px`);
        };

        setRealVH();
        window.addEventListener('resize', setRealVH);

        return () => {
            window.removeEventListener('resize', setRealVH);
        };
    }, []);

    const capturePhoto = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setPhoto(imageSrc); // Сохраняем фотографию
                setIsModalOpen(true); // Открываем модалку
                setIsLoading(true); // Включаем лоадер

                try {
                    const response = await fetch('http://your-backend-url/api', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ image: imageSrc }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setResult(data.result); // Устанавливаем результат
                    } else {
                        console.error('Error from backend:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsLoading(false); // Отключаем лоадер
                }
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Закрываем модалку
        setPhoto(null); // Сбрасываем фотографию
        setResult(null); // Сбрасываем результат
    };

    const retakePhoto = () => {
        setPhoto(null); // Убираем текущую фотографию
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                height: 'calc(var(--real-vh, 1vh) * 100)',
                backgroundColor: 'black',
                overflow: 'hidden',
            }}
        >
            {/* Камера или фото */}
            {photo ? (
                <img
                    src={photo}
                    alt="Captured"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}

            {/* Рамка */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '80%',
                    height: '60%',
                    border: '4px solid white',
                    borderRadius: '15px',
                    zIndex: 2,
                }}
            />

            {/* Текст */}
            <div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: 0,
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    zIndex: 3,
                }}
            >
                {photo ? 'REVIEW YOUR PHOTO' : 'TAKE A PHOTO OF THE BOX'}
            </div>

            {/* Кнопки */}
            {!isModalOpen && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '5%',
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 20px',
                        boxSizing: 'border-box',
                        zIndex: 3,
                    }}
                >
                    <button
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            backgroundColor: 'transparent',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={retakePhoto}
                    >
                        <CancelIcon width="32px" height="32px" fill="white" />
                    </button>

                    <button
                        style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            backgroundColor: 'white',
                            color: 'black',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={capturePhoto}
                    >
                        <CheckIcon width="32px" height="32px" />
                    </button>
                </div>
            )}

            {/* Модалка */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '50%', // Почти весь экран
                        backgroundColor: 'white',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                        zIndex: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Кнопка закрытия */}
                    <button
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '32px',
                            height: '32px',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                        }}
                        onClick={closeModal}
                    >
                        <CancelIcon width="32px" height="32px" fill="black" />
                    </button>

                    {isLoading ? (
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                border: '4px solid #ccc',
                                borderTop: '4px solid #000',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                            }}
                        ></div>
                    ) : (
                        <div>
                            <h3>Result</h3>
                            <p>{result || 'No result available'}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecognitionBox;
