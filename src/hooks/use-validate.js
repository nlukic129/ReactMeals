import { useReducer } from "react";

const defaultValues = { value: "", isTouched: false };

const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return defaultValues;
};

const useValidate = (validator) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, defaultValues);

  const inputHandler = (event) => {
    dispatchInput({ type: "INPUT", value: event.target.value });
  };

  const touchHandler = () => {
    dispatchInput({ type: "BLUR" });
  };

  const resetHandler = () => {
    dispatchInput({ type: "RESET" });
  };

  const valueIsValid = validator(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  return {
    inputValue: inputState.value,
    valueIsValid,
    hasError,
    inputHandler,
    touchHandler,
    resetHandler,
  };
};

export default useValidate;
