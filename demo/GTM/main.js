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


var title_color = "#333333";
var title_size = 14;
var price_color = "#ff0000";
var price_size = 18;
var price_sign_color = "#ff0000";
var price_sign_size = 10;
var btn_color = "#999999";
var bg_color = "#ffffff";
function process_item(addr, img, name, price, i) {
    var html = '<div style="padding:10px;border-right:1px solid rgba(0,0,0,0.2);margin:0 !important;" hintIndex="' + i + '">';
    html += '<a href="' + addr + '"><img src="' + img + '" style="width: 100%;"><div><span style="margin: 5px 0;font-size: ' + title_size + 'px;height: ' + parseInt(title_size * 3) + 'px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color +';">' + name + '</span></div><div style="font-size: ' + price_size + 'px;font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + price + '</div></a></div>';

    return html;
}

var bSlick = {};
var hintText = [];
function process_slick(result, slickClass, loop, rowItems, showItems, scrollItems) {
    console.log("process_slick");

    var html = "";
    var addr = "";
    var goods_img_url = null;
    hintText = [];
    for (var i=0; i<result.recomd_list.length; i++) {
        goods_img_url = result.recomd_list[i].goods_img_url.replace("http:", location.protocol);
        addr = "" + result.recomd_list[i].goods_page_url;
        addr = addr.replace(url_finder, url_replace);
        addr += "&img_url=" + goods_img_url;
        html += process_item(addr, goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, i);
        hintText[i] = process_hintText(result.recomd_list[i].msg_type, result.recomd_list[i].msg, result.recomd_list[i].msg_score, result.recomd_list[i].sales);
    }

    if (bSlick["" + slickClass] == true) {
        $("." + slickClass).slick("unslick");
        $("." + slickClass).html("");
        bSlick["" + slickClass] = false;
    }

    $('.' + slickClass).css({'background-color':bg_color});
    console.log("loop=" + loop);
    console.log("rowItems=" + rowItems);
    console.log("showItems=" + showItems);
    console.log("scrollItems=" + scrollItems);
    $("." + slickClass).html(html);
    $("." + slickClass).slick({
        infinite: Boolean(loop),
        arrows: true,
        //-------------------2017/06/21-------------------------↓↓↓↓↓
        prevArrow: '<div class="switch-arrow-left"><span class="glyphicon glyphicon-menu-left" style="top:50%;font-size:26px;transform:translate(0,-47%);color:white;"></span></div>',
        nextArrow: '<div class="switch-arrow-right"><span class="glyphicon glyphicon-menu-right" style="top:50%;font-size:26px;transform:translate(0,-47%);color:white;"></span></div>',
        //-------------------2017/06/21-------------------------↑↑↑↑↑
        slidesPerRow: Number(rowItems),
        slidesToShow: Number(showItems),
        slidesToScroll: Number(scrollItems)
    });
    bSlick["" + slickClass] = true;

//    img_hint();

}

function show_slick(showItems, scrollItems, loop) {
//    hint_control();
    process_slick(recomd_result, "slick-demo", loop, rowItems, showItems, scrollItems);
}

function recomdCallback(jsonStr) {
    var tmp_result = JSON.parse(jsonStr);
    if (tmp_result != null) {
        recomd_result = tmp_result;
        show_slick(showItems, scrollItems, loop);
    }
}

var showItems, scrollItems, loop;
var token, rec_type, rec_pos, uid, gid, categ_code, device, rowItems;
function venraas_recomd(token, rec_type, rec_pos, uid, gid, categ_code, device, rowItems) {
    //-- recommentation parameter with JSON form, e.g. https://github.com/VenRaaS/venraas-user-guide/wiki/Recommendation-Request-(Rec-API)#user-content-examples---post-with-json-form
    var recomdParam = {};
    if (token) recomdParam.token = token;
    if (rec_type) recomdParam.rec_type = rec_type;
    if (rec_pos) recomdParam.rec_pos = rec_pos;
    if (uid) recomdParam.uid = uid;
    if (gid) recomdParam.gid = gid;
    if (categ_code) recomdParam.categ_code = categ_code;
    if (device) recomdParam.device = device;
    if (rowItems) recomdParam.topk = Number(rowItems);
    console.log("recomdParam: " + JSON.stringify(recomdParam));

    //-- ajax call for recommendation
    venraastool.recomd(recomdParam, recomdCallback);
}

var url_finder = "http://shopping.friday.tw/ec2/product";
var url_replace = location.href.replace(location.search, "").replace("portal", "good").replace("category", "good").replace("edm", "good").replace("search", "good");
var url_portal = location.href.replace(location.search, "").replace("category", "portal").replace("good", "portal");
var url_category = location.href.replace(location.search, "").replace("portal", "category").replace("good", "category");

function getGoodsInfo(token, gid, url, imgClass, isAddCart) {
    if (gid == '') {
        return;
    }

    var data = {};
    if (token) data["token"] = token;
    if (gid) data["gid"] = gid;

    $.ajax({
        url: location.protocol + "//apir.venraas.tw/cupid/api/goods/info",
        dataType:'html',
        type: 'GET',
        data: data,
        success: function(msg, status, xhr) {
            console.log(msg);
            var ret = JSON.parse(msg);
            var html = '<img src="' + url + '" style="width:320px;"><div><span style="margin:5px 0;font-size:' + title_size + 'px;height:' + parseInt(title_size * 3) + 'px;display:block;overflow:hidden;word-wrap:break-word;word-break:break-all;color:' + title_color +';">' + ret.goods_name + '</span></div><div style="font-size:' + price_size + 'px; font-weight:900; color:' + price_color + '; text-align:center;"><span style="font-weight:normal; font-size:' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + ret.sale_price + '</div></a></div>';
            if (isAddCart == true) {
                html += '<a id="addCart" class="btn btn-primary" onclick="addCart(\'' + gid + '\')">&nbsp;放入購物車&nbsp;</a>';
            }
            $("#" +imgClass).html(html);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("error");
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

var total = 0;
function getGoodsInfo1(token, gid, goodsClass) {
    if (gid == '') {
        return;
    }

    var data = {};
    if (token) data["token"] = token;
    if (gid) data["gid"] = gid;

    $.ajax({
        url: location.protocol + "//apir.venraas.tw/cupid/api/goods/info",
        dataType:'html',
        type: 'GET',
        data: data,
        success: function(msg, status, xhr) {
            console.log(msg);
            var ret = JSON.parse(msg);
            var html = '<img src="' + ret.goods_img_url.replace("http:", location.protocol).replace("https:", location.protocol) + '" style="width:320px;"><div><span style="margin:5px 0;font-size:' + title_size + 'px;height:' + parseInt(title_size * 3) + 'px;display:block;overflow:hidden;word-wrap:break-word;word-break:break-all;color:' + title_color +';">' + ret.goods_name + '</span></div><div style="font-size:' + price_size + 'px; font-weight:900; color:' + price_color + '; text-align:center;"><span style="font-weight:normal; font-size:' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + ret.sale_price + '</div></a></div>';
            $("#" +goodsClass).html(html);
            total += Number(ret.sale_price);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("error");
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
function addCart(gid) {
    var c_cartList = getCookie("cart_list");
    var cartList = [];
    if (c_cartList == null) {
        cartList.push(gid);
    }
    else {
        cartList = JSON.parse(c_cartList);
        cartList.push(gid);
    }

    var d = new Date();
    d.setTime(d.getTime() + 1800000);//30 minutes
    var domain = window.location.host.split(".").slice(-3).join(".");
    document.cookie = "cart_list=" + JSON.stringify(cartList) + ";expires=" + d.toUTCString() + ";path=/;domain=" + domain;
}
