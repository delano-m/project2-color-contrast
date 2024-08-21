let form = document.getElementById("form");

form.addEventListener("submit", onFormSubmit);



function onFormSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    box1 = data.get("box1");
    box2 = data.get("box2");
    document.getElementById("box1-display").style.backgroundColor = box1;
    document.getElementById("box2-display").style.backgroundColor =  box2;

    findContrast(box1, box2);
}

function findContrast(box1, box2) {
    rgbBox1 = hexToDecimal(box1);
    normalBox1 = normalizeRGB(rgbBox1);
    l1 = luminanceRGB(normalBox1);

    rgbBox2 = hexToDecimal(box2);
    normalBox2 = normalizeRGB(rgbBox2);
    l2 = luminanceRGB(normalBox2);

    document.getElementById("contrast-score").innerHTML = "The contrast score between these two colors is: " + contrast(l1, l2);




}

// not needed anymore - switched to input type = color
// function isHex(input) {
//     const regex = /[A-F0-9]/;
//     return regex.test(input);
// }

function hexToDecimal(hex) {
    let r, g, b;
    r = parseInt(hex.substring(1,3), 16);
    g = parseInt(hex.substring(3,5), 16);
    b = parseInt(hex.substring(5,7), 16);
    return [r, g, b]; // RGB array
}

function normalizeRGB(rgb) {
    // loop through rgb array and mutate accordinly
    for (let i = 0; i < rgb.length - 1; i++) {
        rgb[i] /= 255;
        if (rgb[i] <= 0.04045) {
            rgb[i] /= 12.92;
        } else if (rgb[i] > 0.04045) {
            rgb[i] = Math.pow(((rgb[i] + 0.055)/1.055), 2.4);
        }
    }
    return rgb; // RGB array
}

function luminanceRGB(rgb) {
    rgb[0] *= 0.2126;
    rgb[1] *= 0.7151;
    rgb[2] *= 0.0722;
    lum = rgb[0] + rgb[1] + rgb[2];
    return lum;
}

function contrast(c1, c2) {
    c1 += 0.05;
    c2 += 0.05;
    if (c2 > c1) {
        return c2 / c1;
    } else {
        return c1 / c2;
    }
}




