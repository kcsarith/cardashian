import React from 'react';
import { getBasicProps, marginClasses } from './utils'
import '../../nsa.css'

const checkMarginProps = (props) => {
    for (let key in props) {
        if (marginClasses.includes(key)) return true;
    }
    return false;
}

export const Container = (props) => {
    const classArray = getBasicProps(props)
    const containsMarginProps = checkMarginProps(props);
    //Default Props
    if (!containsMarginProps) classArray.push('m-auto');
    if (!props.width) classArray.push('width-75');
    console.log(props.children)
    return (
        <div className={classArray.join(' ')}>
            {props.children}
        </div>
    )
}
