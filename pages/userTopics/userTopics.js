var func = require("../functions.js");

var app = getApp()
Page({
  data: {
    topics: [],
    page: {},
    hasMore: true,
    userInfo: {},
    etype: ""
  },
  //滚动加载列表
  bindScrollToLower: function(){
    if(this.data.page.cur < this.data.page.total){

      wx.showToast({
        title: '正在加载',
        icon: 'loading'
      });

      var userInfo = wx.getStorageSync('userInfo');
      func.getTopicsByUserId.call(this, userInfo.openId, this.data.page.cur+1, this.data.etype);
    }else{
      this.setData({
        hasMore: false
      })
    }
    
  },
  //点击进入话题详情
  bindTopicTap: function(e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../topic/topic?id='+data.id
    })
  },
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    //列表类型
    that.setData({
      etype: options.etype
    });

    //默认加载第一页
    wx.getStorage({
        key: 'userInfo',
        success: function(res) {
            func.getTopicsByUserId.call(that, res.data.openId, 1, options.etype);
        } 
    })

    //标题
    if(this.data.etype == "getWxUserReplies"){
      wx.setNavigationBarTitle({
        title: '参与的话题'
      })
    }

  }
})