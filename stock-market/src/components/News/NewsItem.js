import React from 'react'
import styles from './NewsItem.module.css'
const NewsItem = (props)=>{
    let news = props.newsItem
    let date = new Date(news.datetime)
    return (
        <div className={styles.NewsItem}>
            <div className={styles.url}>
                <a href={news.url} target="_blank"> <h3>{ news.headline }</h3> </a>
            </div>
            <div className={styles.source}>
                Source: <em>{ news.source }</em>, { date.toString().substring(4,24) }
            </div>
            <div className={styles.summary}>
                <p>{ news.summary }</p>
            </div>
        </div>
    )
}
export default NewsItem