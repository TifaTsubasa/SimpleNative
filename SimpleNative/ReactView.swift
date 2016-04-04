//
//  ReactView.swift
//  SimpleNative
//
//  Created by 谢许峰 on 16/4/4.
//  Copyright © 2016年 tifatsubasa. All rights reserved.
//

import UIKit

class ReactView: UIView {
    
    weak var rootView: RCTRootView!
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        
        let jsCodeLocation = NSURL(string: "http://localhost:8081/index.ios.bundle?platform=ios")
        let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "SimpleNative", initialProperties: nil, launchOptions: nil)
        self.rootView = rootView
        self.addSubview(rootView)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        rootView.frame = self.bounds
    }
}
