//ara yüz işlemleri bu sayfada olacak

const categoryList = document.querySelector(`.categories`);
const productList = document.querySelector(`.products`);
const basketList = document.querySelector(`.list`);



export function renderCategories(categories) {
    /*kategoriler dizisindeki her bir obje için ekrana kartları basma*/
    categories.slice(0, 5).forEach((category) => {

        //Div oluşturma
        const categoryDiv = document.createElement("div");
        //Dive class ekleme
        categoryDiv.classList.add("category");
        //divin içeriğini belirleme
        categoryDiv.innerHTML = `
        <img src= ${category.image} alt="">
        <span>${category.name}</span>
        `;
        //elemanı html deki categories divine ekleme
        categoryList.appendChild(categoryDiv);
    });
}

export function renderProducts(products) {
    products
        .slice(0, 40)
        //dizideki her bir obje için çalışır
        .forEach((product) => {
            //div oluşturma
            const productCard = document.createElement("div");
            //gerekli class atamsını yapma
            productCard.className = "product";
            //kartın içeriğini belirleme
            productCard.innerHTML = `
        <img src=${product.images[0]} />
        <p>${product.title}</p>
        <p>${product.category.name}</p>
        <div class="product-info">
           <p>${product.price} $</p>
           <button id="add-btn" data-id=${product.id}>Sepete Ekle</button>
        </div>
        `;
            //elemanı html e gönderme
            productList.appendChild(productCard);
        });
}

//ürünü ekrana basma fonksiyonu

export function renderBasketItem(product) {
    
    const basketItem = document.createElement("div");
    basketItem.classList.add('list-item');
    basketItem.innerHTML = `
    <div class="list-item">
       <img src=${product.images}>
       <h2>${product.title}</h2>
       <h2>${product.price}</h2>
       <p>${product.amount}</p>
       <button id="del-button" data-id="${product.id}"> sil </button>
    </div>
    `;
    basketList.appendChild(basketItem);
}
