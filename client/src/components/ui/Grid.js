import React from 'react';
import { getBasicProps, marginClasses } from './utils'
import '../../nsa.css'

const checkMarginProps = (props) => {
    for (let key in props) {
        if (marginClasses.includes(key)) return true;
    }
    return false;
}

export const Grid = (props) => {
    const classArray = getBasicProps(props)
    //Default Props
    classArray.push('display-grid', 'grid-columns-12')
    return (
        <div className={classArray.join(' ')} >
            {props.children}
        </div>
    )
}
