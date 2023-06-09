import { useState } from 'react';
import { useNavigate } from 'react-router';
import './signup.scss';
import ErrorInput from '../ErrorInput';

/* Defining the inital errors state value */
const initialWrongInputs = {
  username: false,
  email: false,
  password: false,
};

function Signup() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(initialWrongInputs);

  const handleSignUp = e => {
    e.preventDefault();

    if (!inputs.username && !inputs.email && !inputs.password) {
      setErrorMsg(true);
      return;
    }

    /* Regex patterns */
    const usernameRegex = /(?<!\W)([A-Z]+|[a-z]{3,}|\d{2,})(?!\W)/g;
    const emailRegex = /(\w+)@([a-z]+)\.([a-z]{2,})/gi;
    const passwordRegex = /(?<!\W)([A-Z]+|[a-z]{5,}|\d{2,})(?!\W)/g;

    /* Matching with the user inputs */
    const matchedUsername = inputs.username.match(usernameRegex);
    const matchedEmail = inputs.email.match(emailRegex);
    const matchedPassword = inputs.password.match(passwordRegex);

    /* Checking Validation */
    const checkUsernaveValidation =
      inputs.username.length >= 6 &&
      matchedUsername &&
      matchedUsername.length >= 3;
    const checkEmailValidation = matchedEmail;
    const checkPasswordValidation =
      inputs.password.length >= 8 &&
      matchedPassword &&
      matchedPassword.length >= 3;

    if (!checkUsernaveValidation)
      setErrors(prevErrors => {
        return { ...prevErrors, username: true };
      });
    if (!checkEmailValidation)
      setErrors(prevErrors => {
        return { ...prevErrors, email: true };
      });
    if (!checkPasswordValidation)
      setErrors(prevErrors => {
        return { ...prevErrors, password: true };
      });

    if (
      checkUsernaveValidation &&
      checkEmailValidation &&
      checkPasswordValidation
    ) {
      localStorage.setItem(
        'user',
        JSON.stringify({ ...inputs, logged: false })
      );
      navigate('/signin');
    }
  };

  /* inputs Handlers */
  const handleUsernameInput = e => {
    setInputs(prevInputs => {
      return { ...prevInputs, username: e.target.value };
    });

    setErrors(prevErrors => {
      return { ...prevErrors, username: false };
    });

    setErrorMsg(false);
  };
  const handleEmailInput = e => {
    setInputs(prevInputs => {
      return { ...prevInputs, email: e.target.value };
    });

    setErrors(prevErrors => {
      return { ...prevErrors, email: false };
    });

    setErrorMsg(false);
  };
  const handlePasswordInput = e => {
    setInputs(prevInputs => {
      return { ...prevInputs, password: e.target.value };
    });

    setErrors(prevErrors => {
      return { ...prevErrors, password: false };
    });

    setErrorMsg(false);
  };

  return (
    <div className='main__content__signup'>
      <div className='main__content__signup_form'>
        <form onSubmit={handleSignUp}>
          <legend>Register</legend>
          {errorMsg && (
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: '-1.5em',
              }}
            >
              <ErrorInput color='#FFD100'>
                Please fill all the following information in order to make an
                account!{' '}
              </ErrorInput>
            </div>
          )}
          <div>
            <input
              type='text'
              name='username'
              value={inputs.username}
              onChange={handleUsernameInput}
              id='username'
              placeholder='Enter A Username'
            />
            {errors.username && (
              <ErrorInput color='#FFD100'>
                Invalid Username. Requires at least: 1 capital letter, 3 small
                letter, 2 number, with minimum 6 characters.
              </ErrorInput>
            )}
          </div>

          <div>
            <input
              type='email'
              name='email'
              value={inputs.email}
              onChange={handleEmailInput}
              id='email'
              placeholder='Enter An Email'
            />
            {errors.email && (
              <ErrorInput color='#202020'>
                The email address you entered is not in the correct format.
                Please enter a valid email address.
              </ErrorInput>
            )}
          </div>

          <div>
            <input
              type='password'
              name='password'
              value={inputs.password}
              onChange={handlePasswordInput}
              id='password'
              placeholder='Enter A Password'
            />
            {errors.password && (
              <ErrorInput color='#202020'>
                Invalid Password. Requires at least: 1 capital letter, 5 small
                letter, 2 number, with minimum 8 characters.
              </ErrorInput>
            )}
          </div>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
