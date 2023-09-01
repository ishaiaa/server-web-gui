import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../pages/Desktop';
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

    function handleUpdate() {
        setDarkTheme(p => !p)
    }

    return (
        <div className={`${styles.mainContainer} ${darkTheme && styles.darkTheme}`}>
            <div className={styles.heading}>
                <div style={{'--icon': `url(${arrowRefreshIcon})`}} className={styles.button}></div>
                <div style={{'--icon': `url(${arrowLeftIcon})`}} className={styles.button}></div>
                <div style={{'--icon': `url(${arrowRightIcon})`}} className={styles.button}></div>
                <div style={{'--icon': `url(${arrowUpIcon})`}} className={styles.button}></div>
                
                <div className={styles.adressBar}>
                    <input placeholder="Directory Path" value="/home/webuntu" type="text"></input>
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
                    {[...Array(20).keys()].map((i)=> {
                        return (
                            <div className={styles.file}>
                                <div style={{'--icon': `url(${i%5 === 1 ? textIcon : folderIcon})`}} className={styles.fileIcon}></div>
                                <p>{i%5 === 1 ? `File Title (${i+1})` : `Folder Title (${i+1})`}</p>
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