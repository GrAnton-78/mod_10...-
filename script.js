document.addEventListener("DOMContentLoaded", getAllFunc)
function getAllFunc() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('productList');
      products.forEach(product => {
        const listItem = document.createElement('div');
        productList.appendChild(listItem);

        const imageItem = document.createElement('img') // изображение товара
        imageItem.src = product.image;
        listItem.appendChild(imageItem)

        const deleteItem = document.createElement('button') // кнопка delete в карточке
        deleteItem.innerHTML = "&#x2715;"
        deleteItem.className = "btn"
        listItem.appendChild(deleteItem)


        const deleteBtns = document.querySelectorAll(".btn");

        
        deleteBtns.forEach(btn => {
          btn.addEventListener('click', deleteFunction);
        });
     

      });
    })
    .catch(error => console.error('Произошла ошибка при получении товаров:', error));
};
//Функция удаления, должно отображаться в консоли
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


  let data = []; // Инициализация массива для хранения данных о товарах
const itemsPerPage = 6; // Количество товаров, отображаемых на одной странице
let currentPage = 1; // Переменная для отслеживания текущей страницы

// Асинхронная функция для получения всех товаров
async function getAllFunc() {
  // Запрос к API для получения списка товаров
  const res = await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json()) // Преобразование ответа в формат JSON
    .catch((error) => // Обработка ошибок, если запрос не удался
      console.error("Произошла ошибка при получении товаров:", error)
    );
  
  data = res; // Сохранение полученных данных в переменной data
  renderPage(currentPage); // Вызов функции для отображения товаров на текущей странице
}

// Функция для рендеринга товаров на указанной странице
function renderPage(page) {
  const productList = document.getElementById("productList"); // Получение элемента для отображения списка товаров
  productList.innerHTML = ""; // Очистка содержимого элемента перед рендерингом новых товаров

  // Вычисление начального и конечного индексов для текущей страницы
  const startIndex = (page - 1) * itemsPerPage; // Начальный индекс
  const endIndex = Math.min(startIndex + itemsPerPage, data.length); // Конечный индекс (не превышая длину данных)

  // Получение массива товаров для текущей страницы
  const productsToDisplay = data.slice(startIndex, endIndex);
  
  // Перебор каждого товара и создание элементов для отображения
  productsToDisplay.forEach((product) => {
   const listItem = document.createElement("div"); // Создание нового элемента div для товара
   
   
   const deleteItem = document.createElement('button') // кнопка delete в карточке
   deleteItem.innerHTML = "&#x2715;"
   deleteItem.className = "btn"
   listItem.appendChild(deleteItem)

   const deleteBtns = document.querySelectorAll(".btn");

        
     const imageItem = document.createElement('img') // изображение товара
        imageItem.src = product.image;
        listItem.appendChild(imageItem)
    const titleItem = document.createElement('h2') // название товара в карточке
        titleItem.innerHTML = product.title
        listItem.appendChild(titleItem)
    productList.appendChild(listItem); // Добавление элемента в список товаров
     const descItem = document.createElement('p') //описание товара в карточке
        descItem.innerHTML = product.description
        listItem.appendChild(descItem)

        const priceItem = document.createElement('h3') // цена товара в карточке
        priceItem.innerHTML = `${product.price} $`
        listItem.appendChild(priceItem)
    
        
  });

  renderPagination(); // Вызов функции для рендеринга пагинации
}

// Функция для рендеринга кнопок пагинации
function renderPagination() {
  const paginationContainer = document.getElementById("pagination"); // Получение элемента для отображения кнопок пагинации
  paginationContainer.innerHTML = ""; // Очистка содержимого контейнера перед рендерингом новых кнопок

  const totalPages = Math.ceil(data.length / itemsPerPage); // Вычисление общего количества страниц

  // Создание кнопок для каждой страницы
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button"); // Создание новой кнопки
    pageButton.textContent = i; // Установка текста кнопки равным номеру страницы
    pageButton.onclick = () => { // Обработка события клика на кнопку
      currentPage = i; // Установка текущей страницы на номер кнопки
      renderPage(currentPage); // Вызов функции для рендеринга товаров на новой текущей странице
    };
    paginationContainer.appendChild(pageButton); // Добавление кнопки в контейнер пагинации

  }
}

// Вызов функции для получения данных при загрузке страницы
getAllFunc(); 