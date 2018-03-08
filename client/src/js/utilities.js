import {route} from "preact-router";
import {makeRequest, token} from './server-requests-utils';

const getSignInPromise = () => {
  return makeRequest('GET','user');
}

const formDataForAxios = (form) => {
  let formData = {};
  for (var pair of new FormData(form).entries()) {
    if(!pair[1]) return null;
    formData[pair[0]] = pair[1];
  }
  return formData;
}

const setStateValue = (key, value, component) => {
  const stateObject = {};
  stateObject[key] = value;
  component.setState(stateObject);
}

const validEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validPassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return re.test(String(password));
};

const passwordsMatch = (password1, password2) => {
  return password1 === password2;
}

/**
 *  Checks whether any of the fields are empty
 *  Checks whether confirm_password matches password
 *  Checks whether password is of minimum 6 characters & that it has atleast one number,
 *   one letter, & atleast one specail character.
 *  Checks whether the email address is of a valid format
 */
const formIsValid = (args) => {
  let {message_key, formData, component, matchPasswordFields, passwordToValidate} = args;

  if(!formData){
    setStateValue(message_key, 'One or more fields were left empty', component);
    return false;
  }

  if(matchPasswordFields){
    const [password1, password2] = matchPasswordFields;
    if (!passwordsMatch(formData[password1],formData[password2])) {
      setStateValue(message_key, 'Passwords do no match.', component);
      return false;
    }
  }

  if (!validPassword(formData[passwordToValidate])) {
    setStateValue(message_key,
      'Password should have minimum length of 6 & it should have atleast one letter, one number, and one special character', component);
    return false;
  }

  if (!validEmail(formData.email)) {
    setStateValue(message_key, 'Email is not of the valid format', component);
    return false;
  }

  return true;
}

// Exports below
export const handleSubmit = (args) => {
  let {event, path, message_key, component, matchPasswordFields, passwordToValidate, successMessage} = args;

  event.preventDefault();

  const formData = formDataForAxios(event.target);
  const validationArgs = {
    message_key: message_key,
    formData: formData,
    component: component,
    matchPasswordFields: matchPasswordFields,
    passwordToValidate: passwordToValidate,
  };
  if(!formIsValid(validationArgs)) return;

  makeRequest('POST', path, '', formData)
  .then(function (response) {
      token.setCookie(response.data.token);
        route(`/profile?success=${successMessage}`,true);
    })
    .catch(function (error) {
      if (error.response === undefined) {
        return setStateValue(message_key, error, component);
      }
      if (error.response.status === 401) {
        token.deleteCookie();
        return setStateValue(message_key, 'Wrong password.', component);
      } else {
        return setStateValue(message_key, error.response.data, component);
      }
    });
}

export const clearForms = () => {
  for (let form of document.getElementsByTagName("form")) {
    form.reset();
  }
}

export const logout = () => {
  token.deleteCookie();
}

export const setStateUserOrRedirectToSignIn = (component) => {
  getSignInPromise()
    .then((response) => {
      component.setState({
        user: response.data,
        isSignedIn: true,
      });
      }
    ).catch(() => {
      route('/signin', true);
  });
}
