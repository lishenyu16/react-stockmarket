import axios from '../../axiosServer'

const updateBuyingPower = (data)=>{
    return {
        type:'getUserBuyingPower',
        data:data
    }
}

const placeOrderSuccess = ()=>{
    return {
        type:'placeOrder'
    }
}
export const placeOrder = (order)=> {
    return dispatch=>{
        dispatch({
            type:'startTrading'
        })
        axios().post('/stocks/update', order)
        .then(res=>{
            alert('Order is placed!')
            dispatch(updateBuyingPower(res.data))
            dispatch(placeOrderSuccess())
        })
        .catch()
    }
}