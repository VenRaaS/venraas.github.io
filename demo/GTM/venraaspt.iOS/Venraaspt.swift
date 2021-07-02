//
//  Venraaspt.swift
//  VenraasptDemoApp
//
//  Created by 廖文全 on 2020/4/15.
//  Copyright © 2020 Charlie Liao. All rights reserved.
//

import Foundation

class Venraaspt: NSObject {

    static let mInstance = Venraaspt()

    let apiUuid = "/venapis/vengu"
    let apiLog = "/venapis/log"
    let apiHermes = "/hermes/api/goods/rank"

    var serverLog = ""
    var serverHermes = ""
    
    var token = ""
    var domain = ""
    var clientHost = ""
    var topHost = ""
    var venGuid = ""
    var venSession = ""

    var userId = ""
    var action = ""
    var pageType = ""
    var categoryCode = ""
    var goodsId = ""
    var transI = ""
    var nowRec = ""
    var fromRec = ""
    var device = "mbe"
    var keyword = ""
    //2020年新增參數
    var refInfo = ""
    var wCategInfo = ""
    var bCategInfo = ""
    //2021年新增參數
    var excludedIds = ""
    var blocklist = ""
    var refTagList = ""
    var rescoreTagList = ""

    var jGoods = ""

    private override init() {
        print("Venraaspt init...")
    }
    
    deinit {
        print("deinit...")
    }

    /**
     Venraaspt 使用前必須先呼叫ven_init設定必需的參數
     
     :param: _serverLog  weblog server domain
     :param: _serverHermes  recomd server domain
     :param: _token  電商的token
     :param: _domain  電商的domain
     :param: _clientHost
     :param: _topHost
     :param: _venGuid  使用者的guid(null或""將會由server產生)

     */
    func ven_init(serverLog: String, serverHermes: String, token: String, domain: String, clientHost: String, topHost: String, venGuid: String?) {
        Log(msg: "[ven_init] serverLog='" + serverLog + "', serverHermes='" + serverHermes + "', token='" + token + "', domain='" + domain + "'")
        self.serverLog = serverLog
        self.serverHermes = serverHermes
        self.token = token
        self.domain = domain
        self.clientHost = clientHost
        self.topHost = topHost

        DispatchQueue.global(qos: .background).async {
            Venraaspt.mInstance.Log(msg: "[ven_init] DispatchQueue");

            if ((venGuid == nil) || (venGuid == "")) {
                Venraaspt.mInstance.venGuid = Venraaspt.mInstance.httpGet(url: "https://" + serverLog + Venraaspt.mInstance.apiUuid + "?id=" + domain + "&typ=g&pt=a")
            }
            else {
                Venraaspt.mInstance.venGuid = venGuid!
            }
            Venraaspt.mInstance.Log(msg: "[ven_init] venGuid='\(Venraaspt.mInstance.venGuid)'")
            Venraaspt.mInstance.venSession = Venraaspt.mInstance.httpGet(url: "https://" + serverLog + Venraaspt.mInstance.apiUuid + "?id=" + domain + "&typ=s&pt=a")
            Venraaspt.mInstance.Log(msg: "[ven_init] venSession='\(Venraaspt.mInstance.venSession)'\n")
        }

        Log(msg: "[ven_init] finished!\n")
    }

    /**
     讀取使用者的guid

     :return: 使用者的guid(venGuid)
     
     */
    func ven_getVenGuid() -> String {
        return self.venGuid;
    }

    /**
     讀取使用者的session

     :return: 使用者的session(venSession)
     
     */
    func ven_getVenSession() -> String {
        return self.venSession;
    }

    /**
     讀取使用者的帳號

     :return: userId  使用者的帳號

     */
    func ven_getUid() -> String {
        return self.userId;
    }

    /**
     ven_uid(userId) 設定uid(使用者的帳號) for webLog

     :param: userId  使用者的帳號

     */
    func ven_uid(userId: String) {
        self.userId = userId;
    }

    /**
     ven_keyword(keyword) 設定keyword for webLog(搜尋頁或商品頁)

     :param: keyword  搜尋keyword

     */
    func ven_keyword(keyword: String) {
        self.keyword = keyword;
    }

    /**
     ven_goodsId(goodsId) 設定gid(商品代碼) for webLog(商品頁)

     :param: goodsId  商品代碼

     */
    func ven_goodsId(goodsId: String) {
        self.goodsId = goodsId;
    }

    /**
     * ven_fromRec(fromRec) 設定from_rec(來源推薦方式代碼) for webLog(商品頁,等等...)
     *
     * @param fromRec  來源推薦方式代碼
     *
     */
    func ven_fromRec(fromRec: String) {
        self.fromRec = fromRec;
    }

    /**
     * ven_nowRec(nowRec) 設定now_rec(推薦方式代碼) for webLog(商品頁,等等...)
     * "now_rec":[{"rec":"recomd-api-76bq_normal_1520877021_0001"}]
     *
     * @param nowRec  推薦方式代碼
     *
     */
    func ven_nowRec(nowRec: String) {
        self.nowRec = nowRec;
    }

    /**
     * ven_transI(transI) 設定trans_i(購物車資訊,結帳資訊) for webLog(購物車頁,結帳頁)
     *
     * @param transI  購物車資訊,結帳資訊
     *
     */
    func ven_transI(transI: String) {
        self.transI = transI;
    }

    /**
     * ven_categoryCode(categoryCode) 設定category_code for webLog(分類頁或商品頁) or 商品推薦
     *
     * @param categoryCode  分類頁代碼
     *
     */
    func ven_categoryCode(categoryCode: String) {
        self.categoryCode = categoryCode;
    }


    /**
     webLog for portal(首頁)

     */
    func ven_portal() {
        ven_clear()
        ven_log(_action: "pageload", _pageType: "p")
    }

    /**
     webLog for eDM(廣告頁)

     */
    func ven_edm() {
        ven_clear()
        ven_log(_action: "pageload", _pageType: "edm")
    }

    /**
     webLog for search(搜尋頁)

     :param: keyword 搜尋字串

     */
    func ven_search(keyword: String) {
        ven_clear()
        self.keyword = keyword
        ven_log(_action: "pageload", _pageType: "sep")
    }

    /**
     webLog for category(分類頁)

     :param: categoryCode 分類頁代碼

     */
    func ven_category(categoryCode: String) {
        ven_clear()
        self.categoryCode = categoryCode
        ven_log(_action: "pageload", _pageType: "cap")
    }

    /**
     webLog for goods(商品頁)

     :param: categoryCode 分類頁代碼
     :param: goodsId 商品代碼
     :param: keyword 搜尋字串
     :param: fromRec 來源推薦方式代碼

     */
    func ven_goods(categoryCode: String, goodsId: String, keyword: String, fromRec: String) {
        ven_clear()
        self.categoryCode = categoryCode
        self.goodsId = goodsId
        self.keyword = keyword
        self.fromRec = fromRec
        ven_log(_action: "pageload", _pageType: "gop")
    }

    /**
     webLog for cart(購物車頁)

     :param: transI 購物車資訊

     */
    func ven_cart(transI: String) {
        ven_clear()
        self.transI = transI
        ven_log(_action: "cartload", _pageType: "scp")
    }

    /**
     webLog for order(結帳頁)

     :param: transI 結帳資訊

     */
    func ven_order(transI: String) {
        ven_clear()
        self.transI = transI
        ven_log(_action: "checkout", _pageType: "orp")
    }

    /**
     webLog for user define

     :param: _action pageload, cartload, checkout, cartadd, reccall
     :param: _pageType p, edm, sep, cap, gop, scp, orp...

     */
    func ven_log(_action: String, _pageType: String) {
        self.action = _action
        self.pageType = _pageType

        Log(msg: "[ven_log] action='\(action)', pageType='\(pageType)', venGuid='\(venGuid)'")

        DispatchQueue.global(qos: .background).async {
            Venraaspt.mInstance.Log(msg: "[ven_log] DispatchQueue");

            if self.check_venGuid() == false {
                self.venGuid = self.httpGet(url: "https://" + self.serverLog + self.apiUuid + "?id=" + self.domain + "&typ=g&pt=a")
                self.Log(msg: "[ven_log] venGuid='\(self.venGuid)'")
            }
            self.Log(msg: "[ven_log] venSession='" + self.venSession + "'")
            if self.check_venSession() == false {
                self.venSession = self.httpGet(url: "https://" + self.serverLog + self.apiUuid + "?id=" + self.domain + "&typ=s&pt=a")
                self.Log(msg: "[ven_log] venSession='\(self.venSession)'")
            }

            let tick: Int64 = Int64((Date().timeIntervalSince1970 * 1000).rounded())
            let zoneOffset = TimeZone.current.secondsFromGMT()
            
            var params = ""
            params = self.action + "={"
                    + "\"token\":\"" + self.token + "\""
                    + ",\"page_type\":\"" + self.pageType + "\""
                    + ",\"action\":\"" + self.action + "\""
                    + ",\"client_host\":\"" + self.clientHost + "\""
                    + ",\"tophost\":\"" + self.topHost + "\""
                    + ",\"device\":\"" + self.device + "\""
                    + ",\"client_utc\":" + String(tick)
                    + ",\"client_tzo\":" + String(zoneOffset)

            if (self.userId.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"uid\":\"" + self.userId + "\""
            }
            else {
                //params += ",\"uid\":null"
            }
            if (self.categoryCode.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"categ_code\":\"" + self.categoryCode + "\""
            }
            else {
                //params += ",\"categ_code\":null"
            }
            if (self.goodsId.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"gid\":\"" + self.goodsId + "\""
            }
            else {
                //params += ",\"gid\":null"
            }
            if (self.transI.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"trans_i\":" + self.transI
            }
            else {
                //params += ",\"trans_i\":[]"
            }
            if (self.nowRec.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"now_rec\":" + self.nowRec
            }
            else {
                //params += ",\"now_rec\":[]"
            }
            if (self.fromRec.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"from_rec\":\"" + self.fromRec + "\""
            }
            else {
                //params += ",\"from_rec\":null"
            }
            if (self.venGuid.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"ven_guid\":\"" + self.venGuid + "\""
            }
            else {
                //params += ",\"ven_guid\":null"
            }
            if (self.venSession.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"ven_session\":\"" + self.venSession + "\""
            }
            else {
                //params += ",\"ven_session\":null"
            }
            if (self.keyword.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"keyword\":\"" + self.keyword + "\""
            }
            else {
                //params += ",\"keyword\":null"
            }
            params += "}"
            self.Log(msg: "[ven_log] params='\(params)'")
            let Params = params.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
            if (Params != nil) {
                params = Params!
            }

            self.Log(msg: "[ven_log] httpPost...")
            self.httpPost(url: "https://" + self.serverLog + self.apiLog,
                     contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                     postData: params) { (results) in
                if let response = results.response {
                    self.Log(msg: "[ven_log] httpStatusCode='\(response.httpStatusCode)'")
                }
                if let data = results.data {
                    self.Log(msg: "[ven_log] data='\(String(decoding: data, as: UTF8.self))'")
                }
            }
        }
    }

    /**
     webLog for 商品放入購物車時呼叫

     :param: _goodsId 商品代碼

     */
    func ven_cartAdd(_goodsId: String) {
        self.goodsId = _goodsId

        Log(msg: "[ven_cartAdd] venGuid='" + venGuid + "'")

        DispatchQueue.global(qos: .background).async {
            Venraaspt.mInstance.Log(msg: "[ven_cartAdd] DispatchQueue");

            if self.check_venGuid() == false {
                self.venGuid = self.httpGet(url: "https://" + self.serverLog + self.apiUuid + "?id=" + self.domain + "&typ=g&pt=a")
                self.Log(msg: "[ven_cartAdd] venGuid='\(self.venGuid)'")
            }
            self.Log(msg: "[ven_cartAdd] venSession='" + self.venSession + "'")
            if self.check_venSession() == false {
                self.venSession = self.httpGet(url: "https://" + self.serverLog + self.apiUuid + "?id=" + self.domain + "&typ=s&pt=a")
                self.Log(msg: "[ven_cartAdd] venSession='\(self.venSession)'")
            }

            let tick: Int64 = Int64((Date().timeIntervalSince1970 * 1000).rounded())
            let zoneOffset = TimeZone.current.secondsFromGMT()
            
            var params = ""
            params = "cartadd={"
                    + "\"token\":\"" + self.token + "\""
                    + ",\"page_type\":\"" + self.pageType + "\""
                    + ",\"action\":\"cartadd\""
                    + ",\"client_host\":\"" + self.clientHost + "\""
                    + ",\"tophost\":\"" + self.topHost + "\""
                    + ",\"device\":\"" + self.device + "\""
                    + ",\"client_utc\":" + String(tick)
                    + ",\"client_tzo\":" + String(zoneOffset)

            if (self.userId.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"uid\":\"" + self.userId + "\""
            }
            else {
                //params += ",\"uid\":null"
            }
            if (self.categoryCode.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"categ_code\":\"" + self.categoryCode + "\""
            }
            else {
                //params += ",\"categ_code\":null"
            }
            if (self.goodsId.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"gid\":\"" + self.goodsId + "\""
            }
            else {
                //params += ",\"gid\":null"
            }
            if (self.transI.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"trans_i\":" + self.transI
            }
            else {
                //params += ",\"trans_i\":[]"
            }
            if (self.fromRec.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"from_rec\":\"" + self.fromRec + "\""
            }
            else {
                //params += ",\"from_rec\":null"
            }
            if (self.venGuid.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"ven_guid\":\"" + self.venGuid + "\""
            }
            else {
                //params += ",\"ven_guid\":null"
            }
            if (self.venSession.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"ven_session\":\"" + self.venSession + "\""
            }
            else {
                //params += ",\"ven_session\":null"
            }
            if (self.keyword.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
                params += ",\"keyword\":\"" + self.keyword + "\""
            }
            else {
                //params += ",\"keyword\":null"
            }
            params += "}"
            self.Log(msg: "[ven_addCart] params='\(params)'")
            let Params = params.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
            if (Params != nil) {
                params = Params!
            }

            self.httpPost(url: "https://" + self.serverLog + self.apiLog,
                     contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                     postData: params) { (results) in
                if let response = results.response {
                    self.Log(msg: "[ven_addCart] httpStatusCode='\(response.httpStatusCode)'")
                }
                if let data = results.data {
                    self.Log(msg: "[ven_addCart] data='\(String(decoding: data, as: UTF8.self))'")
                }
            }
        }
    }

    /**
     ven_refInfo(refInfo)  設定ref_info for 商品推薦(購物車頁面)
     "ref_info":[{"gid":"123"},{"gid":"456"}]
     */
    func ven_refInfo(refInfo: String) {
        self.refInfo = refInfo
    }

    /**
     ven_wCategInfo(wCategInfo)  設定w_categ_info for 商品推薦
     "w_categ_info":[ { "code":"368156" } ]
     */
    func ven_wCategInfo(wCategInfo: String) {
        self.wCategInfo = wCategInfo
    }

    /**
     ven_bCategInfo(bCategInfo)  設定b_categ_info for 商品推薦
     "b_categ_info":[ { "code":"368156" } ]
     */
    func ven_bCategInfo(bCategInfo: String) {
        self.bCategInfo = bCategInfo
    }

    /**
     ven_excludedIds(excludedIds)  設定excluded_ids for 商品推薦
     "excluded_ids":["excluded_gid_1","excluded_gid_2"]
     */
    func ven_excludedIds(excludedIds: String) {
        self.excludedIds = excludedIds
    }

    /**
     ven_blocklist(blocklist)  設定blocklist for 商品推薦
     "blocklist":[{"id": "excluded_gid_1"},{"id": "excluded_gid_2"}]
     */
    func ven_blocklist(blocklist: String) {
        self.blocklist = blocklist;
    }

    /**
     ven_refTagList(refTagList)  設定ref_tag_list for 商品推薦
     "ref_tag_list":[{"field":"occasion_id","value":"A1234","score":1}]
     */
    func ven_refTagList(refTagList: String) {
        self.refTagList = refTagList;
    }

    /**
     ven_rescoreTagList(rescoreTagList)  設定rescore_tag_list for 商品推薦
     "rescore_tag_list":[{"field":"style_id","value":"A1234","score":50}]
     */
    func ven_rescoreTagList(rescoreTagList: String) {
        self.rescoreTagList = rescoreTagList;
    }


    /**
     商品推薦

     :param: recPos p, cap, gop...
     :param: recType AlsoView, ClickStream
     :param: rowItems 推薦數量
     :param: completion result string

     */
    func ven_recomd(recPos: String, recType: String, rowItems: Int, completion:@escaping (String) -> ()) {
        Log(msg: "[ven_recomd]venGuid='\(venGuid)'")

        DispatchQueue.global(qos: .background).async {
            Venraaspt.mInstance.Log(msg: "[ven_recomd] DispatchQueue");

            self.Log(msg: "[ven_recomd] venGuid='\(self.venGuid)'")
            if self.check_venGuid() == false {
                self.venGuid = self.httpGet(url: "https://" + self.serverLog + self.apiUuid + "?id=" + self.domain + "&typ=g&pt=a")
                self.Log(msg: "[ven_recomd] venGuid='\(self.venGuid)'")
            }
            self.Log(msg: "[ven_recomd] venSession='\(self.venSession)'")
            if self.check_venSession() == false {
                self.venSession = self.httpGet(url: "https://" + self.serverLog + self.apiUuid + "?id=" + self.domain + "&typ=s&pt=a")
                self.Log(msg: "[ven_recomd] venSession='\(self.venSession)'")
            }

            var result = "{}"
            var params = ""
            params += "{\"token\":\"" + self.token + "\""
            params += ",\"rec_pos\":\"" + recPos + "\""
            params += ",\"rec_type\":\"" + recType + "\""
            params += ",\"uid\":\"" + self.userId + "\""
            params += ",\"gid\":\"" + self.goodsId + "\""
            params += ",\"categ_code\":\"" + self.categoryCode + "\""
            if ((recPos == "scp") || (recPos == "favor")) {
                if (self.refInfo != "") {
                    params += ",\"ref_info\":" + self.refInfo
                } else {
                    params += ",\"ref_info\":[]"
                }
            }
            if (self.wCategInfo != "") {
                params += ",\"w_categ_info\":" + self.wCategInfo
            } else {
                //params += ",\"w_categ_info\":[]"
            }
            if (self.bCategInfo != "") {
                params += ",\"b_categ_info\":" + self.bCategInfo
            } else {
                //params += ",\"b_categ_info\":[]"
            }
            if (self.excludedIds != "") {
                params += ",\"excluded_ids\":" + self.excludedIds
            } else {
                //params += ",\"excluded_ids\":[]"
            }
            if (self.blocklist != "") {
                params += ",\"blocklist\":" + self.blocklist
            } else {
                //params += ",\"blocklist\":[]"
            }
            if (self.refTagList != "") {
                params += ",\"ref_tag_list\":" + self.refTagList
            } else {
                //params += ",\"ref_tag_list\":[]"
            }
            if (self.rescoreTagList != "") {
                params += ",\"rescore_tag_list\":" + self.rescoreTagList
            } else {
                //params += ",\"rescore_tag_list\":[]"
            }
            params += ",\"device\":\"" + self.device + "\""
            params += ",\"ven_guid\":\"" + self.venGuid + "\""
            params += ",\"ven_session\":\"" + self.venSession + "\""
            params += ",\"topk\":" + String(rowItems) + "}"

            guard let url = URL(string: "https://" + self.serverHermes + self.apiHermes) else {
                self.Log(msg: "[ven_recomd] url error!");
                completion(result)
                return
            }
            self.Log(msg: "[ven_recomd] url='\(url)'");

            guard let httpBody = params.data(using: .utf8) else {
                self.Log(msg: "[ven_recomd] httpBody error!");
                completion(result)
                return
            }
            self.Log(msg: "[ven_recomd] params='\(params)'");

            var requestHttpHeaders = VenraasptEntity()

            requestHttpHeaders.add(value: "application/json", forKey: "Content-Type")
            requestHttpHeaders.add(value: "application/json", forKey: "Accept")

            guard let request = self.prepareRequest(withURL: url, requestHttpHeaders: requestHttpHeaders, httpBody: httpBody, httpMethod: .post) else
            {
                self.Log(msg: "[ven_recomd] prepareRequest error!");
                completion(result)
                return
            }

            let semaphore = DispatchSemaphore(value: 0)
            let sessionConfiguration = URLSessionConfiguration.default
            let session = URLSession(configuration: sessionConfiguration)
            let task = session.dataTask(with: request) { (data, response, error) in
                let results = Results(withData: data,
                                      response: Response(fromURLResponse: response),
                                      error: error)
                if let response = results.response {
                    self.Log(msg: "[ven_recomd] httpStatusCode='\(response.httpStatusCode)'")
                }
                if let data = results.data {
                    result = String(decoding: data, as: UTF8.self)
//                    self.Log(msg: "[ven_recomd] data='\(result)'\n\n")
                    do {
                        // make sure this JSON is in the format we expect
                        if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                            // try to read out a string array
                            if let recomd = json["recomd_id"] as? String {
                                self.Log(msg: "recomd_id='\(recomd)'")
                                self.ven_reccall(_nowRec: recomd)
                            }
                        }
                    } catch let error as NSError {
                        Venraaspt.mInstance.Log(msg: "Failed to load: \(error.localizedDescription)")
                    }
                }
                semaphore.signal()
            }
            task.resume()
            semaphore.wait()
            self.Log(msg: "[ven_recomd] result='\(result)'\n\n")
            completion(result)
        }
    }

    /**
     webLog for 紀錄推薦方式

     :param: _nowRec 推薦方式代碼

     */
    private func ven_reccall(_nowRec: String) {
        if (_nowRec.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            self.nowRec = _nowRec
        } else {
            self.nowRec = "[]"
        }

        let tick: Int64 = Int64((Date().timeIntervalSince1970 * 1000).rounded())
        let zoneOffset = TimeZone.current.secondsFromGMT()
        
        var params = ""
        params = "reccall={"
                + "\"token\":\"" + token + "\""
                + ",\"page_type\":\"" + pageType + "\""
                + ",\"action\":\"reccall\""
                + ",\"client_host\":\"" + clientHost + "\""
                + ",\"tophost\":\"" + topHost + "\""
                + ",\"device\":\"" + device + "\""
                + ",\"client_utc\":" + String(tick)
                + ",\"client_tzo\":" + String(zoneOffset)

        if (userId.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            params += ",\"uid\":\"" + userId + "\""
        } else {
            //params += ",\"uid\":null"
        }
        if (categoryCode.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            params += ",\"categ_code\":\"" + categoryCode + "\""
        } else {
            //params += ",\"categ_code\":null"
        }
        if (goodsId.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            params += ",\"gid\":\"" + goodsId + "\""
        } else {
            //params += ",\"gid\":null"
        }
        if (transI.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            params += ",\"trans_i\":" + transI
        } else {
            //params += ",\"trans_i\":[]"
        }
        if (nowRec.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            params += ",\"now_rec\":" + nowRec
        } else {
            //params += ",\"now_rec\":[]"
        }
        if (venGuid.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            params += ",\"ven_guid\":\"" + venGuid + "\""
        } else {
            //params += ",\"ven_guid\":null"
        }
        if (venSession.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            params += ",\"ven_session\":\"" + venSession + "\""
        } else {
            //params += ",\"ven_session\":null"
        }
        params += "}"
        self.Log(msg: "[ven_reccall] params='\(params)'")
        let Params = params.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
        if (Params != nil) {
            params = Params!
        }

        httpPost(url: "https://" + serverLog + apiLog,
                 contentType: "application/x-www-form-urlencoded;charset=UTF-8",
                 postData: params) { (results) in
            if let response = results.response {
                self.Log(msg: "[ven_reccall] httpStatusCode='\(response.httpStatusCode)'")
            }
            if let data = results.data {
                 self.Log(msg: "[ven_reccall] data='\(String(decoding: data, as: UTF8.self))'")
            }
        }
    }

    func Log(msg: String) {
        let date = Date()
        let df = DateFormatter()
        df.dateFormat = "yyyy-MM-dd HH:mm:ss.SSSS"
        print("[\(Thread.current)] \(df.string(from: date)) \(msg)");
    }


    //private function
    private func ven_clear() {
        self.action = ""
        self.pageType = ""
        self.categoryCode = ""
        self.goodsId = ""
        self.transI = ""
        self.nowRec = ""
        self.fromRec = ""
        self.keyword = ""
        self.refInfo = ""
        self.wCategInfo = ""
        self.bCategInfo = ""
        self.excludedIds = ""
        self.blocklist = ""
        self.refTagList = ""
        self.rescoreTagList = ""
    }

    private func check_venGuid() -> Bool {
        Log(msg: "[check_venGuid] venGuid='\(venGuid)'")
        for i in 0..<10 {
            if venGuid.trimmingCharacters(in: .whitespacesAndNewlines).count == 0 {
                Log(msg: "[check_venGuid][\(i)]")
                usleep(500 * 1000);
            }
            else {
                Log(msg: "[check_venGuid][\(i)] venGuid='\(venGuid)'")
                return true
            }
        }
        return false
    }

    private func check_venSession() -> Bool {
        Log(msg: "[check_venSession] venSession='\(venSession)'")
        for i in 0..<10 {
            if (venSession.trimmingCharacters(in: .whitespacesAndNewlines).count == 0) {
                Log(msg: "[check_venSession] [\(i)]")
                usleep(500 * 1000);
            }
            else {
                Log(msg: "[check_venSession][\(i)] venSession='\(venSession)'")
                return true
            }
        }
        return false
    }


    // MARK: - Public Methods for RESTFUL API
    func httpGet(url: String) -> String {
        Log(msg: "[httpGet] url='\(url)'")

        guard let url = URL(string: url) else {
            Log(msg: "[httpGet] url error!");
            return ""
        }

        let requestHttpHeaders = VenraasptEntity()
        let httpBody: Data? = nil

        guard let request = self.prepareRequest(withURL: url, requestHttpHeaders: requestHttpHeaders, httpBody: httpBody, httpMethod: .get) else
        {
            //callback(Results(withError: CustomError.failedToCreateRequest))
            return ""
        }

        var result = ""
        let semaphore = DispatchSemaphore(value: 0)
        let sessionConfiguration = URLSessionConfiguration.default
        let session = URLSession(configuration: sessionConfiguration)
        let task = session.dataTask(with: request) { (data, response, error) in
            if let error = error {
                self.Log(msg: "error: \(error)")
            } else {
                if let response = response as? HTTPURLResponse {
                    self.Log(msg: "statusCode: \(response.statusCode)")
                }
                if let data = data, let dataString = String(data: data, encoding: .utf8) {
                    self.Log(msg: "data: \(dataString)")
                    result = dataString
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        return result
    }

    func httpPost(url: String, contentType: String, postData: String, callback: @escaping (_ results: Results) -> Void) {
//        Log(msg: "[httpPost] url='\(url)'\n postData='\(postData)'")

        guard let url = URL(string: url) else {
            Log(msg: "[httpGet] url error!");
            return
        }

        guard let httpBody = postData.data(using: .utf8) else {
            Log(msg: "[httpPost] httpBody error!");
            return
        }

        var requestHttpHeaders = VenraasptEntity()

        requestHttpHeaders.add(value: contentType, forKey: "Content-Type")

        DispatchQueue.global(qos: .background).async { [weak self] in
            Venraaspt.mInstance.Log(msg: "[httpPost] DispatchQueue");

            guard let request = self?.prepareRequest(withURL: url, requestHttpHeaders: requestHttpHeaders, httpBody: httpBody, httpMethod: .post) else
            {
                callback(Results(withError: CustomError.failedToCreateRequest))
                return
            }

            let sessionConfiguration = URLSessionConfiguration.default
            let session = URLSession(configuration: sessionConfiguration)
            let task = session.dataTask(with: request) { (data, response, error) in
                callback(Results(withData: data,
                                   response: Response(fromURLResponse: response),
                                   error: error))
            }
            task.resume()
        }
    }

    // MARK: - Private Methods for RESTFUL API
    private func addURLQueryParameters(toURL url: URL, urlQueryParameters: VenraasptEntity) -> URL {
        if urlQueryParameters.totalItems() > 0 {
            guard var urlComponents = URLComponents(url: url, resolvingAgainstBaseURL: false) else { return url }
            var queryItems = [URLQueryItem]()
            for (key, value) in urlQueryParameters.allValues() {
                let item = URLQueryItem(name: key, value: value.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed))

                queryItems.append(item)
            }

            urlComponents.queryItems = queryItems

            guard let updatedURL = urlComponents.url else { return url }
            return updatedURL
        }

        return url
    }


    private func getHttpBody(requestHttpHeaders: VenraasptEntity, httpBodyParameters: VenraasptEntity, httpBody: Data?) -> Data? {
        guard let contentType = requestHttpHeaders.value(forKey: "Content-Type") else { return nil }

        if contentType.contains("application/json") {
            return try? JSONSerialization.data(withJSONObject: httpBodyParameters.allValues(), options: [.prettyPrinted, .sortedKeys])
        } else if contentType.contains("application/x-www-form-urlencoded") {
            let bodyString = httpBodyParameters.allValues().map { "\($0)=\(String(describing: $1.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)))" }.joined(separator: "&")
            return bodyString.data(using: .utf8)
        } else {
            return httpBody
        }
    }


    private func prepareRequest(withURL url: URL?, requestHttpHeaders: VenraasptEntity, httpBody: Data?, httpMethod: HttpMethod) -> URLRequest? {
        guard let url = url else { return nil }
        var request = URLRequest(url: url)
        request.httpMethod = httpMethod.rawValue
        
        for (header, value) in requestHttpHeaders.allValues() {
            request.setValue(value, forHTTPHeaderField: header)
        }

        request.httpBody = httpBody
        return request
    }

}

// MARK: - Venraaspt Custom Types
extension Venraaspt {
    enum HttpMethod: String {
        case get
        case post
        case put
        case patch
        case delete
    }


    struct VenraasptEntity {
        private var values: [String: String] = [:]

        mutating func add(value: String, forKey key: String) {
            values[key] = value
        }

        func value(forKey key: String) -> String? {
            return values[key]
        }

        func allValues() -> [String: String] {
            return values
        }

        func totalItems() -> Int {
            return values.count
        }
    }


    struct Response {
        var response: URLResponse?
        var httpStatusCode: Int = 0
        var headers = VenraasptEntity()

        init(fromURLResponse response: URLResponse?) {
            guard let response = response else { return }
            self.response = response
            httpStatusCode = (response as? HTTPURLResponse)?.statusCode ?? 0

            if let headerFields = (response as? HTTPURLResponse)?.allHeaderFields {
                for (key, value) in headerFields {
                    headers.add(value: "\(value)", forKey: "\(key)")
                }
            }
        }
    }


    struct Results {
        var data: Data?
        var response: Response?
        var error: Error?

        init(withData data: Data?, response: Response?, error: Error?) {
            self.data = data
            self.response = response
            self.error = error
        }

        init(withError error: Error) {
            self.error = error
        }
    }


    enum CustomError: Error {
        case failedToCreateRequest
    }
}


// MARK: - Custom Error Description
extension Venraaspt.CustomError: LocalizedError {
    public var localizedDescription: String {
        switch self {
        case .failedToCreateRequest: return NSLocalizedString("Unable to create the URLRequest object", comment: "")
        }
    }
}
