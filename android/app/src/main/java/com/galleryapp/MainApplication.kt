package com.galleryapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactNativeHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application() {

  private val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this) {
      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override fun getPackages() =
        PackageList(this).packages

      override fun getJSMainModuleName(): String = "index"
    }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }

  fun getReactNativeHost(): ReactNativeHost = reactNativeHost
}