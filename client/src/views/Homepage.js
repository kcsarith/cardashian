import React from 'react';
import { FormControl, InputLabel, NativeSelect, Container } from '@material-ui/core';

const Homepage = () => {
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    return (
        <Container>
            <FormControl >
                <InputLabel shrink htmlFor="age-native-label-placeholder"> Age</InputLabel>
                <NativeSelect
                    value={state.age}
                    onChange={handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-label-placeholder',
                    }}
                >
                    <option value="">None</option>
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </NativeSelect>
            </FormControl>
        </Container>
    );
}
export default Homepage
