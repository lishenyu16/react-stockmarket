import React, {useState,useEffect} from 'react'
import styles from './Profile.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../UI/Spinner/Spinner'

const Profile = (props)=>{
 
    const [file, setFile] = useState(null)

    const uploadImage = ()=>{
        let data = new FormData()
        data.append('avatar', file);
        props.imageUpload(data)
    }
    const imageChange = (e)=>{
        setFile(e.target.files[0])
    }
    return (
        <div className={styles.Profile}>           
            <input type="file" name='avatar' onChange={imageChange} />
            <button type='button' onClick={uploadImage}>Upload</button>
            {props.uploadingAvatar?<Spinner />:null}
            
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        uploadingAvatar: state.profile.uploadingImage
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        imageUpload: (data)=>dispatch(actions.uploadImage(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)