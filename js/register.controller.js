const IDB = (function init() {

  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('JoeraDB', 4);

  //REGEX
  let nameRegex = /^[a-zA-Z ]+$/;
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let phoneRegex = /^[0-9]{10}$/;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });

  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success opening DB');
  });

  DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()

    console.log('upgrade', db);
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log('Database updated from version', oldVersion, 'to version', newVersion);

    if (db.objectStoreNames.contains('userStore')) {
      db.deleteObjectStore('userStore');
    }

    //create the ObjectStore
    objectStore = db.createObjectStore('userStore', {
      keyPath: 'id',
    });

    //add the indexes
    objectStore.createIndex('emailIDX', 'email', { unique: false });
  });


  // Image upload 
  var fileTag = document.getElementById("filetag"),
    preview = document.getElementById("preview");

  fileTag.addEventListener("change", function () {
    changeImage(this);
  });

  function changeImage(input) {
    var reader;

    if (input.files && input.files[0]) {
      reader = new FileReader();

      reader.onload = function (e) {
        preview.setAttribute('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }


  document.getElementById('btnSignUp').addEventListener('click', (ev) => {
    ev.preventDefault();
    //one of the form buttons was clicked

    console.log("Sign up clicked");
    let firstName = document.getElementById('firstName').value.trim();
    let lastName = document.getElementById('lastName').value.trim();
    let birthday = document.getElementById('birthday').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let psw = document.getElementById('psw').value.trim();
    let cpsw = document.getElementById('confirmPassword').value.trim();
    let pUrl = document.getElementById('pUrl').value.trim();
    let gender = document.getElementById('genderMale').checked ? "Male" : "Female";
    let comments = document.getElementById('comments').value.trim();
    let consent = document.getElementById('consent').checked;
    let id = Math.floor(100000 + Math.random() * 900000);

    console.log("consent: ", consent);
    if (firstName == "" || firstName == null || !validateString(firstName)) {
      alert("Please enter valid value for first name!");
      return;
    } else if (lastName == "" || lastName == null || !validateString(lastName)) {
      alert("Please enter valid value for last name!");
      return;
    } else if (birthday == "" || birthday == null) {
      alert("Please enter valid value for date of birth!");
      return;
    } else if (email == "" || email == null || !validateEmail(email)) {
      alert("Please enter valid value for email!");
      return;
    } else if (phone == "" || phone == null || !validatePhone(phone)) {
      alert("Please enter valid value for phone!");
      return;
    } else if (pUrl == "" || pUrl == null) {
      alert("Please enter valid value for Personal URL!");
      return;
    } else if (psw == "" || psw == null || !validatePassword(psw)) {
      alert("Please enter valid value for password!");
      return;
    } else if (cpsw != psw) {
      alert("Password and Confirm password does not match!");
      return;
    }
    //   else if(comments == "" || comments == null){
    //     alert("Please enter valid value for comments!");
    //     return;
    //   } 
    else if (!consent) {
      alert("Please provide your consent!");
      return;
    }

    let user = {
      id,
      firstName,
      lastName,
      birthday,
      email,
      phone,
      pUrl,
      psw,
      gender,
      comments,
      consent,
      timestamp: Date.now()
    };

    let transaction = createTransaction('userStore', 'readwrite');
    transaction.oncomplete = (ev) => {
      //console.log(ev);
      clearForm();
      location.href = "login.html"
    };

    let store = transaction.objectStore('userStore');
    let request = store.add(user); //request an insert/add

    request.onsuccess = (ev) => {
      console.log('successfully added an object');
      //move on to the next request in the transaction or
      //commit the transaction

      //location.replace("https://www.w3schools.com")
    };
    request.onerror = (err) => {
      console.log('error in request to add');
    };
  });

  function createTransaction(storeName, mode) {
    let transaction = db.transaction(storeName, mode);
    transaction.onerror = (err) => {
      console.warn(err);
    };
    return transaction;
  }

  document.getElementById('btnClearAll').addEventListener('click', clearForm);

  function clearForm(ev) {
    if (ev) ev.preventDefault();
    document.registrationForm.reset();
  }

  function validateString(string) {
    return nameRegex.test(string);
  }

  function validateEmail(email) {
    return emailRegex.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    return phoneRegex.test(phone);
  }

  function validatePassword(password) {
    return passwordRegex.test(password);
  }

})();