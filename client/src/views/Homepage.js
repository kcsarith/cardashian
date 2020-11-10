import React from 'react';
import ImageGallery from 'react-image-gallery';

import HeroImage from '../components/elements/HeroImage'

import { Button, Row, Card, Col, Typography } from 'antd'
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
const Homepage = () => {
    const contentStyle = {
        height: '320px',
        color: '#fff',
        lineHeight: '320px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <>
            <HeroImage
                imageSrc="https://csshint.com/wp-content/uploads/2020/01/CSS-Animated-Backgrounds-2.gif"
                color="#CCCCCC"
                gradientDirection="to bottom right"
                height="400px"
                opacity="0.1"
                childrenStyles={{ color: '#f7f7f7' }}
                parallax
                textPosition="center"
            >
                <h1 style={{ color: 'white' }}>Some compelling headline!</h1>
                <h2 style={{ color: 'white' }}>Something about what we offer</h2>
                <Button primary>Click me!</Button>
            </HeroImage>
            <Typography.Title style={{ textAlign: 'center' }} level={3}>CARDASHIAN</Typography.Title>
            <Row style={{ justifyContent: 'center' }}>
                <Col span={8} >
                    <ImageGallery items={images} thumbnailPosition='right' showBullets autoPlay slideDuration={400} slideInterval={1000} />
                </Col>
                <Col span={4}>
                    <Card title="Game 1" extra={<a href="#">More</a>} style={{ height: '100%' }}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu egestas lorem. Integer fermentum dictum augue, eget tincidunt velit fringilla in. Interdum et malesuada fames ac ante ipsum</p>
                    </Card>
                </Col>
            </Row>
            <Row style={{ justifyContent: 'center' }}>

            </Row>
        </>
    )
}
export default Homepage;
