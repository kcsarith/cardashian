import React from 'react';
import { Typography, Row, Col } from 'antd'

const NotFound = () => {
    return (

        <Row style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundSize: 'cover',
        }}>
            <Col span={24}>
                <Typography.Title style={{ textAlign: 'center', color: 'grey', fontSize: '7em' }} level={1}>404 Not Found</Typography.Title>
                <Typography.Title style={{ textAlign: 'center', color: 'grey', fontSize: '5em' }} level={1}>The request page could not be found.</Typography.Title>
            </Col >
        </Row >
    )
}
export default NotFound;
