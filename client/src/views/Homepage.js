import React, { useContext } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserContext } from '../Context';


const { Header, Content, Footer } = Layout;

const LandingPage = () => {
    const userContext = useContext(UserContext);
    console.log(userContext);
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">Content</div>
            </Content>
        </Layout>
    );
};
export default LandingPage;
