// pages/details/details.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    console.log(options.types,'类型')
    
    if (options.tps != undefined && options.tps != null){
      this.Base.setMyData({ tps: options.tps, barcode: options.barcode, jsondatalist: options.barcode})
    }
    else if (options.types=="A"){
      console.log('走不走')
      var jsondata = JSON.parse(options.json);
      this.Base.setMyData({ jsondata, types: options.types});
    }
    else{
      console.log('看看')
      var jsondata = JSON.parse(options.json);
      this.Base.setMyData({ jsondata, jsondatalist: jsondata.item_list });
    }
   // this.Base.setMyData({ show:0})
  }
  onMyShow() {
    var that = this;
  }
  copy(e){
    var id=e.currentTarget.id;
    var text=e.currentTarget.dataset.text;
    console.log(text);
   this.Base.setMyData({show:id});
    wx.setClipboardData({
      data: text,
    })

  }
  allcopy(e){
    
    var jsondata = this.Base.getMyData().jsondatalist; 
    var jsondata2 = this.Base.getMyData().jsondata;
    var list = '';

    if (this.Base.options.tps != undefined && this.Base.options.tps != null) {
      wx.setClipboardData({
        data: jsondata,
      })
    }
    else if (this.Base.getMyData().types=='A'){
      list = '姓名：' + jsondata2.name + '\n' + '性别：' + jsondata2.sex + '\n' + '民族：' + jsondata2.nation + '\n' + '出生：' + jsondata2.birth + '\n' + '住址：' + jsondata2.address + '\n' + '公民身份号码：' + jsondata2.id

      wx.setClipboardData({
        data: list,
      })
    }
    else{
      for (var i = 0; i < jsondata.length; i++) {
        list += jsondata[i].item + ':' + jsondata[i].itemstring + '\n';
      }
      wx.setClipboardData({
        data: list,
      })

    }
     
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.copy = content.copy; 
body.allcopy = content.allcopy; 
Page(body)