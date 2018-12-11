const reqUrl = require('utils/reqUrl');



// 1、觅有品 wxb19a236e51a8d248
// 2、零元购 wx04ae6db5ac8838c8
// 3、胖球 wxb869461219ec2d02
// 4、京东 wxa42959523195f527
// 5、决战白日门 wxefe8997276c7a7d4
// 6、风流霸业 wxa331708430664298
// 7、闯关 wx23c7f38689be4392
// 8、小鸡商店 wxd2b9331ac904b5de
// 9、家具达分奇 wxe784b2d26d254912
// 10、挖矿小队 wxc021569276c9f0ec





//app.js
App({
  //login promise
  login() {

    return new Promise((resolve, reject) => {
      // 登录
      wx.login({
        success: res => {

          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            // url: reqUrl + 'token',
            url: reqUrl + 'award_token',
            data: {
              code: res.code,
              scene: wx.getStorageSync('scene')
              // sponsor_id:
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: res => {

              if (res.statusCode == 200) {
                //本地缓存存入token、uid
                wx.setStorageSync("token", res.data.msg);
                wx.setStorageSync("uid", res.data.uid)

                //存openid,question.js的ad上报需要
                wx.setStorageSync('openid', res.data.key)
                wx.setStorageSync('is_auth', res.data.is_auth);

                resolve(res)
              }else{
                reject(res)
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      })

    })

  },

  onLaunch: function (options) {
    // console.log(options.scene);
    wx.setStorageSync('options', options);
    wx.setStorageSync('scene', options.scene);

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res)
    })

    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
      // wx.showModal({
      //   title: '更新提示',
      //   content: '新版本已经准备好，是否重启应用？',
      //   success: function(res) {
      //     console.log(res);
      //     if (res.confirm) {
      //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      //       updateManager.applyUpdate()
      //     }
      //   }
      // })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })

  },
  globalData: {
    userInfo: null
  }
})