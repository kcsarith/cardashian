import React from 'react';
import { Image, Button, Descriptions } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const CardImageWithSaveCancel = (props) => {
    return (
        <>
            <Button type="primary" block icon={<DownloadOutlined />} >Save</Button>
            <Button type="primary" block icon={<DownloadOutlined />} >Cancel</Button>
            <Image
                width='100%'
                src="https://cdn.donmai.us/sample/0f/07/__suou_patra_honey_strap_drawn_by_kusumoto_shizuru__sample-0f07c9304df386b81c0c6d59446ce352.jpg"
            />
            <Descriptions title="Card Info" bordered>
                <Descriptions.Item span={3} label="Product">Cloud Database</Descriptions.Item>
                <Descriptions.Item span={3} label="Billing Mode">Prepaid</Descriptions.Item>
                <Descriptions.Item span={3} label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item span={3} label="Order time">2018-04-24 18:00:00</Descriptions.Item>
            </Descriptions>
        </>
    );
}

export default CardImageWithSaveCancel;
