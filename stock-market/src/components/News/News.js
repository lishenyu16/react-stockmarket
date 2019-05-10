import React from 'react'
import NewsItem from './NewsItem'
import styles from './News.module.css'
const News = (props)=>{
    let news = props.news
    return (
        <div className={styles.News}>
            {news.map((newsItem, index) => {
                return (
                    <div key={index}>
                        <hr />
                        <NewsItem newsItem = {newsItem} />
                    </div>
                )
            })}
        </div>
    )

}
export default News