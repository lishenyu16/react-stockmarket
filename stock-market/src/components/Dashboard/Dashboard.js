import React from 'react'
import styles from './Dashboard.module.css'
const Dashboard = (props)=>{
    return (
        <div className={styles.Dashboard}>
            <div className={styles.welcome}>
                Hello {localStorage.getItem('username')} !
            </div>
        </div>
    )
}

export default Dashboard