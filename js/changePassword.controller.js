if(!localStorage || !localStorage.getItem('currentUser')){
    location.href="index.html";
  }
  
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  var currentUser = {};
  function fetchData (){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }


document.getElementById('btnUpdatePassword').addEventListener('click', (ev) => {
    ev.preventDefault();
    
    let cPassword = document.getElementById('cPassword').value.trim();
    let nPassword = document.getElementById('nPassword').value.trim();
    let conPassword = document.getElementById('conPassword').value.trim();

    if (cPassword == "" || cPassword == null || cPassword != currentUser.psw) {
      alert("Please enter correct current password!");
      return;
    } else if (nPassword == "" || nPassword == null || !validatePassword(nPassword)) {
      alert("Please enter valid value for password!");
      return;
    } else if (conPassword != nPassword) {
      alert("Password does not match!");
      return;
    } 

    currentUser.psw = nPassword;

    let transaction = createTransaction('userStore', 'readwrite');
    transaction.oncomplete = (ev) => {
      //console.log(ev);
      alert("Password changed succesfully!");
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      location.href = "index.html"
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

  function validatePassword(password) {
    return passwordRegex.test(password);
  }