const forgotController -(function init(){

    let db = null;
    let objectStore = null;
    let DBOpenReq = indexedDB.open('JoeraDB', 3);
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
        let getReq = store.getAll(); //key or keyrange optional
    
        getReq.onsuccess = (ev) => {
           //getAll was successful
           let request = ev.target; //request === getReq === ev.target
           userList = request.result;
           console.log("userList: ", userList);
        };
         getReq.onerror = (err) => {
           console.warn(err);
        };
    }
    
    function createTransaction(storeName, mode) {
        let transaction = db.transaction(storeName, mode);
        transaction.onerror = (err) => {
            console.warn(err);
        };
        return transaction;
    }


    document.getElementById('btnForgotPassword').addEventListener('click',(ev) =>{
        ev.preventDefault();

    });

})();