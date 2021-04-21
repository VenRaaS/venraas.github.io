//
//  AppDelegate.swift
//  VenraasptDemoApp
//
//  Created by 廖文全 on 2020/4/24.
//  Copyright © 2020 Charlie Liao. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {



    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.

        let DEVICE_UUID:String = {
            let query = [
                kSecClass as String       : kSecClassGenericPassword,
                kSecAttrAccount as String : "DEVICE_UUID",
                kSecReturnData as String  : kCFBooleanTrue,
                kSecMatchLimit as String  : kSecMatchLimitOne ] as [String : Any]
            
            var dataTypeRef: AnyObject? = nil
            let status: OSStatus = SecItemCopyMatching(query as CFDictionary, &dataTypeRef)
            if status == noErr,let dataTypeRef = dataTypeRef as? Data,let uuid = String(data:dataTypeRef, encoding: .utf8) {
                return uuid
            } else {
                let DEVICE_UUID:String = UIDevice.current.identifierForVendor?.uuidString ?? UUID().uuidString
                if let data = DEVICE_UUID.data(using: .utf8) {
                    let query = [
                        kSecClass as String       : kSecClassGenericPassword as String,
                        kSecAttrAccount as String : "DEVICE_UUID",
                        kSecValueData as String   : data ] as [String : Any]
                
                    SecItemDelete(query as CFDictionary)
                    SecItemAdd(query as CFDictionary, nil)
                }
                return DEVICE_UUID
            }
        }()
        Venraaspt.mInstance.Log(msg: "DEVICE_UUID: \(DEVICE_UUID)")

        Venraaspt.mInstance.ven_init(serverLog: "apid.venraas.tw",
                                     serverHermes: "apih.venraas.tw",
                                     token: "xVtZLw5p4n",
                                     domain: "venraas.github.io",
                                     clientHost: "venraas.github.io",
                                     topHost: "venraas.github.io",
                                     venGuid: DEVICE_UUID)

        Venraaspt.mInstance.ven_uid(userId: "venraaspt.iOS")

        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

