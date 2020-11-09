import React, { useContext, useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Typography, Image, Switch } from 'antd';

import { useLocation } from 'react-router-dom';
import EditCard from '../views/EditCard';
import FooterContents from '../components/FooterContents'
import { UserContext } from '../Context';

const EditCardLayout = (props) => {
    const userContext = useContext(UserContext);
    const webLocation = useLocation();

    function onChange(checked) {
        console.log(`switch to ${checked}`);
    }
    const { SubMenu } = Menu;
    const { Title } = Typography;
    const { Header, Content, Sider } = Layout;
    console.log(webLocation.pathname === '/cards/edit')
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
                <Title style={{ color: 'white' }} level={3}>CARDASHIAN</Title>
                <Avatar style={{ float: 'right' }} src='https://media1.tenor.com/images/7c8816ed2a438626a4b595a19b37e265/tenor.gif?itemid=15172307' />
            </Header>
            <Layout>
                <Sider>
                    <Image src='data:image/png;base64,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' style={{ height: '10em' }} />
                    <Menu
                        defaultSelectedKeys={['Dashboard']}
                        mode="inline"
                    >
                        <Menu.Item key='Dashboard'>
                            My Page
                        </Menu.Item>
                        <SubMenu
                            title={
                                <span>
                                    <span>Games</span>
                                </span>
                            }
                        >
                            <Menu.Item key='My Games'>
                                My Games
                        </Menu.Item>
                            <Menu.ItemGroup key='Recent' title='Recently Updated'>
                                <Menu.Item key='Game 1'> Game 1</Menu.Item>
                                <Menu.Item key='Game 2'> Game 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key='Liked' title='Most Liked'>
                                <Menu.Item key='Game 1'> Game 3</Menu.Item>
                                <Menu.Item key='Game 2'> Game 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <SubMenu
                            title={
                                <span>
                                    <span>Cards</span>
                                </span>
                            }
                        ><Menu.Item key='My Cards'>
                                My Cards
                        </Menu.Item>
                            <Menu.ItemGroup key='Recent' title='Recently Updated'>
                                <Menu.Item key='Game 1'> Card 1</Menu.Item>
                                <Menu.Item key='Game 2'> Card 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup key='Liked' title='Most Liked'>
                                <Menu.Item key='Game 1'> Card 3</Menu.Item>
                                <Menu.Item key='Game 2'> Card 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <Switch defaultChecked onChange={onChange} />
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                            {webLocation.pathname.includes('/cards/edit') && <EditCard />}
                            {/* <EditCard /> */}
                            {props.children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
            {/* <Footer style={{ textAlign: 'center' }}>
                <FooterContents />
            </Footer> */}
        </Layout>
    );
}
export default EditCardLayout
