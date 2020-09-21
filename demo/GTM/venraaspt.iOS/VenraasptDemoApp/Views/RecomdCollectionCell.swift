//
//  RecomdCollectionCell.swift
//  VenraasptDemoApp
//
//  Created by 廖文全 on 2020/4/29.
//  Copyright © 2020 Charlie Liao. All rights reserved.
//

import UIKit

class RecomdCollectionCell: UICollectionViewCell {

    var imageView:UIImageView!
    var titleLabel:UILabel!

    override init(frame: CGRect) {
        super.init(frame: frame)

        // 建立一個 UIImageView
        imageView = UIImageView(frame: CGRect(x: 0, y: 0, width: 400, height: 400))
        self.addSubview(imageView)

    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

}
