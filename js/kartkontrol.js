function americanExpress() {

    document.getElementById('kknumara').setAttribute('placeholder', '15 Haneli Kredi Karti Numarasi Giriniz');

}
function onaltihane() {

    document.getElementById('kknumara').setAttribute('placeholder', '16 Haneli Kredi Karti Numarasi Giriniz');

}
function kkkontrol() {



    var radio_btn = document.querySelector('input[name="flexRadioDefault"]:checked').value;
    var infoText = document.getElementById("info");
    var cardNo = document.getElementById('kknumara').value
    var sayi = 0;
    var toplamAtlayarak = '';
    var toplam = 0;
    if (radio_btn == 15) {
        if (cardNo.length != 15) {
            infoText.style.color = 'red';
            infoText.innerText = "Lutfen 15 haneli numara giriniz "


        }
        else {
            for (let i = 1; i < cardNo.length; i += 2) {
                toplamAtlayarak += cardNo[i]
            }
            for (let i = 0; i < toplamAtlayarak.length; i++) {
                sayi = toplamAtlayarak[i] * 2
                toplam += sayi % 10 + Math.floor(sayi / 10)
            }
            for (let i = 0; i < cardNo.length; i += 2) {
                toplam += cardNo[i] * 1
            }
            if (toplam % 10 == 0) {
                infoText.style.color = 'green';

                infoText.innerText = "Kart Gecerli! "
            }
            else {
                infoText.style.color = 'red';
                infoText.innerText = "Kart Gecerli Degil! "
            }
        }
    }


    else if (radio_btn == "16") {
        if (cardNo.length != 16) {
            infoText.style.color = 'red';
            infoText.innerText = "Lutfen 16 haneli numara giriniz "
        }
        else {


            for (let i = 0; i < cardNo.length; i += 2) {

                toplamAtlayarak += cardNo[i]



            }
            for (let i = 0; i < toplamAtlayarak.length; i++) {
                sayi = toplamAtlayarak[i] * 2
                toplam += sayi % 10 + Math.floor(sayi / 10)


            }
            for (let i = 1; i < cardNo.length; i += 2) {

                toplam += cardNo[i] * 1


            }
            if (toplam % 10 == 0) {
                infoText.style.color = 'green';

                infoText.innerText = "Kart Gecerli! "
            }
            else {
                infoText.style.color = 'red';
                infoText.innerText = "Kart Gecerli Degil! "
            }

        }
    }



}


