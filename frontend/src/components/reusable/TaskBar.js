import React from 'react';
import styles from './TaskBar.module.css'

import logo from '../../images/logo.png'
import icon1 from '../../images/key-fill.svg'
import icon2 from '../../images/person-fill.svg'
import icon3 from '../../images/plug-fill.svg'

function TaskBar(props) {
    return (
        <div className={`${props.darkTheme && styles.dark}`}>
            <div className={styles.taskbar}>
                <div className={styles.taskbarLeftModal} tabIndex="0">

                </div>
                <div className={styles.taskbarRightModal} tabIndex="0">

                </div>
                <div className={styles.taskbarIcons}>
                    <div style={{'--icon': `url(${logo})`}} className={`${styles.taskbarIcon} ${styles.menuIcon}`} tabIndex="0"></div>
                    <div style={{'--icon': `url(${icon1})`}} className={styles.taskbarIcon}></div>
                    <div style={{'--icon': `url(${icon2})`}} className={styles.taskbarIcon}></div>
                    <div style={{'--icon': `url(${icon3})`}} className={styles.taskbarIcon}></div>
                </div>
                <div className={styles.taskbarTools} tabIndex="0">
                    <div className={styles.time}>
                        <p className={styles.timeH}>
                            {props.data ? `${props.data.clock.time}` : '--:--'}
                        </p>
                        <p className={styles.timeD}>
                            {props.data ? `${props.data.clock.date}` : '-/-/-'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskBar;