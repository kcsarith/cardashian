import React from 'react';
import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const CardAndOwnerName = () => {

    const { Paragraph } = Typography;

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
      </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    2nd menu item
      </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    3rd menu item
      </a>
            </Menu.Item>
        </Menu>
    );

    const DropdownMenu = () => {
        return (
            <Dropdown key="more" overlay={menu}>
                <Button
                    style={{
                        border: 'none',
                        padding: 0,
                    }}
                >
                    <EllipsisOutlined
                        style={{
                            fontSize: 20,
                            verticalAlign: 'top',
                        }}
                    />
                </Button>
            </Dropdown>
        );
    };

    const routes = [
        {
            path: 'index',
            breadcrumbName: 'First-level Menu',
        },
        {
            path: 'first',
            breadcrumbName: 'Second-level Menu',
        },
        {
            path: 'second',
            breadcrumbName: 'Third-level Menu',
        },
    ];

    const content = (
        <>
            <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque feugiat lorem ligula, nec accumsan tortor venenatis vel. Etiam tristique ex eget ultricies lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent tristique porta lacus, sed volutpat nisl commodo dictum. Fusce non felis in magna suscipit laoreet id et diam. In hac habitasse platea dictumst. Sed egestas et arcu non laoreet. Nullam id quam nunc. Mauris aliquet, nisi ut placerat rhoncus, lorem enim elementum elit, ut placerat tellus mi sit amet nisl. In vel pharetra nisi.</Paragraph>
        </>
    );

    const Content = ({ children, extraContent }) => {
        return (
            <Row>
                <div style={{ flex: 1 }}>{children}</div>
                <div>{extraContent}</div>
            </Row>
        );
    };

    return (
        <PageHeader
            title="Title"
            className="site-page-header"
            subTitle="This is a subtitle"
            tags={<Tag color="blue">Public</Tag>}
            avatar={{ src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS87xycN9qAVAjPd-vseckDvNMSmgjT_LKBRw&usqp=CAU' }}
            breadcrumb={{ routes }}
        >
            <Content>
                {content}
            </Content>
        </PageHeader>
    );
}

export default CardAndOwnerName;
