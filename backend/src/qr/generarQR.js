const QRCode =
    require("qrcode");

async function generarQR() {

    try {

        await QRCode.toFile(
            "./smartcafeteria-qr.png",

            "https://smartcafeteria.vercel.app",

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