import React from 'react';
import { Card, Image, Button, Descriptions } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
const CardImageWithSaveCancel = (props) => {
    return (
        <>
            <Card
                title={<><Button type="primary" icon={<DownloadOutlined />} >Save</Button><Button type="primary" icon={<DownloadOutlined />} >Cancel</Button></>}
                bordered={false} style={{ width: '100%' }}>
                <Image
                    width='100%'
                    src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/poker-playing-card-ace-club-miroslav-nemecek.jpg"
                />
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </>
    );
}

export default CardImageWithSaveCancel;
