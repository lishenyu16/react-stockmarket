
const initialState = {
    userId:null,
    username:null,
    email:null,
    token:null,
    expirationDate:null,
    isAdmin:false,
    error:null,
    isLoggedIn:false,
    buyingPower: 0
}

const reducer = (state=initialState,action) => {
    switch(action.type) {
        case('auth_fail'):
            return {
                ...state,
                error:action.error,
            }
        case('auth_success'):
            return {
                ...state,
                userId:action.authData.userId,
                username:action.authData.username,
                email:action.authData.email,
                token:action.authData.idToken,
                isAdmin:action.authData.isAdmin,
                expirationDate:action.authData.expirationDate,
                isLoggedIn: true,
                buyingPower:action.authData.buyingPower
            }
        case('logout'):
            return {
                ...state,
                username:null,
                email:null,
                token:null,
                expirationDate:null,
                isAdmin:false,
                error:null,
                isLoggedIn:false
            }
        case('checkAuthState'):
            const expirationDate = localStorage.getItem('expirationDate')
            const currentDate = new Date()
            if(localStorage.getItem('token')){
                if(currentDate>=expirationDate){
                    localStorage.removeItem('userId')
                    localStorage.removeItem('username')
                    localStorage.removeItem('email')
                    localStorage.removeItem('isAdmin')
                    localStorage.removeItem('token')
                    localStorage.removeItem('expirationDate')
                    return { //expired: 
                        ...state,
                        userId:null,
                        username:null,
                        email:null,
                        token:null,
                        expirationDate:null,
                        isAdmin:false,
                        error:null,
                        isLoggedIn:false
                    }
                }else{
                    return {
                        ...state,
                        userId:localStorage.getItem('userId'),
                        token:localStorage.getItem('token'),
                        username:localStorage.getItem('username'),
                        email:localStorage.getItem('email'),
                        expirationDate:localStorage.getItem('expirationDate'),
                        isAdmin:localStorage.getItem('isAdmin'),
                        isLoggedIn:true
                    }
                }
            }
            else{
                return state
            }

        default:
            return state
    }
}

export default reducer