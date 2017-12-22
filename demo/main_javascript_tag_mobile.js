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

if(getCookie('gid') > 0){var GLOBAL_gid = getCookie('gid');}
else{var GLOBAL_gid = '5742934';}


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

function codepen_click() {
    var token = document.getElementById("token").value;
    var rec_type = $('input[name="setting-rec_type"]:checked').val();
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
        codepen_html_entities = '&lt;link href=&quot;https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot;&gt;\n' +
            '    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css&quot;&gt;\n' +
            '    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css&quot;&gt;\n' +
            '    &lt;link href=&quot;https://kenwheeler.github.io/slick/slick/slick.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot;&gt;\n' +
            '    &lt;link href=&quot;https://kenwheeler.github.io/slick/slick/slick-theme.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot;&gt;\n' +
            '\n' +
            '    &lt;script src=&quot;https://code.jquery.com/jquery-3.2.1.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;\n' +
            '    &lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;\n' +
            '    &lt;script src=&quot;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js&quot;&gt;&lt;/script&gt;\n' +
            '    &lt;script src=&quot;//code.jquery.com/jquery-migrate-1.2.1.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;\n' +
            '    &lt;script src=&quot;https://kenwheeler.github.io/slick/slick/slick.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;\n' +
            '    &lt;script src=&quot;https://venraas.github.io/demo/source/venraaspt.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;\n' +
            '    &lt;script src=&quot;https://clipboardjs.com/dist/clipboard.min.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;\n' +
            '\n' +
            '&lt;div class=&quot;info-hint display-none&quot;&gt;\n' +
            '    &lt;div style=&quot;position: relative;&quot;&gt;\n' +
            '        &lt;div id=&quot;hint_text&quot;&gt;&#x63A8;&#x85A6;&#x5EA6;&#xFF1A;95%&lt;br&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&#xFF1A;&#x9867;&#x5BA2;&#x8CB7;&#x4E86;&#x53C8;&#x8CB7;&#xFF01;&lt;/div&gt;\n' +
            '        &lt;span class=&quot;glyphicon glyphicon-triangle-bottom&quot; id=&quot;hint-triangle&quot; &gt;&lt;/span&gt;\n' +
            '    &lt;/div&gt;\n' +
            '&lt;/div&gt;\n' +
            '\n' +
            '&lt;div class=&quot;slider slick-demo&quot;&gt; &lt;/div&gt;',
        codepen_html = $('<div/>').html(codepen_html_entities).text(),
        codepen_js_entities = '    ' +
            '    var token = "'+token+'";\n' +
            '    var rec_type = "'+rec_type+'";\n' +
            '    var rec_pos = "'+rec_pos+'";\n' +
            '    var uid = "'+uid+'";\n' +
            '    var gid = "'+gid+'";\n' +
            '    var categ_code = "'+categ_code+'";\n' +
            '    var device = "'+device+'";\n' +
            '    var topk = "'+topk+'";\n' +
            '    var rowItems = topk;\n' +
            '    var showItems = "'+showItems+'";\n' +
            '    var scrollItems = "'+scrollItems+'";\n' +
            '    var loop = "'+loop+'";\n' +
            '    var result;\n' +
            '\n' +
            '    var btn_color =  "'+btn_color+'",\n' +
            '        bg_color = "'+bg_color+'",\n' +
            '        title_color = "'+title_color+'",\n' +
            '        price_color = "'+price_color+'",\n' +
            '        title_size = "'+title_size+'",\n' +
            '        price_size = "'+price_size+'",\n' +
            '        price_sign_color = "'+price_sign_color+'",\n' +
            '        price_sign_size = "'+price_sign_size+'",\n' +
            '        hint_color = "'+hint_color+'",\n' +
            '        hint_text_color = "'+hint_text_color+'",\n' +
            '        hint_opacity = "'+hint_opacity+'",\n' +
            '        hint_style_choice = "'+hint_style_choice+'";\n' +
            '\n' +
            '    var hint_control_check = true;\n' +
            '\n' +
            '    $(function(){\n' +
            '        /**\n' +
            '         * Created by surgeStudio on 17/5/18.\n' +
            '         */\n' +
            '        try_it();\n' +
            '    });\n' +
            '\n' +
            '    function try_it() {\n' +
            '        //-- recommentation parameter with JSON form, e.g. https://github.com/VenRaaS/venraas-user-guide/wiki/Recommendation-Request-(Rec-API)#user-content-examples---post-with-json-form\n' +
            '        var recomdParam = {};\n' +
            '        if (token) recomdParam.token = token;\n' +
            '        if (rec_type) recomdParam.rec_type = rec_type;\n' +
            '        if (rec_pos) recomdParam.rec_pos = rec_pos;\n' +
            '        if (uid) recomdParam.uid = uid;\n' +
            '        if (gid) recomdParam.gid = gid;\n' +
            '        if (categ_code) recomdParam.categ_code = categ_code;\n' +
            '        if (device) recomdParam.device = device;\n' +
            '        if (topk) recomdParam.topk = Number(topk);\n' +
            '        console.log(JSON.stringify(recomdParam));\n' +
            '\n' +
            '        //-- ajax call for recommendation\n' +
            '        venraastool.recomd(recomdParam, recomdCallback);\n' +
            '    }\n' +
            '\n' +
            '    function recomdCallback(jsonStr) {\n' +
            '        var tmp_result = JSON.parse(jsonStr);\n' +
            '        if (tmp_result != null) {\n' +
            '            result = tmp_result;\n' +
            '            show_slick();\n' +
            '        }\n' +
            '    }\n' +
            '\n' +
            '    function show_slick() {\n' +
            '        hint_control();\n' +
            '        process_slick(result, &quot;slick-demo&quot;, loop, rowItems, showItems, scrollItems);\n' +
            '    }\n' +
            '\n' +
            '    var bSlick = false;\n' +
            '    var hintText = [];\n' +
            '    function process_slick(result, div_class, loop, rowItems, showItems, scrollItems) {\n' +
            '        console.log(&quot;process_slick&quot;);\n' +
            '        var html = &quot;&quot;;\n' +
            '        hintText = [];\n' +
            '        for (var i=0; i&lt;result.recomd_list.length; i++) {\n' +
            '            html += process_item(result.recomd_list[i].goods_page_url, result.recomd_list[i].goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, i);\n' +
            '            hintText[i] = process_hintText(result.recomd_list[i].ref_item_list, result.recomd_list[i].sales);\n' +
            '        }\n' +
            '\n' +
            '        if (bSlick == true) {\n' +
            '            $(&quot;.&quot; + div_class).slick(&quot;unslick&quot;);\n' +
            '            $(&quot;.&quot; + div_class).html(&quot;&quot;);\n' +
            '            bSlick = false;\n' +
            '        }\n' +
            '\n' +
            '        $(&apos;.filter-btn&apos;).css({&apos;color&apos;: btn_color , &apos;background-color&apos; : &apos;#ffffff&apos; , &apos;border-color&apos;:btn_color});\n' +
            '        $(&apos;.filter-btn.act&apos;).css({&apos;background-color&apos;:  btn_color , &apos;color&apos;:&apos;#ffffff&apos;});\n' +
            '\n' +
            '        $(&apos;.slick-demo&apos;).css({&apos;background-color&apos;:bg_color});\n' +
            '        console.log(&quot;loop=&quot; + loop);\n' +
            '        console.log(&quot;rowItems=&quot; + rowItems);\n' +
            '        console.log(&quot;showItems=&quot; + showItems);\n' +
            '        console.log(&quot;scrollItems=&quot; + scrollItems);\n' +
            '        $(&quot;.&quot; + div_class).html(html);\n' +
            '        $(&quot;.&quot; + div_class).slick({\n' +
            '            infinite: Boolean(loop),\n' +
            '            arrows: true,\n' +
            '            //-------------------2017/06/21-------------------------&darr;&darr;&darr;&darr;&darr;\n' +
            '            prevArrow: &apos;&lt;div class=&quot;switch-arrow-left&quot;&gt;&lt;span class=&quot;glyphicon glyphicon-menu-left&quot; style=&quot;top: 50%;font-size: 36px; transform: translate(0, -50%); color:&apos; + btn_color + &apos;;&quot;&gt;&lt;/span&gt;&lt;/div&gt;&apos;,\n' +
            '            nextArrow: &apos;&lt;div class=&quot;switch-arrow-right&quot;&gt;&lt;span class=&quot;glyphicon glyphicon-menu-right&quot; style=&quot;top: 50%;font-size: 36px; transform: translate(-4px, -50%); color:&apos; + btn_color + &apos;;&quot;&gt;&lt;/span&gt;&lt;/div&gt;&apos;,\n' +
            '            //-------------------2017/06/21-------------------------&uarr;&uarr;&uarr;&uarr;&uarr;\n' +
            '            slidesPerRow: Number(rowItems),\n' +
            '            slidesToShow: Number(showItems),\n' +
            '            slidesToScroll: Number(scrollItems)\n' +
            '        });\n' +
            '        bSlick = true;\n' +
            '        img_hint();\n' +
            '    }\n' +
            '\n' +
            '    /*\n' +
            '     * prevArrow: &apos;&lt;div class=&quot;slick-prev&quot; style=&quot;height:100%; vertical-align: middle;&quot;&gt;&lt;div style=&quot;position: absolute; top: 40%; right: 10px;&quot;&gt;&lt;svg style=&quot;fill:&apos;+ btn_color +&apos;;&quot; height=&quot;60&quot; width=&quot;60&quot;&gt; &lt;polygon points=&quot;60,0 30,30 60,60&quot; class=&quot;triangle&quot; /&gt; &lt;/svg&gt;&lt;/div&gt;&lt;/div&gt;&apos;,\n' +
            '     * nextArrow: &apos;&lt;div class=&quot;slick-next&quot; style=&quot;height:100%; vertical-align: middle;&quot;&gt;&lt;div style=&quot;position: absolute; top: 40%; left: 10px;&quot;&gt;&lt;svg style=&quot;fill:&apos;+ btn_color +&apos;;&quot; height=&quot;60&quot; width=&quot;60&quot;&gt; &lt;polygon points=&quot;0,0 30,30 0,60&quot; class=&quot;triangle&quot; /&gt; &lt;/svg&gt;&lt;/div&gt;&lt;/div&gt;&apos;,\n' +
            '     * */\n' +
            '\n' +
            '    function percentFormat(str, fn) {\n' +
            '        var num = 0;\n' +
            '\n' +
            '        if (typeof str == &quot;string&quot;) {\n' +
            '            //&#x4E0D;&#x662F;&#x6578;&#x5B57;&#x5C31;&#x50B3;&#x56DE;&#x539F;&#x4F86;&#x7684;\n' +
            '            if (isNaN(str)) {\n' +
            '                return str;\n' +
            '            }\n' +
            '\n' +
            '            num = Number(str);\n' +
            '        }\n' +
            '        else if (typeof str == &quot;number&quot;) {\n' +
            '            num = str;\n' +
            '        }\n' +
            '        else {\n' +
            '            return str;\n' +
            '        }\n' +
            '\n' +
            '        if (fn == &quot;%&quot;) {\n' +
            '            return (num * 100);\n' +
            '        }\n' +
            '\n' +
            '        fn1 = fn.substring(1);\n' +
            '        if (isNaN(fn1)) {\n' +
            '            return (num * 100);\n' +
            '        }\n' +
            '\n' +
            '        return Number((num * 100).toFixed(Number(fn1)));\n' +
            '    }\n' +
            '\n' +
            '    var ModelType1_ModelType = [&quot;I2I_Model&quot;];\n' +
            '    var ModelType1_ModelAlg = [&quot;cooc_i2i&quot;, &quot;coocm&quot;, &quot;cooc_rank&quot;, &quot;cooc_98&quot;, &quot;cooc_98v2&quot;];\n' +
            '    var ModelType1_MsgContent = &quot;&#x770B;&#x6B64;&#x5546;&#x54C1;&#x4E5F;&#x770B;&quot;;\n' +
            '    var ModelType1_recScoreField = &quot;&lt;div class=&apos;p-50&apos;&gt;&#x95DC;&#x806F;&#x5EA6;&lt;/div&gt;&quot;;\n' +
            '\n' +
            '    var ModelType2_ModelType = [&quot;I2I_Model&quot;];\n' +
            '    var ModelType2_ModelAlg = [&quot;content_i2i&quot;, &quot;content_rank&quot;, &quot;content_tp&quot;];\n' +
            '    var ModelType2_MsgContent = &quot;&#x8FD1;&#x4F3C;&#x5546;&#x54C1;&quot;;\n' +
            '    var ModelType2_recScoreField = &quot;&lt;div class=&apos;p-50&apos;&gt;&#x76F8;&#x4F3C;&#x5EA6;&lt;/div&gt;&quot;;\n' +
            '\n' +
            '    var ModelType3_ModelType = [&quot;C2I_Model&quot;, &quot;CP2I_Model&quot;];\n' +
            '    var ModelType3_ModelAlg = [&quot;tp&quot;, &quot;tpm&quot;];\n' +
            '    var ModelType3_MsgContent = &quot;&#x672C;&#x985E;HOT&quot;;\n' +
            '    var ModelType3_recScoreField = &quot;&lt;div class=&apos;p-50&apos;&gt;&#x71B1;&#x9580;&#x5EA6;&lt;/div&gt;&quot;;\n' +
            '    var ModelType3_recScoreField2 = &quot;&lt;div class=&apos;p-50&apos;&gt;&#x8FD1;30&#x65E5;&#x92B7;&#x91CF;&lt;/div&gt;&quot;;\n' +
            '\n' +
            '    var ModelType4_ModelType = [&quot;GlobalTP_Major&quot;, &quot;GlobalTP_Minor&quot;];\n' +
            '    var ModelType4_ModelAlg = [&quot;tp&quot;];\n' +
            '    var ModelType4_MsgContent = &quot;&#x5168;&#x7AD9;HOT&quot;;\n' +
            '    var ModelType4_recScoreField = &quot;&lt;div class=&apos;p-50&apos;&gt;&#x71B1;&#x9580;&#x5EA6;&lt;/div&gt;&quot;;\n' +
            '    var ModelType4_recScoreField2 = &quot;&lt;div class=&apos;p-50&apos;&gt;&#x8FD1;30&#x65E5;&#x92B7;&#x91CF;&lt;/div&gt;&quot;;\n' +
            '\n' +
            '    var ModelType5_ModelType = [&quot;CS_ITEM&quot;];\n' +
            '    var ModelType5_ModelAlg = [&quot;&quot;];\n' +
            '    var ModelType5_MsgContent = &quot;&#x60A8;&#x6700;&#x8FD1;&#x770B;&#x904E;&quot;;\n' +
            '\n' +
            '    var ModelType6_MsgContent = &quot;&#x7279;&#x5225;&#x63A8;&#x85A6;&quot;;\n' +
            '    var ModelType6_recScoreField = &quot;&lt;div class=&apos;p-50&apos;&gt;&#x63A8;&#x85A6;&#x5EA6;&lt;/div&gt;&quot;;\n' +
            '\n' +
            '    function process_hintText(ref_item_list, sales) {\n' +
            '        if (ref_item_list == null) {\n' +
            '            return &quot;&quot;;\n' +
            '        }\n' +
            '        if (ref_item_list.length &lt; 1) {\n' +
            '            return &quot;&quot;;\n' +
            '        }\n' +
            '\n' +
            '        for (var i=0; i&lt;ref_item_list.length; i++) {\n' +
            '            for (var j=0; j&lt;ModelType1_ModelType.length; j++) {\n' +
            '                if (ref_item_list[i].model_type == ModelType1_ModelType[j]) {\n' +
            '                    for (var k=0; k&lt;ModelType1_ModelAlg.length; k++) {\n' +
            '                        if (ref_item_list[i].model_alg == ModelType1_ModelAlg[k]) {\n' +
            '                            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : &quot;&quot;;\n' +
            '                            if (score &lt;= 1) {\n' +
            '                                score = percentFormat(score, &quot;%2&quot;) + &quot;%&quot;;\n' +
            '                            }\n' +
            '                            return &quot;&lt;div class=&apos;p-50&apos;&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&lt;/div&gt;&lt;div style=&apos;display: inline-block&apos;&gt;&quot; + ModelType1_MsgContent + &quot;&lt;/div&gt;&lt;br&gt;&quot; + ModelType1_recScoreField + score;\n' +
            '                        }\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '        for (var i=0; i&lt;ref_item_list.length; i++) {\n' +
            '            for (var j=0; j&lt;ModelType2_ModelType.length; j++) {\n' +
            '                if (ref_item_list[i].model_type == ModelType2_ModelType[j]) {\n' +
            '                    for (var k=0; k&lt;ModelType2_ModelAlg.length; k++) {\n' +
            '                        if (ref_item_list[i].model_alg == ModelType2_ModelAlg[k]) {\n' +
            '                            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : &quot;&quot;;\n' +
            '                            if (score &lt;= 1) {\n' +
            '                                score = percentFormat(score, &quot;%2&quot;) + &quot;%&quot;;\n' +
            '                            }\n' +
            '                            return &quot;&lt;div class=&apos;p-50&apos;&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&lt;/div&gt;&lt;div style=&apos;display: inline-block&apos;&gt;&quot; + ModelType2_MsgContent + &quot;&lt;/div&gt;&lt;br&gt;&quot; + ModelType2_recScoreField + score;\n' +
            '                        }\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '        for (var i=0; i&lt;ref_item_list.length; i++) {\n' +
            '            for (var j=0; j&lt;ModelType3_ModelType.length; j++) {\n' +
            '                if (ref_item_list[i].model_type == ModelType3_ModelType[j]) {\n' +
            '                    for (var k=0; k&lt;ModelType3_ModelAlg.length; k++) {\n' +
            '                        if (ref_item_list[i].model_alg == ModelType3_ModelAlg[k]) {\n' +
            '                            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : &quot;&quot;;\n' +
            '                            if (score &lt;= 1) {\n' +
            '                                score = percentFormat(score, &quot;%2&quot;) + &quot;%&quot;;\n' +
            '                            }\n' +
            '                            var salesStr = &quot;&quot;;\n' +
            '                            if (sales &gt;= 50) {\n' +
            '                                salesStr = &quot;&lt;br&gt;&quot; + ModelType3_recScoreField2 + sales + &quot;&#x4EF6;&quot;;\n' +
            '                            }\n' +
            '                            return &quot;&lt;div class=&apos;p-50&apos;&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&lt;/div&gt;&lt;div style=&apos;display: inline-block&apos;&gt;&quot; + ModelType3_MsgContent + &quot;&lt;/div&gt;&lt;br&gt;&quot; + ModelType3_recScoreField + score + salesStr;\n' +
            '                        }\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '        for (var i=0; i&lt;ref_item_list.length; i++) {\n' +
            '            for (var j=0; j&lt;ModelType4_ModelType.length; j++) {\n' +
            '                if (ref_item_list[i].model_type == ModelType4_ModelType[j]) {\n' +
            '                    for (var k=0; k&lt;ModelType4_ModelAlg.length; k++) {\n' +
            '                        if (ref_item_list[i].model_alg == ModelType4_ModelAlg[k]) {\n' +
            '                            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : &quot;&quot;;\n' +
            '                            if (score &lt;= 1) {\n' +
            '                                score = percentFormat(score, &quot;%2&quot;) + &quot;%&quot;;\n' +
            '                            }\n' +
            '                            var salseStr = &quot;&quot;;\n' +
            '                            if (sales &gt;= 50) {\n' +
            '                                salesStr = &quot;&lt;br&gt;&quot; + ModelType4_recScoreField2 + sales + &quot;&#x4EF6;&quot;;\n' +
            '                            }\n' +
            '                            return &quot;&lt;div class=&apos;p-50&apos;&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&lt;/div&gt;&lt;div style=&apos;display: inline-block&apos;&gt;&quot; + ModelType4_MsgContent + &quot;&lt;/div&gt;&lt;br&gt;&quot; + ModelType4_recScoreField + score + salesStr;\n' +
            '                        }\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '        for (var i=0; i&lt;ref_item_list.length; i++) {\n' +
            '            for (var j=0; j&lt;ModelType5_ModelType.length; j++) {\n' +
            '                if (ref_item_list[i].model_type == ModelType5_ModelType[j]) {\n' +
            '                    for (var k=0; k&lt;ModelType5_ModelAlg.length; k++) {\n' +
            '                        if (ref_item_list[i].model_alg == ModelType5_ModelAlg[k]) {\n' +
            '                            return &quot;&lt;div class=&apos;p-50&apos;&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&lt;/div&gt;&lt;div style=&apos;display: inline-block&apos;&gt;&quot; + ModelType5_MsgContent + &quot;&lt;/div&gt;&lt;br&gt;&quot;;\n' +
            '                        }\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        var score = (ref_item_list[0].score != null) ? ref_item_list[0].score : &quot;&quot;;\n' +
            '        if (score &lt;= 1) {\n' +
            '            score = percentFormat(score, &quot;%2&quot;) + &quot;%&quot;;\n' +
            '        }\n' +
            '        return &quot;&lt;div class=&apos;p-50&apos;&gt;&#x63A8;&#x85A6;&#x7406;&#x7531;&lt;/div&gt;&lt;div style=&apos;display: inline-block&apos;&gt;&quot; + ModelType6_MsgContent + &quot;&lt;/div&gt;&lt;br&gt;&quot; + ModelType6_recScoreField + score;\n' +
            '    }\n' +
            '\n' +
            '    function process_item(addr, img, name, price, i) {\n' +
            '        var html = &apos;&lt;div style=&quot;margin: 0 10px 10px 10px;&quot; hintIndex=&quot;&apos; + i + &apos;&quot;&gt;&apos;;\n' +
            '        html += &apos;&lt;a href=&quot;&apos; + addr + &apos;&quot;&gt;&lt;img src=&quot;&apos; + img + &apos;&quot; style=&quot;width: 100%;&quot;&gt;&lt;div&gt;&lt;span style=&quot;margin: 5px 0;font-size: &apos; + title_size + &apos;px;height: &apos; + parseInt(title_size * 3) + &apos;px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:&apos; + title_color +&apos;;&quot;&gt;&apos; + name + &apos;&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;font-size: &apos; + price_size + &apos;px;font-weight: 900;color:&apos; + price_color + &apos;;text-align:center;&quot;&gt;&lt;span style=&quot;font-weight: normal;font-size: &apos; + price_sign_size + &apos;px; color:&apos; + price_sign_color + &apos;;&quot;&gt;$&lt;/span&gt;&apos; + price + &apos;&lt;/div&gt;&lt;/a&gt;&lt;/div&gt;&apos;;\n' +
            '\n' +
            '        return html;\n' +
            '    }\n' +
            '\n' +
            '    function img_hint(){\n' +
            '        if(hint_control_check){\n' +
            '            $(&apos;.slick-slide&apos;).each(function () {\n' +
            '                var temp_slide = $(this),\n' +
            '                    temp_img = $(this).find(&apos;a&apos;).find(&apos;img&apos;),\n' +
            '                    temp_span = $(this).find(&apos;div:eq(0)&apos;).find(&apos;span&apos;),\n' +
            '                    temp_title = temp_span.text(),\n' +
            '                    hint_style = [];\n' +
            '\n' +
            '                hint_style[1] = &apos;&lt;svg width=&quot;30&quot; height=&quot;30&quot;&gt;&lt;circle cx=&quot;20&quot; cy=&quot;10&quot; r=&quot;9.5&quot; stroke=&quot;&apos; + hint_color + &apos;&quot; fill-opacity=&quot;0&quot;&gt;&lt;/circle&gt;&lt;text x=&quot;18&quot; y=&quot;16&quot; fill=&quot;&apos; + hint_color + &apos;&quot; style=&quot;font-size: 16px;font-weight: normal;&quot;&gt;i&lt;/text&gt;&lt;/svg&gt;&apos;;\n' +
            '                hint_style[2] = &apos;&lt;svg width=&quot;30&quot; height=&quot;30&quot;&gt;&lt;circle cx=&quot;20&quot; cy=&quot;10&quot; r=&quot;10&quot; fill=&quot;&apos; + hint_color + &apos;&quot; fill-opacity=&quot;&apos; + hint_opacity + &apos;&quot;&gt;&lt;/circle&gt;&lt;text x=&quot;18&quot; y=&quot;16&quot; fill=&quot;&apos; + hint_text_color + &apos;&quot; style=&quot;font-size: 16px;font-weight: normal;&quot;&gt;i&lt;/text&gt;&lt;/svg&gt;&apos;;\n' +
            '                hint_style[3] = &apos;&lt;svg width=&quot;35&quot; height=&quot;35&quot;&gt;&lt;polygon points=&quot;0,0 35,0 35,35&quot; fill=&quot;&apos; + hint_color + &apos;&quot; fill-opacity=&quot;&apos; + hint_opacity + &apos;&quot;&gt;&lt;/polygon&gt;&lt;text x=&quot;13&quot; y=&quot;12&quot; fill=&quot;&apos; + hint_text_color + &apos;&quot; style=&quot;font-size: 8px;&quot;&gt;INFO&lt;/text&gt;&lt;/svg&gt;&apos;;\n' +
            '                hint_style[4] = &apos;&lt;svg width=&quot;35&quot; height=&quot;35&quot;&gt;&lt;polygon points=&quot;0,0 35,0 35,35&quot; fill=&quot;&apos; + hint_color + &apos;&quot; fill-opacity=&quot;&apos; + hint_opacity + &apos;&quot;&gt;&lt;/polygon&gt;&lt;circle r=&quot;8.5&quot; cx=&quot;24&quot; cy=&quot;10&quot; fill=&quot;&apos; + hint_text_color + &apos;&quot; fill-opacity=&quot;0.8&quot;&gt;&lt;/circle&gt;&lt;text x=&quot;17&quot; y=&quot;12&quot; fill=&quot;&apos; + hint_color + &apos;&quot; style=&quot;font-size: 6px;&quot;&gt;INFO&lt;/text&gt;&lt;/svg&gt;&apos;;\n' +
            '                hint_style[5] = &apos;&lt;svg width=&quot;35&quot; height=&quot;35&quot;&gt;&lt;polygon points=&quot;0,0 35,0 35,35&quot; fill=&quot;&apos; + hint_color + &apos;&quot; fill-opacity=&quot;&apos; + hint_opacity + &apos;&quot;&gt;&lt;/polygon&gt;&lt;circle r=&quot;8&quot; cx=&quot;24&quot; cy=&quot;10&quot; fill=&quot;none&quot; stroke-opacity=&quot;&apos;+hint_opacity+&apos;&quot; stroke=&quot;&apos;+hint_text_color+&apos;&quot;&gt;&lt;/circle&gt;&lt;text x=&quot;22&quot; y=&quot;14&quot; fill=&quot;&apos; + hint_text_color + &apos;&quot; style=&quot;font-size: 12px; font-weight:normal;&quot; fill-opacity=&quot;&apos;+hint_opacity+&apos;&quot;&gt;i&lt;/text&gt;&lt;/svg&gt;&apos;;\n' +
            '\n' +
            '                temp_img.attr(&apos;title&apos;,temp_title);\n' +
            '                temp_span.attr(&apos;title&apos;,temp_title);\n' +
            '                temp_slide.css(&apos;position&apos;,&apos;relative&apos;);\n' +
            '\n' +
            '                $(&apos;&lt;div&gt;&apos;,{\n' +
            '                    class : &apos;item-info&apos;,\n' +
            '                    onmouseenter : &apos;show_hint(this , true);&apos;,\n' +
            '                    onmouseleave : &apos;show_hint(this , false);&apos;,\n' +
            '                    //style : &apos;border:1px solid &apos; + hint_color + &apos;;color:&apos; +hint_color+&apos;;&apos;,\n' +
            '                    //text : &apos;i&apos;,\n' +
            '                    html : hint_style[hint_style_choice]\n' +
            '                }).prependTo(temp_slide);\n' +
            '            })\n' +
            '        }\n' +
            '    }\n' +
            '   function show_hint(obj , b) {\n' +
            '    var this_info = $(obj),\n' +
            '        this_slide = this_info.parent(&apos;.slick-slide&apos;),\n' +
            '        hint = $(&apos;.info-hint&apos;),\n' +
            '        coord = this_slide.offset(),\n' +
            '        a_w = this_info.parent(&apos;.slick-slide&apos;).width(),\n' +
            '        setbot = $(window).height() - coord.top,\n' +
            '        hint_tri = hint.find(&apos;#hint-triangle&apos;),\n' +
            '        right_amount;\n' +
            '\n' +
            '    a_w = parseInt(a_w);\n' +
            '\n' +
            '    var idx = this_info.parent().attr(&quot;hintIndex&quot;);\n' +
            '    if(b) {\n' +
            '        $(&quot;#hint_text&quot;).html(hintText[idx]);\n' +
            '        right_amount = (parseInt(hint.width()) + 18 - a_w)/2;\n' +
            '        hint.removeClass(&apos;display-none&apos;).css({&apos;min-width&apos;: a_w + 20 + &apos;px&apos; ,&apos;top&apos;:&apos;&apos; , &apos;bottom&apos;: setbot + 15 , &apos;left&apos;: coord.left - right_amount });\n' +
            '        hint_tri.css({&apos;right&apos;: right_amount - 5});\n' +
            '    }\n' +
            '    else {\n' +
            '        hint.addClass(&apos;display-none&apos;);\n' +
            '    }\n' +
            '}\n' +
            '    function hint_control() {\n' +
            '\n' +
            '            $(&apos;.info-hint-demo&apos;).css({&apos;background-color&apos;:hint_color,&apos;color&apos;:hint_text_color,&apos;opacity&apos;:hint_opacity});\n' +
            '            $(&apos;.info-hint&apos;).css({&apos;background-color&apos;:hint_color,&apos;color&apos;:hint_text_color,&apos;opacity&apos;:hint_opacity});\n' +
            '            $(&apos;#hint-triangle&apos;).css({&apos;color&apos;:hint_color});\n' +
            '        \n' +
            '    }',
        codepen_js = $('<div/>').html(codepen_js_entities).text(),
        codepen_css = 'a:-webkit-any-link{\n' +
            '            text-decoration: none !important;\n' +
            '        }\n' +
            '           .slick-prev:before, .slick-next:before {\n' +
            '            color:white;}\n' +
            '        .slick-demo{\n' +
            '            margin: 100px 20%;}\n' +
            '        .switch-arrow-left{\n' +
            '            top: 50%; transform: translate(0, -50%); position:absolute; cursor: pointer; left: -40px; width: 30px; height: 100%;}\n' +
            '        .switch-arrow-right{\n' +
            '            top: 50%; transform: translate(0, -50%); position:absolute; cursor: pointer; right: -40px; width: 30px; height: 100%;}\n' +
            '        .switch-arrow-left:hover , .switch-arrow-right:hover{\n' +
            '            background-color: rgba(0,0,0,0.05);}\n' +
            '        .item-info{\n' +
            '            cursor: default;\n' +
            '            position: absolute;\n' +
            '            /*border-radius: 8px;\n' +
            '            font-weight: 900;\n' +
            '            padding: 0 8px;\n' +
            '            right: 10px;\n' +
            '            top: 10px;*/\n' +
            '            top: 0;\n' +
            '            right: 14px;\n' +
            '            width: 20px;\n' +
            '            height: 20px;\n' +
            '        }\n' +
            '        .info-hint{\n' +
            '            padding: 5px 10px;\n' +
            '            color: white;\n' +
            '            background-color: #189DBF;\n' +
            '            border-radius: 5px;\n' +
            '            text-align: left;\n' +
            '            position: absolute;\n' +
            '            z-index: 5;\n' +
            '            opacity: 0.7;\n' +
            '        }\n' +
            '        .display-none{\n' +
            '            display: none;\n' +
            '        }\n' +
            '        #hint-triangle{\n' +
            '            color: #189dbf;\n' +
            '            position: absolute;\n' +
            '            bottom: -20px;\n' +
            '            top: inherit;\n' +
            '            font-size: 24px;\n' +
            '            z-index: 4;\n' +
            '        }\n' +
            '       .p-50{\n' +
            '            min-width: 75px;\n' +
            '            width: 40%;\n' +
            '            padding-right: 10px;\n' +
            '            font-size: 10px;\n' +
            '            text-align: right;\n' +
            '            display: inline-block;\n' +
            '        }';

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

    $("#list1").dragsort({ dragSelector: "div", dragBetween: true, dragEnd: function(){}, placeHolderTemplate: "<li class='placeHolder'><div></div></li>" });
});

// *****TAGS*****

var goodsKeywords = null;//stored goods_keywords
var selectedGoodsKeywords = [];//for selected goods_keyword
var goods_keywords = [];//for recomd
function getGoodsKeyword() {
    console.log("getGoodsKeyword()");
    var p = {};
    p.token = document.getElementById("token").value;

    p.gid = (document.getElementById("setting-gid").value) ? document.getElementById("setting-gid").value : GLOBAL_gid;
    document.getElementById("gid").value = p.gid;

    if (! document.getElementById("categ_code").value) {
        document.getElementById("categ_code").value = '328208';
    }

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
    tagsScroller();
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
    var device =$('input[name="device"]:checked').val();
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
        recomdParam.goods_keywords = goods_keywords;
        recomdParam.rec_logic = {"filter_out_last_7_day_bought_items":false,"filter_out_last_60_unfav_items":false,"logic_list":[{"logic_name":"CurrentItem","alg_list":[{"alg_name":"K2I_Model","model_type":"KKK","weight":1,"is_random_by_vig":false},{"alg_name":"I2I_Model","model_type":"cooc_i2i","weight":1,"is_random_by_vig":false},{"alg_name":"C2I_Model","model_type":"tp","weight":1,"is_random_by_vig":false},{"alg_name":"CP2I_Model","model_type":"tp","weight":1,"is_random_by_vig":false}],"use_all_alg_rec_gids":false,"weight_of_alg_rec_gids_size":1.5,"sort_by_socre":false},{"logic_name":"WhiteCategory","weight_of_alg_rec_gids_size":1.5},{"logic_name":"ClickStream","alg_list":[{"alg_name":"I2I_Model","model_type":"cooc_i2i","weight":1},{"alg_name":"C2I_Model","model_type":"tp","weight":1},{"alg_name":"CP2I_Model","model_type":"tp","weight":1}],"num_of_ref_cs":5,"min_num_of_cs":1,"random_cs_order":true,"cs_must_in_current_categ_code":true,"insert_cs_item_to_rec_items_first":true,"use_all_alg_rec_gids":false,"weight_of_alg_rec_gids_size":1.5,"add_key_terms_score":false,"key_terms_score_weight":100,"key_terms_min_sup":0.6,"sort_by_socre":false},{"logic_name":"GlobalTP"}]};
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
    img_hint();
    VH();
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
        price_size = '4rem',
        price_sign_color = $(' #price-sign-color').css('background-color'),
        price_sign_size = '4rem';

    var html = '<div class="itemSlide col-12" style="margin-bottom: -2rem; position: relative;" hintIndex="' + i + '"><div style="padding: 2rem;">';
    html += '<div class="slick-num'+ i +'" onclick="dev_func(this)" style="width: 100%; text-align: center;"><img src="' + img + '" style="width: 100%;" ></div>'
    + '<div><a class="href-a" target="_blank" href="' + addr + '"><span style="height: 12rem; margin: 5px 0;font-size: ' + title_size + ';height: ' + parseInt(title_size * 3) + ';display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';">' + name + '</span></div><div style="font-size: ' + price_size + ';font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + '; color:' + price_sign_color + ';">$</span><span style="font-size: ' + price_size + '; color: ' + price_color + '">' + price + '</span></a></div></div></div>';

    return html;
}

function dev_func(obj) {
    var clone_item = $(obj).parents('.itemSlide'),
        item_href = clone_item.find('.href-a').attr('href'),
        gid_where = item_href.indexOf('pid=')+4;
        cid_where = item_href.indexOf('cid=')+4;
        item_gid = parseInt(item_href.substr(gid_where, 7)),
        item_cid = parseInt(item_href.substr(cid_where, 6));
    // alert(gid_where+','+cid_where);
    // alert(item_href+" .gid:" + item_gid + " .cid:" + item_cid);
    $('#categ_code').val(item_cid);
    GLOBAL_gid = item_gid;
    $('#setting-gid').val('');
    document.cookie = "uid=" + item_cid;
    document.cookie = "gid=" + item_gid;
    $('#now-item').html(clone_item.html());
    try_it(true, true);
    $(document).scrollTop(0);
}

function getGoodsInfo() {
    console.log("getGoodsInfo");
    var token = document.getElementById("token").value;
    var gid = document.getElementById("gid").value;
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
            alert("1:error");
            alert("2:" + xhr.status);
            alert("3:" + thrownError);
        }
    });
}

function show_code() {
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

    setTimeout(function(){
      tagsScroller();
    },100);

    $(window).resize(function(){
        tagsScroller();
    });

    $('.scroll-area').resize(function(){
      tagsScroller();
    });
});

function img_hint() {
    if (hint_control_check) {
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

// 2017/10/25
function tagsScroller(val){
  setTimeout(function(){
    var TA = $('.tags-area');
    var TAWidth = TA.width();
    var SA = $('.scroll-area');
    var SAWidth = SA.width();
    var fullScroll = SAWidth - TAWidth;
    var nowScroll = 0;
    var LB = $('#TAL');
    var RB = $('#TAR');
    RB.add(LB).off('click');

    if(val || val=='0'){
      //如果有指定要scroll到哪裡(用在name select)
      TA.scrollLeft(val);
      nowScroll = val;
      if(TA.scrollLeft() > 0){
        LB.add(RB).fadeIn();
        LB.add(RB).removeClass('scrollOff');
        RB.on('click', onScrollRight);
        LB.on('click', onScrollLeft);
      }else {
        LB.add(RB).fadeIn();
        RB.on('click', onScrollRight);
        LB.on('click', onScrollLeft);
      }
    }else {
      //如果沒指定要scroll到哪裡，正常運作
      if(fullScroll > 0){
        if(TA.scrollLeft() > 0){
          nowScroll = fullScroll;
          LB.add(RB).fadeIn();
          LB.add(RB).removeClass('scrollOff');
          RB.on('click', onScrollRight);
          LB.on('click', onScrollLeft);
        }else {
          nowScroll = fullScroll;
          LB.add(RB).fadeIn();
          RB.on('click', onScrollRight);
          LB.on('click', onScrollLeft);
        }
      }else {
        LB.add(RB).fadeOut();
      }
    }

    function onScrollRight(){
      if(fullScroll > TAWidth){
        var amount = TAWidth;
      }else {
        var amount = fullScroll;
      }
      nowScroll += amount;
      if(nowScroll > fullScroll){
        nowScroll = fullScroll;
      }
      TA.scrollLeft(TA.scrollLeft() + amount);
      if(TA.scrollLeft() > 0){
        LB.removeClass('scrollOff');
      }
      if(TA.scrollLeft() >= fullScroll){
        RB.addClass('scrollOff');
      }

      // console.log('TA.scrollLeft(): ' + TA.scrollLeft());
      // console.log('TAWidth: ' + TAWidth);
      // console.log('SAWidth: ' + SAWidth);
      // console.log('fullScroll: ' + fullScroll);
      // console.log('nowScroll: ' + nowScroll);
      // console.log('amount: ' + amount);
    }

    function onScrollLeft(){
      if(fullScroll > TAWidth){
        var amount = TAWidth;
      }else {
        var amount = fullScroll;
      }
      nowScroll -= amount;
      if(nowScroll < 0){
        nowScroll = 0;
      }
      TA.scrollLeft(TA.scrollLeft() - amount);
      if(TA.scrollLeft() <= fullScroll){
        RB.removeClass('scrollOff');
      }
      if(TA.scrollLeft() == 0){
        LB.addClass('scrollOff');
      }

      // console.log('TA.scrollLeft(): ' + TA.scrollLeft());
      // console.log('TAWidth: ' + TAWidth);
      // console.log('SAWidth: ' + SAWidth);
      // console.log('fullScroll: ' + fullScroll);
      // console.log('nowScroll: ' + nowScroll);
      // console.log('amount: ' + amount);
    }
  },500);
}

function VH(){
  var Hval = $(window).height(),
      Wval = $(window).width(),
      horizontal = false;

      Wval > Hval ? horizontal = true : horizontal = false;

      if(horizontal){
        $('.itemSlide').attr('class','itemSlide col-xs-6');
      }else {
        $('.itemSlide').attr('class','itemSlide col-xs-6');
      }
}
