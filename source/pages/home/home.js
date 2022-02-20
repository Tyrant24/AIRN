// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  AiApi
} from "../../apis/ai.api.js";
import {
  MemberApi
} from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
  }
  bindaiocr(e) {
    var memberinfo = this.Base.getMyData().memberinfo;
    console.log(memberinfo.id, 'ppp');
    // return;
    var that = this;
    var types = e.currentTarget.id;
    var aiapi = new AiApi();
    var memberapi = new MemberApi();
    console.log(types, '类型');
    this.Base.uploadOneImage("aitest", (ret) => {
      wx.showLoading({
        title: '识别中...',
      })
      aiapi.aiocr({
        types: types,
        photo: ret
      }, (aiocr) => {

        setTimeout(() => {
          wx.hideLoading();
        }, 2000)
        if (aiocr != null && aiocr.ret == 0) {
          console.log('a')
          var jsondata = JSON.stringify(aiocr.data);



          memberapi.addrecord({
            tupian: ret
          }, (addrecord) => {

            wx.navigateTo({
              url: '/pages/details/details?json=' + jsondata + '&types=' + types
            })
            this.Base.setMyData({
              addrecord
            })
          })
          //wx.hideLoading();
          //  2147483635


        } else {
          wx.showToast({
            title: '请上传正确的图片~',
            icon: 'none'
          })
          console.log('b')
        }
        // if (aiocr != null && aiocr != '') {

        // }

        this.Base.setMyData({
          aiocr
        })

      })

    }, undefined);


  }

  bindtodetail(e) {
    wx.scanCode({
      scanType: ['barCode'],
      success(res) {
        console.log(res.result)

        wx.navigateTo({
          url: '/pages/details/details?barcode=' + res.result + '&tps=1'
        })
      }

    })
  }

  toother(e) {
    var id = e.currentTarget.id;

    wx.navigateToMiniProgram({
      appId: id,
      path: '',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {}
    })

  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindaiocr = content.bindaiocr;
body.bindtodetail = content.bindtodetail;
body.toother = content.toother;
Page(body)