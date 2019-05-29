import React, {useState,useEffect} from 'react'
import styles from './Profile.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../UI/Spinner/Spinner'

const Profile = (props)=>{
 
    const [file, setFile] = useState(null)
    const [blog, setBlog] = useState(null)
    useEffect(()=>{
        props.getProfile()
    },[props.avatarUrl])

    const uploadImage = ()=>{
        let data = new FormData()
        data.append('avatar', file);
        props.imageUpload(data)
    }
    const imageChange = (e)=>{
        setFile(e.target.files[0])
    }
    const uploadBlog = ()=>{
        let data = new FormData()
        data.append('blog', blog);
        props.blogUpload(data)
    }
    const blogChange = (e)=>{
        setBlog(e.target.files[0])
    }
    let avatar =<div className={styles.avatar}>
                        <input type="file" name='avatar' onChange={imageChange} />
                        <button type='button' onClick={uploadImage}>Upload</button>                        
                </div>      
    if(props.avatarUrl!=null){
        avatar = <div><img src={props.avatarUrl}></img></div>
    }
    return (
        <div className={styles.Profile}>   
            {props.uploadingAvatar?<Spinner />:null}        
            {avatar}
            <div className={styles.blogs}>
                <div className={styles.blogs_upload}>
                    <input type="file" name='blog' onChange={blogChange} />
                    <button type='button' onClick={uploadBlog}>Upload</button>                        
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        uploadingAvatar: state.profile.uploading,
        avatarUrl: state.profile.avatarPath
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getProfile: ()=>dispatch(actions.getProfile()),
        imageUpload: (data)=>dispatch(actions.uploadImage(data)),
        blogUpload: (data)=>dispatch(actions.uploadBlog(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)