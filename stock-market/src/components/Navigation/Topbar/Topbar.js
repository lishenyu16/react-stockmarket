import React from 'react'
import styles from './Topbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems'

const topbar = (props)=>{
    return (
        <header className={styles.Topbar}>
            {/* <DrawerToggle drawerToggleClicked={props.drawerToggleClicked}></DrawerToggle> */}
            <Logo height='75%'></Logo>
            <nav className={styles.DesktopOnly}>
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    )
}

export default topbar