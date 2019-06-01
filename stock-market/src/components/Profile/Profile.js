import React, {useState,useEffect} from 'react'
import styles from './Profile.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions'
import Spinner from '../UI/Spinner/Spinner'

const Profile = (props)=>{
 
    const [file, setFile] = useState(null)
    const [blog, setBlog] = useState(null)
    const [name, setName] = useState(null)
    useEffect(()=>{
        props.getProfile()
    },[props.avatarUrl])
    useEffect(()=>{
        props.getBlogs()
    },[props.uploadingAvatar])

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
        data.append('name', name);
        data.append('blog', blog);
        props.blogUpload(data)
    }
    const blogChange = (e)=>{
        setBlog(e.target.files[0])
    }
    const nameChange = (e)=>{
        setName(e.target.value)
    }
    let avatar =<div className={styles.avatar}>
                        <input type="file" name='avatar' onChange={imageChange} />
                        <button type='button' onClick={uploadImage}>Upload</button>                        
                </div>      
    if(props.avatarUrl!=null){
        avatar = <div><img src={props.avatarUrl}></img></div>
    }

    const downloadBlog = (id)=>{
        props.downloadBlog(id)
    }
    let blogsList = null
    if(props.blogs){
        blogsList =  props.blogs.map(
                        item=>{return <div key={item.id}>
                                        {item.name} - <button onClick={()=>downloadBlog(item.id)} type='button'>Download</button>
                                    </div>})
    }
    return (
        <div className={styles.Profile}>   
            {props.uploadingAvatar?<Spinner />:null}        
            {avatar}
            <div className={styles.blogs}>
                <div className={styles.blogs_upload}>
                    <label>Name:</label>
                    <input type="text" name='name' onChange={nameChange} />
                    <input type="file" name='blog' onChange={blogChange} />
                    <button type='button' onClick={uploadBlog}>Upload</button>                        
                </div>
                <div className={styles.blogs_list}>
                    {blogsList}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        uploadingAvatar: state.profile.uploading,
        avatarUrl: state.profile.avatarPath,
        blogs:state.profile.blogs
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getProfile: ()=>dispatch(actions.getProfile()),
        imageUpload: (data)=>dispatch(actions.uploadImage(data)),
        blogUpload: (data)=>dispatch(actions.uploadBlog(data)),
        getBlogs: ()=>dispatch(actions.getBlogs()),
        downloadBlog: (id)=>dispatch(actions.downloadBlog(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)