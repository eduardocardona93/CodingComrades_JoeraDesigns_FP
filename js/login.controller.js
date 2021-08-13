    if(localStorage && localStorage.getItem('currentUser')){
        location.href="index.html";
    }


    //REGEX
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var userList = [];

   
    function fetchData(){
        //use getAll to get an array of objects from our store
        let transaction = createTransaction('userStore', 'readonly');
        transaction.oncomplete = (ev) => {
        //transaction for reading all objects is complete
        };
        
        let store = transaction.objectStore('userStore');
        let index = store.index('emailIDX');
        let range = IDBKeyRange.bound('A', 'z', false, false); //case sensitive A-Z a-z
        index.openCursor(range, 'next').onsuccess = (ev) => {
            let cursor = ev.target.result;
            if (cursor) {
              let user = cursor.value;
              userList.push(user);
              cursor.continue(); //call onsuccess
            } else {
              console.log('end of cursor');
              console.log("userlist: ", userList);
            }
        };
    }
    
    function createTransaction(storeName, mode) {
        let transaction = db.transaction(storeName, mode);
        transaction.onerror = (err) => {
            console.warn(err);
        };
        return transaction;
    }

    var btnLogin = document.getElementById('btnLogin');
    if(btnLogin != null){
        document.getElementById('btnLogin').addEventListener('click', (ev) => {
            ev.preventDefault();
            var userExist = false;
            var password = "";
            let loginEmail = document.getElementById('uname').value.trim();
            let loginPassword = document.getElementById('psw').value.trim();
    
            if(loginEmail == "" || loginEmail == null || !validateEmail(loginEmail)){
                alert("Please enter valid username!");
                return;
            }
    
            for(var i=0; i<userList.length; i++){
                if(userList[i].email == loginEmail){
                    userExist = true;
                    currentUser = userList[i];
                    console.log("current user login success: ",  currentUser);
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    password = userList[i].psw;
                    break;
                }
            }
    
            if(!userExist){
                alert("User does not exist!");
                return;
            } else {
                if(password != loginPassword){
                    alert("Please enter correct password!");
                    return;
                } else {
                    location.href="index.html";
                }
            }
    
        });
    }

    function validateEmail(email) {
        return emailRegex.test(String(email).toLowerCase());
    }
