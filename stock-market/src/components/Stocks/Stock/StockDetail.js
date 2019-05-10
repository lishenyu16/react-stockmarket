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

    if(range!=='1d'){
        setChartInterval(null)
    }
    useEffect(()=>{
        //1d 5d 1m 3m 6m 1y 2y 5y ytd
        props.getSingleStock(symbol,range,chartInterval)
    },[])
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
        setActiveRange(range)
    }
    
      
    let quote_component = null
    if(props.quote.latestPrice){
        quote_component =
                        <div className={styles.Name_Price_Chart}>
                            <div className={styles.head}>
                                <div className={styles.headline}>{props.quote.companyName}</div>
                                <div className={styles.headline} style={{fontFamily: "'Lora', serif"}}>${props.quote.close.toLocaleString()}</div>
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
                                <button onClick={()=>selectRange('3y')} className={activeRange=='3y'?styles.RangeChoiceActive:null}>3y</button>
                            </ul>
                            <hr></hr>
                            <LineGraph symbol={symbol} chartData={props.chart}></LineGraph>
                        </div>
    }
    
    let userPosition = null
    if(props.userStocks.length>0){
        userPosition = <div className={styles.position}>Your Position</div>
    }

    return (
        <div className={styles.StockDetail}>
            {quote_component}
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
                        <div className={styles.statsProp}>DIV/YIELD</div>
                        <div>-</div>
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
        userStocks: state.portfolio.stocks
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getSingleStock: (symbol,range,chartInterval)=>dispatch(actions.getStockDetail(symbol,range,chartInterval))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StockDetail))