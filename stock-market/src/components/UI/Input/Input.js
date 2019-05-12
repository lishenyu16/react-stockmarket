import React from 'react'
import styles from './Input.module.css'
const input = (props)=>{
    let inputElement=null
    switch(props.inputtype){
        case('input'):
            inputElement=<input className={styles.InputElement} type={props.type} name={props.name} required={props.required} value={props.value} onChange={props.changed} />
            break
        case('textarea'):
            inputElement=<textarea className={styles.InputElement} type={props.type} name={props.name} required={props.required} value={props.value} onChange={props.changed} />
            break
        case('select'):
            inputElement=(
                <select className={styles.InputElement} value={props.value} onChange={props.changed}>
                    {props.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            )
            break
        default:
            inputElement=<input className={styles.InputElement} {...props} ></input>
    }
    return(
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input