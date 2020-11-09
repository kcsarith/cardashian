import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import { UserContext } from '../Context';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Demo = () => {
    const userContext = useContext(UserContext);
    console.log(userContext);
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>HOMEPAGE
        </>
    );
};
export default Demo;
