// 1. Start
// 2. Import the throttle function from lodash library
import _throttle from 'lodash.throttle';

// 3. Select the feedback form element and store it in variable formEl
const formEl = document.querySelector('.feedback-form');

// 4. Define a key for accessing local storage
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// 5. Define function loadForm to load saved form data
//     5.1 Try to parse saved form data from local storage
//     5.2 If data exists, populate the form fields with this data
//     5.3 Catch and log any errors during data loading
let data = {};

function loadForm() {
  try {
    // JSON.parse first before accessing a value from Local Storage
    // JSON.stringify first before setting a value to the Local Storage
    let formLoad = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!formLoad) {
      return;
    }

    data = formLoad;
    formEl.email.value = data.email || '';
    formEl.message.value = data.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}

// 6. Define function onSaveFormInput to save form input to local storage
//     6.1 Update the data object with the form input name and value
//     6.2 Save the updated data object to local storage

function onSaveFormInput(event) {
  data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  data[event.target.name] = event.target.value;
  // data = {
  // email: "mail@mail.com",
  // message: "message"
  // }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

// 7. Define function onFormSubmit to handle form submission
//     7.1 Prevent default submission action
//     7.2 Validate form data, alerting if necessary
//     7.3 Log form data, reset the form, and remove saved data from local storage

function onFormSubmit(event) {
  event.preventDefault();
  // when the form is not completely filled out, return an alert saying we need to enter all data
  if (!event.target.email.value || !event.target.message.value) {
    alert('Enter all data');
    return;
  }

  // reset the form once submit button is clicked
  event.target.reset();
  // console.log the details entered after submission
  console.log(data);

  // delete the item in the local storage once submit is successful
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

// 8. Call loadForm to attempt to preload form data

// 9. Attach event listeners to the form
//     9.1 Add an input event listener, throttled, to save input data
//     9.2 Add a submit event listener to handle form submission

// 10. End

loadForm();

formEl.addEventListener('input', _throttle(onSaveFormInput, 500));

formEl.addEventListener('submit', onFormSubmit);