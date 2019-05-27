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
        dispatch({type:'startUploadingImage'})
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


