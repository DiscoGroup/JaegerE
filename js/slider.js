var interval = 6; // delay between rotating images (in seconds)  

var random_display = 0; // 0 = no, 1 = yes  
var timer;

interval *= 800;
var rotationspeed = 5000;
var rotationstart = 4000;
var testimonial_timer;
var testimonial_idx = 0;
var testimonial_list = [
    "."
  , "."
  , "."
  , "."
];

var offimg = "images/slider/btn-slider-off.png";
var onimg = "images/slider/btn-slider-on.png";
var image_list = [
                  "images/slider/image01.jpg"
                  , "images/slider/image02.jpg"
                  , "images/slider/image03.jpg"
                  , "images/slider/image04.jpg"
];

var currimages = [0, 1, 2];
var image_index = 3;
var last_image_index = 0;
var number_of_image = image_list.length;

var imgidx1 = 1; //5
var lastimgidx1 = 0;
var isTopCurrent = true;
function generate(x, y) {
    var range = y - x + 1;
    return Math.floor(Math.random() * range) + x;
}

function setTestimonials(data) {
    testimonial_list = data;
    if (testimonial_list.length > 1) set_testimonial(0);
}

function getNextImage() {
    if (random_display) {
        //image_index = generate(0, number_of_image - 1);
        var redo = 1;
        while (redo == 1) {
            redo = 0;
            image_index = generate(0, number_of_image - 1);
            for (var i in currimages) {
                if (i == image_index) {
                    redo = 1;
                }
            }
        }
    }
    else {
        image_index = (image_index + 1) % number_of_image;
    }

    return image_list[image_index];
}
function getNextImageID() {
    if (random_display) {
        //image_index = generate(0, number_of_image - 1);
        var redo = 1;
        while (redo == 1) {
            redo = 0;
            image_index = generate(0, number_of_image - 1);
            for (var i in currimages) {
                if (i == image_index) {
                    redo = 1;
                }
            }
        }
    }
    else {
        image_index = (image_index + 1) % number_of_image;
    }

    return image_index;
}
function getNextImageIDSimple() {
    lastimgidx1 = imgidx1;
    imgidx1 = imgidx1 + 1;
    if (imgidx1 > number_of_image-1) imgidx1 = 0;
    return imgidx1;
}

function getNextImage1() {
    lastimgidx1 = imgidx1;
    imgidx1 = imgidx1 + 1;
    if (imgidx1 > number_of_image) imgidx1 = 0;
    return image_list[imgidx1];
}

function rotateImage(place) {

    document.getElementById(place).src = getNextImage();
    $("#rotatingimage").fadeIn(2000);
    $("#rotatingimage").fadeOut(2000);

    setTimeout(function () {
        rotateImage(place);
    }, interval);
}

function setid(newid) {
    clearInterval(timer);
    //alert("newid:" + newid + " lastimgidx1:" + lastimgidx1 + " imgidx1:" + imgidx1);
    //lastimgidx1 = imgidx1;
    
    
    document.getElementById("img0").src = offimg;
    document.getElementById("img1").src = offimg;
    document.getElementById("img2").src = offimg;
    document.getElementById("img" + newid).src = onimg;


    if (newid == 0) {
        imgidx1 = number_of_image;
        lastimgidx1 = number_of_image-1;
    }
    else {
        imgidx1 = newid - 1;
        if (imgidx1 == 0)
            lastimgidx1 = number_of_image;
        else
            lastimgidx1 = imgidx1 - 1;
    }
    //alert("newid:" + newid + " lastimgidx1:" + lastimgidx1 + " imgidx1:" + imgidx1);
    if (isTopCurrent)
        setnexttopimg1();
    else
        setnextbotimg1();
}

function setnexttopimg1() {
    
    id = getNextImageIDSimple();

    currimages[0] = id;
    document.getElementById("img1top").src = image_list[id];


    $("#img1bot").fadeOut(2000)
    if (testimonial_list.length > 1) rotate_testimonial();
    $("#img1top").fadeIn(2000);
    isTopCurrent = true;
    //document.getElementById("img" + lastimgidx1).src = offimg;
    //document.getElementById("img" + imgidx1).src = onimg;
    timer = setTimeout(function () { setnextbotimg1(); }, rotationspeed);
}

function setnextbotimg1() {

    id = getNextImageIDSimple();
    currimages[1] = id;
    document.getElementById("img1bot").src = image_list[id];

     rotate1(); 
    
}

function rotate1() {
    
    //setTimeout(setnexttopimg1(), 2200);
    //alert("img" + (lastimgidx1));
    //document.getElementById("img" + (lastimgidx1)).src = offimg;
    //document.getElementById("img" + (imgidx1)).src = onimg;
    $("#img1bot").fadeIn(2000);
    if (testimonial_list.length > 1) rotate_testimonial();
    $("#img1top").fadeOut(2000);
    isTopCurrent = false;
    //.ready(setTimeout(setnexttopimg1(), 2200));
    //$.sleep(2, setnexttopimg1());
    timer = setTimeout(function () { setnexttopimg1(); }, rotationspeed);
}

function rotate_testimonial() {
    testimonial_idx = testimonial_idx + 1;
    if (testimonial_idx > testimonial_list.length-1) testimonial_idx = 0;
    set_testimonial(testimonial_idx);
    //testimonial_timer = setTimeout(function () { rotate_testimonial(); }, 4000);
}

function set_testimonial(idx) {
    
    document.getElementById("Testimonial").innerHTML = testimonial_list[idx];
    
    
}

function slider_click(img) {

    var src = img.src;
    var r = /[^/\\]+(?:jpg|gif|png)/gi;
    var filenamearr = src.match(r);
    var filename = filenamearr[0];

    var url = 'default.aspx';
    switch (filename) {
        case "image01.png":
            url = 'HowDidThisHappen.dmx';
            break;
        case "image02.png":
            url = 'Store.dmx';
            break;
        case "image03.png":
            url = 'GoodEating.dmx';
            break;
    }

    window.location = url;

}
function setupbuttons() {

    var imgdiv = document.getElementById("imgset1")
    //<img style="position: absolute; top: 180px; left: 184px;" border="0" id="img7" onclick="setid(7);" src="../images/slider/btn-slider-off.png" onmouseover="this.style.cursor='pointer';" onmouseout="this.style.cursor='default';" />
    var top = 340;
    var leftstart = 1040;
    var leftspace = 30;
    for (i = 5; i >= 0; i--) {
        var img = document.createElement('img');
        img.style.position = 'absolute';
        img.style.top = top + 'px';
        img.style.border = '0';
        img.id = 'img' + i;
        img.onclick = 'set(' + i + ');';
        if (i == 0) {
            img.src = 'images/slider/btn-slider-on.png';
        }
        else {
            img.src = 'images/slider/btn-slider-off.png';
        }
        img.onmouseover = function () {
            this.style.cursor='pointer';
        };
        img.onmouseout = function () {
            this.style.cursor = 'default';
        };
        img.onclick =function(el){
            return function() {
                setid(el);
            }
        }(i);



        img.style.left = (leftstart - ((5 - i) * leftspace)) + 'px';
        
        //imgdiv.firstChild.appendChild(img);
        //$("#imgset1").append(img);
        imgdiv.appendChild(img);
        
    }
    timer = setTimeout(function () { rotate1(); }, rotationspeed);
}

//setupbuttons();
timer = setTimeout(function () { rotate1(); }, rotationstart);


//testimonial_timer = setTimeout(function () { rotate_testimonial(); }, 5000);