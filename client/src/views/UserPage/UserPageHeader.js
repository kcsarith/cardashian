import React from 'react';
import { PageHeader, Button, Tag, Typography, Row } from 'antd';
const { Paragraph } = Typography;

const UserPageHeader = ({ user, title, game }) => {
    // if (userProfilePicSrc != undefined) {
    //     console.log(userProfilePicSrc)
    // }
    return (
        <PageHeader
            title={user ? <Typography.Title style={{ color: 'white' }}>{user.username}</Typography.Title> : "Name"}
            className="site-page-header"
            // subTitle={user ? `created by ${user.username}` : "This is a subtitle"}
            tags={<Tag color="grey">Offline</Tag>}
            extra={<Button onClick={() => { alert('Not working yet') }}>Message Me</Button>}
        >
            <Typography.Title style={{ color: 'white', textAlign: 'left' }}>{user ? user.about_me :
                'Lorem Ipsum'}
            </Typography.Title>
        </PageHeader>
    );
}

export default UserPageHeader;
