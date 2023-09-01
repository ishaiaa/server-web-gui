import React, { useState, useEffect } from 'react';
import styles from './Desktop.module.css';
import Window from '../reusable/Window';
import WindowManager from '../reusable/WindowManager';
import TaskBar from '../reusable/TaskBar';

export const ThemeContext = React.createContext(null)

function Desktop(props) {
    const [darkTheme, setDarkTheme] = useState(false);
    
    const [windowQueue, setWindowQueue] = useState(null);

    useEffect(() => {
        setDarkTheme(false);
    }, [])

    function handleQueueClear() {
        setWindowQueue(null)
    }

    function handleQueueAdd(content) {
        setWindowQueue(content)
    }

    function handleDarkTheme() {
        setDarkTheme(p => !p);
    }

    return (
        <ThemeContext.Provider value={{darkTheme: darkTheme, setDarkTheme: setDarkTheme}}>
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
        </ThemeContext.Provider>
    );
}
export default Desktop;