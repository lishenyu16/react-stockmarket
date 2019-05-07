import React from 'react'
import styles from './Backdrop.module.css'
 

//used in SideDrawer
const Backdrop = (props)=>{
    return (
        props.show?<div className={styles.Backdrop} onClick={props.clickBackdrop}></div>:null
    )
}

export default Backdrop