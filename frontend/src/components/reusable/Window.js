import React, { useState } from 'react';
import styles from './Window.module.css'

import logo from '../../images/person-fill.svg'
import cross from '../../images/x-lg.svg';
import scaleUp from '../../images/arrows-expand.svg'
import scaleDown from '../../images/arrows-collapse.svg'

function Window(props) {

    const [isDragged, setIsDragged] = useState(false);
    const [position, setPosition] = useState([30, 30]);
    const [size, setSize] = useState([30, 30]);

    const placeholder = document.createElement("div")


    function toggleDrag(event, state) {
        event.dataTransfer.setDragImage(placeholder,0,0);
        console.log(state)
        setIsDragged(state);
    }

    function handleDrag(event) {
        console.log("drag")
        event.preventDefault();
    }

    return (
        <div   
        className={`${styles.windowFrame} ${props.darkTheme && styles.darkTheme} ${isDragged && styles.dragging}`}
        >
            <div 
                className={styles.windowBar}
                draggable="true"    
                 
                onDrag={handleDrag}  
                onDragStart={(event) => toggleDrag(event, true)}
                onDragEnd={(event) => toggleDrag(event, false)}
            >
                <div className={styles.windowBarInfo}>
                    <div style={{'--icon': `url(${logo})`}} className={styles.windowBarIcon} />
                    <p>WindowTitle</p>
                </div>
                <div className={styles.windowBarControls}>
                    <button className={`${styles.windowBarControl} ${styles.cross}`}           style={{'--icon': `url(${cross})`}} />
                    <button className={`${styles.windowBarControl} ${styles.scaleVertical}`}   style={{'--icon': `url(${scaleUp})`}} />
                    <button className={`${styles.windowBarControl} ${styles.scaleHorizontal}`} style={{'--icon': `url(${scaleDown})`}} />
                </div>
            </div>
            <div className={styles.windowContent}>
                
            </div>
        </div>
    );
}

export default Window;