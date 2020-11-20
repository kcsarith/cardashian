import React, { useState, useContext, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { Button, Row, Card, Col, Typography, Statistic, PageHeader, Tabs } from 'antd'


import { UserContext } from '../Context';

const Homepage = () => {

    const { userInfo, featuredGamesList, featuredCardsList, featuredUsersList, fetchWithCSRF } = useContext(UserContext);
    console.log(featuredUsersList)
    const [imageGalleryState, setImageGalleryState] = useState({ currentSlide: 0 });
    const [usersListState, setUsersListState] = useState([]);
    const gameImages = featuredGamesList.map(ele => {
        return { original: ele.home_bg_src, thumbnail: 'https://picsum.photos/id/1015/250/150/' }
    });
    const handleSlide = (e) => {
        setImageGalleryState({ ...imageGalleryState, currentSlide: e });
    }
    useEffect(() => {
        async function fetchUsers() {
            const res = await fetchWithCSRF(`/api/users`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res) {
                const { users } = await res.json()
                console.log(users)
                await setUsersListState({ users });
            }
        }

        fetchUsers();
    }, []);
    return (
        <>
            <div style={{ backgroundImage: `url(https://thumbs.gfycat.com/ComplexNiceBadger-max-1mb.gif)`, backgroundSize: 'contain' }}>
                <Typography.Title style={{ textAlign: 'center', color: 'white', padding: '1em' }} level={1}>Users</Typography.Title>
            </div>
            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                {
                    usersListState.users && usersListState.users.map((ele, index) => {
                        return (
                            <Col span={5} style={{ padding: '1em', overflow: 'hidden' }} key={ele.id}>
                                <a href={`${ele.username}`}>
                                    <Card
                                        cover={<img alt="example" height={256} src={ele.profile_pic_src ? ele.profile_pic_src : "https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg"} />}
                                    >
                                        <Card.Meta title={ele.username} />
                                    </Card>
                                </a>
                            </Col>
                        )
                    })
                }
            </Row>
            <div style={{ backgroundImage: `url(https://thumbs.gfycat.com/ComplexNiceBadger-max-1mb.gif)`, backgroundSize: 'contain' }}>
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
                                        <Card.Meta title={ele.name} description={`created by ${ele.name}`} />
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
