import React, { useEffect, useRef, useState } from 'react';

import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';

import styles from './TerminalEmulator.module.css'

function TerminalEmulator(props) {
    const terminalRef = useRef()

    const term = new Terminal();
    const fitAddon = new FitAddon();


    useEffect(() => {
        term.open(terminalRef.current);
        term.loadAddon(fitAddon);
        term.write('Hello from \x1B[1;3;31mxtrrm.js\x1B[0m $ ')
        fitAddon.fit();

    }, [terminalRef])


    function update() {
        fitAddon.fit();
        term.write('Hello from \x1B[1;3;31mxtrrm.js\x1B[0m $ ')
    }


    return (
        <div onClick={update} className={styles.mainContainer}>
            <div 
                ref={terminalRef}
                id="tttr"
            />
        </div>
    );
}

export default TerminalEmulator;