// // get the form
// const registerForm  = document.getElementById("registerForm");
// // set the onsubmit function callback
// registerForm.onsubmit = function(e) {
//     //prevent reload
//     e.preventDefault();
//     e.stopPropagation();
//     // get the firstName input value
//     const firstNameInput = document.getElementById("firstName").value;
//     //print
//     alert(firstNameInput)
// };

const IDB = (function init() {

    let db = null;
    let objectStore = null;
    let DBOpenReq = indexedDB.open('JoeraDB', 2);
  
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
      //objectStore.createIndex('nameIDX', 'name', { unique: false });
    });
  
    document.getElementById('btnSignUp').addEventListener('click', (ev) => {
      ev.preventDefault();
      //one of the form buttons was clicked
  
      console.log("Sign up clicked");
      let firstName = document.getElementById('firstName').value.trim();
      let lastName = document.getElementById('lastName').value.trim();
      let yearOfBirth = document.getElementById('yearOfBirth').value.trim();
      let email = document.getElementById('email').value.trim();
      let phone = document.getElementById('phone').value.trim();
      let psw = document.getElementById('psw').value.trim();
      let gender = document.getElementById('genderMale').checked ? "Male" : "Female";
      let comments = document.getElementById('comments').value.trim();
      let consent = document.getElementById('consent').value;
      let id = Math.floor(100000 + Math.random() * 900000);

      let user = {
       id,
       firstName,
       lastName,
       yearOfBirth,
       email,
       phone,
       psw,
       gender,
       comments,
       consent
      };
  
      let transaction = createTransaction('userStore', 'readwrite');
      transaction.oncomplete = (ev) => {
        //console.log(ev);
        clearForm();
      };
  
      let store = transaction.objectStore('userStore');
      let request = store.add(user); //request an insert/add
  
      request.onsuccess = (ev) => {
        console.log('successfully added an object');
        //move on to the next request in the transaction or
        //commit the transaction
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

  })();