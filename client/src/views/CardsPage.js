import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'react-grid-gallery';
import { Typography, Row, Col, Statistic } from 'antd';

const CardsPage = (props) => {

    const [cardsPageState, setCardsPageState] = useState({ images: [] });

    useEffect(() => {
        async function fetchGames() {
            const res = await fetch(`/api/cards`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res) {
                const { cards } = await res.json()
                console.log(cards)
                const images = cards.map((ele) => {
                    console.log(ele)
                    return {
                        src: ele.card_image_src,
                        thumbnail: ele.card_image_src,
                        thumbnailWidth: 320,
                        thumbnailHeight: 174,
                        caption: ele.manual_description
                    }
                });
                await setCardsPageState({ ...cardsPageState, cards, images })
            } else {
                await setCardsPageState({ ...cardsPageState })
            }
        }
        fetchGames();
    }, []);
    const handleClickThumbnail = (e, value) => {
        console.log(e)
        console.log(value)
    }

    return (
        <div style={{
            display: "block",
            minHeight: "1px",
            width: "100%",
            border: "1px solid #ddd",
            overflow: "auto"
        }}>
            <div style={{ backgroundColor: 'red', height: '20em', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                <Typography.Title style={{ textAlign: 'center', color: 'white' }} level={1}>Card Page</Typography.Title>
            </div>
            <Gallery
                images={cardsPageState.images}
                enableLightbox={false}
                onClickThumbnail={handleClickThumbnail}
                enableImageSelection={false} />
        </div>
    );
    return <></>
}

CardsPage.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired
        })
    ).isRequired
};

export default CardsPage;
