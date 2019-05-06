import React from 'react'
import styles from './Logo.module.css'
import logoImage from '../../assets/logo.png'
const logo = (props)=>{
    return (
        <div className={styles.Logo} style={{height:props.height}}>
            <img src={logoImage} alt="Stock Logo"></img>
        </div>
    )
}

export default logo