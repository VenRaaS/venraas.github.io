//
//  ViewController.swift
//  VenraasptDemoApp
//
//  Created by 廖文全 on 2020/4/24.
//  Copyright © 2020 Charlie Liao. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource {


    var recomdItems = [RecomdItem]()


    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return recomdItems.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {

        // 依據前面註冊設置的識別名稱 "Cell" 取得目前使用的 cell
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "Cell", for: indexPath) as! RecomdCollectionCell

        // 設置 cell 內容 (即自定義元件裡 增加的圖片與文字元件)
        if recomdItems[indexPath.row].data == nil {
            cell.imageView.image = UIImage(named: "iPhone 11 pro.jpg")
        }
        else {
            cell.imageView.image = UIImage(data: recomdItems[indexPath.row].data!)
        }

        return cell

    }

    // 點選 cell 後執行的動作
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        StorageData.mInstance.name = recomdItems[indexPath.row].name
        if (recomdItems[indexPath.row].cid.trimmingCharacters(in: .whitespacesAndNewlines).count > 0) {
            StorageData.mInstance.cid = recomdItems[indexPath.row].cid
        } else {
            let gids = recomdItems[indexPath.row].gid.split(separator:"-")
            StorageData.mInstance.cid = String(gids.first!)
        }
        StorageData.mInstance.gid = recomdItems[indexPath.row].gid
        StorageData.mInstance.url = recomdItems[indexPath.row].url
        StorageData.mInstance.data = recomdItems[indexPath.row].data
        //Venraaspt.mInstance.Log(msg: "collectionView...\nname='\(StorageData.mInstance.name)'\ncid='\(StorageData.mInstance.cid)'\ngid='\(StorageData.mInstance.gid)'\nurl='\(StorageData.mInstance.url)'")

        if let vc = storyboard?.instantiateViewController(withIdentifier: "GoodsViewController") {
            present(vc, animated: true, completion: nil)
        }
    }


    override func loadView() {
        super.loadView()

        let titleLabel = UILabel(frame: CGRect(x: 0, y: 0, width: 414, height: 80))
        titleLabel.text = "首頁"
        titleLabel.textColor = UIColor.white
        titleLabel.backgroundColor = UIColor.init(red: 92/255, green: 184/255, blue: 92/255, alpha: 1)
        titleLabel.textAlignment = .center
        titleLabel.font = UIFont.systemFont(ofSize: 20, weight: UIFont.Weight.medium)
        self.view.addSubview(titleLabel)

        let edmButton = UIButton(frame: CGRect(x: 0, y: 80, width: 83, height: 40))
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

    }

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.

        // 建立 UICollectionViewFlowLayout
        let layout = UICollectionViewFlowLayout()

        // 設置 section 的間距 四個數值分別代表 上、左、下、右 的間距
        layout.sectionInset = UIEdgeInsets(top: 7, left: 7, bottom: 7, right: 7);

        // 設置每一行的間距
        layout.minimumLineSpacing = 3

        // 設置每個 cell 的尺寸
        layout.itemSize = CGSize(width: 400, height: 400)

        // 設置 header 及 footer 的尺寸
        layout.headerReferenceSize = CGSize(width: 414, height: 0)
        layout.footerReferenceSize = CGSize(width: 414, height: 0)

        // 建立 UICollectionView
        let myCollectionView = UICollectionView(frame: CGRect(x: 0, y: 120, width: 414, height: 656), collectionViewLayout: layout)

        // 註冊 cell 以供後續重複使用
        //Venraaspt.mInstance.Log(msg: "register RecomdCollectionCell")
        myCollectionView.register(RecomdCollectionCell.self, forCellWithReuseIdentifier: "Cell")

        // 註冊 section 的 header 跟 footer 以供後續重複使用
        //Venraaspt.mInstance.Log(msg: "註冊 section 的 header 跟 footer 以供後續重複使用...")
        myCollectionView.register(RecomdCollectionCell.self, forSupplementaryViewOfKind: UICollectionView.elementKindSectionHeader, withReuseIdentifier: "Header")
        myCollectionView.register(RecomdCollectionCell.self, forSupplementaryViewOfKind: UICollectionView.elementKindSectionFooter, withReuseIdentifier: "Footer")

        // 設置委任對象
        myCollectionView.delegate = self
        myCollectionView.dataSource = self


        Venraaspt.mInstance.ven_portal()

        //Venraaspt.mInstance.Log(msg: "Before ven_recomd...")
        Venraaspt.mInstance.ven_recomd(recPos: "p", recType: "ClickStream", rowItems: 10) {  (completion) in
            //Venraaspt.mInstance.Log(msg: "completion='\(completion)'")
            let data = Data(completion.utf8)

            do {
                // make sure this JSON is in the format we expect
                if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                    // try to read out a string array
                    if let recomd_id = json["recomd_id"] as? String {
                        StorageData.mInstance.recomd_id = recomd_id
                    }
                    if let recomd_list = json["recomd_list"] as? [[String:Any]] {
                        //Venraaspt.mInstance.Log(msg: "recomd_list.length='\(recomd_list.count)'")
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
                    //Venraaspt.mInstance.Log(msg: "addSubview...")
                    // 加入畫面中
                    self.view.addSubview(myCollectionView)
                }

            } catch let error as NSError {
                Venraaspt.mInstance.Log(msg: "Failed to load: \(error.localizedDescription)")
            }
        }
        //Venraaspt.mInstance.Log(msg: "After ven_recomd!")

    }


    @objc func edmButton(_ sender: UIButton) {
        if let vc = storyboard?.instantiateViewController(withIdentifier: "EdmViewController") {
            present(vc, animated: true, completion: nil)
        }
    }

    @objc func searchButton(_ sender: UIButton) {
        if let vc = storyboard?.instantiateViewController(withIdentifier: "SearchViewController") {
            present(vc, animated: true, completion: nil)
        }
    }


}
