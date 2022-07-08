
let javascript = document.querySelectorAll(".javascript  >.circle");
let wtasarim = document.querySelectorAll(".webtasarim  >.circle");
var jsitems = document.getElementsByClassName('javascript')
var wtitems = document.getElementsByClassName('webtasarim')


for (let i = 0; i < jsitems.length; i++) {
   
    jsitems[i].innerHTML +=  '<div class=" col-12 circle d-flex position-absolute justify-content-center">JavaScript</div>'
}
for (let i = 0; i < wtitems.length; i++) {
    wtitems[i].innerHTML +=  '<div class=" col-12 circle d-flex position-absolute justify-content-center">Web Tasarim</div>'
}
function webtasarim() {
    for (let i = 0; i < jsitems.length; i++) {
        jsitems[i].classList.add('d-none')
    }
    for (let i = 0; i < wtitems.length; i++) {
        wtitems[i].classList.remove('d-none')
    }

}
function jscript() {
    for (let i = 0; i < jsitems.length; i++) {
        jsitems[i].classList.remove('d-none')
    }
    for (let i = 0; i < wtitems.length; i++) {
        wtitems[i].classList.add('d-none')
    }

}
function hepsi() {
    for (let i = 000; i < jsitems.length; i++) {
        jsitems[i].classList.remove('d-none')
    }
    for (let i = 0; i < wtitems.length; i++) {
        wtitems[i].classList.remove('d-none')
    }

}