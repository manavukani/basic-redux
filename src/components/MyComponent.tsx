import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { decrement, increment, incrementByAmount } from '../state/counter/counterSlice';

const MyComponent = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();


    return (
        <div>
            <h2>{count}</h2>
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>dispatch(decrement())}>-</button>
            <button onClick={()=>dispatch(incrementByAmount(10))}>+10</button>
        </div>
    )
}

export default MyComponent;