import React,{useEffect} from 'react'
import styles from './Home.module.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Stocks from '../Stocks/Stocks'
import * as actions from '../../store/actions/index'

const Home = (props)=>{
    useEffect(()=>{
        props.getMarketStocks()
        props.checkAuthState()
        props.getUserStocks(localStorage.getItem('userId'))
        props.getBuyingPower(localStorage.getItem('userId')) 
    },[])
    useEffect(()=>{
        props.getTotalValue(props.userStocks,props.marketStocks)
    },[props.userStocks])
    useEffect(()=>{
        props.getUserHomeStocks()
    },[props.userStocks])

    let signinstatement = null
    if(!props.isAuthenticated){
        signinstatement = <p>Just <Link to='/auth'>SIGN IN</Link> and play, explore your talents hidden deep inside you, maybe you are the next wolf of the Wall Street!</p>
    }
    let statement = props.userStocks.length>0?"Your Stocks":"Your stocks bucket is empty"

    
    return (
        <div className={styles.Home}>
            <div>
                <p>This is a stock trade simulator website.  </p>
                <p>Each registered user will be given an initial $10,000 virtual dollars to trade the stocks. All the datas displayed here are real-time datas of stock market.</p>
                {signinstatement}
                <h2>Your Position: ${(props.totalValue + props.buyingPower).toLocaleString()}</h2>
                <h2>{statement}</h2> 
            </div>
            <Stocks stocks={props.userRealStocks} />
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
        userStocks: state.portfolio.stocks,
        isAuthenticated: state.auth.isLoggedIn,
        userId: state.auth.userId,
        buyingPower: state.portfolio.buyingPower,
        userRealStocks: state.portfolio.realUserStocks
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getMarketStocks: ()=>dispatch(actions.getMarketStocks()),
        checkAuthState: ()=>dispatch(actions.checkAuthState()),
        getUserStocks:(id)=>dispatch(actions.getUserStocks(id)),
        getBuyingPower: (id)=>dispatch(actions.getUserBuyingPower(id)),
        getTotalValue: ()=>dispatch(actions.getTotalValue()),
        getUserHomeStocks: ()=>dispatch(actions.getUserHomeStocks())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)