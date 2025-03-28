import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    },

    // optional configuration object that allows slices to respond to actions generated by other parts of your application
    // eg: actions generated by createAsyncThunk, which generates 3 actions: pending, fulfilled and rejected
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                console.log("pending");
            })
            .addCase(incrementAsync.rejected, (state) => {
                console.log("rejected");
            })
            // fulfilled when the promise is resolved
            // action.payload is the value that was returned by the promise
            .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
                console.log("fulfilled");
                state.value += action.payload;
            });
    }
});

// createAsyncThunk is a function that takes a string and a function
// the string is the name of the action type
// the function is the payload creator
// the payload creator is a function that returns a promise
// the promise resolves to the payload value
// the payload value (action.payload) is the value that will be dispatched to the reducer

// simulate async request (eg: fetch data from an API)
export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return amount;
    }
);


export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;