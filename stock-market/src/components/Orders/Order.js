import React from 'react'
import styles from './Order.module.css'

const Order = (props)=>{
    return (
        <div className={styles.Order}>
            <div className={styles.item}>
                <div className={styles.statsProp}>Executed Date:</div>
                <div>{props.order.date.substring(0,10)}</div>
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}>Type: </div>
                <div>{props.order.type==1?"Purchase":"Sell"}</div>
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}>Price:</div>
                <div>${props.order.price.toLocaleString()}</div>
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}>Shares:</div>
                <div>{props.order.shares}</div>
            </div>
            <hr className={styles.hr} />
        </div>
    )
}

export default Order