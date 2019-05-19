import React,{useEffect} from 'react'
import styles from './Dashboard.module.css'
import {connect} from 'react-redux'
import Stocks from '../Stocks/Stocks'
import * as actions from '../../store/actions/index'
import Orders from '../Orders/Orders'

const Dashboard = (props)=>{
    //fetch user's stocks
    useEffect(()=>{
        props.getUserHomeStocks()
    },[props.userStocks])
    useEffect(()=>{
        props.getUserOrders()
    },[])
    useEffect(()=>{
        props.getUserOrders()
    },[props.userStocks])
    useEffect(()=>{
        props.initTrade()
    },[])
    return (
        <div className={styles.Dashboard}>
            <div className={styles.position}>
                <h2>Total Value</h2>
                <h2>${(props.totalValue + props.buyingPower).toLocaleString()}</h2>
            </div>
            <div className={styles.buyingpower}>
                <div className={styles.buyingpowertext}>BUYING POWER</div>
                <div>${props.buyingPower.toLocaleString()}</div>
            </div>
            <div className={styles.stocks}>
                <h2>Your Stocks</h2>
                <Stocks stocks={props.userRealStocks} />
            </div>
            <div className={styles.orders}>
                <h2>Pending Orders</h2>
            </div>
            <div className={styles.orders}>
                <h2>Past Orders</h2>
                <Orders orders = {props.orders}></Orders>
            </div>

        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        marketStocks: state.market.marketStocks,
        totalValue: state.portfolio.totalValue,
        userStocks: state.portfolio.stocks,
        isAuthenticated: state.auth.isLoggedIn,
        userId: state.auth.userId,
        buyingPower: state.portfolio.buyingPower,
        userRealStocks: state.portfolio.realUserStocks,
        orders: state.portfolio.orders
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        // getMarketStocks: ()=>dispatch(actions.getMarketStocks()),
        // checkAuthState: ()=>dispatch(actions.checkAuthState()),
        // getUserStocks:(id)=>dispatch(actions.getUserStocks(id)),
        // getBuyingPower: (id)=>dispatch(actions.getUserBuyingPower(id)),
        // getTotalValue: ()=>dispatch(actions.getTotalValue()),
        getUserHomeStocks: ()=>dispatch(actions.getUserHomeStocks()),
        getUserOrders : ()=>dispatch(actions.getUserOrders()),
        initTrade : ()=>dispatch({type:'initTrade'})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)