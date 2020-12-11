import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Layout, Typography, Row, Card, Col, Descriptions } from 'antd';

import Gallery from 'react-grid-gallery';

import ImageGallery from 'react-image-gallery';
import UserCardHeader from '../views/CardsPage/UserCardHeader';
import CardComments from './CardsPage/CardComments';
const UserCardPage = () => {
    const [imageGalleryState, setImageGalleryState] = useState({ currentSlide: 0 });
    const handleSlide = (e) => {
        setImageGalleryState({ ...imageGalleryState, currentSlide: e });
    }
    const [profilePageState, setProfilePageState] = useState({
        user: {

        },
        cards: [],
        friends: [],
        userExists: false,

    });
    const [cardPageState, setCardPageState] = useState({
        images: [{
            original: 'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif',
            thumbnail: 'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif',
        },],
        sideImages: [{
            src: 'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif',
            thumbnail: 'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif',
            thumbnailWidth: 32,
            thumbnailHeight: 32,
            caption: 'Loading...'
        }]
    });

    const handleClickThumbnail = (e, value) => {
        console.log(e)
        console.log(value)
    }
    const { username, gamename, cardname } = useParams();
    useEffect(() => {
        async function fetchGames() {
            const res = await fetch(`/api/cards/${username}/${gamename}/${cardname}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res) {
                const { card, user, game } = await res.json()
                console.log(card)
                const sideImages = [{
                    src: card.card_image_src,
                    thumbnail: card.card_image_src,
                    thumbnailWidth: 32,
                    thumbnailHeight: 32,
                    caption: card.manual_description
                }]
                const images = [
                    {
                        original: card.card_image_src,
                        thumbnail: card.card_image_src,
                    },
                ];

                await setCardPageState({ ...cardPageState, card, user, game, images, sideImages })
            } else {
                await setCardPageState({ ...cardPageState })
            }
        }
        fetchGames();

        async function fetchUsers() {
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

        fetchUsers();
    }, []);
    return (
        <>
            <Layout>
                <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', minHeight: '100vh' }}>
                    <div style={{ backgroundColor: '#EEE', minWidth: '50%', minHeight: '80vh' }}>
                        <div style={{ backgroundColor: '#CCC' }}>
                            <ImageGallery items={cardPageState.images} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} showBullets={false} slideDuration={400} slideInterval={1000} onSlide={handleSlide} />
                        </div>
                        {cardPageState.user && <>
                            <UserCardHeader user={cardPageState.user} card={cardPageState.card} game={cardPageState.game} />
                            <Descriptions layout="vertical" bordered>
                                <Descriptions.Item label="Rank">{cardPageState.card.rank}</Descriptions.Item>
                                <Descriptions.Item label="Is Spell">{cardPageState.card.is_spell}</Descriptions.Item>
                                <Descriptions.Item label="Is Special">{cardPageState.card.is_special}</Descriptions.Item>
                                <Descriptions.Item label="Is Charge">{cardPageState.card.is_charge}</Descriptions.Item>
                                <Descriptions.Item label="Game Id">{cardPageState.card.game_id}</Descriptions.Item>
                                <Descriptions.Item label="Category">{cardPageState.card.category_id}</Descriptions.Item>
                                <Descriptions.Item label="Artist">{cardPageState.card.artist}</Descriptions.Item>
                                <Descriptions.Item label="Ability Title">{cardPageState.card.description_title}</Descriptions.Item>
                                <Descriptions.Item label="Health">{cardPageState.card.health}</Descriptions.Item>
                                <Descriptions.Item label="Attack">{cardPageState.card.attack}</Descriptions.Item>
                                <Descriptions.Item label="Defense">{cardPageState.card.defense}</Descriptions.Item>
                                <Descriptions.Item label="Cost">{cardPageState.card.cost}</Descriptions.Item>
                                <Descriptions.Item label="Turns">{cardPageState.card.turns}</Descriptions.Item>
                                <Descriptions.Item label="Longevity">{cardPageState.card.longevity}</Descriptions.Item>
                            </Descriptions>
                        </>
                        }
                        {(cardPageState.user && cardPageState.card && cardPageState.game) &&
                            < CardComments user={cardPageState.user} card={cardPageState.card} game={cardPageState.game} />}
                    </div>
                </Layout.Content>
                <Layout.Sider trigger={null} width='20%' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Typography.Title style={{ color: 'white', padding: '1em' }}>View more</Typography.Title>
                    <Row>
                        {
                            profilePageState.cards.length && profilePageState.cards.map((ele, index) =>
                                <Col span={6}>
                                    <a target='_blank' href={`/${profilePageState.user.username}/${ele.game.name}/${ele.name}`}>
                                        <Card
                                            hoverable
                                            cover={<img alt="example" width={64} height={128} src={ele.card_image_src ? ele.card_image_src : "https://cardashian-storage-dev.s3-us-west-1.amazonaws.com/generic_card.jpg"} />}
                                        >
                                        </Card>
                                    </a>
                                </Col>
                            )
                        }
                    </Row>
                </Layout.Sider>
            </Layout>
        </>
    )
}

export default UserCardPage;
