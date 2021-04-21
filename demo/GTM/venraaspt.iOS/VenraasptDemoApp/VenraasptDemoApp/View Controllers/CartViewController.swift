//
//  CartViewController.swift
//  VenraasptDemoApp
//
//  Created by 廖文全 on 2020/5/4.
//  Copyright © 2020 Charlie Liao. All rights reserved.
//

import UIKit

class CartViewController: UIViewController {


    var recomdItems = [RecomdItem]()


    override func loadView() {
        super.loadView()

        let titleLabel = UILabel(frame: CGRect(x: 0, y: 0, width: 414, height: 80))
        titleLabel.text = "購物車"
        titleLabel.textColor = UIColor.white
        titleLabel.backgroundColor = UIColor.init(red: 92/255, green: 184/255, blue: 92/255, alpha: 1)
        titleLabel.textAlignment = .center
        titleLabel.font = UIFont.systemFont(ofSize: 20, weight: UIFont.Weight.medium)
        self.view.addSubview(titleLabel)

        let protalButton = UIButton(frame: CGRect(x: 0, y: 80, width: 83, height: 40))
        protalButton.setTitle("首頁", for: .normal)
        protalButton.setTitleColor(UIColor.white, for: .normal)
        protalButton.backgroundColor = UIColor.init(red: 51/255, green: 122/255, blue: 183/255, alpha: 1)
        protalButton.addTarget(self, action: #selector(portalButton(_:)), for: .touchUpInside)
        self.view.addSubview(protalButton)

        let edmButton = UIButton(frame: CGRect(x: 166, y: 80, width: 83, height: 40))
        edmButton.setTitle("EDM", for: .normal)
        edmButton.setTitleColor(UIColor.white, for: .normal)
        edmButton.backgroundColor = UIColor.init(red: 51/255, green: 122/255, blue: 183/255, alpha: 1)
        edmButton.addTarget(self, action: #selector(edmButton(_:)), for: .touchUpInside)
        self.view.addSubview(edmButton)

        let searchButton = UIButton(frame: CGRect(x: 331, y: 80, width: 83, height: 40))
        searchButton.setTitle("查詢頁", for: .normal)
        searchButton.setTitleColor(UIColor.white, for: .normal)
        searchButton.backgroundColor = UIColor.init(red: 51/255, green: 122/255, blue: 183/255, alpha: 1)
        searchButton.addTarget(self, action: #selector(searchButton(_:)), for: .touchUpInside)
        self.view.addSubview(searchButton)

        let checkoutButton = UIButton(frame: CGRect(x: 166, y: 448, width: 83, height: 40))
        checkoutButton.setTitle("結帳", for: .normal)
        checkoutButton.setTitleColor(UIColor.white, for: .normal)
        checkoutButton.backgroundColor = UIColor.init(red: 51/255, green: 122/255, blue: 183/255, alpha: 1)
        checkoutButton.addTarget(self, action: #selector(checkoutButton(_:)), for: .touchUpInside)
        self.view.addSubview(checkoutButton)

    }


    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        var ref_info = "[]"
        if (StorageData.mInstance.orderList.isEmpty) {
            Venraaspt.mInstance.ven_cart(transI: "[]")
        } else {
            var transI = "{\"id\":null,\"iList\":["
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
            Venraaspt.mInstance.ven_cart(transI: transI)
        }
        Venraaspt.mInstance.ven_refInfo(refInfo: ref_info)

        Venraaspt.mInstance.ven_recomd(recPos: "scp", recType: "AlsoView", rowItems: 10) {  (completion) in
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

    }


    @objc func portalButton(_ sender: UIButton) {
        dismiss(animated: true, completion: nil)
    }

    @objc func edmButton(_ sender: UIButton) {
        weak var pvc = self.presentingViewController
        dismiss(animated: true) {
            if let vc = self.storyboard?.instantiateViewController(withIdentifier: "EdmViewController") {
                pvc?.present(vc, animated: true, completion: nil)
            }
        }
    }

    @objc func searchButton(_ sender: UIButton) {
        weak var pvc = self.presentingViewController
        dismiss(animated: true) {
            if let vc = self.storyboard?.instantiateViewController(withIdentifier: "SearchViewController") {
                pvc?.present(vc, animated: true, completion: nil)
            }
        }
    }

    @objc func checkoutButton(_ sender: UIButton) {
        weak var pvc = self.presentingViewController
        dismiss(animated: true) {
            if let vc = self.storyboard?.instantiateViewController(withIdentifier: "CheckoutViewController") {
                pvc?.present(vc, animated: true, completion: nil)
            }
        }
    }


}
