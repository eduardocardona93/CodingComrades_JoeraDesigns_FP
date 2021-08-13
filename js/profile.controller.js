var currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log("currentUser profile: ", currentUser);

document.getElementById('firstName').value = currentUser.firstName;
document.getElementById('lastName').value = currentUser.lastName;
document.getElementById('birthday').value = currentUser.birthday;
document.getElementById('phone').value = currentUser.phone;
document.getElementById('pUrl').value = currentUser.pUrl;
document.getElementById('genderMale').checked = currentUser.gender == "Male" ? true : false;
document.getElementById('genderFemale').checked = currentUser.gender != "Male" ? true : false;
document.getElementById('comments').value = currentUser.comments;

let nameRegex = /^[a-zA-Z ]+$/;
let phoneRegex = /^[0-9]{10}$/;
let imageBits="";

document.getElementById('btnUpdate').addEventListener('click', (ev) => {
    ev.preventDefault();
    let firstName = document.getElementById('firstName').value.trim();
    let lastName = document.getElementById('lastName').value.trim();
    let birthday = document.getElementById('birthday').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let pUrl = document.getElementById('pUrl').value.trim();
    let gender = document.getElementById('genderMale').checked ? "Male" : "Female";
    let comments = document.getElementById('comments').value.trim();
    let consent = document.getElementById('consent').checked;

    if (firstName == "" || firstName == null || !validateString(firstName)) {
      alert("Please enter valid value for first name!");
      return;
    } else if (lastName == "" || lastName == null || !validateString(lastName)) {
      alert("Please enter valid value for last name!");
      return;
    } else if (birthday == "" || birthday == null) {
      alert("Please enter valid value for date of birth!");
      return;
    } else if (phone == "" || phone == null || !validatePhone(phone)) {
      alert("Please enter valid value for phone!");
      return;
    } else if (pUrl == "" || pUrl == null) {
      alert("Please enter valid value for Personal URL!");
      return;
    } else if (!consent) {
      alert("Please provide your consent!");
      return;
    }

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.birthday = birthday;
    currentUser.phone = phone;
    currentUser.pUrl = pUrl;
    currentUser.gender = gender;
    currentUser.comments = comments;

    let transaction = createTransaction('userStore', 'readwrite');
    transaction.oncomplete = (ev) => {
      alert("Data updated succesfully!");
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };

    let store = transaction.objectStore('userStore');
    let request = store.put(currentUser); //request an insert/add

    request.onsuccess = (ev) => {
      console.log('successfully added an object');
    };
    request.onerror = (err) => {
      console.log('error in request to add');
    };
  });

  function validateString(string) {
    return nameRegex.test(string);
  }

  function validatePhone(phone) {
    return phoneRegex.test(phone);
  }
  