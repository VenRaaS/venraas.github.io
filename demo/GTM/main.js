function percentFormat(str, fn) {
    var num = 0;

    if (typeof str == "string") {
        //���O�Ʀr�N�Ǧ^��Ӫ�
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

//var MsgType1_Msg = "�ݦ��ӫ~�]��";
var MsgType1_MsgType = ["bsim"];
var MsgType1_recScoreField = "<div class='p-50'>���p��</div>";

//var MsgType2_Msg = "����ӫ~";
var MsgType2_MsgType = ["csim"];
var MsgType2_recScoreField = "<div class='p-50'>�ۦ���</div>";

//var MsgType3_Msg = "����HOT";
var MsgType3_MsgType = ["ctp"];
var MsgType3_recScoreField = "<div class='p-50'>������</div>";
var MsgType3_recScoreField2 = "<div class='p-50'>��30��P�q</div>";

//var MsgType4_Msg = "����HOT";
var MsgType4_MsgType = ["gtp"];
var MsgType4_recScoreField = "<div class='p-50'>������</div>";
var MsgType4_recScoreField2 = "<div class='p-50'>��30��P�q</div>";

//var MsgType5_Msg = "�z�̪�ݹL";
var MsgType5_MsgType = ["cs"];

//var MsgType6_Msg = "�S�O����";
var MsgType6_MsgType = ["etc"];
var MsgType6_recScoreField = "<div class='p-50'>���˫�</div>";

function process_hintText(msgType, msg, msgScore, sales) {
    //console.log("msgType:" + msgType + ", msg:" + msg + ", msgScore:" + msgScore + ", sales:" + sales);
    var score = msgScore;
    if (msgScore <= 1) {
        score = percentFormat(score, "%2") + "%";
    }

    if (msgType == MsgType1_MsgType) {
        return "<div class='p-50'>���˲z��</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType1_recScoreField + score;
    }
    else if (msgType == MsgType2_MsgType) {
        return "<div class='p-50'>���˲z��</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType2_recScoreField + score;
    }
    else if (msgType == MsgType3_MsgType) {
        var salesStr = "";
        if (sales >= 50) {
            salesStr = "<br>" + MsgType3_recScoreField2 + sales + "��";
        }
        return "<div class='p-50'>���˲z��</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType3_recScoreField + score + salesStr;
    }
    else if (msgType == MsgType4_MsgType) {
        var salesStr = "";
        if (sales >= 50) {
            salesStr = "<br>" + MsgType4_recScoreField2 + sales + "��";
        }
        return "<div class='p-50'>���˲z��</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType4_recScoreField + score;
    }
    else if (msgType == MsgType5_MsgType) {
        return "<div class='p-50'>���˲z��</div><div style='display: inline-block'>" + msg + "</div><br>";
    }
    else if (msgType == MsgType6_MsgType) {
        return "<div class='p-50'>���˲z��</div><div style='display: inline-block'>" + msg + "</div><br>" + MsgType6_recScoreField + score;
    }
    else {
        return "";
    }
}


var title_color = "#333333";
var title_size = 14;
var price_color = "#ff0000";
var price_size = 18;
var price_sign_color = "#ff0000";
var price_sign_size = 10;
function process_item(addr, img, name, price, i) {
    var html = '<div style="margin: 0 10px 10px 10px;" hintIndex="' + i + '">';
    html += '<a href="' + addr + '"><img src="' + img + '" style="width: 100%;"><div><span style="margin: 5px 0;font-size: ' + title_size + 'px;height: ' + parseInt(title_size * 3) + 'px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';">' + name + '</span></div><div style="font-size: ' + price_size + 'px;font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + price + '</div></a></div>';

    return html;
}

var bSlick = {};
var hintText = [];
function process_slick(result, slickClass, loop, rowItems, showItems, scrollItems) {
    console.log("process_slick");

    if (bSlick["" + slickClass] == true) {
        $("." + slickClass).slick("unslick");
        $("." + slickClass).html("");
        bSlick["" + slickClass] = false;
    }

    var btn_color =  $('#btn-color').css('background-color'),
        bg_color = $('#bg-color').css('background-color');


    $('.filter-btn').css({'color': btn_color , 'background-color' : '#ffffff' , 'border-color':btn_color});
    $('.filter-btn.act').css({'background-color':  btn_color , 'color':'#ffffff'});

    $('.' + slickClass).css({'background-color':bg_color});
    console.log("loop=" + loop);
    console.log("rowItems=" + rowItems);
    console.log("showItems=" + showItems);
    console.log("scrollItems=" + scrollItems);
    $("." + div_class).html(html);
    $("." + div_class).slick({
        infinite: Boolean(loop),
        arrows: true,
        //-------------------2017/06/21-------------------------����������
        prevArrow: '<div class="switch-arrow-left"><span class="glyphicon glyphicon-menu-left" style="top: 50%;font-size: 36px; transform: translate(0, -50%); color:' + btn_color + ';"></span></div>',
        nextArrow: '<div class="switch-arrow-right"><span class="glyphicon glyphicon-menu-right" style="top: 50%;font-size: 36px; transform: translate(-4px, -50%); color:' + btn_color + ';"></span></div>',
        //-------------------2017/06/21-------------------------����������
        slidesPerRow: Number(rowItems),
        slidesToShow: Number(showItems),
        slidesToScroll: Number(scrollItems)
    });
    bSlick["" + slickClass] = true;
/*
    var html = "";
    hintText = [];
    for (var i=0; i<result.recomd_list.length; i++) {
        html += process_item(result.recomd_list[i].goods_page_url, result.recomd_list[i].goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, i);
        hintText[i] = process_hintText(result.recomd_list[i].msg_type, result.recomd_list[i].msg, result.recomd_list[i].msg_score, result.recomd_list[i].sales);
    }
    img_hint();
*/
}

function show_slick() {
//    hint_control();
    showItems = document.getElementById("showItems").value;
    scrollItems = document.getElementById("scrollItems").value;
    loop = document.getElementById("loop").checked;
    process_slick(recomd_result, "slick-demo", loop, rowItems, showItems, scrollItems);
}

function recomdCallback(jsonStr) {
    var tmp_result = JSON.parse(jsonStr);
    if (tmp_result != null) {
        recomd_result = tmp_result;
        show_slick();
    }
}

var token, rec_type, rec_pos, uid, gid, categ_code, device, topk;
function venraas_recomd(token, rec_type, rec_pos, uid, gid, categ_code, device, topk) {
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
    console.log("recomdParam: " + JSON.stringify(recomdParam));

    //-- ajax call for recommendation
    venraastool.recomd(recomdParam, recomdCallback);
}
