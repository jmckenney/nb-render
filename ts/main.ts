//todo potentially move most startup vars to const here
let completion = .4; //10% would be: .10, 100% would be: 1.0

const $window: JQuery = $(window)
const hamburger: JQuery = $('#hamburger')
const hamburgerClose: JQuery = $('#menu-close')
const netzero: JQuery = $('#netzero')
const menuMask: JQuery = $('#menu-mask')
const anniversary: JQuery = $('#anniversary')
const partnership: JQuery = $('#partnership')
const completionGraphic: JQuery = $('.outer')
const progress: JQuery = $('.progress');
const progressCompletionCssNumber: number = 534 - (completion * 465)
const mainContainer: JQuery = $('.main-container')
const headerContainer: JQuery = $('.header-container')
const heroSlide: JQuery = $('.hero-slide')
const canv = document.getElementById('canvas')
const context = canv.getContext('2d')
const ctx: any = canvas.getContext('2d')
const infocards: JQuery = $('.infocards')
const shareNav: JQuery = $('#share-nav')
let videoScrollStart: number = infocards.offset().top
let images: any = new Array()
let device: string = getMobileOperatingSystem()
let scrollTop: number = $window.scrollTop()
let windowHeight: number = $window.height()
let img: any
let updatePage: any
let currentImage: number
let roundedCurrentImage: any
let scrolling: boolean

class Startup {

    main(): number {
        this.setInitialListeners();
        return 0;
    }

    setInitialListeners() {
        this.waitForThemImages();
        this.listenForHeroClicks();
        this.listenForMobileMenuClick();
        this.listenForMobileMenuCloseClick();
        this.listenForMobileMenuShareClick();
        this.setNetZeroWaypoint();
        this.setAnniversaryWaypoint();
        this.setPartnershipWaypoint();
        this.setProgressMeterWaypoint();
        this.setDesktopNavChangeWaypoint();
        this.setInitialCanvasImage();
        this.listenForWindowResize();
        this.listenForWindowLoad();
        this.listenForWindowScroll();
    }

    listenForWindowLoad() {
        let that = this;
        $window.on("load", function() {
            if (getMobileOperatingSystem() == 'unknown') {
                setInterval(updatePage, 10);
                that.loadCanvasFrames();
            }
        })
    }

    listenForWindowResize() {
        let that = this;
        $( window ).resize(function() {
            that.setCanvasSize();
        });
    }

    listenForWindowScroll() {
        let that = this;
        $window.scroll(function() {
            scrolling = true;
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                scrolling = false;
                that.setLargerCanvasImage();
            }, 200));
        });
    }

    setCanvasSize() {
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        this.setCanvasDefaultImage();
    }

    setCanvasDefaultImage() {
        img = new Image;
        img.onload = draw;
        img.src = 'img/frames-large/iStock_61726614_HD_10800000.jpg';
    }

    setLargerCanvasImage() {
        if (device == 'unknown' && roundedCurrentImage < 351) {
            // if we are in the video play scroll range, put higher rez on after scroll stop.
            scrollTop = $window.scrollTop();
            if(scrollTop > videoScrollStart && scrollTop) {
                let largeimg = new Image;
                largeimg.onload = function() {
                    drawImageProp(ctx, largeimg, 0, 0, canvas.width, canvas.height);
                }
                // console.log(roundedCurrentImage);
                let numberString = 10800000 + Number(roundedCurrentImage) + 1;
                let largeImgSrc = 'img/frames-large/iStock_61726614_HD_' + numberString + '.jpg';
                largeimg.src = largeImgSrc;
            }
        }
    }

    loadCanvasFrames() {
        // only on desktop
        if (device == 'unknown') {
            var totalImages = 350;
            for(var i = 1; i < totalImages; i++) {
                var filename = 'iStock_61726614_HD_10800';
                if(i < 10) filename += '00';
                else if(i < 100) filename += '0';
                filename += i + '.jpg';
                var img = new Image;
                img.src = 'img/frames-medium/' + filename;
                images.push(img);
            }
        }
    }

    setInitialCanvasImage() {
        if (device == 'unknown') {
            this.setCanvasSize();
            // this.setCanvasDefaultImage();
            // img = new Image;
            // img.onload = draw;
            // img.src = 'img/frames-large/iStock_61726614_HD_10800000.jpg';
        }
    }

    listenForMobileMenuClick() {
        hamburger.click(function() {
            $('nav').addClass('is-active');
            menuMask.addClass('is-active');
        });
    }

    listenForMobileMenuShareClick() {
        shareNav.click(function() {
            shareNav.toggleClass('is-active');
        });
    }

    listenForMobileMenuCloseClick() {
        hamburgerClose.click(function() {
            $('nav').removeClass('is-active');
            menuMask.removeClass('is-active');
        });
    }

    waitForThemImages() {
        heroSlide.imagesLoaded( { background: true }, function() {
            heroSlide.addClass('loaded');
        });
    }

    listenForHeroClicks() {
        heroSlide.click(function() {
            $(this).toggleClass('animated');
        });
    }

    setNetZeroWaypoint() {
        // netzero counter
        var waypoints = netzero.waypoint({
            handler: function(direction) {
                if (direction == 'down') {
                    netzero.countTo({
                        from: 10,
                        to: 0,
                        speed: 1000,
                        refreshInterval: 50
                    });
                }
            },
            offset: '95%'
        });
    }
    
    setAnniversaryWaypoint() {
        // years of anniversary counter
        var waypoints = anniversary.waypoint({
            handler: function(direction) {
                if (direction == 'down') {
                    anniversary.countTo({
                        from: 0,
                        to: 100,
                        speed: 2000,
                        refreshInterval: 50
                    });
                } else {
                    anniversary.countTo({
                        from: 100,
                        to: 0,
                        speed: 500,
                        refreshInterval: 50
                    });
                }
            },
            offset: '95%'
        });
    }

    setPartnershipWaypoint() {
        // years of partnership counter
        var waypoints = partnership.waypoint({
            handler: function(direction) {
                if (direction == 'down') {
                    partnership.countTo({
                        from: 10,
                        to: 40,
                        speed: 3000,
                        refreshInterval: 50
                    });
                } else {
                    partnership.countTo({
                        from: 40,
                        to: 10,
                        speed: 1000,
                        refreshInterval: 50
                    });
                }
            },
            offset: '95%'
        });
    }

    setProgressMeterWaypoint() {
        // progress meter
        var waypoints = progress.waypoint({
            handler: function(direction) {
                if (direction == 'down') {
                    $(completionGraphic).css('stroke-dashoffset', progressCompletionCssNumber);
                    $('.progress span').countTo({
                        from: 0,
                        to: completion*100,
                        speed: 2000,
                        refreshInterval: 50
                    });
                } else {
                    $(completionGraphic).css('stroke-dashoffset', 534);
                    $('.progress span').countTo({
                        from: completion*100,
                        to: 0,
                        speed: 2000,
                        refreshInterval: 50
                    });
                }
            },
            offset: '75%'
        });
    }

    setDesktopNavChangeWaypoint() {
        // nav change on desktop
        var waypoints = mainContainer.waypoint({
            handler: function(direction) {
                if (direction == 'down') {
                    headerContainer.addClass('small');
                } else {
                    headerContainer.removeClass('small');
                }
            },
            offset: '-100'
        });
    }
}

(new Startup()).main();

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
function drawImageProp(ctx, img, x, y, w, h, offsetX?, offsetY?) {
    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    /// default offset is center
    offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
    offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

    /// keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   /// new prop. width
        nh = ih * r,   /// new prop. height
        cx, cy, cw, ch, ar = 1;

    /// decide which gap to fill    
    if (nw < w) ar = w / nw;
    if (nh < h) ar = h / nh;
    nw *= ar;
    nh *= ar;

    /// calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    /// make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    /// fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

function setImage(newLocation) {
    // context.drawImage(images[newLocation], 0, 0, 1280, 720);
    drawImageProp(ctx, images[newLocation], 0, 0, canvas.width, canvas.height);
}

function setInitialImage() {
    // this should be merged in with the class or utilize the class...
    let originalimg = new Image;
    originalimg.src = 'img/frames-large/iStock_61726614_HD_10800000.jpg';
    // context.drawImage(images[newLocation], 0, 0, 1280, 720);
    drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height);
}

function draw() {
    drawImageProp(ctx, this, 0, 0, canvas.width, canvas.height);
}

updatePage = function() {
    if (scrolling === true) {
        scrollTop = $window.scrollTop();
        if (scrollTop > videoScrollStart && scrollTop) {
            currentImage = (scrollTop-videoScrollStart) * 0.15;
            roundedCurrentImage = currentImage.toFixed(0);
            if (roundedCurrentImage < 351) {
                setImage(currentImage.toFixed(0));
            }
        } else {
            setInitialImage();
        }
    }
}