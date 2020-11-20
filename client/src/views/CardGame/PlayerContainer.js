import React from 'react'
const PlayerContainer = ({ size }) => {
    const widthMultiplier = 3 * size;
    const heightMultiplier = 4 * size;
    return (
        <div style={{ backgroundColor: 'red', width: 60 * widthMultiplier, height: 50 * heightMultiplier, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column' }}>
            <div style={{ width: 50 * widthMultiplier, height: 50 * widthMultiplier, overflow: "hidden" }}>
                <img
                    src='' width={50 * widthMultiplier} />
            </div>
            <div>
                10 LP
            </div>
        </div >
    )
}

export default PlayerContainer;
