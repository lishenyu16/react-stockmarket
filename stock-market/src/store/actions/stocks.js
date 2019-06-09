
export const updateBuyingPower = (data)=>{
    return {
        type:'getUserBuyingPower',
        data:data
    }
}

export const placeOrderSuccess = ()=>{
    return {
        type:'placeOrder'
    }
}
export const placeOrderFail = (err)=>{
    return {
        type:'placeOrderFail',
        error:err
    }
}
export const placeOrder = (order)=> {
    return {
        type: 'placeOrder_saga',
        order
    }
}