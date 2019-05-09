import React,{useState} from 'react'
import styles from './Stocks.module.css'
import { connect } from 'react-redux'
import Stock from './Stock/Stock'

const Stocks = (props)=>{

    let stockList = null
    if(props.stocks.length>0){
        stockList = <ul className={styles.Stocks}>
                        {
                            props.stocks.map(st=>{ 
                                return (
                                    <Stock 
                                        key={Object.keys(st)[0]}   //object.keys(st)[0]
                                        stock={Object.values(st)[0].quote}> 
                                    </Stock>
                                )
                            })
                        }
                    </ul>
    }
    return (
        <React.Fragment>
            {stockList}
        </React.Fragment>
    )
}


const mapStateToProps = (state)=>{
    return {
        marketStocks: state.market.marketStocks,
        totalValue: state.portfolio.totalValue
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Stocks)