/**
 * Created by surgeStudio on 17/5/18.
 */
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

function codepen_click_quick() {
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
        price_sign_size = $(' #price-sign-size').val(),
        hint_color = $('#hint-color').css('background-color'),
        hint_text_color = $('#hint-text-color').css('background-color'),
        hint_opacity = $('#color-opacity').val(),
        hint_style_choice = $('#hint-style').val();

    //-------------------2017/06/21-------------------------↓↓↓↓↓
    var codepen_title = '推薦清單',
        codepen_description = '推薦清單呈現結果',
        codepen_html_entities = '&lt;div class=&quot;slider slick-demo&quot;&gt; &lt;/div&gt\n' +
         '&#x3C;script src=&#x22;http://venraas.github.io/demo/main_javascript_bundle.js&#x22;&#x3E;&#x3C;/script&#x3E;',
        codepen_html = $('<div/>').html(codepen_html_entities).text(),
        codepen_js_entities = 'window.onload = function(){try_it({\n'
        + '"token": "'+token+'",\n"rec_type":  "'+rec_type+'",\n"rec_pos": "'+rec_pos+'",\n"uid": "'+uid+'",\n"gid": "'+gid+'",\n"categ_code": "'+categ_code+'",\n"device": "'+device+'",\n"topk": "'+topk+'",\n'
        + '"showItems": "'+showItems+'",\n"scrollItems": "'+scrollItems+'",\n"scrollItems": "'+scrollItems+'",\n"loop": "'+loop+'",\n"btn_color": "'+btn_color+'",\n"bg_color": "'+bg_color+'",\n'
        + '"title_color": "'+title_color+'",\n"price_color": "'+price_color+'",\n"title_size": "'+title_size+'",\n"price_size": "'+price_size+'",\n"price_sign_color": "'+price_sign_color+'",\n'
        + '"price_sign_size": "'+price_sign_size+'",\n"hint_color": "'+hint_color+'",\n"hint_text_color": "'+hint_text_color+'",\n"hint_opacity": "'+hint_opacity+'",\n"hint_style_choice": "'+hint_style_choice+'",\n'
        + '"hint_control_check": '+hint_control_check+'});}',
        codepen_js = $('<div/>').html(codepen_js_entities).text(),
        codepen_css = '';

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
        price_sign_size = $(' #price-sign-size').val(),
        hint_color = $('#hint-color').css('background-color'),
        hint_text_color = $('#hint-text-color').css('background-color'),
        hint_opacity = $('#color-opacity').val(),
        hint_style_choice = $('#hint-style').val();

    //-------------------2017/06/21-------------------------↓↓↓↓↓
    var codepen_title = '推薦清單',
        codepen_description = '推薦清單呈現結果',
        codepen_html_entities = '' +
            '&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://venraas.github.io/demo/source/jquery-ui.min.css&quot;/&gt;\n' +
            '&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://venraas.github.io/demo/source/slick.css&quot;/&gt;\n' +
            '&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://venraas.github.io/demo/source/slick-theme.css&quot;/&gt;\n' +
            '&lt;script src=&quot;https://venraas.github.io/demo/source/jquery.min.js&quot;&gt;&lt;/script&gt;\n' +
            '&lt;script src=&quot;https://venraas.github.io/demo/source/jquery-ui.min.js&quot;&gt;&lt;/script&gt;\n' +
            '&lt;script src=&quot;https://venraas.github.io/demo/source/jquery-migrate.min.js&quot;&gt;&lt;/script&gt;\n' +
            '&lt;script src=&quot;https://venraas.github.io/demo/source/slick.min.js&quot;&gt;&lt;/script&gt;\n' +
            '&lt;script src=&quot;https://venraas.github.io/demo/source/venraaspt.min.js&quot;&gt;&lt;/script&gt;\n' +
            '&lt;script src=&quot;https://venraas.github.io/demo/source/clipboard.min.js&quot;&gt;&lt;/script&gt;\n' +
            '&lt;!--bootstrap--&gt;\n' +
            '&lt;script src=&quot;https://venraas.github.io/demo/source/bootstrap/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;\n' +
            '&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://venraas.github.io/demo/source/bootstrap/css/bootstrap.min.css&quot;&gt;\n' +
            '&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://venraas.github.io/demo/source/bootstrap/css/bootstrap-theme.min.css&quot;/&gt;\n' +
            '\n' +
            '&lt;div class=&quot;info-hint display-none&quot;&gt;\n' +
            '    &lt;div style=&quot;position: relative;&quot;&gt;\n' +
            '        &lt;div id=&quot;hint_text&quot;&gt;&#x63A8;&#x85A6;&#x5EA6;&#xFF1A;95%&lt;br&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&#xFF1A;&#x9867;&#x5BA2;&#x8CB7;&#x4E86;&#x53C8;&#x8CB7;&#xFF01;&lt;/div&gt;\n' +
            '        &lt;span class=&quot;glyphicon glyphicon-triangle-bottom&quot; id=&quot;hint-triangle&quot; &gt;&lt;/span&gt;\n' +
            '    &lt;/div&gt;\n' +
            '&lt;/div&gt;\n' +
            '\n' +
            '&lt;div class=&quot;slider slick-demo&quot;&gt; &lt;/div&gt;\n',
        codepen_html = $('<div/>').html(codepen_html_entities).text(),
        codepen_js_entities = 'var token = &quot;' + token + '&quot;;\n' +
        'var rec_type = &quot;' + rec_type + '&quot;;\n' +
        'var rec_pos = &quot;' + rec_pos + '&quot;;\n' +
        'var uid = &quot;' + uid + '&quot;;\n' +
        'var gid = &quot;' + gid + '&quot;;\n' +
        'var categ_code = &quot;' + categ_code + '&quot;;\n' +
        'var device = &quot;' + device + '&quot;;\n' +
        'var topk = &quot;' + topk + '&quot;;\n' +
        'var rowItems = ' + topk + ';\n' +
        'var showItems = &quot;' + showItems + '&quot;;\n' +
        'var scrollItems = &quot;' + scrollItems + '&quot;;\n' +
        'var loop = &quot;' + loop + '&quot;;\n' +
        'var result;\n' +
        '\n' +
        'var btn_color = &quot;' + btn_color + '&quot;,\n' +
        'bg_color = &quot;' + bg_color + '&quot;,\n' +
        'title_color = &quot;' + title_color + '&quot;,\n' +
        'price_color = &quot;' + price_color + '&quot;,\n' +
        'title_size = &quot;' + title_size + '&quot;,\n' +
        'price_size = &quot;' + price_size + '&quot;,\n' +
        'price_sign_color = &quot;' + price_sign_color + '&quot;,\n' +
        'price_sign_size = &quot;' + price_sign_size + '&quot;,\n' +
        'hint_color = &quot;' + hint_color + '&quot;,\n' +
        'hint_text_color = &quot;' + hint_text_color + '&quot;,\n' +
        'hint_opacity = &quot;' + hint_opacity + '&quot;,\n' +
        'hint_style_choice = &quot;' + hint_style_choice + '&quot;;\n' +
        '\n' +
        'var hint_control_check = ' + hint_control_check + ';\n' +
        '\n' +
        '$(function(){\n' +
        'try_it();\n' +
        '});\n' +
        '\n' +
        '\n' +
        "function try_it() {\n" +
        "var recomdParam = {};\n" +
        "if (token) recomdParam.token = token;\n" +
        "if (rec_type) recomdParam.rec_type = rec_type;\n" +
        "if (rec_pos) recomdParam.rec_pos = rec_pos;\n" +
        "if (uid) recomdParam.uid = uid;\n" +
        "if (gid) recomdParam.gid = gid;\n" +
        "if (categ_code) recomdParam.categ_code = categ_code;\n" +
        "if (device) recomdParam.device = device;\n" +
        "if (topk) recomdParam.topk = Number(topk);\n" +
        "console.log(JSON.stringify(recomdParam));\n" +
        "\n" +
        "//-- ajax call for recommendation\n" +
        "venraastool.recomd(recomdParam, recomdCallback);\n" +
        "}\n" +
        "\n" +
        "function recomdCallback(jsonStr) {\n" +
        "var tmp_result = JSON.parse(jsonStr);\n" +
        "if (tmp_result != null) {\n" +
        "result = tmp_result;\n" +
        "show_slick();\n" +
        "}\n" +
        "}\n" +
        "\n" +
        "function show_slick() {\n" +
        "hint_control();\n" +
        "\n" +
        "process_slick(result, &#x22;slick-demo&#x22;, loop, rowItems, showItems, scrollItems);\n" +
        "}\n" +
        "\n" +
        "var bSlick = false;\n" +
        "var hintText = [];\n" +
        "function process_slick(result, div_class, loop, rowItems, showItems, scrollItems) {\n" +
        "console.log(&#x22;process_slick&#x22;);\n" +
        "var html = &#x22;&#x22;;\n" +
        "hintText = [];\n" +
        "for (var i=0; i&#x3C;result.recomd_list.length; i++) {\n" +
        "html += process_item(result.recomd_list[i].goods_page_url, result.recomd_list[i].goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, i);\n" +
        "hintText[i] = process_hintText(result.recomd_list[i].msg_type, result.recomd_list[i].msg, result.recomd_list[i].msg_score, result.recomd_list[i].sales);\n" +
        "}\n" +
        "\n" +
        "if (bSlick == true) {\n" +
        "$(&#x22;.&#x22; + div_class).slick(&#x22;unslick&#x22;);\n" +
        "$(&#x22;.&#x22; + div_class).html(&#x22;&#x22;);\n" +
        "bSlick = false;\n" +
        "}\n" +
        "\n" +
        "$(&#x27;.filter-btn&#x27;).css({&#x27;color&#x27;: btn_color , &#x27;background-color&#x27; : &#x27;#ffffff&#x27; , &#x27;border-color&#x27;:btn_color});\n" +
        "$(&#x27;.filter-btn.act&#x27;).css({&#x27;background-color&#x27;:  btn_color , &#x27;color&#x27;:&#x27;#ffffff&#x27;});\n" +
        "\n" +
        "$(&#x27;.slick-demo&#x27;).css({&#x27;background-color&#x27;:bg_color});\n" +
        "console.log(&#x22;loop=&#x22; + loop);\n" +
        "console.log(&#x22;rowItems=&#x22; + rowItems);\n" +
        "console.log(&#x22;showItems=&#x22; + showItems);\n" +
        "console.log(&#x22;scrollItems=&#x22; + scrollItems);\n" +
        "$(&#x22;.&#x22; + div_class).html(html);\n" +
        "$(&#x22;.&#x22; + div_class).slick({\n" +
        "infinite: Boolean(loop),\n" +
        "arrows: true,\n" +
        "//-------------------2017/06/21-------------------------&#x2193;&#x2193;&#x2193;&#x2193;&#x2193;\n" +
        "prevArrow: &#x27;&#x3C;div class=&#x22;switch-arrow-left&#x22;&#x3E;&#x3C;span class=&#x22;glyphicon glyphicon-menu-left&#x22; style=&#x22;top: 50%;font-size: 36px; transform: translate(0, -50%); color:&#x27; + btn_color + &#x27;;&#x22;&#x3E;&#x3C;/span&#x3E;&#x3C;/div&#x3E;&#x27;,\n" +
        "nextArrow: &#x27;&#x3C;div class=&#x22;switch-arrow-right&#x22;&#x3E;&#x3C;span class=&#x22;glyphicon glyphicon-menu-right&#x22; style=&#x22;top: 50%;font-size: 36px; transform: translate(-4px, -50%); color:&#x27; + btn_color + &#x27;;&#x22;&#x3E;&#x3C;/span&#x3E;&#x3C;/div&#x3E;&#x27;,\n" +
        "//-------------------2017/06/21-------------------------&#x2191;&#x2191;&#x2191;&#x2191;&#x2191;\n" +
        "slidesPerRow: Number(rowItems),\n" +
        "slidesToShow: Number(showItems),\n" +
        "slidesToScroll: Number(scrollItems)\n" +
        "});\n" +
        "bSlick = true;\n" +
        "img_hint();\n" +
        "}\n" +
        "\n" +
        "function percentFormat(str, fn) {\n" +
        "var num = 0;\n" +
        "\n" +
        "if (typeof str == &#x22;string&#x22;) {\n" +
        "//&#x4E0D;&#x662F;&#x6578;&#x5B57;&#x5C31;&#x50B3;&#x56DE;&#x539F;&#x4F86;&#x7684;\n" +
        "if (isNaN(str)) {\n" +
        "    return str;\n" +
        "}\n" +
        "\n" +
        "num = Number(str);\n" +
        "}\n" +
        "else if (typeof str == &#x22;number&#x22;) {\n" +
        "num = str;\n" +
        "}\n" +
        "else {\n" +
        "return str;\n" +
        "}\n" +
        "\n" +
        "if (fn == &#x22;%&#x22;) {\n" +
        "return (num * 100);\n" +
        "}\n" +
        "\n" +
        "fn1 = fn.substring(1);\n" +
        "if (isNaN(fn1)) {\n" +
        "return (num * 100);\n" +
        "}\n" +
        "\n" +
        "return Number((num * 100).toFixed(Number(fn1)));\n" +
        "}\n" +
        "\n" +
        "//var MsgType1_Msg = &#x22;&#x770B;&#x6B64;&#x5546;&#x54C1;&#x4E5F;&#x770B;&#x22;;\n" +
        "var MsgType1_MsgType = [&#x22;bsim&#x22;];\n" +
        "var MsgType1_recScoreField = &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x95DC;&#x806F;&#x5EA6;&#x3C;/div&#x3E;&#x22;;\n" +
        "\n" +
        "//var MsgType2_Msg = &#x22;&#x8FD1;&#x4F3C;&#x5546;&#x54C1;&#x22;;\n" +
        "var MsgType2_MsgType = [&#x22;csim&#x22;];\n" +
        "var MsgType2_recScoreField = &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x76F8;&#x4F3C;&#x5EA6;&#x3C;/div&#x3E;&#x22;;\n" +
        "\n" +
        "//var MsgType3_Msg = &#x22;&#x672C;&#x985E;HOT&#x22;;\n" +
        "var MsgType3_MsgType = [&#x22;ctp&#x22;];\n" +
        "var MsgType3_recScoreField = &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x71B1;&#x9580;&#x5EA6;&#x3C;/div&#x3E;&#x22;;\n" +
        "var MsgType3_recScoreField2 = &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x8FD1;30&#x65E5;&#x92B7;&#x91CF;&#x3C;/div&#x3E;&#x22;;\n" +
        "\n" +
        "//var MsgType4_Msg = &#x22;&#x5168;&#x7AD9;HOT&#x22;;\n" +
        "var MsgType4_MsgType = [&#x22;gtp&#x22;];\n" +
        "var MsgType4_recScoreField = &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x71B1;&#x9580;&#x5EA6;&#x3C;/div&#x3E;&#x22;;\n" +
        "var MsgType4_recScoreField2 = &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x8FD1;30&#x65E5;&#x92B7;&#x91CF;&#x3C;/div&#x3E;&#x22;;\n" +
        "\n" +
        "//var MsgType5_Msg = &#x22;&#x60A8;&#x6700;&#x8FD1;&#x770B;&#x904E;&#x22;;\n" +
        "var MsgType5_MsgType = [&#x22;cs&#x22;];\n" +
        "\n" +
        "//var MsgType6_Msg = &#x22;&#x7279;&#x5225;&#x63A8;&#x85A6;&#x22;;\n" +
        "var MsgType6_MsgType = [&#x22;etc&#x22;];\n" +
        "var MsgType6_recScoreField = &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x63A8;&#x85A6;&#x5EA6;&#x3C;/div&#x3E;&#x22;;\n" +
        "\n" +
        "function process_hintText(msgType, msg, msgScore, sales) {\n" +
        "//console.log(&#x22;msgType:&#x22; + msgType + &#x22;, msg:&#x22; + msg + &#x22;, msgScore:&#x22; + msgScore + &#x22;, sales:&#x22; + sales);\n" +
        "var score = msgScore;\n" +
        "if (msgScore &#x3C;= 1) {\n" +
        "score = percentFormat(score, &#x22;%2&#x22;) + &#x22;%&#x22;;\n" +
        "}\n" +
        "\n" +
        "if (msgType == MsgType1_MsgType) {\n" +
        "return &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x63A8;&#x85A6;&#x7406;&#x7531;&#x3C;/div&#x3E;&#x3C;div style=&#x27;display: inline-block&#x27;&#x3E;&#x22; + msg + &#x22;&#x3C;/div&#x3E;&#x3C;br&#x3E;&#x22; + MsgType1_recScoreField + score;\n" +
        "}\n" +
        "else if (msgType == MsgType2_MsgType) {\n" +
        "return &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x63A8;&#x85A6;&#x7406;&#x7531;&#x3C;/div&#x3E;&#x3C;div style=&#x27;display: inline-block&#x27;&#x3E;&#x22; + msg + &#x22;&#x3C;/div&#x3E;&#x3C;br&#x3E;&#x22; + MsgType2_recScoreField + score;\n" +
        "}\n" +
        "else if (msgType == MsgType3_MsgType) {\n" +
        "var salesStr = &#x22;&#x22;;\n" +
        "if (sales &#x3E;= 50) {\n" +
        "    salesStr = &#x22;&#x3C;br&#x3E;&#x22; + MsgType3_recScoreField2 + sales + &#x22;&#x4EF6;&#x22;;\n" +
        "}\n" +
        "return &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x63A8;&#x85A6;&#x7406;&#x7531;&#x3C;/div&#x3E;&#x3C;div style=&#x27;display: inline-block&#x27;&#x3E;&#x22; + msg + &#x22;&#x3C;/div&#x3E;&#x3C;br&#x3E;&#x22; + MsgType3_recScoreField + score + salesStr;\n" +
        "}\n" +
        "else if (msgType == MsgType4_MsgType) {\n" +
        "var salesStr = &#x22;&#x22;;\n" +
        "if (sales &#x3E;= 50) {\n" +
        "    salesStr = &#x22;&#x3C;br&#x3E;&#x22; + MsgType4_recScoreField2 + sales + &#x22;&#x4EF6;&#x22;;\n" +
        "}\n" +
        "return &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x63A8;&#x85A6;&#x7406;&#x7531;&#x3C;/div&#x3E;&#x3C;div style=&#x27;display: inline-block&#x27;&#x3E;&#x22; + msg + &#x22;&#x3C;/div&#x3E;&#x3C;br&#x3E;&#x22; + MsgType4_recScoreField + score;\n" +
        "}\n" +
        "else if (msgType == MsgType5_MsgType) {\n" +
        "return &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x63A8;&#x85A6;&#x7406;&#x7531;&#x3C;/div&#x3E;&#x3C;div style=&#x27;display: inline-block&#x27;&#x3E;&#x22; + msg + &#x22;&#x3C;/div&#x3E;&#x3C;br&#x3E;&#x22;;\n" +
        "}\n" +
        "else if (msgType == MsgType6_MsgType) {\n" +
        "return &#x22;&#x3C;div class=&#x27;p-50&#x27;&#x3E;&#x63A8;&#x85A6;&#x7406;&#x7531;&#x3C;/div&#x3E;&#x3C;div style=&#x27;display: inline-block&#x27;&#x3E;&#x22; + msg + &#x22;&#x3C;/div&#x3E;&#x3C;br&#x3E;&#x22; + MsgType6_recScoreField + score;\n" +
        "}\n" +
        "else {\n" +
        "return &#x22;&#x22;;\n" +
        "}\n" +
        "}\n" +
        "\n" +
        "function process_item(addr, img, name, price, i) {\n" +
        "\n" +
        "var html = &#x27;&#x3C;div style=&#x22;margin: 0 10px 10px 10px;&#x22; hintIndex=&#x22;&#x27; + i + &#x27;&#x22;&#x3E;&#x27;;\n" +
        "html += &#x27;&#x3C;a href=&#x22;&#x27; + addr + &#x27;&#x22;&#x3E;&#x3C;img src=&#x22;&#x27; + img + &#x27;&#x22; style=&#x22;width: 100%;&#x22;&#x3E;&#x3C;div&#x3E;&#x3C;span style=&#x22;margin: 5px 0;font-size: &#x27; + title_size + &#x27;px;height: &#x27; + parseInt(title_size * 3) + &#x27;px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:&#x27; + title_color +&#x27;;&#x22;&#x3E;&#x27; + name + &#x27;&#x3C;/span&#x3E;&#x3C;/div&#x3E;&#x3C;div style=&#x22;font-size: &#x27; + price_size + &#x27;px;font-weight: 900;color:&#x27; + price_color + &#x27;;text-align:center;&#x22;&#x3E;&#x3C;span style=&#x22;font-weight: normal;font-size: &#x27; + price_sign_size + &#x27;px; color:&#x27; + price_sign_color + &#x27;;&#x22;&#x3E;$&#x3C;/span&#x3E;&#x27; + price + &#x27;&#x3C;/div&#x3E;&#x3C;/a&#x3E;&#x3C;/div&#x3E;&#x27;;\n" +
        "\n" +
        "return html;\n" +
        "}\n" +
        "\n" +
        "function show_code(){\n" +
        "var html_slick = $(&#x27;.slider&#x27;).parent().html();\n" +
        "$(&#x27;textarea#html_code&#x27;).val(html_slick);\n" +
        "}\n" +
        "\n" +
        "function img_hint(){\n" +
        "if(hint_control_check){\n" +
        "$(&#x27;.slick-slide&#x27;).each(function () {\n" +
        "    var temp_slide = $(this),\n" +
        "        temp_img = $(this).find(&#x27;a&#x27;).find(&#x27;img&#x27;),\n" +
        "        temp_span = $(this).find(&#x27;div:eq(0)&#x27;).find(&#x27;span&#x27;),\n" +
        "        temp_title = temp_span.text(),\n" +
        "        hint_style = [];\n" +
        "        hint_style[1] = &#x27;&#x3C;svg width=&#x22;30&#x22; height=&#x22;30&#x22;&#x3E;&#x3C;circle cx=&#x22;20&#x22; cy=&#x22;10&#x22; r=&#x22;9.5&#x22; stroke=&#x22;&#x27; + hint_color + &#x27;&#x22; fill-opacity=&#x22;0&#x22;&#x3E;&#x3C;/circle&#x3E;&#x3C;text x=&#x22;18&#x22; y=&#x22;16&#x22; fill=&#x22;&#x27; + hint_color + &#x27;&#x22; style=&#x22;font-size: 16px;font-weight: normal;&#x22;&#x3E;i&#x3C;/text&#x3E;&#x3C;/svg&#x3E;&#x27;;\n" +
        "        hint_style[2] = &#x27;&#x3C;svg width=&#x22;30&#x22; height=&#x22;30&#x22;&#x3E;&#x3C;circle cx=&#x22;20&#x22; cy=&#x22;10&#x22; r=&#x22;10&#x22; fill=&#x22;&#x27; + hint_color + &#x27;&#x22; fill-opacity=&#x22;&#x27; + hint_opacity + &#x27;&#x22;&#x3E;&#x3C;/circle&#x3E;&#x3C;text x=&#x22;18&#x22; y=&#x22;16&#x22; fill=&#x22;&#x27; + hint_text_color + &#x27;&#x22; style=&#x22;font-size: 16px;font-weight: normal;&#x22;&#x3E;i&#x3C;/text&#x3E;&#x3C;/svg&#x3E;&#x27;;\n" +
        "        hint_style[3] = &#x27;&#x3C;svg width=&#x22;35&#x22; height=&#x22;35&#x22;&#x3E;&#x3C;polygon points=&#x22;0,0 35,0 35,35&#x22; fill=&#x22;&#x27; + hint_color + &#x27;&#x22; fill-opacity=&#x22;&#x27; + hint_opacity + &#x27;&#x22;&#x3E;&#x3C;/polygon&#x3E;&#x3C;text x=&#x22;13&#x22; y=&#x22;12&#x22; fill=&#x22;&#x27; + hint_text_color + &#x27;&#x22; style=&#x22;font-size: 8px;&#x22;&#x3E;INFO&#x3C;/text&#x3E;&#x3C;/svg&#x3E;&#x27;;\n" +
        "        hint_style[4] = &#x27;&#x3C;svg width=&#x22;35&#x22; height=&#x22;35&#x22;&#x3E;&#x3C;polygon points=&#x22;0,0 35,0 35,35&#x22; fill=&#x22;&#x27; + hint_color + &#x27;&#x22; fill-opacity=&#x22;&#x27; + hint_opacity + &#x27;&#x22;&#x3E;&#x3C;/polygon&#x3E;&#x3C;circle r=&#x22;8.5&#x22; cx=&#x22;24&#x22; cy=&#x22;10&#x22; fill=&#x22;&#x27; + hint_text_color + &#x27;&#x22; fill-opacity=&#x22;0.8&#x22;&#x3E;&#x3C;/circle&#x3E;&#x3C;text x=&#x22;17&#x22; y=&#x22;12&#x22; fill=&#x22;&#x27; + hint_color + &#x27;&#x22; style=&#x22;font-size: 6px;&#x22;&#x3E;INFO&#x3C;/text&#x3E;&#x3C;/svg&#x3E;&#x27;;\n" +
        "        hint_style[5] = &#x27;&#x3C;svg width=&#x22;35&#x22; height=&#x22;35&#x22;&#x3E;&#x3C;polygon points=&#x22;0,0 35,0 35,35&#x22; fill=&#x22;&#x27; + hint_color + &#x27;&#x22; fill-opacity=&#x22;&#x27; + hint_opacity + &#x27;&#x22;&#x3E;&#x3C;/polygon&#x3E;&#x3C;circle r=&#x22;8&#x22; cx=&#x22;24&#x22; cy=&#x22;10&#x22; fill=&#x22;none&#x22; stroke-opacity=&#x22;&#x27;+hint_opacity+&#x27;&#x22; stroke=&#x22;&#x27;+hint_text_color+&#x27;&#x22;&#x3E;&#x3C;/circle&#x3E;&#x3C;text x=&#x22;22&#x22; y=&#x22;14&#x22; fill=&#x22;&#x27; + hint_text_color + &#x27;&#x22; style=&#x22;font-size: 12px; font-weight:normal;&#x22; fill-opacity=&#x22;&#x27;+hint_opacity+&#x27;&#x22;&#x3E;i&#x3C;/text&#x3E;&#x3C;/svg&#x3E;&#x27;;\n" +
        "\n" +
        "    temp_img.attr(&#x27;title&#x27;,temp_title);\n" +
        "    temp_span.attr(&#x27;title&#x27;,temp_title);\n" +
        "    temp_slide.css(&#x27;position&#x27;,&#x27;relative&#x27;);\n" +
        "\n" +
        "    $(&#x27;&#x3C;div&#x3E;&#x27;,{\n" +
        "        class : &#x27;item-info&#x27;,\n" +
        "        onmouseenter : &#x27;show_hint(this , true);&#x27;,\n" +
        "        onmouseleave : &#x27;show_hint(this , false);&#x27;,\n" +
        "        //style : &#x27;border:1px solid &#x27; + hint_color + &#x27;;color:&#x27; +hint_color+&#x27;;&#x27;,\n" +
        "        //text : &#x27;i&#x27;,\n" +
        "        html : hint_style[hint_style_choice]\n" +
        "        }).prependTo(temp_slide);\n" +
        "})\n" +
        "}\n" +
        "}\n" +
        "\n" +
        "function show_hint(obj , b) {\n" +
        "var this_info = $(obj),\n" +
        "this_slide = this_info.parent(&#x27;.slick-slide&#x27;),\n" +
        "hint = $(&#x27;.info-hint&#x27;),\n" +
        "coord = this_slide.offset(),\n" +
        "a_w = this_info.parent(&#x27;.slick-slide&#x27;).width(),\n" +
        "setbot = $(window).height() - coord.top,\n" +
        "hint_tri = hint.find(&#x27;#hint-triangle&#x27;),\n" +
        "\n" +
        "a_w = parseInt(a_w);\n" +
        "\n" +
        "var idx = this_info.parent().attr(&#x22;hintIndex&#x22;);\n" +
        "if(b) {\n" +
        "hint.removeClass(&#x27;display-none&#x27;).css({&#x27;min-width&#x27;: a_w + 20 + &#x27;px&#x27;});\n" +
        "$(&#x22;#hint_text&#x22;).html(hintText[idx]);\n" +
        "var right_amount = (parseInt($(&#x27;.info-hint&#x27;).width()) + 18 - a_w)/2;\n" +
        "hint.css({&#x27;top&#x27;:&#x27;&#x27; , &#x27;bottom&#x27;: setbot + 15 , &#x27;left&#x27;: coord.left - right_amount });\n" +
        "hint_tri.css({&#x27;right&#x27;: right_amount - 5});\n" +
        "}\n" +
        "else {\n" +
        "hint.addClass(&#x27;display-none&#x27;);\n" +
        "}\n" +
        "}\n" +
        "\n" +
        "function hint_control() {\n" +
        "if (hint_control_check) {\n" +
        "$(&#x27;.info-hint-demo&#x27;).css({&#x27;background-color&#x27;:hint_color,&#x27;color&#x27;:hint_text_color,&#x27;opacity&#x27;:hint_opacity});\n" +
        "$(&#x27;.info-hint&#x27;).css({&#x27;background-color&#x27;:hint_color,&#x27;color&#x27;:hint_text_color,&#x27;opacity&#x27;:hint_opacity});\n" +
        "$(&#x27;#hint-triangle , #hint-triangle-demo&#x27;).css({&#x27;color&#x27;:hint_color});\n" +
        "}\n" +
        "}\n"
        codepen_js = $('<div/>').html(codepen_js_entities).text(),
        codepen_css = 'body{\n' +
            '    overflow-x: hidden;\n' +
            '    font-family: "Muli", Microsoft JhengHei;\n' +
            '}\n' +
            '\n' +
            'a:-webkit-any-link{\n' +
            '    text-decoration: none !important;\n' +
            '}\n' +
            '\n' +
            '.btn-try{\n' +
            '    border-radius: 5px;\n' +
            '    background-color: #189DBF;\n' +
            '    color: #ffffff;\n' +
            '    text-align: center;\n' +
            '    font-size: 24px;\n' +
            '    cursor: pointer;\n' +
            '}\n' +
            '\n' +
            '.slick-prev:before, .slick-next:before {\n' +
            '    color:white;\n' +
            '}\n' +
            '\n' +
            '.slick-demo{\n' +
            '    margin: 100px 20% 0 20%;\n' +
            '}\n' +
            '\n' +
            '.switch-arrow-left{\n' +
            '    top: 50%; transform: translate(0, -50%); position:absolute; cursor: pointer; left: -40px; width: 30px; height: 100%;\n' +
            '}\n' +
            '.switch-arrow-right{\n' +
            '    top: 50%; transform: translate(0, -50%); position:absolute; cursor: pointer; right: -40px; width: 30px; height: 100%;\n' +
            '}\n' +
            '.switch-arrow-left:hover , .switch-arrow-right:hover{\n' +
            '    background-color: rgba(0,0,0,0.05);\n' +
            '}\n' +
            '.item-info{\n' +
            '    cursor: default;\n' +
            '    position: absolute;\n' +
            '    /*border-radius: 8px;\n' +
            '    font-weight: 900;\n' +
            '    padding: 0 8px;\n' +
            '    right: 10px;\n' +
            '    top: 10px;*/\n' +
            '    top: 0;\n' +
            '    right: 14px;\n' +
            '    width: 20px;\n' +
            '    height: 20px;\n' +
            '}\n' +
            '.info-hint{\n' +
            '    padding: 5px 10px;\n' +
            '    color: white;\n' +
            '    background-color: #189DBF;\n' +
            '    border-radius: 5px;\n' +
            '    text-align: left;\n' +
            '    position: absolute;\n' +
            '    z-index: 5;\n' +
            '    opacity: 0.7;\n' +
            '}\n' +
            '.display-none{\n' +
            '    display: none;\n' +
            '}\n' +
            '#hint-triangle , #hint-triangle-demo{\n' +
            '    color: #189dbf;\n' +
            '    position: absolute;\n' +
            '    bottom: -20px;\n' +
            '    top: inherit;\n' +
            '    font-size: 24px;\n' +
            '    z-index: 4;\n' +
            '}\n' +
            '\n' +
            '.p-50{\n' +
            '    min-width: 75px;\n' +
            '    width: 40%;\n' +
            '    padding-right: 10px;\n' +
            '    font-size: 10px;\n' +
            '    text-align: right;\n' +
            '    display: inline-block;\n' +
            '}\n' +
            '/*---2017/07/17---*/\n' +
            '.item-hint{\n' +
            '    display: none;\n' +
            '    position: fixed;\n' +
            '    top: 50%;\n' +
            '    left: 50%;\n' +
            '    border: 1px solid #189dbf;\n' +
            '    z-index: 3;\n' +
            '    user-select: none;\n' +
            '}\n' +
            '\n' +
            '.item-hint-header{\n' +
            '    padding: 5px 10px;\n' +
            '    background-color: #189dbf;\n' +
            '    color: #FFFFFF;\n' +
            '    text-align: center;\n' +
            '    cursor: default;\n' +
            '    white-space: nowrap;\n' +
            '}\n' +
            '\n' +
            '.item-hint-container{\n' +
            '    padding: 5px 10px;\n' +
            '    color: #999999;\n' +
            '    text-align: center;\n' +
            '    background-color: #ffffff;\n' +
            '    white-space: nowrap;\n' +
            '    cursor: default;\n' +
            '}';

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
            $('#hint-02 .glyphicon-remove').trigger('click');
            $('#hint-01 .glyphicon-remove').trigger('click');
        }
        else if (temp_i == 'cap'){
            $('input[name="rec_type"][value="ClickStream"]').prop('checked', true);
            $('#gid').attr({'disabled':'disabled','placeholder':'N/A'}).val('');
            $('#categ_code').val('328208').attr({'placeholder':'default'}).removeAttr('disabled');
            search1.show();
            search2.hide();
            $('#hint-02 .glyphicon-remove').trigger('click');
        }
        else if (temp_i = 'gop'){
            $('input[name="rec_type"][value="AlsoView"]').prop('checked', true);
            $('#gid , #categ_code').attr({'placeholder':'default'}).removeAttr('disabled');
            $('#gid').val('5742934');
            $('#categ_code').val('328208');
            search1.add(search2).show();
        }
    });

});

function try_it() {
    //save uid git to cookie
    if (document.getElementById("categ_code") != null) {
        document.cookie = "uid=" + document.getElementById("categ_code").value;
    }
    if (document.getElementById("gid") != null) {
        document.cookie = "gid=" + document.getElementById("gid").value;
    }

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
    document.getElementById("recomd_result_pop").innerHTML = pretty;
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
    if (uid) contain_text_entities += ',\n\t"uid": "' + uid + '"';
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
    print_api();
    var tmp_result = JSON.parse(jsonStr);
    if (tmp_result != null) {
        result = tmp_result;
        if (!result.recomd_list) {
            result.recomd_list = [];
        }
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
        hintText[i] = process_hintText(result.recomd_list[i].msg_type, result.recomd_list[i].msg, result.recomd_list[i].msg_score, result.recomd_list[i].sales);
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

//var MsgType1_Msg = "看此商品也看";
var MsgType1_MsgType = ["bsim"];
var MsgType1_recScoreField = "<div class='p-50'>關聯度</div>";

//var MsgType2_Msg = "近似商品";
var MsgType2_MsgType = ["csim"];
var MsgType2_recScoreField = "<div class='p-50'>相似度</div>";

//var MsgType3_Msg = "本類HOT";
var MsgType3_MsgType = ["ctp"];
var MsgType3_recScoreField = "<div class='p-50'>熱門度</div>";
var MsgType3_recScoreField2 = "<div class='p-50'>近30日銷量</div>";

//var MsgType4_Msg = "全站HOT";
var MsgType4_MsgType = ["gtp"];
var MsgType4_recScoreField = "<div class='p-50'>熱門度</div>";
var MsgType4_recScoreField2 = "<div class='p-50'>近30日銷量</div>";

//var MsgType5_Msg = "您最近看過";
var MsgType5_MsgType = ["cs"];

//var MsgType6_Msg = "特別推薦";
var MsgType6_MsgType = ["etc"];
var MsgType6_recScoreField = "<div class='p-50'>推薦度</div>";

function process_hintText(msgType, msg, msgScore, sales) {
    //console.log("msgType:" + msgType + ", msg:" + msg + ", msgScore:" + msgScore + ", sales:" + sales);
    var score = msgScore;
    if (msgScore <= 1) {
        score = percentFormat(score, "%2") + "%";
    }

    if (msgType == MsgType1_MsgType) {
        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType1_recScoreField + score;
    }
    else if (msgType == MsgType2_MsgType) {
        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType2_recScoreField + score;
    }
    else if (msgType == MsgType3_MsgType) {
        var salesStr = "";
        if (sales >= 50) {
            salesStr = "<br>" + MsgType3_recScoreField2 + sales + "件";
        }
        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType3_recScoreField + score + salesStr;
    }
    else if (msgType == MsgType4_MsgType) {
        var salesStr = "";
        if (sales >= 50) {
            salesStr = "<br>" + MsgType4_recScoreField2 + sales + "件";
        }
        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType4_recScoreField + score;
    }
    else if (msgType == MsgType5_MsgType) {
        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + msg + "</div><br>";
    }
    else if (msgType == MsgType6_MsgType) {
        return "<div class='p-50'>推薦理由</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType6_recScoreField + score;
    }
    else {
        return "";
    }
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
                hint_style[1] = '<svg width="30" height="30"><circle cx="20" cy="10" r="9.5" stroke="' + hint_color + '" fill-opacity="0"></circle><text x="18" y="16" fill="' + hint_color + '" style="font-size: 16px;font-weight: normal;">i</text></svg>';
                hint_style[2] = '<svg width="30" height="30"><circle cx="20" cy="10" r="10" fill="' + hint_color + '" fill-opacity="' + hint_opacity + '"></circle><text x="18" y="16" fill="' + hint_text_color + '" style="font-size: 16px;font-weight: normal;">i</text></svg>';
                hint_style[3] = '<svg width="35" height="35"><polygon points="0,0 35,0 35,35" fill="' + hint_color + '" fill-opacity="' + hint_opacity + '"></polygon><text x="13" y="12" fill="' + hint_text_color + '" style="font-size: 8px;">INFO</text></svg>';
                hint_style[4] = '<svg width="35" height="35"><polygon points="0,0 35,0 35,35" fill="' + hint_color + '" fill-opacity="' + hint_opacity + '"></polygon><circle r="8.5" cx="24" cy="10" fill="' + hint_text_color + '" fill-opacity="0.8"></circle><text x="17" y="12" fill="' + hint_color + '" style="font-size: 6px;">INFO</text></svg>';
                hint_style[5] = '<svg width="35" height="35"><polygon points="0,0 35,0 35,35" fill="' + hint_color + '" fill-opacity="' + hint_opacity + '"></polygon><circle r="8" cx="24" cy="10" fill="none" stroke-opacity="'+hint_opacity+'" stroke="'+hint_text_color+'"></circle><text x="22" y="14" fill="' + hint_text_color + '" style="font-size: 12px; font-weight:normal;" fill-opacity="'+hint_opacity+'">i</text></svg>';

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
    var this_info = $(obj);
    //console.log("\n\nitem_info: left=" + this_info.offset().left + ", top=" + this_info.offset().top + ", width=" + this_info.width());
    var this_slide = this_info.parent('.slick-slide');
    var slide_left = parseInt(this_slide.offset().left);
    var slide_top = parseInt(this_slide.offset().top);
    var slide_width = parseInt(this_slide.width());
    //console.log("slide: left=" + slide_left + ", top=" + slide_top + ", width=" + slide_width);

    var hint = $('.info-hint');
    hint.css({'min-width': slide_width + 20 + 'px'});
    //console.log("info-hint: top=" + hint.offset().top + ", left=" + hint.offset().left);
    //console.log("info-hint: width=" + hint.width() + ", height=" + hint.height());

    var idx = this_info.parent().attr("hintIndex");
    if(b) {
        var setbot = $(window).height() - slide_top;
        //console.log("window.height=" + $(window).height());
        //console.log("setbot=" + setbot);

        $("#hint_text").html(hintText[idx]);

        var right_amount = (parseInt(hint.width()) + 18 - slide_width)/2;
        //console.log("right_amount=" + right_amount);

        hint.removeClass('display-none').css({'top':'', 'bottom': setbot + 15, 'left': slide_left - right_amount });
        var hint_tri = hint.find('#hint-triangle');
        hint_tri.css({'right': right_amount - 5});
        //console.log("hint-triangle: top=" + $('#hint-triangle').offset().top + ", left=" + $('#hint-triangle').offset().left);
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
        $('#hint-triangle , #hint-triangle-demo').css({'color':hint_color});
    }
}
