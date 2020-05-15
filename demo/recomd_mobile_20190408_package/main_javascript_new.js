/* eslint-disable */

/**
 * Created by surgeStudio on 17/5/18.
 */

function getCookie(cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

var GLOBAL_URL = new URL(window.location.href)
var GLOBAL_urlParams = new URLSearchParams(window.location.search)
var GLOBAL_photo = ""
var GLOBAL_gid, GLOBAL_cid
if (GLOBAL_urlParams.has('gid')) {
  var item_gid = GLOBAL_gid = GLOBAL_urlParams.get("gid")
  var item_cid = GLOBAL_urlParams.get("cid")

  GLOBAL_gid = item_gid
  GLOBAL_cid = item_cid

  $('#categ_code').val(item_cid)
  $('#setting-gid').val(item_gid)

  document.cookie = "uid=" + item_cid
  document.cookie = "gid=" + item_gid
}
else {
  if (getCookie('gid').length != 0) {
    GLOBAL_gid = getCookie('gid')
    GLOBAL_cid = getCookie('cid')
  } else {
    GLOBAL_gid = '5742934'
    GLOBAL_cid = '328208'
  }
}

$(function () {
  if (getCookie('photo').length != 0) {
    GLOBAL_photo = getCookie('photo')
    var photoDir = ''
    if (GLOBAL_urlParams.has('photo=')) {
      photoDir = GLOBAL_urlParams.get('photo=')
    }
    else {
      photoDir = GLOBAL_photo
    }

    cameraType = false
    $('#RT1').addClass('on')
    $('.result-container').removeClass('off')
    $('.whole-ad-camera').addClass('off')
    //$('#TC').val(photoDir);
    $('#OI').attr('src', photoDir)
    $('#RTI').attr('src', photoDir)

    $.ajax({
      xhr: function () {
        var progress = $('.progress'),
            xhr = $.ajaxSettings.xhr()

        progress.show()

        xhr.upload.onprogress = function (ev) {
          if (ev.lengthComputable) {
            var percentComplete = parseInt((ev.loaded / ev.total) * 100)
            progress.val(percentComplete)
            if (percentComplete === 100) {
              progress.hide().val(0)
            }
          }
        }

        return xhr
      },

      url: 'https://titan.venraas.tw/cupid/api/image/rank/' + photoDir.split('/').pop(),
      headers: {'Access-Control-Allow-Origin': '*'},
      type: 'POST',
      data: {
        'file': photoDir
      },
      contentType: false,
      cache: false,
      processData: false,
      success: function (data, status, xhr) {
        $('.preloader').addClass('off')
        console.log(JSON.stringify(data))

        var tmp_result = data
        if (tmp_result != null) {
          result = tmp_result
          hint_control()
          showItems = document.getElementById('showItems').value
          scrollItems = document.getElementById('scrollItems').valu
          loop = document.getElementById('loop').checked
          process_result(result, 'camera-recommed-list', loop, rowItems, showItems, scrollItems)
        }
      },
      error: function (xhr, status, error) {
        $('.preloader').addClass('off')
        console.log('error for https://titan.venraas.tw/cupid/api/image/rank/')
      }
    })
  }
})

var target

function touches(e) {
    var x = e.touches ? e.touches[0].clientX : e.clientX,
        y = e.touches ? e.touches[0].clientY : e.clientY
    TweenMax.to(target, 0, {
        top: y - 20,
        left: x - 50
    })
}

function toggleBtnController() {

  var swipe = $('#swipe')
  var height = $('#ST').height()
  var data = swipe.attr('swipe-data')
  var noSelectedHeight = $('#FT').height()

  console.log(noSelectedHeight + ',', height)


  //alert(swipe.height() +','+ height);
  if (data == 1 && swipe.height < 120) {
    // 如果 swipe 狀態是開啟，但總高度僅只有一行時
    //console.log('type0-1');

    // data 自動轉回關閉狀態
    swipeToggle(0)

    // 將 swipe 的狀態設定為 0 ，用以改變開關箭頭的顯示樣式
    swipe.attr('swipe-type', 0) // none
  } else if (data == 1 && noSelectedHeight + height < 120) {
    // data 自動轉回關閉狀態
    swipeToggle(0)

    // 將 swipe 的狀態設定為 0 ，用以改變開關箭頭的顯示樣式
    swipe.attr('swipe-type', 0) // none
  } else if (data == 1 && noSelectedHeight < 120 && height <= 0) {
    // 如果 swipe 狀態是開啟，且候選區的原始高度只有一行，且沒有任何tag被選取的情況
    //console.log('type0-2');

    // data 自動轉回關閉狀態
    swipeToggle(0)

    // 將 swipe 的狀態設定為 0 ，用以改變開關箭頭的顯示樣式
    swipe.attr('swipe-type', 0) // none
  } else if (data == 0 && noSelectedHeight > 120 && height <= 0) {
    // 如果 data 狀態是關閉，且候選區的原始高度大於一行，且沒有任何tag被選取的情況
    //console.log('type1');

    // 將 swipe 的狀態設定為 7 ，用以改變箭頭得顯示樣式
    swipe.attr('swipe-type', 7) // up-blue

    // 將未選取區域加入展開按鈕
    // 當該按鈕被點擊的時候 data 自動轉為開啟狀態，並移除該按鈕
    // $('#FT').append($('<div/>', {
    //     class: 'tag-each-one more-btn',
    //     style: 'position: absolute; right: 0; top: 0; padding: 3px 8px;',
    //     text: '•••'
    // }).on('click', function(){swipeToggle(1); $('.more-btn').remove();}));
  } else if (data == 1 && noSelectedHeight > 120 && height <= 0) {
    // 如果 data 狀態是開啟，但沒有任何 tag 被選取，同時候選區域的總高度大於一行
    //console.log('type2');

    // 將 swipe 箭頭樣式改變為 2
    swipe.attr('swipe-type', 2) // down-blue
  } else if (data == 0 && height > 80) {
    // 如果 data 狀態是關閉，選取區只有一行時
    //console.log('type4');

    // 將 swipe 箭頭樣式改變為 4
    swipe.attr('swipe-type', 4) // up-green
  } else if (data == 1 && height > 80) {
    // 如果 data 狀態是開啟，且有 tag 被選取

    // 將 swipe 箭頭樣式改變為 3
    //swipe.attr('swipe-type', 3); // down-green

    // 將 swipe 箭頭樣式改變為 2
    swipe.attr('swipe-type', 2) // down-blue
  } else if (selectedShowController() > height) {
    $('.top-more-btn').trigger('click')
  }

  if (data == 0 && selectedShowController() > 150) {
    //console.log('type4');
    // 如果選取區有兩行以上時

    // 將 swipe 箭頭樣式設定為 7
    swipe.attr('swipe-type', 7) // up-green
    // $('#ST').append($('<div/>', {
    //     class: 'tag-each-one top-more-btn',
    //     style: 'position: absolute; right: 0; top: 0; padding: 3px 8px;',
    //     text: '•••'
    // }).on('click', function(){swipeToggle(1); $('.top-more-btn').remove();}));
    // ????? max-height還沒定義
    // ????? 觸發機制是什麼？
  }
}

function menuShowController() {
  var noSelectedHeight = $('#FT').css('max-height', 'unset').height()
  $('#FT').css('max-height', '')

  return noSelectedHeight
}

function selectedShowController() {
  var height = $('#ST').css('max-height', 'unset').height()
  $('#ST').css('max-height', '')
  return height
}

function returnRealHeight(obj) {
  var target = $(obj).clone()
  var str = target.css({
    'max-height': 'unset',
    'display': 'none'
  }).appendTo('#outSwipe').height()
  target.remove()

  return str
}

function swipeToggle(tar) {
  var swipe = $('#swipe')
  var height = $('#ST').height()
  var noSelectedHeight = $('#FT').height()
  var data = swipe.attr('swipe-data')
  var changeTo, bottom

  if (tar == 1) {
    $('.top-more-btn').remove()
    // changeTo =  'translateY(0)';
    // bottom = 0;
    //swipe.css({'transform': changeTo, 'bottom': bottom});

    swipe.removeClass('limit')
    swipe.attr('swipe-data', tar)

    toArrow()
  } else if (tar == 0) {
    // changeTo =  'translateY(100%)';
    // bottom = '8rem';
    //swipe.css({'transform': changeTo, 'bottom': bottom});
    returnRealHeight(swipe)
    swipe.css('max-height', '')
    swipe.addClass('limit')
    swipe.attr('swipe-data', tar)

    toDots()
  } else if (tar == -1) {
    if (data == 0) {
      $('.top-more-btn').remove()
      swipeToggle(1)
    } else if (data == 1) {
      swipeToggle(0)
    }
  }

  // 判斷箭頭的顯示模式
  toggleBtnController()
}

function toArrow() {
  $('arrow-container').attr('data-type', 'arrow')
  TweenMax.to($('.dom2'), .2, {
    'opacity': 0
  })
  TweenMax.to($('.dom1, .dom3'), .2, {
    width: '60%',
    onComplete: function () {
      TweenMax.to($('.dom1'), .2, {
        transform: 'rotate(45deg)',
        width: '48%'
      })
      TweenMax.to($('.dom3'), .2, {
        transform: 'rotate(-45deg)',
        width: '48%'
      })
    }
  })
}

function toDots() {
  $('arrow-container').attr('data-type', 'dots')

  TweenMax.to($('.dom1'), .2, {
    transform: 'rotate(0deg)'
  })
  TweenMax.to($('.dom2'), .2, {
    'opacity': 1
  })
  TweenMax.to($('.dom3'), .2, {
    transform: 'rotate(0deg)',
    onComplete: function () {
      TweenMax.to($('.dom1, .dom3'), .2, {
        width: '16%'
      })
    }
  })
}

function addEvent(obj) {
  obj.on('click', function () {
    var target = $(this)
    var copyOne = target.clone()
    var swipe = $('#swipe')
    var data = swipe.attr('swipe-data')

    // var limit = $('.selected').children().length;
    if (copyOne.hasClass('on')) {
      copyOne.removeClass('on')
      nameSelect(target)
      $('.not-select').prepend(copyOne)
      target.remove()
      addEvent(copyOne)
      // }else if(!copyOne.hasClass('on') && limit <= 7){
    } else if (!copyOne.hasClass('on')) {
      copyOne.addClass('on')
      $('.selected').prepend(copyOne)
      if ($('.selected').height() >= 240) {
        copyOne.remove()
        overHintSet($('.not-select'))
      } else {
        nameSelect(target)
        target.remove()
        addEvent(copyOne)
      }
    }
    swipe.css('max-height', returnRealHeight(swipe))

    // 點擊tag的時候自動將tag選單打開
    if (data == 0) {
      swipeToggle(1)
    }

    // 判斷箭頭的顯示模式
    toggleBtnController()
  })
}

function filter_func(e) {
  setTimeout(try_it(true, true), 1000)
  if ($(e).attr('class').indexOf('act') > 0) {
    $(e).removeClass('act')
    var heart = $(e).find('.glyphicon-heart')
    heart.removeClass('glyphicon-heart').addClass('glyphicon-heart-empty')
  } else {
    $(e).addClass('act')
    var heart = $(e).find('.glyphicon-heart-empty')
    heart.removeClass('glyphicon-heart-empty').addClass('glyphicon-heart')
  }
}

$(function () {
  var youMayLikePos = $('#YML').offset().top
  $(window).on('scroll', function () {
    $(window).one('scroll', function () {
      youMayLikePos = $('#YML').offset().top
    })
    var a = $(this).scrollTop()

    //console.log(youMayLikePos + ',' + a);

    if (a >= youMayLikePos) {
      $('#outSwipe').addClass('fixed')
      $('#waypointTarget').css('margin-top', $('#swipe').height())
      $('#mainTitle').text('您可能會喜歡').css('font-size', '4rem')
    } else {
      $('#outSwipe').removeClass('fixed')
      $('#waypointTarget').css('margin-top', '')
      $('#mainTitle').text('VenRaaS購物網').css('font-size', '3rem')
    }
  })

  $('.glyphicon-search').on('click', function (event) {
    event.stopPropagation()
    var left = event.pageX,
      top = event.pageY,
      scrollTop = $(window).scrollTop(),
      targetName = $(this).attr('data-target'),
      target = $(targetName)
    if (targetName.indexOf('03') >= 0 || targetName.indexOf('04') >= 0) {
      $('.item-hint').css({
        'z-index': 2
      })
      target.show(200).css({
        'left': left - 100,
        'top': top - scrollTop - 300,
        'z-index': 3
      })
    } else {
      $('.item-hint').css({
        'z-index': 2
      })
      target.show(200).css({
        'left': left + 100,
        'top': top - scrollTop - 300,
        'z-index': 3
      })
    }
  })
  $('.item-hint')
    .on('mousedown', '.item-hint-header', function () {
      event.stopPropagation()
      target = $(this).attr('data-target')
      target = $(target)
      $('.item-hint').css({
        'z-index': 2
      })
      target.css({
        'z-index': 3
      })
      window.addEventListener('mousemove', touches, false)
      $('body').css({
        'user-select': 'none'
      })
    })
    .on('mouseup', '.item-hint-header', function () {
      window.removeEventListener('mousemove', touches, false)
      $('body').css({
        'user-select': 'initial'
      })
    })
    .on('click', '.glyphicon-remove', function () {
      event.stopPropagation()
      target = $(this).attr('data-target')
      target = $(target)
      target.hide(200)
    })
    .on('click', '.item-hint-container', function () {
      event.stopPropagation()
      target = $(this).attr('data-target')
      target = $(target)
      $('.item-hint').css({
        'z-index': 2
      })
      target.css({
        'z-index': 3
      })
    })

  setTimeout(trigger_btn, 1000)
  setTimeout(trigger_btn, 2000)

  function trigger_btn() {
    $('.switch-arrow-right').trigger('click')
  }

  $('#swipe, .selected, not-select').on('touchstart touchmove', function (e) {
    e.stopPropagation()
  })

  $('#swipe, .selected, not-select').swipe({
    swipe: function (event, direction, distance, duration, fingerCount) {
      var swipe = $('#swipe')
      var data = swipe.attr('swipe-data')

      if (direction === 'up') {
        swipeToggle(0)
      } else if (direction === 'down') {
        swipeToggle(1)
        // if(data == 0){
        //     swipeToggle(1);
        // }else if (data == 1) {
        //     swipeToggle(2);
        // }
      }
    }
  })

  $('.tag-each-one').on('click', function () {
    var target = $(this)
    var copyOne = target.clone()
    var swipe = $('#swipe')
    var data = swipe.attr('swipe-data')

    // var limit = $('.selected').children().length;
    if (copyOne.hasClass('on')) {
      copyOne.removeClass('on')
      nameSelect(target)
      $('.not-select').prepend(copyOne)
      target.remove()
      addEvent(copyOne)
      // }else if(!copyOne.hasClass('on') && limit <= 7){
    } else if (!copyOne.hasClass('on')) {
      $('.selected').prepend(copyOne)
      if ($('.selected').height() >= 240) {
        copyOne.remove()
        overHintSet($('.not-select'))
      } else {
        copyOne.addClass('on')
        nameSelect(target)
        target.remove()
        addEvent(copyOne)
      }
    }

    // 偵測如果點擊後高度不夠即轉換型態
    var h1 = $('#ST').height()
    var h2 = $('#FT').height()
    if ((h1 + h2) < 150) {
      swipeToggle(0)
    }

    // 點擊tag的時候自動將tag選單打開
    if (data == 0) {
      swipeToggle(1)
    }
  })

  $(' #rec_pos_form , #device_form , #advenced_option_form').change(function () {
    document.cookie = 'uid=' + document.getElementById('uid').value
    document.cookie = 'gid=' + document.getElementById('gid').value
    try_it(true, true)
    if ($('#ele').prop('checked') == true) {
      $('#filter-box').show()
    } else {
      $('#filter-box').hide()
    }
  })

  $('#mobile-settings').on('change', function () {
    document.cookie = 'uid=' + document.getElementById('categ_code').value
    document.cookie = 'gid=' + document.getElementById('setting-gid').value
  })

  $(' #items-form').change(function () {
    show_slick()
  })

  var nowInput, nowVal
  $('#setting-gid, #categ_code').on('focusin', function () {
    nowInput = $(this)
    nowVal = nowInput.val()
    nowInput.select()
    nowInput.on('blur', function () {
      if ($(this).val().length == 0) {
        nowInput.val(nowVal)
      }
    })
  })

  $('input[name="rec_pos"]').change(function () {
    var temp_i = $('input:checked[name="rec_pos"]').val()
    var search1 = $('.glyphicon-search[data-target="#hint-01"]'),
      search2 = $('.glyphicon-search[data-target="#hint-02"]')

    if (temp_i == 'p') {
      $('input[name="rec_type"][value="ClickStream"]').prop('checked', true)
      $('#gid , #categ_code').attr({
        'disabled': 'disabled',
        'placeholder': 'N/A'
      }).val('')
      search1.add(search2).hide()
      $('#hint-02 .glyphicon-remove').trigger('click')
      $('#hint-01 .glyphicon-remove').trigger('click')
    } else if (temp_i == 'cap') {
      $('input[name="rec_type"][value="ClickStream"]').prop('checked', true)
      $('#gid').attr({
        'disabled': 'disabled',
        'placeholder': 'N/A'
      }).val('')
      $('#categ_code').val('328208').attr({
        'placeholder': 'default'
      }).removeAttr('disabled')
      search1.show()
      search2.hide()
      $('#hint-02 .glyphicon-remove').trigger('click')
    } else if (temp_i = 'gop') {
      $('input[name="rec_type"][value="AlsoView"]').prop('checked', true)
      $('#gid , #categ_code').attr({
        'placeholder': 'default'
      }).removeAttr('disabled')
      $('#gid').val('5742934')
      $('#categ_code').val('328208')
      search1.add(search2).show()
    }
  })

  toggleBtnController()
})

function overHintSet(obj) {
  var target = $(obj)
  var overHint = $('<div/>', {
    class: 'over-hint'
  })

  target.append(overHint)
  TweenMax.to(overHint, .5, {
    opacity: 1,
    repeat: 1,
    repeatDelay: .5,
    yoyo: true,
    onComplete: function () {
      overHint.remove()
    }
  })
  // setTimeout(function(){
  //     overHint.remove();
  //     },2000);
}

// *****TAGS*****

var goodsKeywords = null //stored goods_keywords
var selectedGoodsKeywords = [] //for selected goods_keyword
var goods_keywords = [] //for recomd
function getGoodsKeyword() {
  console.log('getGoodsKeyword()')
  var p = {}
  p.token = document.getElementById('token').value

  if (!document.getElementById('setting-gid').value) {
    // document.getElementById("gid").value = p.gid;
    document.getElementById('setting-gid').value = '5742934'
  }

  if (!document.getElementById('categ_code').value) {
    document.getElementById('categ_code').value = '328208'
  }

  p.gid = (document.getElementById('setting-gid').value) ? document.getElementById('setting-gid').value : GLOBAL_gid
  document.getElementById('setting-gid').value = GLOBAL_gid

  p.categ_code = (document.getElementById('categ_code').value) ? document.getElementById('categ_code').value : GLOBAL_cid
  document.getElementById('categ_code').value = GLOBAL_cid

  //-- ajax call for goods keywords
  console.log(JSON.stringify(p))
  venraastool.goods_keywords(p, goodsKeywordsCallback)
}

function goodsKeywordsCallback(jsonStr) {
  console.log(jsonStr)
  var result = JSON.parse(jsonStr)
  if (result.goods_keywords) {
    var htmlStr = '<div id="tagON"></div>'
    goodsKeywords = result.goods_keywords
    selectedGoodsKeywords = []
    for (i = 0; i < goodsKeywords.length; i++) {
      selectedGoodsKeywords[i] = false
      htmlStr += '<div class="tag-each-one" id="F' + i + '" order="' + i + '">' + goodsKeywords[i].value + '</div>'
    }
    document.getElementById('FT').innerHTML = htmlStr
    document.getElementById('ST').innerHTML = ''
    swipeToggle(0)

    $('.tag-each-one').each(function () {
      addEvent($(this))
    })
  }
}

var targetTag = '',
  enterTag = '',
  cloneTag = '',
  moveIcon = ''

function nameMove(event) {
  targetTag = $(this)
  cloneTag = targetTag.clone()
  moveIcon = $('.move-icon').css({
    'left': event.pageX + 15,
    'top': event.pageY + 15
  })
  var timer = setTimeout(function () {
    moveIcon.show()
    $(document).on('mousemove', function (event) {
      moveIcon.css({
        'left': event.pageX + 15,
        'top': event.pageY + 15
      })
    })
    $('#tagON').on('mouseenter', '.name', function () {
      $(this).css({
        'border-left': '10px solid rgba(0,0,0,0.3)',
        'padding-left': '10px'
      }).addClass('enter')
    }).on('mouseleave', '.name', function () {
      $(this).css({
        'border-left': 'none',
        'padding-left': '0'
      }).removeClass('enter')
    })
    $('.off').eq(0).on('mouseenter', function () {
      $(this).css({
        'border-left': '10px solid rgba(0,0,0,0.3)',
        'padding-left': '10px'
      }).addClass('last')
    }).on('mouseleave', function () {
      $(this).css({
        'border-left': 'none',
        'padding-left': '0'
      }).removeClass('last')
    })
  }, 100)
  $(window).on('mouseup', function () {
    moveIcon.hide()
    $(document).off('mousemove')
    clearTimeout(timer)
    if ($('#tagON').find('.enter').length > 0) {
      $('#tagON').off('mouseenter', '.name').off('mouseleave', '.name')
      $('.name').css({
        'border-left': 'none',
        'padding-left': '0'
      })
      cloneTag.insertBefore('.enter').on({
        'click': nameSelect,
        'mousedown': nameMove
      })
      targetTag.remove()
      $('.enter').removeClass('enter')
      // for(var i = 0; i < $('#tagON .on').length; i++){
      //   $("#tagON .on").eq(i).attr('order', i);
      // }
    } else if ($('#FT').find('.last').length > 0) {
      $('#tagON').off('mouseenter', '.name').off('mouseleave', '.name')
      $('.off').off('mouseenter').off('mouseleave')
      $('.name').css({
        'border-left': 'none',
        'padding-left': '0'
      })
      cloneTag.appendTo('#tagON').on({
        'click': nameSelect,
        'mousedown': nameMove
      })
      targetTag.remove()
      $('.last').removeClass('last')
    } else {
      $('#tagON').off('mouseenter', '.name').off('mouseleave', '.name')
      $('.off').off('mouseenter').off('mouseleave')
      $('.name').css({
        'border-left': 'none',
        'padding-left': '0'
      })
    }
  })
}

function nameSelect(obj) {
  console.log('nameSelect')
  var target = $(obj)
  var order = target.attr('order')
  var cloneTarget = ''
  if (!target.hasClass('on')) {
    selectedGoodsKeywords[order] = true
  } else {
    selectedGoodsKeywords[order] = false
  }
  goods_keywords = []
  for (i = 0; i < goodsKeywords.length; i++) {
    if (selectedGoodsKeywords[i] == true) {
      goods_keywords.push(goodsKeywords[i])
    }
  }
  try_it(false, false)

  // 選取TAG自動滾到 "您可能會喜歡"
  var youMayLikePos = $('#YML').offset().top
  var a = $(this).scrollTop()
  if (a >= youMayLikePos) {
    $(window).scrollTop($('#now-item').height() + 285)
  }
}

// *****TAGS*****

function try_it(bGoodsKeywords, bGoodsInfo) {
  console.log('try_it(): bGoodsKeywords=' + bGoodsKeywords + ', bGoodsInfo=' + bGoodsInfo)
  setTimeout(show_code, 500)
  //-- reset result
  document.getElementById('recomd_result').innerHTML = 'HERE is for printing recomd\'s result'

  var token = document.getElementById('token').value
  var rec_type = $('input[name="setting-rec_type"]:checked').val()
  var rec_pos = $('input[name="rec_pos"]:checked').val()
  var uid = document.getElementById('uid').value
  var gid = (document.getElementById('setting-gid').value) ? document.getElementById('setting-gid').value : GLOBAL_gid
  var categ_code = document.getElementById('categ_code').value
  var device = $('input[name="device"]:checked').val()
  var topk = (document.getElementById('setting-topk').value) ? document.getElementById('setting-topk').value : '10'

  rowItems = topk
  showItems = $('#showItems').val() //document.getElementById("showItems").value;
  scrollItems = $('#scrollItems').val() //document.getElementById("scrollItems").value;
  loop = document.getElementById('loop').checked
  console.log('rowItems=' + rowItems)
  console.log('showItems=' + showItems)
  console.log('scrollItems=' + scrollItems)
  console.log('loop=' + loop)

  //-- recommentation parameter with JSON form, e.g. https://github.com/VenRaaS/venraas-user-guide/wiki/Recommendation-Request-(Rec-API)#user-content-examples---post-with-json-form
  var recomdParam = {}
  if (token) recomdParam.token = token
  if (rec_type) recomdParam.rec_type = rec_type
  if (rec_pos) recomdParam.rec_pos = rec_pos
  if (uid) recomdParam.uid = uid
  if (gid) recomdParam.gid = gid
  if (categ_code) recomdParam.categ_code = categ_code
  if (device) recomdParam.device = device
  if (topk) recomdParam.topk = Number(topk)
  if (goods_keywords.length > 0) {
    recomdParam.rec_type = 'AlsoView'
    var kw_tag_list = goods_keywords.map(k => {
      var o = k
      o.field = 'goods_name'
      return o
    })
    recomdParam.key_tag_list = kw_tag_list
    recomdParam.goods_keywords = goods_keywords
    recomdParam.rec_code = 'demo_k2i_model_rec_code'
    recomdParam.rec_logic = {
      'logic_list': [{
        'logic_name': 'CurrentItem',
        'alg_list': [{
          'model_type': 'ttt',
          'weight': 1,
          'alg_name': 'K2I_Model',
          'is_random_by_vig': false
        }, {
          'model_type': 'tp',
          'weight': 1,
          'alg_name': 'C2I_Model',
          'is_random_by_vig': false
        }],
        'weight_of_alg_rec_gids_size': 1.5,
        'sort_by_socre': false
      }, {
        'logic_name': 'WhiteCategory',
        'weight_of_alg_rec_gids_size': 1.5
      }, {
        'logic_name': 'GlobalTP'
      }],
      'filter_out_last_7_day_bought_items': true,
      'filter_out_last_60_unfav_items': true
    }
  }
  console.log(JSON.stringify(recomdParam))

  //-- ajax call for recommendation
  venraastool.recomd(recomdParam, recomdCallback)
  if (bGoodsKeywords == true) {
    getGoodsKeyword()
  }
  if (bGoodsInfo = true) {
    getGoodsInfo()
  }
}

function print_rec(jsonStr) {
  console.log('print_rec')
  var pretty = JSON.stringify(JSON.parse(jsonStr), null, 2)
  document.getElementById('recomd_result').innerHTML = pretty
  document.getElementById('recomd_result_pop').innerHTML = pretty
}

function print_api() {
  console.log('print_api')
  var token = document.getElementById('token').value
  var rec_type = $('input[name="setting-rec_type"]:checked').val()
  var topk = document.getElementById('topk').value
  var uid = document.getElementById('uid').value
  var rec_pos = $('input[name="rec_pos"]:checked').val()
  var device = $('input[name="device"]:checked').val()
  var categ_code = document.getElementById('categ_code').value
  var gid = document.getElementById('setting-gid').value

  var contain_text_entities = '{'
  if (token) contain_text_entities += '\n\t"token": "' + token + '"'
  if (rec_type) contain_text_entities += ',\n\t"rec_type": "' + rec_type + '"'
  if (topk) contain_text_entities += ',\n\t"topk": "' + topk + '"'
  if (uid) contain_text_entities += ',\n\t"device": "' + device + '"'
  if (rec_pos) contain_text_entities += ',\n\t"rec_pos": "' + rec_pos + '"'
  if (device) contain_text_entities += ',\n\t"device": "' + device + '"'
  if (categ_code) contain_text_entities += ',\n\t"categ_code": "' + categ_code + '"'
  if (gid) contain_text_entities += ',\n\t"gid": "' + gid + '"'
  contain_text_entities += '\n}'

  var contain_text = $('<div/>').html(contain_text_entities).text()
  $('#api_ele , #api_ele_pop').text(contain_text)
}

var rowItems
var showItems
var scrollItems
var loop
var result

function recomdCallback(jsonStr) {
  print_rec(jsonStr)
  console.log(jsonStr)
  print_api()
  var tmp_result = JSON.parse(jsonStr)
  if (tmp_result != null) {
    result = tmp_result
    show_slick()
  }
}

function show_slick() {
  hint_control()
  showItems = document.getElementById('showItems').value
  scrollItems = document.getElementById('scrollItems').value
  loop = document.getElementById('loop').checked
  process_slick(result, 'slick-demo', loop, rowItems, showItems, scrollItems)
}

var bSlick = false
var hintText = []

function process_slick(result, div_class, loop, rowItems, showItems, scrollItems) {
  console.log('process_slick')
  var html = ''
  hintText = []
  for (var i = 0; i < result.recomd_list.length; i++) {
    html += process_item(result.recomd_list[i].goods_page_url, result.recomd_list[i].goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, i, result.recomd_list[i].id, result.recomd_list[i].category_code)
    hintText[i] = process_hintText(result.recomd_list[i].ref_item_list, result.recomd_list[i].sales)
  }

  if (bSlick == true) {
    $('.' + div_class).html('')
    bSlick = false
  }

  var btn_color = $('#btn-color').css('background-color'),
    bg_color = $('#bg-color').css('background-color')

  $('.slick-demo').css({
    'background-color': bg_color
  })
  console.log('loop=' + loop)
  console.log('rowItems=' + rowItems)
  console.log('showItems=' + showItems)
  console.log('scrollItems=' + scrollItems)
  $('.' + div_class).html(html)
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
  bSlick = true
}

function process_result(result, div_class, loop, rowItems, showItems, scrollItems) {
  console.log('process_slick')
  var html = ''
  hintText = []
  for (var i = 0; i < result.recomd_list.length; i++) {
    html += process_item1(result.recomd_list[i].goods_page_url, 'https://titan.venraas.tw' + result.recomd_list[i].goods_img_url, result.recomd_list[i].name, result.recomd_list[i].sale_price, i, result.recomd_list[i].id)
    hintText[i] = process_hintText(result.recomd_list[i].ref_item_list, result.recomd_list[i].sales)
  }

  if (bSlick == true) {
    $('.' + div_class).html('')
    bSlick = false
  }

  var btn_color = $('#btn-color').css('background-color'),
    bg_color = $('#bg-color').css('background-color')

  $('.slick-demo').css({
    'background-color': bg_color
  })
  console.log('loop=' + loop)
  console.log('rowItems=' + rowItems)
  console.log('showItems=' + showItems)
  console.log('scrollItems=' + scrollItems)
  $('.' + div_class).html(html)
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
  bSlick = true
}

/*
 * prevArrow: '<div class="slick-prev" style="height:100%; vertical-align: middle;"><div style="position: absolute; top: 40%; right: 10px;"><svg style="fill:'+ btn_color +';" height="60" width="60"> <polygon points="60,0 30,30 60,60" class="triangle" /> </svg></div></div>',
 * nextArrow: '<div class="slick-next" style="height:100%; vertical-align: middle;"><div style="position: absolute; top: 40%; left: 10px;"><svg style="fill:'+ btn_color +';" height="60" width="60"> <polygon points="0,0 30,30 0,60" class="triangle" /> </svg></div></div>',
 * */

function percentFormat(str, fn) {
  var num = 0

  if (typeof str == 'string') {
    //不是數字就傳回原來的
    if (isNaN(str)) {
      return str
    }

    num = Number(str)
  } else if (typeof str == 'number') {
    num = str
  } else {
    return str
  }

  if (fn == '%') {
    return (num * 100)
  }

  fn1 = fn.substring(1)
  if (isNaN(fn1)) {
    return (num * 100)
  }

  return Number((num * 100).toFixed(Number(fn1)))
}

var ModelType1_ModelType = ['I2I_Model']
var ModelType1_ModelAlg = ['cooc_i2i', 'coocm', 'cooc_rank', 'cooc_98', 'cooc_98v2']
var ModelType1_MsgContent = '看此商品也看'
var ModelType1_recScoreField = '<div class=\'p-50\'>關聯度</div>'

var ModelType2_ModelType = ['I2I_Model']
var ModelType2_ModelAlg = ['content_i2i', 'content_rank', 'content_tp']
var ModelType2_MsgContent = '近似商品'
var ModelType2_recScoreField = '<div class=\'p-50\'>相似度</div>'

var ModelType3_ModelType = ['C2I_Model', 'CP2I_Model']
var ModelType3_ModelAlg = ['tp', 'tpm']
var ModelType3_MsgContent = '本類HOT'
var ModelType3_recScoreField = '<div class=\'p-50\'>熱門度</div>'
var ModelType3_recScoreField2 = '<div class=\'p-50\'>近30日銷量</div>'

var ModelType4_ModelType = ['GlobalTP_Major', 'GlobalTP_Minor']
var ModelType4_ModelAlg = ['tp']
var ModelType4_MsgContent = '全站HOT'
var ModelType4_recScoreField = '<div class=\'p-50\'>熱門度</div>'
var ModelType4_recScoreField2 = '<div class=\'p-50\'>近30日銷量</div>'

var ModelType5_ModelType = ['CS_ITEM']
var ModelType5_ModelAlg = ['']
var ModelType5_MsgContent = '您最近看過'

var ModelType6_MsgContent = '特別推薦'
var ModelType6_recScoreField = '<div class=\'p-50\'>推薦度</div>'

function process_hintText(ref_item_list, sales) {
  if (ref_item_list == null) {
    return ''
  }
  if (ref_item_list.length < 1) {
    return ''
  }

  for (var i = 0; i < ref_item_list.length; i++) {
    for (var j = 0; j < ModelType1_ModelType.length; j++) {
      if (ref_item_list[i].model_type == ModelType1_ModelType[j]) {
        for (var k = 0; k < ModelType1_ModelAlg.length; k++) {
          if (ref_item_list[i].model_alg == ModelType1_ModelAlg[k]) {
            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : ''
            if (score <= 1) {
              score = percentFormat(score, '%2') + '%'
            }
            return '<div class=\'p-50\'>推薦理由</div><div style=\'display: inline-block\'>' + ModelType1_MsgContent + '</div><br>' + ModelType1_recScoreField + score
          }
        }
      }
    }
  }
  for (var i = 0; i < ref_item_list.length; i++) {
    for (var j = 0; j < ModelType2_ModelType.length; j++) {
      if (ref_item_list[i].model_type == ModelType2_ModelType[j]) {
        for (var k = 0; k < ModelType2_ModelAlg.length; k++) {
          if (ref_item_list[i].model_alg == ModelType2_ModelAlg[k]) {
            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : ''
            if (score <= 1) {
              score = percentFormat(score, '%2') + '%'
            }
            return '<div class=\'p-50\'>推薦理由</div><div style=\'display: inline-block\'>' + ModelType2_MsgContent + '</div><br>' + ModelType2_recScoreField + score
          }
        }
      }
    }
  }
  for (var i = 0; i < ref_item_list.length; i++) {
    for (var j = 0; j < ModelType3_ModelType.length; j++) {
      if (ref_item_list[i].model_type == ModelType3_ModelType[j]) {
        for (var k = 0; k < ModelType3_ModelAlg.length; k++) {
          if (ref_item_list[i].model_alg == ModelType3_ModelAlg[k]) {
            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : ''
            if (score <= 1) {
              score = percentFormat(score, '%2') + '%'
            }
            var salesStr = ''
            if (sales >= 50) {
              salesStr = '<br>' + ModelType3_recScoreField2 + sales + '件'
            }
            return '<div class=\'p-50\'>推薦理由</div><div style=\'display: inline-block\'>' + ModelType3_MsgContent + '</div><br>' + ModelType3_recScoreField + score + salesStr
          }
        }
      }
    }
  }
  for (var i = 0; i < ref_item_list.length; i++) {
    for (var j = 0; j < ModelType4_ModelType.length; j++) {
      if (ref_item_list[i].model_type == ModelType4_ModelType[j]) {
        for (var k = 0; k < ModelType4_ModelAlg.length; k++) {
          if (ref_item_list[i].model_alg == ModelType4_ModelAlg[k]) {
            var score = (ref_item_list[i].score != null) ? ref_item_list[i].score : ''
            if (score <= 1) {
              score = percentFormat(score, '%2') + '%'
            }
            var salseStr = ''
            if (sales >= 50) {
              salesStr = '<br>' + ModelType4_recScoreField2 + sales + '件'
            }
            return '<div class=\'p-50\'>推薦理由</div><div style=\'display: inline-block\'>' + ModelType4_MsgContent + '</div><br>' + ModelType4_recScoreField + score + salesStr
          }
        }
      }
    }
  }
  for (var i = 0; i < ref_item_list.length; i++) {
    for (var j = 0; j < ModelType5_ModelType.length; j++) {
      if (ref_item_list[i].model_type == ModelType5_ModelType[j]) {
        for (var k = 0; k < ModelType5_ModelAlg.length; k++) {
          if (ref_item_list[i].model_alg == ModelType5_ModelAlg[k]) {
            return '<div class=\'p-50\'>推薦理由</div><div style=\'display: inline-block\'>' + ModelType5_MsgContent + '</div><br>'
          }
        }
      }
    }
  }

  var score = (ref_item_list[0].score != null) ? ref_item_list[0].score : ''
  if (score <= 1) {
    score = percentFormat(score, '%2') + '%'
  }
  return '<div class=\'p-50\'>推薦理由</div><div style=\'display: inline-block\'>' + ModelType6_MsgContent + '</div><br>' + ModelType6_recScoreField + score
}

function process_item(addr, img, name, price, i, gid, cid) {
  var title_color = $('#title-color').css('background-color'),
    price_color = $('#price-color').css('background-color'),
    title_size = '2rem',
    price_size = '3.4rem',
    price_sign_color = $(' #price-sign-color').css('background-color'),
    price_sign_size = '3.4rem'

  var html = `
    <div class="itemSlide col-6" style="margin-bottom: -2rem; position: relative;" hintIndex="${i}">
      <div style="padding: 2rem;">
        <div class="slick-num${i}" onclick="dev_func(this)" style="width: 100%; text-align: center;" data-gid="${gid}" data-cid="${cid}">
            <img src="${img}" style="width: 100%;" >
        </div>
        <div style="text-align: left;">
            <a class="href-a" target="_blank" href="${addr}">
                <span style="margin: 5px 0;font-size: ${title_size};height: ${parseInt(title_size * 3)};display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:${title_color};">${name}</span>
            </a>
        </div>
        <div style="font-size: ${price_size};font-weight: 900;color:${price_color};text-align:left;">
            <span style="font-weight: normal;font-size: ${price_sign_size}; color:${price_sign_color};">$</span>
            <span style="margin-botton: 10px; font-size: ${price_size}; color: ${price_color}">${price}</span>
        </div>
      </div>
    </div>`

  return html
}

function process_item1(addr, img, name, price, i, gid) {
  console.log('img:' + img)
  var title_color = $('#title-color').css('background-color'),
    price_color = $('#price-color').css('background-color'),
    title_size = '2rem',
    price_size = '4rem',
    price_sign_color = $(' #price-sign-color').css('background-color'),
    price_sign_size = '4rem'

  if (price) {} else {
    price = '0'
  }
  var html = `
    <div class="itemSlide col-6" style="margin-bottom: -2rem; position: relative;" hintIndex="${i}">
      <div style="padding: 2rem;">
        <div class="slick-num${i}" onclick="dev_func(this)" style="width: 100%; text-align: center;" data-gid="${gid}">
          <img src="${img}" style="width: 100%;" >
        </div>
        <div style="text-align: left;">
          <a class="href-a" target="_blank" href="${addr}">
            <span style="height: 6rem; margin: 5px 0;font-size: ${title_size};height: ${parseInt(title_size * 3)};display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:${title_color};">${name}</span>
          </a>
        </div>
        <div style="font-size: ${price_size};font-weight: 900;color:${price_color};text-align:left;">
          <span style="font-weight: normal;font-size: ${price_sign_size}; color: ${price_sign_color};">$</span>
          <span style="font-size: ${price_size}; color: ${price_color}">${price}</span>
        </div>
      </div>
    </div>`

  return html
}


function dev_func(obj) {
  var item_cid = $(obj).attr('data-cid')
  var item_gid = $(obj).attr('data-gid')
  GLOBAL_gid = item_gid
  GLOBAL_cid = item_cid
  $('#categ_code').val(item_cid)
  $('#setting-gid').val(item_gid)
  document.cookie = 'uid=' + item_cid
  document.cookie = 'gid=' + item_gid

  // $('#now-item').html(clone_item.html());
  var url = window.location.href
  if (url.indexOf('?') > -1) {
    url = url.substring(0, url.indexOf('?'))
  }
  url += '?gid=' + GLOBAL_gid + '&cid=' + GLOBAL_cid
  if (GLOBAL_photo != "") {
    url += '&photo=' + GLOBAL_photo;
  }
  window.location.href = url
  try_it(true, true)
  $(document).scrollTop(0);

  //點擊 推薦商品 時自動將畫面滾動到最上方
  //$(document).scrollTop(0);
}

function getGoodsInfo() {
  console.log('getGoodsInfo')
  var token = document.getElementById('token').value
  var gid = document.getElementById('setting-gid').value
  console.log('\ttoken=' + token)
  console.log('\tgid=' + gid)

  if (gid == '') {
    $('#hint-02 .item-hint-container').html('Oops...<br>此商品編號無對應之商品')
    return
  }

  var data = {}
  if (token) data['token'] = token
  if (gid) data['gid'] = gid

  $.ajax({
    url: 'https://apir.venraas.tw/cupid/api/goods/info',
    dataType: 'html',
    type: 'GET',
    data: data,
    success: function (msg, status, xhr) {
      console.log('getGoodsInfo:' + msg)
      var ret = JSON.parse(msg)
      var title_color = $('#title-color').css('background-color'),
        price_color = $('#price-color').css('background-color'),
        title_size = '3rem',
        price_size = '6rem',
        price_sign_color = $(' #price-sign-color').css('background-color'),
        price_sign_size = '3rem'
      var html = '<div style="margin: 0 10px 10px 10px;">'
      html += '<div class="nowSeeBox"><img src="' + ret.goods_img_url + '" style="width: 100%;"><div><span style="white-space:normal;margin: 5px 0;font-size: ' + title_size + 'px;height: ' + parseInt(title_size * 3) + 'px;display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color + ';">' + ret.goods_name + '</span></div><div style="font-size: ' + price_size + 'px;font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + 'px; color:' + price_sign_color + ';">$</span>' + ret.sale_price + '</div></div></div>'
      $('#hint-02 .item-hint-container').html(html)

      html = '<div style="margin: 0 10px 10px 10px;">'
      html += '<a><img src="' + ret.goods_img_url + '" style="width: 80%; min-width:90px;"></a><div><a class="href-a" target="_blank" href="' + ret.goods_page_url + '"><span style="margin: 5px 0;font-size: ' + title_size + ';height: ' + parseInt(title_size * 3) + ';display: block;overflow: hidden;word-wrap: break-word;word-break: break-all;color:' + title_color + ';" title="' + ret.goods_name + '">' + ret.goods_name + '</span></div><div style="font-size: ' + price_size + ';font-weight: 900;color:' + price_color + ';text-align:center;"><span style="font-weight: normal;font-size: ' + price_sign_size + '; color:' + price_sign_color + ';">$</span>' + ret.sale_price + '</a></div></div>'
      $('#now-item').html(html)
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log('1: error')
      console.log('2: ' + xhr.status)
      console.log('3: ' + thrownError)
    }
  })
}

function show_code() {
  var html_slick = $('.slider').parent().html()
  $('textarea#html_code').val(html_slick)
}

var hint_control_check = true

function show_hint(obj, b) {
  var this_info = $(obj),
    this_slide = this_info.parent('.slick-slide'),
    hint = $('.info-hint'),
    coord = this_slide.offset(),
    a_w = this_info.parent('.slick-slide').width(),
    setbot = $(window).height() - coord.top,
    hint_tri = hint.find('#hint-triangle'),
    right_amount

  a_w = parseInt(a_w)

  var idx = this_info.parent().attr('hintIndex')
  if (b) {
    $('#hint_text').html(hintText[idx])
    right_amount = (parseInt(hint.width()) + 18 - a_w) / 2
    hint.removeClass('display-none').css({
      'min-width': a_w + 20 + 'px',
      'top': '',
      'bottom': setbot + 15,
      'left': coord.left - right_amount
    })
    hint_tri.css({
      'right': right_amount - 5
    })
  } else {
    hint.addClass('display-none')
  }
}

function hint_control() {
  if (hint_control_check) {
    var hint_color = $('#hint-color').css('background-color'),
      hint_text_color = $('#hint-text-color').css('background-color'),
      hint_opacity = $('#color-opacity').val()

    $('.info-hint-demo').css({
      'background-color': hint_color,
      'color': hint_text_color,
      'opacity': hint_opacity
    })
    $('.info-hint').css({
      'background-color': hint_color,
      'color': hint_text_color,
      'opacity': hint_opacity
    })
    $('#hint-triangle , .hint-triangle , #hint-triangle-demo').css({
      'color': hint_color
    })
  }
}

$(function () {
  $('#upload-form').on('submit', (function (ev) {
    ev.preventDefault()

    $.ajax({
      xhr: function () {
        var progress = $('.progress'),
          xhr = $.ajaxSettings.xhr()

        progress.show()

        xhr.upload.onprogress = function (ev) {
          if (ev.lengthComputable) {
            var percentComplete = parseInt((ev.loaded / ev.total) * 100)
            progress.val(percentComplete)
            if (percentComplete === 100) {
              progress.hide().val(0)
            }
          }
        }

        return xhr
      },

      url: 'https://titan.venraas.tw/cupid/api/image/rank/' + $('#file').val().split('\\').pop(),
      type: 'POST',
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function (data, status, xhr) {
        $('.preloader').addClass('off')

        let str = 'https://titan.venraas.tw' + data.uploaded_file_url
        document.cookie = 'photo=' + str
        GLOBAL_photo = str

        console.log(str)
        console.log(JSON.stringify(data))

        var tmp_result = data
        if (tmp_result != null) {
          result = tmp_result
          hint_control()
          showItems = document.getElementById('showItems').value
          scrollItems = document.getElementById('scrollItems').value
          loop = document.getElementById('loop').checked
          process_result(result, 'camera-recommed-list', loop, rowItems, showItems, scrollItems)
        }
      },
      error: function (xhr, status, error) {
        $('.preloader').addClass('off')
        console.log('error for https://titan.venraas.tw/cupid/api/image/rank/')
        console.log('file path: ' + $('#file').val())
      }
    })
  }))
})
