var cameraType = false;

$(function(){
    $(window).on('scroll', function () {
        $('#RT').css('top', $(this).scrollTop() + 150 + 'px' );
        // if($(this).scrollTop() >= 120){
        //     $('.result.ok').addClass('fixed');
        //     $('.result.ok').css('top', $(this).scrollTop() + 150 + 'px' );
        // }else {
        //     $('.result').removeClass('fixed');
        //     $('.result').css('top', '150px' );
        // }
    });
});

function dev_func_camera(obj) {
    toggleCameramode();
    var clone_item = $(obj).parents('.itemSlide'),
        item_href = clone_item.find('.href-a').attr('href'),
        gid_where = item_href.indexOf('pid=')+4,
        cid_where = item_href.indexOf('cid=')+4,
        item_gid = parseInt(item_href.substr(gid_where, 7)),
        item_cid = parseInt(item_href.substr(cid_where, 6));
    // alert(gid_where+','+cid_where);
    // alert(item_href+" .gid:" + item_gid + " .cid:" + item_cid);
    $('#categ_code').val(item_cid);
    GLOBAL_gid = item_gid;
    $('#setting-gid').val(item_gid);
    document.cookie = "uid=" + item_cid;
    document.cookie = "gid=" + item_gid;
    $('#now-item').html(clone_item.html());
    try_it(true, true);
    $(document).scrollTop(0);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var url =  e.target.result;
            $('#OI').attr('src', url);
            $('#RTI').attr('src', url);
            cameraType = false;
            toggleCameramode();
        }

        reader.readAsDataURL(input.files[0]);
        $('.camera-container, .preloader').removeClass('off');

        setTimeout(function(){
            $('.preloader').addClass('off');
            try_it(true, true);
        }, 3000);
    }
}

function skipCameraMode() {
    if(cameraType){
        $(window).scrollTop(0);
        cameraType = false;
        WADBack = $('#WAD').html();
        $('.result.ok').css({'top': '150px', 'transition': '0s all'});
        var eTop = $('#HF').offset().top; //get the offset top of the element
        var HF = $('#HF').clone();
        console.log(eTop, HF);
        HF.attr({'id': '#HFI'}).css({'right': '95px', 'top': eTop - $(window).scrollTop(), 'position': 'fixed', 'z-index': '10000' });
        HF.on('click', function(){
            $('#WAD').html(WADBack);
            cameraType = true;
            toggleCameramode();
            $(window).scrollTop(0);
            $('.result.ok').css({'opacity': '1', 'transition': '.4s all cubic-bezier(.58,.26,.77,.62)'});
            HF.remove();
            $('.tag-each-one').each(function(){
                addEvent($(this));
            });
            $('#swipe, .selected, not-select').on('touchstart touchmove', function(e){
                e.stopPropagation();
            })

            $('#swipe, .selected, not-select').swipe({
                swipe:function(event, direction, distance, duration, fingerCount)
                {
                    var swipe = $('#swipe');
                    data = swipe.attr('swipe-data');

                    if(direction === "down"){
                        swipeToggle(0);
                    }else if (direction === "up") {
                        if(data == 0){
                            swipeToggle(1);
                        }else if (data == 1) {
                            swipeToggle(2);
                        }
                    }
                }
            });
        });
        HF.prependTo('body');
        TweenMax.to(HF, 2, {top: '95%', 'right': '20px', 'opacity': '.5', ease: Power4.easeIn});
        TweenMax.to($('.result.ok'), .5, {opacity: 0});
        toggleCameramode();
    }
}

function toggleCameramode(){
    if(!cameraType){
        cameraType = true;
        $('.result-container').addClass('off');
        $('.whole-ad-camera').removeClass('off');
        // $('#setting-gid').val('6127210');
        // $('.camera-container').addClass('small').removeClass('off');
        // $('.now-item-title').text('您所拍攝的商品');
        // $('.result.ok').css({'top': '150px'});
    }else {
        cameraType = false;
        $('#RT').addClass('on');
        $('.result-container').removeClass('off');
        $('.whole-ad-camera').addClass('off');
        // $('#setting-gid').val('');
        // $('.camera-container').removeClass('small').addClass('off');
        // $('.now-item-title').text('現在觀看商品');
        // setTimeout(function(){
        //     $('.result-container').addClass('off');
        // },500);
    }
}

function takePhoto(){
    event.preventDefault();
    $('#TC').trigger('click');
    $(window).scrollTop(0);
}