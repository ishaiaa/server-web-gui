import React from 'react';
import styles from './TaskBar.module.css'

import logo from '../../images/logo.png'
import icon1 from '../../images/key-fill.svg'
import icon2 from '../../images/person-fill.svg'
import icon3 from '../../images/plug-fill.svg'


import terminalIcon from '../../images/terminal-fill.svg'
import internetIcon from '../../images/globe.svg'
import folderIcon from '../../images/folder-fill.svg'
import textIcon from '../../images/file-text-fill.svg'
import imageIcon from '../../images/image.svg'
import statsIcon from '../../images/bar-chart-fill.svg'
import monitorIcon from '../../images/graph-up.svg'
import settingsIcon from '../../images/gear-fill.svg'


import ModalApp from './ModalApp';

import Settings from '../applications/Settings';
import TerminalEmulator from '../applications/TerminalEmulator';
import Stats from '../applications/Stats';
import FileExplorer from '../applications/FileExplorer'
import ImageViewer from '../applications/ImageViewer';

function TaskBar(props) {

    console.log(props.darkTheme)

    return (
        <div className={`${props.darkTheme && styles.dark}`}>
            <div className={styles.taskbar}>
                <div className={styles.taskbarLeftModal} tabIndex="0">
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        title="Placeholder App"
                        description="Opens up an empty window"
                        openWindow={props.queueAdd}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={terminalIcon}
                        title="Terminal"
                        description="Opens up a terminal emulator"
                        openWindow={props.queueAdd}
                        target={<TerminalEmulator/>}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={internetIcon}
                        title="Browser"
                        description="Search the internet through server proxy"
                        openWindow={props.queueAdd}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={folderIcon}
                        title="File Explorer"
                        description="Browse files and folders on the server"
                        openWindow={props.queueAdd}
                        target={<FileExplorer data={props.data} darkTheme={props.darkTheme}/>}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={textIcon}
                        title="Text Editor"
                        description="Allows you to edit and save text"
                        openWindow={props.queueAdd}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={imageIcon}
                        title="Image Viewer"
                        description="View images from your server"
                        openWindow={props.queueAdd}
                        target={<ImageViewer />}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={statsIcon}
                        title="Statistics"
                        description="Display server statistics in a organised way"
                        openWindow={props.queueAdd}
                        target={<Stats data={props.data}/>}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={monitorIcon}
                        title="Task monitor"
                        description="View and manage all running processes"
                        openWindow={props.queueAdd}
                    />
                    <ModalApp 
                        darkTheme={props.darkTheme}
                        icon={settingsIcon}
                        title="Settings"
                        description="Manage setttings of server and web client"
                        openWindow={props.queueAdd}
                        target={<Settings />}
                    />
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