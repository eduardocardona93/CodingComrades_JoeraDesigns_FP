let db = null;
let objectStore = null;
let DBOpenReq = indexedDB.open('JoeraDB', 4);


DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });

  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success opening DB');

    fetchData();
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

  function createTransaction(storeName, mode) {
    let transaction = db.transaction(storeName, mode);
    transaction.onerror = (err) => {
      console.warn(err);
    };
    return transaction;
  }