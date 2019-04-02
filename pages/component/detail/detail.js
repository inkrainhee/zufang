const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    TabCur: 0,
    type: 1,
    tower: [],
    room: []
  },
  onLoad(options) {
    //获取租房列表
    this.request_house_by_id(options.id);
    //获取轮播列表
    this.request_show();
  },
  request_house_by_id(id) {
    var that = this;
    wx.request({
      url: app.data.requestUrl + '/api/houselistbyid', 
      data: {
        'id': id,
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          room: res.data
        })
      }
    })
  },
  request_show() {
    var that = this;
    wx.request({
      url: app.data.requestUrl + '/api/showlist', //仅为示例，并非真实的接口地址
      data: {
        'type': 1,
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        that.setData({
          tower: res.data
        })
      }
    })
  },
  navigateTo(e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id,
      success: function () {

      },
      fail: function () {

      },
      complete: function () {

      }
    })
  },

});