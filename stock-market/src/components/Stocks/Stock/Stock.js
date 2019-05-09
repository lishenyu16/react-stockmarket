import React from 'react'
import styles from './Stock.module.css'
import {withRouter} from 'react-router-dom'

const Stock = (props)=>{


    let stock = props.stock
    let priceUp = props.stock.latestPrice>props.stock.open?true:false
    
    const goToDetail = ()=>{
        props.history.push('stocks/' + stock.symbol)
    }

    return (       
       <div className={styles.Stock} stock={stock} onClick={goToDetail}>
            <div className={styles.symbol}>{stock.symbol}</div>
            <div className={styles.price} style={{backgroundColor:priceUp?"cyan":"red"}}>${stock.latestPrice.toLocaleString()}</div>
            {stock.shares>0?<div className={styles.shares}>{stock.shares}</div>:null}
       </div>
    )
}

export default withRouter(Stock)