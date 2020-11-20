import React from 'react'
import PlayingCard from './CardGame/PlayingCard'
import PlayerContainer from './CardGame/PlayerContainer'
import { Popover } from 'antd'
const TestCard = () => {
    const testSize = 0.5
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', alignContent: 'center' }}>
                <div style={{ width: 180 }} />
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', alignContent: 'center' }}>
                    <PlayingCard size={testSize} />

                    <PlayingCard size={testSize} />

                    <PlayingCard size={testSize} />

                    <PlayingCard size={testSize} />
                </div>
                <PlayerContainer size={testSize} />
            </div>
            <div style={{ height: '200px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', alignContent: 'center' }}>
                <PlayerContainer size={testSize} />
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', alignContent: 'center' }}>
                    <PlayingCard size={testSize} />

                    <PlayingCard size={testSize} />

                    <PlayingCard size={testSize} />

                    <PlayingCard size={testSize} />
                </div>
                <div style={{ width: 180 }} />
            </div>
        </div>
    )
}

export default TestCard;
