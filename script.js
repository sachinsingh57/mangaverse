const manga = [
{
id:1,
name:"One Piece Vol. 1",
price:499,
category:"Shonen",
image:"images/onepiece.jpg"
},
{
id:2,
name:"Naruto Vol. 1",
price:449,
category:"Shonen",
image:"images/naruto.jpg"
},
{
id:3,
name:"Bleach Vol. 1",
price:479,
category:"Shonen",
image:"images/Bleach vol.1.jpg"
},
{
id:4,
name:"Attack On Titan Vol. 1",
price:599,
category:"Seinen",
image:"images/Attack on titan.jpg"
},
{
id:5,
name:"Tokyo Ghoul",
price:569,
category:"Seinen",
image:"images/Tokyo Ghoul.jpg"
},
{
id:6,
name:"Berserk",
price:799,
category:"Seinen",
image:"images/Berserk.jpg"
},
{
id:7,
name:"Chainsaw Man",
price:549,
category:"Fantasy",
image:"images/Chainsaw Man.jpg"
},
{
id:8,
name:"Jujutsu Kaisen",
price:529,
category:"Fantasy",
image:"images/Jujutsu kaisen.jpg"
}
];

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem(
"cart",
JSON.stringify(cart)
);
}

function updateCartCount(){
document.getElementById(
"cartCount"
).textContent = cart.length;
}

function addToCart(id){

const product =
manga.find(item => item.id === id);

if(!product) return;

cart.push(product);

saveCart();

updateCartCount();

renderCart();

alert(product.name + " added to cart");
}

function removeFromCart(index){

cart.splice(index,1);

saveCart();

updateCartCount();

renderCart();
}

function renderProducts(products){

const container =
document.getElementById("products");

container.innerHTML = "";

products.forEach(product => {

container.innerHTML += `
<div class="card">

<img src="${product.image}">

<div class="card-content">

<h3>${product.name}</h3>

<div class="price">
₹${product.price}
</div>

<button
class="add-btn"
onclick="addToCart(${product.id})"
>
Add To Cart
</button>

</div>

</div>
`;

});
}

function renderNewProducts(){

const container =
document.getElementById("newProducts");

container.innerHTML = "";

const latest =
manga.slice(0,4);

latest.forEach(product => {

container.innerHTML += `
<div class="card">

<img src="${product.image}">

<div class="card-content">

<h3>${product.name}</h3>

<div class="price">
₹${product.price}
</div>

<button
class="add-btn"
onclick="addToCart(${product.id})"
>
Add To Cart
</button>

</div>

</div>
`;

});
}

function renderCart(){

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

cartItems.innerHTML = "";

let total = 0;

if(cart.length === 0){

cartItems.innerHTML =
"<p>Your cart is empty.</p>";

cartTotal.textContent = 0;

return;
}

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `
<div class="cart-item">

<h4>${item.name}</h4>

<div class="cart-item-price">
₹${item.price}
</div>

<button
class="remove-btn"
onclick="removeFromCart(${index})"
>
Remove
</button>

</div>
`;

});

cartTotal.textContent = total;
}

function toggleCart(){

const sidebar =
document.getElementById(
"cartSidebar"
);

sidebar.classList.toggle(
"active"
);
}

function filterCategory(category){

if(category === "All"){
renderProducts(manga);
return;
}

const filtered =
manga.filter(
item => item.category === category
);

renderProducts(filtered);
}

document
.getElementById("search")
.addEventListener(
"input",
function(e){

const value =
e.target.value.toLowerCase();

const filtered =
manga.filter(item =>
item.name
.toLowerCase()
.includes(value)
);

renderProducts(filtered);

}
);

renderProducts(manga);

renderNewProducts();

renderCart();

updateCartCount();