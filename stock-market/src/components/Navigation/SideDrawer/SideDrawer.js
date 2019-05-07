import React from 'react'
import styles from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/Navigation/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props)=>{
    let attachedClasses = [styles.SideDrawer,styles.Close]
    if(props.show){
        attachedClasses = [styles.SideDrawer,styles.Open]
    }
    return (
        <React.Fragment>
            <Backdrop show={props.show} clickBackdrop={props.sideDrawerClicked}></Backdrop>
            <div className={attachedClasses.join(' ')} onClick={props.sideDrawerClicked}>         
                <Logo height="10%"></Logo>
                <NavigationItems></NavigationItems>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer