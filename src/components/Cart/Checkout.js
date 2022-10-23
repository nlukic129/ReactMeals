import useValidate from "../../hooks/use-validate";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  let isFormValid = false;
  const regexName = /^[a-z ,.'-]+$/i;
  const regexStreet = /^\s*\S+(?:\s+\S+){2}/;
  const regexCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

  const {
    inputValue: inputNameValue,
    valueIsValid: isValidName,
    hasError: hasErrorName,
    inputHandler: inputNameHandler,
    touchHandler: touchNameHandler,
    resetHandler: resetNameHandler,
  } = useValidate((inputNameValue) => regexName.test(inputNameValue));

  const {
    inputValue: inputStreetValue,
    valueIsValid: isValidStreet,
    hasError: hasErrorStreet,
    inputHandler: inputStreetHandler,
    touchHandler: touchStreetHandler,
    resetHandler: resetStreetHandler,
  } = useValidate((inputStreetValue) => regexStreet.test(inputStreetValue));

  const {
    inputValue: inputPostalCodeValue,
    valueIsValid: isValidPostalCode,
    hasError: hasErrorPostalCode,
    inputHandler: inputPostalCodeHandler,
    touchHandler: touchPostalCodeHandler,
    resetHandler: resetPostalCodeHandler,
  } = useValidate(
    (inputPostalCodeValue) => inputPostalCodeValue.trim().length === 5
  );

  const {
    inputValue: inputCityValue,
    valueIsValid: isValidCity,
    hasError: hasErrorCity,
    inputHandler: inputCityHandler,
    touchHandler: touchCityHandler,
    resetHandler: resetCityHandler,
  } = useValidate((inputCityValue) => regexCity.test(inputCityValue));

  if (isValidName && isValidCity && isValidPostalCode && isValidStreet) {
    isFormValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const userData = {
      name: inputNameValue,
      city: inputCityValue,
      street: inputStreetValue,
      postalCode: inputPostalCodeValue,
    };

    resetCityHandler();
    resetNameHandler();
    resetPostalCodeHandler();
    resetStreetHandler();

    props.onConfirm(userData);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={hasErrorName ? classes.invalid : classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={touchNameHandler}
          onChange={inputNameHandler}
          value={inputNameValue}
        />
        {hasErrorName && (
          <p className={classes.errorText}>Incorrect name entry.</p>
        )}
      </div>
      <div className={hasErrorStreet ? classes.invalid : classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onBlur={touchStreetHandler}
          onChange={inputStreetHandler}
          value={inputStreetValue}
        />
        {hasErrorStreet && (
          <p className={classes.errorText}>Incorrect street entry.</p>
        )}
      </div>
      <div className={hasErrorPostalCode ? classes.invalid : classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onBlur={touchPostalCodeHandler}
          onChange={inputPostalCodeHandler}
          value={inputPostalCodeValue}
        />
        {hasErrorPostalCode && (
          <p className={classes.errorText}>Incorrect postal code entry.</p>
        )}
      </div>
      <div className={hasErrorCity ? classes.invalid : classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onBlur={touchCityHandler}
          onChange={inputCityHandler}
          value={inputCityValue}
        />
        {hasErrorCity && (
          <p className={classes.errorText}>Incorrect city entry</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!isFormValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
