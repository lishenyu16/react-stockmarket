import React from 'react'
import styles from './Orders.module.css'
import Order from './Order'

const Orders = (props)=>{
    let ordersList = null
    if(props.orders.length>0){
        ordersList = <ul className={styles.Orders}>
                        {
                            props.orders.map(order=>{ 
                                return (
                                    <Order 
                                        key={order.id}   //object.keys(order)[0]
                                        order={order}> 
                                    </Order>
                                )
                            })
                        }
                    </ul>
    }
    return (
        <React.Fragment>
            {ordersList}
        </React.Fragment>
    )
}

export default Orders