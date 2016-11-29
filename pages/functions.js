var app = getApp();
var hostName = app.globalData.domain;
var util = require("../utils/util.js");
var html2json = require("../utils/html2json.js");
var convert = require("../utils/convert.js");

var funcs = {
    //按分类拉取话题列表
    getTopics: function (cate, page){
        var that = this;
        var page = page || 1;
        wx.request({
            url: hostName+'/api/.../'+cate+"?page="+page,
            success: function(res) {
                that.setData({
                    topics: that.data.loadflag ? res.data.topics : that.data.topics.concat(res.data.topics),
                    page: res.data.page,
                    loadflag: false
                })
            },
            fail: function(err) {
                console.error("获取话题列表失败");
            }
        });
    },

    //根据id拉取话题内容
    getTopic: function (id){
        var that = this;
        wx.request({
            url: hostName+'/api/.../'+id,
            success: function(res) {
                var data = res.data;
                data.topic.created = util.formatTime(new Date(data.topic.created));
                if(typeof data.topic.content == "string"){
                    data.topic.content = html2json(convert(data.topic.content));
                }
                that.setData({
                    topic: data.topic,
                    author: data.author
                })
            },
            fail: function(err) {
                console.error("获取话题失败");
            }
        });
    },

    reLogin: function (msg){
        wx.showModal({
            title: "提示",
            content: msg,
            success: function(res){
                if(res.confirm){
                    wx.clearStorageSync();
                    wx.navigateTo({
                        url: '../user/user'
                    })
                }
            }
        })
    },

    //发布、参与的话题
    getTopicsByUserId: function (openId, page, etype){
        var that = this;
        var page = page || 1;
        wx.request({
            url: hostName+'/api/.../'+etype+'/'+openId+"?page="+page,
            success: function(res) {
                if(!res.data.success){
                    return funcs.reLogin(res.data.msg);
                }
                if(res.data.topics.length<=0){
                    return;
                }
                that.setData({
                    topics: that.data.topics.concat(res.data.topics),
                    page: res.data.page
                })
            },
            fail: function(err) {
                console.error("获取用户话题列表失败");
            }
        });
    },

    //信息
    getMsgsByUserId: function (openId, page){
        var that = this;
        var page = page || 1;
        wx.request({
            url: hostName+'/api/.../'+openId+"?page="+page,
            success: function(res) {
                if(res.data.msgs.length<=0){
                    return;
                }
                that.setData({
                    msgs: that.data.msgs.concat(res.data.msgs),
                    page: res.data.page
                })
            },
            fail: function(err) {
                console.error("获取用户话题列表失败");
            }
        });
    },

    //格式化内容
    html2text: function (html){
        return html.replace(/<[a-z]>/gi, "").split(/<\/[a-z]>/gi);
    }

}


module.exports = funcs;