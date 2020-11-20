import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext } from '../Context';
import NotFound from './NotFound'

import { LikeOutlined, AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs, Table, Card, Row, Col, Typography, Statistic, Descriptions, Avatar, Badge, Button, Image } from 'antd';


const UserGamePage = () => {
    const { username, gamename } = useParams();
    const [gamePageState, setGamePageState] = useState({
        game: {

        },
        gameExists: false,

    });

    useEffect(() => {
        async function fetchGame() {
            const res = await fetch(`/api/games/user/${username}/${gamename}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (res) {
                const { game } = await res.json()
                const cardsRes = await fetch(`/api/cards/game/${game.id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (cardsRes.ok) {
                    const { cards } = await cardsRes.json();
                    console.log(cards)
                    setGamePageState({ ...gamePageState, game, cards, gameExists: true })
                }
            } else {
                setGamePageState({ ...gamePageState, gameExists: false })
            }
        }
        fetchGame();
    }, [username, gamename]);
    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: 150,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 150,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: 700,
        },
        {
            title: 'Link',
            dataIndex: 'link',
        },
    ];

    let data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }
    return (
        <>
            {gamePageState.gameExists ? <>
                <div style={{
                    backgroundImage: 'url(https://csshint.com/wp-content/uploads/2020/01/CSS-Animated-Backgrounds-2.gif)',
                    display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundSize: 'cover'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '5em', width: '100em', height: '50em' }}>
                        <Tabs defaultActiveKey="1" >
                            <Tabs.TabPane tab="MAIN" key="1">
                                <Row>
                                    <Col span={8} style={{ textAlign: 'center' }}>
                                        <Image height={128} width={256} src={gamePageState.game.home_bg_src} />
                                    </Col>

                                    <Col span={8}>
                                        <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                                        <Typography style={{ paddingTop: '1em', fontSize: '1.5em' }} level={1}>
                                            Created by
                                        </Typography>
                                        <Typography style={{ color: 'white', fontSize: '1.5em' }} level={1}>
                                            <a href={`/${gamePageState.game.User.username}`}>{gamePageState.game.User.username}</a>
                                        </Typography>
                                    </Col>
                                    <Col span={8} style={{ backgroundColor: 'white', padding: '4em' }}>
                                        <Typography style={{ paddingTop: '1em', fontSize: '1.5em' }} level={1}>
                                            Favorited by
                                        </Typography>
                                        <Avatar.Group>
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        </Avatar.Group>
                                    </Col>
                                    <Col span={24} style={{ paddingTop: '5em' }}>
                                        <Typography style={{ fontSize: '2em' }} level={1}>
                                            {`${gamePageState.game.description}`}
                                        </Typography>
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="RULES" key="2">
                                <Descriptions title="User Info" bordered>
                                    <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                                    <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                                    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                                    <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                                    <Descriptions.Item label="Usage Time" span={2}>2019-04-24 18:00:00</Descriptions.Item>
                                    <Descriptions.Item label="Status" span={3}><Badge status="processing" text="Running" /></Descriptions.Item>
                                    <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                                    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                                    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                                </Descriptions>,
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="CARDS" key="3" >
                                <Typography.Title style={{ textAlign: 'center', color: 'white', padding: '0.2em' }} level={1}>CARD LIST</Typography.Title>
                                <Table columns={columns} dataSource={gamePageState.cards.map((ele, index) => {
                                    return { i: index, image: < img height={64} width={64} src={ele.card_image_src} />, name: ele.name, description: ele.manual_description, link: <Button href={`/${gamePageState.game.User.username}/${gamePageState.game.name}/${ele.name}`} type="primary">View</Button> }
                                })} pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </>
                :
                <NotFound />
            }
        </>
    )
}
export default UserGamePage;
