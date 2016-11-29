//jspapa.com for wx
//app.js
App({
  onLaunch: function () {
    wx.getNetworkType({
      success: function(res) {
        var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        console.log(networkType)
        if(networkType!="4g" && networkType!="wifi"){
          wx.showToast({
            title: "您的"+networkType+"网络较慢",
            icon: 'loading',
            duration: 10000
          });
        }
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function(info){
              var edata = {code: res.code, encryptedData: info.encryptedData, iv: info.iv};
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: that.globalData.domain+'/api/...',
                  data: edata,
                  method: 'POST',
                  success: function(data) {
                    that.globalData.userInfo = data.data;
                    typeof cb == "function" && cb(that.globalData.userInfo)
                  }
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    domain: "https://www.jspapa.com",
    //TODO：cates这里最好是用接口获取数据，这样能和网站同步
    cates: [
      {
        id: "all",
        name: "全部",
        selected: true
      },
      {
        id: "h5",
        name: "HTML/CSS",
        selected: false
      },
      {
        id: "js",
        name: "JavaScript",
        selected: false
      },
      {
        id: "jquery",
        name: "jQuery",
        selected: false
      },
      {
        id: "nodejs",
        name: "Node.js",
        selected: false
      },
      {
        id: "wx",
        name: "微信开发",
        selected: false
      },
      {
        id: "job",
        name: "招聘",
        selected: false
      },
      {
        id: "career",
        name: "职业生涯",
        selected: false
      }
    ]
  }
})