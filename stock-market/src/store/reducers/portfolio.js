const initialState={
    totalValue:0,
    buyingPower:10000,
    stocks:[],
    orders:[],
    realUserStocks:[]
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case('getUserStocks'):
            let stocks = action.stocks
            return {
                ...state,
                stocks
            }
        case('getUserBuyingPower'):
            let buyingPower = action.data.buyingPower
            return {
                ...state,
                buyingPower
            }
        case('getTotalValue'):
            let totalValue = action.data
            return {
                ...state,
                totalValue
            }
        case('getUserHomeStocks'):
            let u = action.u
            return {
                ...state,
                realUserStocks:u
            }
        case('getOrders'):
            return {
                ...state,
                orders: action.data
            }
        default:
            return state
    }
}

export default reducer