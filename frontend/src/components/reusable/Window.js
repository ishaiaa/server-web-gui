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
        setIsDragged(state);
        
        if(state) props.dragStart(props.slotID)
        props.globalDrag(state)
    }

    function handleDrag(event) {
        event.stopPropagation();
        event.preventDefault();
        console.log("drag")
    }

    function handleHorizontalResize() {
        props.resizeHandler(props.slotID, props.verticalGrow, !props.horizontalGrow)
    }

    function handleVerticalResize() {
        props.resizeHandler(props.slotID, !props.verticalGrow, props.horizontalGrow)
    }

    return (
        <div   
            className={`
                ${styles.windowFrame} 
                ${props.darkTheme && styles.darkTheme} 
                ${props.darkTheme && "darkTheme"} 
                ${isDragged && styles.dragging} 
                ${props.x === 0 ? styles.left : styles.right}
                ${props.y === 0 ? styles.up : styles.down}
                ${props.horizontalGrow && styles.horizontalGrow}
                ${props.verticalGrow && styles.verticalGrow}
                ${styles.display} 
                ${!props.visible && styles.noDisplay}
            `}
            draggable="false"    
        >
            <div 
                className={styles.windowBar}
                draggable="true"    
                
                onDrag={handleDrag}  
                onDragStart={(event) => toggleDrag(event, true)}
                onDragEnd={(event) => toggleDrag(event, false)}
            >
                <div className={styles.windowBarInfo}>
                    <div style={{'--icon': `url(${props.content.icon ?? logo})`}} className={styles.windowBarIcon} />
                    <p>{props.content.title ?? "Window"}</p>
                </div>
                <div className={styles.windowBarControls}>
                    <button onClick={() => props.closeHandler(props.slotID)} className={`${styles.windowBarControl} ${styles.cross}`}           style={{'--icon': `url(${cross})`}} />
                    <button onClick={handleVerticalResize} className={`${styles.windowBarControl} ${styles.scaleVertical}`}   style={{'--icon': `url(${props.verticalGrow ? scaleDown : scaleUp})`}} />
                    <button onClick={handleHorizontalResize} className={`${styles.windowBarControl} ${styles.scaleHorizontal}`} style={{'--icon': `url(${props.horizontalGrow ? scaleDown : scaleUp})`}} />
                </div>
            </div>
            <div className={styles.windowContent}
                draggable="false"    
            >
                {props.content.render}
            </div>
        </div>
    );
}

export default Window;