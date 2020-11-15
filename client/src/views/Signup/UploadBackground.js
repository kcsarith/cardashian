import React from 'react'
import { Upload, message, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const UploadBackground = () => {
    return (
        <a>
            <Upload {...props} style={{ display: 'inline !important' }}>
                <Image height='100%' width='100%' preview={false} style={{ backgroundSize: 'cover', height: '100%', width: '100%' }} src='https://i.pinimg.com/originals/aa/a5/44/aaa544d2f6d08b8a932815c2bc7b8e11.gif' />
            </Upload>
        </a>
    )
}

export default UploadBackground;
