import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { ReactComponent as CancelIcon } from '../assets/close.svg';
import { ReactComponent as CheckIcon } from '../assets/approve.svg';

const RecognitionBox: React.FC = () => {
    const webcamRef = useRef<Webcam | null>(null);

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

    const capturePhoto = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log("Captured photo:", imageSrc);
        }
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
            {/* Камера */}
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

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    // background: 'rgba(0, 0, 0, 0.7)',
                    // clipPath: 'inset(20% 10% 20% 10% round 15px)',
                }}
            />
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
                TAKE A PHOTO OF THE BOX
            </div>

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
                        marginLeft: '10px',
                    }}
                    onClick={() => console.log("Cancelled")}
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
                        marginRight: '10px',
                    }}
                    onClick={capturePhoto}
                >
                    <CheckIcon width="32px" height="32px" />
                </button>

            </div>

        </div>
    );
};

export default RecognitionBox;
