document.addEventListener("DOMContentLoaded", getAllFunc)
function getAllFunc() {
  fetch('https://fakestoreapi.com/products?sort=desc')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('productList');
      products.forEach(product => {
        const listItem = document.createElement('div');
        productList.appendChild(listItem);

        const imageItem = document.createElement('img')
        imageItem.src = product.image;
        listItem.appendChild(imageItem)

        const deleteItem = document.createElement('button')
        deleteItem.innerHTML = "&#x2715;"
        deleteItem.className = "btn"
        listItem.appendChild(deleteItem)


        const deleteBtns = document.querySelectorAll(".btn");

        deleteBtns.forEach(btn => {
          btn.addEventListener('click', deleteFunction);
        });


        const titleItem = document.createElement('h2')
        titleItem.innerHTML = product.title
        listItem.appendChild(titleItem)

        const descItem = document.createElement('p')
        descItem.innerHTML = product.description
        listItem.appendChild(descItem)

        const priceItem = document.createElement('h3')
        priceItem.innerHTML = `${product.price} $`
        listItem.appendChild(priceItem)

      });
    })
    .catch(error => console.error('Произошла ошибка при получении товаров:', error));
};

function deleteFunction() {
  fetch('https://fakestoreapi.com/products/6', {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(json => console.log(json))
}

const addBtn = document.querySelector('#addBtn')

addBtn.addEventListener('click', addBtnFunc)

function addBtnFunc() {
  fetch('https://fakestoreapi.com/products', {
    method: "POST",
    body: JSON.stringify(
      {
        title: document.querySelector('#title').value,
        price: parseFloat(document.querySelector('#price').value),
        description: document.querySelector('#description').value,
        category: document.querySelector('#category').value
      }
    )
  })
    .then(res => res.json())
    .then(json => console.log(json))
}

// const ok = document.querySelector("#ok")
// ok.addEventListener('click', oki)
// function oki() {
//   alert("Умница, теперь приступай! У тебя все получится")
// }


const navBtn = document.querySelector('.nav-button');
const mobileNav = document.querySelector('.mobile-nav');
const body = document.body;

navBtn.addEventListener('click', function(event){
    event.stopPropagation();
    mobileNav.classList.toggle('mobile-nav-active');
    navBtn.classList.toggle('nav-button-close');
    body.classList.toggle('no-scroll');
})

window.addEventListener('click', function(event){
    if(body.classList.contains('no-scroll')){
        body.classList.toggle('no-scroll');
        navBtn.classList.toggle('nav-button-close');
        mobileNav.classList.toggle('mobile-nav-active');
    }
})

mobileNav.addEventListener('click',function(event){
    event.stopPropagation();
})