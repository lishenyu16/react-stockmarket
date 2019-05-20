import axios from '../../axiosServer'

let header = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
}
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
        axios().post('/stocks/update', order,header)
        .then(res=>{
            alert('Order is placed!')
            dispatch(updateBuyingPower(res.data))
            dispatch(placeOrderSuccess())
        })
        .catch()
    }
}