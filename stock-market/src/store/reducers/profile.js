const initialState={
    avatarPath:null,
    uploadingImage:false,
    error:null
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case('startUploadingImage'):
            return {
                ...state,
                uploadingImage:true
            }
        case('uploadImageSuccess'):
            return {
                ...state,
                avatarPath: action.data.file,
                uploadingImage:false
            }
        case('uploadImageFail'):
            return {
                ...state,
                uploadingImage:false,
                error:action.err
            }
        default:
            return state
    }
}

export default reducer