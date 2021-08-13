let collectionList = document.getElementById('collectionList');
const currentWishList = JSON.parse(localStorage.getItem('currentUser'))['wishList'];

document.getElementById('searchButton').addEventListener('click', (ev) => {
    const searchInput  = document.getElementById('searchBar');
    if(searchInput.value && searchInput.value != ""){
        fetchData(searchInput.value.toLowerCase());
    }
});
function fetchData(filterText){
    collectionList.innerHTML="";
    let allproducts = JSON.parse(localStorage.getItem('listProducts'));
    if(filterText && filterText != ""){
        allproducts = allproducts.filter(product => {
            return  product.name.toLowerCase().indexOf(filterText) > -1 ||
                    product.prodId.toLowerCase().indexOf(filterText) > -1;

        });
    }

    allproducts.forEach(element => {
        
        const listItem = document.createElement('li');
        listItem.className="colItem";
    
        const cardItem = document.createElement('div');
        cardItem.className="card";
    
        const imgItem = document.createElement('img');
        imgItem.style.width="100%";
        imgItem.src="../src/products/prod-" +element.prodId+"-1.jpg";
    
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
        
        const addWishList = document.createElement('button');
        addWishList.setAttribute('data-prod-id', element.prodId);
        
        addWishList.innerHTML = "Add to Wishlist";
        addWishList.onclick = function(ev){
            this.getAttribute('data-prod-id');
        }

        if(currentWishList.indexOf(element.prodId) > -1){
            addWishList.setAttribute('disabled','disabled');
        }

        cardItem.appendChild(addWishList);
        listItem.appendChild(cardItem);
        
        collectionList.appendChild(listItem)
    
        
    });
}