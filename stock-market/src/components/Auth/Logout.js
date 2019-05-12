import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as  actions from '../../store/actions/index'
import {Redirect} from 'react-router-dom'



const Logout = (props)=>{
    useEffect(()=>{
        props.onLogout()
    })

    return <Redirect to="/" />
}

 const mapDispatchToProps = (dispatch)=>{
     return {
         onLogout: ()=>dispatch(actions.logout())
     }
 }
export default connect(null,mapDispatchToProps)(Logout)