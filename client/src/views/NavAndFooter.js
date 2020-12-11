import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Typography, Button, Dropdown } from 'antd';
import { UserContext } from '../Context';
import FooterContents from '../components/FooterContents'
import LoginModal from '../components/LoginModal'
import HomepageSider from '../components/HomepageSider';

import Cookies from 'js-cookie'
const { Header, Content } = Layout;
const logout = () => {
    Cookies.remove("XSRF_TOKEN")
}

const { Title } = Typography;
const NavAndFooter = (props) => {
    const { userInfo, login } = useContext(UserContext);
    const history = useHistory();
    const navigationLocation = useLocation();
    console.log(navigationLocation.pathname)
    const handleMenuClick = (e, props) => {
        switch (e.key) {

            case 'home':
                history.push('/');
                break;
            case 'games':
                history.push('/test-card');
                break;
            case 'cards':
                history.push('/card-edit/visuals');
                break;
            case 'about':
                history.push('/about');
                break;
            default:

        }
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <a href={`/${userInfo.username}`}>
                    Profile
      </a>
            </Menu.Item>
            {/* <Menu.Item>
                <a rel="noopener noreferrer" href="/settings">
                    Settings
      </a>
            </Menu.Item> */}
            <Menu.Item>
                <a onClick={logout} href="/">
                    Logout
      </a>
            </Menu.Item>
        </Menu>
    );


    return (
        <>
            <Layout >
                <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a><Title style={{ color: 'white' }} level={3} onClick={handleMenuClick}>CARDASHIAN</Title></a>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[navigationLocation.pathname.split('/')[1]]} onClick={handleMenuClick}>
                        <Menu.Item key="home">Home</Menu.Item>
                        <Menu.Item key="cards">Card Create(WIP)</Menu.Item>
                        <Menu.Item key="games">Play Game(WIP)</Menu.Item>
                        {/* <Menu.Item key="about">About</Menu.Item> */}
                    </Menu>
                    {userInfo.username ? <><p style={{ color: 'white' }}>Hello {userInfo.username}</p>
                        {userInfo.profile_pic_src ?
                            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                {/* <Button>bottomLeft</Button> */}
                                <Avatar style={{ float: 'right' }} src={userInfo.profile_pic_src} />
                            </Dropdown>
                            :
                            <Dropdown overlay={menu} placement="bottomLeft" arrow>
                                <Avatar size={40}>{userInfo.username[0]}{userInfo.username[1]}</Avatar>
                            </Dropdown>
                        }
                    </>
                        :
                        <div>

                            {/* <Button primary onClick={() => history.push('/card-edit/visuals')}>EDIT CARD</Button>
                            <Button primary onClick={() => history.push('/test-card')}>TEST CARD GAME</Button> */}
                            <Button primary onClick={() => history.push('/signup')}>Signup</Button>
                            <Button primary onClick={() => login('demo', 'password')}>Demo User</Button>
                            <LoginModal buttonText='Login' />
                        </div>
                    }
                </Header>
                <Content>
                    {/* <Layout>
                        <HomepageSider />
                        <Content> */}
                    <div style={{ backgroundImage: 'url(https://thumbs.gfycat.com/AdmiredDigitalHarrier-size_restricted.gif)', backgroundAttachment: 'fixed' }}>
                        {props.children}
                    </div>
                    {/* </Content>
                    </Layout> */}
                </Content>
            </Layout>
            <FooterContents />
        </>
    );
};
export default NavAndFooter;
