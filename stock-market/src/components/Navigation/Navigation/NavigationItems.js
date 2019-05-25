import React from 'react'
import NavItem from './NavItem'
import styles from './NavigationItems.module.css'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'

//used in SideDrawer and Topbar
const navigationItems = (props)=>{

    let authMethod = <NavItem link="/auth">Sign In</NavItem>
    let dashboard = null
    let profile = null
    if(props.isLoggedIn){
        dashboard = <NavItem link="/dashboard">Account</NavItem>
        authMethod = <NavItem link="/logout">Logout</NavItem> // 
        profile = <NavItem link="/profile">Profile</NavItem> 
    }
    return (
        <ul className={styles.NavigationItems}>
            <NavItem link="/">Home</NavItem>
            {dashboard}
            {profile}
            {authMethod}
        </ul>
    )
        
}

const mapStateToProps = (state)=>{
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onLogout:()=> dispatch(actions.logout())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(navigationItems)