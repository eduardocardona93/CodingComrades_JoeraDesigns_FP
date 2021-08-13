let collectionList = document.getElementById('collectionList');

JSON.parse(localStorage.getItem('listProducts')).forEach(element => {
    console.log(element)
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
    heading.innerHTML="<b>" + element.prodId + "</b>";

    const price = document.createElement('p');
    price.innerHTML= element.price;

    captionContainer.appendChild(heading);
    captionContainer.appendChild(price);

    cardItem.appendChild(imgItem);
    cardItem.appendChild(captionContainer);

    listItem.appendChild(cardItem);
    
    collectionList.appendChild(listItem)
});

function fetchData(){};