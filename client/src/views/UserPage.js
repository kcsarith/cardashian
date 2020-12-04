import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import Gallery from 'react-grid-gallery';

import HeroImage from '../components/elements/HeroImage'
import LoginModal from '../components/LoginModal'
import NotFound from './NotFound';
import { UserContext } from '../Context';
import UserPageHeader from './UserPage/UserPageHeader'
import ProfileComments from './UserPage/ProfileComments'

import { Button, Row, Popconfirm, Col, Typography, Card, Divider, Image, Avatar, message } from 'antd'
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
        cards: [],
        friends: [],
        userExists: false,

    });
    const history = useHistory()
    const { userInfo, fetchWithCSRF } = useContext(UserContext)
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(`/api/users/${username}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res) {
                const { user } = await res.json()
                await setProfilePageState({ ...profilePageState, user, userExists: true, });
                const res2 = await fetch(`/api/friends/friend/${user.id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (res2.ok) {
                    const { friends } = await res2.json()
                    await setProfilePageState({ ...profilePageState, user, friends, userExists: true, });
                    const res3 = await fetch(`/api/cards/user/${user.id}`, {
                        method: 'GET',
                        credentials: 'include'
                    });
                    if (res3.ok) {
                        const { cards } = await res3.json();
                        await setProfilePageState({ ...profilePageState, user, friends, cards, userExists: true, });
                    }
                }
            }
            else await setProfilePageState({ ...profilePageState, userExists: false, });
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
    function confirmFollow(e) {
        console.log(e);
        async function fetchData() {
            const res = await fetchWithCSRF(`/api/friends/user/${userInfo.id}/friend/${profilePageState.user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            if (res.ok) {

                message.success('Click on Yes');
                // const res2 = await fetch(`/api/friends/friend/${profilePageState.user.id}`)
                // const { friends } = res2.json();
                // await setProfilePageState({ ...profilePageState }, friends)
            }
            else {

                message.error('Failed to perform request');
            }
        }
        fetchData()
    }

    function cancelFollow(e) {
        console.log(e);
        message.error('Click on No');
    }
    const confirmUnfollow = (e) => {
        console.log(e);
        async function fetchData() {
            const res = await fetchWithCSRF(`/api/friends/user/${userInfo.id}/friend/${profilePageState.user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            if (res.ok) {

                message.success('Click on Yes');
                // const res2 = await fetch(`/api/friends/friend/${profilePageState.user.id}`)
                // const { friends } = res2.json();
                // await setProfilePageState.friends({ ...profilePageState, friends })
            }
            else {

                message.error('Failed to perform request');
            }
        }
        fetchData()
    }

    function cancelUnfollow(e) {
        console.log(e);
        message.error('Click on No');
    }
    const handleClickThumbnail = (e, p) => {
        const cardEle = profilePageState.cards[e]
        // console.log(cardEle)
        history.push(`/${profilePageState.user.username}/${cardEle.game.name}/${cardEle.name}`)
    }
    return (
        <Row>
            {profilePageState.userExists ? <><Col span={18}>
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
                    <Row>
                        <Col span={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            {profilePageState.user.profile_pic_src ? <Avatar size={256} icon={
                                <img
                                    style={{
                                        borderRadius: '50%'
                                    }}
                                    src={profilePageState.user.profile_pic_src} />
                            } /> :
                                <Avatar size={256} style={{ fontSize: 150 }}>{profilePageState.user.username[0]}{profilePageState.user.username[1]}</Avatar>
                            }
                            {userInfo.username && !profilePageState.friends.map(ele => ele.User.username).includes(userInfo.username) ?
                                <Popconfirm
                                    title={`Are you sure to follow ${profilePageState.user.username}?`}
                                    onConfirm={confirmFollow}
                                    onCancel={cancelFollow}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button style={{ margin: '2em' }} type='primary'>Follow Me!</Button>

                                </Popconfirm>
                                : <Popconfirm
                                    title={`Are you sure to unfollow ${profilePageState.user.username}?`}
                                    onConfirm={confirmUnfollow}
                                    onCancel={cancelUnfollow}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button style={{ margin: '2em' }} type='secondary'>Unfollow</Button>
                                </Popconfirm>}
                            {!userInfo.username && <LoginModal style={{ margin: '2em' }} buttonText='Login to Follow' />}
                        </Col>
                        <Col span={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <UserPageHeader user={profilePageState.user} />
                        </Col>
                    </Row>
                </HeroImage>
                <Row style={{ color: 'white', display: 'flex', justifyContent: 'center', textAlign: 'center', alignItems: 'center', background: '#364d79' }} >
                    <Col span={24}  >
                        <Typography.Title style={{ color: 'white' }}>Recent Cards</Typography.Title>
                        {profilePageState.cards.length > 0 && <Gallery
                            images={profilePageState.cards.slice(0, 10).map((ele, index) => {
                                return {
                                    src: ele.card_image_src,
                                    thumbnail: ele.card_image_src,
                                    thumbnailWidth: 180,
                                    thumbnailHeight: 240,
                                    caption: ele.manual_description
                                }
                            })}
                            enableLightbox={false}
                            onClickThumbnail={handleClickThumbnail}
                            enableImageSelection={false} />
                        }
                    </Col>

                </Row>
                <ProfileComments user={profilePageState.user} />
            </Col>
                <Col span={6} style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '2em' }}>
                    <Typography.Title style={{ color: 'white' }}>{profilePageState.friends.length} Followers</Typography.Title>
                    <Avatar.Group>
                        {profilePageState.friends.length > 0 &&
                            profilePageState.friends.map((ele, index) => <Avatar key={ele.id} src={ele.User.profile_pic_src} />)
                        }
                    </Avatar.Group>
                    <Typography.Title style={{ color: 'white', margin: '3em' }}>More from user</Typography.Title>
                    <Row>
                        {
                            profilePageState.cards.length && profilePageState.cards.map((ele, index) =>
                                <Col span={6}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" width={64} height={128} src={ele.card_image_src ? ele.card_image_src : "https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg"} />}
                                    >
                                    </Card>
                                </Col>
                            )
                        }
                    </Row>
                </Col>
            </>
                :
                <NotFound />
            }
        </Row>
    )
}
export default UserPage;
