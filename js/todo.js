
var todos = document.getElementById('todos')
let renkler = ['#ffce56', '#9966ff', '#ff6384', '#F6D99F', ' #F7B6BE', '#77DD77 ', '#79addc', '#A484E9', '#FFAF68', '#BC789E'];
var sayac = 0;
var secilirenk = '';
var basliksirasi=0;
if (localStorage.length == 0) {
    var basliklar = [
        ['Bekliyor', renkler[0],basliksirasi],
        ['Yapiliyor', renkler[1],basliksirasi+1],
        ['Tamamlandi', renkler[2],basliksirasi+2]
    ];
    for (let i = 0; i < 3; i++) {
        localStorage.setItem(basliklar[i][0], JSON.stringify(basliklar[i]))
    }
    basliksirasi=3;
}
else {
    basliksirasi=localStorage.length;
    var basliklar = new Array(localStorage.length);
    for (var i = 0; i < basliklar.length; i++) {
       
        basliklar[JSON.parse(localStorage.getItem(localStorage.key(i)))[2]] = JSON.parse(localStorage.getItem(localStorage.key(i)))
    }
}
olusturma();
loadEkleme();
yeniBaslik();

const eklebutton = document.getElementById('todoekle');
const todoyazi = document.getElementById('todoyazi');
const deleteAll = document.getElementById('sil');
const saveBaslik = document.getElementById('save')
const baslikEkle = document.getElementById('baslikEkleme')
const bekliyorList = document.getElementById(basliklar[0] + 'List')
const yapiliyorList = document.getElementById(basliklar[1] + 'List')
const tamamlandiList = document.getElementById(basliklar[2] + 'List')

tumEventler();
function tumEventler() {
    eklebutton.addEventListener('click', bekleniyorEkle)
    baslikEkle.addEventListener('click', yeniBaslik)
    todos.addEventListener('click', sil)
    deleteAll.addEventListener('click', hepsiniSil)
    saveBaslik.addEventListener('click', yeniBaslikEkleme)
}
function loadEkleme() {
    for (var i = 0; i < basliklar.length; i++) {
        for (var j = 3; j < basliklar[i].length; j++) {
            const li = document.createElement('li');
            li.classList = ' list-group-item my-1 rounded bg-light text-dark';
            li.appendChild(document.createTextNode(basliklar[i][j]));
            li.draggable = 'true';
            li.id = 'todo' + sayac;
            sayac++;
            li.addEventListener('dragstart', tasima)
            const a = document.createElement('a');
            a.classList = ('sil-buton float-end text-dark');
            a.setAttribute('href', '#');
            a.innerHTML = '<i class = "bi bi-trash-fill"></i>'
            li.appendChild(a);
            todos.children[i].children[1].appendChild(li);
            addLS(basliklar[i][0], basliklar[i][j])
            renk();
        }
    }
}
function tasima(e) {
    e.dataTransfer.setData('text', e.target.id)
    renk()
}
function allowDrop(event) {
    event.preventDefault();
}
function birak(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData('text')
    let baslik = document.getElementById(data).parentElement.id
    let eklenenBaslik;
    let icerik = document.getElementById(data).innerText;
    if (e.target.tagName === 'LI') {
        e.target.parentNode.appendChild(document.getElementById(data))
        eklenenBaslik = e.target.parentNode.id
    }
    if (e.target.tagName === 'DIV') {
        e.target.childNodes[1].appendChild(document.getElementById(data))
        eklenenBaslik = e.target.childNodes[1].id
    }
    if (e.target.tagName === 'H3') {
        e.target.nextElementSibling.appendChild(document.getElementById(data))
        eklenenBaslik = e.target.nextElementSibling.id
    }
    addLS(eklenenBaslik, icerik)
    removeLS(baslik, icerik);
    renk();
}
function sil(e) {
    e.preventDefault();
    var kaldirilacakBaslik, kaldirilacakIcerik;
    if (e.target.className == 'bi bi-trash-fill') {
        kaldirilacakIcerik = e.target.parentElement.parentElement.innerText
        kaldirilacakBaslik = e.target.parentElement.parentElement.parentElement.id
        e.target.parentElement.parentElement.remove();
        removeLS(kaldirilacakBaslik, kaldirilacakIcerik)
    }
    if (e.target.className == 'bi bi-trash fs-1 col-1') {
        var degistir = false;
        for (var i = 0; i < basliklar.length; i++){
            if(degistir){
                basliklar[i][2]=i-1
                basliklar[i-1]=basliklar[i]
            }
            if(basliklar[i][0]==e.target.parentElement.parentElement.classList[0]){
            degistir=true;
            }
            
        }
        basliklar.pop()
        window.localStorage.removeItem(e.target.parentElement.parentElement.classList[0])
        e.target.parentElement.parentElement.remove();
        for (let i = 0; i < basliklar.length; i++) {
            localStorage.setItem(basliklar[i][0], JSON.stringify(basliklar[i]))
        }
    }
    if (e.target.tagName == 'A') {
        kaldirilacakIcerik = e.target.parentElement.innerText
        kaldirilacakBaslik = e.target.parentElement.parentElement.id
        e.target.parentElement.remove();
        removeLS(kaldirilacakBaslik, kaldirilacakIcerik)
    }
    renk();
}
function hepsiniSil() {
    if (confirm('Hepsini Silmek Istediginden Emin Misin?')) {
        localStorage.clear()
        for (var i = 0; i < basliklar.length; i++)
            document.getElementById(basliklar[i][0] + 'List').innerHTML = ''

    }
}
function bekleniyorEkle(e) {
    e.preventDefault();
    if (todoyazi.value === '') {
        alert('Gorev Ekle')
        return;
    }
    const li = document.createElement('li');
    li.classList = 'BekliyorList list-group-item my-1 rounded bg-light text-dark';
    li.appendChild(document.createTextNode(todoyazi.value));
    li.draggable = 'true';
    li.id = 'todo' + sayac;
    sayac++;
    li.addEventListener('dragstart', tasima)
    const a = document.createElement('a');
    a.classList = ('sil-buton float-end text-dark');
    a.setAttribute('href', '#');
    a.innerHTML = '<i class = "bi bi-trash-fill"></i>'
    li.appendChild(a);
    todos.children[0].children[1].appendChild(li);
    addLS(li.classList[0], todoyazi.value)
    renk();
    todoyazi.value = null
}

function renk() {
    var liste
    for (let i = 0; i < basliklar.length; i++) {
        if (document.getElementById(basliklar[i][0] + 'List').getElementsByTagName('li') != null) {
            liste = document.getElementById(basliklar[i][0] + 'List').getElementsByTagName('li');
            for (let i = 0; i < liste.length; i++) {
                if (i % 2 == 0) {
                    liste[i].classList = 'list-group-item bekliyorList my-1 rounded bg-light text-dark';
                }
                if (i % 2 == 1) {
                    liste[i].classList = 'list-group-item bekliyorList my-1 rounded acikgri text-light';
                }
            }
        }
    }
}
function addLS(durum, icerik) {
    var diziLength = basliklar.length
    for (let i = 0; i < diziLength; i++) {
        if (durum == basliklar[i][0] + 'List') {
            basliklar[i].push(icerik)
            localStorage.setItem(basliklar[i][0], JSON.stringify(basliklar[i]))

        }
    }
}
function removeLS(baslik, silinecek) {
    for (let i = 0; i < basliklar.length; i++) {
        if (baslik == basliklar[i][0] + 'List') {
            for (let j = 0; j < basliklar[i].length; j++) {
                if (basliklar[i][j] == silinecek) {
                    basliklar[i].splice(j, 1)
                    localStorage.setItem(basliklar[i][0], JSON.stringify(basliklar[i]))
                }
            }
        }
    }
}
function olusturma() {
    for (let i = 0; i < basliklar.length; i++) {
        todos.innerHTML += ' <div class=" ' + basliklar[i][0] + ' pt-5 mx-2 cerceve" ondrop="birak(event)" ondragover="allowDrop(event)"><div class="row"><h3 class="text-center mb-5 col-10">' + basliklar[i][0] + '</h3><i class="bi bi-trash fs-1 col-1"></i></div><ul id="' + basliklar[i][0] + 'List" class="justify-content-center"></ul></div>'
        // document.getElementsByClassName[basliklar[i][0]][0].background = basliklar[i][1]
       
        document.getElementsByClassName(basliklar[i][0])[0].style.background = basliklar[i][1]

    }
}
function yeniBaslik() {

    for (var i = 0; i < 10; i++) {

        document.getElementsByClassName('color')[i].style.background = renkler[i]
    }
}

function renkaktif(id) {
    var renkbutonlari = document.getElementsByClassName('color');
    for (var i = 0; i < renkbutonlari.length; i++) {
        renkbutonlari[i].classList = 'color'
        if (id == renkbutonlari[i].id) {
            renkbutonlari[i].classList.add('activeRenk')
        }
    }
}
function yeniBaslikEkleme(e) {
    e.preventDefault()
    if (document.getElementById('baslikyazi').value == '') {
        alert('Baslik Girin!')
        return;
    }
    basliklar.push([document.getElementById('baslikyazi').value])
    if (document.getElementsByClassName('activeRenk')[0] == undefined) {
        alert('Renk Secin!')
        return;
    }
    var secilirenk = document.getElementsByClassName('activeRenk')[0].id.replace('color', '') * 1;
    basliklar[basliklar.length - 1].push(renkler[secilirenk])
    basliklar[basliklar.length - 1].push(basliksirasi)
    basliksirasi++;
    for (let i = 0; i < basliklar.length; i++) {
        localStorage.setItem(basliklar[i][0], JSON.stringify(basliklar[i]))
    }

    const cerceveler = document.querySelectorAll('.cerceve');
    document.getElementById('baslikyazi').value =''
    cerceveler.forEach(div => {
        div.remove();
    });
    olusturma();
    loadEkleme();
    yeniBaslik();
}