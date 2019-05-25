import React,{useState,useEffect} from 'react'
import styles from './StockDetail.module.css'
import {Redirect, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import LineGraph from '../../../components/LineGraph/LineGraph'
import News from '../../News/News'
import Spinner from '../../UI/Spinner/Spinner'
import * as actions from '../../../store/actions'

const StockDetail = (props)=>{
    const [range,setRange] = useState('1d')
    const [chartInterval,setChartInterval] = useState(5)
    const [activeRange,setActiveRange] = useState('1d')

    const [tradeType, setTradeType] = useState('buy')
    const [quantity, setQuantity] = useState(0)
    const [orderType, setOrderType] = useState('Market')
    const [loading, setLoading] = useState(false)

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
        let stock = props.userStocks.find(item=>{return item.symbol.toLowerCase()==symbol.toLowerCase()})
        if(stock!=undefined){
            userPosition = (
                <div className={styles.position}>
                    <div className={styles.positionTitle}>Your Position</div>
                    <div className={styles.positionBody}>
                        <div className={styles.positionItem}>
                            <div className={styles.statsProp}>SHARES</div>
                            <div>{stock.shares}</div>
                        </div>
                        <div className={styles.positionItem}>
                            <div className={styles.statsProp}>EQUITY</div>
                            <div>${props.quote.latestPrice?parseFloat(stock.shares * props.quote.latestPrice).toFixed(2).toLocaleString():null}</div>
                        </div>
                        <div className={styles.positionItem}>
                            <div className={styles.statsProp}>AVG COST</div>
                            <div></div>
                        </div>
                        <div className={styles.positionItem}>
                            <div className={styles.statsProp}>TODAY'S RETURN</div>
                            <div>${(stock.shares*(props.quote.latestPrice-props.quote.previousClose)).toFixed(2).toLocaleString()}</div>
                        </div>
                        <div className={styles.positionItem}>
                            <div className={styles.statsProp}>TOTAL RETURN</div>
                            <div></div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            userPosition=null
        }
    }
    const handleTradeTypeChange = (event)=>{
        setTradeType(event.target.value)
    }
    const handleQuantityInput = (event) =>{
        setQuantity(event.target.value)      
    }
    const handleOrderTypeChange = (event) =>{
        setOrderType(event.target.value)
    }
    const handleSubmit = ()=> {
        if(!Number.isInteger(+quantity)){
            alert('Please enter an integer')
        }
        else if(+quantity<1){
            alert('Please enter an integer larger than 0')
        }
        else{
            if(tradeType=='buy'){
                if(props.buyingPower < (+quantity)*props.quote.latestPrice){
                    return alert('No enough buying power!')
                }
                setLoading(true)
                const order = {userId:localStorage.getItem('userId'), symbol:symbol.toLowerCase(), shares:quantity, operation:tradeType}
                props.placeOrder(order)
            }
            else{
                let stock = props.userStocks.find(item=>{return item.symbol.toLowerCase()==symbol.toLowerCase()})
                if( +quantity > stock.shares ){
                    return alert('No enough shares to sell!')
                }
                setLoading(true)
                const order = {userId:localStorage.getItem('userId'), symbol:symbol.toLowerCase(), shares:quantity, operation:tradeType}
                props.placeOrder(order)
            }            
        }     
    }
    let redirect = null
    if(props.tradingSuccess){
        redirect = <Redirect to="/" />
    }
    let tradeComponent= null
    if(!loading){
        tradeComponent = (
            <div className={styles.trade}>
                <div className={styles.tradeTitle}>Trade</div>
                <div className={styles.type}>
                    <label>
                        <input
                            type="radio" name="type"
                            value="buy"
                            checked={tradeType === "buy"}
                            onChange={handleTradeTypeChange} />Buy
                    </label>
                    <label>
                        <input
                            type="radio" name="type"
                            value="sell"
                            checked={tradeType === "sell"}
                            onChange={handleTradeTypeChange} />Sell
                    </label>
                </div>
                <div className={styles.order}>
                    <label>
                        Quantity <input type="text" name="quantity" value={quantity}
                                className={styles.quantityInput}
                                onChange={handleQuantityInput} />
                    </label>
                    <label>
                        Order Type <select onChange={handleOrderTypeChange} 
                                className={styles.orderType}
                                value={orderType}>
                                <option value='Limit' disabled>Limit Price</option>
                                <option value='Market'>Market Price</option>
                                <option value='Stop' disabled>Stop</option>
                                <option value='Stop Limit' disabled>Stop Limit</option>
                            </select>
                    </label>
                </div>
                <div className={styles.price}>
                    <label>
                        Limit Price <input disabled type="text" name="limitprice" 
                                className={styles.quantityInput} />
                    </label>
                    <label>
                        Stop Price <input disabled type="text" name="stopprice" 
                                className={styles.quantityInput} />
                    </label>
                    <label>
                        Expiration <select onChange={handleOrderTypeChange} 
                                className={styles.orderType}
                                value={orderType}>
                                <option value='Day'>Day</option>
                                <option value='GT90'>GT90</option>
                                <option value='PreMarket'>Pre Market</option>
                                <option value='AfterMarket'>After Market</option>
                            </select>
                    </label>
                </div>
                <div className={styles.submit}>
                    <button onClick={handleSubmit} className={styles.submitButton}>Submit Order</button>
                </div>
            </div>
        ) 
    }
    else{
        tradeComponent = <Spinner />
    }
    return (
        <div className={styles.StockDetail}>
            {redirect}
            <div className={styles.backbutton} onClick={goback}>&#10094; Back</div>
            {quote_component}
            {tradeComponent}
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
        orders: state.portfolio.orders,
        tradingSuccess: state.stocks.tradingSuccess,
        tradeLoading: state.portfolio.tradeLoading,
        buyingPower: state.portfolio.buyingPower
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getSingleStock: (symbol,range,chartInterval)=>dispatch(actions.getStockDetail(symbol,range,chartInterval)),
        placeOrder: (order)=>dispatch(actions.placeOrder(order))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(StockDetail))