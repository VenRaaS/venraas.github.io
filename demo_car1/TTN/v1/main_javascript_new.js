/**
 * Created by surgeStudio on 17/5/18.
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var GLOBAL_url = window.location.href;
if(GLOBAL_url.indexOf('gid') > -1){
    var gid_where = GLOBAL_url.indexOf('gid=')+4,
    cid_where = GLOBAL_url.indexOf('cid=')+4,
    item_gid = parseInt(GLOBAL_url.substr(gid_where, 7)),
    item_cid = parseInt(GLOBAL_url.substr(cid_where, 6));

    GLOBAL_gid = item_gid;
    GLOBAL_cid = item_cid;

    $('#categ_code').val(item_cid);
    $('#setting-gid').val(item_gid);

    document.cookie = "uid=" + item_cid;
    document.cookie = "gid=" + item_gid;
}else{
    if(getCookie('gid').length != 0){
        var GLOBAL_gid = getCookie('gid');
        var GLOBAL_cid = getCookie('cid');
    }
    else{
        var GLOBAL_gid = '5742934';
        var GLOBAL_cid = '328208';
    }
    
}

var target;

function touches(e){
    var x = e.touches ? e.touches[0].clientX : e.clientX,
        y = e.touches ? e.touches[0].clientY : e.clientY;
    TweenMax.to(target, 0, {
        top: y-20,
        left: x-50
    });
}


function swipeToggle(tar){
    var swipe = $('#swipe');
    var height = $('.selected').height();
    var changeTo, bottom;
    if(tar == 2){
        changeTo =  'translateY(0)';
        bottom = 0;
    }else if(tar == 1){
        changeTo =  'translateY(calc(100% - 7.5rem))';
        bottom = '8rem';
    }else if(tar == 0){
        changeTo =  'translateY(100%)';
        bottom = '8rem';
    }
    swipe.css({'transform': changeTo, 'bottom': bottom});
    swipe.attr('swipe-data', tar);
}

function addEvent(obj){
    $(obj).on('click', function(){
        var target = $(this);
        var copyOne = target.clone();
        // var limit = $('.selected').children().length;
        if(copyOne.hasClass('on')){
            copyOne.removeClass('on');
            nameSelect(target);
            $('.not-select').prepend(copyOne);
            target.remove();
            addEvent(copyOne);
            // }else if(!copyOne.hasClass('on') && limit <= 7){
        }else if(!copyOne.hasClass('on')){
            copyOne.addClass('on');
            $('.selected').prepend(copyOne);
            if($('.selected').height() >= 240){
                copyOne.remove();
                overHintSet($('.not-select'));
            }else{
                nameSelect(target);
                target.remove();
                addEvent(copyOne);
            }
        }
    });
}

function filter_func(e) {
    setTimeout(try_it(true, true), 1000);
    if($(e).attr('class').indexOf('act') > 0){
        $(e).removeClass('act');
        var heart = $(e).find('.glyphicon-heart');
        heart.removeClass('glyphicon-heart').addClass('glyphicon-heart-empty');
    }
    else{
        $(e).addClass('act');
        var heart = $(e).find('.glyphicon-heart-empty');
        heart.removeClass('glyphicon-heart-empty').addClass('glyphicon-heart');
    }
}

$(function(){
    $('.glyphicon-search').on('click',function(event){
        event.stopPropagation();
        var left = event.pageX,
            top = event.pageY,
            scrollTop = $(window).scrollTop(),
            targetName = $(this).attr('data-target'),
            target = $(targetName);
        if (targetName.indexOf('03')>=0 || targetName.indexOf('04')>=0){
            $('.item-hint').css({"z-index":2});
            target.show(200).css({'left':left - 100,'top':top - scrollTop - 300,'z-index':3});
        }else {
            $('.item-hint').css({"z-index": 2});
            target.show(200).css({'left': left + 100, 'top': top - scrollTop - 300, 'z-index': 3});
        }
    });
    $('.item-hint')
        .on('mousedown','.item-hint-header', function(){
            event.stopPropagation();
            target = $(this).attr('data-target');
            target = $(target);
            $('.item-hint').css({"z-index":2});
            target.css({"z-index":3});
            window.addEventListener("mousemove", touches ,false);
            $('body').css({'user-select':'none'});
        })
        .on('mouseup','.item-hint-header',function(){
            window.removeEventListener("mousemove" , touches , false);
            $('body').css({'user-select':'initial'});
        })
        .on('click','.glyphicon-remove',function(){
            event.stopPropagation();
            target = $(this).attr('data-target');
            target = $(target);
            target.hide(200);
        })
        .on('click','.item-hint-container',function(){
            event.stopPropagation();
            target = $(this).attr('data-target');
            target = $(target);
            $('.item-hint').css({"z-index":2});
            target.css({"z-index":3});
        });

    setTimeout(trigger_btn,1000);
    setTimeout(trigger_btn,2000);

    function trigger_btn() {
        $('.switch-arrow-right').trigger('click');
    }

    $('#swipe, .selected, not-select').on('touchstart touchmove', function(e){
        e.stopPropagation();
    })

    $('#swipe').swipe({
        swipeStatus:function(event, phase, direction, distance)
        {
            if(direction == "left"){
                $('#swipe').scrollLeft += 1;
            }else if (direction == "right") {
                $('#swipe').scrollLeft -= 1;
            }
        },
        triggerOnTouchEnd:false,
        threshold:100
    });

    $('.tag-each-one').on('click', function(){
        var target = $(this);
        var copyOne = target.clone();
        // var limit = $('.selected').children().length;
        if(copyOne.hasClass('on')){
            copyOne.removeClass('on');
            nameSelect(target);
            $('.not-select').prepend(copyOne);
            target.remove();
            addEvent(copyOne);
            // }else if(!copyOne.hasClass('on') && limit <= 7){
        }else if(!copyOne.hasClass('on')){
            $('.selected').prepend(copyOne);
            if($('.selected').height() >= 240){
                copyOne.remove();
                overHintSet($('.not-select'));
            }else{
                copyOne.addClass('on');
                nameSelect(target);
                target.remove();
                addEvent(copyOne);
            }
        }
    });

    $(' #rec_pos_form , #device_form , #advenced_option_form').change(function(){
        document.cookie = "uid=" + document.getElementById("uid").value;
        document.cookie = "gid=" + document.getElementById("gid").value;
        try_it(true, true);
        if($('#ele').prop('checked') == true) {
            $('#filter-box').show();
        }
        else {
            $('#filter-box').hide();
        }
    });

    $('#mobile-settings').on('change', function(){
        document.cookie = "uid=" + document.getElementById("categ_code").value;
        document.cookie = "gid=" + document.getElementById("setting-gid").value;
    });

    $(' #items-form').change(function(){
        show_slick();
    });

    var nowInput, nowVal;
    $('#setting-gid, #categ_code').on('focusin', function(){
        nowInput = $(this);
        nowVal = nowInput.val();
        nowInput.select();
        nowInput.on('blur', function(){
            if($(this).val().length == 0){
                nowInput.val(nowVal);
            }
        });
    });

    $('input[name="rec_pos"]').change(function(){
        var temp_i = $('input:checked[name="rec_pos"]').val();
        var search1 = $('.glyphicon-search[data-target="#hint-01"]'),search2 = $('.glyphicon-search[data-target="#hint-02"]');

        if ( temp_i == 'p'){
            $('input[name="rec_type"][value="ClickStream"]').prop('checked', true);
            $('#gid , #categ_code').attr({'disabled':'disabled','placeholder':'N/A'}).val('');
            search1.add(search2).hide();
            $('#hint-02 .glyphicon-remove').trigger('click');
            $('#hint-01 .glyphicon-remove').trigger('click');
        }
        else if (temp_i == 'cap') {
            $('input[name="rec_type"][value="ClickStream"]').prop('checked', true);
            $('#gid').attr({'disabled':'disabled','placeholder':'N/A'}).val('');
            $('#categ_code').val('328208').attr({'placeholder':'default'}).removeAttr('disabled');
            search1.show();
            search2.hide();
            $('#hint-02 .glyphicon-remove').trigger('click');
        }
        else if (temp_i = 'gop') {
            $('input[name="rec_type"][value="AlsoView"]').prop('checked', true);
            $('#gid , #categ_code').attr({'placeholder':'default'}).removeAttr('disabled');
            $('#gid').val('5742934');
            $('#categ_code').val('328208');
            search1.add(search2).show();
        }
    });
});

function overHintSet(obj){
    var target = $(obj);
    var overHint = $('<div/>', {
        class: 'over-hint'
    });

    target.append(overHint);
    TweenMax.to(overHint, .5, {opacity: 1, repeat: 1, repeatDelay: .5, yoyo: true, onComplete: function(){
            overHint.remove();
        }});
    // setTimeout(function(){
    //     overHint.remove();
    //     },2000);
}

// *****TAGS*****

var goodsKeywords = null;//stored goods_keywords
var selectedGoodsKeywords = [];//for selected goods_keyword
var goods_keywords = [];//for recomd
function getGoodsKeyword() {
    console.log("getGoodsKeyword()");
    var p = {};
    p.token = document.getElementById("token").value;
    
    if (! document.getElementById("setting-gid").value){
        // document.getElementById("gid").value = p.gid;
        document.getElementById("setting-gid").value = '5742934';
    }

    if (! document.getElementById("categ_code").value) {
        document.getElementById("categ_code").value = '328208';
    }

    p.gid = (document.getElementById("setting-gid").value) ? document.getElementById("setting-gid").value : GLOBAL_gid;
    document.getElementById("setting-gid").value = GLOBAL_gid;

    p.categ_code = (document.getElementById("categ_code").value) ? document.getElementById("categ_code").value : GLOBAL_cid;
    document.getElementById("categ_code").value = GLOBAL_cid;

    //-- ajax call for goods keywords
    console.log(JSON.stringify(p));
    venraastool.goods_keywords(p, goodsKeywordsCallback);
}

function goodsKeywordsCallback(jsonStr) {
    console.log(jsonStr);
    var result = JSON.parse(jsonStr);
    if (result.goods_keywords) {
        var htmlStr = '<div id="tagON"></div>';
        goodsKeywords = result.goods_keywords;
        selectedGoodsKeywords = [];
        for (i=0; i<goodsKeywords.length; i++) {
            selectedGoodsKeywords[i] = false;
            htmlStr += '<div class="name off" id="F' + i + '" order="' + i + '">' + goodsKeywords[i].value + '</div>';
        }
        if (!htmlStr) {
            document.getElementById("FT").classList.add('display-none');
        }
        else {
            document.getElementById("FT").classList.remove('display-none');
        }
        document.getElementById("FT").innerHTML = htmlStr;

        //$('.tags-area').overscroll();

        $('.name').each(function(){
            var star = $('<div/>',{
                class : "star-icon"
            }).prependTo(this);
            TweenMax.set(star, {width:0});
        }).on('click', nameSelect);
    }
}

var targetTag = '', enterTag = '', cloneTag = '', moveIcon = '';
function nameMove(event){
    targetTag = $(this);
    cloneTag = targetTag.clone();
    moveIcon = $('.move-icon').css({'left': event.pageX + 15, 'top': event.pageY + 15});
    var timer = setTimeout(function(){
        moveIcon.show();
        $(document).on('mousemove',function(event) {
            moveIcon.css({'left': event.pageX + 15, 'top': event.pageY + 15});
        });
        $('#tagON').on('mouseenter', '.name', function(){
            $(this).css({'border-left': '10px solid rgba(0,0,0,0.3)', 'padding-left': '10px'}).addClass('enter');
        }).on('mouseleave', '.name', function(){
            $(this).css({'border-left': 'none', 'padding-left': '0'}).removeClass('enter');
        });
        $('.off').eq(0).on('mouseenter', function(){
            $(this).css({'border-left': '10px solid rgba(0,0,0,0.3)', 'padding-left': '10px'}).addClass('last');
        }).on('mouseleave', function(){
            $(this).css({'border-left': 'none', 'padding-left': '0'}).removeClass('last');
        });
    },100);
    $(window).on('mouseup', function(){
        moveIcon.hide();
        $(document).off('mousemove');
        clearTimeout(timer);
        if($('#tagON').find('.enter').length > 0){
            $('#tagON').off('mouseenter', '.name').off('mouseleave', '.name');
            $('.name').css({'border-left': 'none', 'padding-left': '0'});
            cloneTag.insertBefore('.enter').on({'click': nameSelect, 'mousedown': nameMove});;
            targetTag.remove();
            $('.enter').removeClass('enter');
            // for(var i = 0; i < $('#tagON .on').length; i++){
            //   $("#tagON .on").eq(i).attr('order', i);
            // }
        }else if($('#FT').find('.last').length > 0 ){
            $('#tagON').off('mouseenter', '.name').off('mouseleave', '.name');
            $('.off').off('mouseenter').off('mouseleave');
            $('.name').css({'border-left': 'none', 'padding-left': '0'});
            cloneTag.appendTo('#tagON').on({'click': nameSelect, 'mousedown': nameMove});;
            targetTag.remove();
            $('.last').removeClass('last');
        }else{
            $('#tagON').off('mouseenter', '.name').off('mouseleave', '.name');
            $('.off').off('mouseenter').off('mouseleave');
            $('.name').css({'border-left': 'none', 'padding-left': '0'});
        }
    });
}
function nameSelect() {
    console.log("nameSelect");
    var target = $(this);
    var star = target.find('.star-icon');
    var order = target.attr('order');
    var cloneTarget = '';
    if (target.hasClass('off')) {
        selectedGoodsKeywords[order] = true;
        target.removeClass('off').addClass('on');
        cloneTarget = target.clone().appendTo('#tagON');
        star = cloneTarget.find('.star-icon');
        target.remove();
        TweenMax.to(cloneTarget, 0.08, {scale:0.8, yoyo:true, repeat:1, onComplete:function(){
          var scrollAmount = $('#tagON').width() - cloneTarget.width() - 50;
          scrollAmount < 0 ? scrollAmount = 0 : scrollAmount = scrollAmount;
          tagsScroller(scrollAmount);
        }});
        TweenMax.set(star, {width:'3rem', scale:1, opacity:1});
        TweenMax.from(star, 0.5, {width:'0px', scale:2, opacity:0, ease:Back.easeOut.config(2)});
        $(cloneTarget).on({'click': nameSelect, 'mousedown': nameMove});
        $('#swipe').scrollLeft(0);
    }
    else {
        selectedGoodsKeywords[order] = false;
        TweenMax.to(star,0.5, {width:'0px', scale:0, opacity:0});
        TweenMax.to(target, 0.3, {scale:1.2, opacity:0, bottom:'5px', onComplete:function () {
            cloneTarget = target.clone().insertAfter('#tagON');
            target.remove();
            cloneTarget.removeClass('on').addClass('off');
            TweenMax.set(cloneTarget, {scale:1, opacity:1, bottom:''});
            TweenMax.from(cloneTarget, 0.2, {opacity:0});
            $(cloneTarget).on('click', nameSelect);
            }}
        )
    }
    goods_keywords = [];
    for (i=0; i<goodsKeywords.length; i++) {
        if (selectedGoodsKeywords[i] == true) {
            goods_keywords.push(goodsKeywords[i]);
        }
    }
    try_it(false, false);

    // 選取TAG自動滾到 "您可能會喜歡"
    $(window).scrollTop($('#now-item').height() + 160);
}

// *****TAGS*****

function try_it(bGoodsKeywords, bGoodsInfo) {
    console.log("try_it(): bGoodsKeywords=" + bGoodsKeywords + ", bGoodsInfo=" + bGoodsInfo);
    setTimeout(show_code,500);
    //-- reset result
    document.getElementById("recomd_result").innerHTML = "HERE is for printing recomd's result";

    var token = document.getElementById("token").value;
    var rec_type = $('input[name="setting-rec_type"]:checked').val();
    var rec_pos = $('input[name="rec_pos"]:checked').val();
    var uid = document.getElementById("uid").value;
    var gid = (document.getElementById("setting-gid").value) ? document.getElementById("setting-gid").value : GLOBAL_gid;
    var categ_code = document.getElementById("categ_code").value;
    var device = $('input[name="device"]:checked').val();
    var topk = (document.getElementById("setting-topk").value) ? document.getElementById("setting-topk").value : '10';

    rowItems = topk;
    showItems = $("#showItems").val();//document.getElementById("showItems").value;
    scrollItems = $("#scrollItems").val();//document.getElementById("scrollItems").value;
    loop = document.getElementById("loop").checked;
    console.log("rowItems=" + rowItems);
    console.log("showItems=" + showItems);
    console.log("scrollItems=" + scrollItems);
    console.log("loop=" + loop);

    //-- recommentation parameter with JSON form, e.g. https://github.com/VenRaaS/venraas-user-guide/wiki/Recommendation-Request-(Rec-API)#user-content-examples---post-with-json-form
    var recomdParam = {};
    if (token) recomdParam.token = token;
    if (rec_type) recomdParam.rec_type = rec_type;
    if (rec_pos) recomdParam.rec_pos = rec_pos;
    if (uid) recomdParam.uid = uid;
    if (gid) recomdParam.gid = gid;
    if (categ_code) recomdParam.categ_code = categ_code;
    if (device) recomdParam.device = device;
    if (topk) recomdParam.topk = Number(topk);
    if (goods_keywords.length > 0) {
        recomdParam.rec_type = "AlsoView";
        var kw_tag_list = goods_keywords.map(k => { var o=k; o.field="goods_name"; return o; });
        recomdParam.key_tag_list = kw_tag_list;
        recomdParam.goods_keywords = goods_keywords;
        recomdParam.rec_code = "demo_k2i_model_rec_code";
        recomdParam.rec_logic = {"logic_list":[{"logic_name":"CurrentItem","alg_list":[{"model_type":"ttt","weight":1,"alg_name":"K2I_Model","is_random_by_vig":false},{"model_type":"tp","weight":1,"alg_name":"C2I_Model","is_random_by_vig":false}],"weight_of_alg_rec_gids_size":1.5,"sort_by_socre":false},{"logic_name":"WhiteCategory","weight_of_alg_rec_gids_size":1.5},{"logic_name":"GlobalTP"}],"filter_out_last_7_day_bought_items":true,"filter_out_last_60_unfav_items":true};
    }
    console.log(JSON.stringify(recomdParam));

    //-- ajax call for recommendation
    venraastool.recomd(recomdParam, recomdCallback);
    if (bGoodsKeywords == true) {
        getGoodsKeyword();
    }
    if (bGoodsInfo = true) {
        getGoodsInfo();
    }
}

function print_rec(jsonStr) {
    console.log("print_rec");
    var pretty = JSON.stringify(JSON.parse(jsonStr), null, 2);
    document.getElementById("recomd_result").innerHTML = pretty;
    document.getElementById("recomd_result_pop").innerHTML = pretty;
}

function print_api() {
    console.log("print_api");
    var token = document.getElementById("token").value;
    var rec_type = $('input[name="setting-rec_type"]:checked').val();
    var topk = document.getElementById("topk").value;
    var uid = document.getElementById("uid").value;
    var rec_pos = $('input[name="rec_pos"]:checked').val();
    var device =$('input[name="device"]:checked').val();
    var categ_code = document.getElementById("categ_code").value;
    var gid = document.getElementById("setting-gid").value;

    var contain_text_entities = '{';
    if (token) contain_text_entities += '\n\t"token": "' + token + '"';
    if (rec_type) contain_text_entities += ',\n\t"rec_type": "' + rec_type + '"';
    if (topk) contain_text_entities += ',\n\t"topk": "' + topk + '"';
    if (uid) contain_text_entities += ',\n\t"device": "' + device + '"';
    if (rec_pos) contain_text_entities += ',\n\t"rec_pos": "' + rec_pos + '"';
    if (device) contain_text_entities += ',\n\t"device": "' + device + '"';
    if (categ_code) contain_text_entities += ',\n\t"categ_code": "' + categ_code + '"';
    if (gid) contain_text_entities += ',\n\t"gid": "' + gid + '"';
    contain_text_entities += '\n}';

    var contain_text = $('<div/>').html(contain_text_entities).text();
    $('#api_ele , #api_ele_pop').text(contain_text);
}

var rowItems;
var showItems;
var scrollItems;
var loop;
var result;

function recomdCallback(jsonStr) {
    print_rec(jsonStr);
    console.log(jsonStr);
    print_api();
    var tmp_result = JSON.parse(jsonStr);
    if (tmp_result != null) {
        result = tmp_result;
        show_slick();
    }
}

function show_slick() {
    hint_control();
    showItems = document.getElementById("showItems").value;
    scrollItems = document.getElementById("scrollItems").value;
    loop = document.getElementById("loop").checked;
    process_slick(result, "slick-demo", loop, rowItems, showItems, scrollItems);
}

var bSlick = false;
var hintText = [];
function process_slick(result, div_class, loop, rowItems, showItems, scrollItems) {
    console.log("process_slick");
    var html = "";
    hintText = [];
    for (var i=0; i<result.recomd_list.length; i++) {
        html += process_item(result.recomd_list[i].goods_page_url, result.recomd_list[i].goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, i);
        hintText[i] = process_hintText(result.recomd_list[i].ref_item_list, result.recomd_list[i].sales);
    }

    if (bSlick == true) {
        $("." + div_class).html("");
        bSlick = false;
    }

    var btn_color =  $('#btn-color').css('background-color'),
        bg_color = $('#bg-color').css('background-color');

    $('.slick-demo').css({'background-color':bg_color});
    console.log("loop=" + loop);
    console.log("rowItems=" + rowItems);
    console.log("showItems=" + showItems);
    console.log("scrollItems=" + scrollItems);
    $("." + div_class).html(html);
    // $("." + div_class).slick({
    //     infinite: Boolean(loop),
    //     arrows: true,
    //     //-------------------2017/06/21-------------------------↓↓↓↓↓
    //     prevArrow: '<div class="switch-arrow-left"><span class="glyphicon glyphicon-menu-left" style="top: 50%;font-size: 36px; transform: translate(0, -50%); color:' + btn_color + ';"></span></div>',
    //     nextArrow: '<div class="switch-arrow-right"><span class="glyphicon glyphicon-menu-right" style="top: 50%;font-size: 36px; transform: translate(-4px, -50%); color:' + btn_color + ';"></span></div>',
    //     //-------------------2017/06/21-------------------------↑↑↑↑↑
    //     slidesPerRow: Number(rowItems),
    //     slidesToShow: Number(showItems),
    //     slidesToScroll: Number(scrollItems)
    // });
    bSlick = true;
}

/*
 * prevArrow: '<div class="slick-prev" style="height:100%; vertical-align: middle;"><div style="position: absolute; top: 40%; right: 10px;"><svg style="fill:'+ btn_color +';" height="60" width="60"> <polygon points="60,0 30,30 60,60" class="triangle" /> </svg></div></div>',
 * nextArrow: '<div class="slick-next" style="height:100%; vertical-align: middle;"><div style="position: absolute; top: 40%; left: 10px;"><svg style="fill:'+ btn_color +';" height="60" width="60"> <polygon points="0,0 30,30 0,60" class="triangle" /> </svg></div></div>',
 * */

function percentFormat(str, fn) {
    var num = 0;

    if (typeof str == "string") {
        //不是數字就傳回原來的
        if (isNaN(str)) {
            return str;
        }

        num = Number(str);
    }
    else if (typeof str == "number") {
        num = str;
    }
    else {
        return str;
    }

    if (fn == "%") {
        return (num * 100);
    }

    fn1 = fn.substring(1);
    if (isNaN(fn1)) {
        return (num * 100);
    }

    return Number((num * 100).toFixed(Number(fn1)));
}

var ModelType1_ModelType = ["I2I_Model"];
var ModelType1_ModelAlg = ["cooc_i2i", "coocm", "cooc_rank", "cooc_98", "cooc_98v2"];
var ModelType1_MsgContent = "看此商品也看";
var ModelType1_recScoreField = "<div class='p-50'>關聯度</div>";

var ModelType2_ModelType = ["I2I_Model"];
var ModelType2_ModelAlg = ["content_i2i", "content_rank", "content_tp"];
var ModelType2_MsgContent = "近似商品";
var ModelType2_recScoreField = "<div class='p-50'>相似度</div>";

var ModelType3_ModelType = ["C2I_Model", "CP2I_Model"];
var ModelType3_ModelAlg = ["tp", "tpm"];
var ModelType3_MsgContent = "本類HOT";
var ModelType3_recScoreField = "<div class='p-50'>熱門度</div>";
var ModelType3_recScoreField2 = "<div class='p-50'>近30日銷量</div>";

var ModelType4_ModelType = ["GlobalTP_Major", "GlobalTP_Minor"];
var ModelType4_ModelAlg = ["tp"];
var ModelType4_MsgContent = "全站HOT";
var ModelType4_recScoreField = "<div class='p-50'>熱門度</div>";
var ModelType4_recScoreField2 = "<div class='p-50'>近30日銷量</div>";

var ModelType5_ModelType = ["CS_ITEM"];
var ModelType5_ModelAlg = [""];
var ModelType5_MsgContent = "您最近看過";

var ModelType6_MsgContent = "特別推薦";
var ModelType6_recScoreField = "<div class='p-50'>推薦度</div>";

function process_hintText(ref_item_list, sales) {
    if (ref_item_list == null) {
        return "";
    }
    if (ref_item_list.length < 1) {
        return "";
    }

    for (var i=0; i<ref_item_list.length; i++) {
        for (var j=0; j<ModelType1_ModelType.length; j++) {
            if (ref_item_list[i].model_type == ModelType1_ModelType[j]) {
                for (var k=0; k<ModelType1_ModelAlg.length; k++) {
                    if (ref_item_list[i].model_alg == ModelType1_ModelAlg[k]) {
                        var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : "";
                        if (score <= 1) {
                            score = percentFormat(score, "%2") + "%";
                        }
                        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + ModelType1_MsgContent + "</div><br>" + ModelType1_recScoreField + score;
                    }
                }
            }
        }
    }
    for (var i=0; i<ref_item_list.length; i++) {
        for (var j=0; j<ModelType2_ModelType.length; j++) {
            if (ref_item_list[i].model_type == ModelType2_ModelType[j]) {
                for (var k=0; k<ModelType2_ModelAlg.length; k++) {
                    if (ref_item_list[i].model_alg == ModelType2_ModelAlg[k]) {
                        var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : "";
                        if (score <= 1) {
                            score = percentFormat(score, "%2") + "%";
                        }
                        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + ModelType2_MsgContent + "</div><br>" + ModelType2_recScoreField + score;
                    }
                }
            }
        }
    }
    for (var i=0; i<ref_item_list.length; i++) {
        for (var j=0; j<ModelType3_ModelType.length; j++) {
            if (ref_item_list[i].model_type == ModelType3_ModelType[j]) {
                for (var k=0; k<ModelType3_ModelAlg.length; k++) {
                    if (ref_item_list[i].model_alg == ModelType3_ModelAlg[k]) {
                        var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : "";
                        if (score <= 1) {
                            score = percentFormat(score, "%2") + "%";
                        }
                        var salesStr = "";
                        if (sales >= 50) {
                            salesStr = "<br>" + ModelType3_recScoreField2 + sales + "件";
                        }
                        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + ModelType3_MsgContent + "</div><br>" + ModelType3_recScoreField + score + salesStr;
                    }
                }
            }
        }
    }
    for (var i=0; i<ref_item_list.length; i++) {
        for (var j=0; j<ModelType4_ModelType.length; j++) {
            if (ref_item_list[i].model_type == ModelType4_ModelType[j]) {
                for (var k=0; k<ModelType4_ModelAlg.length; k++) {
                    if (ref_item_list[i].model_alg == ModelType4_ModelAlg[k]) {
                        var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : "";
                        if (score <= 1) {
                            score = percentFormat(score, "%2") + "%";
                        }
                        var salseStr = "";
                        if (sales >= 50) {
                            salesStr = "<br>" + ModelType4_recScoreField2 + sales + "件";
                        }
                        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + ModelType4_MsgContent + "</div><br>" + ModelType4_recScoreField + score + salesStr;
                    }
                }
            }
        }
    }
    for (var i=0; i<ref_item_list.length; i++) {
        for (var j=0; j<ModelType5_ModelType.length; j++) {
            if (ref_item_list[i].model_type == ModelType5_ModelType[j]) {
                for (var k=0; k<ModelType5_ModelAlg.length; k++) {
                    if (ref_item_list[i].model_alg == ModelType5_ModelAlg[k]) {
                        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + ModelType5_MsgContent + "</div><br>";
                    }
                }
            }
        }
    }

    var score = (ref_item_list[0].score != null) ? ref_item_list[0].score : "";
    if (score <= 1) {
        score = percentFormat(score, "%2") + "%";
    }
    return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + ModelType6_MsgContent + "</div><br>" + ModelType6_recScoreField + score;
}

function process_item(addr, img, name, price, i) {
    var title_color = $('#title-color').css('background-color'),
        price_color = $('#price-color').css('background-color'),
        title_size = '2rem',
        price_size = '3.4rem',
        price_sign_color = $(' #price-sign-color').css('background-color'),
        price_sign_size = '3.4rem';

        var html = '\
        <div class="itemSlide col-6" style="margin-bottom: -2rem; position: relative;" hintIndex="' + i + '">\
            <div style="padding: 2rem;">';
        html += '\
                <div class="slick-num'+ i +'" onclick="dev_func(this)" style="width: 100%; text-align: center;">\
                    <img src="' + img + '" style="width: 100%;" >\
                </div>'
            + '\
                <div style="text-align: left;">\
                    <a class="href-a" target="_blank" href="' + addr + '">\
                        <span style="margin: 5px 0;font-size: ' + title_size + ';height: ' + parseInt(title_size * 3) + ';display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';">' + name + '</span>\
                    </a>\
                </div>\
                <div style="font-size: ' + price_size + ';font-weight: 900;color:' + price_color + ';text-align:left;">\
                    <span style="font-weight: normal;font-size: ' + price_sign_size + '; color:' + price_sign_color + ';">$</span>\
                    <span style="margin-botton: 10px; font-size: ' + price_size + '; color: ' + price_color + '">' + price + '</span>\
                </div>\
            </div>\
        </div>';

    return html;
}

function dev_func(obj) {
    var clone_item = $(obj).parents('.itemSlide'),
        item_href = clone_item.find('.href-a').attr('href'),
        gid_where = item_href.indexOf('pid=')+4,
        cid_where = item_href.indexOf('cid=')+4,
        item_gid = parseInt(item_href.substr(gid_where, 7)),
        item_cid = parseInt(item_href.substr(cid_where, 6));
    // alert(gid_where+','+cid_where);
    // alert(item_href+" .gid:" + item_gid + " .cid:" + item_cid);
    GLOBAL_gid = item_gid;
    GLOBAL_cid = item_cid;
    $('#categ_code').val(item_cid);
    $('#setting-gid').val(item_gid);
    document.cookie = "uid=" + item_cid;
    document.cookie = "gid=" + item_gid;
    // $('#now-item').html(clone_item.html());
    var url = window.location.href;    
        // if (url.indexOf('?') > -1){
        // url += '&param=1';
        // }else{
        // url += '?param=1';
        // }
        if(url.indexOf('?') > -1){
            url = url.substring(0, url.indexOf('?'));
        }
        url += '?gid=' + GLOBAL_gid + '&cid=' + GLOBAL_cid;
        window.location.href = url;
    try_it(true, true);
    $(document).scrollTop(0);
}

function getGoodsInfo() {
    console.log("getGoodsInfo");
    var token = document.getElementById("token").value;
    var gid = document.getElementById("setting-gid").value;
    console.log("\ttoken=" + token);
    console.log("\tgid=" + gid);

    if (gid == '') {
        $('#hint-02 .item-hint-container').html('Oops...<br>此商品編號無對應之商品');
        return;
    }

    var data = {};
    if (token) data["token"] = token;
    if (gid) data["gid"] = gid;

    $.ajax({
        url: "https://apir.venraas.tw/cupid/api/goods/info",
        dataType: 'html',
        type: 'GET',
        data: data,
        success: function(msg, status, xhr) {
            console.log("getGoodsInfo:" + msg);
            var ret = JSON.parse(msg);
            var title_color = $('#title-color').css('background-color'),
                price_color = $('#price-color').css('background-color'),
                title_size = '3rem',
                price_size = '6rem',
                price_sign_color = $(' #price-sign-color').css('background-color'),
                price_sign_size = '3rem';
            var html = '<div style="margin: 0 10px 10px 10px;">';
            html += '<div class="nowSeeBox"><img src="' + ret.goods_img_url + '" style="width: 100%;"><div><span style="white-space:normal;margin: 5px 0;font-size: ' + title_size + 'px;height: ' + parseInt(title_size * 3) + 'px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';">' + ret.goods_name + '</span></div><div style="font-size: ' + price_size + 'px;font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + ret.sale_price + '</div></div></div>';
            $('#hint-02 .item-hint-container').html(html);

            html = '<div style="margin: 0 10px 10px 10px;">';
            html += '<a><img src="' + ret.goods_img_url + '" style="width: 80%; min-width:90px;"></a><div><a class="href-a" target="_blank" href="' + ret.goods_page_url + '"><span style="margin: 5px 0;font-size: ' + title_size + ';height: ' + parseInt(title_size * 3) + ';display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';" title="' +  ret.goods_name + '">' + ret.goods_name + '</span></div><div style="font-size: ' + price_size + ';font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + '; color:' + price_sign_color + ';">$</span>' + ret.sale_price + '</a></div></div>';
            $('#now-item').html(html);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("1:error");
            console.log("2:" + xhr.status);
            console.log("3:" + thrownError);
        }
    });
}

function show_code() {
    var html_slick = $('.slider').parent().html();
    $('textarea#html_code').val(html_slick);
}

var hint_control_check = true;

function show_hint(obj , b) {
    var this_info = $(obj),
        this_slide = this_info.parent('.slick-slide'),
        hint = $('.info-hint'),
        coord = this_slide.offset(),
        a_w = this_info.parent('.slick-slide').width(),
        setbot = $(window).height() - coord.top,
        hint_tri = hint.find('#hint-triangle'),
        right_amount;

    a_w = parseInt(a_w);

    var idx = this_info.parent().attr("hintIndex");
    if (b) {
        $("#hint_text").html(hintText[idx]);
        right_amount = (parseInt(hint.width()) + 18 - a_w)/2;
        hint.removeClass('display-none').css({'min-width': a_w + 20 + 'px' ,'top':'' , 'bottom': setbot + 15 , 'left': coord.left - right_amount });
        hint_tri.css({'right': right_amount - 5});
    }
    else {
        hint.addClass('display-none');
    }
}

function hint_control() {
    if (hint_control_check) {
        var hint_color = $('#hint-color').css('background-color'),
            hint_text_color = $('#hint-text-color').css('background-color'),
            hint_opacity = $('#color-opacity').val();

        $('.info-hint-demo').css({'background-color': hint_color, 'color': hint_text_color, 'opacity': hint_opacity});
        $('.info-hint').css({'background-color': hint_color,'color': hint_text_color, 'opacity': hint_opacity});
        $('#hint-triangle , .hint-triangle , #hint-triangle-demo').css({'color': hint_color});
    }
}
