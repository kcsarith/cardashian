import React from 'react';
import { Form, Input, InputNumber, Button, Row, Col, Image, Typography, Select } from 'antd';
import UploadBackground from './Signup/UploadBackground'
import { countries } from '../cardData';
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const Signup = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <Row style={{
            margin: 'auto', padding: '10em 20em', backgroundImage: 'url(https://media2.giphy.com/media/aRZ4vTsHnyW6A/giphy.gif)', backgroundSize: 'cover'
        }}>
            <Col span={12}>
                <Image height='100%' width={'100%'} src="https://www.abf.com.au/wp-content/uploads/2012/09/ABF-new.jpg" preview={false} />
                {/* <UploadBackground /> */}
            </Col>
            <Col span={12} style={{ backgroundColor: 'white', padding: '5em 5em' }}>
                <Typography.Title style={{ textAlign: 'center' }}>Join Cardashian</Typography.Title>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'name']}
                        label="Username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'alias']}
                        label="Alias"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'country']}
                        label="Country"
                    >
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select a country"
                            optionFilterProp="children"
                        // filterOption={(input, option) =>
                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                        >
                            {countries.map((ele, index) => <Select.Option key={index} value={ele.code}>{ele.name}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'city']}
                        label="City"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'website']} label="Website">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Signup;
