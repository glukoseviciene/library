let products = {
  data: [
    {
      productName: "Psychology of Money",
      category: "Fantasy",
      price: "30",
      image: "morgan-housel.jpg",
    },
    {
      productName: "The two towers part 2",
      category: "Mystery",
      price: "50",
      image: "madalyn.jpg",
    },
    {
      productName: "The two towers",
      category: "Thriller",
      price: "50",
      image: "madalyn.jpg",
    },
    {
      productName: "How innovation works",
      category: "Romance",
      price: "540",
      image: "matt.jpg",
    },
    {
      productName: "Red book",
      category: "Fantasy",
      price: "20",
      image: "mel.jpg",
    },
    {
      productName: "Alex Rider",
      category: "Mystery",
      price: "620",
      image: "sincerely-media.jpg",
    },
    {
      productName: "Good or...",
      category: "Thriller",
      price: "80",
      image: "sincerely.jpg",
    },
    {
      productName: "Soul",
      category: "Romance",
      price: "80",
      image: "thought-catalog.jpg",
    },
    {
      productName: "Notebook",
      category: "Fantasy",
      price: "380",
      image: "thought.jpg",
    },
  ],
};

//Display button
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// Get form element
const form = document.querySelector("form");

// Retrieve saved products from Local Storage
let savedProducts = JSON.parse(localStorage.getItem("products")) || [];

// Display saved products on page load
savedProducts.forEach((product) => {
  createProductCard(product);
});

// Add event listener to form submit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting

  // Get form input values
  const productName = document.getElementById("product-name").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  // Create new product object
  const newProduct = {
    productName: productName,
    category: category,
    price: price,
    image: image,
  };

  // Add new product object to saved products array
  savedProducts.push(newProduct);

  // Save updated products array to Local Storage
  localStorage.setItem("products", JSON.stringify(savedProducts));

  // Create new product card
  createProductCard(newProduct);

  // Clear form input values
  form.reset();
});

function createProductCard(product) {
  // Create new card element
  const card = document.createElement("div");
  card.classList.add("card", product.category.toLowerCase(), "hide");

  // Create image container element
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  // Create image element
  const imageEl = document.createElement("img");
  imageEl.setAttribute("src", product.image);
  imgContainer.appendChild(imageEl);
  card.appendChild(imgContainer);

  // Create container element
  const container = document.createElement("div");
  container.classList.add("container");

  // Create product name element
  const nameEl = document.createElement("h5");
  nameEl.classList.add("product-name");
  nameEl.innerText = product.productName.toUpperCase();
  container.appendChild(nameEl);

  // Create price element
  const priceEl = document.createElement("h6");
  priceEl.innerText = "£" + product.price;
  container.appendChild(priceEl);

  // Create delete button element
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete";

  // Add event listener to delete button
  deleteBtn.addEventListener("click", function () {
    deleteProduct(product);
    card.remove(); // Remove card from the DOM when deleted
  });

  container.appendChild(deleteBtn);

  card.appendChild(container);

  // Append card to products container
  document.getElementById("products").appendChild(card);

  // Function to delete a product
  function deleteProduct(product) {
    // Find the index of the product in the savedProducts array
    const index = savedProducts.indexOf(product);

    // Remove the product from the savedProducts array
    savedProducts.splice(index, 1);

    // Save the updated savedProducts array to Local Storage
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
}

for (let i of products.data) {
  //Create Card

  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category.toLocaleLowerCase(), "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  //price
  let price = document.createElement("h6");
  price.innerText = "£" + i.price;
  container.appendChild(price);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}

//paramete passed from button (parameter same as category)
function filterProduct(value) {
  //button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");

  //loop through all cards
  elements.forEach((element) => {
    //display all cards on "all" button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //check if card contains category class
      if (element.classList.contains(value.toLowerCase())) {
        //display card based on category
        element.classList.remove("hide");
      } else {
        //hide other cards
        element.classList.add("hide");
      }
    }
  });
}

// Search button click
document.getElementById("search").addEventListener("click", () => {
  // Initializations
  let searchInput = document.getElementById("search-input").value;
  let productNames = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  // Loop through all product names
  productNames.forEach((productName, index) => {
    // Check if product name includes the search value
    if (
      productName.innerText.toUpperCase().includes(searchInput.toUpperCase())
    ) {
      // Display matching card
      cards[index].classList.remove("hide");
    } else {
      // Hide other cards
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("all");
};
