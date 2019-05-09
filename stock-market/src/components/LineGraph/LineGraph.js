import React from 'react';
import {Line} from 'react-chartjs-2';
import styles from './LineGraph.module.css'



const LineGraph = (props)=>{

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: props.symbol,
            fill: false,
            lineTension: 0.1,
            borderColor: 'rgba(75,192,192,1)',
            data: [100, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 1]
          }
        ]
    };
    // const displayName = 'LineExample'
    return (
        <div className={styles.LineGraph}>
            <Line 
                data={data} 
                width={400}
                height={300}
                options={{
                    maintainAspectRatio: true
                }}
            />
        </div>
    )
}

export default LineGraph
