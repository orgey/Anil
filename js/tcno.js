/* Ödev 

TC Kimlik No Doğrulama Algoritması
Bu algoritma 5 adımlı yani 5 şart var. Bu 5 şartın hepsine de uyulması gerekiyor.

1 – TC Kimlik Numaraları 11 karakter olmak zorundadır.
2 – Her hanesi bir rakam olmaldır.
3 – İlk hanesi 0 (sıfır) olamaz
4 – 1, 3, 5, 7, 9 basamaklarının toplamının 7 katından, 2, 4, 6, 8 basamaklarının 
    toplamını çıkarttığımızda elde ettiğimiz sonucun 10’a bölümünden kalan sayı (MOD10)  
    10. basamaktaki sayıyı vermelidir.

5 – İlk 10 hanenin toplamından elde edilen sonucun 10’a bölümünden kalan sayı (MOD10)
     11. basamaktaki sayıyı vermelidir.

*/

function kontrol() {
    let dogrubg = document.getElementById("modalekle");


    let tcno = document.getElementById("tcnumara").value
    let tcarray = tcno.split("")
    let hata;
    // 4. basamak
    let tcyedikat = 0
    for (let i = 0; i < 9; i += 2) {
        tcyedikat += parseInt(tcarray[i]);

    }
    let tccikartilan = 0
    for (let i = 1; i < 8; i += 2) {
        tccikartilan += parseInt(tcarray[i]);

    }
    let sonucdort = (tcyedikat * 7 - tccikartilan) % 10
    // 4. basamak
    console.log(sonucdort);
    // 5. basamak

    let ilkonhane = 0;
    for (let i = 0; i < tcarray.length - 1; i++) {
        ilkonhane += parseInt(tcarray[i]);
    }
    // 5. basamak
    console.log((ilkonhane % 10))
    if (tcarray.length != 11) {
        hata = "TC Numara 11 Haneli olmak zorunda!";
        yanlis(hata);

    }
    else if (tcarray[0] == 0) {
        hata = "TC Numaranin ilk hanesi 0 olamaz!";
        yanlis(hata);

    }
    // 4. basamak
    else if (sonucdort != tcarray[9]) {
        hata = "1, 3, 5, 7, 9 basamaklarının toplamının 7 katından, 2, 4, 6, 8 basamaklarının toplamını çıkarttığımızda elde ettiğimiz sonucun 10’a bölümünden kalan sayı (MOD10) 10. basamaktaki sayıyı vermelidir.";
        yanlis(hata);
    }
    // 4. basamak

    // 5. basamak
    else if ((ilkonhane % 10) != tcarray[10]) {
        hata = "İlk 10 hanenin toplamından elde edilen sonucun 10’a bölümünden kalan sayı (MOD10) 11. basamaktaki sayıyı vermelidir.";
        yanlis(hata);
    }
    // 5. basamak

    else {
        dogrubg.classList.remove("bg-danger");
        dogrubg.classList.add("bg-success");
        document.getElementById("ModalBody").innerText = 'Dogru'
    }
}

function yanlis(hatakodu) {
    let dogrubg = document.getElementById("modalekle");

    document.getElementById("ModalLongTitle").innerText = 'TC Kimlik Numarasi Hatali';
    document.getElementById("ModalBody").innerText = hatakodu;

    dogrubg.classList.remove("bg-success");
    dogrubg.classList.add("bg-danger");

}