if (!localStorage || !localStorage.getItem('currentUser')) {
    location.href = "index.html";
}


let collectionList = document.getElementById('collectionList');
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
let currentWishList = currentUser['wishList'];

document.getElementById('searchButton').addEventListener('click', (ev) => {
    const searchInput = document.getElementById('searchBar');
    if (searchInput.value && searchInput.value != "") {
        fetchData(searchInput.value.toLowerCase());
    } else {
        fetchData();
    }
});

function fetchData(filterText) {
    collectionList.innerHTML = "";
    let allproducts = JSON.parse(localStorage.getItem('listProducts'));
    if (filterText && filterText != "") {
        allproducts = allproducts.filter(product => {
            return product.name.toLowerCase().indexOf(filterText) > -1 ||
                product.prodId.toLowerCase().indexOf(filterText) > -1;
        });
    }

    allproducts.forEach(element => {

        const listItem = document.createElement('li');
        listItem.className = "colItem";

        const cardItem = document.createElement('div');
        cardItem.className = "card";

        const imgItem = document.createElement('img');
        imgItem.style.width = "100%";
        imgItem.src = "../src/products/prod-" + element.prodId + "-1.jpg";

        const captionContainer = document.createElement('div');
        captionContainer.className = "captionContainer";

        const heading = document.createElement('h4');
        heading.innerHTML = "<b>" + element.name + "</b>";

        const price = document.createElement('p');
        price.innerHTML = element.price;

        captionContainer.appendChild(heading);
        captionContainer.appendChild(price);

        cardItem.appendChild(imgItem);
        cardItem.appendChild(captionContainer);

        if (!localStorage || !localStorage.getItem('currentUser')) {
            const wishListToggleBtn = document.createElement('button');
            wishListToggleBtn.setAttribute('data-prod-id', element.prodId);
            const currentPositionInWishList = currentWishList.indexOf(element.prodId);

            if (currentPositionInWishList > -1) {
                wishListToggleBtn.innerHTML = "Remove from Wishlist";
                wishListToggleBtn.onclick = function (ev) {
                    wishListToggleBtn.innerHTML = "Add to Wishlist";
                    currentWishList.splice(currentPositionInWishList, 1);
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
            } else {
                wishListToggleBtn.innerHTML = "Add to Wishlist";
                wishListToggleBtn.onclick = function (ev) {
                    wishListToggleBtn.innerHTML = "Remove from Wishlist";
                    currentWishList.push(this.getAttribute('data-prod-id'));
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
            }
            cardItem.appendChild(wishListToggleBtn);
        }
        listItem.appendChild(cardItem);

        collectionList.appendChild(listItem)


    });
}