import { useState } from "react";

const useInput = (valueValidationExpression) => {
  //
  const [value, setValue] = useState("");
  const [valueBlured, setValueBlured] = useState(false);

  const valueIsValid = valueValidationExpression(value);
  const value_is_invalid = valueBlured && !valueIsValid;

  //
  const valueChnageHandler = (e) => setValue(e.target.value);
  const valueBlurHandler = () => setValueBlured(true);

  //
  return {
    value,
    valueIsValid,
    value_is_invalid,
    setValue,
    setValueBlured,
    valueChnageHandler,
    valueBlurHandler,
  };
};

export default useInput;
