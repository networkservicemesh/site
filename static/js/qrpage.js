/*
 * Convenience method to render a QR Code for the page
 * 
 * id - html id of the element you want to contain the qrcode
 * scale - scale factor.  The qrcode will square of size be:
 * 
 *       min(id.width,id.height)*scale
 */
function renderQR(id,scale) {
    var selector = "#" + id
    var qr_size =  $(selector).outerHeight(true)*scale
    if (qr_size > $(selector).outerWidth(true)*scale ) {
        qr_size = $(selector).outerWidth(true)*scale
    }
    new QRCode(id, {
        text: window.location.href,
        width: qr_size,
        height: qr_size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H,
        //useSVG: true,
    });
}

/* Render QR codes on window load */
$(window).load(function() {
    /* Render initial QR Codes*/
    renderQR("qrcode",1)
    renderQR("qrbig",0.8)
    /* Toggle the big version of the QR code on click */
    $("#qrcode").click(function() {
        $("#qrbig").toggle()
        if ($(".navbar-toggle").is(":visible")) {
            $('.collapse').collapse("toggle")
        }
    })

    /* Toggle the big version of the QR code on click */
    $("#qrbig").click(function() {
        $("#qrbig").toggle()
    })

    /* Resize the big version of the QR code on click */
    $(window).resize(function(){
    $("#qrbig").empty()
        renderQR("qrbig",0.8)
    })
})