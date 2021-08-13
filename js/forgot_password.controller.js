
    if(localStorage && localStorage.getItem('currentUser')){
        location.href="index.html";
    }

    let user = {};
    let password = "";
    let userList = [];
    function fetchData(){
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

    document.getElementById('btnForgotPassword').addEventListener('click',(ev) =>{
        ev.preventDefault();
        console.log('forgot clicked')

        let userExist = false;
        let password = "";
        let loginEmail = document.getElementById('email').value.trim();
      
        if(loginEmail == "" || loginEmail == null ){
            alert("Please enter valid username!");
            return;
        }

        for(var i=0; i<userList.length; i++){
            if(userList[i].email == loginEmail){
                userExist = true;
                user = userList[i];
                break;
            }
        }

        if(!userExist){
            alert("User does not exist!");
            return;
        } else {

            let transaction = createTransaction('userStore', 'readwrite');
            transaction.oncomplete = (ev) => {
            //transaction for reading all objects is complete
            };
            
            user.psw = generateP();

            let store = transaction.objectStore('userStore');
            let getReq = store.put(user); //key or keyrange optional
        
            getReq.onsuccess = (ev) => {
               console.log("password updated user: ", user);
            };
             getReq.onerror = (err) => {
               console.warn(err);
            };

           document.getElementById('randomPassword').innerHTML="Your new Password is - "+ user.psw;
           document.forgotForm.reset();
        }

    });

    function generateP() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        
        for (i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                        * str.length + 1);
              
            pass += str.charAt(char)
        }
         
        return pass;
    }
