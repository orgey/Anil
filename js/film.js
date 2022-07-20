var filmSayisi = 0; //localstoragedan cekilecek ve kontrol edilecek
var films = [];

checkLS();

function kaydet() {
    var isim = document.getElementById('isim').value
    var yonetmen = document.getElementById('yonetmen').value
    var link = document.getElementById('afis').value
    var yeniFilm = new Film(isim, yonetmen, link)
    films.push(yeniFilm)
    show(isim, yonetmen, link)
    saveLS()
    document.getElementById('isim').value = ''
    document.getElementById('yonetmen').value = ''
    document.getElementById('afis').value = ''
}


function Film(isim, yonetmen, afis) {
    this.title = isim;
    this.director = yonetmen;
    this.url = afis;
}
function show(title, director, url) {
    var filmlerBody = document.getElementById('filmlerBody');
    var eklenecek = '<div class="row" id="' + title + '" ><img class="border col-2 mx-2" src="' + url + '" alt="' + title + '"> <p class="col-1"></p><p class="col-3">' + title + '</p><p class="col-3">' + director + '</p><button id="' + title + 'Button' + '" class="btn-danger col-1 sil rounded">Sil</button></div>'
    filmlerBody.innerHTML += eklenecek;
    eventEkleme()
}
function eventEkleme() {
    var butonlar = document.getElementsByClassName('sil')
    for (let i = 0; i < butonlar.length; i++)
        butonlar[i].addEventListener('click', removeLS)
}

function checkLS() {
    if (localStorage.getItem('films') != null) {
        films = JSON.parse(localStorage.getItem('films'));
        for (let i = 0; i < films.length; i++) {
            show(films[i].title, films[i].director, films[i].url)
        }
    }
    else {
        clearLS()
    }
}
function saveLS() {
    localStorage.setItem('films', JSON.stringify(films))
}
function removeLS(event) {
    event.preventDefault();
    console.log(films.length)
    console.log(event.target.id.slice(0, -6))

    for (let i = 0; i < films.length; i++) {

        if (films[i].title == event.target.id.slice(0, -6)) {

            films.splice(i, 1)

        }
    }
    event.target.parentElement.remove();
    saveLS();
}
function clearLS() {
    var filmlerBody = document.getElementById('filmlerBody');
    document.getElementById('filmlerBody').innerHTML='';
    localStorage.clear();
    films = [];


}