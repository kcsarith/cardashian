import React, { useState } from 'react';
import NewCardForm from './CardsPage/NewCardForm'
import UploadImage from './CardsPage/UploadImage'
import { row, col, Row, Col } from 'antd';
const CardsPage = () => {
    return (
        <>
            <Row>
                <Col span={16}>
                    <NewCardForm />
                </Col>
                <Col span={8}>
                    <UploadImage />
                </Col>
            </Row>
        </>
    );
};

export default CardsPage;
