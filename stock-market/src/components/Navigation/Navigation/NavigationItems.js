import React,{useState,useEffect} from 'react'
import NavItem from './NavItem'
import styles from './NavigationItems.module.css'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index'

//used in SideDrawer and Topbar
const navigationItems = (props)=>{
    // let authMethod = <NavItem link="/auth">Sign In</NavItem>
    // let me = <NavItem link='/me'>Me</NavItem>
    // return (
    //     <ul className={styles.NavigationItems}>
    //         <NavItem link='/'>Home</NavItem>
    //         {me}
    //         {authMethod}
    //     </ul>
    // )

    let authMethod = <NavItem link="/auth">Sign In</NavItem>
    let dashboard = null
    if(props.isLoggedIn){
        dashboard = <NavItem link="/me">Me</NavItem>
        authMethod = <NavItem link="/logout">Logout</NavItem> // <button onClick={this.props.onLogout}>Logout</button>
    }
    return (
        <ul className={styles.NavigationItems}>
            <NavItem link="/">Home</NavItem>
            {dashboard}
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