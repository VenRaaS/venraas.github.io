/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/core/screen_cut.js":
/*!*******************************!*\
  !*** ./js/core/screen_cut.js ***!
  \*******************************/
/*! exports provided: screenCut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"screenCut\", function() { return screenCut; });\nlet $ = window.$\r\n\r\n// photo cut plugin\r\nconst screenCut = class {\r\n  constructor(obj) {\r\n    this.target = $(obj)\r\n    this.frameTemplate = $('<div/>', {\r\n      id: 'TA',\r\n      class: 'touch-area'\r\n    })\r\n    this.LShadow = $('<div/>', {\r\n      id: 'LS'\r\n    })\r\n    this.TShadow = $('<div/>', {\r\n      id: 'TS'\r\n    })\r\n    this.RShadow = $('<div/>', {\r\n      id: 'RS'\r\n    })\r\n    this.BShadow = $('<div/>', {\r\n      id: 'BS'\r\n    })\r\n    this.confirmBtn = $('<div/>', {\r\n      id: 'CBS',\r\n      class: 'confirm-btn',\r\n      text: '送出'\r\n    }).on('click', () => {\r\n      $('.preloader').removeClass('off')\r\n      $('#photoPosition').val(this.framePositionPrint('percent'))\r\n      $('#upload-form').submit()\r\n    })\r\n    this.LTTemplate = $('<div/>', {\r\n      id: 'LT'\r\n    })\r\n    this.LBTemplate = $('<div/>', {\r\n      id: 'LB'\r\n    })\r\n    this.RTTemplate = $('<div/>', {\r\n      id: 'RT'\r\n    })\r\n    this.RBTemplate = $('<div/>', {\r\n      id: 'RB'\r\n    })\r\n    this.MTemplate = $('<div/>', {\r\n      id: 'M_T'\r\n    })\r\n    this.position = {\r\n      x: 0,\r\n      y: 0\r\n    }\r\n    this.pluginPosition = {\r\n      left: 25,\r\n      top: 25,\r\n      right: 25,\r\n      bottom: 25\r\n    }\r\n\r\n    this.defaultSettings()\r\n  }\r\n\r\n  defaultSettings() {\r\n    var plugin = this\r\n\r\n    this.frameTemplate\r\n      .append(this.LTTemplate)\r\n      .append(this.LBTemplate)\r\n      .append(this.RTTemplate)\r\n      .append(this.RBTemplate)\r\n      .append(this.TShadow)\r\n      .append(this.LShadow)\r\n      .append(this.BShadow)\r\n      .append(this.RShadow)\r\n      .append(this.MTemplate)\r\n\r\n    this.target.css({\r\n      'position': 'relative',\r\n      'margin-bottom': '8rem'\r\n    }).append(this.frameTemplate)\r\n\r\n    this.target.append(this.confirmBtn)\r\n\r\n    $('html').on('vmousedown', function (event) {\r\n      event.preventDefault()\r\n    }).on('vmousedown', '#M_T', function (e) {\r\n      console.log(e)\r\n      plugin.position = {\r\n        x: e.pageX,\r\n        y: e.pageY\r\n      }\r\n\r\n      function testing(ev) {\r\n        ev.stopPropagation()\r\n        ev.preventDefault()\r\n        ev.stopImmediatePropagation()\r\n\r\n        // plugin.bodyScroll(false);\r\n\r\n        var currentPosition = {\r\n          x: ev.changedTouches[0].clientX,\r\n          y: ev.changedTouches[0].clientY\r\n        }\r\n\r\n        plugin.frameMove(plugin.position, currentPosition, 'M')\r\n      }\r\n\r\n      window.addEventListener('touchmove', testing, {\r\n        passive: false\r\n      })\r\n\r\n      $('body').one('vmouseup', function () {\r\n        window.removeEventListener('touchmove', testing, false)\r\n        plugin.framePositionSet()\r\n\r\n      })\r\n    }).on('vmousedown', '#LT', function (e) {\r\n\r\n      plugin.position = {\r\n        x: e.pageX,\r\n        y: e.pageY\r\n      }\r\n\r\n      function testing(ev) {\r\n        ev.stopPropagation()\r\n        ev.preventDefault()\r\n        ev.stopImmediatePropagation()\r\n\r\n        var currentPosition = {\r\n          x: ev.changedTouches[0].clientX,\r\n          y: ev.changedTouches[0].clientY\r\n        }\r\n\r\n        plugin.frameMove(plugin.position, currentPosition, 'LT')\r\n      }\r\n\r\n      window.addEventListener('touchmove', testing, {\r\n        passive: false\r\n      })\r\n\r\n      $('body').one('vmouseup', function () {\r\n        window.removeEventListener('touchmove', testing, false)\r\n        plugin.framePositionSet()\r\n\r\n      })\r\n    }).on('vmousedown', '#LB', function (e) {\r\n\r\n      plugin.position = {\r\n        x: e.pageX,\r\n        y: e.pageY\r\n      }\r\n\r\n      function testing(ev) {\r\n        ev.stopPropagation()\r\n        ev.preventDefault()\r\n        ev.stopImmediatePropagation()\r\n        console.log(ev)\r\n\r\n        console.log('1')\r\n\r\n        var currentPosition = {\r\n          x: ev.changedTouches[0].clientX,\r\n          y: ev.changedTouches[0].clientY\r\n        }\r\n\r\n        console.log(currentPosition)\r\n\r\n        plugin.frameMove(plugin.position, currentPosition, 'LB')\r\n\r\n      }\r\n\r\n      window.addEventListener('touchmove', testing, {\r\n        passive: false\r\n      })\r\n\r\n      // var listener = $('body').on('vmousemove', testing);\r\n\r\n      $('body').one('vmouseup', function () {\r\n        window.removeEventListener('touchmove', testing, false)\r\n        // listener.off('vmousemove');\r\n        plugin.framePositionSet()\r\n\r\n      })\r\n    }).on('vmousedown', '#RT', function (e) {\r\n\r\n      plugin.position = {\r\n        x: e.pageX,\r\n        y: e.pageY\r\n      }\r\n\r\n      function testing(ev) {\r\n        ev.stopPropagation()\r\n        ev.preventDefault()\r\n        ev.stopImmediatePropagation()\r\n\r\n        var currentPosition = {\r\n          x: ev.changedTouches[0].clientX,\r\n          y: ev.changedTouches[0].clientY\r\n        }\r\n\r\n        plugin.frameMove(plugin.position, currentPosition, 'RT')\r\n      }\r\n\r\n      window.addEventListener('touchmove', testing, {\r\n        passive: false\r\n      })\r\n\r\n      $('body').one('vmouseup', function () {\r\n        window.removeEventListener('touchmove', testing, false)\r\n        plugin.framePositionSet()\r\n\r\n      })\r\n    }).on('vmousedown', '#RB', function (e) {\r\n\r\n      plugin.position = {\r\n        x: e.pageX,\r\n        y: e.pageY\r\n      }\r\n\r\n      function testing(ev) {\r\n        ev.stopPropagation()\r\n        ev.preventDefault()\r\n        ev.stopImmediatePropagation()\r\n\r\n        var currentPosition = {\r\n          x: ev.changedTouches[0].clientX,\r\n          y: ev.changedTouches[0].clientY\r\n        }\r\n\r\n        plugin.frameMove(plugin.position, currentPosition, 'RB')\r\n      }\r\n\r\n      window.addEventListener('touchmove', testing, {\r\n        passive: false\r\n      })\r\n\r\n      $('body').one('vmouseup', function () {\r\n        window.removeEventListener('touchmove', testing, false)\r\n        plugin.framePositionSet()\r\n\r\n      })\r\n    })\r\n  }\r\n\r\n  bodyScroll(bool) {\r\n    if (!bool) {\r\n      $('html body').css({\r\n        'max-width': '100%',\r\n        'max-height': '100%',\r\n        'overflow': 'hidden'\r\n      })\r\n    } else {\r\n      $('html body').css({\r\n        'max-width': '',\r\n        'max-height': '',\r\n        'overflow': ''\r\n      })\r\n    }\r\n  }\r\n\r\n  frameMove(pos1, pos2, str) {\r\n    var moveX = pos1.x - pos2.x\r\n    var moveY = pos1.y - pos2.y\r\n    // var plugin = this\r\n\r\n    if (str == 'LT') {\r\n      this.frameChange(moveX, moveY)\r\n    } else if (str == 'LB') {\r\n      this.frameChange(moveX, 0, 0, -moveY)\r\n    } else if (str == 'RT') {\r\n      this.frameChange(0, moveY, -moveX)\r\n    } else if (str == 'RB') {\r\n      this.frameChange(0, 0, -moveX, -moveY)\r\n    } else if (str == 'M') {\r\n      this.frameChange(moveX, moveY, -moveX, -moveY)\r\n    }\r\n    // console.log(\"move: \" + moveX + ', ' + moveY);\r\n  }\r\n\r\n  frameChange(L = 0, T = 0, R = 0, B = 0) {\r\n    var tempL = this.pluginPosition.left - L\r\n    var tempT = this.pluginPosition.top - T\r\n    var tempR = this.pluginPosition.right - R\r\n    var tempB = this.pluginPosition.bottom - B\r\n    var limit = 20\r\n\r\n    tempL = (tempL < limit) ? limit : tempL\r\n    tempT = (tempT < limit) ? limit : tempT\r\n    tempR = (tempR < limit) ? limit : tempR\r\n    tempB = (tempB < limit) ? limit : tempB\r\n\r\n    var limitX = $('#OI').width() - (limit * 2) - 80\r\n    var limitY = $('#OI').height() - (limit * 2) - 80\r\n\r\n    tempL = (tempL > limitX) ? limitX : tempL\r\n    tempT = (tempT > limitY) ? limitY : tempT\r\n    tempR = (tempR > limitX) ? limitX : tempR\r\n    tempB = (tempB > limitY) ? limitY : tempB\r\n\r\n    this.frameTemplate.css({\r\n      left: tempL,\r\n      top: tempT,\r\n      right: tempR,\r\n      bottom: tempB\r\n    })\r\n  }\r\n\r\n  framePositionSet() {\r\n    var target = $('#TA')\r\n    this.pluginPosition = {\r\n      left: parseInt(target.css('left')),\r\n      top: parseInt(target.css('top')),\r\n      right: parseInt(target.css('right')),\r\n      bottom: parseInt(target.css('bottom'))\r\n    }\r\n\r\n    // console.log(this.pluginPosition);\r\n  }\r\n\r\n  framePositionPrint(str) {\r\n    var current = this\r\n    var LT = {\r\n      x: current.pluginPosition.left,\r\n      y: current.pluginPosition.top\r\n    }\r\n    var RB = {\r\n      x: LT.x + current.frameTemplate.width(),\r\n      y: LT.y + current.frameTemplate.height()\r\n    }\r\n    var temp\r\n\r\n    if (str == 'percent') {\r\n      temp = (LT.x / current.target.width()).toFixed(3) + ',' + (LT.y / current.target.height()).toFixed(3) + ',' + (RB.x / current.target.width()).toFixed(3) + ',' + (RB.y / current.target.height()).toFixed(3)\r\n    } else {\r\n      temp = LT.x + ',' + LT.y + ',' + RB.x + ',' + RB.y\r\n    }\r\n\r\n    console.log(temp)\r\n    return temp\r\n  }\r\n\r\n  closeEvent() {\r\n    $('body').off()\r\n  }\r\n\r\n  reset() {\r\n    this.frameTemplate.remove()\r\n    this.confirmBtn.remove()\r\n  }\r\n}\n\n//# sourceURL=webpack:///./js/core/screen_cut.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! exports provided: takePhoto */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"takePhoto\", function() { return takePhoto; });\n/* harmony import */ var _core_screen_cut__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/screen_cut */ \"./js/core/screen_cut.js\");\n\r\n\r\n/**\r\n * 拍照模式抓取的商品為 momo 購物網\r\n * 推薦清單抓取的商品為 friday\r\n * 兩者不相容\r\n */\r\n\r\nvar $ = window.$\r\nvar cameraType = false\r\nvar newScreenCut = undefined\r\n\r\nfunction dev_func_camera(obj) {\r\n  toggleCameramode()\r\n  var clone_item = $(obj).parents('.itemSlide'),\r\n    item_href = clone_item.find('.href-a').attr('href'),\r\n    gid_where = item_href.indexOf('pid=')+4,\r\n    cid_where = item_href.indexOf('cid=')+4,\r\n    item_gid = parseInt(item_href.substr(gid_where, 7)),\r\n    item_cid = parseInt(item_href.substr(cid_where, 6))\r\n    // alert(gid_where+','+cid_where);\r\n    // alert(item_href+\" .gid:\" + item_gid + \" .cid:\" + item_cid);\r\n  $('#categ_code').val(item_cid)\r\n  GLOBAL_gid = item_gid\r\n  $('#setting-gid').val(item_gid)\r\n  document.cookie = 'uid=' + item_cid\r\n  document.cookie = 'gid=' + item_gid\r\n  $('#now-item').html(clone_item.html())\r\n  try_it(true, true)\r\n  $(document).scrollTop(0)\r\n}\r\n\r\nfunction readURL(input) {\r\n  if (input.files.length > 0) {\r\n    if(newScreenCut !== undefined){\r\n      _core_screen_cut__WEBPACK_IMPORTED_MODULE_0__[\"screenCut\"].reset()\r\n    }\r\n\r\n    var reader = new FileReader()\r\n\r\n    reader.onload = function (e) {\r\n      var url = e.target.result\r\n      $('#OI').attr('src', url)\r\n      $('#RTI').attr('src', url)\r\n      cameraType = false\r\n      toggleCameramode()\r\n    }\r\n\r\n    newScreenCut = new _core_screen_cut__WEBPACK_IMPORTED_MODULE_0__[\"screenCut\"]($('#CIC'))\r\n\r\n    reader.readAsDataURL(input.files[0])\r\n    $('.camera-container').removeClass('off')\r\n\r\n    var upload_input = document.getElementById('file')\r\n    upload_input.files = input.files\r\n  }\r\n}\r\n\r\nfunction skipCameraMode() {\r\n  if(cameraType){\r\n    $(window).scrollTop(0)\r\n    cameraType = false\r\n    WADBack = $('#WAD').html()\r\n    $('.result.ok').css({'top': '150px', 'transition': '0s all'})\r\n    var eTop = $('#HF').offset().top //get the offset top of the element\r\n    var HF = $('#HF').clone()\r\n    console.log(eTop, HF)\r\n    HF.attr({'id': '#HFI'}).css({'right': '95px', 'top': eTop - $(window).scrollTop(), 'position': 'fixed', 'z-index': '10000' })\r\n    HF.on('click', function(){\r\n      $('#WAD').html(WADBack)\r\n      cameraType = true\r\n      toggleCameramode()\r\n      $(window).scrollTop(0)\r\n      $('.result.ok').css({'opacity': '1', 'transition': '.4s all cubic-bezier(.58,.26,.77,.62)'})\r\n      HF.remove()\r\n      $('.tag-each-one').each(function(){\r\n        addEvent($(this))\r\n      })\r\n      $('#swipe, .selected, not-select').on('touchstart touchmove', function(e){\r\n        e.stopPropagation()\r\n      })\r\n\r\n      $('#swipe, .selected, not-select').swipe({\r\n        swipe:function(event, direction, distance, duration, fingerCount)\r\n        {\r\n          var swipe = $('#swipe')\r\n          data = swipe.attr('swipe-data')\r\n\r\n          if(direction === 'down'){\r\n            swipeToggle(0)\r\n          }else if (direction === 'up') {\r\n            if(data == 0){\r\n              swipeToggle(1)\r\n            }else if (data == 1) {\r\n              swipeToggle(2)\r\n            }\r\n          }\r\n        }\r\n      })\r\n    })\r\n    HF.prependTo('body')\r\n    TweenMax.to(HF, 2, {top: '95%', 'right': '20px', 'opacity': '.5', ease: Power4.easeIn})\r\n    TweenMax.to($('.result.ok'), .5, {opacity: 0})\r\n    toggleCameramode()\r\n  }\r\n}\r\n\r\nfunction toggleCameramode(){\r\n  if(!cameraType){\r\n    cameraType = true\r\n    $('.result-container').addClass('off')\r\n    $('.whole-ad-camera').removeClass('off')\r\n    // $('#setting-gid').val('6127210');\r\n    // $('.camera-container').addClass('small').removeClass('off');\r\n    // $('.now-item-title').text('您所拍攝的商品');\r\n    // $('.result.ok').css({'top': '150px'});\r\n  }else {\r\n    cameraType = false\r\n    $('#RT1').addClass('on')\r\n    $('.result-container').removeClass('off')\r\n    $('.whole-ad-camera').addClass('off')\r\n    // $('#setting-gid').val('');\r\n    // $('.camera-container').removeClass('small').addClass('off');\r\n    // $('.now-item-title').text('現在觀看商品');\r\n    // setTimeout(function(){\r\n    //     $('.result-container').addClass('off');\r\n    // },500);\r\n  }\r\n}\r\n\r\nconst takePhoto = function () {\r\n  event.preventDefault()\r\n  $('#TC').trigger('click')\r\n  $(window).scrollTop(0)\r\n}\r\n\r\nconst eventListenerInit = function () {\r\n  let $ = window.$\r\n\r\n  $(window).on('scroll', function () {\r\n    if ($(this).scrollTop() < 1) {\r\n      $(this).scrollTop(1)\r\n    }\r\n\r\n    $('#RT1').css('top', $(this).scrollTop() + 150 + 'px')\r\n  })\r\n\r\n\r\n  $('body')\r\n    .on('click', '#cameraBtn', () => {\r\n      takePhoto()\r\n    })\r\n    .on('click', '#RT1', () => {\r\n      toggleCameramode()\r\n    })\r\n\r\n  $('#TC').on('change', function () {\r\n    readURL(this)\r\n  })\r\n}\r\n\r\n$(eventListenerInit)\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ })

/******/ });