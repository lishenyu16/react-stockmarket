// import axios from 'axios';
import axios from '../../axiosServer'
export const getMarketStocksSuccess = (data)=>{
    return {
        type: 'fetchMarketStocks',
        marketStocks: data
    }
}

const getUserStocksSuccess = (datas)=>{
    return {
        type: 'getUserStocks',
        stocks: datas
    }
}
export const getUserStocks = (id)=>{
    return dispatch =>{
        axios().get('/stocks/' + id)
            .then(res=>{
                dispatch(getUserStocksSuccess(res.data))
            })
            .catch(err=>console.log(err))
    }
}

const getUserBuyingPowerSuccess = (data)=>{
    return {
        type:'getUserBuyingPower',
        data
    }
}
export const getUserBuyingPower = (id)=>{
    return dispatch =>{
        //1. fetch buying power
        //2. fetch user stocks
        axios().get(`/getbuyingpower/${id}`)
        .then(res=>{
            dispatch(getUserBuyingPowerSuccess(res.data))
        })
        .catch(err=>console.log(err))
    }
}

const getTotalValueSuccess = (data)=>{
    return {
        type:'getTotalValue',
        data:data
    }
}
export const getTotalValue = () => {
    return (dispatch,state) =>{
        let userStocks = state().portfolio.stocks
        let marketStocks = state().market.marketStocks
        let totalValue = 0
        for(let i of userStocks){
            for(let n of marketStocks){
                if(i.symbol==Object.keys(n)[0].toLowerCase()){
                    totalValue += i.shares * Object.values(n)[0].quote.latestPrice
                    break
                }
            }
        }
        dispatch(getTotalValueSuccess(totalValue))
    }
}



const getUserHomeStocksSuccess = (u)=>{
    return {
        type: 'getUserHomeStocks',
        u
    }
}
export const getUserHomeStocks = ()=>{
    return (dispatch,state)=>{
        let userStocks = state().portfolio.stocks
        let marketStocks = state().market.marketStocks
        let u = []
        if(userStocks.length>0){
            for(let i of userStocks){
                u=u.concat(marketStocks.filter(item=>Object.keys(item)[0].toLocaleLowerCase() == i.symbol))
            }
        }
        dispatch(getUserHomeStocksSuccess(u))       
    }
}


const getUsersOrdersSuccess = (data)=>{
    return {
        type:'getOrders',
        data
    }
}
export const getUserOrders = ()=>{
    let id = localStorage.getItem('userId')
    return dispatch =>{
        axios().get(`/orders/${id}`)
        .then(res=>{
            console.log(res.data)
            dispatch(getUsersOrdersSuccess(res.data))
        })
        .catch(err=>console.log(err))
    }
}


