const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));
};

const loadTreeDetails=(id)=>{
  
  const url=`https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>disCategoryTree(data.plants))
};

const disCategoryTree=(trees)=>{
    const treeContainer=document.getElementById("cards");
    treeContainer.innerHTML="";

    trees.forEach(tree=>{
        console.log(tree);
        const card = document.createElement("div");
        card.innerHTML=`
        <div class="shadow p-3 bg-white rounded-lg">
        <img src="${tree.image}" alt="${tree.name}" class="w-full object-cover rounded-lg h-[300px]">
        <h3 onclick="loadTreeDetail(${tree.id})" class="font-semibold mt-2">${tree.name}</h3>
        <p class="text-sm text-gray-500">${tree.description}</p>
        <div class="flex justify-between items-center">
          <button class="text-[#15803D] bg-[#DCFCE7] rounded-full p-1">${tree.category}</button>
          <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</p>
        </div>
        <button class="mt-2 w-full bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 add-to-cart">
          Add to Cart
        </button>
      </div>
        `;
        treeContainer.append(card);
    })
};



const displayCategories = (categories) => {
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";

    for (let category of categories) {
        const btnUl = document.createElement("ul");
        btnUl.innerHTML = `<li onclick="loadTreeDetails('${category.id}')" class="p-2 rounded cursor-pointer hover:bg-green-500">${category.category_name}</li>`;
        categoryList.append(btnUl);
    }
};

const loadAllTrees = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => displayTrees(data.plants));
};


const loadTreeDetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`
    
    const res=await fetch(url);
    const details= await res.json();
    displayTreeDetails(details.plants);
}
const displayTreeDetails=(tree)=>{
     console.log(tree);
     const detailsBox=document.getElementById("details-container");
     detailsBox.innerHTML = `
     <div class="shadow p-3 bg-white rounded-lg">
        <img src="${tree.image}" alt="${tree.name}" class="w-full object-cover rounded-lg h-[300px]">
        <h3 onclick="loadTreeDetail(${tree.id})" class="font-semibold mt-2">${tree.name}</h3>
        <p class="text-sm text-gray-500">${tree.description}</p>
        <div class="flex justify-between items-center">
          <button class="text-[#15803D] bg-[#DCFCE7] rounded-full p-1">${tree.category}</button>
          <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</p>
        </div>
        <button class="mt-2 w-full bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 add-to-cart">
          Add to Cart
        </button>
      </div>
     
     
     `;
     document.getElementById("tree_modal").showModal();
}

const displayTrees = (trees) => {
    const cardContainer = document.getElementById("cards");
    cardContainer.innerHTML = "";

    trees.forEach(tree => {
        const div = document.createElement("div");
        div.className = "shadow p-3 bg-white rounded-lg space-y-2";

        div.innerHTML = `
        <img src="${tree.image}" alt="${tree.name}" class="w-full object-cover rounded-lg h-[300px]">
        <h3 onclick="loadTreeDetail(${tree.id})" class="font-semibold mt-2 cursor-pointer">${tree.name}</h3>
        <p class="text-sm text-gray-500">${tree.description}</p>
        <div class="flex justify-between items-center">
          <button class="text-[#15803D] bg-[#DCFCE7] rounded-full p-1">${tree.category}</button>
          <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</p>
        </div>
        <button class="mt-2 w-full bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 add-to-cart">
          Add to Cart
        </button>
        `;
        cardContainer.appendChild(div);


// Add to Cart functionality
const addToCartBtn = div.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", () => addToCart(tree));
    });
};


let cart = [];
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");


const addToCart = (tree) => {
    const existingTree = cart.find(item => item.id === tree.id);
    if (existingTree) {
        existingTree.quantity += 1;
    } else {
        tree.quantity = 1;
        cart.push(tree);
    }
    renderCart();
};


const removeFromCart = (index) => {
    cart.splice(index, 1);
    renderCart();
};


const renderCart = () => {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((tree, index) => {
        total += tree.price * tree.quantity;

        const li = document.createElement("li");
        li.className = "flex justify-between items-center p-2 bg-green-100 rounded mb-2";

        li.innerHTML = `
            <span>${tree.name}</span>
            <div class="flex items-center space-x-2">
                <span class="font-bold">
                    <i class="fa-solid fa-bangladeshi-taka-sign"></i>
                    ${tree.price} * ${tree.quantity} = ${tree.price * tree.quantity}
                </span>
                <span class="cursor-pointer text-red-500 font-bold">❌</span>
            </div>
        `;

        
        li.querySelector("span:last-child").addEventListener("click", () => removeFromCart(index));

        cartItems.appendChild(li);
    });

    totalPriceEl.innerHTML = `<i class="fa-solid fa-bangladeshi-taka-sign"></i>${total}`;
};





loadAllTrees();
loadCategories();
