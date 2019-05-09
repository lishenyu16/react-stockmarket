import React,{useEffect} from 'react'
import styles from './StockDetail.module.css'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import LineGraph from '../../../components/LineGraph/LineGraph'
import * as actions from '../../../store/actions'

const StockDetail = (props)=>{
    // console.log(props.match)
    let symbol = props.match.params.symbol
    useEffect(()=>{
        props.getSingleStock(symbol,'1d')
    },[])
    let quote_component = null
    if(props.quote.latestPrice){
        quote_component = <div className={styles.Name_Price_Chart}>
                            {/* <div style={{fontSize:'1.5rem'}}>{symbol}</div> */}
                            <div className={styles.headline} style={{fontSize:'2.5rem'}}>{props.quote.companyName}</div>
                            <div className={styles.headline} style={{fontFamily: "'Lora', serif"}}>${props.quote.close.toLocaleString()}</div>
                            <hr></hr>
                            <LineGraph symbol={symbol}></LineGraph>
                        </div>
    }
    return (
        <div className={styles.StockDetail}>
            {quote_component}
            <div className={styles.logo}>
                <img src={props.logo}></img>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        quote: state.market.quote,
        logo: state.market.logo,
        news: state.market.news,
        chart: state.market.chart
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getSingleStock: (symbol,range)=>dispatch(actions.getStockDetail(symbol,range))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StockDetail))