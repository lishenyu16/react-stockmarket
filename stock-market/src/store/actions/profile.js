// import axios from 'axios';
import axios from '../../axiosServer'


const uploadImageSuccess = (data)=>{
    return {
        type:'uploadImageSuccess',
        data
    }
}
const uploadImageFail = (err)=>{
    return {
        type:'uploadImageFail',
        err
    }
}
export const uploadImage = (data)=>{   
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    return dispatch=>{
        dispatch({type:'startUploading'})
        axios().post('/upload/avatar',data,header)
            .then(res=>{
                dispatch(uploadImageSuccess(res.data))
            })
            .catch(err=>{
                console.log(err)
                dispatch(uploadImageFail(err))
            })
    }
}

const getProfileSucc = (data)=>{
    return {
        type:'getProfile',
        data
    }
}
export const getProfile = ()=>{
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    return dispatch=>{
        axios().get('/profile/'+localStorage.getItem('userId'),header)
            .then(res=>{
                if(Object.keys(res.data).length>0){ //
                    dispatch(getProfileSucc(res.data))
                }               
            })
            .catch(err=>{
                console.log(err)
            })
    }
}


const uploadBlogSuccess = (data)=>{
    return {
        type:'uploadBlogSuccess',
        data
    }
}
const uploadBlogFail = (err)=>{
    return {
        type:'uploadBlogFail',
        err
    }
}
export const uploadBlog = (data)=>{
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    } 
    return dispatch=>{
        dispatch({type:'startUploading'})
        axios().post('/upload/blog',data,header)
            .then(res=>{
                dispatch(uploadBlogSuccess(res.data))
            })
            .catch(err=>{
                console.log(err)
                dispatch(uploadBlogFail(err))
            })
    }
}


