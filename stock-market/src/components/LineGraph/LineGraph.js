import React from 'react';
import {Line} from 'react-chartjs-2';
import styles from './LineGraph.module.css'



const LineGraph = (props)=>{

    let chartDataArr = props.chartData
    const labels = []
    const values = []
    chartDataArr.forEach(element => {
        labels.push(element.label)
        values.push(element.average)
    });
    const data = {
        labels: labels,//['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: props.symbol,
            fill: false,
            lineTension: 0.1,
            borderColor: 'rgba(75,192,192,1)',
            data: values//[50,80,20,70,10,90,120,30,90,40,60,100,25,40]
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
