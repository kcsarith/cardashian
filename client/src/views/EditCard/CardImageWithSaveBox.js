import React from 'react';
import { Button, Grid, Container } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const CardImageWithSaveCancel = (props) => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}><Button variant="contained" endIcon={<CloudUploadIcon />}>Save</Button></Grid>
                <Grid item xs={6}><Button variant="contained" endIcon={<HighlightOffIcon />}>Cancel</Button></Grid>
                <Grid item xs={12}>
                    <img width='100%' src={'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/poker-playing-card-ace-club-miroslav-nemecek.jpg'} />
                </Grid>
            </Grid>
        </>
    )
}

export default CardImageWithSaveCancel;
