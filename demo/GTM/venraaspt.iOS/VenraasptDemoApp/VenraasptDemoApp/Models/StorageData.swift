//
//  StorageData.swift
//  VenraasptDemoApp
//
//  Created by 廖文全 on 2020/5/4.
//  Copyright © 2020 Charlie Liao. All rights reserved.
//

import Foundation

class StorageData {

    static let mInstance = StorageData()

    var name = ""
    var cid = ""
    var gid = ""
    var url = ""
    var recomd_id = ""
    var keyword = ""
    var data: Data?

    var orderList_name = [String]()
    var orderList_cid = [String]()
    var orderList_gid = [String]()
}
