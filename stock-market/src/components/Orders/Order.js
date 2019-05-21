import React from 'react'
import styles from './Order.module.css'

const Order = (props)=>{
    return (
        <div className={styles.Order}>
            <div className={styles.item}>
                <div className={styles.statsProp}>Stock Symbol:</div>
                {props.order==null?null:<div>{props.order.symbol.toUpperCase()}</div>}
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}>Execution Date:</div>
                <div>{props.order.date.substring(0,10)}</div>
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}>Type: </div>
                <div>{props.order.type==1?"Purchase":"Sell"}</div>
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}> Execution Price:</div>
                <div>${props.order.price.toLocaleString()}</div>
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}>Shares:</div>
                <div>{props.order.shares}</div>
            </div>
            <div className={styles.item}>
                <div className={styles.statsProp}>Total Value:</div>
                <div>{(props.order.shares * props.order.price).toLocaleString()}</div>
            </div>
            <hr className={styles.hr} />
        </div>
    )
}

export default Order