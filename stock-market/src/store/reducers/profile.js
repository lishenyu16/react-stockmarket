const initialState={
    uploadingImage:false
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
                uploadingImage:false
            }
        default:
            return state
    }
}

export default reducer