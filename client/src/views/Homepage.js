import React, { useState, useContext } from 'react';
import ImageGallery from 'react-image-gallery';
import { Button, Row, Card, Col, Typography, Divider, PageHeader, Tabs } from 'antd'


import { UserContext } from '../Context';

const hamsterSrc = "data:image/jpeg;base64,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";

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const recommendedGames = [
    { title: 'Game 1', imageSrc: hamsterSrc, creator: 'Nobody' },
    { title: 'Game 2', imageSrc: hamsterSrc, creator: 'Nobody' },
    { title: 'Game 2', imageSrc: hamsterSrc, creator: 'Nobody' }
];
const Homepage = () => {

    const { userInfo, featuredGamesList, featuredCardsList } = useContext(UserContext);
    const [imageGalleryState, setImageGalleryState] = useState({ currentSlide: 0 });
    const gameImages = featuredGamesList.map(ele => {
        return { original: ele.home_bg_src, thumbnail: 'https://picsum.photos/id/1015/250/150/' }
    });
    console.log(gameImages)
    const handleSlide = (e) => {
        setImageGalleryState({ ...imageGalleryState, currentSlide: e });
    }

    return (
        <>
            <div style={{ backgroundColor: 'grey', flex: 'center' }}>
                <Typography.Title style={{ textAlign: 'center', color: 'white', padding: '1em' }} level={1}>Featured Games</Typography.Title>
            </div>
            {/* <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: '3em' }}>
                <Col span={8} >
                    <ImageGallery originalClass={{ objectFit: 'cover', height: '640px', width: '240px' }}
                        items={gameImages} thumbnailPosition='right' showBullets autoPlay slideDuration={100} slideInterval={1000000} onSlide={handleSlide} />
                </Col>
                <Col span={4}>
                    <Card title={`Game ${imageGalleryState.currentSlide}`} extra={<a href="#">View</a>} style={{ height: '100%' }}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu egestas lorem. Integer fermentum dictum augue, eget tincidunt velit fringilla in. Interdum et malesuada fames ac ante ipsum</p>
                    </Card>
                </Col>
            </Row> */}
            <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: '3em' }}>
                {
                    featuredGamesList && featuredGamesList.map((ele, index) => <Col span={5} style={{ padding: '1em', overflow: 'hidden' }}>
                        <Card
                            hoverable
                            cover={<img alt="example" height={256} src={ele.home_bg_src ? ele.home_bg_src : "https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg"} />}
                        >
                            <Card.Meta title={ele.name} description="www.instagram.com" />
                        </Card></Col>)
                }
            </Row>
            <div style={{ backgroundColor: 'white', flex: 'center' }}>
                <Typography.Title style={{ textAlign: 'center', padding: '1em' }} level={1}>Featured Cards</Typography.Title>
            </div>
            <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: '3em', marginLeft: '10em', marginRight: '10em' }}>
                {
                    featuredCardsList && featuredCardsList.map((ele, index) => <Col span={4} style={{ padding: '1em', overflow: 'hidden' }}>
                        <Card
                            hoverable
                            cover={<img alt="example" height={256} src={ele.card_image_src ? ele.card_image_src : "https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg"} />}
                        >
                            <Card.Meta title={ele.name} description="www.instagram.com" />
                        </Card></Col>)
                }
            </Row>

            {/* <Row style={{ color: 'white', display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', marginTop: '3em', background: '#364d79' }} >
                <Col span={24} >
                    <Typography.Title style={{ color: 'white' }}>Recommened For You</Typography.Title>
                </Col>
                {recommendedGames.map((ele, index) => <Col span={6} key={index} >
                    <img alt="example" style={recommendedGameStyle} src={ele.imageSrc} />
                    <p>{ele.title}</p>
                    <p>{`Created by ${ele.creator}`}</p>
                </Col>)}
            </Row> */}
            {/* <Row style={{ width: '70%', textAlign: 'center' }}>
                <Col span={24} >
                    <Typography.Title style={{ textAlign: 'center' }}>Activity Feed</Typography.Title>
                </Col>
                <Col span={24} >
                    {recommendedGames.map((ele, index) =>
                        <Row key={index} >
                            <Col span={20} >
                                <div>
                                    <Typography.Paragraph>AAA</Typography.Paragraph>
                                    <Typography.Paragraph>AAA</Typography.Paragraph>
                                </div>
                            </Col>
                            <Col span={4}>
                                <Button>View</Button>
                            </Col>
                            <Col span={24}>
                                <Divider />
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row> */}
        </>
    )
}
export default Homepage;
