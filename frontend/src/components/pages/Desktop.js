import React, { useState } from 'react';
import styles from './Desktop.module.css';

import Window from '../reusable/Window';
import WindowManager from '../reusable/WindowManager';
import TaskBar from '../reusable/TaskBar';

function Desktop(props) {
    const [darkTheme, setDarkTheme] = useState(false);

    function handleDarkTheme() {
        setDarkTheme(prev => !prev);
    }

    return (
        <div className={`${styles.mainContainer} ${darkTheme && styles.dark}`}>
            <div onClick={handleDarkTheme} className={styles.logo} />

            <WindowManager>
                <Window darkTheme={darkTheme}/>
            </WindowManager>

            <TaskBar 
                className={styles.taskbar}
                darkTheme={darkTheme}
                data={props.data ?? null}
            />
            
        </div>
    );
}
export default Desktop;