const validator = require("validator");

const isEmail = email => {
  return validator.isEmail(email);
};
const isEmpty = value => {
  return validator.isEmpty(value);
};
const isPasswordLength = value => {
  return validator.isLength(value, { max: 5 });
};
const isPasswordsEqual = (password, cPassword) => {
  return validator.equals(password, cPassword);
};
const isWebsite = value => {
  return validator.matches(
    value,
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
  );
};

exports.validateSignUpData = data => {
  let errors = {};
  if (isEmpty(data.password)) {
    errors.password = "Must Not Be Empty";
  } else if (isEmpty(data.cpassword)) {
    errors.cpassword = "Must Not Be Empty";
  } else if (isPasswordLength(data.password)) {
    errors.password = "Must Be More Than 6 Characters";
  } else if (isPasswordLength(data.cpassword)) {
    errors.cpassword = "Must Be More Than 6 Characters";
  } else if (!isPasswordsEqual(data.password, data.cpassword)) {
    errors.password = "Must Be Same";
    errors.cpassword = "Must Be Same";
  }

  if (isEmpty(data.email)) {
    errors.email = "Must Not Be Empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must Be A Valid Email Address";
  }

  if (isEmpty(data.name)) {
    errors.name = "Must Not Be Empty";
  }

  if (data.website !== "" && data.website !== undefined) {
    if (!isWebsite(data.website)) {
      errors.website = "Must Be A Valid Website";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};
  if (isEmpty(data.password)) {
    errors.password = "Must Not Be Empty";
  } else if (isPasswordLength(data.password)) {
    errors.password = "Must Be More Than 6 Characters";
  }
  if (isEmpty(data.email)) {
    errors.email = "Must Not Be Empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must Be A Valid Email Address";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateUpdateData = data => {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Must Not Be Empty";
  }

  if (data.website !== "" && data.website !== undefined) {
    if (!isWebsite(data.website)) {
      errors.website = "Must Be A Valid Website";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateBlogData = data => {
  let errors = {};
  if (isEmpty(data.title)) {
    errors.title = "Must Not Be Empty";
  }
  if (isEmpty(data.body)) {
    errors.body = "Must Not Be Empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateCommentData = data => {
  let errors = {};
  if (isEmpty(data)) {
    errors.body = "Must Not Be Empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
