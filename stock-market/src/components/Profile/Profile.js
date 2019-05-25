import React, {useState,useEffect} from 'react'
import styles from './Profile.module.css'

const Profile = (props)=>{
 

    //icon 
    //blogs
    //upload file module

    return (
        <div className={styles.Profile}>
            <div>
                <lable>Image</lable>
                <input type="file" name='image' id='image'></input>
            </div>
        </div>
    )
}

export default Profile