/**
 * Created by surgeStudio on 17/5/18.
 */
function advenced_func(a){
    if (a == '1'){
        $('#right-tab-1').removeClass('btn-default').addClass('btn-primary');
        $('#right-tab-2').removeClass('btn-primary').addClass('btn-default');
        $('#recomd_result').show();
        $('#api_ele').hide();
        $('#advenced-option-title').text("HERE is for printing recomd's result");
    }
    else if(a == '2'){
        $('#right-tab-2').removeClass('btn-default').addClass('btn-primary');
        $('#right-tab-1').removeClass('btn-primary').addClass('btn-default');
        $('#recomd_result').hide();
        $('#api_ele').show();
        $('#advenced-option-title').text("API 參數格式");
    }
}

function rwd_func(){
    var w_w = $(window).width();
    if(w_w < 768){
        $('.filter-btn').css({'font-size':'24px'});
    }
    else if(w_w >= 768 && w_w<=992){
        $('.filter-btn').css({'font-size':'24px'});
    }
    else if(w_w >= 992 && w_w<=1200){
        $('.filter-btn').css({'font-size':'24px'});
    }
    else if(w_w > 1200){
        $('.filter-btn').css({'font-size':'18px'});
    }
}

function filter_func(e) {
    setTimeout(try_it, 1000);
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

function codepen_click() {
    var token = document.getElementById("token").value;
    var rec_type = $('input[name="rec_type"]:checked').val();
    var rec_pos = $('input[name="rec_pos"]:checked').val();
    var uid = document.getElementById("uid").value;
    var gid = document.getElementById("gid").value;
    var categ_code = document.getElementById("categ_code").value;
    var device =$('input[name="device"]:checked').val();
    var topk = document.getElementById("topk").value;
    var showItems = document.getElementById("showItems").value;
    var scrollItems = document.getElementById("scrollItems").value;
    var loop = document.getElementById("loop").checked;

    var btn_color =  $('#btn-color').css('background-color'),
        bg_color = $('#bg-color').css('background-color'),
        title_color = $('#title-color').css('background-color'),
        price_color = $('#price-color').css('background-color'),
        title_size = $('#title-size').val(),
        price_size = $('#price-size').val(),
        price_sign_color = $(' #price-sign-color').css('background-color'),
        price_sign_size = $(' #price-sign-size').val();

    //-------------------2017/06/21-------------------------↓↓↓↓↓
    var codepen_title = 'test codepen.',
        codepen_description = 'Hello codepen',
        codepen_html_entities = '&#x3C;link href=&#x22;https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css&#x22; type=&#x22;text/css&#x22; rel=&#x22;stylesheet&#x22;&#x3E;\n&#x3C;link rel=&#x22;stylesheet&#x22; href=&#x22;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&#x22;&#x3E;\n&#x3C;link rel=&#x22;stylesheet&#x22; href=&#x22;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css&#x22;&#x3E;\n &#x3C;link href=&#x22;https://kenwheeler.github.io/slick/slick/slick.css&#x22; type=&#x22;text/css&#x22; rel=&#x22;stylesheet&#x22;&#x3E;\n &#x3C;link href=&#x22;https://kenwheeler.github.io/slick/slick/slick-theme.css&#x22; type=&#x22;text/css&#x22; rel=&#x22;stylesheet&#x22;&#x3E;\n\n &#x3C;script src=&#x22;https://code.jquery.com/jquery-3.2.1.min.js&#x22; type=&#x22;text/javascript&#x22;&#x3E;&#x3C;/script&#x3E;\n &#x3C;script src=&#x22;https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js&#x22; type=&#x22;text/javascript&#x22;&#x3E;&#x3C;/script&#x3E;\n &#x3C;script src=&#x22;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js&#x22;&#x3E;&#x3C;/script&#x3E;\n &#x3C;script src=&#x22;//code.jquery.com/jquery-migrate-1.2.1.min.js&#x22; type=&#x22;text/javascript&#x22;&#x3E;&#x3C;/script&#x3E;\n &#x3C;script src=&#x22;https://kenwheeler.github.io/slick/slick/slick.js&#x22; type=&#x22;text/javascript&#x22;&#x3E;&#x3C;/script&#x3E;\n &#x3C;script src=&#x22;https://venraas.github.io/demo/source/venraaspt.min.js&#x22; type=&#x22;text/javascript&#x22;&#x3E;&#x3C;/script&#x3E;\n &#x3C;script src=&#x22;https://clipboardjs.com/dist/clipboard.min.js&#x22; type=&#x22;text/javascript&#x22;&#x3E;&#x3C;/script&#x3E;\n\n\n\n&lt;div class=&quot;slider slick-demo&quot;&gt; &lt;/div&gt; &lt;textarea style=&quot;display: none;&quot; id=&quot;recomd_result&quot; class=&quot;t2&quot;&gt;HERE is for printing recomds result&lt;/textarea&gt;',
        codepen_html = $('<div/>').html(codepen_html_entities).text(),
        codepen_js_entities = "$(function(){\n try_it();\n }); \n\nfunction try_it() {\nvar token = '" + token + "';\n var rec_type = '" + rec_type + "' ;\n var rec_pos = '" + rec_pos + "' ;\n var uid = '" + uid + "' ;\n var gid = '" + gid + "' ;\n var categ_code = '" + categ_code + "' ;\n var device = '" + device + "' ;\n var topk = '" + topk + "' ;\n rowItems = topk;\n showItems = '" + showItems + "';\n scrollItems = '" + scrollItems + "';\n loop = '" + loop + "';\n var recomdParam = {};\n if (token) recomdParam.token = token;\n if (rec_type) recomdParam.rec_type = rec_type;\n if (rec_pos) recomdParam.rec_pos = rec_pos;\n if (uid) recomdParam.uid = uid;\n if (gid) recomdParam.gid = gid;\n if (categ_code) recomdParam.categ_code = categ_code;\n if (device) recomdParam.device = device;\n if (topk) recomdParam.topk = Number(topk);\n console.log(JSON.stringify(recomdParam));\n venraastool.recomd(recomdParam, recomdCallback); \n} \n\nfunction print_rec(jsonStr) { \nvar pretty = JSON.stringify(JSON.parse(jsonStr), null, 2);\n document.getElementById(&quot;recomd_result&quot;).innerHTML = pretty; }\n var rowItems;\n var showItems;\n var scrollItems;\n var loop;\n\nfunction recomdCallback(jsonStr) {\n print_rec(jsonStr);\n var result = JSON.parse(jsonStr);\n if (result.recomd_list != null) { process_slick(result, &quot;slick-demo&quot;, loop, rowItems, showItems, scrollItems); } }\n var bSlick = false;\nfunction process_slick(result, div_class, loop, rowItems, showItems, scrollItems) { \nvar html = &quot;&quot;;\n for (i=0; i&lt;result.recomd_list.length; i++) { html += process_item(result.recomd_list[i].goods_page_url, result.recomd_list[i].goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, result.recomd_list[i].ref_item_list); }\n if (bSlick == true) { $(&quot;.&quot; + div_class).slick(&quot;unslick&quot;);\n $(&quot;.&quot; + div_class).html(&quot;&quot;);\n bSlick = false;\n}\n$(&#x27;.slick-demo&#x27;).css({&#x27;background-color&#x27;:&#x27;" + bg_color + "&#x27;});\n console.log(&quot;loop=&quot; + loop);\n console.log(&quot;rowItems=&quot; + rowItems);\n console.log(&quot;showItems=&quot; + showItems);\n console.log(&quot;scrollItems=&quot; + scrollItems);\n $(&quot;.&quot; + div_class).html(html);\n $(&quot;.&quot; + div_class).slick({\n infinite: Boolean(loop),\n arrows: true,\n prevArrow: &#x27;&#x3C;div class=&#x22;switch-arrow-left&#x22;&#x3E;&#x3C;span class=&#x22;glyphicon glyphicon-menu-left&#x22; style=&#x22;top: 50%;font-size: 36px; transform: translate(0, -50%); color:" + btn_color + ";&#x22;&#x3E;&#x3C;/span&#x3E;&#x3C;/div&#x3E;&#x27;,nextArrow: &#x27;&#x3C;div class=&#x22;switch-arrow-right&#x22;&#x3E;&#x3C;span class=&#x22;glyphicon glyphicon-menu-right&#x22; style=&#x22;top: 50%;font-size: 36px; transform: translate(-4px, -50%); color:" + btn_color + ";&#x22;&#x3E;&#x3C;/span&#x3E;&#x3C;/div&#x3E;&#x27;,\n slidesPerRow: Number(rowItems),\n slidesToShow: Number(showItems),\n slidesToScroll: Number(scrollItems) });\n bSlick = true; \nimg_hint();}\n\n function process_item(addr, img, name, price) { \nvar html = '&lt;div style=&quot;margin:10px;&quot;&gt;';\n html += '&lt;a href=&quot;' + addr + '&quot;&gt;&lt;img src=&quot;' + img + '&quot; style=&quot;width: 100%&quot;&gt;&lt;/a&gt;&lt;div&gt;&lt;span style=&quot;margin: 5px 0;font-size: " + title_size + "px;height: " + parseInt(title_size * 3) + "px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all; color:" + title_color + ";&quot;&gt;' + name + '&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;font-size: " + price_size + "px;font-weight: 900;color:" + price_color + ";text-align:center;&quot;&gt;&lt;span style=&quot;font-weight: normal;font-size: " + price_sign_size + "px;color:" + price_sign_color + ";&quot;&gt;$&lt;/span&gt;' + price + '&lt;/div&gt;&lt;/div&gt;'; \nreturn html; } \n\nfunction img_hint(){\n$(&#x27;.slick-slide&#x27;).each(function () {\nvar temp_img = $(this).find(&#x27;a&#x27;).find(&#x27;img&#x27;),\ntemp_span = $(this).find(&#x27;div:eq(0)&#x27;).find(&#x27;span&#x27;),\ntemp_title = temp_span.text();\ntemp_img.attr(&#x27;title&#x27;,temp_title);\ntemp_span.attr(&#x27;title&#x27;,temp_title);\n})\n}\n",
        codepen_js = $('<div/>').html(codepen_js_entities).text(),
        codepen_css = ' .slick-prev:before, .slick-next:before {\ncolor:white;}\n.slick-demo{\nmargin: 0 50px;}\n.switch-arrow-left{\ntop: 50%; transform: translate(0, -50%); position:absolute; cursor: pointer; left: -40px; width: 30px; height: 100%;}\n.switch-arrow-right{\ntop: 50%; transform: translate(0, -50%); position:absolute; cursor: pointer; right: -40px; width: 30px; height: 100%;}\n.switch-arrow-left:hover , .switch-arrow-right:hover{\nbackground-color: rgba(0,0,0,0.05);}';

    var form=jQuery("<form>").attr({"method":"post","id":"codepen-form","target":"_blank","action":"https://codepen.io/pen/define"}).css("display","none").appendTo("body");

    var field=jQuery("<input>").attr({
        "type":"hidden",
        "name":"data",
        "value":JSON.stringify({
            "title":codepen_title,
            "description":codepen_description,
            "html":codepen_html,
            "js":codepen_js,
            "css":codepen_css,
            "css_external": "",
            "js_external": ""
        })
        //-------------------2017/06/21-------------------------↑↑↑↑↑
    });

    form.append(field).submit();
}

$(function(){
    new Clipboard('.copy-btn');
    $(' #rec_pos_form , #device_form , #advenced_option_form').change(function(){
        try_it();
        if($('#ele').prop('checked') == true) {
            $('#filter-box').show();
        }
        else {
            $('#filter-box').hide();
        }
    });

    $(' #items-form').change(function(){
        show_slick();
    });

    $('input[name="rec_pos"]').change(function(){
        var temp_i = $('input:checked[name="rec_pos"]').val();
        var search1 = $('.glyphicon-search[data-target="#hint-01"]'),search2 = $('.glyphicon-search[data-target="#hint-02"]');

        if ( temp_i == 'p'){
            $('input[name="rec_type"][value="ClickStream"]').prop('checked', true);
            $('#gid , #categ_code').attr({'disabled':'disabled','placeholder':'N/A'}).val('');
            search1.add(search2).hide();
        }
        else if (temp_i == 'cap'){
            $('input[name="rec_type"][value="ClickStream"]').prop('checked', true);
            $('#gid').attr({'disabled':'disabled','placeholder':'N/A'}).val('');
            $('#categ_code').val('328208').attr({'placeholder':'default'}).removeAttr('disabled');
            search1.show();
            search2.hide();
        }
        else if (temp_i = 'gop'){
            $('input[name="rec_type"][value="AlsoView"]').prop('checked', true);
            $('#gid , #categ_code').attr({'placeholder':'default'}).removeAttr('disabled');
            $('#gid').val('5742934');
            $('#categ_code').val('328208');
            search1.add(search2).show();
        }
    });

    //--------

    rwd_func();
    $(window).resize(function(){
        rwd_func();
    });

    //--------

    $("#list1").dragsort({ dragSelector: "div", dragBetween: true, dragEnd: function(){}, placeHolderTemplate: "<li class='placeHolder'><div></div></li>" });
});

function try_it() {
    setTimeout(show_code,500);
    //-- reset result
    document.getElementById("recomd_result").innerHTML = "HERE is for printing recomd's result";

    var token = document.getElementById("token").value;
    var rec_type = $('input[name="rec_type"]:checked').val();
    var rec_pos = $('input[name="rec_pos"]:checked').val();
    var uid = document.getElementById("uid").value;
    var gid = document.getElementById("gid").value;
    var categ_code = document.getElementById("categ_code").value;
    var device =$('input[name="device"]:checked').val();
    var topk = document.getElementById("topk").value;

    rowItems = topk;
    showItems = document.getElementById("showItems").value;
    scrollItems = document.getElementById("scrollItems").value;
    loop = document.getElementById("loop").checked;

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
    console.log(JSON.stringify(recomdParam));

    //-- ajax call for recommendation
    venraastool.recomd(recomdParam, recomdCallback);
    getGoodsInfo();
}

function print_rec(jsonStr) {
    console.log("print_rec");
    var pretty = JSON.stringify(JSON.parse(jsonStr), null, 2);
    document.getElementById("recomd_result").innerHTML = pretty;
}

function print_api() {
    console.log("print_api");
    var token = document.getElementById("token").value;
    var rec_type = $('input[name="rec_type"]:checked').val();
    var topk = document.getElementById("topk").value;
    var uid = document.getElementById("uid").value;
    var rec_pos = $('input[name="rec_pos"]:checked').val();
    var device =$('input[name="device"]:checked').val();
    var categ_code = document.getElementById("categ_code").value;
    var gid = document.getElementById("gid").value;

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
    $('#api_ele').text(contain_text);
}

var rowItems;
var showItems;
var scrollItems;
var loop;
var result;

function recomdCallback(jsonStr) {
    print_rec(jsonStr);
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
        $("." + div_class).slick("unslick");
        $("." + div_class).html("");
        bSlick = false;
    }

    var btn_color =  $('#btn-color').css('background-color'),
        bg_color = $('#bg-color').css('background-color');


    $('.filter-btn').css({'color': btn_color , 'background-color' : '#ffffff' , 'border-color':btn_color});
    $('.filter-btn.act').css({'background-color':  btn_color , 'color':'#ffffff'});

    $('.slick-demo').css({'background-color':bg_color});
    console.log("loop=" + loop);
    console.log("rowItems=" + rowItems);
    console.log("showItems=" + showItems);
    console.log("scrollItems=" + scrollItems);
    $("." + div_class).html(html);
    $("." + div_class).slick({
        infinite: Boolean(loop),
        arrows: true,
        //-------------------2017/06/21-------------------------↓↓↓↓↓
        prevArrow: '<div class="switch-arrow-left"><span class="glyphicon glyphicon-menu-left" style="top: 50%;font-size: 36px; transform: translate(0, -50%); color:' + btn_color + ';"></span></div>',
        nextArrow: '<div class="switch-arrow-right"><span class="glyphicon glyphicon-menu-right" style="top: 50%;font-size: 36px; transform: translate(-4px, -50%); color:' + btn_color + ';"></span></div>',
        //-------------------2017/06/21-------------------------↑↑↑↑↑
        slidesPerRow: Number(rowItems),
        slidesToShow: Number(showItems),
        slidesToScroll: Number(scrollItems)
    });
    bSlick = true;
    img_hint();
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
        title_size = $('#title-size').val(),
        price_size = $('#price-size').val(),
        price_sign_color = $(' #price-sign-color').css('background-color'),
        price_sign_size = $(' #price-sign-size').val();

    var html = '<div style="margin: 0 10px 10px 10px;" hintIndex="' + i + '">';
    html += '<a href="' + addr + '"><img src="' + img + '" style="width: 100%;"><div><span style="margin: 5px 0;font-size: ' + title_size + 'px;height: ' + parseInt(title_size * 3) + 'px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';">' + name + '</span></div><div style="font-size: ' + price_size + 'px;font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + price + '</div></a></div>';

    return html;
}

function getGoodsInfo() {
    var token = document.getElementById("token").value;
    var gid = document.getElementById("gid").value;

    if (gid == '') {
        $('#hint-02 .item-hint-container').html('Oops...<br>此商品編號無對應之商品');
        return;
    }

    var data = {};
    if (token) data["token"] = token;
    if (gid) data["gid"] = gid;

    $.ajax({
        url: "https://apir.venraas.tw/cupid/api/goods/info",
        dataType:'html',
        type: 'GET',
        data: data,
        success: function(msg, status, xhr) {
            console.log(msg);
            var ret = JSON.parse(msg);
            var title_color = $('#title-color').css('background-color'),
                price_color = $('#price-color').css('background-color'),
                title_size = $('#title-size').val(),
                price_size = $('#price-size').val(),
                price_sign_color = $(' #price-sign-color').css('background-color'),
                price_sign_size = $(' #price-sign-size').val();
            var html = '<div style="margin: 0 10px 10px 10px;">';
            html += '<div class="nowSeeBox"><img src="' + ret.goods_img_url + '" style="width: 100%;"><div><span style="white-space:normal;margin: 5px 0;font-size: ' + title_size + 'px;height: ' + parseInt(title_size * 3) + 'px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';">' + ret.goods_name + '</span></div><div style="font-size: ' + price_size + 'px;font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + ret.sale_price + '</div></div></div>';
            $('#hint-02 .item-hint-container').html(html);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("error");
            alert(xhr.status); 
            alert(thrownError); 
        }
    });
}

function show_code(){
    var html_slick = $('.slider').parent().html();
    $('textarea#html_code').val(html_slick);
}

var hint_control_check = true;

$(function(){
    $('#imgHint').change(function(){
        if($(this).is(':checked')){
            hint_control_check = true;
            $('#imgHintPanel').show();
        }else {
            hint_control_check = false;
            $('#imgHintPanel').hide();
        }
    });
});

function img_hint(){
    if(hint_control_check){
        $('.slick-slide').each(function () {
            var temp_slide = $(this),
                temp_img = $(this).find('a').find('img'),
                temp_span = $(this).find('div:eq(0)').find('span'),
                temp_title = temp_span.text(),
                hint_color = $('#hint-color').css('background-color'),
                hint_text_color = $('#hint-text-color').css('background-color'),
                hint_opacity = $('#color-opacity').val(),
                hint_style_choice = $('#hint-style').val(),
                hint_style = [];
                hint_style[1] = '<svg width="30" height="30"><circle cx="20" cy="10" r="9.5" stroke="' + hint_color + '" fill-opacity="0"></circle><text x="17.5" y="16" fill="' + hint_color + '" style="font-size: 16px;font-weight: 700;">i</text></svg>';
                hint_style[2] = '<svg width="30" height="30"><circle cx="20" cy="10" r="10" fill="' + hint_color + '" fill-opacity="' + hint_opacity + '"></circle><text x="17.5" y="16" fill="' + hint_text_color + '" style="font-size: 16px;font-weight: 700;">i</text></svg>';
                hint_style[3] = '<svg width="35" height="35"><polygon points="0,0 35,0 35,35" fill="' + hint_color + '" fill-opacity="' + hint_opacity + '"></polygon><text x="13" y="12" fill="' + hint_text_color + '" style="font-size: 8px;">INFO</text></svg>';

            temp_img.attr('title',temp_title);
            temp_span.attr('title',temp_title);
            temp_slide.css('position','relative');

            $('<div>',{
                class : 'item-info',
                onmouseenter : 'show_hint(this , true);',
                onmouseleave : 'show_hint(this , false);',
                //style : 'border:1px solid ' + hint_color + ';color:' +hint_color+';',
                //text : 'i',
                html : hint_style[hint_style_choice]
                }).prependTo(temp_slide);
        })
    }
}

function show_hint(obj , b) {
    var this_info = $(obj),
        hint = $('.info-hint'),
        coord = this_info.offset(),
        wid = $('.slick-slide').find('a').find('img'),
        setbot = $(window).height() - coord.top;

    wid = wid.css('width');

    var idx = this_info.parent().attr("hintIndex");
    console.log(idx);
    if(b) {
        $("#hint_text").html(hintText[idx]);
        hint.removeClass('display-none').css({'top':'' , 'bottom': setbot + 15 , 'left': coord.left - parseInt(wid) + 32});
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

        $('.info-hint-demo').css({'background-color':hint_color,'color':hint_text_color,'opacity':hint_opacity});
        $('.info-hint').css({'background-color':hint_color,'color':hint_text_color,'opacity':hint_opacity});
        $('.hint-triangle').css({'color':hint_color});
    }
}