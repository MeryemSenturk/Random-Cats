const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

document.addEventListener("DOMContentLoaded", () =>{
  setTimeout(() => {
    loadingDiv.style = "display:none";
    containerDiv.style.displayed = "true";
  },2000 );

  tarih.textContent = `${formattedDate} ${formattedTime} `
  
})

// Şu anki tarihi ve saati al
var currentDate = new Date();

// Tarih ve saat bilgisini al
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1; // Ay değerini 0-11 aralığında verir, bu yüzden +1 ekliyoruz
var year = currentDate.getFullYear();
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
var seconds = currentDate.getSeconds();

// Tarihi ve saati istediğiniz formata biçimlendir
var formattedDate = ("0" + day).slice(-2) + "." + ("0" + month).slice(-2) + "." + year;
var formattedTime = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);



// Kullanacağınız API adresi => "https://api.thecatapi.com/v1/images/search?limit=10"

function CatsData() {
  return fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        showCats(data)
    })
    .catch((err) => displayError(err));
}

const showCats = (data) => {
    data.forEach((cat) => {
        cardDiv.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4">
      <div style="height:200px;">
        <img src="${cat.url}" class="w-100 h-100" alt="cat" id="${cat.id}">
      </div>
      </div>
        `
    })

}

const displayError = (err) => {
    cardDiv.innerHTML = `
    <h2>${err.status}</h2>
    <img src="./img/error.gif" alt="error"/>
    `
}

CatsData();

btn.addEventListener("click", ()=>{
  cardDiv.innerHTML = ""
  CatsData()
});


