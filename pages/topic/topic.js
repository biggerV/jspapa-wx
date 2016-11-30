var func = require("../functions.js");

//获取应用实例
var app = getApp()
Page({
  data: {
    topic: {},
    author: {},
    userInfo: {}
  },
  onLoad: function (options) {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    //ajax根据id拉取话题内容
    func.getTopic.call(this, options.id);
  }
})
