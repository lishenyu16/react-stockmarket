const api_quote = 'https://api.iextrading.com/1.0/stock/${symbol}/quote'
const res_qupte = {
    "symbol": "TSLA",
    "companyName": "Tesla Inc.",
    "primaryExchange": "Nasdaq Global Select",
    "sector": "Consumer Cyclical",
    "calculationPrice": "close",
    "open": 246.94,
    "openTime": 1557322200709,
    "close": 244.84,
    "closeTime": 1557345601092,
    "high": 250.599,
    "low": 244.2,
    "latestPrice": 244.84,
    "latestSource": "Close",
    "latestTime": "May 8, 2019",
    "latestUpdate": 1557345601092,
    "latestVolume": 5887963,
    "iexRealtimePrice": 244.77,
    "iexRealtimeSize": 100,
    "iexLastUpdated": 1557345599580,
    "delayedPrice": 244.84,
    "delayedPriceTime": 1557345601092,
    "extendedPrice": 244.8,
    "extendedChange": -0.04,
    "extendedChangePercent": -0.00016,
    "extendedPriceTime": 1557349193385,
    "previousClose": 247.06,
    "change": -2.22,
    "changePercent": -0.00899,
    "iexMarketPercent": 0.02135,
    "iexVolume": 125708,
    "avgTotalVolume": 11100920,
    "iexBidPrice": 0,
    "iexBidSize": 0,
    "iexAskPrice": 0,
    "iexAskSize": 0,
    "marketCap": 42538557424,
    "peRatio": -41.64,
    "week52High": 387.46,
    "week52Low": 231.13,
    "ytdChange": -0.21948916161485876
    }

const api_logo = 'https://api.iextrading.com/1.0/stock/${symbol}/logo'
const res_logo = {
    "url": "https://storage.googleapis.com/iex/api/logos/TSLA.png"
    }

const api_news = 'https://api.iextrading.com/1.0/stock/${symbol}/logo'

const res_news = 
[
    {
    "datetime": "2019-05-08T15:45:34-04:00",
    "headline": "Volkswagen starts taking preorders for long-range EV",
    "source": "SeekingAlpha",
    "url": "https://api.iextrading.com/1.0/stock/tsla/article/6759508159564467",
    "summary": "     Volkswagen ( OTCPK:VWAGY ) says its ID.3 long-range electric car will  start  at $33,600.   More news on: Volkswagen AG ADR, Bayerische Motoren Werke Aktiengesellschaft, Tesla, Inc., Consumer stocks news, Global news and forex    Read more …     ",
    "related": "AUT10209,AUT10209017,BMWYY,CON102,DDAIF,INTHPINK,NASDAQ01,SCITECH1,TSLA,VWAGY",
    "image": "https://api.iextrading.com/1.0/stock/tsla/news-image/6759508159564467"
    },
    {
    "datetime": "2019-05-08T12:38:47-04:00",
    "headline": "Tesla closes on $2.7B capital raise",
    "source": "SeekingAlpha",
    "url": "https://api.iextrading.com/1.0/stock/tsla/article/8706545159648415",
    "summary": "     Tesla (NASDAQ: TSLA ) closed on its public offerings of 3.55M shares and $1.84B worth of 2% convertible senior notes due May 15, 2024. Underwriters exercised their options in full for both the stock and bond offering.   More news on: Tesla, Inc., Consumer stocks news,     Read more …     ",
    "related": "AUT10209,AUT10209017,CON102,NASDAQ01,SCITECH1,TSLA",
    "image": "https://api.iextrading.com/1.0/stock/tsla/news-image/8706545159648415"
    }
]

const api_chart = 'https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}'
const res_chart = [
    {
        "date": "20190508",
        "minute": "09:30",
        "label": "09:30 AM",
        "high": 246.865,
        "low": 246.45,
        "average": 246.832,
        "volume": 221,
        "notional": 54549.85,
        "numberOfTrades": 3,
        "marketHigh": 247,
        "marketLow": 246,
        "marketAverage": 246.85,
        "marketVolume": 95556,
        "marketNotional": 23587955.975,
        "marketNumberOfTrades": 167,
        "open": 246.625,
        "close": 246.865,
        "marketOpen": 246.94,
        "marketClose": 246.262,
        "changeOverTime": 0,
        "marketChangeOverTime": 0
    },
    {},
    {}
]