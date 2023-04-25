import React, { useState } from 'react';
import styles from './Login.module.css';
import * as Icon from 'react-bootstrap-icons';
import plug from '../../images/plug-fill.svg'
import person from '../../images/person-fill.svg'
import key from '../../images/key-fill.svg'

function Login(props) {

    const [formData, setFormData] = useState({
        socket: "",
        user: "",
        password: ""
    })

    function handleFormUpdate(event) {
        const target = event.currentTarget;

        if(target.name) {
            setFormData(prevState => {
                return ({
                    ...prevState,
                    [target.name]: target.value
                })
            })
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={`${styles.loginCard} ${props.isLoading && styles.loading} ${props.isConnected && styles.success}`}>
                <div className={styles.heading}>
                    <div className={styles.icon} />
                    <h1 className={styles.title}>webuntu</h1>
                </div>
                <div className={styles.form}>
                    <div 
                        className={styles.inputWrap}
                        style={{'--icon': `url(${plug})`}}
                    >
                        <input name="socket" value={formData.socket} onChange={handleFormUpdate} type="text" placeholder='Socket Address'></input>
                    </div>
                    <div 
                        className={styles.inputWrap}
                        style={{'--icon': `url(${person})`}} 
                    >
                        <input name="user" value={formData.user} onChange={handleFormUpdate} type="text" placeholder='Username'></input>
                    </div>
                    <div 
                        className={styles.inputWrap}
                        style={{'--icon': `url(${key})`}} 
                    >
                        <input name="password" value={formData.password} onChange={handleFormUpdate} type="password" placeholder='Password'></input>
                    </div>
                </div>
                <button onClick={() => props.handleConnect(formData)} className={styles.loginButton} >
                    Connect
                </button>
            </div>
        </div>
    );
}

export default Login;