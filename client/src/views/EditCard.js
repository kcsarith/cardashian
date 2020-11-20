import React from 'react';
import { Row, Col } from 'antd';
// import { Container, Grid, } from '@material-ui/core';

import CardImageWithSaveCancel from './EditCardEffect/CardImageWithSaveCancel'
import CardAndOwnerName from './EditCardEffect/CardAndOwnerName';
import EditEffect from './EditCardEffect/EditEffect';

const EditCard = () => {
    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={18}>
                    <CardAndOwnerName />
                    <EditEffect />
                </Col>
                <Col span={6}>
                    <CardImageWithSaveCancel />
                </Col>
            </Row>
        </>
    )
}
export default EditCard;
