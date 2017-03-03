export function validateSettings(type , value) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =  /^[\s\S]{4,16}$/;
  let error = null;

  switch(type) {
    case 'email':
      if(!emailRegex.test(value)) {
        error = 'Please enter a valid email';
      }
      break;
    case 'password':
      if(!passwordRegex.test(value)) {
        error = 'Must be 4-16 characters long';
      }
      break;
  }
  return error;
}
  
export function validateSignup(formProps) {
  const errors = {};
  const usernameRegex =  /^[a-zA-Z0-9_]{2,16}$/;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =  /^[\s\S]{4,16}$/;

  if(!formProps.username) {
    errors.username = 'Please enter the username';
  }
  else if(!usernameRegex.test(formProps.username)) {
    errors.username = 'Invalid username entered';
  }

  if(!formProps.email || !emailRegex.test(formProps.email)) {
    errors.email = 'Please enter a valid email';
  }

  if(!formProps.password) {
    errors.password = 'Please enter the password';
  }
  else if(!passwordRegex.test(formProps.password)) {
    errors.password = 'Must be 4-16 characters long';
  }

  return errors;
}

export function validateCreateDilemma(formProps) { 
  const errors = {};
  const titleRegex =  /^[\s\S]{2,64}$/;
  const descriptionRegex = /^[\s\S]{0,360}$/;
  const answerRegex = /^[\s\S]{2,64}$/;

  if(!formProps.title) {
    errors.title = 'Please enter the title';
  }
  else if(!titleRegex.test(formProps.title)) {
    errors.title = 'Title must be 2-64 characters long';
  }

  if(!descriptionRegex.test(formProps.description)) {
    errors.description = 'Description is too long';
  }

  if(formProps.answer && !answerRegex.test(formProps.answer)) {
    errors.answer = 'Answer must be 2-64 characters long';
  }

  return errors;
}
