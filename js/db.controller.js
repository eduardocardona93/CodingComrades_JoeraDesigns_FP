let db = null;
let objectStore = null;
let DBOpenReq = indexedDB.open('JoeraDB', 5);

DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });

  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success opening DB');

    insertProducts();
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

    if (db.objectStoreNames.contains('messageStore')) {
      db.deleteObjectStore('messageStore');
    }

    //create the ObjectStore
    objectStore = db.createObjectStore('messageStore', {
      keyPath: 'mid',
    });

    if (db.objectStoreNames.contains('products')) {
      db.deleteObjectStore('products');
    }

    //create the ObjectStore
    objectStore = db.createObjectStore('products', {
      keyPath: 'prodId',
    });
  });

  function createTransaction(storeName, mode) {
    let transaction = db.transaction(storeName, mode);
    transaction.onerror = (err) => {
      console.warn(err);
    };
    return transaction;
  }

  function insertProducts(){
      if(!localStorage.getItem('allProducts')){
        const listProducts = [
          {
            "name" :"Dress",
            "price" : "$20.00",
            "prodId": "001",
            "description" : "Fabric cotton Rayon"
          },
          {
            "name" :"Long Tunic Dress",
            "price" : "$30.00",
            "prodId": "002",
            "description" : " Material: Cotton"
          },
          {
            "name" :"Vintage Party Wear Mesh Skirt",
            "price" : "$35.00",
            "prodId": "003",
            "description" : "Free size fits till 38'' bust"
          },
          {
            "name" :"Imported top",
            "price" : "$40.00",
            "prodId": "004",
            "description" : ""
          }
        ]
        localStorage.setItem('listProducts',JSON.stringify(listProducts));
      }
  }