
let collectionList = document.getElementById('collectionList');
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.getElementById('searchWishListButton').addEventListener('click', (ev) => {
    const searchInput  = document.getElementById('searchWishListInput');
    if(searchInput.value && searchInput.value != ""){
        fetchData(searchInput.value.toLowerCase());
    }else{
        fetchData();
    }
});
function fetchData(filterText){
    collectionList.innerHTML="";
    let currentWishList = currentUser['wishList'];
    let completeWishList = JSON.parse(localStorage.getItem('listProducts')).filter(element => {
        return currentWishList.indexOf(element.prodId) > -1;
    })
    if(filterText && filterText != "") {
        completeWishList = completeWishList.filter(product => {
            return  product.name.toLowerCase().indexOf(filterText) > -1 ||
                    product.prodId.toLowerCase().indexOf(filterText) > -1;
        });
    }

    completeWishList.forEach(element => {
        
        const listItem = document.createElement('li');
        listItem.className="colItem";
    
        const cardItem = document.createElement('div');
        cardItem.className="card";
    
        const imgItem = document.createElement('img');
        imgItem.style.width="100%";
        imgItem.className = "collectionImg";
        imgItem.src="../src/prod-" +element.prodId+"-1.jpg";
    
        const captionContainer = document.createElement('div');
        captionContainer.className="captionContainer";
    
        const heading = document.createElement('h4');
        heading.innerHTML="<b>" + element.name + "</b>";
    
        const price = document.createElement('p');
        price.innerHTML= element.price;
    
        captionContainer.appendChild(heading);
        captionContainer.appendChild(price);
    
        cardItem.appendChild(imgItem);
        cardItem.appendChild(captionContainer);
        
        const wishListToggleBtn = document.createElement('button');
        wishListToggleBtn.setAttribute('data-prod-id', element.prodId);
        const currentPositionInWishList = currentWishList.indexOf(element.prodId);
                      
        wishListToggleBtn.innerHTML = "Remove from Wishlist";
        wishListToggleBtn.className = "removeWLbtn";
        wishListToggleBtn.onclick = function(ev){
            currentWishList.splice(currentPositionInWishList,1);
            currentUser.wishList = currentWishList;
            let transaction = createTransaction('userStore', 'readwrite');
            transaction.oncomplete = (ev) => {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            };
            console.log(currentUser.wishList)
            let store = transaction.objectStore('userStore');
            store.put(currentUser); //request an insert/add
            fetchData(filterText)
        }

        cardItem.appendChild(wishListToggleBtn);
        
        listItem.appendChild(cardItem);
        
        collectionList.appendChild(listItem)
    
        
    });
}