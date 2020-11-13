import React, { useState } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Switch,
    InputNumber,
} from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const NewCardForm = () => {
    const [form] = Form.useForm();
    const [updateCardFormState, setUpdateCardFormState] = useState({
        is_public: true,
        is_special: false,
        is_spell: false,
        is_charge: false,
        game_id: null,
        card_image_id: null,
        category_id: null,
        name: 'Untitled',
        artist: 'Unknown',
        description_title: 'Unknown',
        rank: 1,
        health: 1,
        attack: 1,
        defense: 1,
        cost: 1,
        turns: 1,
        longevity: 0
    });
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const onSwitch = (value, props) => {
        console.log(value);
        console.log(props)
    }
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="is_public"
                label="Public"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                name="is_special"
                label="Special"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                name="is_spell"
                label="Spell"
                valuePropName="checked"
            >
                <Switch onChange={onSwitch} />
            </Form.Item>
            <Form.Item
                name="is_charge"
                label="Charge"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
            <Form.Item
                name="game_id"
                label="Game">
                <Select style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="card_image_id"
                label="Image">
                <Select style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="category_id"
                label="Category">
                <Select style={{ width: '100%' }}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="name"
                label={
                    <span>
                        Name&nbsp;
            <Tooltip title="This is what the card will be called, must be unique for this game.">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input a name',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="artist"
                label={
                    <span>
                        Artist&nbsp;
            <Tooltip title="Give credit to the illustrator of this card.">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="description_title "
                label='Ability'
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="rank "
                label='Rank'
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="health "
                label='Health'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="attack"
                label='Attack'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="defense"
                label='Defense'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="cost"
                label='Cost'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="turns"
                label='Turns'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="longevity"
                label='Longevity'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right', width: '100%' }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
};

export default NewCardForm;
