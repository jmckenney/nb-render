$(document).ready(function () {
    // var videoScroll = {
    //     frame: 0,
    //     playbackConst: 500,
    //     elements: {
    //         heightBuffer: $('.video-scroll-buffer')[0],
    //         video: $('video')[0]
    //     }
    // };
    // videoScroll.scrollPlay = function() {
    //     videoScroll.frame = $(window).scrollTop() / videoScroll.playbackConst;
    //     videoScroll.elements.video.currentTime = videoScroll.frame;
    //     window.requestAnimationFrame(videoScroll.scrollPlay);
    // }
    // videoScroll.elements.video.addEventListener('loadedmetadata', function() {
    //     $(videoScroll.elements.heightBuffer).css({
    //         height: Math.floor(videoScroll.elements.video.duration) * videoScroll.playbackConst + 'px'
    //     });
    // });
    // window.requestAnimationFrame(videoScroll.scrollPlay);
    var frame = 0, playbackConst = 500, heightBuffer = $('.video-scroll-buffer')[0], vid = $('video')[0];
    $(heightBuffer).css({
        height: Math.floor(vid.duration) * playbackConst + 'px'
    });
    var scrollplay = function () {
        frame = window.pageYOffset / playbackConst;
        vid.currentTime = frame;
        window.requestAnimationFrame(scrollplay);
    };
    window.requestAnimationFrame(scrollplay);
});
//# sourceMappingURL=scripts.js.map