function Play(kit) {
    var path = '../sounds/Drum/'
    var sound = new Audio(path + kit + '.wav');
    sound.play();
}
function hihatDurum(durum) {


    if (durum == 'hihatclose drums') {
        document.getElementById('hihattop').classList = 'hihatopen drums'
        document.getElementById('hihatbot').classList = 'hihatopen drums'
        document.getElementById('hihatdurum').innerText = 'Hihat Open'

    }
    else if (durum == 'hihatopen drums') {
        document.getElementById('hihattop').classList = 'hihatclose drums'
        document.getElementById('hihatbot').classList = 'hihatclose drums'
        document.getElementById('hihatdurum').innerText = 'Hihat Close'

    }
}
// Add event listener on keypress
document.addEventListener('keyup', (event) => {
    var basilan = event.key;
 
 var tuslar = document.getElementsByClassName('tuslar')
    checkDuplicate(tuslar,basilan);    
}, false);

document.addEventListener('keyup', (event) => {

}, false);

function checkDuplicate(arr,basilan) {
    let map = {};
    let result = false;
    for (let i = 0; i < arr.length; i++) {
        // check if object contains entry with this element as key
        if (map[arr[i].value]) {
            result = true;
            arr[i].value =''
            break;
        }
        // add entry in object with the element as key
        map[arr[i].value] = true;
    }
    if (result) {
        alert('Ayni tus atanamaz');
    } else {
        keyPlay(basilan)
    }
}
function keyPlay(basilan){
    for(let i = 0; i<10;i++){

        if(basilan == document.getElementsByClassName('tuslar')[i].value){
            Play(document.getElementsByClassName('tuslar')[i].id.slice(0,-3))
        }
    }
}z