import React from 'react';
import { Descriptions, Badge, Typography } from 'antd';

const AboutPage = () => {
    return (<>
        <div style={{ backgroundColor: 'purple' }}>
            <Typography.Title style={{ textAlign: 'center', color: 'white', padding: '1em' }} level={1}>About Us</Typography.Title>
        </div>
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <Descriptions layout="vertical" bordered style={{ backgroundColor: 'white' }}>
                <Descriptions.Item label="Product">Lorem ipsum</Descriptions.Item>
                <Descriptions.Item label="Billing Mode">dolor</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                    2019-04-24 18:00:00
    </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="processing" text="Running" />
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                    Sit amet: Sed non venenatis
      <br />
      Integer eget interdum ipsum: 3.4
      <br />
      Cras: vitae.purus.lectus
      <br />
      In ac: 10 GB
      <br />
      Quisque metus: 3
      <br />
      Mauris: Vivamus Phasellus1<br />
                </Descriptions.Item>
            </Descriptions>
        </div>
    </>
    )
}
export default AboutPage
