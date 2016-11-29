//获取应用实例
var app = getApp()
Page({
  data: {
    cates: app.globalData.cates,
    catesArr: [],
    index: 0,
    userInfo: {},
    title: '',
    content: ''

  },
  //栏目
  bindCateChange: function(e){
    var that = this;
    var index = e.detail.value;
    var datas = e.currentTarget.dataset;
    that.setData({
      index: index,
      cate: that.data.cates[index].id
    });
  },
  //标题
  bindTitleBlur: function(e){
    var that = this;
    that.setData({
      title: e.detail.value
    })
  },
  //内容
  bindContentBlur: function(e){
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },
  //发布
  bindPushTap: function(){
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    wx.request({
      url: app.globalData.domain+'/api/...',
      data: {title: that.data.title, content: that.data.content+"\n发自JSpapa微信小程序V0.6", cate: that.data.cate, openId: userInfo.openId},
      method: 'POST',
      success: function(data) {
        var data = data.data;
        if(data.success){
          wx.navigateTo({
            url: '../topic/topic?id='+data.id
          })
          wx.showToast({
            title: data.msg,
            icon: 'success'
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
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    //catesArr
    function setCatesArr(){
      var catesArr = [];
      for(var i = 0; i < that.data.cates.length; i++){
        if(i==0){
          catesArr.push("请选择类别");
        }else{
          catesArr.push(that.data.cates[i].name);
        }
        
      }
      that.setData({
        catesArr: catesArr
      });
    }

    setCatesArr();

  },
  onShow: function(){
    //是否登陆
    if(!wx.getStorageSync('isLogin')){
      wx.showModal({
        title: "请登陆",
        content: "您还没有登陆，请登陆后发布和编辑话题",
        showCancel: false,
        success: function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../user/user'
            })
          }
        }
      })
    }
  }
})
