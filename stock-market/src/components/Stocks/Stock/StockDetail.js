import React,{useState,useEffect} from 'react'
import styles from './StockDetail.module.css'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import LineGraph from '../../../components/LineGraph/LineGraph'
import News from '../../News/News'
import * as actions from '../../../store/actions'

const StockDetail = (props)=>{
    const [range,setRange] = useState('1d')
    const [chartInterval,setChartInterval] = useState(5)
    const [activeRange,setActiveRange] = useState('1d')

    let symbol = props.match.params.symbol
    useEffect(()=>{
        //1d 5d 1m 3m 6m 1y 2y 5y ytd
        props.getSingleStock(symbol,range,chartInterval)
    },[range])
    function abbreviateNumber(value) {
        if(value){
            let newValue = value;
            const suffixes = ["", "K", "M", "B","T"];
            let suffixNum = 0;
            while (newValue >= 1000) {
              newValue /= 1000;
              suffixNum++;
            }
          
            newValue = newValue.toPrecision(3);
          
            newValue += suffixes[suffixNum];
            return newValue;
        }       
    }
    function selectRange(range){
        setRange(range)
        setActiveRange(range)
        if(range=='1d'){
            setChartInterval(5)
        }
        else{           
            setChartInterval(null)
        }
        
    }
    function goback(){
        props.history.goBack()
    }
      
    let quote_component = null
    if(props.quote.latestPrice){
        quote_component =
                        <div className={styles.Name_Price_Chart}>
                            <div className={styles.head}>
                                <div className={styles.headline}>{props.quote.companyName}</div>
                                <div className={styles.headline} style={{fontFamily: "'Lora', serif"}}>${props.quote.latestPrice.toLocaleString()}</div>
                            </div>
                            <div className={styles.logo}>
                                <img src={props.logo}></img>
                            </div>
                            <ul className={styles.rangeChoice}>
                                <button onClick={()=>selectRange('1d')} className={activeRange=='1d'?styles.RangeChoiceActive:null}>1d</button>
                                <button onClick={()=>selectRange('5d')} className={activeRange=='5d'?styles.RangeChoiceActive:null}>5d</button>
                                <button onClick={()=>selectRange('1m')} className={activeRange=='1m'?styles.RangeChoiceActive:null}>1m</button>
                                <button onClick={()=>selectRange('3m')} className={activeRange=='3m'?styles.RangeChoiceActive:null}>3m</button>
                                <button onClick={()=>selectRange('6m')} className={activeRange=='6m'?styles.RangeChoiceActive:null}>6m</button>
                                <button onClick={()=>selectRange('1y')} className={activeRange=='1y'?styles.RangeChoiceActive:null}>1y</button>
                                <button onClick={()=>selectRange('2y')} className={activeRange=='2y'?styles.RangeChoiceActive:null}>2y</button>
                            </ul>
                            <hr></hr>
                            <LineGraph symbol={symbol} chartData={props.chart}></LineGraph>
                        </div>
    }
    
    let userPosition = null
    if(props.userStocks.length>0){
        // let orders = props.orders
        // let symbolOrders = orders.filter(item=>item.)
        let stock = props.userStocks.find(item=>{return item.symbol==symbol.toLowerCase()})
        userPosition = <div className={styles.position}>
                            <div className={styles.positionTitle}>Your Position</div>
                            <div className={styles.positionBody}>
                                <div className={styles.positionItem}>
                                    <div className={styles.statsProp}>SHARES</div>
                                    <div>{stock.shares}</div>
                                </div>
                                <div className={styles.positionItem}>
                                    <div className={styles.statsProp}>EQUITY</div>
                                    <div>${stock.shares * props.quote.latestPrice}</div>
                                </div>
                                <div className={styles.positionItem}>
                                    <div className={styles.statsProp}>AVG COST</div>
                                    <div></div>
                                </div>
                                <div className={styles.positionItem}>
                                    <div className={styles.statsProp}>TODAY'S RETURN</div>
                                    <div>${stock.shares*(props.quote.latestPrice-props.quote.previousClose).toLocaleString()}</div>
                                </div>
                                <div className={styles.positionItem}>
                                    <div className={styles.statsProp}>TOTAL RETURN</div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
    }

    return (
        <div className={styles.StockDetail}>
            <div className={styles.backbutton} onClick={goback}>&#10094; Back</div>
            {quote_component}
            <div className={styles.trade}>
                <div className={styles.tradeTitle}>Trade</div>
                <div className={styles.type}>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="Buy"
                            checked={true}
                        />
                        Buy
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="Sell"
                            checked={false}
                        />
                        Sell
                    </label>
                </div>
                <div className={styles.order}>order</div>
                <div className={styles.price}>price</div>
                <div className={styles.review}>review</div>
            </div>
            {userPosition}
            <div className={styles.stats}>
                <div className={styles.statsTitle}>Stats</div>
                <div className={styles.statsBody}>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>OPEN</div>
                        <div>{props.quote.open}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>VOLUME</div>
                        <div>{abbreviateNumber(props.quote.latestVolume)}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>HIGH</div>
                        <div>{props.quote.high}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>AVG VOL</div>
                        <div>{abbreviateNumber(props.quote.avgTotalVolume)}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>LOW</div>
                        <div>{props.quote.low}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>MKT CAP</div>
                        <div>{abbreviateNumber(props.quote.marketCap)}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>52 WK HIGH</div>
                        <div>{props.quote.week52High}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>P/E RATIO</div>
                        <div>{props.quote.peRatio}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>52 WK LOW</div>
                        <div>{props.quote.week52Low}</div>
                    </div>
                    <div className={styles.statsItem}>
                        <div className={styles.statsProp}>EXTENDED PRICE</div>
                        <div>{props.quote.extendedPrice}</div>
                    </div>

                </div>
            </div>
            <div className={styles.news}>
                <div className={styles.NewsHead}>News</div>
                <News news={props.news}></News>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        quote: state.market.quote,
        logo: state.market.logo,
        news: state.market.stockNews,
        chart: state.market.chart,
        userStocks: state.portfolio.stocks,
        orders: state.portfolio.orders
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getSingleStock: (symbol,range,chartInterval)=>dispatch(actions.getStockDetail(symbol,range,chartInterval))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StockDetail))