const initialState={
    tradeLoading:false,
    tradingSuccess: false,
    error:null
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case('initTrade'):
            return {
                ...state,
                tradeLoading:false,
                tradingSuccess: false
            }
        case('startTrading'):
            return {
                ...state,
                tradeLoading: true,
                tradingSuccess: false
            }
        case('placeOrder'):
            return {
                ...state,
                tradeLoading:false,
                tradingSuccess: true
            }
        case('placeOrderFail'):
            return {
                ...state,
                tradeLoading:false,
                tradingSuccess: false,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer