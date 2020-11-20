import React from 'react';
import { Row, Col, Card } from 'antd';

const GridFetchedGames = (props) => {
    const games = props.games;
    const placeholderImage = 'data:image/png;base64,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'
    return (
        <>
            <Row>
                {games.map((ele, index) =>
                    <Col span={4} key={index}>
                        <Card
                            hoverable
                            cover={<img alt="example" src={ele.home_bg_src || placeholderImage} />}
                        >
                            <Card.Meta title={ele.description} description={`created by ${ele.name}`} />
                        </Card>,
                    </Col>)}
            </Row>
        </>
    )
}

export default GridFetchedGames;
