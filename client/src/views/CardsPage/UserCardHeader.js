import React from 'react';
import { PageHeader, Button, Tag, Typography, Row } from 'antd';

const { Paragraph } = Typography;

const UserCardHeader = ({ user, card, game }) => {
    // if (userProfilePicSrc != undefined) {
    //     console.log(userProfilePicSrc)
    // }
    return (
        <PageHeader
            title={card ? card.name : "Title"}
            className="site-page-header"
            subTitle={user ? `created by ${user.username}` : "This is a subtitle"}
            tags={<Tag color="grey">Offline</Tag>}
            extra={[
                <Button key="3">Favorite</Button>,
                <Button key="2">Dislike</Button>,
                <Button key="1" type="primary">Comment</Button>
            ]}
            avatar={user.profile_pic_src != undefined ? { src: user.profile_pic_src } : { src: 'https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif' }}
        >
            <Typography>{card ? card.manual_description :
                'Lorem Ipsum'}
            </Typography>
        </PageHeader>
    );
}

export default UserCardHeader;
