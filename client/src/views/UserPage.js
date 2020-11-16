import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';

import HeroImage from '../components/elements/HeroImage'
import LoginModal from '../components/LoginModal'
import NotFound from './NotFound';
import { UserContext } from '../Context';

import { Button, Row, Card, Col, Typography, Divider, Image, Avatar } from 'antd'
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



const hamsterSrc = "https://media2.giphy.com/media/g04lCCTUHSw03W7pqD/200.gif"
const recommendedGames = [
    { title: 'Game 1', imageSrc: hamsterSrc, creator: 'Nobody' },
    { title: 'Game 2', imageSrc: hamsterSrc, creator: 'Nobody' },
    { title: 'Game 2', imageSrc: hamsterSrc, creator: 'Nobody' }
];
const UserPage = () => {
    const { username } = useParams();
    const [profilePageState, setProfilePageState] = useState({
        user: {

        },
        userExists: false,

    });
    const { userInfo } = useContext(UserContext)
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(`/api/users/${username}`)
            if (res) {
                const { user } = await res.json()
                setProfilePageState({ ...profilePageState, user, userExists: true })
            } else {
                setProfilePageState({ ...profilePageState, userExists: false })
            }
        }
        fetchUser();
    }, [username]);
    const contentStyle = {
        height: '480px',
        width: '100%',
        color: '#fff',
        marginTop: '3em',
        marginBottom: '3em',
        lineHeight: '480px',
        textAlign: 'center',
        background: '#364d79',
    };
    const recommendedGameStyle = {
        borderRadius: '50%',
    }
    const [imageGalleryState, setImageGalleryState] = useState({ currentSlide: 0 });

    const handleSlide = (e) => {
        setImageGalleryState({ ...imageGalleryState, currentSlide: e });
    }

    return (
        <>{profilePageState.userExists ? <>
            <HeroImage
                imageSrc={profilePageState.user.background_src ?
                    profilePageState.user.background_src :
                    `https://csshint.com/wp-content/uploads/2020/01/CSS-Animated-Backgrounds-2.gif`}
                color="#000000"
                gradientDirection="to bottom right"
                height="400px"
                opacity="0.1"
                childrenStyles={{ color: '#f7f7f7' }}
                parallax
                textPosition="center"
            >
                {profilePageState.user.profile_pic_src ? <Avatar size={256} icon={
                    <img
                        height={256}
                        width={256}
                        style={{
                            borderRadius: '50%',
                        }}
                        src={profilePageState.user.profile_pic_src} />
                } /> :
                    <Avatar size={256} style={{ fontSize: 150 }}>{profilePageState.user.username[0]}{profilePageState.user.username[1]}</Avatar>}

                <h2 style={{ color: 'white' }}>{profilePageState.user.about_me ? profilePageState.user.about_me : 'No info'}Something about what we offer</h2>
                {userInfo.username ? <Button type='primary'>Follow Me!</Button> : <LoginModal buttonText='Login to Follow' />}
            </HeroImage>
            <Row style={{ color: 'white', display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', marginTop: '3em', background: '#364d79' }} >
                <Col span={24} >
                    <Typography.Title style={{ color: 'white' }}>Recommened For You</Typography.Title>
                </Col>
                {recommendedGames.map((ele, index) => <Col span={6} key={index} >
                    <img alt="example" style={recommendedGameStyle} src={ele.imageSrc} />
                    <p>{ele.title}</p>
                    <p>{`Created by ${ele.creator}`}</p>
                </Col>)}
            </Row>
            <Row style={{ width: '70%', textAlign: 'center' }}>
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
            </Row>
        </>
            :
            <NotFound />
        }
        </>
    )
}
export default UserPage;
