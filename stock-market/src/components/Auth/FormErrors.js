import React from 'react'
import styles from './Auth.module.css'
export const FormErrors = ({formErrors}) =>
        <div className={styles.FormErrors}>
            {Object.keys(formErrors).map((fieldName, i) => {
                if(formErrors[fieldName].length > 0){
                    return (
                        <p key={i} style={{color:'red'}}>{fieldName} {formErrors[fieldName]}</p>
                    )        
                } else {
                    return '';
                }
            })}
        </div>

