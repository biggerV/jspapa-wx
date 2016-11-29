// pages/userMsg/userMsg.js
var func = require("../functions.js");

var app = getApp()
Page({
  data:{
    msgs: [],
    page: {},
    hasMore: true,
    userInfo: {},
  },
  //滚动加载列表
  bindScrollToLower: function(){
    if(this.data.page.cur < this.data.page.total){
      wx.showToast({
        title: '正在加载',
        icon: 'loading'
      });

      var userInfo = wx.getStorageSync('userInfo');
      func.getMsgsByUserId.call(this, userInfo.openId, this.data.page.cur+1);
    }else{
      this.setData({
        hasMore: false
      })
    }
    
  },
  //查看信息
  bindMsgTap: function(e){
    var that = this;
    var datas = e.currentTarget.dataset;
    var msgs = that.data.msgs;

    if(!msgs[datas.idx]['open']){
      msgs[datas.idx]['open']=true;
    }else{
      msgs[datas.idx]['open']=false;
    }

    if(datas.read==="true"){
      that.setData({
        msgs: msgs
      });
    }else{
      msgs[datas.idx]['read']=true;
      var openId = wx.getStorageSync('userInfo').openId;
      wx.request({
        url: app.globalData.domain+'/api/.../'+datas.id+'/'+openId,
        method: 'GET',
        success: function(data) {
          var data = data.data;
          if(data.success){
            that.setData({
              msgs: msgs
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
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    //默认加载第一页
    wx.getStorage({
        key: 'userInfo',
        success: function(res) {
            func.getMsgsByUserId.call(that, res.data.openId, 1);
        } 
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})