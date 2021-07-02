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
        if (StorageData.mInstance.orderList_gid.isEmpty) {
            Venraaspt.mInstance.ven_order(transI: "")
        } else {
            let tick: Int64 = Int64((Date().timeIntervalSince1970 * 1000).rounded())
            var transI = "{\"id\":\"" + String(tick) + "\",\"iList\":["
            for (index, value) in StorageData.mInstance.orderList_gid.enumerated() {
                if (index > 0) {
                    transI += ","
                }
                transI += "{\"id\":\"" + value + "\"}"
            }
            transI += "]}"
            Venraaspt.mInstance.ven_order(transI: transI)
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
