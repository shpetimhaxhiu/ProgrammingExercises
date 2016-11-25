// Algorithm description
// altered the calculations to modify the RGB values for each image as follows:
// Image 1 (shown): from Math.floor(rgb/16)*16 to Math.floor(rgb/[2^numbits])*[2^numbits] ( = Math.floor(rgb/4)*4 when numbits=2 )
// Image 2 (hidden): from Math.floor(rgb/16) to Math.floor(rgb/[256/2^numbits]) ( = Math.floor(rgb/64) when numbits=2 )

// Author: Shpetim Haxhiu
// Description: Assignment in Javascript, Duke University.

//-----------------------------------------------
// Function to perform steganography - using varying number of bits
function steganography(image1, image2, numbits) {
    //Steganography - hide numbits of image2 inside image1
    var width = image1.getWidth();
    var height = image1.getHeight();
    var stego_image = new SimpleImage(width, height);
    if (width != image2.getWidth()) {
        print ("ERROR - image1 and image2 have different widths");
        return stego_image;
    }
    if (height != image2.getHeight()) {
        print ("ERROR - image1 and image2 have different heights");
        return stego_image;
    }
    //Calculate parameters to hide numbits of image2 in image1
    var factor1 = Math.pow(2,numbits);       // Factor for image1
    var factor2 = 256 / Math.pow(2,numbits); // Factor for image2
    for (var pixel of stego_image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var red1 = image1.getPixel(x,y).getRed();
        var red2 = image2.getPixel(x,y).getRed();
        var newred = Math.floor(red1/factor1)*factor1 + Math.floor(red2/factor2);
        pixel.setRed(newred);

        var green1 = image1.getPixel(x,y).getGreen();
        var green2 = image2.getPixel(x,y).getGreen();
        var newgreen = Math.floor(green1/factor1)*factor1 + Math.floor(green2/factor2);
        pixel.setGreen(newgreen);

        var blue1 = image1.getPixel(x,y).getBlue();
        var blue2 = image2.getPixel(x,y).getBlue();
        var newblue = Math.floor(blue1/factor1)*factor1 + Math.floor(blue2/factor2);
        pixel.setBlue(newblue);
    }
    return stego_image;
}
