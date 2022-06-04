import { useState } from "react";

import "./Form.css";

// eslint-disable-next-line no-useless-escape
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const Form = () => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)
    const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(false)

    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)
    const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(false)

    const emailInputIsValid = !enteredEmailIsValid && enteredEmailTouched
    const passwordInputIsValid = !enteredPasswordIsValid && enteredPasswordTouched



    const enteredEmailHandler = e => {
        setEnteredEmail(e.target.value)

        if (regex.test(e.target.value)) {
            setEnteredEmailIsValid(true)
        }

    }

    const enteredPasswordHandler = e => {
        setEnteredPassword(e.target.value)

        if (enteredPassword.trim().length >= 5) {
            setEnteredPasswordIsValid(true)
        }
    }

    const formSubmitHandler = e => {
        e.preventDefault();
        setEnteredEmailTouched(true)
        setEnteredPasswordTouched(true)

        if (!regex.test(enteredEmail) && !enteredPassword.trim().length >= 5) {
            return
        }

        console.log('submitted')
    }

    const enteredEmailBlurHandler = () => {
        setEnteredEmailTouched(true)

        if (regex.test(enteredEmail)) {
            setEnteredEmailIsValid(true)
        } else {
            setEnteredEmailIsValid(false)
        }
    }

    const enteredPasswordBlurHandler = () => {
        setEnteredPasswordTouched(true)

        if (enteredPassword.trim().length < 5 || enteredPassword === '') {
            setEnteredPasswordIsValid(false)
        }
    }

	return (
		<form onSubmit={formSubmitHandler}>
			<div className="password">
				<label htmlFor="email" >Email</label>
				<input type="email" onChange={enteredEmailHandler} onBlur={enteredEmailBlurHandler} id="email" />
                {emailInputIsValid && <p className="error">Email is not valid!</p>}
				<label htmlFor="password">Password</label>
				<input type="password" id="password" onChange={enteredPasswordHandler} onBlur={enteredPasswordBlurHandler} />
                {passwordInputIsValid && <p className="error">Password is not valid!</p>}
			</div>
			<button type="submit" className="submit-button">
				Log In
			</button>
		</form>
	);
};

export default Form;
