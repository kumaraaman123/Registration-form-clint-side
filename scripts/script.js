const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const button = document.getElementById("btn-Submit");
const formEl = document.getElementById("form");

function showError(input, message) {
  //parent element
  const parentEl = input.parentElement;
  //child element
  const errorEl = parentEl.querySelector(".error");
  //update class
  errorEl.classList.add("error-msg");
  //display in HTML
  errorEl.innerHTML = message;
}

function successMsg(input) {
  input.classList.add("success");
  //parent element
  const parentEl = input.parentElement;
  //child element
  const errorEl = parentEl.querySelector(".error");
  //update class
  errorEl.classList.remove("error-msg");
}

const array = [
  {
    input: userNameInput,
    message: "Username is Mandatory",
  },
  {
    input: emailInput,
    message: "Email is Mandatory",
  },
  {
    input: passwordInput,
    message: "Password is Mandatory",
  },
  {
    input: confirmPasswordInput,
    message: "Confirm Password is Mandatory",
  },
];

const checkRequired = function (input, message) {
  if (input.value.trim()) {
    // successMsg(input);
  } else {
    showError(input, `${message}`);
  }
};

const validateInput = function (input, message, min, max) {
  if (input.value.trim().length < min) {
    showError(input, `${message} should be at least ${min} character`);
  } else if (input.value.trim().length > max) {
    showError(input, `${message} should be less then ${max} character`);
  } else {
    successMsg(input);
  }
};

function isEmailAddress(str) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str); // returns a boolean
}

const validateEmail = function (input) {
  if (isEmailAddress(input.value.trim())) {
    successMsg(input);
  } else {
    showError(input, "Email in proper format");
  }
};

const validateConfirmPassword = function (input1, input2) {
  if (input2.value.trim() === "") {
    showError(input2, "Confirm Password is empty");
  } else if (input1.value.trim() === input2.value.trim()) {
    successMsg(input2);
  } else {
    showError(input2, "Password and Confirm Password not match");
  }
};

formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  // debugger;

  for (let i = 0; i < array.length; i++) {
    input = array[i].input;
    message = array[i].message;
    checkRequired(input, message);
  }

  validateInput(userNameInput, "Username", 6, 16);
  validateInput(passwordInput, "Password", 5, 10);
  validateEmail(emailInput);
  validateConfirmPassword(passwordInput, confirmPasswordInput);

  userNameInput.value = null;
  passwordInput.value = null;
  emailInput.value = null;
  confirmPasswordInput.value = null;
});
