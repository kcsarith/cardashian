export const marginClasses = ['m', 'mt', 'mb', 'ml', 'mr', 'mx', 'my']
export const paddingClasses = ['p', 'pt', 'pb', 'pl', 'pr', 'px', 'py']

const checkMarginProps = (props) => {
    for (let key in props) {
        if (marginClasses.includes(key)) return true;
    }
    return false;
}

export function getBasicProps(props) {
    let classArray = [];

    const containsMarginProps = checkMarginProps(props);


    //Flex
    if (props.flex) classArray.push('display-flex');
    if (props.flexJustify) {
        switch (props.flexJustify) {
            case 'start':
                classArray.push(`flex-justify-${props.flexJustify}`)
                break;
            case 'end':
                classArray.push(`flex-justify-${props.flexJustify}`)
                break;
            case 'center':
                classArray.push(`flex-justify-${props.flexJustify}`)
                break;
            case 'between':
                classArray.push(`flex-justify-${props.flexJustify}`)
                break;
            case 'around':
                classArray.push(`flex-justify-${props.flexJustify}`)
                break;
            default:
        }
    }
    if (props.flexAlign) {
        switch (props.flexAlign) {
            case 'start':
                classArray.push(`flex-align-${props.flexAlign}`)
                break;
            case 'end':
                classArray.push(`flex-align-${props.flexAlign}`)
                break;
            case 'center':
                classArray.push(`flex-align-${props.flexAlign}`)
                break;
            case 'baseline':
                classArray.push(`flex-align-${props.flexAlign}`)
                break;
            case 'stretch':
                classArray.push(`flex-align-${props.flexAlign}`)
                break;
            default:
        }
    }
    if (props.flexDirection) {
        switch (props.flexDirection) {
            case 'row':
                classArray.push(`flex-direction-${props.flexDirection}`)
                break;
            case 'row-reverse':
                classArray.push(`flex-direction-${props.flexDirection}`)
                break;
            case 'column':
                classArray.push(`flex-justify-${props.flexDirection}`)
                break;
            case 'column-reverse':
                classArray.push(`flex-direction-${props.flexDirection}`)
                break;
            default:
        }
    }
    if (props.flexWrap) {
        switch (props.flexWrap) {
            case 'wrap':
                classArray.push(`flex-wrap`)
                break;
            case 'row-reverse':
                classArray.push(`flex-wrap-${props.flexWrap}`)
                break;
            case 'column':
                classArray.push(`flex-justify-${props.flexWrap}`)
                break;
            case 'column-reverse':
                classArray.push(`flex-direction-${props.flexWrap}`)
                break;
            default:
        }

    } if (props.selfAlign) {
        switch (props.selfAlign) {
            case 'start':
                classArray.push(`self-align-${props.selfAlign}`);
                break;
            case 'end':
                classArray.push(`self-align-${props.selfAlign}`);
                break;
            case 'center':
                classArray.push(`self-align-${props.selfAlign}`);
                break;
            case 'baseline':
                classArray.push(`self-align-${props.selfAlign}`);
                break;
            case 'stretch':
                classArray.push(`self-align-${props.selfAlign}`);
                break;
            default:
        }
    }
    if (props.textAlign) {
        switch (props.textAlign) {
            case 'center' || 'left' || 'right':
                classArray.push(`text-align-${props.textAlign}`);
                break;
            default:
        }
    }
    //PADDING
    for (let key in props) {
        const value = props[key]
        //Check if padding and margin of 0 thru 5
        if (marginClasses.concat(paddingClasses).includes(key) && (value >= 0 && value <= 5)) classArray.push(`${key}-${value}`)
        //Check for proper width and height props
        if ((key === 'width' || key === 'height') && (value % 5 === 0 && value >= 5 && value <= 100)) classArray.push(`${key}-${value}`);
    }
    // if (props.m >= 0 && props.m <= 5) getClassBasedOnProps.push(`m-${props.m}`)
    // if (props.mt >= 0 && props.mt <= 5) getClassBasedOnProps.push(`mt-${props.mt}`)
    // if (props.mb >= 0 && props.mb <= 5) getClassBasedOnProps.push(`mb-${props.mb}`)
    // if (props.ml >= 0 && props.ml <= 5) getClassBasedOnProps.push(`ml-${props.mt}`)
    // if (props.mr >= 0 && props.mr <= 5) getClassBasedOnProps.push(`mr-${props.mr}`)
    // if (props.mx >= 0 && props.mx <= 5) getClassBasedOnProps.push(`mx-${props.mt}`)
    // if (props.my >= 0 && props.my <= 5) getClassBasedOnProps.push(`my-${props.my}`)
    // else if (!props.m && !props.mt && !props.mb && !props.ml && !props.mr && !props.mx && !props.my) getClassBasedOnProps.push(`m-5`)
    return classArray
}
