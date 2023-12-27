import { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  //
  const {
    value: name,
    valueIsValid: nameIsValid,
    value_is_invalid: name_is_invalid,
    setValue: setName,
    setValueBlured: setNameBlured,
    valueChnageHandler: nameChnageHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim().length !== 0);
  //
  const {
    value: street,
    valueIsValid: streetIsValid,
    value_is_invalid: street_is_invalid,
    setValue: setStreet,
    setValueBlured: setStreetBlured,
    valueChnageHandler: streetChnageHandler,
    valueBlurHandler: streetBlurHandler,
  } = useInput((value) => value.trim().length !== 0);
  //
  const {
    value: postalCode,
    valueIsValid: postalCodeIsValid,
    value_is_invalid: postalCode_is_invalid,
    setValue: setPostalCode,
    setValueBlured: setPostalCodeBlured,
    valueChnageHandler: postalCodeChnageHandler,
    valueBlurHandler: postalCodeBlurHandler,
  } = useInput((value) => value.trim().length === 6);
  //
  const {
    value: city,
    valueIsValid: cityIsValid,
    value_is_invalid: city_is_invalid,
    setValue: setCity,
    setValueBlured: setCityBlured,
    valueChnageHandler: cityChnageHandler,
    valueBlurHandler: cityBlurHandler,
  } = useInput((value) => value.trim().length !== 0);

  //
  const [formIsValid, setFormIsValid] = useState(false);

  //
  useEffect(() => {
    // console.log("formIsValid : ", formIsValid);
    setFormIsValid(
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid
    );
  }, [nameIsValid, streetIsValid, cityIsValid, postalCodeIsValid]);

  //
  const confirmHandler = (event) => {
    event.preventDefault();

    //
    // const formValidity =
    //   nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) return; // if it is not valid

    setName("");
    setCity("");
    setStreet("");
    setPostalCode("");
    setNameBlured(false);
    setCityBlured(false);
    setStreetBlured(false);
    setPostalCodeBlured(false);

    // console.log({name, city, street, postalCode});
    props.onConfirm({
      name,
      city,
      street,
      postalCode,
    });
  };

  /*
    [nameIsValid, streetIsValid, cityIsValid, postalCodeIsValid] : 
        - in this case form validity will be checked, 
            - on 1st time page reload
            - when form will get submit 

    [name, street, city, postalCode] :
        - in this case form validity will be checked, 
            - on 1st time page reload
            - when form will get submit 
            *- on every keystroke of any input field
  */

  //
  const nameClassControl = name_is_invalid
    ? classes.control + ` ${classes.invalid}`
    : classes.control;
  //
  const cityClassControl = city_is_invalid
    ? classes.control + ` ${classes.invalid}`
    : classes.control;
  //
  const streetClassControl = street_is_invalid
    ? classes.control + ` ${classes.invalid}`
    : classes.control;
  //
  const postalClassControl = postalCode_is_invalid
    ? classes.control + ` ${classes.invalid}`
    : classes.control;

  //
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassControl}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={nameChnageHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      <div className={streetClassControl}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChnageHandler}
          onBlur={streetBlurHandler}
        />
      </div>
      <div className={postalClassControl}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalCode}
          onChange={postalCodeChnageHandler}
          onBlur={postalCodeBlurHandler}
        />
      </div>
      <div className={cityClassControl}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChnageHandler}
          onBlur={cityBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
