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

//* CRUD Section

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("textarea");
const createPostButton = document.getElementById("submit");
const postsList = document.querySelector(".posts");

//* Function to fitch the posts
function fetchPosts() {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((posts) => {
      postsList.innerHTML = "";
      posts.map((post) => {
        const postBox = document.createElement("div");
        postBox.classList.add("card");
        postBox.innerHTML = `
                <div class="text-box">
                   <p id="title">${post.title}</p>
                   <p id="content">${post.content}</p>
                </div>
                <div class="buttons">
                <button class="update" id="${post.id}" onclick="updatePost(this)">Update</button>
                <button class="delete" id="${post.id}" onclick="deletePost(this)">Delete</button>
               </div>
        `;
        postsList.appendChild(postBox);
      });
    });
}

//* Event Listiner to add a new post
createPostButton.addEventListener("click", () => {
  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleInput.value,
      content: contentInput.value,
    }),
  })
    .then(() => {
      titleInput = "";
      contentInput = "";
      fetchPosts();
    })
    .catch((error) => console.log("Error: ", error));
});

//* Function To Delete A Post
function deletePost(button) {
  const postId = button.getAttribute("id");
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
  })
    .then(() => {
      fetchPosts();
    })
    .catch((error) => console.log("Error: ", error));
}

//* Function To Update A Post
function updatePost(button) {
  const postId = button.getAttribute("id");
  const updatedTitle = prompt("Update The Title:", "");
  const updatedContent = prompt("Update The Content:", "");

  if (updatedTitle !== null || updatedContent !== null) {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTitle,
        content: updatedContent,
      }),
    })
      .then(() => {
        fetchPosts();
      })
      .catch((error) => console.log("Error: ", error));
  }
}
fetchPosts();
