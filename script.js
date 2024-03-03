// HTML üzerindeki gerekli elementleri seçiyoruz
const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

// Hesap makinesinin durumunu ve değerlerini tutan değişkenler
let displayValue = '0'; // Ekran üzerinde görünen değer
let firsValue = null;   // İlk değer
let operator = null;    // Kullanılan operatör
let waitingForSecondValue = false; // İkinci değeri bekleyip beklemediğimizi belirten flag

// Ekranı güncellemek için fonksiyon
function updateDisplay() {
    display.value = displayValue;
}

// Tuşlara tıklama olayını dinleyen bir event listener ekliyoruz
keys.addEventListener('click', function(e){
    const element = e.target;
    const value = element.value;

    // Eğer tıklanan element bir buton değilse, işlemi durdur
    if (!element.matches('button')) return;

    // Tıklanan butonun değerine göre işlem yap
    switch(element.value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(element.value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }

    // Ekranı güncelle
    updateDisplay();
});

// Operatörleri işlemek için fonksiyon
function handleOperator(nextoperator){
    const value = parseFloat(displayValue);

    // Eğer operatör var ve ikinci değeri bekliyorsak, operatörü güncelle
    if(operator && waitingForSecondValue){
        operator = nextoperator;
        return;
    }

    // Eğer ilk değer null ise, tıklanan değeri ilk değer olarak ayarla
    if(firsValue == null){
        firsValue = value;
    }
    // Eğer operatör varsa, hesapla ve sonucu ekrana yaz
    else if(operator){
        const result = calculate(firsValue, value, operator);
        // Sonucu ekran değeri olarak ayarla, küçük hata payını kontrol et
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firsValue = result;
    }
    // İkinci değeri beklemeye al
    waitingForSecondValue = true;
    // Operatörü güncelle
    operator = nextoperator;
}

// Hesaplama işlemini gerçekleştiren fonksiyon
function calculate(first, second, operator){
    // Operatöre göre işlem yap
    if(operator === '+'){
        return first + second;
    }
    else if(operator === '-'){
        return first - second;
    }
    else if(operator === '*'){
        return first * second;
    }
    else if(operator === '/'){
        return first / second;
    }
    else{
        // Eğer operatör tanınmıyorsa, ikinci değeri döndür
        return second;
    }
}

// Sayı girişi işlemini gerçekleştiren fonksiyon
function inputNumber(num){
    // Eğer ikinci değeri bekliyorsak, displayValue'yi num ile güncelle ve bekleme modunu kapat
    if(waitingForSecondValue){
        displayValue = num;
        waitingForSecondValue = false;
    }
    // Bekleme modu kapalıysa, displayValue'yi güncelle (0 ise sıfırla, değilse num ekle)
    else{
        displayValue = displayValue === '0'? num: displayValue + num;
    }
}

// Ondalık noktası işlemini gerçekleştiren fonksiyon
function inputDecimal(){
    // Eğer displayValue'da nokta yoksa, ekran değerine noktayı ekle
    if(!displayValue.includes('.')){
        displayValue += '.';   
    }  
}

// Temizleme işlemini gerçekleştiren fonksiyon
function clear(){
    displayValue = '0'; // Ekran değerini sıfırla
}