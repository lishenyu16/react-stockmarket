import React from 'react'
import styles from './DrawerToggle.module.css'

const drawerToggle =(props)=>{
    return (
        <div onClick={props.drawerToggleClicked} className={styles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default drawerToggle