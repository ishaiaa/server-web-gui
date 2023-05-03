import React, { useEffect, useState } from 'react';
import styles from './WindowManager.module.css'
import * as wmgr from '../../modules/WindowBehaviour'

import Window from './Window';

function WindowManager(props) {

    const [dragState, setDragState] = useState(false)
    const [slotDraggedOn, setSlotDraggedOn] = useState(-1)
    const [dragStartSlot, setDragStartSlot] = useState(-1)

    const [windowsData, setWindowsData] = useState(wmgr.getInitialArray())

    function handleDragOn(id, event) {
        event.stopPropagation();
        event.preventDefault();

        console.log("drag on ")
        console.log(id)

        setSlotDraggedOn(id)
    }

    function handleDragStart(id) {
        setDragStartSlot(id)
    }

    function handleDragState(state) {
        setDragState(state)
    }

    function handleDrop(id, event) {
        event.stopPropagation();
        event.preventDefault();
        
        setWindowsData(prev => {
            let newData = wmgr.calculateMovement(dragStartSlot, id, prev)
            return prev.map((element, index) => { return {...newData[index]}})
        })
    }

    function handleWindowResize(id, vertical, horizontal) {
        setWindowsData(prev => {
            let newData = wmgr.calculateResize(id,vertical,horizontal,prev)
            return prev.map((element, index) => { return {...newData[index]}})
        })
    }

    function handleOpenWindow(content) {
        console.log("NEW WINDOW TO OPEN")
        console.log(content)
        setWindowsData(prev => {
            let newData = wmgr.openNewWindow(content ?? null, prev)
            return prev.map((element, index) => { return {...newData[index]}})
        })
    }

    function handleCloseWindow(id) {
        setWindowsData(prev => {
            let newData = wmgr.closeWindow(id, prev)
            return prev.map((element, index) => { return {...newData[index]}})
        })
    }

    useEffect(() => {
        setSlotDraggedOn(-1)
    }, [dragState])


    //handle windowQueue
    useEffect(() => {
        if(props.queue !== null) {
            handleOpenWindow(props.queue)
            props.queueClear()
        }
    }, [props.queue])

    // useEffect(() => {
    //     setWindowsData(prev => {
    //         prev.map(element=> {
    //             if(element.tileID > 2) return {...element, active:true}
    //             return {...element}
    //         })
    //     })
    // }, [dragState])

    return (
        <div className={styles.mainContainer}>
            <div className={`${styles.grid} ${dragState && styles.drag}`}>
                <div className={styles.row}>
                    <div 
                        onDragEnter={(event) => handleDragOn(0, event)} 
                        onDragOver={(event) => {event.preventDefault()}}
                        onDrop={(event) => handleDrop(0, event)}
                        className={`${styles.slot} ${slotDraggedOn === 0 && styles.dragOn}`}>

                    </div>
                    <div 
                        onDragEnter={(event) => handleDragOn(1, event)} 
                        onDragOver={(event) => {event.preventDefault()}}
                        onDrop={(event) => handleDrop(1, event)}
                        className={`${styles.slot} ${slotDraggedOn === 1 && styles.dragOn}`}>

                    </div>
                </div>
                <div className={styles.row}>
                    <div 
                        onDragEnter={(event) => handleDragOn(2, event)} 
                        onDragOver={(event) => {event.preventDefault()}}
                        onDrop={(event) => handleDrop(2, event)}
                        className={`${styles.slot} ${slotDraggedOn === 2 && styles.dragOn}`}>

                    </div>
                    <div 
                        onDragEnter={(event) => handleDragOn(3, event)} 
                        onDragOver={(event) => {event.preventDefault()}}
                        onDrop={(event) => handleDrop(3, event)}
                        className={`${styles.slot} ${slotDraggedOn === 3 && styles.dragOn}`}>

                    </div>
                </div>
            </div>
            {windowsData.map(element => {
                return (
                    <Window 
                        darkTheme={props.darkTheme} 
                        globalDrag={handleDragState} 
                        dragStart={handleDragStart}
                        resizeHandler={handleWindowResize}
                        closeHandler={handleCloseWindow}
                        slotID={element.tileID}
                        x={element.xPos}
                        y={element.yPos}
                        verticalGrow={element.verticalGrow}
                        horizontalGrow={element.horizontalGrow}
                        visible={element.active}
                        content={element.content}
                    />
                )
            })}
            
        </div>
    );
}

export default WindowManager;