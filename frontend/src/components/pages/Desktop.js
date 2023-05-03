import React, { useState } from 'react';
import styles from './Desktop.module.css';

import Window from '../reusable/Window';
import WindowManager from '../reusable/WindowManager';
import TaskBar from '../reusable/TaskBar';

function Desktop(props) {
    const [darkTheme, setDarkTheme] = useState(false);
    
    const [windowQueue, setWindowQueue] = useState(null);

    function handleQueueClear() {
        setWindowQueue(null)
    }

    function handleQueueAdd(content) {
        setWindowQueue(content)
    }

    function handleDarkTheme() {
        setDarkTheme(prev => !prev);
    }

    return (
        <div className={`${styles.mainContainer} ${darkTheme && styles.dark}`}>
            <div onClick={handleDarkTheme} className={styles.logo} />

            <WindowManager
                queue={windowQueue}
                queueClear={handleQueueClear}
                darkTheme={darkTheme}
            />

            <TaskBar 
                className={styles.taskbar}
                darkTheme={darkTheme}
                queueAdd={handleQueueAdd}
                data={props.data ?? null}
            />
            
        </div>
    );
}
export default Desktop;