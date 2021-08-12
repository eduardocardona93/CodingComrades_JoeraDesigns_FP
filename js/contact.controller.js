const contactController = (function init(){

  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('JoeraDB', 4);

  //REGEX
  let nameRegex = /^[a-zA-Z ]+$/;
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let phoneRegex = /^[0-9]{10}$/;

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

    console.log('upgrade db contact page', db);
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log('Database updated from version', oldVersion, 'to version', newVersion);

    if (db.objectStoreNames.contains('messageStore')) {
      db.deleteObjectStore('messageStore');
    }

    //create the ObjectStore
    objectStore = db.createObjectStore('messageStore', {
      keyPath: 'mid',
    });

  });

  document.getElementById('btnSubmit').addEventListener('click', (ev) => {
    ev.preventDefault();
    //one of the form buttons was clicked

    console.log("Submit clicked");
    let firstName = document.getElementById('fname').value.trim();
    let lastName = document.getElementById('lname').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let preferredMethod = document.getElementById('method').value.trim();
    let subject = document.getElementById('subject').value.trim();
    let mid = "MSG"+ Math.floor(100000 + Math.random() * 900000);

    if (firstName == "" || firstName == null || !validateString(firstName)) {
      alert("Please enter valid value for first name!");
      return;
    } else if (lastName == "" || lastName == null || !validateString(lastName)) {
      alert("Please enter valid value for last name!");
      return;
    } else if (email == "" || email == null || !validateEmail(email)) {
      alert("Please enter valid value for email!");
      return;
    } else if (phone == "" || phone == null || !validatePhone(phone)) {
      alert("Please enter valid value for phone!");
      return;
    } else if (subject == "" || subject == null) {
      alert("Please enter valid value for subject!");
      return;
    }

    console.log();

    let message = {
      mid,
      firstName,
      lastName,
      email,
      phone,
      preferredMethod,
      subject,
      timestamp: Date.now()
    };

    let transaction = createTransaction('messageStore', 'readwrite');
    transaction.oncomplete = (ev) => {
      console.log('transaction completed successfully for contact form submit');
      location.href="thankYou.html"
    };

    let store = transaction.objectStore('messageStore');
    let request = store.add(message); //request an insert/add

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

  function validateString(string) {
    return nameRegex.test(string);
  }

  function validateEmail(email) {
    return emailRegex.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    return phoneRegex.test(phone);
  }

})();