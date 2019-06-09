// import axios from 'axios';
import axios from '../../axiosServer'

export const getMarketStocksSuccess = (data)=>{
    return {
        type: 'fetchMarketStocks',
        marketStocks: data
    }
}

export const getUserStocksSuccess = (datas)=>{
    return {
        type: 'getUserStocks',
        stocks: datas
    }
}
export const getUserStocks = (id)=>{
    return {
        type:'getUserStocks_saga',
        id
    }
}

export const getUserBuyingPowerSuccess = (data)=>{
    return {
        type:'getUserBuyingPower',
        data
    }
}
export const getUserBuyingPower = (id)=>{
    return {
        type:'getUserBuyingPower_saga',
        id
    }
}

export const getTotalValueSuccess = (data)=>{
    return {
        type:'getTotalValue',
        data:data
    }
}
export const getTotalValue = () => {
    return {
        type:'getTotalValue_saga'
    }
}

export const getUserHomeStocksSuccess = (u)=>{
    return {
        type: 'getUserHomeStocks',
        u
    }
}
export const getUserHomeStocks = ()=>{
    return {
        type: 'getUserHomeStocks_saga'
    }
}


export const getUsersOrdersSuccess = (data)=>{
    return {
        type:'getOrders',
        data
    }
}
export const getUserOrders = ()=>{
    return {
        type:'getUserOrders_saga'
    }
}


