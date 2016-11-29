//获取应用实例
var app = getApp()
Page({
  data: {
    showUser: false,
    showLogin: false,
    showReg: false,
    domain: app.globalData.domain,
    username: "",
    pwd: "",
    email: "",
    userInfo: {},
    storageSize: 0,
    storageLimitSize: 0
  },
  //注册新账号按钮
  bindRegTap: function(){
    var that = this;
    that.setData({
      showReg: true,
      showLogin: false
    })
  },
  //已经有账号？
  bindLoginTap: function(){
    var that = this;
    that.setData({
      showReg: false,
      showLogin: true
    })
  },
  //立即绑定
  //1、获取openId,与登陆账号关联，成功后显示用户中心
  bindUserTap: function(){
    var that = this;
    wx.request({
      url: app.globalData.domain+'/api/...',
      data: {name: that.data.username, pwd: that.data.pwd, wxUser: that.data.userInfo},
      method: 'POST',
      success: function(data) {
        var data = data.data;
        if(data.success){
          wx.setStorageSync('isLogin', 'true');
          wx.setStorageSync('userInfo', data.userInfo);
          that.setData({
            showLogin: false,
            showUser: true
          });
        }else{
          wx.showModal({
            title: "提示",
            content: data.msg,
            showCancel: false
          })
        }
      }
    });
  },
  //注册账号
  bindRegNewTap: function(){
    var that = this;
    wx.request({
      url: app.globalData.domain+'/api/...',
      data: {name: that.data.username, pwd: that.data.pwd, email: that.data.email, wxUser: that.data.userInfo},
      method: 'POST',
      success: function(data) {
        var data = data.data;
        if(data.success){
          that.setData({
            showReg: false,
            showLogin: true
          });
          wx.showToast({
            title: data.msg,
            icon: 'success'
          });
          //自动绑定微信
          that.bindUserTap()
        }else{
          wx.showModal({
            title: "提示",
            content: data.msg,
            showCancel: false
          })
        }
      }
    });
  },
  //用户名
  bindUserNameBlur: function(e){
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },
  //密码
  bindPwdBlur: function(e){
    var that = this;
    that.setData({
      pwd: e.detail.value
    })
  },
  //邮箱
  bindEmailBlur: function(e){
    var that = this;
    that.setData({
      email: e.detail.value
    })
  },
  //发布的话题
  bindMyTopics: function(){
    wx.navigateTo({
      url: '../userTopics/userTopics?userId='+wx.getStorageSync('userInfo')._id+"&etype=getWxUserTopics"
    })
  },
  //参与的话题
  bindMyReplies: function(){
    wx.navigateTo({
      url: '../userTopics/userTopics?userId='+wx.getStorageSync('userInfo')._id+"&etype=getWxUserReplies"
    })
  },
  //站内信
  bindMyMsg: function(){
    wx.navigateTo({
      url: '../userMsg/userMsg?userId='+wx.getStorageSync('userInfo')._id
    })
  },
  //清理缓存
  bindMyStorage: function(){
    var that = this;

    wx.showModal({
      title: "清理缓存",
      content: "确定后应用缓存将被全部清除，清理缓存后需要重新登陆。",
      success: function(res){
        if(res.confirm){
          wx.clearStorageSync();
          wx.showToast({
            title: '清理成功',
            icon: 'success'
          });
          that.setData({
            showUser: false,
            showLogin: true
          });
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this;

    console.log(wx.getStorageSync('isLogin'))

    //是否登陆过？
    if(wx.getStorageSync('isLogin') == "true"){
      that.setData({
        showUser: true
      })
    }else{
      that.setData({
        showLogin: true
      })
    }

    //userInfo
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })

    //storageSize
    var wxStorage = wx.getStorageInfoSync();
    that.setData({
      storageSize: (wxStorage.currentSize/1000).toFixed(1),
      storageLimitSize: (wxStorage.limitSize/1000).toFixed(1)
    })

  }
})
