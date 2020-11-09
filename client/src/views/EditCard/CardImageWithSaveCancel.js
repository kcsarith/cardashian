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
                src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/poker-playing-card-ace-club-miroslav-nemecek.jpg"
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
