import React, { useContext } from 'react';
import { Row, Col, Form, Select, Input, InputNumber } from 'antd'
import { playerTargetOptions, playerConditionOptions, characterTargetOptions, characterConditionOptions, operatorOptions, effectOptions, effectTargetOptions } from '../../cardData';

import { UserContext } from '../../Context';
const selectWidth = 200
const EditEffect = (props) => {
    const userContext = useContext(UserContext)
    const { editCardState, setEditCardState } = userContext
    const handleChange = async (event, props) => {
        const prop_state = props.prop_state;
        await setEditCardState({
            ...editCardState,
            [prop_state]: props.value
            ,
        });
        console.log(event)
        console.log(props)
    };

    const handlePlayerNumberChange = async (event) => {
        await setEditCardState({
            ...editCardState,
            playerValue: event
        });
        console.log(event)
    };

    const handleCharacterNumberChange = async (event) => {
        await setEditCardState({
            ...editCardState,
            characterValue: event
        });
        console.log(event)
    };

    const handleEffectNumberChange = async (event) => {
        await setEditCardState({
            ...editCardState,
            effectValue: event
        });
        console.log(event)
    };
    const handleEffectTurnChange = async (event) => {
        await setEditCardState({
            ...editCardState,
            turn: event
        });
        console.log(event)
    };
    return (
        <>
            <Form>
                <Input.Group compact>
                    <Form.Item label="Player Target">
                        <Select defaultValue="" style={{ width: selectWidth }} onSelect={handleChange}>
                            {playerTargetOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='playerTarget' >{target.visible_text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Condition">
                        <Select defaultValue="" style={{ width: selectWidth }} onSelect={handleChange} disabled={!editCardState.playerTarget}>
                            {playerConditionOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='playerCondition'>{target.visible_text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Operator" >
                        <Select defaultValue="" style={{ width: 100 }} onSelect={handleChange} disabled={!editCardState.playerTarget || !editCardState.playerCondition}>
                            {operatorOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='playerOperator'>{target.visible_text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Amount" >
                        <InputNumber min={0} defaultValue={0} onChange={handlePlayerNumberChange} disabled={!editCardState.playerTarget || !editCardState.playerCondition || !editCardState.playerOperator} />
                    </Form.Item>
                </Input.Group>

                <Input.Group compact>
                    <Form.Item label="Character Target">
                        <Select defaultValue="" style={{ width: selectWidth }} onSelect={handleChange}>
                            {characterTargetOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='characterTarget' >{target.visible_text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Condition">
                        <Select defaultValue="" style={{ width: selectWidth }} onSelect={handleChange} disabled={!editCardState.characterTarget}>
                            {characterConditionOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='characterCondition'>{target.visible_text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Operator" >
                        <Select defaultValue="" style={{ width: 100 }} onSelect={handleChange} disabled={!editCardState.characterTarget || !editCardState.characterCondition}>
                            {operatorOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='characterOperator'>{target.visible_text}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Amount" >
                        <InputNumber min={0} defaultValue={0} onChange={handleCharacterNumberChange} disabled={!editCardState.characterTarget || !editCardState.characterCondition || !editCardState.characterOperator} />
                    </Form.Item>
                </Input.Group>
            </Form >

            <Input.Group compact>
                <Form.Item label="Target">
                    <Select defaultValue="" style={{ width: selectWidth }} onSelect={handleChange}>
                        {effectTargetOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='effectTarget'>{target.visible_text}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Effect">
                    <Select defaultValue="" style={{ width: selectWidth }} onSelect={handleChange} disabled={!editCardState.effectTarget}>
                        {effectOptions.map((target, index) => <Select.Option key={index} value={target.value} prop_state='effect' >{target.visible_text}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Amount" >
                    <InputNumber min={0} defaultValue={0} onChange={handleEffectNumberChange} disabled={!editCardState.effect || !editCardState.effectTarget} />
                </Form.Item>
                <Form.Item label="Turns" >
                    <InputNumber min={0} defaultValue={0} onChange={handleEffectTurnChange} disabled={!editCardState.effect || !editCardState.effectTarget} />
                </Form.Item>
            </Input.Group>


            {(editCardState.playerTarget && editCardState.playerCondition && editCardState.playerOperator) && <p>{editCardState.playerTarget} {editCardState.playerCondition} {editCardState.playerOperator} {editCardState.playerValue} </p>}
            {(editCardState.characterTarget && editCardState.characterCondition && editCardState.characterOperator) && <p>{editCardState.characterTarget} {editCardState.characterCondition} {editCardState.characterOperator} {editCardState.characterValue} </p>}
            {(editCardState.effectTarget && editCardState.effect) && <p>{editCardState.effectTarget} {editCardState.effect} {editCardState.effectValue} for the next {editCardState.turn} turn(s)</p>}
        </>
    )
}

export default EditEffect;
