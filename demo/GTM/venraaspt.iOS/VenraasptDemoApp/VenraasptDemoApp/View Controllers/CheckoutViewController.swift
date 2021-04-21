//
//  CheckoutViewController.swift
//  VenraasptDemoApp
//
//  Created by 廖文全 on 2020/5/4.
//  Copyright © 2020 Charlie Liao. All rights reserved.
//

import UIKit
import WebKit

class CheckoutViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {

    
    var recomdItems = [RecomdItem]()


    var mWebView: WKWebView? = nil

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        print(error.localizedDescription)
    }

    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        //print("Strat to load")
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        //print("finish to load")
    }


    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage)  {
        Venraaspt.mInstance.Log(msg: "name=\(message.name), data=\(message.body)")
        if message.name == "GoBack" {
            //這裡處理回上一頁
            dismiss(animated: true, completion: nil)
        }
        if message.name == "appleApp" {
            if let uid = message.body as? String {
                Venraaspt.mInstance.ven_uid(userId: uid)
            }
            Venraaspt.mInstance.Log(msg: "uid=" + Venraaspt.mInstance.ven_getUid())
        }
    }


    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        var ref_info = "[]"
        if (StorageData.mInstance.orderList.isEmpty) {
            Venraaspt.mInstance.ven_order(transI: "")
        } else {
            let tick: Int64 = Int64((Date().timeIntervalSince1970 * 1000).rounded())
            var transI = "{\"id\":\"" + String(tick) + "\",\"iList\":["
            ref_info = "["
            for (index, value) in StorageData.mInstance.orderList.enumerated() {
                if (index > 0) {
                    transI += ","
                    ref_info += ","
                }
                transI += "{\"id\":\"" + value + "\"}"
                ref_info += "{\"gid\":\"" + value + "\"}"
            }
            ref_info += "]"
            transI += "]}"
            Venraaspt.mInstance.ven_order(transI: transI)
        }
        Venraaspt.mInstance.ven_refInfo(refInfo: ref_info)

        Venraaspt.mInstance.ven_recomd(recPos: "orp", recType: "AlsoView", rowItems: 10) {  (completion) in
            let data = Data(completion.utf8)

            do {
                // make sure this JSON is in the format we expect
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    // try to read out a string array
                    if let recomd_list = json["recomd_list"] as? [[String:Any]] {
                        for recomd in recomd_list {
                            var _name = ""
                            var _cid = ""
                            var _gid = ""
                            var _url = ""
                            if let name = recomd["name"] as? String {
                                _name = name
                            }
                            if let gid = recomd["id"] as? String {
                                _gid = gid
                            }
                            if let cid = recomd["category_code"] as? String {
                                _cid = cid
                            }
                            if let url = recomd["goods_img_url"] as? String {
                                _url = url
                            }
                            var item = RecomdItem(name: _name, cid: _cid, gid: _gid, url: _url, data: nil)

                            guard let url = URL(string: item.url) else {
                                self.recomdItems.append(item)
                                return
                            }

                            let semaphore = DispatchSemaphore(value: 0)
                            let task = URLSession.shared.dataTask(with: url) { data, response, error in
                                guard let data = data else {
                                    self.recomdItems.append(item)
                                    return
                                }

                                item.data = data
                                self.recomdItems.append(item)

                                semaphore.signal()
                            }
                            task.resume()
                            semaphore.wait()

                        }

                        if recomd_list.count == 0 {
                            self.recomdItems.append(RecomdItem(name: "iPhone_1", cid: "", gid: "", url: "https://b.ecimg.tw/items/DYAJ2UA900A9HIJ/000002_1574060256.jpg", data: nil))
                            self.recomdItems.append(RecomdItem(name: "iPhone_2", cid: "", gid: "", url: "https://b.ecimg.tw/items/DYAJ2UA900A9HIJ/000002_1574060256.jpg", data: nil))
                        }

                    }
                }

                DispatchQueue.main.async {
                    // 加入畫面中
                    //self.view.addSubview(myCollectionView)
                }

            } catch let error as NSError {
                Venraaspt.mInstance.Log(msg: "Failed to load: \(error.localizedDescription)")
            }
        }


        let url = URL(string: "https://venraas.github.io/demo/GTM/checkout_iOS.html")
        if let url = url {
            let request = URLRequest(url: url)

            // init and load request in webview.
            let wkWebViewConfiguration = WKWebViewConfiguration()
            wkWebViewConfiguration.userContentController.add(self, name: "appleApp")
            wkWebViewConfiguration.userContentController.add(self, name: "GoBack")
            mWebView = WKWebView(frame: self.view.frame, configuration: wkWebViewConfiguration)
            if let mWebView = mWebView {
                mWebView.navigationDelegate = self

                let cookie1 = HTTPCookie(properties: [
                    .domain: "venraas.github.io",
                    .path: "/",
                    .version: 0,
                    .expires: Date.init(timeIntervalSinceNow: 100*24*60*60),
                    .name: "venguid",
                    .value: Venraaspt.mInstance.venGuid
                ])!
                let cookie2 = HTTPCookie(properties: [
                    .domain: "venraas.github.io",
                    .path: "/",
                    .version: 0,
                    .expires: Date.init(timeIntervalSinceNow: 100*24*60*60),
                    .name: "vensession",
                    .value: Venraaspt.mInstance.venSession
                ])!

                mWebView.configuration.websiteDataStore.httpCookieStore.setCookie(cookie1)
                mWebView.configuration.websiteDataStore.httpCookieStore.setCookie(cookie2)
  
                mWebView.load(request)
                self.view.addSubview(mWebView)
                self.view.sendSubviewToBack(mWebView)
            }
        }

    }


}
