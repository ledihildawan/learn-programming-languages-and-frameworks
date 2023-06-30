import { useReducer } from 'react';

function createAction(type, payload) {
  return { type, payload };
}

function useReducerUtil(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithCreateAction = (type, payload) => {
    return dispatch(createAction(type, payload));
  };

  return [state, dispatchWithCreateAction];
}

export default useReducerUtil;
