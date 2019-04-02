const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    cardCur: 0,
    TabCur: 0,
    type: 1,
    DotStyle:'sm',
    tower: [],
    list: [{
      id: 1,
      title: "未租房信息"
    },{
      id: 2,
      title: "已租房信息"
    }
    ],
    room: []
  },
  onLoad() {
    //获取租房列表
    this.request_house();
    //获取轮播列表
    this.request_show();
  },
  request_house() {
    var that = this;
    wx.request({
      url: app.data.requestUrl + '/api/houselist', //仅为示例，并非真实的接口地址
      data: {
        'type': this.data.type,
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          room: res.data
        })
      }
    })
  },
  request_show() {
    var that=this;
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
        success:function() {

        },       
        fail:function() {

        },          
        complete:function() {

        }
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      towerList: list
    })
  },

  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  tabSelect(e) {
    var type=e.currentTarget.dataset.id
    var that = this
    wx.request({
      url: app.data.requestUrl + '/api/houselist', //仅为示例，并非真实的接口地址
      data: {
        'type': type+1,
      },
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          room: res.data,
          TabCur: type,
          scrollLeft: (type - 1) * 60
        })
      }
    })
    
    
  },

  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.towerList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        towerList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        towerList: list
      })
    }
  },
});