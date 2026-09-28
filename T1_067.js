
function hitungKonversi(nilai, tipe) {
    let hasilKonversi;
    let satuan;

    switch (tipe) {
        case 'CtoF': // Celsius ke Fahrenheit
            hasilKonversi = (nilai * 9/5) + 32;
            satuan = "°F";
            break;
        case 'CtoR': // Celsius ke Reamur
            hasilKonversi = nilai * 4/5;
            satuan = "°R";
            break;
        case 'FtoC': // Fahrenheit ke Celsius
            hasilKonversi = (nilai - 32) * 5/9;
            satuan = "°C";
            break;
        case 'FtoR': // Fahrenheit ke Reamur
            hasilKonversi = (nilai - 32) * 4/9;
            satuan = "°R";
            break;
        case 'RtoC': // Reamur ke Celsius
            hasilKonversi = nilai * 5/4;
            satuan = "°C";
            break;
        case 'RtoF': // Reamur ke Fahrenheit
            hasilKonversi = (nilai * 9/4) + 32;
            satuan = "°F";
            break;
        default:
            return "Tipe konversi tidak valid!";
    }

   
    return `${hasilKonversi.toFixed(2)} ${satuan}`;
}


document.getElementById('formKonversi').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const inputSuhu = document.getElementById('nilaiSuhu').value;
    const nilaiSuhu = parseFloat(inputSuhu);
    
    const tipeKonversi = document.getElementById('tipeKonversi').value;

    if (isNaN(nilaiSuhu)) {
        document.getElementById('hasil').innerText = "Masukkan angka yang valid!";
        return;
    }

    const hasil = hitungKonversi(nilaiSuhu, tipeKonversi);

    document.getElementById('hasil').innerText = `Hasil Konversi: ${hasil}`;
});