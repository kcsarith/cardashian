import React, { useState, useContext } from 'react';
import ImageGallery from 'react-image-gallery';
import { Button, Row, Card, Col, Typography, Statistic, PageHeader, Tabs } from 'antd'


import { UserContext } from '../Context';

const hamsterSrc = 'https://media2.giphy.com/media/g04lCCTUHSw03W7pqD/200.gif'

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
            <div style={{ backgroundColor: 'grey' }}>
                <Typography.Title style={{ textAlign: 'center', color: 'white', padding: '1em' }} level={1}>Featured Games</Typography.Title>
            </div>
            <Row gutter={16} style={{ display: 'flex', justifyContent: 'center' }}>
                <Col span={12}>
                    <Statistic title="Active Users" value={58} style={{ textAlign: 'center' }} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total Cards" value={600} style={{ textAlign: 'center' }} />
                </Col>
            </Row>
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
                    featuredGamesList && featuredGamesList.map((ele, index) => {
                        let eleUsername
                        switch (ele.user_id) {
                            case 1:
                                eleUsername = 'guest';
                                break;
                            case 2:
                                eleUsername = 'Ian';
                                break;
                            case 3:
                                eleUsername = 'Javier';
                                break;
                            case 4:
                                eleUsername = 'Dean';
                                break;
                            case 5:
                                eleUsername = 'Angela';
                                break;
                            case 6:
                                eleUsername = 'Soon-Mi';
                                break;
                            case 7:
                                eleUsername = 'Alissa';
                                break;
                            case 8:
                                eleUsername = 'demo';
                                break;
                            default:
                                break;

                        }
                        return (
                            <Col span={5} style={{ padding: '1em', overflow: 'hidden' }}>
                                <a href={`${eleUsername}/${ele.name}`}>
                                    <Card
                                        cover={<img alt="example" height={256} src={ele.home_bg_src ? ele.home_bg_src : "https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg"} />}
                                    >
                                        <Card.Meta title={ele.name} description="www.instagram.com" />
                                    </Card>
                                </a>
                            </Col>
                        )
                    })
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
