const QRCode =
    require("qrcode");

async function generarQR() {

    try {

        await QRCode.toFile(
            "./smartcafeteria-qr.png",

            "http://192.168.100.7:5173",

            {
                width: 500,
                margin: 2
            }
        );

        console.log(
            "✅ QR generado correctamente"
        );

    } catch (error) {

        console.error(
            error
        );

    }

}

generarQR();