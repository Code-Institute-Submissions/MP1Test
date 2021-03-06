//-------modal code taken and adapted from W3schools https://www.w3schools.com/howto/howto_css_modal_images.asp

function openModal(imgID, titleText) {
    // Get the modal
    var titleText = titleText
    var imgID = imgID;
    var modal = document.getElementById("myModal");
    var captionText = "";

    if (imgID == 'exfo') {
        captionText = "Clean & Clear Exfoliating Daily Wash<br>Available in all pharmacies and supermarkets<br>€3.99<br>A gentle cleanser which removes dirt, make up and dead skin cells without stripping your natural barrier. Mix with lukewarm water and apply all over face. Leaves skin feeling soft and smooth. Use twice daily, morning and night for best results."
    } else if (imgID == 'dualAct') {
        captionText = "Clean & Clear Oil-free Moisturiser<br>Available in all pharmacies<br>€4.49<br>A hydrating, smoothing moisturiser which helps balance the oil production and reduce the appearance of pores. Moisturiser is the most important product for tackling oily skin. This moisturiser has been proven to not overload the skin with oil. Use twice daily."
    } else if (imgID == 'blackH') {
        captionText = "Clean & Clear Black-head Clearing Daily Mask<br>Available in all pharmacies<br>€4.49<br>A smooth purifying mask which removes excess oil and clears pores. Apply to a clean dry face. Use twice weekly for best results."
    } else if (imgID == 'dunnPad') {
        captionText = "Dunnes Stores Cotton pads<br>Available in Dunnes Stores supermarkets<br>€0.70c<br>Cotton pads are a go-to for removing make up on any part of the face as they are gentle and easy to use. We recommend these for applying facial cleansers instead of face-cloths, facial brushes or towels as they retain bacteria which can spread around your face, causing breakouts."
    } else if (imgID == 'wipes') {
        captionText = "Clean & Clear Deep action Facial Wipes<br>Available in all pharmacies<br>€3.50<br>They are ideal for removing make up. Good to clean your face if you are in a rush."
    }

    // Get the image and insert it inside the modal - use its "alt" text as a caption


    var img = document.getElementById(imgID);
    var modalImg = document.getElementById("img01");
    var titlID = document.getElementById("modalTitle");
    var modalCaption = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img.src;
    titlID.innerHTML = titleText;

    modalCaption.innerHTML = captionText;
    // }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

}



// ----------------------Adaptive inside-hero-text background-image dimensions, mixing and adapting code from W3Schools https://www.w3schools.com/jsref/met_element_getboundingclientrect.asp,  JavaScript Tutorial https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/#:~:text=The%20method%20element.,and%20right%20of%20the%20viewport.---------- 

// The floating bubble animation slide under the text at the centre of the hero image making reading awkward.
// this can't be solved by simply giving just any solid background to the text, as we want to give a see-trough impression, to keep in with the "clear" theme.
// So I put an image identical to the hero's as background for the centre text. This picture is concentric with the dive where to the text lives, and it's dimension needs to be the same as the hero as window resizes.
// The code below serves this purpose.
// This way the bubble animations disappear while under the text and they reappear when they rise above it.

// make the text at the centre of the hero image seem to have a transparanet background, preventing the bubbles affecting readability
window.addEventListener("resize", heroBackMatch);
window.addEventListener("load", heroBackMatch);

function heroBackMatch() {
    const heroX = document.getElementById('heroX');
    const rect = heroX.getBoundingClientRect();
    const heroBack = document.getElementById('heroBack');
    var heroXH = rect.height.toString();
    var heroXW = rect.width.toString();

    var sizeString = heroXW + "px " + heroXH + "px";

    heroBack.style.backgroundSize = sizeString;
};


// ----------------------Open How To nested list------------------------------------------------------------


//  because we want to open/close 'How To' with linear transition, the inline Href attribute will fire too early while the previous closing transition is stil taking place
//      as a result, the page scrolls to target, but the previous list is still shrinking, and if it is above the one opening, it will pull it above the view port, so the user only sees the bottom and has then to scroll up to view the top of box where the list lives.
//      to work around that I had to put and eventlistener for the end of the transition, and only then scroll the href value passed to the function, and then finaly open the intended lists. 
function openList(howToList, hrefTarget, clickFrom) {
    var howLists = document.getElementsByClassName("colBackHow");
    var ClickedItem = document.getElementById(howToList);
    var ClickedRect = ClickedItem.getBoundingClientRect();
    var ClickedHeight = ClickedRect.height;
    var clickedfrom = clickFrom
    var target = hrefTarget

    for (i = 0; i < howLists.length; i++) {
        var InstList = howLists[i];
        InstList.style.height = "0";
        //----------------------------Mahmoud Ibrahim https://stackoverflow.com/questions/10744299/scroll-back-to-the-top-of-scrollable-div
        $(InstList).animate({ scrollTop: 0 }, "fast");
            
            InstList.style.display = "none";
            
    }


    if (clickedfrom == 'fromList') {
        for (i = 0; i < howLists.length; i++) {
            howLists[i].addEventListener('transitionend', function (event) { //----------Joseph Silberhttps://stackoverflow.com/questions/8814631/how-do-i-detect-a-transition-end-without-a-javascript-library
                if (event.propertyName == "height") {

                    ///-------------------------Dean Harding https://stackoverflow.com/questions/3163615/how-to-scroll-html-page-to-given-anchor
                    document.location.hash = target;

                };
            }, false);
        }


        if (ClickedHeight == 0) { // user has the option of closing by re-clicking the How To list item, not only by clicking "X", so the following will execute only if the list is not already expanded   
            var listValue = howToList;
            var howToList = document.getElementById(howToList);
            howToList.style.display = "block";
            setTimeout(function () {
                howToList.style.height = "400px";
            }, 10);

        };

    };


    if (clickedfrom == 'fromNav') {

        var listValue = howToList;
        var howToList = document.getElementById(howToList);



        howToList.style.display = "block";
        setTimeout(function () {
            howToList.style.height = "400px";
        }, 1);

        setTimeout(function () {

            document.location.hash = target;
        }, 250);
    }


};
//---------------------------Scroll How To List back up by clicking on upwards arrow--------------
function ScrollUpList(howToList) { /// again, Dean Harding https://stackoverflow.com/questions/3163615/how-to-scroll-html-page-to-given-anchor

    var List = document.getElementById(howToList);
    $(List).animate({ scrollTop: 0 }, "fast");
}

//---------------------------Scroll How To List to bottom by clicking on upwards arrow--------------
function ScrollDownList(howToList) {
    var List = document.getElementById(howToList);
    $(List).animate({ scrollTop: $(List)[0].scrollHeight }, "fast"); // andsien on https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
}

//---------------------------collapse navbar after click, from Michael Coker https://stackoverflow.com/questions/42401606/how-to-hide-collapsible-bootstrap-4-navbar-on-click

$('.dropdown-item, .nav-link').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});




function closeList(ClosehowToList) {
    var ClosehowToList = document.getElementById(ClosehowToList);

    ClosehowToList.style.height = "0";

    setTimeout(function () {
        ClosehowToList.style.display = "none";
    }, 150)

};


