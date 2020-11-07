import React from 'react';
import { Container, Grid, } from '@material-ui/core';
import CardEditDrawer from '../components/CardEditDrawer';

import CardImageWithSaveCancel from './EditCard/CardImageWithSaveBox'
import CardAndOwnerName from './EditCard/CardAndOwnerName';
import EditEffect from './EditCard/EditEffect';

const EditCard = () => {
    return (
        <>
            <CardEditDrawer>
                <Container>
                    <Grid container spacing={5} style={{ minHeight: '900px' }} display="flex" justifyContent="center" alignItems="center" >
                        <Grid item xs={8}>
                            <CardAndOwnerName style={{ paddingTop: '3em' }} />
                            <EditEffect />
                        </Grid>
                        <Grid item xs={4}>
                            <CardImageWithSaveCancel />
                        </Grid>
                    </Grid>
                </Container>
            </CardEditDrawer >
        </>
    )
}
export default EditCard;
