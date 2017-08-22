/**
 * Created by gxr on 2017/1/12.
 */
"use strict"
var _ = require('underscore');
var data = require('./test_goose');
var inDev = data.getIn();
var outDev = data.getOUT();


function parseHeBin(inDev,outDev) {
  var iedhebing = inDev.IED.filter(x => x.ProdevName === '220kV线路间隔1智能终端' || x.ProdevName === '220kV线路间隔1合并单元');
  var iedzhongduan = outDev.IED.filter(x => x.ProdevName === '220kV线路间隔1智能终端' || x.ProdevName === '220kV线路间隔1合并单元');
  var outGuid =  iedzhongduan.find(y => y.ProdevName == '220kV线路间隔1智能终端').Guid;
  var inGuid = iedzhongduan.find(y => y.ProdevName == '220kV线路间隔1合并单元').Guid;
  var sigaFlowHe = inDev.SigFlow.filter(function (x) {
     return x.ProjectReceivedev=== inGuid && x.ProjectSenddev === outGuid;
  });
  var sigaFlowzh = outDev.SigFlow.filter(function (x) {
     return x.ProjectReceivedev=== inGuid && x.ProjectSenddev === outGuid;
  });
  var virtLinkhe  = inDev.VirLink.filter(function (x) {
    return x.Recvdev === inGuid && x.Senddev === outGuid;
  });
  var virtLinkzhong  = outDev.VirLink.filter(function (x) {
    return x.Recvdev === inGuid && x.Senddev === outGuid;
  });
  console.log('outGuid',outGuid);
  console.log('inGuid',inGuid);
  console.log("_______________输入装置信息流列表_________________");
  console.log(sigaFlowHe);
  console.log("_______________输出装置信息流列表_________________");
  console.log(sigaFlowzh);
  console.log("_______________输入装置回路列表_________________");
  console.log(virtLinkhe);
  console.log("_______________输出装置回路列表_________________");
  console.log(virtLinkzhong);

}

parseHeBin(inDev,outDev);
