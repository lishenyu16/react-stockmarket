import React from 'react'
import styles from './Stock.module.css'
import {withRouter} from 'react-router-dom'

const Stock = (props)=>{


    let stock = props.stock
    let priceUp = props.stock.latestPrice>props.stock.open?true:false
    
    const goToDetail = ()=>{
        props.history.push('stocks/' + stock.symbol)
    }
    let diff_today = stock.close-stock.open
    let diff_after = stock.extendedPrice-stock.close
    if(diff_today>=0){
        diff_today='+'+'$'+diff_today.toFixed(2)
    }
    else{
        diff_today='-'+'$'+ diff_today.toFixed(2)*(-1)
    }
    if(diff_after>=0){
        diff_after='+'+'$'+diff_after.toFixed(2)
    }
    else{
        diff_after='-'+'$'+ diff_after.toFixed(2)*(-1)
    }
    

    return (       
       <div className={styles.Stock} stock={stock} onClick={goToDetail}>
            <div className={styles.symbol}>{stock.symbol}</div>
            <div className={styles.price} style={{backgroundColor:priceUp?"cyan":"red"}}>${stock.latestPrice.toLocaleString()}</div>
            <div className={styles.change}>
                <div className={styles.change_period}>{diff_today.toLocaleString()} Today</div>
                <div className={styles.change_period}>{diff_after.toLocaleString()} After Hours</div>
            </div>
            {/* {stock.shares>0?<div className={styles.shares}>{stock.shares}</div>:null} */}
       </div>
    )
}

export default withRouter(Stock)