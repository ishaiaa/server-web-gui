import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../pages/Desktop';
import { SocketContext } from '../../App';
import styles from './FileExplorer.module.css';

import internetIcon from '../../images/globe.svg'
import folderIcon from '../../images/folder-fill.svg'
import textIcon from '../../images/file-text-fill.svg'
import imageIcon from '../../images/image.svg'

import arrowLeftIcon from '../../images/arrow-left-short.svg'
import arrowRightIcon from '../../images/arrow-right-short.svg'
import arrowUpIcon from '../../images/arrow-up-short.svg'
import arrowRefreshIcon from '../../images/arrow-refresh.svg'

function FileExplorer(props) {
    const {darkTheme, setDarkTheme} = useContext(ThemeContext)
    const {lastMessage, sendMessage} = useContext(SocketContext)
    const [directoryData, setDirectoryData] = useState({directory: "/home/webuntu", files: []});
    function handleUpdate() {
        setDarkTheme(p => !p)
    }

    useEffect(() => {
        console.log(lastMessage)
        const data = JSON.parse(lastMessage.data);
        if(data.type==="SERVER_FILE_EXPLORER") {
            setDirectoryData(data.data)
        }

    },[lastMessage])

    function handleClick() {
        sendMessage(JSON.stringify({
            type: "CLIENT_FILE_EXPLORER",
            id: '98b98',
            pwd: "/home/zongi"
        }))
    }

    function handlePwdUp() {
        let pwdSplit = directoryData.directory.split(/(\/)/g)
        let newPwd = ""
        for(let i = 0;i<pwdSplit.length-2;i++) {
            newPwd+=pwdSplit[i]
        }
        if(newPwd.length <= 1) newPwd = "/"


        sendMessage(JSON.stringify({
            type: "CLIENT_FILE_EXPLORER",
            id: '98b98',
            pwd: newPwd
        }))
    }

    function handleChangeDirectory(address) {
        sendMessage(JSON.stringify({
            type: "CLIENT_FILE_EXPLORER",
            id: '98b98',
            pwd: address
        }))
    }

    return (
        <div className={`${styles.mainContainer} ${darkTheme && styles.darkTheme}`}>
            <div className={styles.heading}>
                <div style={{'--icon': `url(${arrowRefreshIcon})`}} className={styles.button}></div>
                <div style={{'--icon': `url(${arrowLeftIcon})`}} className={styles.button}></div>
                <div style={{'--icon': `url(${arrowRightIcon})`}} className={styles.button}></div>
                <div onClick={handlePwdUp} style={{'--icon': `url(${arrowUpIcon})`}} className={styles.button}></div>
                
                <div className={styles.adressBar}>
                    <input placeholder="Directory Path" value={directoryData ? directoryData.directory : "/home/webuntu"} type="text"></input>
                </div>

                <div className={styles.searchBar}>
                    <input placeholder="Search" type="text"></input>

                </div>
            </div>
            <div className={styles.verticalAlign}>
                <div className={styles.sidebar}>
                    <div className={styles.category}>
                        <p>Quick Access</p>
                        <div className={styles.directory}>
                            <div style={{'--icon': `url(${folderIcon})`}} className={styles.dirIcon}></div>
                            <p>Dir Title</p>
                        </div>
                    </div>
                    <div className={styles.category}>
                        <p>Bookmarks</p>
                        <div className={styles.directory}>
                            <div style={{'--icon': `url(${folderIcon})`}} className={styles.dirIcon}></div>
                            <p>Dir Title</p>
                        </div>
                    </div>
                    <div className={styles.category}>
                        <p>Other</p>
                        <div className={styles.directory}>
                            <div style={{'--icon': `url(${folderIcon})`}} className={styles.dirIcon}></div>
                            <p>Dir Title</p>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.content}>
                    <div className={styles.fileContainer}>
                    {directoryData && directoryData.files.map((fileData)=> {
                        return fileData.isDirectory ? (
                            <div onClick={()=>handleChangeDirectory(directoryData.directory + "/" + fileData.fileName)} className={styles.file}>
                                <div style={{'--icon': `url(${folderIcon})`}} className={styles.fileIcon}></div>
                                <p>{fileData.fileName}</p>
                            </div>
                        ) : (
                            <div className={styles.file}>
                                <div style={{'--icon': `url(${textIcon})`}} className={styles.fileIcon}></div>
                                <p>{fileData.fileName}</p>
                            </div>
                        )
                    })}
                    </div>
                    <div className={styles.bottomBar}>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileExplorer;