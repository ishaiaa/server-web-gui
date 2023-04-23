import React, { useState } from 'react';
import styles from './Login.module.css';
import * as Icon from 'react-bootstrap-icons';
import plug from '../../images/plug-fill.svg'
import person from '../../images/person-fill.svg'
import key from '../../images/key-fill.svg'

function Login(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    function handleClick() {
        setIsLoading(true);
        setTimeout(()=>{

            setIsSuccess(true)
             setTimeout(() => {
                 setIsLoading(false)
                 setIsSuccess(false)
             }, 3000)
        }, 2500);
    }

    return (
        <div className={styles.mainContainer}>
            <div className={`${styles.loginCard} ${isLoading && styles.loading} ${isSuccess && styles.success}`}>
                <div className={styles.heading}>
                    <div className={styles.icon} />
                    <h1 className={styles.title}>webuntu</h1>
                </div>
                <div className={styles.form}>
                    <div 
                        className={styles.inputWrap}
                        style={{'--icon': `url(${plug})`}}
                    >
                        <input type="text" placeholder='Socket Address'></input>
                    </div>
                    <div 
                        className={styles.inputWrap}
                        style={{'--icon': `url(${person})`}} 
                    >
                        <input type="text" placeholder='Username'></input>
                    </div>
                    <div 
                        className={styles.inputWrap}
                        style={{'--icon': `url(${key})`}} 
                    >
                        <input type="password" placeholder='Password'></input>
                    </div>
                </div>
                <button onClick={handleClick} className={styles.loginButton} >
                    Connect
                </button>
            </div>
        </div>
    );
}

export default Login;