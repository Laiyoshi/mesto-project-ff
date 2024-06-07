function showError(inputElement, errorElement, validationConfig) {
  errorElement.classList.add(validationConfig.errorClass)
  inputElement.classList.add(validationConfig.inputErrorClass)
  errorElement.textContent = inputElement.validationMessage
}

function hideError(inputElement, errorElement, validationConfig) {
  inputElement.classList.remove(validationConfig.inputErrorClass)
  errorElement.classList.remove(validationConfig.errorClass)
  errorElement.textContent = inputElement.validationMessage
}

function buttonEnable(buttonElement, validationConfig) {
  buttonElement.classList.remove(validationConfig.inactiveButtonClass)
  buttonElement.disabled = false
}

function buttonDisable(buttonElement, validationConfig) {
  buttonElement.classList.add(validationConfig.inactiveButtonClass)
  buttonElement.disabled = true
}

function toggleButtonState(buttonElement, isValid, validationConfig) {
  if (isValid) {
    buttonEnable(buttonElement, validationConfig)
  } else {
    buttonDisable(buttonElement, validationConfig)
  }
}

function setEventsListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector)
  toggleButtonState(buttonElement, formElement.checkValidity(), validationConfig)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, validationConfig)
      toggleButtonState(buttonElement, formElement.checkValidity(), validationConfig)
    })
  })

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault()
  })
}

function isValid(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`)

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }
  if (inputElement.validity.valid) {
    hideError(inputElement, errorElement, validationConfig)
  } else {
    showError(inputElement, errorElement, validationConfig)
  }
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector))
  formList.forEach((formElement) => {
    setEventsListeners(formElement, validationConfig)
  })
}

function clearValidation(profileForm, validationConfig) {
  const inputList = profileForm.querySelectorAll(validationConfig.inputSelector)
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector)
  inputList.forEach((inputElement) => {
    const errorElement = profileForm.querySelector(`.${inputElement.name}-error`)
    hideError(inputElement, errorElement, validationConfig)
    buttonEnable(buttonElement, validationConfig)
  })
}

export { enableValidation, clearValidation }
