import React, {useState,useEffect} from 'react'
import styles from './Profile.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'
const Profile = (props)=>{
 
    const [file, setFile] = useState(null)

    const uploadImage = ()=>{
        let data = new FormData()
        data.append('file', file);
        props.imageUpload(data)
    }
    const imageChange = (e)=>{
        setFile(e.target.files[0])
    }

    return (
        <div className={styles.Profile}>
            <input type="file" onChange={imageChange} />
            <button type='button' onClick={uploadImage}>Upload</button>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        imageUpload: (data)=>dispatch(actions.uploadImage(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)