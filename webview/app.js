//app.js
App({
  onLaunch: function() {
    var that = this
    wx.checkSession({
      success () {
        //session_key 未过期，并且在本生命周期一直有效
        console.log('session_key未过期')
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        // wx.login() //重新登录
        console.log('session_key已经失效')
        that.login(that)
      }
    })
  },
  login(that) {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        wx.setStorageSync('code', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          method: 'GET',
          data: {
            appid: 'wx62907a4f577cf0d2',
            secret: 'bcf00892f62cc2c70e1d59c282485a76',
            js_code: res.code,
            grant_type: 'authorization_code'
            // grant_type: 'getPhoneNumber'
          },
          dataType: 'json',
          success(json) {
            console.log(json)
            that.globalData.openid = json.data.openid
            that.globalData.sessionKey = json.data.session_key
            wx.setStorageSync('openid', json.data.openid)
            wx.setStorageSync('sessionKey', json.data.session_key)
            wx.setStorageSync('unionId', json.data.unionid)
          },
          fail(err) {
            console.log(err)
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    sessionKey: '',
    openid: '',
    appId: 'wx62907a4f577cf0d2'
  }
});