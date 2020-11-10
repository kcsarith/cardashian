import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { UserContext } from '../Context';
const NormalLoginForm = () => {
    const userContext = useContext(UserContext);
    const onFinish = (values) => {
        async function fetchData() {
            const res = await userContext.login(values.username, values.password)
            if (!res) alert('Failed to fetch data.')
        }
        fetchData();
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();

    return (
        <>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Typography.Title style={{ color: 'white' }} level={3}>Login</Typography.Title>
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ minHeight: '70vh' }}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>

                </Col>
            </Row>
        </>
    );
};

export default NormalLoginForm;
