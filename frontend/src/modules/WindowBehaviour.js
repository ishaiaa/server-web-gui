const propertiesTemplate = {
    active: false,
    xPos: 0,
    yPos: 0,
    tileID: 0,
    occupancy: [0],
    verticalGrow: false,
    horizontalGrow: false,
    content: {
        icon: null,
        title: "Window",
        render: <div></div>
    }
}

export function getTileID(x, y) {
    return parseInt(`${y}${x}`,2)
}

export function getTilePosition(id) {
    let pos = id.toString(2)
    if(pos.length == 1) return [parseInt(pos[0]), 0]
    return [parseInt(pos[1]), parseInt(pos[0])]
}

export function getInitialArray() {
    let template = []

    for(let i = 0; i<4; i++) {
        template.push({
            ...propertiesTemplate,
            active: false,
            tileID: i,
            occupancy: [i],
            xPos: getTilePosition(i)[0],
            yPos: getTilePosition(i)[1]
        });
    }


    return template
}

function calculateOccupancy(id, isVertical, isHorizontal) {
    let position = getTilePosition(id);

    if(!isVertical && !isHorizontal) return [id]

    if(!isHorizontal) return [getTileID(position[0], 0), getTileID(position[0], 1)]

    if(!isVertical) return [getTileID(0, position[1]), getTileID(1, position[1])]

    return [0,1,2,3]
}

function getIndexById(id, windowGrid) {
    let elementIndex = -1
    windowGrid.forEach((element, index) => {
        if(element.tileID == id) elementIndex=index
    })
    return elementIndex
}

function checkIfFree(id, windowGrid) {
    let returnVal = true

    windowGrid.forEach(element => {
        if(element.occupancy.indexOf(id) !== -1 && element.active) returnVal = false
    });

    return returnVal
}

function getAllOverlays(id, windowGrid) {
    let overlays = []

    windowGrid.forEach(element => {
        if(element.occupancy.indexOf(id) !== -1) overlays.push(element)
    })
    
    return overlays
}

function freeUpSpace(idToFree, windowGrid) {
    let originContainer = windowGrid[getIndexById(idToFree, windowGrid)]
    console.log(originContainer)
    if(originContainer.active) return windowGrid

    let overlays = getAllOverlays(idToFree, windowGrid)
    console.log(overlays)
    let ids = overlays.map(element => element.tileID)
    return windowGrid.map(element => {
        if(ids.indexOf(element.tileID) === -1) return {...element}
        return {
            ...element,
            occupancy: [element.tileID],
            horizontalGrow: false,
            verticalGrow: false
        }
    })
}

export function calculateMovement(startID, endID, windowGrid) {

    let cleanedGrid = freeUpSpace(endID, windowGrid);

    let startElement = cleanedGrid[getIndexById(startID, cleanedGrid)]
    let endElement = cleanedGrid[getIndexById(endID, cleanedGrid)]

    return cleanedGrid.map(element => {
        if(element.tileID === startID) return {
            ...element,
            tileID:     endElement.tileID,
            occupancy:  [endElement.tileID],
            xPos:       endElement.xPos,
            yPos:       endElement.yPos,
            verticalGrow: false,
            horizontalGrow: false
        }
        if(element.tileID === endID) return {
            ...element,
            tileID:     startElement.tileID,
            occupancy:  [startElement.tileID],
            xPos:       startElement.xPos,
            yPos:       startElement.yPos,
            verticalGrow: false,
            horizontalGrow: false
        }
        return {...element}
    })
}

export function calculateResize(id, vertical, horizontal, windowGrid) {
    
    let gridClone = windowGrid.map(element => {return {...element}})
    let windowToResize = gridClone[getIndexById(id, gridClone)]
    
    //najpierw dla vertical, potem dla
    //sprawdź czy zmniejszamy czy powiększamy
    //jesli zmniejszawy, to po prostu zmniejszamy i nie ma problemu
    if(!vertical && !vertical === windowToResize.verticalGrow) {
        windowToResize.verticalGrow = false
        windowToResize.occupancy = calculateOccupancy(id, false, windowToResize.horizontalGrow)
    }
    if(!horizontal && !horizontal === windowToResize.horizontalGrow) {
        windowToResize.horizontalGrow = false
        windowToResize.occupancy = calculateOccupancy(id, windowToResize.verticalGrow, false)
    }
    if(vertical === windowToResize.verticalGrow && horizontal === windowToResize.horizontalGrow) {
        return gridClone.map(element => {
            if(element.tileID === id) return {...windowToResize}
            return {...element}
        })
    }

    //jeśli powiększamy, oblicz occupance

    let occupancy = calculateOccupancy(id, vertical, horizontal)

    console.log(`OCCUPANCY ${occupancy}`)

    //zapisz do zmiennej wszystkie sloty które wymagają rearanżacji
    let slotsToRearrange = []

    occupancy.forEach(slot => {
        if(!checkIfFree(slot, gridClone) && id !== slot) slotsToRearrange.push(slot)
    })

    
    //jesli któryś slot ma overlaya, zmniejsz go
    //jeśli któryś slot jest zajęty i active, dodaj go do listy tych, które trzeba gdzieś przesunąć
    let slotsToReposition = slotsToRearrange
    console.log(`TO REPOSITION ${slotsToReposition}`)
    console.log(`TO REARANGE ${slotsToRearrange}`)

    slotsToRearrange.forEach(slot => {
        let slotToRearrange = gridClone[getIndexById(slot, gridClone)]
        if(!slotToRearrange.active) {
            gridClone = freeUpSpace(slot, gridClone)
            slotsToReposition.splice(slotsToReposition.indexOf(slot), 1)
        };
    })


    console.log(`TO REPOSITION ${slotsToReposition}`)

    //zrób loopa wszystkich wolnych miejsc w wyłączeniem occupance resizowanego objektu
    
    let freeSlotsTemp = [0,1,2,3]
    let freeSlots = []

    occupancy.forEach(slot => {
        freeSlotsTemp.splice(freeSlotsTemp.indexOf(slot), 1)
    })

    console.log(`freeSlotsTemp ${freeSlotsTemp}`)


    freeSlotsTemp.forEach(slot => {
        if(checkIfFree(slot, gridClone)) freeSlots.push(slot)
    })

    console.log(`freeSlots ${freeSlots}`)

    //przenieś pierwszy element z listy do relokacji w pierwszy wolny slot itd

    freeSlots.forEach(slot => {
        if(slotsToReposition.length > 0) {
            console.log(`moveAttempt ${slot} to ${slotsToReposition[0]}`)
            console.log(`strp ${slotsToReposition}`)
            gridClone = calculateMovement(slot, slotsToReposition[0], gridClone)
            slotsToReposition.slice(0,1)
        }
    })

    //wszystkie elementy z listy relokacji któ©e nie znalazły nowego miejsca dezaktywuj
    
    slotsToReposition.forEach(slot => {
        let slotData = gridClone[getIndexById(slot, gridClone)];
        gridClone[getIndexById(slot, gridClone)] = {
            ...slotData,
            active: false,
            occupancy: [slotData.tileID],
            verticalGrow: false,
            horizontalGrow: false,
            content: (<div />)
        }
    })
    
    //przeprowadź resize

    gridClone[getIndexById(id, gridClone)] = {
        ...windowToResize,
        occupancy: occupancy,
        verticalGrow: vertical,
        horizontalGrow: horizontal
    }

    return gridClone
}

export function openNewWindow(content, windowGrid) {
    let freeSlotsTemp = [0,1,2,3]
    let freeSlots = []

    console.log("window open call")

    let gridClone = windowGrid.map(element => {return {...element}})

    
    freeSlotsTemp.forEach(slot => {
        if(checkIfFree(slot, gridClone) && !gridClone[getIndexById(slot, gridClone)].active) freeSlots.push(slot)
    })

    console.log(freeSlots)

    if(freeSlots.length > 0) {
        let windowReference = gridClone[getIndexById(freeSlots[0], gridClone)]

        gridClone[getIndexById(freeSlots[0], gridClone)] = {
            ...windowReference,
            active: true,
            occupancy: [windowReference.tileID],
            verticalGrow: false,
            horizontalGrow: false, 
            content: content
        }
        console.log(windowReference)


    }

    console.log(gridClone)

    return gridClone
}

export function closeWindow(id, windowGrid) {
    let gridClone = windowGrid.map(element => {return {...element}})

    let windowReference = gridClone[getIndexById(id, gridClone)]

    gridClone[getIndexById(id, gridClone)] = {
        ...windowReference,
        active: false,
        occupancy: [windowReference.tileID],
        verticalGrow: false,
        horizontalGrow: false,
        content: propertiesTemplate.content
    }

    return gridClone
}