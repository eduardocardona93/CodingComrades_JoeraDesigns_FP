const loginController = (function init() {
   
    let db = null;
    let objectStore = null;
    let DBOpenReq = indexedDB.open('JoeraDB', 4);

    //REGEX
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var userList = [];
    var currentUser = {};

    DBOpenReq.addEventListener('error', (err) => {
        //Error occurred while trying to open DB
        console.warn(err);
    });
    
    DBOpenReq.addEventListener('success', (ev) => {
        //DB has been opened... after upgradeneeded
        db = ev.target.result;
        console.log('success opening DB');

        fetchUserStore();
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

   
    function fetchUserStore(){
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
              console.log(
                cursor.source.objectStore.name,
                cursor.source.name,
                cursor.direction,
                cursor.key,
                cursor.primaryKey
              );
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
    
            console.log("Login clicked");
            console.log("userlist: ", userList);
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


})();