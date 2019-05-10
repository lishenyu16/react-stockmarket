const initialState={
    marketStocks:[],
    quote:{},
    logo:'',
    stockNews:[],
    chart: [],
    topNews:[]
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case('fetchMarketStocks'):
            let obj = action.marketStocks
            let arr =[]
            for(let key in obj){
                arr.push({[key]:obj[key]})
            }
            return {...state, marketStocks: arr}
        case('getStockDetail'):
            let details = action.stockDetails
            //quote logo news chart
            return {
                ...state, 
                quote: details[0],
                logo: details[1],
                stockNews: details[2],
                chart: details[3]
            }
        default:
            return state
    }
}

export default reducer