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
const placeOrderFail = (err)=>{
    return {
        type:'placeOrderFail',
        error:err
    }
}
export const placeOrder = (order)=> {
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
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
        .catch(err=>{
            dispatch(placeOrderFail(err))
        })
    }
}