import React, { useCallback, useRef } from "react";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import styles from './ImageViewer.module.css'

function ImageViewer(props) {
    const imgRef = useRef();
    const onUpdate = useCallback(({x, y, scale }) => {
      const { current: img } = imgRef;
      // check if image exists
      if (img) {
        const value = make3dTransformValue({ x, y, scale });
        img.style.setProperty("transform", value);
      }
    }, []);
    return (
        <div className={styles.mainContainer}>
            <QuickPinchZoom 
                onUpdate={onUpdate}
                inertia={true}
                shouldInterceptWheel = {event => !(event.ctrlKey || event.metaKey) && (event.ctrlKey || event.metaKey)}
                wheelScaleFactor={500}
                inertiaFriction={0.96}
                tapZoomFactor={1}
                zoomOutFactor={1}
                animationDuration={250}
                maxZoom={10}
                minZoom={0.5}
                enforceBoundsDuringZoom={false}
                centerContained={true}
                draggableUnZoomed={true}
                doubleTapZoomOutOnMaxScale={false}
                doubleTapToggleZoom={true}
                lockDragAxis={false}   
            >
                <img
                    
                    ref={imgRef}
                    alt="img"
                    src={`https://source.unsplash.com/random/300x300?${Math.floor(Math.random() * 100)}`}
                />
            </QuickPinchZoom>
        </div>
      
    );
}

export default ImageViewer;