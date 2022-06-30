const eklebutton = document.getElementById('todoekle');
const todoyazi = document.getElementById('todoyazi');
const deleteAll = document.getElementById('sil');
const bekliyorList = document.getElementById('bekliyorList')
const yapiliyorList = document.getElementById('yapiliyorList')
const tamamlandiList = document.getElementById('tamamlandiList')
const todos = document.querySelectorAll('.list-group-item')
const sutunlar = document.querySelectorAll('.cerceve')
var sayac = 0;

let tasinanItem = null;

tumEventler();
function tumEventler() {
    eklebutton.addEventListener('click', bekleniyorEkle)
    bekliyorList.addEventListener('click', sil)
    deleteAll.addEventListener('click', hepsiniSil)

}



function tasima(e) {
    e.dataTransfer.setData('text', e.target.id)
    console.log(e.target.id)
    renk()
}

function allowDrop(event) {
    event.preventDefault();
}

function birak(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData('text')
    if (e.target.tagName === 'LI') { 
        console.log(e.target.parentNode.appendChild(document.getElementById(data))) }
    if (e.target.tagName === 'DIV') { 
        e.target.childNodes[3].appendChild(document.getElementById(data)) 
    }
    if (e.target.tagName === 'H3') { 
        e.target.nextElementSibling.appendChild(document.getElementById(data)) 
    }
    renk();
}



function sil(e) {
    e.preventDefault();
    e.target.parentElement.parentElement.remove();
    renk();
}
function hepsiniSil() {
    if (confirm('Hepsini Silmek Istediginden Emin Misin?')) {
        sayac == 0;
        var tumListeElementleri = document.getElementsByTagName('li')
        while (tumListeElementleri != null) {
            tumListeElementleri[0].remove();
        }
    }
}




function bekleniyorEkle(e) {
    e.preventDefault();
    if (todoyazi.value === '') {
        alert('Gorev Ekle')
        return;
    }

    const li = document.createElement('li');
    li.classList = 'bekliyorList';
    li.appendChild(document.createTextNode(todoyazi.value));
    li.draggable = 'true';
    li.id = 'todo' + sayac;
    // li.setAttribute('id', 'todo' + sayac)
    sayac++;
    console.log(li.id)
    li.addEventListener('dragstart', tasima)

    const a = document.createElement('a');
    a.classList = ('sil-buton float-end text-dark');
    a.setAttribute('href', '#');
    a.innerHTML = '<i class = "bi bi-trash-fill"></i>'
    li.appendChild(a);

    bekliyorList.appendChild(li);
    renk();
}

function renk() {
    var liste = document.getElementById('bekliyorList').getElementsByTagName('li');

    for (let i = 0; i < liste.length; i++) {
        if (i % 2 == 0) {
            liste[i].classList = 'list-group-item bekliyorList my-1 rounded bg-light text-dark';
        }
        if (i % 2 == 1) {
            liste[i].classList = 'list-group-item bekliyorList my-1 rounded acikgri text-light';
        }
    }
    liste = document.getElementById('yapiliyorList').getElementsByTagName('li');

    for (let i = 0; i < liste.length; i++) {
        if (i % 2 == 0) {
            liste[i].classList = 'list-group-item yapiliyorList my-1 rounded bg-light text-dark';
        }
        if (i % 2 == 1) {
            liste[i].classList = 'list-group-item yapiliyorList my-1 rounded acikgri text-light';
        }
    }
    liste = document.getElementById('tamamlandiList').getElementsByTagName('li');

    for (let i = 0; i < liste.length; i++) {
        if (i % 2 == 0) {
            liste[i].classList = 'list-group-item tamamlandiList my-1 rounded bg-light text-dark';
        }
        if (i % 2 == 1) {
            liste[i].classList = 'list-group-item tamamlandiList my-1 rounded acikgri text-light';
        }
    }
}

