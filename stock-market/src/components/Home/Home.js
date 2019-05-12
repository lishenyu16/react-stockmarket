import React,{useEffect} from 'react'
import styles from './Home.module.css'
import {connect} from 'react-redux'
import Stocks from '../Stocks/Stocks'
import * as actions from '../../store/actions/index'

const Home = (props)=>{
    useEffect(()=>{
        props.getMarketStocks()
        props.checkAuthState()
    },[])

    // console.log(props.marketStocks)
    let statement = props.userStocks.length>0?"Your Stocks":"Your stocks bucket is empty"
    return (
        <div className={styles.Home}>
            <div>
                <h2>Market Closed</h2>
                <h2>Investing: ${props.totalValue.toLocaleString()}</h2>
                <h2>{statement}</h2> 
            </div>
            <Stocks stocks={props.userStocks} />
            <h2>Market</h2>
            <Stocks stocks={props.marketStocks} />
            <a href="https://iexcloud.io" target="_blank" className={styles.iexUrl}>Data provided by IEX Cloud</a>
        </div>
    )
}


const mapStateToProps = (state)=>{
    return {
        marketStocks: state.market.marketStocks,
        totalValue: state.portfolio.totalValue,
        userStocks: state.portfolio.stocks
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getMarketStocks: ()=>dispatch(actions.getMarketStocks()),
        checkAuthState: ()=>dispatch(actions.checkAuthState())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)