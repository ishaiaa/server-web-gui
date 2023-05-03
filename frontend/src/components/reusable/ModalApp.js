import React from 'react';
import styles from './ModalApp.module.css'

import defaultIcon from '../../images/window.svg'

function ModalApp(props) {
    function handleWindowOpen() {
        props.openWindow({
            icon: props.icon ?? defaultIcon,
            title: props.title ?? "Window",
            render: <p>{props.description ?? "No description"}</p>
        })
    }
    
    return (
        <div onClick={handleWindowOpen} className={`${styles.application} ${props.darkTheme && styles.dark}`}>
            <div style={{'--icon': `url(${props.icon ?? defaultIcon})`}} className={styles.applicationIcon}></div>
            <div className={styles.applicationName}>
                <p className={styles.applicationTitle}>{props.title ?? "Placeholder"}</p>
                <p className={styles.applicationDescription}>{props.description ?? ""}</p>
            </div>
        </div>
    );
}

export default ModalApp;