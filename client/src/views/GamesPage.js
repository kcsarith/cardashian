import React, { useState } from 'react';
import GridFetchedGames from '../components/elements/GridFetchedGames'
const GamesPage = () => {

    // Fetch the current game when the gamename param changes.
    return (
        <>
            <GridFetchedGames games={[]} />
        </>
    );
};

export default GamesPage;
