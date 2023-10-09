//* Products section

//* constructor function
function Card(title, price, image) {
  this.title = title;
  this.price = price;
  this.image = image;

  this.createCardElement = function () {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
              <div class="img-box">
                  <img src="${this.image}" alt="An image of the product" class="card-img" />
              </div>
               <div class="text-box">
                  <p><span class="title">Product:</span> ${this.title}</p>
                  <p><span class="title">Price:</span> ${this.price}$</p>
              </div>
          `;

    return card;
  };
}

//* Function to create card elements
function createCardElement(item) {
  const card = new Card(item.title, item.price, item.image);
  const cardElement = card.createCardElement();
  return cardElement;
}

//* Fetch the API data
fetch("https://fakestoreapi.com/products?limit=20")
  .then((res) => res.json())
  .then((json) => {
    cardInfoArray = json;

    //* Use map() to create an array of card elements
    const cardElements = cardInfoArray.map((item) => createCardElement(item));

    //* Get the cards container
    const cardsContainer = document.getElementById("display");

    //* Append the card elements to the container
    cardElements.forEach((cardElement) => {
      cardsContainer.appendChild(cardElement);
    });
  });
