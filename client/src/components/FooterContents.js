import React from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'; // import 'rc-footer/asssets/index.less';

export default function FooterContents() {
    return (
        <Footer
            // maxColumnsPerRow={4}
            columns={[
                {
                    style: { width: '50%' },
                    title: 'About the Site',
                    items: [
                        {
                            title: 'Currently a work in progress',
                            description: `Keeping track of cards is one of the hardest parts about character card games, so I believe a databases creation app would make it easier to standardize card and prevent duplicate or similar descriptions.

This app can be useful to card enthusiasts of multiple levels. Hobbyists who are interested in creating their own game for fun can just make to their friends and family or someone who is serious about making one can private their database and pretend they never existed on this site.`
                        },
                    ],
                },
                {
                    title: 'Connect with Me',
                    items: [
                        {
                            icon: (
                                <img src="https://www.flaticon.com/svg/static/icons/svg/25/25231.svg" style={{ filter: 'invert(1)' }} />
                            ),
                            title: 'Github',
                            url: 'https://github.com/kcsarith',
                            openExternal: true,
                        },
                        {
                            icon: (
                                <img src="https://image.flaticon.com/icons/png/512/61/61109.png" style={{ filter: 'invert(1)' }} />
                            ),
                            title: 'Linked In',
                            url: 'https://www.linkedin.com/in/krisna-sarith-11788b1b9',
                            openExternal: true,
                        },
                        {
                            icon: (
                                <img src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/angellist-512.png" style={{ filter: 'invert(1)' }} />
                            ),
                            title: 'Angellist',
                            url: 'https://angel.co/u/krisna-charlie-sarith',
                            openExternal: true,
                        },
                        {
                            icon: (
                                <img src="https://cdn.onlinewebfonts.com/svg/img_379085.png" style={{ filter: 'invert(1)' }} />
                            ),
                            title: 'Personal Site',
                            url: 'https://kcsarith.github.io',
                            openExternal: true,
                        },
                    ],
                },
                {
                    title: 'Useful Links',
                    items: [
                        {
                            title: 'Source code',
                            url: 'https://github.com/kcsarith/cardashian',
                        },
                    ],
                },

            ]}
            bottom="Created with JavaScript, Python, PostgreSQL and Ant Design. Deployed with Heroku and Docker Conainers."
        />
    );
}
