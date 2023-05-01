import React from 'react';
import styles from './WindowManager.module.css'

function WindowManager(props) {
    return (
        <div className={styles.mainContainer}>
            {props.children}
        </div>
    );
}

export default WindowManager;