//diğer dosyalardan gelenler
import { renderCategories, renderProducts, renderBasketItem
} from "./ui.js";

/* html in ilk yüklenme anını izleme komutu */

document.addEventListener('DOMContentLoaded',() => {
    fetchCategories();
    fetchProducts();
});

const baseUrl = "https://api.escuelajs.co/api/v1";

/*kategori bilgilerini api'ye istek at*/
/*gelen verileri ekrana basacak fonksiyonu oluştur*/

function fetchCategories() {

    fetch(`${baseUrl}/categories`)
        //eğer veriler gelirse çalışır
        .then((response) => response.json())
        //veri json formatına dönünce çalışır
        .then((data) => renderCategories(data))
        //hata olursa çalışır
        .catch((error) => console.log(error));
}

let globalData = [];

//ürünlerin verisini çek

async function fetchProducts() {
    try {
       // veri çekme isteği at
       const res = await fetch(`${baseUrl}/products`);
       // gelen veriyi işle
       const data = await res.json();
       // veriyi bütün desya tarafından erişilebilir yapma
       globalData = data;
       // bu veriyi ekrana bas
       renderProducts(data);
    } catch (err) {
       // TODO eğer hata olursa hatayı yönet
       console.log(err);
    }
 }
 
//sepet işlemleri

//sepete eklenenleri tutacağımız dizi

let basket = [];
let total = 0;

const modal = document.querySelector('.modal-wrapper');
const sepetBtn = document.querySelector("#sepet-btn");
const closeBtn = document.querySelector("#close-btn");
const basketList = document.querySelector(".list");
const modalInfo = document.querySelector(".total-span");

//sepet butonuna basılma olayını izleme

sepetBtn.addEventListener("click", () => {
    //modalı görünür yapma
    modal.classList.add("active");
    //modalın içerisine sepetteki ürünleri listeleme
    addList();
});

//çarpı butonuna basılma olayını izleme
closeBtn.addEventListener(`click`, () => {
    //modalı ortadan kaldırma
    modal.classList.remove(`active`);
    //sepetin içindeki HTML i temizleme
    basketList.innerHTML = "";
    total = 0;
    modalInfo.textContent = '0';
});

//modal dışında bir yere tıklanma olayını izleme

document.addEventListener("click", (e) => {
    var clickE1 = e.target;
    if (clickE1.classList.contains("modal-wrapper")) {
        modal.classList.remove("active");
        //sepetin içindeki html i temizleme
        basketList.innerHTML = "";
        total = 0;
        modalInfo.textContent = '0';
    }
})

//uygulamadaki bütün tıklanma olaylarını izleme
document.body.addEventListener("click", findItem);

//html tarafında tıklanılan elemanı tespit etme
function findItem(e) {
    //tıklanılan eleman
    const ele = e.target;
    //tıklanılan elemanın id si sepete ekle butonumu kontrol et
    if (ele.id === "add-btn") {
        //id sine sahip olduğumuz ürünü dizi içirisinde bulma
        const selected = globalData.find(
            (product) => product.id == ele.dataset.id
        );
        //eğer ürün miktar değeri yoksa 1 e eşitle
        if (!selected.amount) {
            selected.amount = 1;
        }
        addToBasket(selected);
    }
    //tıklanılan eleman sepetteki sil ise
    if (ele.id === "del-button") {
        //butonun kapsayıcısını html den kaldırma
        ele.parentElement.remove();

        //elemanı dizi içerisinde buluyoruz
        const selected = globalData.find((i) => i.id == ele.dataset.id);
        deleteItem(selected);
    }
}

//elemanı sepete gönderme fonksiyonu
function addToBasket(product) {
    console.log(product, basket);
    //sepette bu elemandan varmı kontrol et
    const foundItem = basket.find((item) => item.id === product.id);
    console.log(foundItem);
    if (foundItem) {
        //eğer üründen sepette varsa bulunan ürünün miktarını arttırma 
        foundItem.amount++;
    } else {
        //eğer eklenen üründen sepette yoksa sepete ekleme
        basket.push(product);
    }
}

//ürünleri sepete aktarma fonksiyonu
function addList() {
    basket.forEach((product) => {
        //ürünü ekrana bas
        renderBasketItem(product);
        //toplam fiyatı güncelle
        total += product.price * product.amount;
    });
    //modaldaki toplam fiyatı güncelleme
    console.log(total);
    modalInfo.textContent = total;
}

//ürünü diziden kaldırma
function deleteItem(deleteItem) {
    //id si silinecek elemanın id sine eşit olmayanları alma
    const filtredData = basket.filter((item) => item.id !== deleteItem.id);
    //sepet dizisini güncelleme
    basket = filtredData;
    //toplam fiyatı güncelledik
    total -= deleteItem.price * deleteItem.amount;
    modalInfo.textContent = total;
}

