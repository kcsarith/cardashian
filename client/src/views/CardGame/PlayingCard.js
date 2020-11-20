import React from 'react'
import { Popover } from 'antd'
const OneCard = ({ size, imageSrc, hexColor = '#CCC', cost, hp, atk }) => {
    const widthMultiplier = 3 * size;
    const heightMultiplier = 4 * size;
    return (
        <div style={{
            backgroundColor: hexColor, width: 100 * widthMultiplier, height: 103 * heightMultiplier, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column'
        }}>
            <div style={{ backgroundColor: 'grey', width: 83 * widthMultiplier, height: 10 * heightMultiplier, marginTop: 2.5 * heightMultiplier, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <div style={{
                    display: 'block',
                    width: 8 * widthMultiplier,
                    height: 8.7 * heightMultiplier,
                    backgroundColor: 'red',
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                }} >5</div>
                <div style={{ backgroundColor: 'white', width: 67 * widthMultiplier, height: 6.25 * heightMultiplier, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>GRANTS</div>
            </div >
            <div style={{ backgroundColor: 'grey', width: 83 * widthMultiplier, height: 50 * heightMultiplier, marginTop: 2.5 * heightMultiplier }}>
                NAME OF CARD
        </div >
            <div>
                <div style={{ backgroundColor: 'grey', height: 5 * widthMultiplier, marginTop: 2.5 * heightMultiplier, marginLeft: 50 * widthMultiplier }}>
                    Description Title
        </div >
                <div style={{ backgroundColor: 'grey', width: 83 * widthMultiplier, height: 12.5 * heightMultiplier, marginTop: 2.5 * heightMultiplier }}>
                    Description
        </div >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{
                        display: 'block',
                        width: 16.7 * widthMultiplier,
                        height: 6.25 * heightMultiplier,
                        backgroundColor: '#CCC',
                        display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                    }} >5 ATK</div>
                    <div style={{
                        display: 'block',
                        width: 16.7 * widthMultiplier,
                        height: 6.25 * heightMultiplier,
                        backgroundColor: '#CCC',
                        display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                    }} >5 DEF</div>
                </div>
            </div>
        </div >
    )
}
const PlayingCard = ({ size, imageSrc, hexColor = '#C00', cost, hp, atk }) => {

    const widthMultiplier = 3 * size;
    const heightMultiplier = 4 * size;
    return (
        <Popover content={<OneCard size={1} />} title="Title">
            <div style={{ backgroundColor: hexColor, width: 100 * widthMultiplier, height: 103 * heightMultiplier, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column' }}>
                <div style={{ backgroundColor: 'grey', width: 83 * widthMultiplier, height: 10 * heightMultiplier, marginTop: 2.5 * heightMultiplier, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        display: 'block',
                        width: 8 * widthMultiplier,
                        height: 8.7 * heightMultiplier,
                        backgroundColor: 'red',
                        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                        display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                    }} >5</div>
                    <div style={{ backgroundColor: 'white', width: 67 * widthMultiplier, height: 6.25 * heightMultiplier, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>GRANTS</div>
                </div >
                <img src='' width={83 * widthMultiplier} height={50 * heightMultiplier} style={{ marginTop: 2.5 * heightMultiplier }} />
                <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center' }}>
                    <div style={{
                        display: 'block',
                        width: 33 * widthMultiplier,
                        height: 13 * heightMultiplier,
                        backgroundColor: '#CCC',
                        display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                    }} >5 ATK</div>
                    <div style={{
                        display: 'block',
                        width: 33 * widthMultiplier,
                        height: 13 * heightMultiplier,
                        backgroundColor: '#CCC',
                        display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                    }} >5 DEF</div>
                </div>
            </div >
        </Popover>
    )
}

export default PlayingCard;
