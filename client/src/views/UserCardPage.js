import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { Layout, Typography, Row, Col } from 'antd';

import Gallery from 'react-grid-gallery';

import ImageGallery from 'react-image-gallery';
import UserCardHeader from '../views/CardsPage/UserCardHeader';
import CardComments from './CardsPage/CardComments';
const UserCardPage = () => {
    const [imageGalleryState, setImageGalleryState] = useState({ currentSlide: 0 });
    const handleSlide = (e) => {
        setImageGalleryState({ ...imageGalleryState, currentSlide: e });
    }

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
            const res = await fetch(`/api/cards/${username}/${gamename}/${cardname}`)
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
    }, []);
    return (
        <>
            <Layout>
                <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', minHeight: '100vh' }}>
                    <div style={{ backgroundColor: '#EEE', minWidth: '50%', minHeight: '80vh' }}>
                        <div style={{ backgroundColor: '#CCC' }}>
                            <ImageGallery items={cardPageState.images} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} showBullets={false} slideDuration={400} slideInterval={1000} onSlide={handleSlide} />
                        </div>
                        {cardPageState.user &&
                            <UserCardHeader user={cardPageState.user} card={cardPageState.card} game={cardPageState.game} />
                        }
                        {(cardPageState.user && cardPageState.card && cardPageState.game) &&
                            < CardComments user={cardPageState.user} card={cardPageState.card} game={cardPageState.game} />}
                    </div>
                </Layout.Content>
                <Layout.Sider trigger={null} width='20%' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Typography.Title style={{ color: 'white', padding: '1em' }}>MORE BY</Typography.Title>
                    <Gallery
                        images={cardPageState.sideImages}
                        enableLightbox={false}
                        onClickThumbnail={handleClickThumbnail}
                        enableImageSelection={false} />
                </Layout.Sider>
            </Layout>
        </>
    )
}

export default UserCardPage;
