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
                    title: 'What is Lorem Ipsum?',
                    items: [
                        {
                            description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
                        },
                    ],
                },
                {
                    title: 'Products',
                    items: [
                        {
                            title: 'Where does it come from?',
                        },
                        {
                            title: 'Contrary to popular belief',
                        },
                        {
                            title: 'Lorem Ipsum is not simply random text',
                            description: 'It has roots',
                        },
                    ],
                },
                {
                    title: 'Services',
                    items: [
                        {
                            title: 'Why do we use it?',
                        },
                        {
                            title: 'It is a long established',
                        },
                        {
                            title: 'Lorem Ipsum',
                            description: 'The point of using',
                        },
                    ],
                },
            ]}
            bottom="Made with ❤️ by caRdashIaN koMpAnY ltd."
        />
    );
}
