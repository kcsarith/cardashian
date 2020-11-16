import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext } from '../Context';
import NotFound from './NotFound'

import { LikeOutlined, AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs, Table, Card, Row, Col, Typography, Statistic, Descriptions, Avatar, Badge, Button } from 'antd';


const UserGamePage = () => {
    const { username, gamename } = useParams();
    const [gamePageState, setGamePageState] = useState({
        game: {

        },
        gameExists: false,

    });

    useEffect(() => {
        async function fetchGame() {
            const res = await fetch(`/api/games/user/${username}/${gamename}`)
            if (res) {
                const { game } = await res.json()
                console.log(game)
                let eleUsername
                switch (game.user_id) {
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
                        eleUsername = 'out of scope';
                        break;
                }
                game.username = eleUsername;
                const cardsRes = await fetch(`/api/cards/game/${game.id}`)
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
                    <div style={{ width: '70%', height: '50em', backgroundImage: `url(${gamePageState.game.home_bg_src})`, padding: '5em' }}>
                        <div style={{ backgroundColor: 'white', padding: '5em' }}>
                            <Tabs defaultActiveKey="1" >
                                <Tabs.TabPane tab="MAIN" key="1">
                                    <Row>
                                        <Col span={8} style={{ textAlign: 'center' }}>
                                            <Avatar size={256} icon={<img src={gamePageState.game.game_logo_src} />} />
                                        </Col>

                                        <Col span={8}>
                                            <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
                                            <Typography style={{ color: 'white', paddingTop: '1em', fontSize: '1.5em' }} level={1}>
                                                Created by
                                        </Typography>
                                            <Typography style={{ color: 'white', fontSize: '1.5em' }} level={1}>
                                                <a href={`/${gamePageState.game.username}`}>{gamePageState.game.username}</a>
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
                                        <Descriptions.Item label="Usage Time" span={2}>
                                            2019-04-24 18:00:00
    </Descriptions.Item>
                                        <Descriptions.Item label="Status" span={3}>
                                            <Badge status="processing" text="Running" />
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                                        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                                        <Descriptions.Item label="Config Info">
                                            Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1<br />
                                        </Descriptions.Item>
                                    </Descriptions>,
                            </Tabs.TabPane>
                                <Tabs.TabPane tab="CARDS" key="3" >
                                    <Typography.Title style={{ textAlign: 'center', color: 'white', padding: '0.2em' }} level={1}>CARD LIST</Typography.Title>
                                    <Table columns={columns} dataSource={gamePageState.cards.map((ele, index) => {
                                        return { i: index, image: < img height={64} width={64} src={ele.card_image_src} />, name: ele.name, description: ele.manual_description, link: <Button href={`/${gamePageState.game.username}/${gamePageState.game.name}/${ele.name}`} type="primary">View</Button> }
                                    })} pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
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
