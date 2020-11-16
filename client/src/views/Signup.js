import React, { useState, useContext } from 'react';
import { Form, Input, message, Button, Row, Col, Avatar, Typography, Select, Upload, Image } from 'antd';
import { LoadingOutlined, PlusOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'

import { UserContext } from '../Context';
import { countries } from '../cardData';
import ImgCrop from 'antd-img-crop';
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 21,
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



const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

const Signup = () => {
    const history = useHistory();
    const { fetchWithCSRF, setUserInfo } = useContext(UserContext);
    const onFinish = async (values) => {
        if (uploadProfilePicState.filename) values.user.profile_pic_src = `https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/users/${formInputState.username}/profiles/${uploadProfilePicState.filename}`
        if (uploadBackgroundPicState.filename) values.user.background_src = `https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/users/${formInputState.username}/backgrounds/${uploadBackgroundPicState.filename}`
        console.log(values);
        const res = await fetchWithCSRF('/api/session/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(values)
        })
        if (res.ok) {
            const data = await res.json();
            const { user, access_token } = data[0]
            Cookies.set("XSRF_TOKEN", access_token)
            await setUserInfo(user);
            history.push(`/${user.username}`)
            return user;
        }
    };
    const [formInputState, setFormInputState] = useState({ username: '' })
    const [uploadProfilePicState, setUploadProfilePicState] = useState({ loading: false, imageUrl: null, filename: '' });
    const [uploadBackgroundPicState, setUploadBackgroundPicState] = useState({ loading: false, imageUrl: null, filename: '' });

    const onChangeInput = (e) => {
        setFormInputState({ ...formInputState, username: e.target.value })
    }
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUploadProfile(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const uploadButton = (
        <div >
            {uploadProfilePicState.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    function beforeUploadBackground(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const uploadBackgroundButton = (
        <div className="ant-upload-drag-icon">
            {uploadBackgroundPicState.loading ? <LoadingOutlined /> : <><p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p></>}
        </div>
    );

    const handleChangeProfilePic = async info => {
        await setUploadProfilePicState({ ...uploadProfilePicState, filename: info.file.name })
        if (info.file.status === 'uploading') {
            setUploadProfilePicState({ ...uploadProfilePicState, filename: info.file.name, loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file)
            console.log(uploadProfilePicState)
            // Get this url from response in real world.
            // const res = await fetchWithCSRF('/api/aws/users/demo/profiles', {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "multipart/form-dataitem/json"
            //     },
            //     credentials: 'include',
            //     body: JSON.stringify(info.file)
            // })
            // if (res.ok) {
            //     const data = await res.json();
            //     console.log(data)
            //     return data;
            // }
            getBase64(info.file.originFileObj, imageUrl =>
                setUploadProfilePicState({
                    ...uploadProfilePicState,
                    filename: info.file.name,
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    const handleChangeBackgroundPic = async info => {
        await setUploadBackgroundPicState({ ...uploadBackgroundPicState, filename: info.file.name })
        if (info.file.status === 'uploading') {
            setUploadBackgroundPicState({ ...uploadBackgroundPicState, filename: info.file.name, loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                setUploadBackgroundPicState({
                    ...uploadBackgroundPicState,
                    filename: info.file.name,
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    return (
        <Row style={{
            margin: 'auto', padding: '5em 10em', backgroundImage: 'url(https://media2.giphy.com/media/aRZ4vTsHnyW6A/giphy.gif)', backgroundSize: 'cover'
        }}>
            <Col span={12} style={{ overflow: 'hidden' }}>
                <div style={uploadBackgroundPicState.imageUrl ? { height: '100%', backgroundImage: `url(${uploadBackgroundPicState.imageUrl})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center' } :
                    { height: '100%', backgroundColor: 'grey', backgroundSize: 'cover', display: 'flex', justifyContent: 'center' }} >
                    {uploadProfilePicState.imageUrl ? <Avatar size={256} style={{ marginTop: '1em' }} icon={
                        <img
                            width='100%'
                            height='100%'
                            style={{
                                borderRadius: '50%',
                            }}
                            src={uploadProfilePicState.imageUrl} />
                    } /> :
                        <Avatar size={256} style={{ marginTop: '1em' }} icon={<UserOutlined />} />}
                </div>
            </Col>
            <Col span={12} style={{ backgroundColor: 'white', padding: '5em 5em' }}>
                <Typography.Title style={{ textAlign: 'center' }}>Join Cardashian</Typography.Title>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name={['user', 'username']}
                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                onChange={onChangeInput}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name={['user', 'alias']}
                                label="Nickname"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
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
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name={["user", "password"]}
                                label="Confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The two passwords that you entered do not match!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
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
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name={['user', 'city']}
                                label="City"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        {/* <Form.Item
                        name={["user", "profile_pic"]}
                        label="Profile"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    > */}
                        {formInputState.username && <>
                            <Col span={4} style={{ alignSelf: 'center', marginBottom: '3em' }}>
                                <ImgCrop shape='round' rotate name="avatar">
                                    <Upload
                                        name="file"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action={`/api/aws/users/${formInputState.username}/profiles`}
                                        beforeUpload={beforeUploadProfile}
                                        onChange={handleChangeProfilePic}
                                    >
                                        {uploadProfilePicState.imageUrl ? <img src={uploadProfilePicState.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </ImgCrop>
                            </Col>
                            {/* </Form.Item> */}
                            <Col span={20} style={{ marginBottom: '3em' }}>
                                <ImgCrop aspect={3 / 1} rotate>
                                    {/* <Form.Item
                            name={["user", "background_pic"]}
                            label="Background"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        > */}
                                    <Upload.Dragger
                                        name="file"
                                        listType="picture"
                                        showUploadList={false}
                                        action={`/api/aws/users/${formInputState.username}/backgrounds`}
                                        beforeUpload={beforeUploadBackground}
                                        onChange={handleChangeBackgroundPic}
                                    >
                                        {uploadBackgroundPicState.imageUrl ? <img src={uploadBackgroundPicState.imageUrl} alt="background" style={{ width: '100%' }} /> :
                                            uploadBackgroundButton}
                                    </Upload.Dragger>
                                    {/* </Form.Item> */}
                                </ImgCrop>
                            </Col>
                        </>}
                        <Col span={24}>
                            <Form.Item name={['user', 'about_me']} label="About Me">
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Col>
        </Row >
    );
};

export default Signup;
