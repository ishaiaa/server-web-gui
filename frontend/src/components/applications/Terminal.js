import React, { useEffect, useRef, useState } from 'react';
import { XTerm } from 'oas-xterm-for-react18'

import styles from './Terminal.module.css'

function Terminal(props) {
    const terminalRef = useRef();
    const [upd, setUpd] = useState(false);
    useEffect(() => {
        console.log("Open")
        let a = ((Date.now() ^ 1) * (Date.now() ^ 3) % 98779878987)
        terminalRef.current.terminal.writeln(`\nClick`);
        terminalRef.current.terminal.writeln(`${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}${a}`);
        console.log(terminalRef)
    }, [upd])

    useEffect(() => {
        setUpd(true);
        setTimeout(()=>{setUpd(false)},10)
    }, [])

    return (
        <div onClick={() => {setUpd(p => !p)}} className={styles.mainContainer}>
            <XTerm ref={terminalRef} up={upd} className={styles.terminalWindow} />
        </div>
    );
}

export default Terminal;