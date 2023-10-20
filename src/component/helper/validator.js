const common = require("./common");
// const moment = require("moment");

module.exports = {
  checkNonNull() {
    for (let i = 0; i < arguments.length; i++) {
      const val = arguments[i];
      if (val == null) throw `A field is either null or not passed`; //used == to also consider undefined values
    }
  },

  checkNumber(num, varName) {
    if (varName == null) varName = "Parameter";
    if (num == null) {
      const error = new Error(`Must pass ${varName}`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
    num = parseFloat(num);
    if (isNaN(num)) {
      const error = new Error(`${varName} must be a number`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
  },

  checkString(str, varName) {
    if (!varName) varName = "Parameter";
    if (str == null) {
      const error = new Error(`Must pass ${varName}`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
    if (typeof str !== "string") {
      const error = new Error(`${varName} must be a string`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
    if (str.trim().length == 0) {
      const error = new Error(`${varName} cannot be empty`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
  },

  checkStringArray(arr, varName) {
    if (!varName) varName = "Parameter";
    if (arr == null) throw `Must pass ${varName}`;
    if (!Array.isArray(arr)) throw `${varName} must be an array`;
    arr.forEach((val) => {
      if (typeof val != "string" || val.trim().length == 0)
        throw `${varName} must contain non-empty strings`;
    });
  },

  checkUser(user) {
    if (user == null) throw `Must pass user object`;
    if (!this.isValidObject(user)) throw `User must be an object`;
    const { _id, userName } = user;

    this.checkString(userName, "username");
  },

  // checkGender(genderCode, varName) {
  //   if (genderCode == null || genderCode == "") {
  //     const error = new Error(`You must enter your gender`);
  //     error.code = common.errorCode.BAD_REQUEST;
  //     throw error;
  //   }
  //   genderCode = Number(genderCode);
  //   if (isNaN(genderCode)) throw `${varName} must be a number`;
  //   let isValid = false;
  //   for (const key in common.gender) {
  //     if (Object.hasOwnProperty.call(common.gender, key)) {
  //       if (common.gender[key] == genderCode) isValid = true;
  //     }
  //   }
  //   if (!isValid) {
  //     const error = new Error(
  //       `Gender must be within [${Object.values(common.gender)}]`
  //     );
  //     error.code = common.errorCode.BAD_REQUEST;
  //     throw error;
  //   }
  // },

  checkPassword(str) {
    this.checkString(str, "Password");
    const regEx =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
    if (!str.match(regEx)) {
      const error = new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number"
      );
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
  },

  checkEmail(email) {
    if (email == null) throw `Must pass email address`;
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/g;
    if (!email.match(regex)) throw `Invalid email address`;
  },

  checkDate(date, varName) {
    if (varName == null) varName = "Date";
    // if (!moment(date, "MM/DD/YYYY").isValid())
    throw `Invalid ${varName} (Required format: MM/DD/YYYY)`;
  },

  checkDesignation(designation) {
    if (designation == null) throw `Must pass designation`;
    if (common.designation[designation.toLowerCase()] == null)
      throw `Invalid designation`;
  },

  isValidObject(obj) {
    return typeof obj == "object" && !Array.isArray(obj);
  },

  checkDob: (input) => {
    if (!input) {
      const error = new Error(`You need to supply your date of birth`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
    let today = new Date().toLocaleDateString();
    let currmonth = parseInt(today.split("/")[0]);
    let currday = parseInt(today.split("/")[1]);
    let curryear = parseInt(today.split("/")[2]);
    let month = parseInt(input.split("-")[1]);
    let day = parseInt(input.split("-")[2]);
    let year = parseInt(input.split("-")[0]);
    if (currmonth === month && currday === day && curryear === year) {
      const error = new Error(`Your birthday cannot be today`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
    if (
      (day > currday && month == currmonth && year == curryear) ||
      (day > currday && month > currmonth && year > curryear) ||
      (month > currmonth && year > curryear) ||
      (month > currmonth && year == curryear) ||
      year > curryear
    ) {
      const error = new Error(`Your birthday cannot be in the future`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
    if (curryear - year < 13) {
      {
        const error = new Error(`You must be older than 13 to access inTouch`);
        error.code = common.errorCode.BAD_REQUEST;
        throw error;
      }
    }
    // Check if day in date supplied is out of range of month
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      if (day < 0 || day > 31) {
        const error = new Error(`${day} does not exist in ${month}`);
        error.code = common.errorCode.BAD_REQUEST;
        throw error;
      }
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
      if (day < 0 || day > 30) {
        const error = new Error(`${day} does not exist in ${month}`);
        error.code = common.errorCode.BAD_REQUEST;
        throw error;
      }
    }
    if (month === 2) {
      if (day < 0 || day > 28) {
        const error = new Error(`${day} does not exist in ${month}`);
        error.code = common.errorCode.BAD_REQUEST;
        throw error;
      }
    }
    // Check if inputted date is in the future
  },

  isEmptyObject(obj) {
    if (this.isValidObject(obj)) {
      return Object.keys(obj).length == 0;
    }
    return true;
  },

  isValidResponseStatusCode(code) {
    if (code == null || isNaN(code)) return false;
    code = Number(code);
    return code >= 100 && code < 600;
  },

  checkPhoneNumber(phone) {
    if (phone == null) {
      const error = new Error(`Phone number cannot be blank`);
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
    const regEx = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/g;
    const regExSimple = /^[0-9]{10}$/g;
    if (!phone.match(regEx) && !phone.match(regExSimple)) {
      const error = new Error("Invalid phone number");
      error.code = common.errorCode.BAD_REQUEST;
      throw error;
    }
  },
};
