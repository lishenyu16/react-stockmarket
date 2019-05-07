import React,{useState,useEffect} from 'react'
import NavItem from './NavItem'
import styles from './NavigationItems.module.css'

//used in SideDrawer and Topbar
const navigationItems = (props)=>{
    let authMethod = <NavItem link="/auth">Sign In</NavItem>
    let me = <NavItem link='/me'>Me</NavItem>
    return (
        <ul className={styles.NavigationItems}>
            <NavItem link='/'>Home</NavItem>
            {me}
            {authMethod}
        </ul>
    )
        
}

export default navigationItems