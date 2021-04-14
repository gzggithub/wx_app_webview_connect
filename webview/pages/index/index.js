//index.js
//获取应用实例
var WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js')
const app = getApp()

Page({
  data: {
    visitUrl: "",
    isJump: false
  },
  onLoad: function() {
    // this.setData({
    //   visitUrl: "http://192.168.0.75:9521/#/login?openid=" + app.globalData.openid "&phoneNumber=" + ,
    // });
  },
  getPhoneNumber(e) {
    var that = this
    console.log(8998)
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      var pc = new WXBizDataCrypt(app.globalData.appId, wx.getStorageSync('sessionKey'))
      var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
      app.globalData.phoneNumber = data.phoneNumber
      wx.getStorageSync('openid')
      wx.setStorageSync('phoneNumber', data.phoneNumber)
      console.log(app.globalData)
      console.log(data)
      that.setData({
        openid: wx.getStorageSync('openid'),
        phoneNumber: data.phoneNumber,
        visitUrl: "http://192.168.0.75:9521/#/login?openid=" + app.globalData.openid + "&phoneNumber=" + data.phoneNumber,
        isJump: true
      })
    } else {
      console.log('reject: 拒绝')
    }
  }
});