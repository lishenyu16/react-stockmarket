// import axios from 'axios';
import axios from '../../axiosServer'


const uploadImageSuccess = (data)=>{
    return {
        type:'uploadImageSuccess',
        data
    }
}
export const uploadImage = (data)=>{
    return dispatch=>{
        dispatch({type:'startUploadingImage'})
        axios.post('/upload/avatar')
        .then(res=>{
            dispatch(uploadImageSuccess(res.data))
        })
        .catch()
    }
}

