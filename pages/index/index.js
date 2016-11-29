//index.js
var func = require("../functions.js");

//获取应用实例
var app = getApp()
Page({
  data: {
    topics: [],
    page: {},
    cates: app.globalData.cates,
    hasMore: true,
    loadflag: false,
    userInfo: {}
  },
  //点nav加载对应列表
  bindNavTap: function(e) {
    var cates = this.data.cates;
    var data = e.currentTarget.dataset;

    //选中栏目
    var cateLen = cates.length-1;
    while(cateLen>=0){
      if(cates[cateLen].id == data.id){
        cates[cateLen].selected = true;
      }else{
        cates[cateLen].selected = false;
      }
      --cateLen;
    }
    this.setData({
      cates: cates,
      hasMore: true,
      loadflag: true
    });
    //ajax拉取当前栏目数据并填充
    func.getTopics.call(this, data.id);

  },
  //点击进入话题详情
  bindTopicTap: function(e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../topic/topic?id='+data.id
    })
  },
  //滚动加载列表
  bindScrollToLower: function(){
    if(this.data.page.cur < this.data.page.total){
      wx.showToast({
        title: '正在加载',
        icon: 'loading'
      });
      var cate;
      for(var i = 0; i < this.data.cates.length; i++){
        if(this.data.cates[i].selected == true){
          cate = this.data.cates[i];
        }
      }
      
      func.getTopics.call(this, cate.id, this.data.page.cur+1);
    }else{
      this.setData({
        hasMore: false
      })
    }
    
  },
  bindScrollToUpper: function(){
    
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
    //默认加载全部
    func.getTopics.call(this, "all");

  }
})
