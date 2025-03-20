import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// create slice from redux toolkit helps manage and update state
// if we used a regular "redux reducer", we would have to write a lot of boilerplate code
// since state is immutable, duplicate the state and return a new updated state

interface CounterState {
    value: number;
}

// initialize the state
const initialState: CounterState = {
    value: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // we are not mutating the state directly
        // we are returning a new state (behind the scenes)
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;