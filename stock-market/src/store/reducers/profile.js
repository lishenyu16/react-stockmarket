const initialState={
    avatarPath:null,
    uploading:false,
    blogs:null,
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
        case('getBlogs'):
            return {
                ...state,
                blogs: action.data
            }
        case('download'):
            return {
                ...state
            }
        default:
            return state
    }
}

export default reducer