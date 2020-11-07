import React from 'react';
import { Grid, FormControl, InputLabel, NativeSelect, TextField, Container } from '@material-ui/core'
import { playerTargetOptions, playerConditionOptions, characterTargetOptions, characterConditionOptions, operatorOptions, effectOptions, effectTargetOptions } from '../../cardData';
import { Autocomplete } from '@material-ui/lab';

const EditEffect = () => {
    const [state, setState] = React.useState({
        playerTarget: 'None',
        playerCondition: 'None',
        playerOperator: '=',
        playerValue: 0,
        characterTarget: 'None',
        characterCondition: 'None',
        characterOperator: '=',
        characterValue: 0,
        effectTarget: 'None',
        effectConditionOptions: 'None',
        effectValue: 0,
        turn: 1,
    });

    const handleChange = async (event, props) => {
        const name = event.target.name;
        await setState({
            ...state,
            [name]: event.target.value,
        });
        console.log(event)
        console.log(props)
    };

    return (
        <Container>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Autocomplete
                            value={state.playerTarget}
                            onChange={handleChange}
                            options={playerTargetOptions}
                            getOptionLabel={(option) => option.visibleText}
                            renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
                        />
                        {/* <InputLabel shrink htmlFor="age-native-label-placeholder">Player Target</InputLabel>
                        <NativeSelect value={state.playerTarget} onChange={handleChange} inputProps={{ name: 'playerTarget' }}>
                            {playerTargetOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                        </NativeSelect> */}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl disabled={state.playerTarget === 'None'}>
                            <InputLabel shrink htmlFor="age-native-label-placeholder">Player Condition</InputLabel>
                            <NativeSelect value={state.playerCondition} onChange={handleChange} inputProps={{ name: 'playerCondition' }}>
                                {playerConditionOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                            </NativeSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">Operator</InputLabel>
                        <NativeSelect value={state.playerOperator} onChange={handleChange} inputProps={{ name: 'playerOperator' }}>
                            {operatorOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField label="Number" type="number" onChange={handleChange} name='playerValue' shrink={true} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">Character Target</InputLabel>
                        <NativeSelect value={state.characterTarget} onChange={handleChange} inputProps={{ name: 'characterTarget' }}>
                            {characterTargetOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">Character Condition</InputLabel>
                        <NativeSelect value={state.characterCondition} onChange={handleChange} inputProps={{ name: 'characterCondition' }}>
                            {characterConditionOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">Operator</InputLabel>
                        <NativeSelect value={state.characterOperator} onChange={handleChange} inputProps={{ name: 'characterOperator' }}>
                            {operatorOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField label="Number" type="number" onChange={handleChange} name='characterValue' shrink={true} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">Effect Target</InputLabel>
                        <NativeSelect value={state.effectTarget} onChange={handleChange} inputProps={{ name: 'effectTarget' }}>
                            {effectTargetOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel shrink htmlFor="age-native-label-placeholder">Effect</InputLabel>
                        <NativeSelect value={state.effect} onChange={handleChange} inputProps={{ name: 'effect' }}>
                            {effectOptions.map(target => <option value={target.value} translation={target.translation}>{target.visibleText}</option>)}
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField label="Number" type="number" onChange={handleChange} name='effectValue' shrink={true} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField label="Number" type="number" onChange={handleChange} name='turn' shrink={true} />
                    </Grid>
                </Grid>
            </form>
            <p>{state.playerTarget} {state.playerCondition} {state.playerOperator} {state.playerValue} and </p>
            <p> {state.characterTarget} {state.characterCondition} {state.characterOperator} {state.characterValue} </p>
            <p> {state.effectTarget} {state.effect} {state.effectValue} for the next {state.turn} turn(s).</p>
        </Container>
    )
}

export default EditEffect;
