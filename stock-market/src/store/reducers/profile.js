const initialState={
    avatarPath:null,
    blogPath:null,
    uploading:false,
    error:null
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case('startUploading'):
            return {
                ...state,
                uploading:true
            }
        case('uploadImageSuccess'):
            return {
                ...state,
                avatarPath: "http://localhost:8000/"+action.data.file,
                uploading:false
            }
        case('uploadImageFail'):
            return {
                ...state,
                uploading:false,
                error:action.err
            }
        case('uploadBlogSuccess'):
            return {
                ...state,
                blogPath: "http://localhost:8000/"+action.data.file,
                uploading:false
            }
        case('uploadBlogFail'):
            return {
                ...state,
                uploading:false,
                error:action.err
            }
        case('getProfile'):
            return {
                ...state,
                avatarPath: "http://localhost:8000/"+action.data.profile.avatar
            }
        default:
            return state
    }
}

export default reducer