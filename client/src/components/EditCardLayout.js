import React, { useContext, useState } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Typography, Image } from 'antd';

import FooterContents from './FooterContents';
import { UserContext } from '../Context';

const EditCardLayout = (props) => {
    const userContext = useContext(UserContext);

    const { SubMenu } = Menu;
    const { Title } = Typography;
    const { Header, Content, Sider, Footer } = Layout;

    return (
        <Layout>
            <Header style={{ padding: 10 }}>
                <Avatar style={{ float: 'right' }} src='https://media1.tenor.com/images/7c8816ed2a438626a4b595a19b37e265/tenor.gif?itemid=15172307' />
                <Title style={{ color: 'white' }} level={3}>CARDASHIAN</Title>
            </Header>
            <Layout>
                <Sider>
                    <Image src='https://bsaber.com/wp-content/uploads/2020/04/01ae5bf9dda23dfcc81fbfca043d5e7aaa591b00.jpg' style={{ height: '100em' }} />
                    <Menu
                        defaultSelectedKeys={['Dashboard']}
                        mode="inline"
                    >
                        <Menu.Item key='Dashboard'>
                            Dashboard
                        </Menu.Item>
                        <SubMenu
                            title={
                                <span>
                                    <span>About US</span>
                                </span>
                            }
                        >
                            <Menu.ItemGroup key='AboutUS' title='Country 1'>
                                <Menu.Item key='location1'> Location 1</Menu.Item>
                                <Menu.Item key='location2'> Location 2</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                        <Image src='https://static.zerochan.net/Suou.Patra.full.2639563.png' style={{ height: '10em' }} />
                        <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
                            {props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Cardashian created by The caRdashIaN koMpAnY ltd.</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}
export default EditCardLayout
