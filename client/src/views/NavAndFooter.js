import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Typography, Image } from 'antd';
import { UserContext } from '../Context';
import FooterContents from '../components/FooterContents'
import LoginModal from '../components/LoginModal'
import HomepageSider from '../components/HomepageSider';
const { Header, Content } = Layout;

const { Title } = Typography;
const NavAndFooter = (props) => {
    const { userInfo } = useContext(UserContext);
    const history = useHistory();
    const navigationLocation = useLocation();
    console.log(navigationLocation.pathname)
    const handleMenuClick = (e, props) => {
        switch (e.key) {

            case 'home':
                history.push('/');
                break;
            case 'games':
                history.push('/games');
                break;
            case 'cards':
                history.push('/cards');
                break;
            case 'about':
                history.push('/about');
                break;
            default:

        }
    }

    return (
        <>
            <Layout >
                <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px' }}>
                    <a><Title style={{ color: 'white' }} level={3} onClick={handleMenuClick}>CARDASHIAN</Title></a>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[navigationLocation.pathname.split('/')[1]]} onClick={handleMenuClick}>
                        <Menu.Item key="home">Home</Menu.Item>
                        <Menu.Item key="games">Games</Menu.Item>
                        <Menu.Item key="cards">Cards</Menu.Item>
                        <Menu.Item key="about">About</Menu.Item>
                    </Menu>
                    {userInfo.username ? <>Hello {userInfo.username}
                        {userInfo.profile_pic_src ? <Avatar style={{ float: 'right' }} src={userInfo.profile_pic_src} />
                            :
                            <Avatar size={40}>{userInfo.username[0]}{userInfo.username[1]}</Avatar>}
                    </>
                        :
                        <LoginModal buttonText='Login' />}
                </Header>
                <Content>
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
