import React, { useContext } from 'react';
import { Layout, Menu, Avatar, Typography, Image } from 'antd';
import { UserContext } from '../Context';
import FooterContents from '../components/FooterContents'
import LoginModal from '../components/LoginModal'
import HomepageSider from '../components/HomepageSider';
const { Header, Content } = Layout;

const { Title } = Typography;
const NavAndFooter = (props) => {
    const { userInfo } = useContext(UserContext);
    return (
        <>
            <Layout >
                <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
                    <a><Title style={{ color: 'white' }} level={3}>CARDASHIAN</Title></a>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} >
                        <Menu.Item key="1">Home</Menu.Item>
                        <Menu.Item key="2">Games</Menu.Item>
                        <Menu.Item key="3">Cards</Menu.Item>
                        <Menu.Item key="4">About</Menu.Item>
                    </Menu>
                    {userInfo.username ? <>Hello {userInfo.username}<Avatar style={{ float: 'right' }} src='https://media1.tenor.com/images/7c8816ed2a438626a4b595a19b37e265/tenor.gif?itemid=15172307' /></> :
                        <LoginModal />}
                </Header>
                <Content style={{ margin: 'auto' }}>
                    {/* <Layout>
                        <HomepageSider />
                        <Content> */}
                    {props.children}
                    {/* </Content>
                    </Layout> */}
                </Content>
            </Layout>
            <FooterContents />
        </>
    );
};
export default NavAndFooter;
