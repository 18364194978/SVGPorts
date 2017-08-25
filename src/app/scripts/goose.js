'use strict';
var isEdit;
var iedIds;
var centIedName = '';
var ROOFS;
var centerIeds;
var dtds;
var sendDevNames;
var clikRes = false;
(function($, joint, vE, _, ROOF, GFC, bootbox) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  ROOFS = ROOF;
  // joint.dia.Goose = joint.shapes.basic.Generic.extend({
  //   init: function(paper, iedID) {
  //     iedIds = iedID;
  //     let virlinkModal = `<div class="modal vlink-modal animated" style="overflow-y:hidden;">
  //                           <div class="panel" style="width:100%; height: 100%;display: inline-block; margin-bottom: 0; position: relative;">
  //                               <div class="modal-header" style="padding: 5px 15px 5px 15px;">
  //                                   <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  //                                   <h5 class="modal-title">虚拟回路连接<label id="outDevName111" class="modal123" style="position: absolute;left: 20%;margin-left: -30px;text-align: center;">虚拟回路连接</label><label id="outDevName222" class="modal123" style="position: absolute;left: 70%;margin-left: -30px;text-align: center;">虚拟回路连接</label></h5>
  //                               </div>
  //                               <div class="btn-virlink-view">
  //                                   <span class="vi-title1">收起</span><span class="vi-title2">展开全部</span>&nbsp;&nbsp;<i class="glyphicon glyphicon-chevron-down"></i><i class="glyphicon glyphicon-chevron-up"></i>
  //                               </div>
  //                               <div class="flowComplate">
  //                               <label class="checkbox-check" style="margin-left:12px">
  //                                   <input type="checkbox" class="checkBtn" value="virtualCheck">完成设计
  //                               </label>
  //                               </div>
  //                               <div class="panel-body virlink-prent-view">
  //                                   <div class="virlink-top">
  //                                       <div class="vport-flex">
  //                                           <div class="left-vport-list" style="position: relative;">
                                             
  //                                               <div class="left-list-Filter-bind" style="text-align: left;">
  //                                                   <label class="checkbox-inline" style="margin-left:1px">
  //                                                       <input type="checkbox" class="lef" name="inlineRadioOptions" id="inlineRadio0" value="All"> ALL
  //                                                   </label>
  //                                                   <label class="checkbox-inline" style="margin-left:1px">
  //                                                       <input type="checkbox" class="lef" name="inlineRadioOptions" id="inlineRadio1" value="GSEControl"> GOOSE
  //                                                   </label>
  //                                                   <label class="checkbox-inline" style="margin-left:1px">
  //                                                       <input type="checkbox" class="lef" name="inlineRadioOptions" id="inlineRadio2" value="SampledValueControl"> SV
  //                                                   </label>
  //                                                   <label class="checkbox-inline" style="margin-left:1px">
  //                                                       <input type="checkbox" class="lef" name="inlineRadioOptions" id="inlineRadio3" value="ReportControl"> 站控层信号
  //                                                   </label>
                                                   
  //                                                   <label  style ="float:right;">
  //                                                       <span id="outDevName" >装置名称</span>
  //                                                   </label>
  //                                                    <label class="checktxt" style="margin-left:1px; float:right; margin-right: 15px;">
  //                                                       <input type="text" name="inlineRadioOptions" id="in" value="" placeholder="筛选虚端子" size="12">
  //                                                   </label>
  //                                               </div>
  //                                               <div class="panel panel-primary ieds" style="width:100%; height: 100%;position: absolute; overflow-y:auto;display: inline-block;">
  //                                                   <div class="panel-body">
  //                                                       <p id="sendtitle">Panel heading without title</p>
  //                                                       <ul class="list-group" id="sendlist" style="overflow-y: auto;">
                                                            
  //                                                       </ul>
  //                                                   </div>
  //                                               </div>
  //                                           </div>
                                        
  //                                           <div class="link-vport text-center" style="position: relative;">
  //                                               <img src="./images/arrow_right.png" id="arrow" style="width:30px; height:21;position: absolute;top: 40%;left: 50%;margin-left: -12px;"/>
  //                                               <div class="btn btn-primary" id="linkV" style="position: absolute;top: 60%;left: 50%;margin-left: -27px;">连接</div>
  //                                               <div class="btn btn-primary" id="relinkV" style="position: absolute;top: 60%;left: 50%;margin-left: -34px;">重连接</div>
  //                                           </div>
  //                                           <div class="right-vport-list" style="position: relative;">
                                           
  //                                               <div class="right-list-Filter-bind" style="margin-left:1px;text-align: left;">
  //                                                   <label class="checkbox-inline">
  //                                                       <input type="checkbox" class="rig" name="inlineRadioOptions" id="inlineRadio00" value="All"> ALL
  //                                                   </label>
  //                                                   <label class="checkbox-inline" style="margin-left:1px">
  //                                                       <input type="checkbox" class="rig" name="inlineRadioOptions" id="inlineRadio11" value="GSEControl"> GOOSE
  //                                                   </label>
  //                                                   <label class="checkbox-inline" style="margin-left:1px">
  //                                                       <input type="checkbox" class="rig" name="inlineRadioOptions" id="inlineRadio22" value="SampledValueControl"> SV
  //                                                   </label>
  //                                                   <label class="checkbox-inline" style="margin-left:1px">
  //                                                       <input type="checkbox" class="rig" name="inlineRadioOptions" id="inlineRadio33" value="ReportControl"> 站控层信号
  //                                                   </label>
  //                                                   <label  style ="float:right;">
  //                                                       <span id="inDevName" >装置名称</span>
  //                                                   </label>
  //                                                   <label class="checktxt" style="margin-left:1px; float:right; margin-right: 15px;">
  //                                                       <input type="text" name="inlineRadioOptions" id="inn" value="" placeholder="筛选虚端子" size="12">
  //                                                   </label>
  //                                               </div>
  //                                               <div class="panel panel-primary ieds" style="width:100%; height: 100%;position: absolute; overflow-y:auto;display: inline-block;">
  //                                                   <div class="panel-body">
  //                                                       <p id="recvtitle">Panel heading without title</p>
  //                                                       <ul class="list-group" id="recvlist" style="overflow-y: auto;">
                                                           
  //                                                       </ul>
  //                                                   </div>
  //                                               </div>
  //                                           </div>
  //                                       </div>
  //                                   </div>
  //                                   <div class="virlink-bottom">
  //                                       <div class="panel panel-primary" style="margin-top: 10px;width: 100%;height:100%;max-height: 100%;position:absolute;overflow: auto;font-size: 12px; margin-bottom: 0;">
  //                                           <!-- <div class="panel-heading">已经连接的信息</div> -->
  //                                           <div class="panel-body" style="width: 100%;">
  //                                               <div style="display: flex;text-align: center;">
  //                                                   <div class="" style="flex: 0.15;margin-left:30px;"></div>
  //                                                   <div class="" style="flex: 0.25;">序号</div>
  //                                                   <div class="hide" style="flex: 1.5;">所属IDE设备</div>
  //                                                   <div class="" id="portName1" style="flex: 1.5;">自定义名称</div>
  //                                                   <div class="" style="flex: 1.25;">设计描述</div>
  //                                                   <div class="" style="flex: 0.75;">连接</div>
  //                                                   <div class="hide" style="flex: 1.5;">匹配IDE设备</div>
  //                                                   <div class="" id="portName2" style="flex: 1.5;">自定义名称</div>
  //                                                   <div class="hide" style="flex: 1.25;"></div>
  //                                               </div>
  //                                               <div id="Vlinklists" style="">
  //                                               </div>
  //                                           </div>
  //                                       </div>
  //                                   </div>
  //                               </div>
  //                           </div>
  //                       </div>`;
  //     $('.vlink-modal').remove();
  //     $('body').append(virlinkModal);
  //     let leftColorTipStr = `
  //               <div class="left-color-tip hide" style="position:absolute;top:15px;left:15px;height:40px;line-height:40px;font-size:12px;">
  //                 <span style="display:inline-block;width:40px;height:13px;vertical-align: text-bottom;background-color:#778694;"></span>&nbsp;&nbsp;无端子装置<br>
  //                 <span style="display:inline-block;width:40px;height:13px;vertical-align: text-bottom;background-color:#4283bb;"></span>&nbsp;&nbsp;有端子装置
  //               </div>
  //           `;
  //     $('.left-color-tip').remove();
  //     $('body').append(leftColorTipStr);
  //     var $this = this;
  //     var getVirSvgInfoByIed = ROOF.virlink.GetVirSvgInfoByIed;
  //     console.log('ied', iedID);
  //     getVirSvgInfoByIed(iedID, function(obj) {
  //       if (obj.status) {
  //         console.log($.parseJSON(obj.json_info));
  //         var arr1 = $.parseJSON(obj.json_info).IED;
  //         var models1 = arr1.filter(x => (x.Guid === iedIds));
  //         centIedName = models1[0].ProdevName;
  //         // 处理成功操作
  //         var data = $.parseJSON(obj.json_info);
  //         console.log(data, 'data');

  //         var virlinkdata = data.VirLink;
  //         // if (virlinkdata === null) {
  //         //     GFC.showWarning('没有虚拟回路数据!');
  //         // }
  //         var phyLinkdata = data.PhyLink;
  //         // if (phyLinkdata === null) {
  //         //     GFC.showWarning('没有物理回路数据!');
  //         // }
  //         var sigFlowdata = data.SigFlow;
  //         // if (sigFlowdata === null) {
  //         //     GFC.showWarning('没有信息流数据!');
  //         // }
  //         var portvirsigdata = data.Portvirsig;
  //         // if (portvirsigdata === null) {
  //         //     GFC.showWarning('没有虚实对应数据!');
  //         // }
  //         data.IED = _.filter(data.IED, function(numg) {
  //           //if (phydata.senddev === dev.Guid || phydata.recvdev === dev.Guid) {
  //           if (numg.Guid !== iedID) {
  //             if (phyLinkdata !== null) {
  //               if (_.findWhere(phyLinkdata, {
  //                   recvdev: numg.Guid
  //                 }) || _.findWhere(phyLinkdata, {
  //                   senddev: numg.Guid
  //                 })) {
  //                 return numg;
  //               }
  //             }
  //             if (sigFlowdata !== null) {
  //               if (_.findWhere(sigFlowdata, {
  //                   ProjectReceivedev: numg.Guid
  //                 }) || _.findWhere(sigFlowdata, {
  //                   ProjectSenddev: numg.Guid
  //                 })) {
  //                 return numg;
  //               }
  //             }
  //           }
  //           if (numg.Guid === iedID) {
  //             return numg;
  //           }
  //         });
  //         var odds = _.reject(data.IED, function(objff) { //
  //           return objff.Guid === iedID;
  //         });
  //         var centerDev = _.findWhere(data.IED, {
  //           Guid: iedID
  //         });
  //         var cells = [];
  //         //获取数据结束
  //         //预定义处理函数
  //         var getVirPort = function(arrayt) {
  //           let se = _.where(portvirsigdata, {
  //             PropvPortGuid: arrayt.sendport
  //           });
  //           let re = _.where(portvirsigdata, {
  //             PropvPortGuid: arrayt.recvport
  //           });
  //           var virportA = [];
  //           $.each(se, function(indv, virdatas) {
  //             let vlinkdatab = null;
  //             if (_.findWhere(virlinkdata, {
  //                 Guid: virdatas.PropvVirlinkGuid
  //               }) !== undefined) {
  //               vlinkdatab = _.findWhere(virlinkdata, {
  //                 Guid: virdatas.PropvVirlinkGuid
  //               });
  //               vlinkdatab.s = _.findWhere(data.IED, {
  //                 Guid: vlinkdatab.Senddev
  //               });
  //               vlinkdatab.r = _.findWhere(data.IED, {
  //                 Guid: vlinkdatab.Recvdev
  //               });
  //               vlinkdatab.in = _.findWhere(arrayt.recvBG.Insig, {
  //                 Guid: vlinkdatab.ProjectInsignalGuid
  //               });
  //               vlinkdatab.ou = _.findWhere(arrayt.sendBG.Outsig, {
  //                 Guid: vlinkdatab.ProjectOutsignalGuid
  //               });
  //               if (vlinkdatab.in === undefined) {
  //                 vlinkdatab.in = _.findWhere(arrayt.sendBG.Insig, {
  //                   Guid: vlinkdatab.ProjectInsignalGuid
  //                 });
  //                 vlinkdatab.ou = _.findWhere(arrayt.recvBG.Outsig, {
  //                   Guid: vlinkdatab.ProjectOutsignalGuid
  //                 });
  //               }
  //               // if (vlinkdatab.in === undefined || vlinkdatab.ou === undefined) {
  //               //   return true;
  //               // }
  //               virportA.push(vlinkdatab);
  //             }

  //           });
  //           $.each(re, function(indv, virdatas) {
  //             let vlinkdatab = null;
  //             if (_.findWhere(virlinkdata, {
  //                 Guid: virdatas.PropvVirlinkGuid
  //               }) !== undefined) {
  //               vlinkdatab = _.findWhere(virlinkdata, {
  //                 Guid: virdatas.PropvVirlinkGuid
  //               });
  //               vlinkdatab.s = _.findWhere(data.IED, {
  //                 Guid: vlinkdatab.Senddev
  //               });
  //               vlinkdatab.r = _.findWhere(data.IED, {
  //                 Guid: vlinkdatab.Recvdev
  //               });
  //               vlinkdatab.in = _.findWhere(arrayt.recvBG.Insig, {
  //                 Guid: vlinkdatab.ProjectInsignalGuid
  //               });
  //               vlinkdatab.ou = _.findWhere(arrayt.sendBG.Outsig, {
  //                 Guid: vlinkdatab.ProjectOutsignalGuid
  //               });
  //               if (vlinkdatab.in === undefined) {
  //                 vlinkdatab.in = _.findWhere(arrayt.sendBG.Insig, {
  //                   Guid: vlinkdatab.ProjectInsignalGuid
  //                 });
  //                 vlinkdatab.ou = _.findWhere(arrayt.recvBG.Outsig, {
  //                   Guid: vlinkdatab.ProjectOutsignalGuid
  //                 });
  //               }
  //               // if (vlinkdatab.in === undefined || vlinkdatab.ou === undefined) {
  //               //   return true;
  //               // }
  //               virportA.push(vlinkdatab);
  //             }

  //           });
  //           return virportA;
  //         };
  //         var getPP = function(portid, devid) {
  //           var ppcache = null;
  //           var thiside = _.findWhere(data.IED, {
  //             Guid: devid
  //           });
  //           $.each(thiside.Slot, function(indsl, sldata) {
  //             if (_.findWhere(sldata.Port, {
  //                 Guid: portid
  //               }) !== undefined) {
  //               ppcache = _.findWhere(sldata.Port, {
  //                 Guid: portid
  //               });
  //               ppcache.bsname = sldata.ProbsName;
  //               return false;
  //             }
  //           });
  //           return ppcache;
  //         };
  //         var getDevPort = function(dev, po) {
  //           var cahePhy = [];
  //           var jij = dev.position.y + 60;
  //           var redt = null;
  //           if (phyLinkdata !== null) {
  //             $.each(phyLinkdata, function(phyindex, phydata) {
  //               if (phydata.senddev === dev.Guid || phydata.recvdev === dev.Guid) {
  //                 if (phydata.senddev === dev.Guid) {
  //                   phydata.sendBG = dev;
  //                   phydata.recvBG = _.findWhere(data.IED, {
  //                     Guid: phydata.recvdev
  //                   });
  //                   phydata.tt = 'send';
  //                 } else {
  //                   phydata.sendBG = _.findWhere(data.IED, {
  //                     Guid: phydata.senddev
  //                   });
  //                   phydata.recvBG = dev;
  //                   phydata.tt = 'recv';
  //                 }
  //                 phydata.po = po;
  //                 if (virlinkdata === null) {
  //                   phydata.size = {
  //                     width: 350,
  //                     height: 24
  //                   };
  //                   phydata.pp = {
  //                     send: getPP(phydata.sendport, phydata.senddev),
  //                     recv: getPP(phydata.recvport, phydata.recvdev)
  //                   };
  //                 } else {
  //                   if (getVirPort(phydata).length === 0 || getVirPort(phydata).length === undefined) {
  //                     phydata.size = {
  //                       width: 350,
  //                       height: 24
  //                     };
  //                     phydata.adc = 'adc1';
  //                     console.log('adc1', phydata);
  //                     // phydata.virlinkdata = getVirPort(phydata);
  //                     phydata.pp = {
  //                       send: getPP(phydata.sendport, phydata.senddev),
  //                       recv: getPP(phydata.recvport, phydata.recvdev)
  //                     };
  //                   } else {

  //                     phydata.size = {
  //                       width: 350,
  //                       height: 24
  //                     };
  //                     phydata.adc = 'adc2';
  //                     console.log('adc2', phydata);
  //                     phydata.virlinkdata = getVirPort(phydata);
  //                     phydata.pp = {
  //                       send: getPP(phydata.sendport, phydata.senddev),
  //                       recv: getPP(phydata.recvport, phydata.recvdev)
  //                     };
  //                   }
  //                 }
  //                 if (po === 'left') {
  //                   //if (_.findWhere(sigFlowdata, { ProjectSenddev: dev.Guid }) !== undefined) {
  //                   if (phydata.tt === 'send') {
  //                     phydata.sigFlow = 'out';
  //                     //phydata.sigf = _.findWhere(sigFlowdata, { ProjectSenddev: dev.Guid });
  //                   }
  //                   //if (_.findWhere(sigFlowdata, { ProjectReceivedev: dev.Guid }) !== undefined) {
  //                   if (phydata.tt === 'recv') {
  //                     phydata.sigFlow = 'in';
  //                     //phydata.sigf = _.findWhere(sigFlowdata, { ProjectReceivedev: dev.Guid });
  //                   }
  //                   phydata.position = {
  //                     x: dev.position.x + dev.size.width - 50,
  //                     y: jij
  //                   };
  //                   jij += phydata.size.height + 20;
  //                 } else {
  //                   //if (_.findWhere(sigFlowdata, { ProjectSenddev: dev.Guid }) !== undefined) {
  //                   if (phydata.tt === 'send') {
  //                     phydata.sigFlow = 'in';
  //                     //phydata.sigf = _.findWhere(sigFlowdata, { ProjectSenddev: dev.Guid });
  //                   }
  //                   //if (_.findWhere(sigFlowdata, { ProjectReceivedev: dev.Guid }) !== undefined) {
  //                   if (phydata.tt === 'recv') {
  //                     phydata.sigFlow = 'out';
  //                     //phydata.sigf = _.findWhere(sigFlowdata, { ProjectReceivedev: dev.Guid });
  //                   }
  //                   phydata.position = {
  //                     x: dev.position.x - 250,
  //                     y: jij
  //                   };

  //                   jij += phydata.size.height + 20;
  //                 }

  //                 cahePhy.push(phydata);
  //               }
  //             });
  //           }
  //           if (cahePhy.length === 0) {
  //             jij = dev.position.y + 60;
  //           }
  //           if (!sigFlowdata || sigFlowdata.length !== 0) {
  //             //jij = dev.position.y + 80;
  //             $.each(sigFlowdata, function(sigind, sigdata) {
  //               sigdata.sendBG = _.findWhere(data.IED, {
  //                 Guid: sigdata.ProjectSenddev
  //               });
  //               sigdata.recvBG = _.findWhere(data.IED, {
  //                 Guid: sigdata.ProjectReceivedev
  //               });
  //               sigdata.virlinkdata = [];
  //               $.each(_.where(data.VirLink, {
  //                 Recvdev: sigdata.ProjectReceivedev,
  //                 Senddev: sigdata.ProjectSenddev
  //               }), function(indesigv, datasigv) {
  //                 //vlinkdatab = _.findWhere(virlinkdata, { Guid: virdatas.PropvVirlinkGuid });
  //                 datasigv.s = _.findWhere(data.IED, {
  //                   Guid: datasigv.Senddev
  //                 });
  //                 datasigv.r = _.findWhere(data.IED, {
  //                   Guid: datasigv.Recvdev
  //                 });
  //                 datasigv.in = _.findWhere(sigdata.recvBG.Insig, {
  //                   Guid: datasigv.ProjectInsignalGuid
  //                 });
  //                 datasigv.ou = _.findWhere(sigdata.sendBG.Outsig, {
  //                   Guid: datasigv.ProjectOutsignalGuid
  //                 });
  //                 if (datasigv.in === undefined) {
  //                   datasigv.in = _.findWhere(sigdata.sendBG.Insig, {
  //                     Guid: datasigv.ProjectInsignalGuid
  //                   });
  //                   datasigv.ou = _.findWhere(sigdata.recvBG.Outsig, {
  //                     Guid: datasigv.ProjectOutsignalGuid
  //                   });
  //                 }
  //                 let nowPropvPhy = _.findWhere(portvirsigdata, {
  //                   PropvVirlinkGuid: datasigv.Guid
  //                 });
  //                 if (nowPropvPhy !== undefined && phyLinkdata !== null) {
  //                   let issend = _.findWhere(phyLinkdata, {
  //                     sendport: nowPropvPhy.PropvPortGuid
  //                   });
  //                   let isrecv = _.findWhere(phyLinkdata, {
  //                     recvport: nowPropvPhy.PropvPortGuid
  //                   });
  //                   if (issend !== undefined || isrecv !== undefined) {
  //                     return true;
  //                   }
  //                 }
  //                 sigdata.virlinkdata.push(datasigv);
  //               });
  //               if (po === 'left') {

  //                 sigdata.size = {
  //                   width: 350,
  //                   height: 24
  //                 };
  //                 sigdata.position = {
  //                   x: dev.position.x + dev.size.width - 50,
  //                   y: jij + 15
  //                 };
  //                 if (sigdata.ProjectSenddev === dev.Guid) {
  //                   sigdata.sigFlow = 'out';
  //                   cahePhy.push(sigdata);
  //                   jij += sigdata.size.height + 20;
  //                 }
  //                 if (sigdata.ProjectReceivedev === dev.Guid) {
  //                   sigdata.sigFlow = 'in';
  //                   cahePhy.push(sigdata);
  //                   jij += sigdata.size.height + 50;
  //                 }

  //               } else {

  //                 sigdata.size = {
  //                   width: 350,
  //                   height: 24
  //                 };
  //                 sigdata.position = {
  //                   x: dev.position.x - 250,
  //                   y: jij + 15
  //                 };
  //                 if (sigdata.ProjectSenddev === dev.Guid) {
  //                   sigdata.sigFlow = 'in';
  //                   cahePhy.push(sigdata);
  //                   jij += sigdata.size.height + 20;
  //                 }
  //                 if (sigdata.ProjectReceivedev === dev.Guid) {
  //                   sigdata.sigFlow = 'out';
  //                   cahePhy.push(sigdata);
  //                   jij += sigdata.size.height + 50;
  //                 }
  //               }

  //             });
  //           }
  //           redt = {
  //             cahePhy: cahePhy,
  //             jij: jij
  //           };
  //           return redt;
  //         };
  //         var layoutlr = 'left';
  //         var LY = 4500;
  //         var RY = 4500;
  //         var centerX = 5000;
  //         var JJu = 450;
  //         if (odds.length % 2 === 0) {
  //           console.log((odds.length / 2) * 300);
  //         }
  //         $.each(odds, function(index, item) {
  //           var gpy;
  //           if (layoutlr === 'left') {
  //             item.size = {
  //               width: 250,
  //               height: 300
  //             };

  //             item.position = {
  //               x: centerX - JJu,
  //               y: LY
  //             };
  //             gpy = getDevPort(item, 'left');
  //             if (gpy.jij !== 180) {
  //               item.size = {
  //                 width: 250,
  //                 height: gpy.jij - LY
  //               };
  //             } else {
  //               item.size = {
  //                 width: 250,
  //                 height: 80
  //               };
  //             }
  //             $this.addTerminal(item, cells);
  //             $.each(gpy.cahePhy, function(indpph, pphdata) {
  //               $this.addPhylinks(pphdata, cells, data);
  //             });
  //             LY += item.size.height + 50;
  //             layoutlr = 'right';
  //           } else {
  //             item.size = {
  //               width: 250,
  //               height: 300
  //             };

  //             item.position = {
  //               x: centerX + JJu,
  //               y: RY
  //             };
  //             gpy = getDevPort(item, 'right');
  //             if (gpy.jij !== 180) {
  //               item.size = {
  //                 width: 250,
  //                 height: gpy.jij - RY
  //               };
  //             } else {
  //               item.size = {
  //                 width: 250,
  //                 height: 180
  //               };
  //             }
  //             $this.addTerminal(item, cells);
  //             $.each(gpy.cahePhy, function(indpph, pphdata) {
  //               $this.addPhylinks(pphdata, cells, data);
  //             });
  //             RY += item.size.height + 50;
  //             layoutlr = 'left';
  //           }
  //         });
  //         var centerHeight = 300;
  //         if (LY > RY) {
  //           centerHeight = LY - 4500;
  //         } else {
  //           centerHeight = RY - 4500;
  //         }

  //         centerDev.size = {
  //           width: 250,
  //           height: centerHeight
  //         };
  //         if (data.IED.length === 1) {
  //           centerDev.size = {
  //             width: 250,
  //             height: 300
  //           };
  //         }
  //         centerDev.position = {
  //           x: centerX,
  //           y: 4500
  //         };
  //         $this.addTerminal(centerDev, cells);
  //         paper.graph.fromJSON({
  //           cells: cells
  //         });
  //         paper.resizePaperScroller();
  //       } else {
  //         console.log(obj);
  //       }
  //     });
  //   },
  //   addTerminal: function(obj, arrt) {
  //     arrt.push({
  //       id: obj.Guid,
  //       type: 'basic.DeviceVir',
  //       size: obj.size,
  //       dataDev: obj,
  //       position: obj.position,
  //       attrs: {
  //         '.gooseOut': {
  //           width: 300,
  //           height: obj.size.height + 16
  //         }
  //       }
  //     });
  //   },
  //   addPhylinks: function(obj, arrt, data) {
  //     let signame;
  //     let textColor;
  //     if (obj.sigf === undefined) {
  //       signame = obj.FlowInfo;
  //     } else {
  //       signame = obj.sigf.FlowInfo;
  //     }
  //     if (obj.FlowComplete === "true") {
  //       textColor = '#28AF04';
  //     } else {
  //       textColor = '#306796';
  //     }
  //     arrt.push({
  //       id: obj.Guid,
  //       type: 'basic.PhyLinkVir',
  //       z: 99,
  //       size: obj.size,
  //       dataDev: obj,
  //       centerData: data,
  //       position: obj.position,
  //       attrs: {
  //         '.gooseOut': {
  //           width: 350,
  //           height: obj.size.height
  //         },
  //         'text.sigflowtopview': {
  //           'ref-x': .5,
  //           x: 0,
  //           y: 5,
  //           fill: textColor,
  //           opacity: 0.75,
  //           'text-anchor': 'middle',
  //           'y-alignment': 'middle',
  //           'font-family': 'Arial, helvetica, sans-serif',
  //           text: signame
  //         }
  //       }
  //     });
  //   }
  // });
  // joint.shapes.basic.PhyLinkVir = joint.shapes.basic.Generic.extend({
  //   markup: '<g class="rotatable">' +
  //     '<g class="form">' +
  //     '<foreignObject class="gooseOut">' +
  //     '<div xmlns="http://www.w3.org/1999/xhtml" class="goosephybodyo">' +
  //     '<div class="goosephybody">' +
  //     '<div class="lefts">端子</div>' +
  //     '<div class="centersf">' +
  //     // '<div class="tops"><span class="linktype"> </span><span class="linktyfc"></span></div>' +
  //     '<div class="tops"><img src="./images/langLeftCut.png" class="linktyfc1"></img>' +
  //     '<div style="font-size: 16px;color: #4283bb; display:inline-block;vertical-align: text-bottom;" id="virLen" class="text-center"></div>' +
  //     '<img src="./images/langCut.png" class="linktyfc2"></img></div>' +


  //     '<div class="topsc">' +
  //     '<div class="virport">' +
  //     '<div class="leftsd"></div>' +
  //     '<div class="rightsd"></div>' +
  //     '</div>' +
  //     '</div>' +
  //     '</div>' +
  //     '<div class="rights">端子</div>' +
  //     '</div>' +
  //     '</div>' +
  //     '</foreignObject>' +
  //     '<text class="sigflowtopview"/>' +
  //     '</g>' +
  //     '</g>',
  //   defaults: joint.util.deepSupplement({
  //       type: 'basic.PhyLinkVir',
  //       dataDev: null,
  //       dbMenu: function(cellview) {
  //         //todo:重构
  //         //let isEdit = 0;
  //         $('#sendlist').html('');
  //         $('#recvlist').html('');
  //         $('#outDevName111').text('');
  //         $('#outDevName222').text('');
  //         $('#outDevName').text('(端子数量：0)');
  //         $('#inDevName').text('(端子数量：0)');
  //         isEdit = 0;
  //         var dtd = cellview.model.attributes.dataDev;
  //         dtds = dtd;
  //         var setVirSigInfo = ROOF.virlink.SetVirSigInfo;
  //         var centerData = cellview.model.attributes.centerData;
  //         // window.cellview1 = cellview;
  //         // var centerIed = cellview.model.attributes.centerData.IED[0].ProdevName;
  //         // console.log('1111111',cellview.el.baseURI);
  //         // console.log('222222',cellview.el.baseURI.split('/').pop());
  //         var arr = cellview.model.attributes.centerData.IED;
  //         var ids = cellview.el.baseURI.split('/').pop();
  //         var models = arr.filter(x => (x.Guid === ids));
  //         var centerIed = models[0].ProdevName;
  //         centerIeds = centerIed;
  //         $('#sendtitle').text("");
  //         $('#recvtitle').text("");
  //         console.log(cellview.model.attributes, 'cellview.model.attributes.');
  //         var sendDevName = cellview.model.attributes.dataDev.sendBG.ProdevName;
  //         var recvDevName = cellview.model.attributes.dataDev.recvBG.ProdevName;
  //         sendDevNames = sendDevName;
  //         console.log('1111111111111', dtd);
  //         if (dtd.senddev && dtd.recvdev) {
  //           virlink.GetSvgSigInfoByTwoDev(dtd.senddev, dtd.recvdev, function(obj) {
  //             if (obj.status) {
  //               var jsonInfo = $.parseJSON(obj.json_info);
  //               // var outNum = dtd.sendBG.Outsig === null ? 0 : dtd.sendBG.Outsig.length;
  //               // var inNum = dtd.recvBG.Insig === null ? 0 : dtd.recvBG.Insig.length;
  //               var outNum;
  //               var inNum;
  //               if (jsonInfo.Outsig !== null) {
  //                 outNum = jsonInfo.Outsig.length;
  //               } else {
  //                 outNum = 0;
  //               }
  //               if (jsonInfo.Insig !== null) {
  //                 inNum = jsonInfo.Insig.length;
  //               } else {
  //                 inNum = 0;
  //               }
  //               // var outNum = jsonInfo.Outsig.length;
  //               // var inNum = jsonInfo.Insig.length;
  //               if (centerIed === sendDevName) {
  //                 $('#relinkV').hide();
  //                 $('#arrow').attr('src', './images/arrow_right.png');
  //                 $('#outDevName111').text(`${sendDevName}`);
  //                 $('#outDevName222').text(`${recvDevName}`);
  //                 $('#portName1').text('输出端子');
  //                 $('#portName2').text('输入端子');
  //                 $('#outDevName').text(`(端子数量：${outNum})`);
  //                 $('#inDevName').text(`(端子数量：${inNum})`);
  //               } else {
  //                 $('#relinkV').hide();
  //                 $('#outDevName222').text(`${sendDevName}`);
  //                 $('#outDevName111').text(`${recvDevName}`);
  //                 $('#portName2').text('输出端子');
  //                 $('#portName1').text('输入端子');
  //                 $('#inDevName').text(`(端子数量：${outNum})`);
  //                 $('#outDevName').text(`(端子数量：${inNum})`);
  //                 $('#arrow').attr('src', './images/arrow_left.png');
  //               }
  //               var loadsendList = function() {
  //                 $('#sendlist').html('');
  //                 // if (dtd.sendBG.Outsig !== null) {
  //                 let sendsigout = '';
  //                 // $.each(dtd.sendBG.Outsig, function(sendsigindex, sendsigdata) {
  //                 $.each(jsonInfo.Outsig, function(sendsigindex, sendsigdata) {
  //                   if (sendsigdata.Guid === '') {
  //                     return true;
  //                   }
  //                   let outddh = '';
  //                   if (centerData.VirLink !== null) {
  //                     if (_.findWhere(centerData.VirLink, {
  //                         ProjectOutsignalGuid: sendsigdata.Guid
  //                       }) !== undefined) {
  //                       outddh = 'list-group-item-warning';
  //                     }
  //                   }
  //                   if (sendsigdata.Connect === '1') {
  //                     outddh = 'list-group-item-warning';
  //                   }
  //                   sendsigout += `<li data-stype="${sendsigdata.ProoutsigType}" class="list-group-item ${outddh}" data-t="OUT" data-id="${sendsigdata.Guid}" data-sigtype="${sendsigdata.ProoutsigBriefname}" data-path="${sendsigdata.ProoutsigPath}" data-groupname="${sendsigdata.ProoutsigGroupname}(${sendsigdata.ProoutsigType})">
  //                                           <span class="list-group-item-heading">${sendsigdata.ProoutsigCustomname}</span><span class="glyphicon glyphicon-arrow-right hide">
  //                                         </li>`.trim();
  //                 });
  //                 if (centerIed === sendDevName) {
  //                   $('#sendlist').append(sendsigout);
  //                 } else {
  //                   $('#recvlist').append(sendsigout);
  //                   window.sendData = sendsigout;
  //                 }
  //                 // }
  //                 // $('#sendlist').find('.list-group-item').off('mousedown').on('mousedown', function(e) {
  //                 // $('.tm').on('mousedown', function(e) {
  //                 //   if (e.which === 3) {
  //                 //     let tthis = $(this);
  //                 //     console.log('333333333333',tthis);
  //                 //     bootbox.prompt({
  //                 //       title: '请输入自定义名称',
  //                 //       value: tthis.text(),
  //                 //       callback: function(result) {
  //                 //         if (result === null) {
  //                 //           //GFC.showError('dd');
  //                 //           return;
  //                 //         } else {
  //                 //           if ($.trim(result) === '') {
  //                 //             GFC.showError('不可以输入空的名称！');
  //                 //             return;
  //                 //           }
  //                 //           let objsig = {
  //                 //             SigType: tthis.attr('data-t'),
  //                 //             SigId: tthis.attr('data-id'),
  //                 //             SigCustomName: result
  //                 //           };
  //                 //           let dsdarr = [];
  //                 //           dsdarr[0] = objsig;
  //                 //           setVirSigInfo(dsdarr, function(odse) {
  //                 //             if (odse.status) {
  //                 //               tthis.find('.list-group-item-heading').text(result);
  //                 //               isEdit = 1;
  //                 //             } else {
  //                 //               GFC.showError(odse.err_msg);
  //                 //             }
  //                 //           });
  //                 //         }
  //                 //       }
  //                 //     });
  //                 //   }
  //                 // });
  //               };
  //               var loadRecvList = function() {
  //                 $('#recvlist').html('');
  //                 if (centerIed !== sendDevName) {
  //                   $('#recvlist').append(sendData);
  //                 }
  //                 if (dtd.recvBG.Insig !== null) {
  //                   let recvsigin = '';
  //                   $.each(jsonInfo.Insig, function(recsigindex, recsigdata) {
  //                     if (recsigdata.Guid === '') {
  //                       return true;
  //                     }
  //                     let dishh = '';
  //                     if (centerData.VirLink !== null) {
  //                       if (_.findWhere(centerData.VirLink, {
  //                           ProjectInsignalGuid: recsigdata.Guid
  //                         }) !== undefined) {
  //                         dishh = 'list-group-item-warning';
  //                       }
  //                     }
  //                     if (recsigdata.Connect === '1') {
  //                       dishh = 'list-group-item-warning';
  //                     }
  //                     recvsigin += `<li data-stype="${recsigdata.ProinsigType}" class="list-group-item ${dishh}" data-t="IN" data-id="${recsigdata.Guid}" data-sigtype="${recsigdata.ProinsigBriefname}" data-path="${recsigdata.ProinsigPath}" data-groupname="${recsigdata.ProinsigGroupname}(${recsigdata.ProinsigType})">
  //                                           <span class="glyphicon"><span class="list-group-item-heading">${recsigdata.ProinsigCustomname}</span>
  //                                         </li>`.trim();
  //                   });
  //                   if (centerIed === sendDevName) {
  //                     $('#recvlist').append(recvsigin);
  //                   } else {
  //                     $('#sendlist').append(recvsigin);
  //                   }
  //                 }

  //                 // $('#recvlist').find('.list-group-item').off('mousedown').on('mousedown', function(e) {
  //                 //   if (e.which === 3) {
  //                 //     let tthis = $(this);
  //                 //     bootbox.prompt({
  //                 //       title: '请输入自定义名称',
  //                 //       value: tthis.find('.list-group-item-heading').text(),
  //                 //       callback: function(result) {
  //                 //         if (result === null) {
  //                 //           return;
  //                 //         } else {
  //                 //           if ($.trim(result) === '') {
  //                 //             GFC.showError('不可以输入空的名称！');
  //                 //             return;
  //                 //           }
  //                 //           let objsig = {
  //                 //             SigType: tthis.attr('data-t'),
  //                 //             SigId: tthis.attr('data-id'),
  //                 //             SigCustomName: result
  //                 //           };
  //                 //           let dsdarr = [];
  //                 //           dsdarr[0] = objsig;
  //                 //           setVirSigInfo(dsdarr, function(odse) {
  //                 //             console.log(objsig, odse, 'odseaaa');
  //                 //             if (odse.status) {
  //                 //               tthis.find('.list-group-item-heading').text(result);
  //                 //               isEdit = 1;
  //                 //             } else {
  //                 //               GFC.showError(odse.err_msg);
  //                 //             }
  //                 //           });
  //                 //         }
  //                 //       }
  //                 //     });
  //                 //     return;
  //                 //   }
  //                 // });
  //                 // $('#sendlist').find('.list-group-item').off('mousedown').on('mousedown', function(e) {
  //                 //   if (e.which === 3) {
  //                 //     let tthis = $(this);
  //                 //     bootbox.prompt({
  //                 //       title: '请输入自定义名称',
  //                 //       value: tthis.find('.list-group-item-heading').text(),
  //                 //       callback: function(result) {
  //                 //         if (result === null) {
  //                 //           //GFC.showError('dd');
  //                 //           return;
  //                 //         } else {
  //                 //           if ($.trim(result) === '') {
  //                 //             GFC.showError('不可以输入空的名称！');
  //                 //             return;
  //                 //           }
  //                 //           let objsig = {
  //                 //             SigType: tthis.attr('data-t'),
  //                 //             SigId: tthis.attr('data-id'),
  //                 //             SigCustomName: result
  //                 //           };
  //                 //           let dsdarr = [];
  //                 //           dsdarr[0] = objsig;
  //                 //           setVirSigInfo(dsdarr, function(odse) {
  //                 //             if (odse.status) {
  //                 //               tthis.find('.list-group-item-heading').text(result);
  //                 //               isEdit = 1;
  //                 //             } else {
  //                 //               GFC.showError(odse.err_msg);
  //                 //             }
  //                 //           });
  //                 //         }
  //                 //       }
  //                 //     });
  //                 //   }
  //                 // });
  //               };
  //               loadsendList();
  //               loadRecvList();
  //               $('.list-group-item').off('mousewheel').on('mousewheel', function(e) {
  //                 $('.panelS').find('.popover-title').hide();
  //                 $('.panelS').find('.popover-content').html($(this).attr('data-groupname') + '<br>' + $(this).attr('data-sigtype') + '<br>' + $(this).attr('data-path'));
  //                 $('.panelS').show();
  //                 $('.panelS').css({
  //                   top: $(this).offset().top - $('.panelS').height() / 2 + 14 + 'px',
  //                   left: $(this).offset().left + $(this).find('span').width() + 18 + 'px',
  //                   width: 'auto',
  //                   height: 'auto'
  //                 });
  //                 e.stopPropagation();
  //                 $('.panelS').off('mouseover').on('mouseover', function(d) {
  //                   $(this).show();
  //                   d.stopPropagation();
  //                 });
  //                 $(document).off('mouseover').on('mouseover', function() {
  //                   $('.panelS').hide();
  //                 });
  //               });
  //               $('.list-group-item').off('mouseover').on('mouseover', function(e) {
  //                 $('.panelS').find('.popover-title').hide();
  //                 $('.panelS').find('.popover-content').html($(this).attr('data-groupname') + '<br>' + $(this).attr('data-sigtype') + '<br>' + $(this).attr('data-path'));
  //                 $('.panelS').show();
  //                 $('.panelS').css({
  //                   top: $(this).offset().top - $('.panelS').height() / 2 + 14 + 'px',
  //                   left: $(this).offset().left + $(this).find('span').width() + 18 + 'px',
  //                   width: 'auto',
  //                   height: 'auto'
  //                 });
  //                 e.stopPropagation();
  //                 $('.panelS').off('mouseover').on('mouseover', function(d) {
  //                   $(this).show();
  //                   d.stopPropagation();
  //                 });
  //                 $(document).off('mouseover').on('mouseover', function() {
  //                   $('.panelS').hide();
  //                 });
  //               });
  //               $('.list-group-item').off('dblclick').on('dblclick', function() {
  //                 $(this).parents('ul').find('.list-group-item').removeClass('active');
  //                 if ($(this).hasClass('bordergls')) {
  //                   $(this).removeClass('bordergls');
  //                   $('.list-group-item').removeClass('bordergls');
  //                   return;
  //                 }
  //                 $('.list-group-item').removeClass('bordergls');
  //                 $(this).addClass('bordergls');
  //                 var yid = $(this).attr('data-id');
  //                 if (centerData.VirLink !== null) {
  //                   if (_.findWhere(centerData.VirLink, {
  //                       ProjectInsignalGuid: yid
  //                     }) !== undefined) {
  //                     let ccsb = _.findWhere(centerData.VirLink, {
  //                       ProjectInsignalGuid: yid
  //                     }).ProjectOutsignalGuid;
  //                     $('[data-id=' + ccsb + ']').addClass('bordergls');
  //                   }
  //                   if (_.findWhere(centerData.VirLink, {
  //                       ProjectOutsignalGuid: yid
  //                     }) !== undefined) {
  //                     let ccsb = _.findWhere(centerData.VirLink, {
  //                       ProjectOutsignalGuid: yid
  //                     }).ProjectInsignalGuid;
  //                     $('[data-id=' + ccsb + ']').addClass('bordergls');
  //                   }
  //                 }
  //                 if (!$(this).hasClass('disabled') && $(this).attr('data-t') !== 'IN') {
  //                   $(this).addClass('active');
  //                 }
  //                 let type = $(this).attr('data-t');
  //                 // if($())
  //                 $('[data-t="${type}"]').removeClass('active');
  //                 if ($(this).hasClass('list-group-item-warning')) {
  //                   return '';
  //                 } else {
  //                   $(this).addClass('active');
  //                 }
  //                 if ($('.list-group-item.active').length === 2) {
  //                   $('#linkV').trigger('click');
  //                 }

  //               });
  //               $('#sendlist .list-group-item').off('click').on('click', function() {
  //                 if ($(this).hasClass('list-group-item-warning')) {
  //                   return;
  //                 }
  //                 if (IsCtrl) {
  //                   ispl = true;
  //                   // $('.list-group-item.active').addClass('active');
  //                   // $('.list-group-item').removeClass('active');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                   } else {
  //                     $(this).addClass('active');
  //                   }

  //                 } else {
  //                   ispl = false;
  //                   //$('.list-group-item').removeClass('list-group-item-info');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                     $('#sendlist').find('.list-group-item').removeClass('active');
  //                     return;
  //                   }
  //                   $('#sendlist').find('.list-group-item').removeClass('active');
  //                   $(this).addClass('active');
  //                 }
  //               });
  //               $('#recvlist .list-group-item').off('click').on('click', function() {
  //                 if ($(this).hasClass('list-group-item-warning')) {
  //                   return;
  //                 }
  //                 if (IsCtrl) {
  //                   ispl = true;
  //                   // $('.list-group-item.active').addClass('active');
  //                   // $('.list-group-item').removeClass('active');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                   } else {
  //                     $(this).addClass('active');
  //                   }

  //                 } else {
  //                   ispl = false;
  //                   //$('.list-group-item').removeClass('list-group-item-info');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                     $('#recvlist').find('.list-group-item').removeClass('active');
  //                     return;
  //                   }
  //                   $('#recvlist').find('.list-group-item').removeClass('active');
  //                   $(this).addClass('active');
  //                 }
  //               });
  //               // 链接虚回路
  //               $('#linkV').off('click').on('click', function() {
  //                 console.log('1');
  //                 var sendPortArray = [];
  //                 var recvPortArray = [];
  //                 var startAr = $('#sendlist').find('.active');
  //                 if (startAr.length !== 0) {
  //                   $.each(startAr, function(stinx) {
  //                     if (startAr.eq(stinx).attr('data-t') === 'IN') {
  //                       recvPortArray.push(startAr.eq(stinx).attr('data-id'));
  //                     } else {
  //                       sendPortArray.push(startAr.eq(stinx).attr('data-id'));
  //                     }

  //                   });
  //                 }
  //                 console.log('2');
  //                 var endAr = $('#recvlist').find('.active');
  //                 if (endAr.length !== 0) {
  //                   $.each(endAr, function(endinx) {
  //                     if (endAr.eq(endinx).attr('data-t') === 'IN') {
  //                       recvPortArray.push(endAr.eq(endinx).attr('data-id'));
  //                     } else {
  //                       sendPortArray.push(endAr.eq(endinx).attr('data-id'));
  //                     }
  //                   });
  //                 }
  //                 var startAt = $('#sendlist').find('.active').attr('data-id');
  //                 var endAt = $('#recvlist').find('.active').attr('data-id');
  //                 //
  //                 if (ispl) {
  //                   if ($('#sendlist').find('.active').attr('data-stype') !== $('#recvlist').find('.active').attr('data-stype')) {
  //                     GFC.showError('请确保两侧虚端子类型相同');
  //                   } else {
  //                     // if (sendPortArray.length !== recvPortArray.length) {
  //                     //   GFC.showError('请确保两侧批量选择的数量一致');
  //                     //   return;
  //                     // }
  //                     // if ($('#sendlist').find('.active[data-stype="ReportControl"]').length !== $('#recvlist').find('.active[data-stype="ReportControl"]').length) {
  //                     //   GFC.showError('请确保两侧虚端子类型相同');
  //                     //   return;
  //                     // }
  //                     // if ($('#sendlist').find('.active[data-stype="GSEControl"]').length !== $('#recvlist').find('.active[data-stype="GSEControl"]').length) {
  //                     //   GFC.showError('请确保两侧虚端子类型相同');
  //                     //   return;
  //                     // }
  //                     // if ($('#sendlist').find('.active[data-stype="SampledValueControl"]').length !== $('#recvlist').find('.active[data-stype="SampledValueControl"]').length) {
  //                     //   GFC.showError('请确保两侧虚端子类型相同');
  //                     //   return;
  //                     // }
  //                     if (sendPortArray.length > recvPortArray.length) {
  //                       console.log('1111');
  //                       bootbox.dialog({
  //                         message: '两侧选择的数量不一致，点击确定后将以最大限度进行配对',
  //                         title: '匹配',
  //                         buttons: {
  //                           yes: {
  //                             label: '确定',
  //                             className: 'btn-primary',
  //                             callback: function() {
  //                               sendPortArray = sendPortArray.slice(0, recvPortArray.length);
  //                               this.modal('hide');
  //                               var fiberlist = [];
  //                               $.each(sendPortArray, function(sendindex, senditem) {
  //                                 fiberlist.push({
  //                                   SendPort: dtd.sendport,
  //                                   RecvPort: dtd.recvport,
  //                                   OutSigId: senditem,
  //                                   LinkType: dtd.ProjectLinktype
  //                                 });
  //                               });
  //                               $.each(recvPortArray, function(recvindex, recvitem) {
  //                                 fiberlist[recvindex].InSigId = recvitem;
  //                               });
  //                               addVirLink(fiberlist, function(plstj) {
  //                                 console.log(fiberlist, plstj, '虚回路');
  //                                 if (plstj.status) {
  //                                   isEdit = 1;
  //                                   $('.list-group-item').removeClass('active');
  //                                   $('.list-group-item').removeClass('active');
  //                                   $.each(fiberlist, function(itindex, itdata) {
  //                                     $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                                     $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                                     let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                       Guid: itdata.OutSigId
  //                                     });
  //                                     let inddd = _.findWhere(jsonInfo.Insig, {
  //                                       Guid: itdata.InSigId
  //                                     });
  //                                     if (inddd === undefined) {
  //                                       ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                         Guid: itdata.OutSigId
  //                                       });
  //                                       inddd = _.findWhere(jsonInfo.Insig, {
  //                                         Guid: itdata.InSigId
  //                                       });
  //                                     }
  //                                     let vlinkStr = '';
  //                                     if (centerIed === sendDevName) {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" data-type ="OUT" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${ouddd.Guid}" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     } else {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="OUT" title="${inddd.ProinsigCustomname}" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     }
  //                                     $('#Vlinklists').append(vlinkStr);
  //                                   });
  //                                   $('.removeVlink').off('click').on('click', function() {
  //                                     let that = this;
  //                                     $e.emit('DelVtLink', that);
  //                                   });
  //                                   $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                                 } else {
  //                                   GFC.showError(plstj.err_msg);
  //                                 }
  //                               });
  //                             }
  //                           },
  //                           no: {
  //                             label: '取消',
  //                             className: 'btn-default',
  //                             callback: function() {
  //                               this.modal('hide');
  //                             }
  //                           }
  //                         }
  //                       });
  //                     } else if (sendPortArray.length < recvPortArray.length) {
  //                       console.log('222');
  //                       bootbox.dialog({
  //                         message: '两侧选择的数量不一致，点击确定后将以最大限度进行配对',
  //                         title: '匹配',
  //                         buttons: {
  //                           yes: {
  //                             label: '确定',
  //                             className: 'btn-primary',
  //                             callback: function() {
  //                               recvPortArray = recvPortArray.slice(0, sendPortArray.length);
  //                               this.modal('hide');
  //                               var fiberlist = [];
  //                               $.each(sendPortArray, function(sendindex, senditem) {
  //                                 fiberlist.push({
  //                                   SendPort: dtd.sendport,
  //                                   RecvPort: dtd.recvport,
  //                                   OutSigId: senditem,
  //                                   LinkType: dtd.ProjectLinktype
  //                                 });
  //                               });
  //                               $.each(recvPortArray, function(recvindex, recvitem) {
  //                                 fiberlist[recvindex].InSigId = recvitem;
  //                               });
  //                               addVirLink(fiberlist, function(plstj) {
  //                                 console.log(fiberlist, plstj, '虚回路');
  //                                 if (plstj.status) {
  //                                   isEdit = 1;
  //                                   $('.list-group-item').removeClass('active');
  //                                   $('.list-group-item').removeClass('active');
  //                                   $.each(fiberlist, function(itindex, itdata) {
  //                                     $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                                     $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                                     let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                       Guid: itdata.OutSigId
  //                                     });
  //                                     let inddd = _.findWhere(jsonInfo.Insig, {
  //                                       Guid: itdata.InSigId
  //                                     });
  //                                     if (inddd === undefined) {
  //                                       ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                         Guid: itdata.OutSigId
  //                                       });
  //                                       inddd = _.findWhere(jsonInfo.Insig, {
  //                                         Guid: itdata.InSigId
  //                                       });
  //                                     }
  //                                     let vlinkStr = '';
  //                                     if (centerIed === sendDevName) {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="OUT" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     } else {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="OUT" title="${inddd.ProinsigCustomname}" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     }
  //                                     $('#Vlinklists').append(vlinkStr);
  //                                   });
  //                                   $('.removeVlink').off('click').on('click', function() {
  //                                     let that = this;
  //                                     $e.emit('DelVtLink', that);
  //                                   });
  //                                   $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                                 } else {
  //                                   GFC.showError(plstj.err_msg);
  //                                 }
  //                               });
  //                             }
  //                           },
  //                           no: {
  //                             label: '取消',
  //                             className: 'btn-default',
  //                             callback: function() {
  //                               this.modal('hide');
  //                             }
  //                           }
  //                         }
  //                       });
  //                     } else if (sendPortArray.length === recvPortArray.length) {
  //                       var fiberlist = [];
  //                       $.each(sendPortArray, function(sendindex, senditem) {
  //                         fiberlist.push({
  //                           SendPort: dtd.sendport,
  //                           RecvPort: dtd.recvport,
  //                           OutSigId: senditem,
  //                           LinkType: dtd.ProjectLinktype
  //                         });
  //                       });
  //                       $.each(recvPortArray, function(recvindex, recvitem) {
  //                         fiberlist[recvindex].InSigId = recvitem;
  //                       });
  //                       console.log('3');
  //                       addVirLink(fiberlist, function(plstj) {
  //                         console.log(fiberlist, plstj, '虚回路');
  //                         if (plstj.status) {
  //                           isEdit = 1;
  //                           $('.list-group-item').removeClass('active');
  //                           $('.list-group-item').removeClass('active');
  //                           $.each(fiberlist, function(itindex, itdata) {
  //                             $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                             $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                             let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                               Guid: itdata.OutSigId
  //                             });
  //                             let inddd = _.findWhere(jsonInfo.Insig, {
  //                               Guid: itdata.InSigId
  //                             });
  //                             if (inddd === undefined) {
  //                               ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                 Guid: itdata.OutSigId
  //                               });
  //                               inddd = _.findWhere(jsonInfo.Insig, {
  //                                 Guid: itdata.InSigId
  //                               });
  //                             }
  //                             let vlinkStr = '';
  //                             if (centerIed === sendDevName) {
  //                               vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="OUT" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                             } else {
  //                               vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="OUT" title="${inddd.ProinsigCustomname}" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                             }
  //                             $('#Vlinklists').append(vlinkStr);
  //                           });
  //                           $('.removeVlink').off('click').on('click', function() {
  //                             let that = this;
  //                             $e.emit('DelVtLink', that);
  //                           });
  //                           $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                         } else {
  //                           GFC.showError(plstj.err_msg);
  //                         }
  //                       });
  //                     }
  //                     //   var fiberlist = [];
  //                     //   $.each(sendPortArray, function(sendindex, senditem) {
  //                     //     fiberlist.push({
  //                     //       SendPort: dtd.sendport,
  //                     //       RecvPort: dtd.recvport,
  //                     //       OutSigId: senditem
  //                     //     });
  //                     //   });
  //                     //   $.each(recvPortArray, function(recvindex, recvitem) {
  //                     //     fiberlist[recvindex].InSigId = recvitem;
  //                     //   });
  //                     //   addVirLink(fiberlist, function(plstj) {
  //                     //     if (plstj.status) {
  //                     //       isEdit = 1;
  //                     //       $('.list-group-item').removeClass('active');
  //                     //       $('.list-group-item').removeClass('active');
  //                     //       $.each(fiberlist, function(itindex, itdata) {
  //                     //         $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                     //         $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                     //         let ouddd = _.findWhere(dtd.sendBG.Outsig, {
  //                     //           Guid: itdata.OutSigId
  //                     //         });
  //                     //         let inddd = _.findWhere(dtd.recvBG.Insig, {
  //                     //           Guid: itdata.InSigId
  //                     //         });
  //                     //         if (inddd === undefined) {
  //                     //           ouddd = _.findWhere(dtd.recvBG.Outsig, {
  //                     //             Guid: itdata.OutSigId
  //                     //           });
  //                     //           inddd = _.findWhere(dtd.sendBG.Insig, {
  //                     //             Guid: itdata.InSigId
  //                     //           });
  //                     //         }
  //                     //         let vlinkStr = `<div class="vlink-trs">
  //                     //                                   <div class="vlink-xh tk" style="flex: 0.75;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                     //                                   <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.25;"><span title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                     //                                   <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                     //                                   <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.25;"><span title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                     //                                   </div>`.trim();
  //                     //         $('#Vlinklists').append(vlinkStr);
  //                     //       });
  //                     //       $('.removeVlink').off('click').on('click', function() {
  //                     //         let that = this;
  //                     //         $e.emit('DelVtLink', that);
  //                     //       });
  //                     //     } else {
  //                     //       GFC.showError(plstj.err_msg);
  //                     //     }
  //                     //   });
  //                   }
  //                 } else {
  //                   var portinfo = {};
  //                   if (startAt === undefined || endAt === undefined) {
  //                     GFC.showError('请确保两侧各有一个端子被选中');
  //                     return;
  //                   }
  //                   portinfo.SendPort = dtd.sendport;
  //                   portinfo.RecvPort = dtd.recvport;
  //                   if ($('#sendlist').find('.active').attr('data-t') === $('#recvlist').find('.active').attr('data-t')) {
  //                     GFC.showError('请确保两侧虚端子不能同时为' + $('#sendlist').find('.active').attr('data-t'));
  //                     return;
  //                   }
  //                   if ($('#sendlist').find('.active').attr('data-stype') !== $('#recvlist').find('.active').attr('data-stype')) {
  //                     GFC.showError('请确保两侧虚端子类型相同');
  //                     return;
  //                   }
  //                   if ($('#sendlist').find('.active').attr('data-t') === 'IN') {
  //                     portinfo.InSigId = startAt;
  //                     portinfo.OutSigId = endAt;
  //                     portinfo.Linktype = dtd.ProjectLinktype;
  //                   } else {
  //                     portinfo.InSigId = endAt;
  //                     portinfo.OutSigId = startAt;
  //                     portinfo.LinkType = dtd.ProjectLinktype;
  //                   }
  //                   let llarr = [];
  //                   llarr[0] = portinfo;
  //                   addVirLink(llarr, function(dlstj) {
  //                     console.log(llarr, dlstj, '虚回路');
  //                     if (dlstj.status) {
  //                       isEdit = 1;
  //                       $('.list-group-item').removeClass('active');
  //                       $('.list-group-item').removeClass('active');
  //                       $('[data-id=' + portinfo.InSigId + ']').addClass('list-group-item-warning');
  //                       $('[data-id=' + portinfo.OutSigId + ']').addClass('list-group-item-warning');
  //                       let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                         Guid: portinfo.OutSigId
  //                       });
  //                       let inddd = _.findWhere(jsonInfo.Insig, {
  //                         Guid: portinfo.InSigId
  //                       });
  //                       if (inddd === undefined) {
  //                         ouddd = _.findWhere(jsonInfo.Outsig, {
  //                           Guid: portinfo.OutSigId
  //                         });
  //                         inddd = _.findWhere(jsonInfo.Insig, {
  //                           Guid: portinfo.InSigId
  //                         });
  //                       }
  //                       let vlinkStr = '';
  //                       if (centerIed === sendDevName) {
  //                         vlinkStr = `<div class="vlink-trs">
  //                                                         <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                                         <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" style="cursor: pointer;" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                                         <div class="tk" style="flex: 1.25;"><span id="ouName" data-id="${ouddd.Guid}" data-type ="OUT" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                                         <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                                         <div class="tk hide" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" id="inName" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                                         </div>`.trim();
  //                       } else {
  //                         vlinkStr = `<div class="vlink-trs">
  //                                                         <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                                         <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" style="cursor: pointer;" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                                         <div class="tk" style="flex: 1.25;"><span id="inName" title="${inddd.ProinsigCustomname}" data-id="${inddd.Guid}" data-type ="OUT" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                                         <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                                         <div class="tk hide" style="flex: 1.25;"><span id="ouName" data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                                         </div>`.trim();
  //                       }
  //                       $('#Vlinklists').append(vlinkStr);
  //                       $('.removeVlink').off('click').on('click', function() {
  //                         let that = this;
  //                         $e.emit('DelVtLink', that);
  //                       });
  //                       $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                     } else {
  //                       GFC.showError(dlstj.err_msg);
  //                     }
  //                   });
  //                 }
  //               });
  //             } else {
  //               console.log(obj.err_msg);
  //             }
  //           });
  //         } else {
  //           virlink.GetSvgSigInfoByFlowId(dtd.Guid, function(obj) {
  //             if (obj.status) {
  //               var jsonInfo = $.parseJSON(obj.json_info);
  //               // var outNum = dtd.sendBG.Outsig === null ? 0 : dtd.sendBG.Outsig.length;
  //               // var inNum = dtd.recvBG.Insig === null ? 0 : dtd.recvBG.Insig.length;
  //               var outNum;
  //               var inNum;
  //               if (jsonInfo.Outsig !== null) {
  //                 outNum = jsonInfo.Outsig.length;
  //               } else {
  //                 outNum = 0;
  //               }
  //               if (jsonInfo.Insig !== null) {
  //                 inNum = jsonInfo.Insig.length;
  //               } else {
  //                 inNum = 0;
  //               }
  //               // var outNum = jsonInfo.Outsig.length;
  //               // var inNum = jsonInfo.Insig.length;
  //               if (centerIed === sendDevName) {
  //                 $('#relinkV').hide();
  //                 $('#arrow').attr('src', './images/arrow_right.png');
  //                 $('#outDevName111').text(`${sendDevName}`);
  //                 $('#outDevName222').text(`${recvDevName}`);
  //                 $('#portName1').text('输出端子');
  //                 $('#portName2').text('输入端子');
  //                 $('#outDevName').text(`(端子数量：${outNum})`);
  //                 $('#inDevName').text(`(端子数量：${inNum})`);
  //               } else {
  //                 $('#relinkV').hide();
  //                 $('#outDevName222').text(`${sendDevName}`);
  //                 $('#outDevName111').text(`${recvDevName}`);
  //                 $('#portName2').text('输出端子');
  //                 $('#portName1').text('输入端子');
  //                 $('#inDevName').text(`(端子数量：${outNum})`);
  //                 $('#outDevName').text(`(端子数量：${inNum})`);
  //                 $('#arrow').attr('src', './images/arrow_left.png');
  //               }
  //               var loadsendList = function() {
  //                 $('#sendlist').html('');
  //                 // if (dtd.sendBG.Outsig !== null) {
  //                 let sendsigout = '';
  //                 // $.each(dtd.sendBG.Outsig, function(sendsigindex, sendsigdata) {
  //                 $.each(jsonInfo.Outsig, function(sendsigindex, sendsigdata) {
  //                   if (sendsigdata.Guid === '') {
  //                     return true;
  //                   }
  //                   let outddh = '';
  //                   if (centerData.VirLink !== null) {
  //                     if (_.findWhere(centerData.VirLink, {
  //                         ProjectOutsignalGuid: sendsigdata.Guid
  //                       }) !== undefined) {
  //                       outddh = 'list-group-item-warning';
  //                     }
  //                   }
  //                   if (sendsigdata.Connect === '1') {
  //                     outddh = 'list-group-item-warning';
  //                   }
  //                   sendsigout += `<li data-stype="${sendsigdata.ProoutsigType}" class="list-group-item ${outddh}" data-t="OUT" data-id="${sendsigdata.Guid}" data-sigtype="${sendsigdata.ProoutsigBriefname}" data-path="${sendsigdata.ProoutsigPath}" data-groupname="${sendsigdata.ProoutsigGroupname}(${sendsigdata.ProoutsigType})">
  //                                           <span class="list-group-item-heading">${sendsigdata.ProoutsigCustomname}</span><span class="glyphicon glyphicon-arrow-right hide">
  //                                         </li>`.trim();
  //                 });
  //                 if (centerIed === sendDevName) {
  //                   $('#sendlist').append(sendsigout);
  //                 } else {
  //                   $('#recvlist').append(sendsigout);
  //                   window.sendData = sendsigout;
  //                 }
  //                 // }
  //                 // $('#sendlist').find('.list-group-item').off('mousedown').on('mousedown', function(e) {
  //                 // $('.tm').on('mousedown', function(e) {
  //                 //   if (e.which === 3) {
  //                 //     let tthis = $(this);
  //                 //     console.log('333333333333',tthis);
  //                 //     bootbox.prompt({
  //                 //       title: '请输入自定义名称',
  //                 //       value: tthis.text(),
  //                 //       callback: function(result) {
  //                 //         if (result === null) {
  //                 //           //GFC.showError('dd');
  //                 //           return;
  //                 //         } else {
  //                 //           if ($.trim(result) === '') {
  //                 //             GFC.showError('不可以输入空的名称！');
  //                 //             return;
  //                 //           }
  //                 //           let objsig = {
  //                 //             SigType: tthis.attr('data-t'),
  //                 //             SigId: tthis.attr('data-id'),
  //                 //             SigCustomName: result
  //                 //           };
  //                 //           let dsdarr = [];
  //                 //           dsdarr[0] = objsig;
  //                 //           setVirSigInfo(dsdarr, function(odse) {
  //                 //             if (odse.status) {
  //                 //               tthis.find('.list-group-item-heading').text(result);
  //                 //               isEdit = 1;
  //                 //             } else {
  //                 //               GFC.showError(odse.err_msg);
  //                 //             }
  //                 //           });
  //                 //         }
  //                 //       }
  //                 //     });
  //                 //   }
  //                 // });
  //               };
  //               var loadRecvList = function() {
  //                 $('#recvlist').html('');
  //                 if (centerIed !== sendDevName) {
  //                   $('#recvlist').append(sendData);
  //                 }
  //                 if (dtd.recvBG.Insig !== null) {
  //                   let recvsigin = '';
  //                   $.each(jsonInfo.Insig, function(recsigindex, recsigdata) {
  //                     if (recsigdata.Guid === '') {
  //                       return true;
  //                     }
  //                     let dishh = '';
  //                     if (centerData.VirLink !== null) {
  //                       if (_.findWhere(centerData.VirLink, {
  //                           ProjectInsignalGuid: recsigdata.Guid
  //                         }) !== undefined) {
  //                         dishh = 'list-group-item-warning';
  //                       }
  //                     }
  //                     if (recsigdata.Connect === '1') {
  //                       dishh = 'list-group-item-warning';
  //                     }
  //                     recvsigin += `<li data-stype="${recsigdata.ProinsigType}" class="list-group-item ${dishh}" data-t="IN" data-id="${recsigdata.Guid}" data-sigtype="${recsigdata.ProinsigBriefname}" data-path="${recsigdata.ProinsigPath}" data-groupname="${recsigdata.ProinsigGroupname}(${recsigdata.ProinsigType})">
  //                                           <span class="glyphicon"><span class="list-group-item-heading">${recsigdata.ProinsigCustomname}</span>
  //                                         </li>`.trim();
  //                   });
  //                   if (centerIed === sendDevName) {
  //                     $('#recvlist').append(recvsigin);
  //                   } else {
  //                     $('#sendlist').append(recvsigin);
  //                   }
  //                 }

  //                 // $('#recvlist').find('.list-group-item').off('mousedown').on('mousedown', function(e) {
  //                 //   if (e.which === 3) {
  //                 //     let tthis = $(this);
  //                 //     bootbox.prompt({
  //                 //       title: '请输入自定义名称',
  //                 //       value: tthis.find('.list-group-item-heading').text(),
  //                 //       callback: function(result) {
  //                 //         if (result === null) {
  //                 //           return;
  //                 //         } else {
  //                 //           if ($.trim(result) === '') {
  //                 //             GFC.showError('不可以输入空的名称！');
  //                 //             return;
  //                 //           }
  //                 //           let objsig = {
  //                 //             SigType: tthis.attr('data-t'),
  //                 //             SigId: tthis.attr('data-id'),
  //                 //             SigCustomName: result
  //                 //           };
  //                 //           let dsdarr = [];
  //                 //           dsdarr[0] = objsig;
  //                 //           setVirSigInfo(dsdarr, function(odse) {
  //                 //             console.log(objsig, odse, 'odseaaa');
  //                 //             if (odse.status) {
  //                 //               tthis.find('.list-group-item-heading').text(result);
  //                 //               isEdit = 1;
  //                 //             } else {
  //                 //               GFC.showError(odse.err_msg);
  //                 //             }
  //                 //           });
  //                 //         }
  //                 //       }
  //                 //     });
  //                 //     return;
  //                 //   }
  //                 // });
  //                 // $('#sendlist').find('.list-group-item').off('mousedown').on('mousedown', function(e) {
  //                 //   if (e.which === 3) {
  //                 //     let tthis = $(this);
  //                 //     bootbox.prompt({
  //                 //       title: '请输入自定义名称',
  //                 //       value: tthis.find('.list-group-item-heading').text(),
  //                 //       callback: function(result) {
  //                 //         if (result === null) {
  //                 //           //GFC.showError('dd');
  //                 //           return;
  //                 //         } else {
  //                 //           if ($.trim(result) === '') {
  //                 //             GFC.showError('不可以输入空的名称！');
  //                 //             return;
  //                 //           }
  //                 //           let objsig = {
  //                 //             SigType: tthis.attr('data-t'),
  //                 //             SigId: tthis.attr('data-id'),
  //                 //             SigCustomName: result
  //                 //           };
  //                 //           let dsdarr = [];
  //                 //           dsdarr[0] = objsig;
  //                 //           setVirSigInfo(dsdarr, function(odse) {
  //                 //             if (odse.status) {
  //                 //               tthis.find('.list-group-item-heading').text(result);
  //                 //               isEdit = 1;
  //                 //             } else {
  //                 //               GFC.showError(odse.err_msg);
  //                 //             }
  //                 //           });
  //                 //         }
  //                 //       }
  //                 //     });
  //                 //   }
  //                 // });
  //               };
  //               loadsendList();
  //               loadRecvList();
  //               $('.list-group-item').off('mousewheel').on('mousewheel', function(e) {
  //                 $('.panelS').find('.popover-title').hide();
  //                 $('.panelS').find('.popover-content').html($(this).attr('data-groupname') + '<br>' + $(this).attr('data-sigtype') + '<br>' + $(this).attr('data-path'));
  //                 $('.panelS').show();
  //                 $('.panelS').css({
  //                   top: $(this).offset().top - $('.panelS').height() / 2 + 14 + 'px',
  //                   left: $(this).offset().left + $(this).find('span').width() + 18 + 'px',
  //                   width: 'auto',
  //                   height: 'auto'
  //                 });
  //                 e.stopPropagation();
  //                 $('.panelS').off('mouseover').on('mouseover', function(d) {
  //                   $(this).show();
  //                   d.stopPropagation();
  //                 });
  //                 $(document).off('mouseover').on('mouseover', function() {
  //                   $('.panelS').hide();
  //                 });
  //               });
  //               $('.list-group-item').off('mouseover').on('mouseover', function(e) {
  //                 $('.panelS').find('.popover-title').hide();
  //                 $('.panelS').find('.popover-content').html($(this).attr('data-groupname') + '<br>' + $(this).attr('data-sigtype') + '<br>' + $(this).attr('data-path'));
  //                 $('.panelS').show();
  //                 $('.panelS').css({
  //                   top: $(this).offset().top - $('.panelS').height() / 2 + 14 + 'px',
  //                   left: $(this).offset().left + $(this).find('span').width() + 18 + 'px',
  //                   width: 'auto',
  //                   height: 'auto'
  //                 });
  //                 e.stopPropagation();
  //                 $('.panelS').off('mouseover').on('mouseover', function(d) {
  //                   $(this).show();
  //                   d.stopPropagation();
  //                 });
  //                 $(document).off('mouseover').on('mouseover', function() {
  //                   $('.panelS').hide();
  //                 });
  //               });
  //               $('.list-group-item').off('dblclick').on('dblclick', function() {
  //                 console.log('1111111111111111111111111111111111111', $(this).hasClass('list-group-item-warning'));

  //                 $(this).parents('ul').find('.list-group-item').removeClass('active');
  //                 if ($(this).hasClass('bordergls')) {
  //                   $(this).removeClass('bordergls');
  //                   $('.list-group-item').removeClass('bordergls');
  //                   return;
  //                 }
  //                 $('.list-group-item').removeClass('bordergls');
  //                 $(this).addClass('bordergls');
  //                 var yid = $(this).attr('data-id');
  //                 if (centerData.VirLink !== null) {
  //                   if (_.findWhere(centerData.VirLink, {
  //                       ProjectInsignalGuid: yid
  //                     }) !== undefined) {
  //                     let ccsb = _.findWhere(centerData.VirLink, {
  //                       ProjectInsignalGuid: yid
  //                     }).ProjectOutsignalGuid;
  //                     $('[data-id=' + ccsb + ']').addClass('bordergls');
  //                   }
  //                   if (_.findWhere(centerData.VirLink, {
  //                       ProjectOutsignalGuid: yid
  //                     }) !== undefined) {
  //                     let ccsb = _.findWhere(centerData.VirLink, {
  //                       ProjectOutsignalGuid: yid
  //                     }).ProjectInsignalGuid;
  //                     $('[data-id=' + ccsb + ']').addClass('bordergls');
  //                   }
  //                 }
  //                 if (!$(this).hasClass('disabled') && $(this).attr('data-t') !== 'IN') {
  //                   $(this).addClass('active');
  //                 }
  //                 let type = $(this).attr('data-t');
  //                 $('[data-t="${type}"]').removeClass('active');
  //                 if ($(this).hasClass('list-group-item-warning')) {
  //                   return;
  //                 } else {
  //                   $(this).addClass('active');
  //                   if ($('.list-group-item.active').length === 2) {
  //                     $('#linkV').trigger('click');
  //                   }
  //                 }

  //               });
  //               $('#sendlist .list-group-item').off('click').on('click', function() {
  //                 if ($(this).hasClass('list-group-item-warning')) {
  //                   return;
  //                 }
  //                 if (IsCtrl) {
  //                   ispl = true;
  //                   // $('.list-group-item.active').addClass('active');
  //                   // $('.list-group-item').removeClass('active');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                   } else {
  //                     $(this).addClass('active');
  //                   }

  //                 } else {
  //                   ispl = false;
  //                   //$('.list-group-item').removeClass('list-group-item-info');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                     $('#sendlist').find('.list-group-item').removeClass('active');
  //                     return;
  //                   }
  //                   $('#sendlist').find('.list-group-item').removeClass('active');
  //                   $(this).addClass('active');
  //                 }
  //               });
  //               $('#recvlist .list-group-item').off('click').on('click', function() {
  //                 if ($(this).hasClass('list-group-item-warning')) {
  //                   return;
  //                 }
  //                 if (IsCtrl) {
  //                   ispl = true;
  //                   // $('.list-group-item.active').addClass('active');
  //                   // $('.list-group-item').removeClass('active');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                   } else {
  //                     $(this).addClass('active');
  //                   }

  //                 } else {
  //                   ispl = false;
  //                   //$('.list-group-item').removeClass('list-group-item-info');
  //                   if ($(this).hasClass('active')) {
  //                     $(this).removeClass('active');
  //                     $('#recvlist').find('.list-group-item').removeClass('active');
  //                     return;
  //                   }
  //                   $('#recvlist').find('.list-group-item').removeClass('active');
  //                   $(this).addClass('active');
  //                 }
  //               });
  //               // 链接虚回路
  //               $('#linkV').off('click').on('click', function() {
  //                 console.log('1');
  //                 var sendPortArray = [];
  //                 var recvPortArray = [];
  //                 var startAr = $('#sendlist').find('.active');
  //                 if (startAr.length !== 0) {
  //                   $.each(startAr, function(stinx) {
  //                     if (startAr.eq(stinx).attr('data-t') === 'IN') {
  //                       recvPortArray.push(startAr.eq(stinx).attr('data-id'));
  //                     } else {
  //                       sendPortArray.push(startAr.eq(stinx).attr('data-id'));
  //                     }

  //                   });
  //                 }
  //                 console.log('2');
  //                 var endAr = $('#recvlist').find('.active');
  //                 if (endAr.length !== 0) {
  //                   $.each(endAr, function(endinx) {
  //                     if (endAr.eq(endinx).attr('data-t') === 'IN') {
  //                       recvPortArray.push(endAr.eq(endinx).attr('data-id'));
  //                     } else {
  //                       sendPortArray.push(endAr.eq(endinx).attr('data-id'));
  //                     }
  //                   });
  //                 }
  //                 var startAt = $('#sendlist').find('.active').attr('data-id');
  //                 var endAt = $('#recvlist').find('.active').attr('data-id');
  //                 //
  //                 if (ispl) {
  //                   if ($('#sendlist').find('.active').attr('data-stype') !== $('#recvlist').find('.active').attr('data-stype')) {
  //                     GFC.showError('请确保两侧虚端子类型相同');
  //                   } else {
  //                     // if (sendPortArray.length !== recvPortArray.length) {
  //                     //   GFC.showError('请确保两侧批量选择的数量一致');
  //                     //   return;
  //                     // }
  //                     // if ($('#sendlist').find('.active[data-stype="ReportControl"]').length !== $('#recvlist').find('.active[data-stype="ReportControl"]').length) {
  //                     //   GFC.showError('请确保两侧虚端子类型相同');
  //                     //   return;
  //                     // }
  //                     // if ($('#sendlist').find('.active[data-stype="GSEControl"]').length !== $('#recvlist').find('.active[data-stype="GSEControl"]').length) {
  //                     //   GFC.showError('请确保两侧虚端子类型相同');
  //                     //   return;
  //                     // }
  //                     // if ($('#sendlist').find('.active[data-stype="SampledValueControl"]').length !== $('#recvlist').find('.active[data-stype="SampledValueControl"]').length) {
  //                     //   GFC.showError('请确保两侧虚端子类型相同');
  //                     //   return;
  //                     // }
  //                     if (sendPortArray.length > recvPortArray.length) {
  //                       console.log('1111');
  //                       bootbox.dialog({
  //                         message: '两侧选择的数量不一致，点击确定后将以最大限度进行配对',
  //                         title: '匹配',
  //                         buttons: {
  //                           yes: {
  //                             label: '确定',
  //                             className: 'btn-primary',
  //                             callback: function() {
  //                               sendPortArray = sendPortArray.slice(0, recvPortArray.length);
  //                               this.modal('hide');
  //                               var fiberlist = [];
  //                               $.each(sendPortArray, function(sendindex, senditem) {
  //                                 fiberlist.push({
  //                                   SendPort: dtd.sendport,
  //                                   RecvPort: dtd.recvport,
  //                                   OutSigId: senditem,
  //                                   LinkType: dtd.ProjectLinktype
  //                                 });
  //                               });
  //                               $.each(recvPortArray, function(recvindex, recvitem) {
  //                                 fiberlist[recvindex].InSigId = recvitem;
  //                               });
  //                               addVirLink(fiberlist, function(plstj) {
  //                                 console.log(fiberlist, plstj, '虚回路');
  //                                 if (plstj.status) {
  //                                   isEdit = 1;
  //                                   $('.list-group-item').removeClass('active');
  //                                   $('.list-group-item').removeClass('active');
  //                                   $.each(fiberlist, function(itindex, itdata) {
  //                                     $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                                     $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                                     let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                       Guid: itdata.OutSigId
  //                                     });
  //                                     let inddd = _.findWhere(jsonInfo.Insig, {
  //                                       Guid: itdata.InSigId
  //                                     });
  //                                     if (inddd === undefined) {
  //                                       ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                         Guid: itdata.OutSigId
  //                                       });
  //                                       inddd = _.findWhere(jsonInfo.Insig, {
  //                                         Guid: itdata.InSigId
  //                                       });
  //                                     }
  //                                     let vlinkStr = '';
  //                                     if (centerIed === sendDevName) {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" data-type ="OUT" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${ouddd.Guid}" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     } else {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="OUT" title="${inddd.ProinsigCustomname}" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     }
  //                                     $('#Vlinklists').append(vlinkStr);
  //                                   });
  //                                   $('.removeVlink').off('click').on('click', function() {
  //                                     let that = this;
  //                                     $e.emit('DelVtLink', that);
  //                                   });
  //                                   $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                                   $('.tm').css('cursor', 'pointer');
  //                                   $('.tm').on('mousedown', function(e) {
  //                                     if (e.which === 3) {
  //                                       let tthis = $(this);
  //                                       // console.log('333333333333', tthis);
  //                                       bootbox.prompt({
  //                                         title: '请输入自定义名称',
  //                                         value: tthis.text(),
  //                                         callback: function(result) {
  //                                           if (result === null) {
  //                                             //GFC.showError('dd');
  //                                             return;
  //                                           } else {
  //                                             if ($.trim(result) === '') {
  //                                               GFC.showError('不可以输入空的名称！');
  //                                               return;
  //                                             }
  //                                             let objsig = {
  //                                               SigType: tthis.attr('data-type'),
  //                                               SigId: tthis.attr('data-id'),
  //                                               SigCustomName: result
  //                                             };
  //                                             let dsdarr = [];
  //                                             dsdarr[0] = objsig;
  //                                             console.log('666666666', dsdarr);
  //                                             setVirSigInfo(dsdarr, function(odse) {
  //                                               console.log(odse);
  //                                               if (odse.status) {
  //                                                 tthis.text(result);
  //                                                 tthis.find('.list-group-item-heading').text(result);
  //                                                 isEdit = 1;
  //                                               } else {
  //                                                 GFC.showError(odse.err_msg);
  //                                               }
  //                                             });
  //                                           }
  //                                         }
  //                                       });
  //                                     }
  //                                   });
  //                                 } else {
  //                                   GFC.showError(plstj.err_msg);
  //                                 }
  //                               });
  //                             }
  //                           },
  //                           no: {
  //                             label: '取消',
  //                             className: 'btn-default',
  //                             callback: function() {
  //                               this.modal('hide');
  //                             }
  //                           }
  //                         }
  //                       });
  //                     } else if (sendPortArray.length < recvPortArray.length) {
  //                       console.log('222');
  //                       bootbox.dialog({
  //                         message: '两侧选择的数量不一致，点击确定后将以最大限度进行配对',
  //                         title: '匹配',
  //                         buttons: {
  //                           yes: {
  //                             label: '确定',
  //                             className: 'btn-primary',
  //                             callback: function() {
  //                               recvPortArray = recvPortArray.slice(0, sendPortArray.length);
  //                               this.modal('hide');
  //                               var fiberlist = [];
  //                               $.each(sendPortArray, function(sendindex, senditem) {
  //                                 fiberlist.push({
  //                                   SendPort: dtd.sendport,
  //                                   RecvPort: dtd.recvport,
  //                                   OutSigId: senditem,
  //                                   LinkType: dtd.ProjectLinktype
  //                                 });
  //                               });
  //                               $.each(recvPortArray, function(recvindex, recvitem) {
  //                                 fiberlist[recvindex].InSigId = recvitem;
  //                               });
  //                               addVirLink(fiberlist, function(plstj) {
  //                                 console.log(fiberlist, plstj, '虚回路');
  //                                 if (plstj.status) {
  //                                   isEdit = 1;
  //                                   $('.list-group-item').removeClass('active');
  //                                   $('.list-group-item').removeClass('active');
  //                                   $.each(fiberlist, function(itindex, itdata) {
  //                                     $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                                     $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                                     let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                       Guid: itdata.OutSigId
  //                                     });
  //                                     let inddd = _.findWhere(jsonInfo.Insig, {
  //                                       Guid: itdata.InSigId
  //                                     });
  //                                     if (inddd === undefined) {
  //                                       ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                         Guid: itdata.OutSigId
  //                                       });
  //                                       inddd = _.findWhere(jsonInfo.Insig, {
  //                                         Guid: itdata.InSigId
  //                                       });
  //                                     }
  //                                     let vlinkStr = '';
  //                                     if (centerIed === sendDevName) {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="OUT" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     } else {
  //                                       vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="OUT" title="${inddd.ProinsigCustomname}" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                                     }
  //                                     $('#Vlinklists').append(vlinkStr);
  //                                   });
  //                                   $('.removeVlink').off('click').on('click', function() {
  //                                     let that = this;
  //                                     $e.emit('DelVtLink', that);
  //                                   });
  //                                   $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                                   $('.tm').css('cursor', 'pointer');
  //                                   $('.tm').on('mousedown', function(e) {
  //                                     if (e.which === 3) {
  //                                       let tthis = $(this);
  //                                       // console.log('333333333333', tthis);
  //                                       bootbox.prompt({
  //                                         title: '请输入自定义名称',
  //                                         value: tthis.text(),
  //                                         callback: function(result) {
  //                                           if (result === null) {
  //                                             //GFC.showError('dd');
  //                                             return;
  //                                           } else {
  //                                             if ($.trim(result) === '') {
  //                                               GFC.showError('不可以输入空的名称！');
  //                                               return;
  //                                             }
  //                                             let objsig = {
  //                                               SigType: tthis.attr('data-type'),
  //                                               SigId: tthis.attr('data-id'),
  //                                               SigCustomName: result
  //                                             };
  //                                             let dsdarr = [];
  //                                             dsdarr[0] = objsig;
  //                                             console.log('666666666', dsdarr);
  //                                             setVirSigInfo(dsdarr, function(odse) {
  //                                               console.log(odse);
  //                                               if (odse.status) {
  //                                                 tthis.text(result);
  //                                                 tthis.find('.list-group-item-heading').text(result);
  //                                                 isEdit = 1;
  //                                               } else {
  //                                                 GFC.showError(odse.err_msg);
  //                                               }
  //                                             });
  //                                           }
  //                                         }
  //                                       });
  //                                     }
  //                                   });
  //                                 } else {
  //                                   GFC.showError(plstj.err_msg);
  //                                 }
  //                               });
  //                             }
  //                           },
  //                           no: {
  //                             label: '取消',
  //                             className: 'btn-default',
  //                             callback: function() {
  //                               this.modal('hide');
  //                             }
  //                           }
  //                         }
  //                       });
  //                     } else if (sendPortArray.length === recvPortArray.length) {
  //                       var fiberlist = [];
  //                       $.each(sendPortArray, function(sendindex, senditem) {
  //                         fiberlist.push({
  //                           SendPort: dtd.sendport,
  //                           RecvPort: dtd.recvport,
  //                           OutSigId: senditem,
  //                           LinkType: dtd.ProjectLinktype
  //                         });
  //                       });
  //                       $.each(recvPortArray, function(recvindex, recvitem) {
  //                         fiberlist[recvindex].InSigId = recvitem;
  //                       });
  //                       console.log('3');
  //                       addVirLink(fiberlist, function(plstj) {
  //                         console.log(fiberlist, plstj, '虚回路');
  //                         if (plstj.status) {
  //                           isEdit = 1;
  //                           $('.list-group-item').removeClass('active');
  //                           $('.list-group-item').removeClass('active');
  //                           $.each(fiberlist, function(itindex, itdata) {
  //                             $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                             $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                             let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                               Guid: itdata.OutSigId
  //                             });
  //                             let inddd = _.findWhere(jsonInfo.Insig, {
  //                               Guid: itdata.InSigId
  //                             });
  //                             if (inddd === undefined) {
  //                               ouddd = _.findWhere(jsonInfo.Outsig, {
  //                                 Guid: itdata.OutSigId
  //                               });
  //                               inddd = _.findWhere(jsonInfo.Insig, {
  //                                 Guid: itdata.InSigId
  //                               });
  //                             }
  //                             let vlinkStr = '';
  //                             if (centerIed === sendDevName) {
  //                               vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="OUT" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                             } else {
  //                               vlinkStr = `<div class="vlink-trs">
  //                                           <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                           <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                           <div class="tk" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="OUT" title="${inddd.ProinsigCustomname}" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                           <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                           <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                           <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm"  title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                           <div class="tk hide" style="flex: 1.25;"><span data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                           </div>`.trim();
  //                             }
  //                             $('#Vlinklists').append(vlinkStr);
  //                           });
  //                           $('.removeVlink').off('click').on('click', function() {
  //                             let that = this;
  //                             $e.emit('DelVtLink', that);
  //                           });
  //                           $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                           $('.tm').css('cursor', 'pointer');
  //                           $('.tm').on('mousedown', function(e) {
  //                             if (e.which === 3) {
  //                               let tthis = $(this);
  //                               // console.log('333333333333', tthis);
  //                               bootbox.prompt({
  //                                 title: '请输入自定义名称',
  //                                 value: tthis.text(),
  //                                 callback: function(result) {
  //                                   if (result === null) {
  //                                     //GFC.showError('dd');
  //                                     return;
  //                                   } else {
  //                                     if ($.trim(result) === '') {
  //                                       GFC.showError('不可以输入空的名称！');
  //                                       return;
  //                                     }
  //                                     let objsig = {
  //                                       SigType: tthis.attr('data-type'),
  //                                       SigId: tthis.attr('data-id'),
  //                                       SigCustomName: result
  //                                     };
  //                                     let dsdarr = [];
  //                                     dsdarr[0] = objsig;
  //                                     console.log('666666666', dsdarr);
  //                                     setVirSigInfo(dsdarr, function(odse) {
  //                                       console.log(odse);
  //                                       if (odse.status) {
  //                                         tthis.text(result);
  //                                         tthis.find('.list-group-item-heading').text(result);
  //                                         isEdit = 1;
  //                                       } else {
  //                                         GFC.showError(odse.err_msg);
  //                                       }
  //                                     });
  //                                   }
  //                                 }
  //                               });
  //                             }
  //                           });
  //                         } else {
  //                           GFC.showError(plstj.err_msg);
  //                         }
  //                       });
  //                     }
  //                     //   var fiberlist = [];
  //                     //   $.each(sendPortArray, function(sendindex, senditem) {
  //                     //     fiberlist.push({
  //                     //       SendPort: dtd.sendport,
  //                     //       RecvPort: dtd.recvport,
  //                     //       OutSigId: senditem
  //                     //     });
  //                     //   });
  //                     //   $.each(recvPortArray, function(recvindex, recvitem) {
  //                     //     fiberlist[recvindex].InSigId = recvitem;
  //                     //   });
  //                     //   addVirLink(fiberlist, function(plstj) {
  //                     //     if (plstj.status) {
  //                     //       isEdit = 1;
  //                     //       $('.list-group-item').removeClass('active');
  //                     //       $('.list-group-item').removeClass('active');
  //                     //       $.each(fiberlist, function(itindex, itdata) {
  //                     //         $('[data-id=' + itdata.InSigId + ']').addClass('list-group-item-warning');
  //                     //         $('[data-id=' + itdata.OutSigId + ']').addClass('list-group-item-warning');
  //                     //         let ouddd = _.findWhere(dtd.sendBG.Outsig, {
  //                     //           Guid: itdata.OutSigId
  //                     //         });
  //                     //         let inddd = _.findWhere(dtd.recvBG.Insig, {
  //                     //           Guid: itdata.InSigId
  //                     //         });
  //                     //         if (inddd === undefined) {
  //                     //           ouddd = _.findWhere(dtd.recvBG.Outsig, {
  //                     //             Guid: itdata.OutSigId
  //                     //           });
  //                     //           inddd = _.findWhere(dtd.sendBG.Insig, {
  //                     //             Guid: itdata.InSigId
  //                     //           });
  //                     //         }
  //                     //         let vlinkStr = `<div class="vlink-trs">
  //                     //                                   <div class="vlink-xh tk" style="flex: 0.75;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                     //                                   <div class="tk hide" style="flex: 1.5;"><span  title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" data-type ="OUT" class = "rm" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.25;"><span title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                     //                                   <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${plstj.virlink_list[itindex].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                     //                                   <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" data-type ="IN" class = "rm"  title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                     //                                   <div class="tk" style="flex: 1.25;"><span title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                     //                                   </div>`.trim();
  //                     //         $('#Vlinklists').append(vlinkStr);
  //                     //       });
  //                     //       $('.removeVlink').off('click').on('click', function() {
  //                     //         let that = this;
  //                     //         $e.emit('DelVtLink', that);
  //                     //       });
  //                     //     } else {
  //                     //       GFC.showError(plstj.err_msg);
  //                     //     }
  //                     //   });
  //                   }
  //                 } else {
  //                   var portinfo = {};
  //                   if (startAt === undefined || endAt === undefined) {
  //                     GFC.showError('请确保两侧各有一个端子被选中');
  //                     return;
  //                   }
  //                   portinfo.SendPort = dtd.sendport;
  //                   portinfo.RecvPort = dtd.recvport;
  //                   if ($('#sendlist').find('.active').attr('data-t') === $('#recvlist').find('.active').attr('data-t')) {
  //                     GFC.showError('请确保两侧虚端子不能同时为' + $('#sendlist').find('.active').attr('data-t'));
  //                     return;
  //                   }
  //                   if ($('#sendlist').find('.active').attr('data-stype') !== $('#recvlist').find('.active').attr('data-stype')) {
  //                     GFC.showError('请确保两侧虚端子类型相同');
  //                     return;
  //                   }
  //                   if ($('#sendlist').find('.active').attr('data-t') === 'IN') {
  //                     portinfo.InSigId = startAt;
  //                     portinfo.OutSigId = endAt;
  //                     portinfo.Linktype = dtd.ProjectLinktype;
  //                   } else {
  //                     portinfo.InSigId = endAt;
  //                     portinfo.OutSigId = startAt;
  //                     portinfo.LinkType = dtd.ProjectLinktype;
  //                   }
  //                   let llarr = [];
  //                   llarr[0] = portinfo;
  //                   addVirLink(llarr, function(dlstj) {
  //                     console.log(llarr, dlstj, '虚回路');
  //                     if (dlstj.status) {
  //                       isEdit = 1;
  //                       $('.list-group-item').removeClass('active');
  //                       $('.list-group-item').removeClass('active');
  //                       $('[data-id=' + portinfo.InSigId + ']').addClass('list-group-item-warning');
  //                       $('[data-id=' + portinfo.OutSigId + ']').addClass('list-group-item-warning');
  //                       let ouddd = _.findWhere(jsonInfo.Outsig, {
  //                         Guid: portinfo.OutSigId
  //                       });
  //                       let inddd = _.findWhere(jsonInfo.Insig, {
  //                         Guid: portinfo.InSigId
  //                       });
  //                       if (inddd === undefined) {
  //                         ouddd = _.findWhere(jsonInfo.Outsig, {
  //                           Guid: portinfo.OutSigId
  //                         });
  //                         inddd = _.findWhere(jsonInfo.Insig, {
  //                           Guid: portinfo.InSigId
  //                         });
  //                       }
  //                       let vlinkStr = '';
  //                       if (centerIed === sendDevName) {
  //                         vlinkStr = `<div class="vlink-trs">
  //                                                         <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                                         <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" style="cursor: pointer;" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                                         <div class="tk" style="flex: 1.25;"><span id="ouName" data-id="${ouddd.Guid}" data-type ="OUT" title="${ouddd.ProoutsigCustomname}" class="no-link-style tm">${ouddd.ProoutsigCustomname}</span></div>
  //                                                         <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                                         <div class="tk hide" style="flex: 1.25;"><span data-id="${inddd.Guid}" data-type ="IN" id="inName" title="${inddd.ProinsigCustomname}" class="no-link-style">${inddd.ProinsigCustomname}</span></div>
  //                                                         </div>`.trim();
  //                       } else {
  //                         vlinkStr = `<div class="vlink-trs">
  //                                                         <div class="" style="flex:0.16;margin-left:35px;"></div>
  //                                                         <div class="vlink-xh tk" style="flex: 0.15;">${$('#Vlinklists').find('.vlink-trs').length + 1}</div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.sendBG.ProdevName}" class="no-link-style">${dtd.sendBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${inddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="OUT" class = "rm" style="cursor: pointer;" title="${inddd.ProinsigBriefname}" class="no-link-style">${inddd.ProinsigBriefname}</span></div>
  //                                                         <div class="tk" style="flex: 1.25;"><span id="inName" title="${inddd.ProinsigCustomname}" data-id="${inddd.Guid}" data-type ="OUT" class="no-link-style tm">${inddd.ProinsigCustomname}</span></div>
  //                                                         <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                                                         <div class="tk hide" style="flex: 1.5;"><span title="${dtd.recvBG.ProdevName}" class="no-link-style">${dtd.recvBG.ProdevName}</span></div>
  //                                                         <div class="tk" style="flex: 1.5;"><span data-id="${ouddd.Guid}" removeData-id ="${dlstj.virlink_list[0].Guid}" data-oid="${ouddd.Guid}" data-iid="${inddd.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" title="${ouddd.ProoutsigBriefname}" class="no-link-style">${ouddd.ProoutsigBriefname}</span></div>
  //                                                         <div class="tk hide" style="flex: 1.25;"><span id="ouName" data-id="${ouddd.Guid}" data-type ="IN" title="${ouddd.ProoutsigCustomname}" class="no-link-style">${ouddd.ProoutsigCustomname}</span></div>
  //                                                         </div>`.trim();
  //                       }
  //                       $('#Vlinklists').append(vlinkStr);
  //                       $('.removeVlink').off('click').on('click', function() {
  //                         let that = this;
  //                         $e.emit('DelVtLink', that);
  //                       });
  //                       $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                       $('.tm').css('cursor', 'pointer');
  //                       $('.tm').on('mousedown', function(e) {
  //                         if (e.which === 3) {
  //                           let tthis = $(this);
  //                           // console.log('333333333333', tthis);
  //                           bootbox.prompt({
  //                             title: '请输入自定义名称',
  //                             value: tthis.text(),
  //                             callback: function(result) {
  //                               if (result === null) {
  //                                 //GFC.showError('dd');
  //                                 return;
  //                               } else {
  //                                 if ($.trim(result) === '') {
  //                                   GFC.showError('不可以输入空的名称！');
  //                                   return;
  //                                 }
  //                                 let objsig = {
  //                                   SigType: tthis.attr('data-type'),
  //                                   SigId: tthis.attr('data-id'),
  //                                   SigCustomName: result
  //                                 };
  //                                 let dsdarr = [];
  //                                 dsdarr[0] = objsig;
  //                                 console.log('666666666', dsdarr);
  //                                 setVirSigInfo(dsdarr, function(odse) {
  //                                   console.log(odse);
  //                                   if (odse.status) {
  //                                     tthis.text(result);
  //                                     tthis.find('.list-group-item-heading').text(result);
  //                                     isEdit = 1;
  //                                   } else {
  //                                     GFC.showError(odse.err_msg);
  //                                   }
  //                                 });
  //                               }
  //                             }
  //                           });
  //                         }
  //                       });
  //                     } else {
  //                       GFC.showError(dlstj.err_msg);
  //                     }
  //                   });
  //                 }
  //               });
  //             } else {
  //               console.log(obj.err_msg);
  //             }
  //           });
  //         }
  //         var IsCtrl = false;
  //         var IsShift = false;
  //         var ispl = false;
  //         var addVirLink = ROOF.virlink.AddVirLink;
  //         $(window).off('keyup').on('keyup', function() {
  //           IsCtrl = false;
  //           IsShift = false;
  //         });
  //         $(window).off('keydown').on('keydown', function(e) {
  //           if (e.ctrlKey === true) {
  //             IsCtrl = true;
  //           }
  //           // if (e.shiftKey === true) {
  //           //   IsShift = true;
  //           // }
  //         });
  //         // $('#sendlist .list-group-item').off('click').on('click', function() {
  //         //   // if (IsCtrl === true && IsShift === false) {
  //         //     if (IsCtrl) {
  //         //       ispl = true;
  //         //       // $('.list-group-item.active').addClass('list-group-item-info');
  //         //       // $('.list-group-item').removeClass('active');
  //         //       if ($(this).hasClass('active')) {
  //         //         $(this).removeClass('active');
  //         //       } else {
  //         //         $(this).addClass('active');
  //         //       }

  //         //     } else {
  //         //       ispl = false;
  //         //       if ($(this).hasClass('active')) {
  //         //         $(this).removeClass('active');
  //         //         $('#sendlist').find('.list-group-item').removeClass('active');
  //         //         return;
  //         //       }
  //         //       $('#sendlist').find('.list-group-item').removeClass('active');
  //         //       $(this).addClass('active');
  //         //     }
  //         //   // } else {
  //         //     // if (IsShift) {
  //         //     //   ispl = true;
  //         //     //   if ($(this).hasClass('active')) {
  //         //     //     $(this).removeClass('active');
  //         //     //   } else {
  //         //     //     if ($('#sendlist').find('.list-group-item.active').length === 1) {
  //         //     //       console.log('超过2啦');
  //         //     //     }
  //         //     //     $(this).addClass('active');
  //         //     //   }
  //         //     // } else {
  //         //     //   ispl = false;
  //         //     //   if ($(this).hasClass('active')) {
  //         //     //     $(this).removeClass('active');
  //         //     //     $('#sendlist').find('.list-group-item').removeClass('active');
  //         //     //     return;
  //         //     //   }
  //         //     //   $('#sendlist').find('.list-group-item').removeClass('active');
  //         //     //   $(this).addClass('active');
  //         //     // }
  //         //   // }
  //         // });


  //         var loadVlinklist = function() {
  //           $('#Vlinklists').html('');
  //           if (dtd.virlinkdata !== undefined) {
  //             window.vlinkStr = '';
  //             if (dtd.senddev && dtd.recvdev) {
  //               virlink.GetSvgSigInfoByTwoDev(dtd.senddev, dtd.recvdev, function(obj) {

  //                 if (centerIed === sendDevName) {
  //                   console.log(dtd, 'dtd');
  //                   if (obj.status) {
  //                     var jsonInfo = $.parseJSON(obj.json_info);
  //                     $.each(dtd.virlinkdata, function(vindex, vdata) {
  //                       var getInData = jsonInfo.Insig.filter(x => (x.Guid === vdata.ProjectInsignalGuid))[0];
  //                       var getOuData = jsonInfo.Outsig.filter(x => (x.Guid === vdata.ProjectOutsignalGuid))[0];
  //                       var autoLink;
  //                       var autoCss;
  //                       if (vdata.AutoLink) {
  //                         if (vdata.AutoLink === "Yes") {
  //                           autoLink = '<img id="img" src="./images/autoLink.png" style=""></img>';
  //                           autoCss = 'autocss';
  //                         } else {
  //                           autoLink = '';
  //                           autoCss = '';
  //                         }
  //                       }
  //                       vlinkStr += `<div class="vlink-trs ${autoCss}">
  //                               <div class="" style="flex:0.16;margin-left:35px;">${autoLink}</div>
  //                               <div class="vlink-xh tk" style="flex: 0.15;">${vindex + 1}</div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.s.ProdevName}">${vdata.s.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getOuData.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData.Guid}" data-iid="${getInData.Guid}"  data-type ="OUT" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getOuData.ProoutsigBriefname}">${getOuData.ProoutsigBriefname}</span></div>
  //                               <div class="tk" style="flex: 1.25;"><span  class="no-link-style tm" id="ouName" data-id ="${getOuData.Guid}" data-type ="OUT" title="${getOuData.ProoutsigCustomname}">${getOuData.ProoutsigCustomname}</span></div>
  //                               <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${vdata.Guid}" data-oid="${getOuData.Guid}" data-iid="${getInData.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.r.ProdevName}">${vdata.r.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getInData.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData.Guid}" data-iid="${getInData.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getInData.ProinsigBriefname}">${getInData.ProinsigBriefname}</span></div>
  //                               <div class="tk hide" style="flex: 1.25;"><span  class="no-link-style" id="inName" data-id ="${getInData.Guid}" data-type ="IN" title="${getInData.ProinsigCustomname}">${getInData.ProinsigCustomname}</span></div>
  //                           </div>`.trim();
  //                     });
  //                   } else {
  //                     console.log(obj.err_msg);
  //                   }
  //                 } else {
  //                   if (obj.status) {
  //                     var jsonInfo = $.parseJSON(obj.json_info);
  //                     $.each(dtd.virlinkdata, function(vindex, vdata) {
  //                       var autoLink;
  //                       var autoCss;
  //                       var getInData2 = jsonInfo.Insig.filter(x => (x.Guid === vdata.ProjectInsignalGuid))[0];
  //                       var getOuData2 = jsonInfo.Outsig.filter(x => (x.Guid === vdata.ProjectOutsignalGuid))[0];
  //                       if (vdata.AutoLink) {
  //                         if (vdata.AutoLink === "Yes") {
  //                           autoLink = '<img id="img" src="./images/autoLink.png" style=""></img>';
  //                           autoCss = 'autocss';
  //                         } else {
  //                           autoLink = '';
  //                           autoCss = '';
  //                         }
  //                       }
  //                       vlinkStr += `<div class="vlink-trs ${autoCss}">
  //                               <div class="" style="flex:0.16;margin-left:35px;">${autoLink}</div>
  //                               <div class="vlink-xh tk" style="flex: 0.15;">${vindex + 1}</div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.s.ProdevName}">${vdata.s.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getInData2.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData2.Guid}" data-iid="${getInData2.Guid}" data-type ="OUT" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getInData2.ProinsigBriefname}">${getInData2.ProinsigBriefname}</span></div>
  //                               <div class="tk" style="flex: 1.25;"><span  class="no-link-style tm" id="inName" data-id ="${getInData2.Guid}" data-type ="OUT" title="${getInData2.ProinsigCustomname}">${getInData2.ProinsigCustomname}</span></div>
  //                               <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${vdata.Guid}" data-oid="${getOuData2.Guid}" data-iid="${getInData2.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.r.ProdevName}">${vdata.r.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getOuData2.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData2.Guid}" data-iid="${getInData2.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getOuData2.ProoutsigBriefname}">${getOuData2.ProoutsigBriefname}</span></div>
  //                               <div class="tk hide" style="flex: 1.25;"><span  class="no-link-style" id="ouName" data-id ="${getOuData2.Guid}" data-type ="IN" title="${getOuData2.ProoutsigCustomname}">${getOuData2.ProoutsigCustomname}</span></div>
  //                           </div>`.trim();
  //                     });
  //                   } else {
  //                     console.log(obj.err_msg);
  //                   }
  //                 }
  //                 $('.vlink-modal').css('padding-left', '0px');
  //                 $('#Vlinklists').html(vlinkStr); //22222
  //                 $('.removeVlink').off('click').on('click', function() {
  //                   let that = this;
  //                   $e.emit('DelVtLink', that);
  //                 });
  //                 $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                 $('.tm').css('cursor', 'pointer');
  //                 $('.tm').on('mousedown', function(e) {
  //                   if (e.which === 3) {
  //                     let tthis = $(this);
  //                     // console.log('333333333333', tthis);
  //                     bootbox.prompt({
  //                       title: '请输入自定义名称',
  //                       value: tthis.text(),
  //                       callback: function(result) {
  //                         if (result === null) {
  //                           //GFC.showError('dd');
  //                           return;
  //                         } else {
  //                           if ($.trim(result) === '') {
  //                             GFC.showError('不可以输入空的名称！');
  //                             return;
  //                           }
  //                           let objsig = {
  //                             SigType: tthis.attr('data-type'),
  //                             SigId: tthis.attr('data-id'),
  //                             SigCustomName: result
  //                           };
  //                           let dsdarr = [];
  //                           dsdarr[0] = objsig;
  //                           console.log('666666666', dsdarr);
  //                           setVirSigInfo(dsdarr, function(odse) {
  //                             console.log(odse);
  //                             if (odse.status) {
  //                               tthis.text(result);
  //                               tthis.find('.list-group-item-heading').text(result);
  //                               isEdit = 1;
  //                             } else {
  //                               GFC.showError(odse.err_msg);
  //                             }
  //                           });
  //                         }
  //                       }
  //                     });
  //                   }
  //                 });
  //               });
  //             } else {
  //               virlink.GetSvgSigInfoByFlowId(dtd.Guid, function(obj) {
  //                 if (centerIed === sendDevName) {
  //                   console.log(dtd, 'dtd');
  //                   if (obj.status) {
  //                     var jsonInfo = $.parseJSON(obj.json_info);
  //                     $.each(dtd.virlinkdata, function(vindex, vdata) {
  //                       var getInData = jsonInfo.Insig.filter(x => (x.Guid === vdata.ProjectInsignalGuid))[0];
  //                       var getOuData = jsonInfo.Outsig.filter(x => (x.Guid === vdata.ProjectOutsignalGuid))[0];
  //                       var autoLink;
  //                       var autoCss;
  //                       if (vdata.AutoLink) {
  //                         if (vdata.AutoLink === "Yes") {
  //                           autoLink = '<img id="img" src="./images/autoLink.png" style=""></img>';
  //                           autoCss = 'autocss';
  //                         } else {
  //                           autoLink = '';
  //                           autoCss = '';
  //                         }
  //                       }
  //                       vlinkStr += `<div class="vlink-trs ${autoCss}">
  //                               <div class="" style="flex:0.16;margin-left:35px;">${autoLink}</div>
  //                               <div class="vlink-xh tk" style="flex: 0.15;">${vindex + 1}</div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.s.ProdevName}">${vdata.s.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getOuData.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData.Guid}" data-iid="${getInData.Guid}"  data-type ="OUT" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getOuData.ProoutsigBriefname}">${getOuData.ProoutsigBriefname}</span></div>
  //                               <div class="tk" style="flex: 1.25;"><span  class="no-link-style tm" id="ouName" data-id ="${getOuData.Guid}" data-type ="OUT" title="${getOuData.ProoutsigCustomname}">${getOuData.ProoutsigCustomname}</span></div>
  //                               <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${vdata.Guid}" data-oid="${getOuData.Guid}" data-iid="${getInData.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.r.ProdevName}">${vdata.r.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getInData.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData.Guid}" data-iid="${getInData.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getInData.ProinsigBriefname}">${getInData.ProinsigBriefname}</span></div>
  //                               <div class="tk hide" style="flex: 1.25;"><span  class="no-link-style" id="inName" data-id ="${getInData.Guid}" data-type ="IN" title="${getInData.ProinsigCustomname}">${getInData.ProinsigCustomname}</span></div>
  //                           </div>`.trim();
  //                     });
  //                   } else {
  //                     console.log(obj.err_msg);
  //                   }
  //                 } else {
  //                   if (obj.status) {
  //                     var jsonInfo = $.parseJSON(obj.json_info);
  //                     $.each(dtd.virlinkdata, function(vindex, vdata) {
  //                       var autoLink;
  //                       var autoCss;
  //                       var getInData2 = jsonInfo.Insig.filter(x => (x.Guid === vdata.ProjectInsignalGuid))[0];
  //                       var getOuData2 = jsonInfo.Outsig.filter(x => (x.Guid === vdata.ProjectOutsignalGuid))[0];
  //                       if (vdata.AutoLink) {
  //                         if (vdata.AutoLink === "Yes") {
  //                           autoLink = '<img id="img" src="./images/autoLink.png" style=""></img>';
  //                           autoCss = 'autocss';
  //                         } else {
  //                           autoLink = '';
  //                           autoCss = '';
  //                         }
  //                       }
  //                       vlinkStr += `<div class="vlink-trs ${autoCss}">
  //                               <div class="" style="flex:0.16;margin-left:35px;">${autoLink}</div>
  //                               <div class="vlink-xh tk" style="flex: 0.15;">${vindex + 1}</div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.s.ProdevName}">${vdata.s.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getInData2.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData2.Guid}" data-iid="${getInData2.Guid}" data-type ="OUT" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getInData2.ProinsigBriefname}">${getInData2.ProinsigBriefname}</span></div>
  //                               <div class="tk" style="flex: 1.25;"><span  class="no-link-style tm" id="inName" data-id ="${getInData2.Guid}" data-type ="OUT" title="${getInData2.ProinsigCustomname}">${getInData2.ProinsigCustomname}</span></div>
  //                               <div class="tk" style="flex: 0.75;"><span id ="delFlag" data-id="${vdata.Guid}" data-oid="${getOuData2.Guid}" data-iid="${getInData2.Guid}" class="glyphicon glyphicon-remove-circle removeVlink"></span></div>
  //                               <div class="tk hide" style="flex: 1.5;"><span  class="no-link-style" title="${vdata.r.ProdevName}">${vdata.r.ProdevName}</span></div>
  //                               <div class="tk" style="flex: 1.5;"><span data-id ="${getOuData2.Guid}" removeData-id ="${vdata.Guid}" data-oid="${getOuData2.Guid}" data-iid="${getInData2.Guid}" data-type ="IN" class = "rm" style="cursor: pointer;" class="no-link-style" title="${getOuData2.ProoutsigBriefname}">${getOuData2.ProoutsigBriefname}</span></div>
  //                               <div class="tk hide" style="flex: 1.25;"><span  class="no-link-style" id="ouName" data-id ="${getOuData2.Guid}" data-type ="IN" title="${getOuData2.ProoutsigCustomname}">${getOuData2.ProoutsigCustomname}</span></div>
  //                           </div>`.trim();
  //                     });
  //                   } else {
  //                     console.log(obj.err_msg);
  //                   }
  //                 }
  //                 $('.vlink-modal').css('padding-left', '0px');
  //                 $('#Vlinklists').html(vlinkStr); //22222
  //                 $('.removeVlink').off('click').on('click', function() {
  //                   let that = this;
  //                   $e.emit('DelVtLink', that);
  //                 });
  //                 $e.emit('rerelink', ROOFS, centerIeds, sendDevNames, dtds);
  //                 $('.tm').css('cursor', 'pointer');
  //                 $('.tm').on('mousedown', function(e) {
  //                   if (e.which === 3) {
  //                     let tthis = $(this);
  //                     // console.log('333333333333', tthis);
  //                     bootbox.prompt({
  //                       title: '请输入自定义名称',
  //                       value: tthis.text(),
  //                       callback: function(result) {
  //                         if (result === null) {
  //                           //GFC.showError('dd');
  //                           return;
  //                         } else {
  //                           if ($.trim(result) === '') {
  //                             GFC.showError('不可以输入空的名称！');
  //                             return;
  //                           }
  //                           let objsig = {
  //                             SigType: tthis.attr('data-type'),
  //                             SigId: tthis.attr('data-id'),
  //                             SigCustomName: result
  //                           };
  //                           let dsdarr = [];
  //                           dsdarr[0] = objsig;
  //                           console.log('666666666', dsdarr);
  //                           setVirSigInfo(dsdarr, function(odse) {
  //                             console.log(odse);
  //                             if (odse.status) {
  //                               tthis.text(result);
  //                               tthis.find('.list-group-item-heading').text(result);
  //                               isEdit = 1;
  //                             } else {
  //                               GFC.showError(odse.err_msg);
  //                             }
  //                           });
  //                         }
  //                       }
  //                     });
  //                   }
  //                 });
  //               });
  //             }
  //             // setTimeout('functin option111()', 2000);

  //           }
  //         };
  //         loadVlinklist();
  //         // $('.tm').on('mousedown', function(e) {
  //         //   // console.log($(this).attr('data-id'));
  //         //   if (e.which === 3) {
  //         //     var objsig;
  //         //     if (centerIed === sendDevName) {
  //         //       objsig = {
  //         //         SigType: $(this).attr('data-type'),
  //         //         SigCustomName: $(this).text()
  //         //       };
  //         //     } else {
  //         //       if ($(this).attr('data-type') === 'OUT') {
  //         //         objsig = {
  //         //           SigType: 'IN',
  //         //           SigCustomName: $(this).text()
  //         //         };
  //         //       } else {
  //         //         objsig = {
  //         //           SigType: 'OUT',
  //         //           SigCustomName: $(this).text()
  //         //         };
  //         //       }
  //         //     }
  //         //     // var objsig = {
  //         //     //   SigType: $(this).attr('data-type'),
  //         //     //   SigId: $(this).attr('data-id'),
  //         //     //   SigCustomName: $(this).text()
  //         //     // };
  //         //     bootbox.prompt({
  //         //       title: '请输入自定义名称',
  //         //       value: $(this).text(),
  //         //       callback: function(result) {
  //         //         if (result === null) {
  //         //           return;
  //         //         } else {
  //         //           if ($.trim(result) === '') {
  //         //             GFC.showError('不可以输入空的名称！');
  //         //             return;
  //         //           }
  //         //           objsig.SigCustomName = result;
  //         //           let dsdarr = [];
  //         //           dsdarr[0] = objsig;
  //         //           setVirSigInfo(dsdarr, function(odse) {
  //         //             console.log(objsig, odse, 'odse');
  //         //             if (odse.status) {
  //         //               //$(this).find('.list-group-item-heading').text(result);
  //         //               $(`[data-id ='${objsig.SigId}']`).text(result);
  //         //               isEdit = 1;
  //         //             } else {
  //         //               GFC.showError(odse.err_msg);
  //         //             }
  //         //           });
  //         //         }
  //         //       }
  //         //     });
  //         //     return;
  //         //   }
  //         // });
  //         //右击虚回路表中修改自定义名称
  //         // $('.rm').on('mousedown', function(e) {
  //         //   // console.log($(this).attr('data-id'));
  //         //   if (e.which === 3) {
  //         //     var objsig;
  //         //     if (centerIed === sendDevName) {
  //         //       objsig = {
  //         //         SigType: $(this).attr('data-type'),
  //         //         SigId: $(this).attr('data-id'),
  //         //         SigCustomName: $(this).text()
  //         //       };
  //         //     } else {
  //         //       if ($(this).attr('data-type') === 'OUT') {
  //         //         objsig = {
  //         //           SigType: 'IN',
  //         //           SigId: $(this).attr('data-id'),
  //         //           SigCustomName: $(this).text()
  //         //         };
  //         //       } else {
  //         //         objsig = {
  //         //           SigType: 'OUT',
  //         //           SigId: $(this).attr('data-id'),
  //         //           SigCustomName: $(this).text()
  //         //         };
  //         //       }
  //         //     }
  //         //     // var objsig = {
  //         //     //   SigType: $(this).attr('data-type'),
  //         //     //   SigId: $(this).attr('data-id'),
  //         //     //   SigCustomName: $(this).text()
  //         //     // };
  //         //     bootbox.prompt({
  //         //       title: '请输入自定义名称',
  //         //       value: $(this).text(),
  //         //       callback: function(result) {
  //         //         if (result === null) {
  //         //           return;
  //         //         } else {
  //         //           if ($.trim(result) === '') {
  //         //             GFC.showError('不可以输入空的名称！');
  //         //             return;
  //         //           }
  //         //           objsig.SigCustomName = result;
  //         //           let dsdarr = [];
  //         //           dsdarr[0] = objsig;
  //         //           setVirSigInfo(dsdarr, function(odse) {
  //         //             console.log(objsig, odse, 'odse');
  //         //             if (odse.status) {
  //         //               //$(this).find('.list-group-item-heading').text(result);
  //         //               $(`[data-id ='${objsig.SigId}']`).text(result);
  //         //               isEdit = 1;
  //         //             } else {
  //         //               GFC.showError(odse.err_msg);
  //         //             }
  //         //           });
  //         //         }
  //         //       }
  //         //     });
  //         //     return;
  //         //   }
  //         // });
  //         if (dtd.FlowComplete === "true") {
  //           $('input:checkbox[class=checkBtn]').prop('checked', true);
  //         } else {
  //           $('input:checkbox[class=checkBtn]').prop('checked', false);
  //         }
  //         $('.checkbox-check').off('click').on('click', function() {
  //           clikRes = true;
  //           var chekRes = $('input:checkbox[class=checkBtn]').prop('checked').toString();
  //           var signal_flow = {};
  //           signal_flow.Guid = dtd.Guid;
  //           signal_flow.ProjectCompleted = chekRes;
  //           bay.ChangeTypicalBaySignalFlow(signal_flow, function(obj) {
  //             console.log(obj);
  //             if (obj.status === true) {
  //               console.log('检查通过');
  //             } else {
  //               console.log('检查不通过', obj.err_msg, signal_flow);
  //             }
  //           })
  //         });
  //         $('.close').off('click').on('click', function() {
  //           if (clikRes === true) {
  //             GFC.reload();
  //           }
  //         });
  //         if (dtd.virlinkdata) {
  //           if (dtd.virlinkdata.length !== 0) {
  //             $('.virlink-prent-view').addClass('up-top');
  //             $('.btn-virlink-view').addClass('closed');
  //           }
  //         }
  //         $('.btn-virlink-view').off('click').on('click', function() {
  //           if ($(this).hasClass('closed')) {
  //             // console.log('1111',cellview);
  //             // $('#outDevName111').hide();
  //             // $('#outDevName222').hide();
  //             $('.virlink-prent-view').removeClass('up-top');
  //             $('.ieds').css('height', '100%');
  //             $(this).removeClass('closed');
  //           } else {
  //             // console.log('22222',cellview.model.attributes.dataDev.sendBG.ProdevName,cellview.model.attributes.dataDev.recvBG.ProdevName);
  //             var sendDevName = cellview.model.attributes.dataDev.sendBG.ProdevName;
  //             var recvDevName = cellview.model.attributes.dataDev.recvBG.ProdevName;
  //             // $('#outDevName111').show();
  //             // $('#outDevName222').show();
  //             // $('#outDevName111').text(`${sendDevName}`);
  //             // $('#outDevName222').text(`${recvDevName}`);
  //             $('.virlink-prent-view').addClass('up-top');
  //             $(this).addClass('closed');
  //           }
  //         });

  //         $('.left-list-Filter-bind').find('input:checkbox').off('change').on('change', function() {
  //           $('#sendlist').find('.list-group-item').hide();
  //           if ($(this).prop('checked')) {
  //             $('#in').val('');
  //             let idf = $(this).parent().index();
  //             $.each($('.left-list-Filter-bind').find('input'), function(indom, datadom) {
  //               if (indom === idf) {
  //                 return true;
  //               }
  //               $('.left-list-Filter-bind').find('input').eq(indom).removeAttr('checked');
  //               GFC.noUseF(datadom);
  //             });
  //             if ($(this).val() === 'All') {
  //               $('#sendlist').find('.list-group-item').show();
  //               let outNum1 = $('#sendlist').find('.list-group-item').length;
  //               let inNum1 = $('#recvlist').find('.list-group-item').length;
  //               $('#outDevName').text(`(端子数量：${outNum1})`);
  //               $('#inDevName').text(`(端子数量：${inNum1})`);
  //               $('#inlineRadio00').prop('checked', true);
  //               $('#inlineRadio11').prop('checked', false);
  //               $('#inlineRadio22').prop('checked', false);
  //               $('#inlineRadio33').prop('checked', false);
  //               $('#recvlist').find('.list-group-item').show();
  //               return;
  //             }
  //             $('#sendlist').find('[data-stype=' + $(this).val() + ']').show();
  //             let outNum1 = $('#sendlist').find('[data-stype=' + $(this).val() + ']').length;
  //             $('#outDevName').text(`(端子数量：${outNum1})`);
  //             $('input:checkbox[class=rig]').prop('checked', false);
  //             $('input:checkbox[class=rig][value=' + $(this).val() + ']').prop('checked', true);
  //             $('#recvlist').find('.list-group-item').hide();
  //             if ($(this).prop('checked')) {
  //               $('#inn').val('');
  //               let idf = $(this).parent().index();
  //               $.each($('.right-list-Filter-bind').find('input'), function(indom, datadom) {
  //                 if (indom === idf) {
  //                   return true;
  //                 }
  //                 $('.right-list-Filter-bind').find('input').eq(indom).removeAttr('checked');
  //                 GFC.noUseF(datadom);
  //               });
  //               if ($(this).val() === 'All') {
  //                 $('#recvlist').find('.list-group-item').show();
  //                 return;
  //               }
  //               $('#recvlist').find('[data-stype=' + $(this).val() + ']').show();
  //               let inNum1 = $('#recvlist').find('[data-stype=' + $(this).val() + ']').length;
  //               $('#inDevName').text(`(端子数量：${inNum1})`);
  //             } else {
  //               $('#recvlist').find('.list-group-item').show();
  //             }
  //           } else {
  //             $('#sendlist').find('.list-group-item').show();
  //             let outNum1 = $('#sendlist').find('[data-stype=' + $(this).val() + ']').length;
  //             $('#outDevName').text(`(端子数量：${outNum1})`);


  //           }
  //         });
  //         $('.left-list-Filter-bind').find('input:text').off('change').on('keyup', function() {
  //           $('#inlineRadio0').prop('checked', false);
  //           $('#inlineRadio1').prop('checked', false);
  //           $('#inlineRadio2').prop('checked', false);
  //           $('#inlineRadio3').prop('checked', false);
  //           $('#sendlist').find('.list-group-item').hide();
  //           var info = $('#in').val();
  //           $('#sendlist li:contains(' + info + ')').show();
  //           if (info === '') {
  //             $('#inlineRadio0').prop('checked', true);
  //           }
  //         });
  //         $('.right-list-Filter-bind').find('input:text').off('change').on('keyup', function() {
  //           $('#inlineRadio00').prop('checked', false);
  //           $('#inlineRadio11').prop('checked', false);
  //           $('#inlineRadio22').prop('checked', false);
  //           $('#inlineRadio33').prop('checked', false);
  //           $('#recvlist').find('.list-group-item').hide();
  //           var info2 = $('#inn').val();
  //           $('#recvlist li:contains(' + info2 + ')').show();
  //           if (info2 === '') {
  //             $('#inlineRadio00').prop('checked', true);
  //           }
  //         });
  //         $('.right-list-Filter-bind').find('input:checkbox').off('change').on('change', function() {
  //           $('#recvlist').find('.list-group-item').hide();
  //           if ($(this).prop('checked')) {
  //             $('#inn').val('');
  //             let idf = $(this).parent().index();
  //             $.each($('.right-list-Filter-bind').find('input'), function(indom, datadom) {
  //               if (indom === idf) {
  //                 return true;
  //               }
  //               $('.right-list-Filter-bind').find('input').eq(indom).removeAttr('checked');
  //               GFC.noUseF(datadom);
  //             });
  //             if ($(this).val() === 'All') {
  //               $('#recvlist').find('.list-group-item').show();
  //               $('#sendlist').find('.list-group-item').show();
  //               let outNum1 = $('#sendlist').find('.list-group-item').length;
  //               let inNum1 = $('#recvlist').find('.list-group-item').length;
  //               $('#outDevName').text(`(端子数量：${outNum1})`);
  //               $('#inDevName').text(`(端子数量：${inNum1})`);
  //               $('#inlineRadio0').prop('checked', true);
  //               $('#inlineRadio1').prop('checked', false);
  //               $('#inlineRadio2').prop('checked', false);
  //               $('#inlineRadio3').prop('checked', false);
  //               $('#sendlist').find('.list-group-item').show();
  //               return;
  //             }
  //             $('#recvlist').find('[data-stype=' + $(this).val() + ']').show();
  //             $('input:checkbox[class=lef]').prop('checked', false);
  //             $('input:checkbox[class=lef][value=' + $(this).val() + ']').prop('checked', true);
  //             $('#sendlist').find('.list-group-item').hide();
  //             if ($(this).prop('checked')) {
  //               $('#in').val('');
  //               let idf = $(this).parent().index();
  //               $.each($('.left-list-Filter-bind').find('input'), function(indom, datadom) {
  //                 if (indom === idf) {
  //                   return true;
  //                 }
  //                 $('.left-list-Filter-bind').find('input').eq(indom).removeAttr('checked');
  //                 GFC.noUseF(datadom);
  //               });
  //               if ($(this).val() === 'All') {
  //                 $('#sendlist').find('.list-group-item').show();
  //                 // $('#inlineRadio00').prop('checked', true);
  //                 // $('#inlineRadio11').prop('checked', false);
  //                 // $('#inlineRadio22').prop('checked', false);
  //                 // $('#inlineRadio33').prop('checked', false);
  //                 return;
  //               }
  //               $('#sendlist').find('[data-stype=' + $(this).val() + ']').show();
  //               let outNum1 = $('#sendlist').find('[data-stype=' + $(this).val() + ']').length;
  //               $('#outDevName').text(`(端子数量：${outNum1})`);
  //               $('input:checkbox[class=rig]').prop('checked', false);
  //               $('input:checkbox[class=rig][value=' + $(this).val() + ']').prop('checked', true);
  //               $('#recvlist').find('.list-group-item').hide();
  //               if ($(this).prop('checked')) {
  //                 $('#inn').val('');
  //                 let idf = $(this).parent().index();
  //                 $.each($('.right-list-Filter-bind').find('input'), function(indom, datadom) {
  //                   if (indom === idf) {
  //                     return true;
  //                   }
  //                   $('.right-list-Filter-bind').find('input').eq(indom).removeAttr('checked');
  //                   GFC.noUseF(datadom);
  //                 });
  //                 if ($(this).val() === 'All') {
  //                   $('#recvlist').find('.list-group-item').show();
  //                   let inNum1 = $('#recvlist').find('.list-group-item').length;
  //                   $('#inDevName').text(`(端子数量：${inNum1})`);
  //                   return;
  //                 }
  //                 $('#recvlist').find('[data-stype=' + $(this).val() + ']').show();
  //                 let inNum1 = $('#recvlist').find('[data-stype=' + $(this).val() + ']').length;
  //                 $('#inDevName').text(`(端子数量：${inNum1})`);
  //               } else {
  //                 $('#recvlist').find('.list-group-item').show();
  //                 let inNum1 = $('#recvlist').find('.list-group-item').length;
  //                 $('#inDevName').text(`(端子数量：${inNum1})`);

  //               }
  //             } else {
  //               $('#sendlist').find('.list-group-item').show();
  //               let outNum1 = $('#sendlist').find('.list-group-item').length;
  //               $('#outDevName').text(`(端子数量：${sendNum1})`);
  //             }
  //           } else {
  //             $('#recvlist').find('.list-group-item').show();
  //             let inNum1 = $('#recvlist').find('.list-group-item').length;
  //             $('#inDevName').text(`(端子数量：${inNum1})`);
  //           }
  //         });

  //         $(window).off('resize').on('resize', function() {
  //           let prleft = $('.left-vport-list').find('.panel-primary');
  //           prleft.height($('.left-vport-list').height() - $('.left-list-Filter-bind').height() - 10);
  //           let prright = $('.right-vport-list').find('.panel-primary');
  //           prright.height($('.right-vport-list').height() - $('.right-list-Filter-bind').height() - 10);
  //         });
  //         $('.vlink-modal').off('shown.bs.modal').on('shown.bs.modal', function() {
  //           $(window).trigger('resize');
  //           $('.left-list-Filter-bind').find('input').removeAttr('checked');
  //           $('.right-list-Filter-bind').find('input').removeAttr('checked');
  //           $('.left-list-Filter-bind').find('input').eq(0).click();
  //           // $('.right-list-Filter-bind').find('input').eq(0).click();
  //         });
  //         $('.vlink-modal').modal('show').off('hidden.bs.modal').on('hidden.bs.modal', function() {
  //           window.NowSeletcCell.unhighlight();
  //           $('.btn-virlink-view').removeClass('closed');
  //           $('.virlink-prent-view').removeClass('up-top');
  //           if (isEdit === 0) {
  //             return;
  //           }
  //           GFC.reload();
  //         });

  //       }
  //     },
  //     joint.shapes.basic.Generic.prototype.defaults)
  // });
  // joint.shapes.basic.PhyLinkVirView = joint.dia.ElementView.extend({
  //   update: function(cell, renderingOnlyAttrs) {

  //     var allAttrs = this.model.get('attrs');

  //     var rotatable = this.rotatableNode;
  //     if (rotatable) {
  //       var rotation = rotatable.attr('transform');
  //       rotatable.attr('transform', '');
  //     }

  //     var relativelyPositioned = [];
  //     var nodesBySelector = {};
  //     var $outdiv = vE(this).node.$el.find('.goosephybody');
  //     _.each(renderingOnlyAttrs || allAttrs, function(attrs, selector) {

  //       // Elements that should be updated.
  //       var $selected = this.findBySelector(selector);

  //       // No element matched by the `selector` was found. We're done then.
  //       if ($selected.length === 0) {
  //         return;
  //       }

  //       nodesBySelector[selector] = $selected;

  //       // Special attributes are treated by JointJS, not by SVG.
  //       var specialAttributes = this.SPECIAL_ATTRIBUTES.slice();

  //       // If the `filter` attribute is an object, it is in the special JointJS filter format and so
  //       // it becomes a special attribute and is treated separately.
  //       if (_.isObject(attrs.filter)) {

  //         specialAttributes.push('filter');
  //         this.applyFilter($selected, attrs.filter);
  //       }

  //       // If the `fill` or `stroke` attribute is an object, it is in the special JointJS gradient format and so
  //       // it becomes a special attribute and is treated separately.
  //       if (_.isObject(attrs.fill)) {

  //         specialAttributes.push('fill');
  //         this.applyGradient($selected, 'fill', attrs.fill);
  //       }
  //       if (_.isObject(attrs.stroke)) {

  //         specialAttributes.push('stroke');
  //         this.applyGradient($selected, 'stroke', attrs.stroke);
  //       }

  //       // Make special case for `text` attribute. So that we can set text content of the `<text>` element
  //       // via the `attrs` object as well.
  //       // Note that it's important to set text before applying the rest of the final attributes.
  //       // Vectorizer `text()` method sets on the element its own attributes and it has to be possible
  //       // to rewrite them, if needed. (i.e display: 'none')
  //       if (!_.isUndefined(attrs.text)) {

  //         $selected.each(function() {

  //           vE(this).text(attrs.text + '', {
  //             lineHeight: attrs.lineHeight,
  //             textPath: attrs.textPath,
  //             annotations: attrs.annotations
  //           });
  //         });
  //         specialAttributes.push('lineHeight', 'textPath', 'annotations');
  //       }

  //       // Set regular attributes on the `$selected` subelement. Note that we cannot use the jQuery attr()
  //       // method as some of the attributes might be namespaced (e.g. xlink:href) which fails with jQuery attr().
  //       var finalAttributes = _.omit(attrs, specialAttributes);

  //       $selected.each(function() {
  //         vE(this).attr(finalAttributes);
  //       });

  //       // `port` attribute contains the `id` of the port that the underlying magnet represents.
  //       if (attrs.port) {

  //         $selected.attr('port', _.isUndefined(attrs.port.id) ? attrs.port : attrs.port.id);
  //       }

  //       // `style` attribute is special in the sense that it sets the CSS style of the subelement.
  //       if (attrs.style) {

  //         $selected.css(attrs.style);
  //       }

  //       if (!_.isUndefined(attrs.html)) {

  //         $selected.each(function() {

  //           $(this).html(attrs.html + '');
  //         });
  //       }

  //       // Special `ref-x` and `ref-y` attributes make it possible to set both absolute or
  //       // relative positioning of subelements.
  //       if (!_.isUndefined(attrs['ref-x']) ||
  //         !_.isUndefined(attrs['ref-y']) ||
  //         !_.isUndefined(attrs['ref-dx']) ||
  //         !_.isUndefined(attrs['ref-dy']) ||
  //         !_.isUndefined(attrs['x-alignment']) ||
  //         !_.isUndefined(attrs['y-alignment']) ||
  //         !_.isUndefined(attrs['ref-width']) ||
  //         !_.isUndefined(attrs['ref-height'])
  //       ) {

  //         _.each($selected, function(el, index, list) {
  //           var $el = $(el);
  //           // copy original list selector to the element
  //           $el.selector = list.selector;
  //           relativelyPositioned.push($el);
  //         });
  //       }

  //     }, this);

  //     // We don't want the sub elements to affect the bounding box of the root element when
  //     // positioning the sub elements relatively to the bounding box.
  //     //_.invoke(relativelyPositioned, 'hide');
  //     //_.invoke(relativelyPositioned, 'show');

  //     // Note that we're using the bounding box without transformation because we are already inside
  //     // a transformed coordinate system.
  //     var size = this.model.get('size');
  //     var bbox = {
  //       x: 0,
  //       y: 0,
  //       width: size.width,
  //       height: size.height
  //     };

  //     renderingOnlyAttrs = renderingOnlyAttrs || {};

  //     _.each(relativelyPositioned, function($el) {

  //       // if there was a special attribute affecting the position amongst renderingOnlyAttributes
  //       // we have to merge it with rest of the element's attributes as they are necessary
  //       // to update the position relatively (i.e `ref`)
  //       var renderingOnlyElAttrs = renderingOnlyAttrs[$el.selector];
  //       var elAttrs = renderingOnlyElAttrs ? _.merge({}, allAttrs[$el.selector], renderingOnlyElAttrs) : allAttrs[$el.selector];

  //       this.positionRelative(vE($el[0]), bbox, elAttrs, nodesBySelector);

  //     }, this);

  //     if (rotatable) {

  //       rotatable.attr('transform', rotation || '');
  //     }
  //     var pp = this.model.attributes.dataDev;
  //     if (pp.pp !== undefined) {
  //       if (pp.tt === 'send' && pp.po === 'left') {
  //         $outdiv.find('.lefts').text(pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype)
  //           .attr('title', pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype);
  //         $outdiv.find('.rights').text(pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype)
  //           .attr('title', pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype);
  //       }
  //       if (pp.tt === 'send' && pp.po === 'right') {
  //         $outdiv.find('.lefts').text(pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype)
  //           .attr('title', pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype);
  //         $outdiv.find('.rights').text(pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype)
  //           .attr('title', pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype);
  //       }

  //       if (pp.tt === 'recv' && pp.po === 'right') {
  //         $outdiv.find('.lefts').text(pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype)
  //           .attr('title', pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype);
  //         $outdiv.find('.rights').text(pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype)
  //           .attr('title', pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype);
  //       }
  //       if (pp.tt === 'recv' && pp.po === 'left') {
  //         $outdiv.find('.lefts').text(pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype)
  //           .attr('title', pp.pp.recv.bsname + '-' + pp.pp.recv.ProportName + '-' + pp.pp.recv.ProportFunctiontype);
  //         $outdiv.find('.rights').text(pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype)
  //           .attr('title', pp.pp.send.bsname + '-' + pp.pp.send.ProportName + '-' + pp.pp.send.ProportFunctiontype);
  //       }
  //       $outdiv.find('.lefts,.rights').off('mouseover').on('mouseover', function() {
  //         $('.panelS').find('.popover-title').hide();
  //         $('.panelS').find('.popover-content').text($(this).attr('title'));
  //         let findbuidthis = $(this);
  //         $('.panelS').css({
  //           top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
  //           left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
  //           width: 'auto',
  //           height: 'auto',
  //           fontSize: '12px'
  //         });
  //         $('.panelS').show();
  //       });
  //       if (pp.linktype === 'DirectLink') {
  //         $outdiv.find('.linktype').removeClass('glyphicon-refresh');
  //         $outdiv.find('.goosephybody').prevObject.addClass('DirectLink');
  //       } else {
  //         $outdiv.find('.linktype').addClass('glyphicon-refresh');
  //       }

  //     } else {
  //       // $outdiv.find('.goosephybody').prevObject.
  //       $outdiv.find('.lefts').css({
  //         visibility: 'hidden'
  //       });
  //       $outdiv.find('.rights').css({
  //         visibility: 'hidden'
  //       });
  //       if (pp.ProjectLinktype === 'DirectLink') {
  //         $outdiv.find('.linktype').removeClass('glyphicon-refresh');
  //         $outdiv.find('.goosephybody').prevObject.addClass('DirectLink');
  //       } else {
  //         $outdiv.find('.linktype').addClass('glyphicon-refresh');
  //       }
  //     }
  //     if (pp.sigFlow === 'out') {
  //       // $outdiv.find('.linktyfc').addClass('glyphicon-arrow-right');
  //       $outdiv.find('.linktyfc1').attr('src', './images/langCutRight.png');
  //       $outdiv.find('.linktyfc1').css('margin-left', '4px');
  //       $outdiv.find('.linktyfc2').attr('src', './images/langRightCut.png');
  //     } else {
  //       // $outdiv.find('.linktyfc').addClass('glyphicon-arrow-left');
  //       $outdiv.find('.linktyfc1').attr('src', './images/langLeftCut.png');
  //       $outdiv.find('.linktyfc2').attr('src', './images/langCutLeft.png');
  //     }
  //     // var attrF = this.model.attributes;
  //     // var leftpo = { x: attrF.position.x + 70, y: attrF.position.y + 42 };
  //     // var rightpo = { x: attrF.position.x - 70 + attrF.size.width, y: attrF.position.y + 42 };
  //     // var dthis = this;
  //     $outdiv.find('.topsc').html('');
  //     /*pp.virlinkdata = _.sortBy(pp.virlinkdata, function(ijs) {
  //         console.log(Math.sin(ijs.ou.ProoutsigNumber));
  //         return Math.sin(ijs.ou.ProoutsigNumber);
  //     });*/

  //     if (pp.virlinkdata !== undefined) {
  //       // pp.virlinkdata.sort(function(a, b) {
  //       //   return a.ou.ProoutsigNumber - b.ou.ProoutsigNumber;
  //       // });
  //       // $outdiv.find('.tops').append(`
  //       //                 <div style="font-size: 16px;color: #4283bb; display:inline-block;vertical-align: text-bottom;" class="text-center">${pp.virlinkdata.length}</div>
  //       //                 `.trim());
  //       $outdiv.find('#virLen').text(pp.virlinkdata.length);


  //       // $.each(pp.virlinkdata, function(vlindex, vldata) {

  //       //   if (vldata.in === undefined || vldata.ou === undefined) {
  //       //     return true;
  //       //   }
  //       //   if (vlindex === 6) {
  //       //     $outdiv.find('.topsc').append(`
  //       //                 <div style="font-size: 18px;font-weight: 900;height: 20px;line-height: 0;color: #4283bb;margin-top: -15px;" class="text-center">......</div>
  //       //                 `.trim());
  //       //     return false;
  //       //   }
  //       //   $outdiv.find('.topsc').append(`
  //       //                 <div style="visibility: hidden;" class="virport" data-ind="${vlindex}" data-data="${vldata}"><div class="leftsd"></div><div class="rightsd"></div></div>
  //       //                 `.trim());

  //       //   let letftf, rightf;
  //       //   if (pp.sigFlow === 'out') {
  //       //     rightf = vldata.in.ProinsigCustomname;
  //       //     letftf = vldata.ou.ProoutsigCustomname;
  //       //   } else {
  //       //     rightf = vldata.ou.ProoutsigCustomname;
  //       //     letftf = vldata.in.ProinsigCustomname;
  //       //   }
  //       //   if (letftf === undefined) {
  //       //     letftf = '';
  //       //   }
  //       //   if (rightf === undefined) {
  //       //     rightf = '';
  //       //   }
  //       //   let camo = new joint.dia.Link({
  //       //     markup: [
  //       //       '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
  //       //       '<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>',
  //       //       '<path class="marker-target" fill="black" stroke="black" d="M 0 0 0 0"/>',
  //       //       '<path class="connection-wrap" d="M 0 0 0 0"/>',
  //       //       '<g class="labels"/>',
  //       //       '<g class="marker-vertices"/>',
  //       //       '<g class="marker-arrowheads"/>',
  //       //       '<g class="link-tools"/>'
  //       //     ].join(''),
  //       //     toolMarkup: [
  //       //       '<g class="link-tool">',
  //       //       '</g>'
  //       //     ].join(''),
  //       //     labelMarkup: [
  //       //       '<g class="label">',
  //       //       '<rect />',
  //       //       '<text />',
  //       //       '<circle />',
  //       //       '</g>'
  //       //     ].join(''),
  //       //     arrowheadMarkup: [
  //       //       '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
  //       //       '</g>'
  //       //     ].join(''),
  //       //     vertexMarkup: 'none',
  //       //     source: leftpo,
  //       //     target: rightpo,
  //       //     labels: [{
  //       //       position: { distance: .1, offset: { x: -40, y: -5 } },
  //       //       attrs: {
  //       //         rect: {
  //       //           stroke: null,
  //       //           'stroke-width': 0,
  //       //           rx: 5,
  //       //           ry: 5,
  //       //           opacity: 0,
  //       //           fill: '#4283bb'
  //       //         },
  //       //         text: {
  //       //           text: letftf,
  //       //           'font-weight': 'lighter',
  //       //           'font-variant': 'small-caps',
  //       //           'font-size': 10,
  //       //           fill: '#4283bb',
  //       //           'ref-x': .5,
  //       //           'ref-y': .5,
  //       //           'text-anchor': 'middle',
  //       //           'y-alignment': 'middle',
  //       //           'font-family': 'Arial, helvetica, sans-serif'
  //       //         }
  //       //       }
  //       //     }, {
  //       //       position: { distance: .9, offset: { x: 40, y: -5 } },
  //       //       attrs: {
  //       //         rect: {
  //       //           stroke: null,
  //       //           'stroke-width': 0,
  //       //           rx: 5,
  //       //           ry: 5,
  //       //           opacity: 0,
  //       //           fill: '#4283bb'
  //       //         },
  //       //         text: {
  //       //           text: rightf,
  //       //           'font-weight': 'lighter',
  //       //           'font-variant': 'small-caps',
  //       //           'font-size': 10,
  //       //           fill: '#4283bb',
  //       //           'ref-x': .9,
  //       //           'ref-y': .5,
  //       //           'text-anchor': 'middle',
  //       //           'y-alignment': 'middle',
  //       //           'font-family': 'Arial, helvetica, sans-serif'
  //       //         }
  //       //       }
  //       //     }],
  //       //     attrs: {
  //       //       '.connection': { stroke: '#306796' }
  //       //     }
  //       //   });
  //       //   camo.addTo(dthis.model.graph);
  //       //   leftpo.y += 29;
  //       //   rightpo.y += 29;
  //       // });
  //     }
  //     // $outdiv.find('.topsc').show();
  //   }

  // });
  // joint.shapes.basic.DeviceVir = joint.shapes.basic.Generic.extend({
  //   markup: '<g class="rotatable">' +
  //     '<g class="form">' +
  //     '<foreignObject class="gooseOut">' +
  //     '<div xmlns="http://www.w3.org/1999/xhtml" class="goosebody">' +
  //     '<div class="topTitle">' +
  //     '<div class="lefts">智能装置</div>' +
  //     '<div class="rights">智能终端</div>' +
  //     '</div>' +
  //     '<div class="123">' +
  //     '<div class="icdContain">' +
  //     '<span class=""></span>' +
  //     '</div>' +
  //     '<div class="deviceContain">' +
  //     '<span class=""></span>' +
  //     '</div>' +
  //     '<div class="IcdVersions">' +
  //     '<span class=""></span>' +
  //     '</div>' +
  //     '<div class="IcdFactorys">' +
  //     '<span class=""></span>' +
  //     '</div>' +
  //     '</div>' +

  //     '</div>' +
  //     '</foreignObject>' +
  //     '</g>' +
  //     '</g>',
  //   defaults: joint.util.deepSupplement({
  //     type: 'basic.DeviceVir',
  //     dataDev: null,
  //     dbMenu: function(cellview) {
  //       isEdit = 0;
  //       var dtd = cellview.model.attributes.dataDev;
  //       dtds = dtd;
  //       console.log('跳转界面', dtds.Guid);
  //       var a = location.href;
  //       // window.location.href=a+'#initgoose/'+dtds.Guid;
  //       console.log('跳转地址', a + '#initgoose/' + dtds.Guid);
  //       window.location.href = 'http://localhost:9008/svgport/index.html#initgoose/' + dtds.Guid;
  //       console.log('新跳转地址', 'http://localhost:9008/svgport/index.html#initgoose/' + dtds.Guid);
  //     }
  //   }, joint.shapes.basic.Generic.prototype.defaults)
  // });
  // joint.shapes.basic.DeviceVirView = joint.dia.ElementView.extend({
  //   update: function(cell, renderingOnlyAttrs) {

  //     var allAttrs = this.model.get('attrs');

  //     var rotatable = this.rotatableNode;
  //     if (rotatable) {
  //       var rotation = rotatable.attr('transform');
  //       rotatable.attr('transform', '');
  //     }

  //     var relativelyPositioned = [];
  //     var nodesBySelector = {};
  //     var $outdiv = vE(this).node.$el.find('.goosebody');
  //     _.each(renderingOnlyAttrs || allAttrs, function(attrs, selector) {

  //       // Elements that should be updated.
  //       var $selected = this.findBySelector(selector);

  //       // No element matched by the `selector` was found. We're done then.
  //       if ($selected.length === 0) {
  //         return;
  //       }

  //       nodesBySelector[selector] = $selected;

  //       // Special attributes are treated by JointJS, not by SVG.
  //       var specialAttributes = this.SPECIAL_ATTRIBUTES.slice();

  //       // If the `filter` attribute is an object, it is in the special JointJS filter format and so
  //       // it becomes a special attribute and is treated separately.
  //       if (_.isObject(attrs.filter)) {

  //         specialAttributes.push('filter');
  //         this.applyFilter($selected, attrs.filter);
  //       }

  //       // If the `fill` or `stroke` attribute is an object, it is in the special JointJS gradient format and so
  //       // it becomes a special attribute and is treated separately.
  //       if (_.isObject(attrs.fill)) {

  //         specialAttributes.push('fill');
  //         this.applyGradient($selected, 'fill', attrs.fill);
  //       }
  //       if (_.isObject(attrs.stroke)) {

  //         specialAttributes.push('stroke');
  //         this.applyGradient($selected, 'stroke', attrs.stroke);
  //       }

  //       // Make special case for `text` attribute. So that we can set text content of the `<text>` element
  //       // via the `attrs` object as well.
  //       // Note that it's important to set text before applying the rest of the final attributes.
  //       // Vectorizer `text()` method sets on the element its own attributes and it has to be possible
  //       // to rewrite them, if needed. (i.e display: 'none')
  //       if (!_.isUndefined(attrs.text)) {

  //         $selected.each(function() {

  //           vE(this).text(attrs.text + '', {
  //             lineHeight: attrs.lineHeight,
  //             textPath: attrs.textPath,
  //             annotations: attrs.annotations
  //           });
  //         });
  //         specialAttributes.push('lineHeight', 'textPath', 'annotations');
  //       }

  //       // Set regular attributes on the `$selected` subelement. Note that we cannot use the jQuery attr()
  //       // method as some of the attributes might be namespaced (e.g. xlink:href) which fails with jQuery attr().
  //       var finalAttributes = _.omit(attrs, specialAttributes);

  //       $selected.each(function() {

  //         vE(this).attr(finalAttributes);
  //       });

  //       // `port` attribute contains the `id` of the port that the underlying magnet represents.
  //       if (attrs.port) {

  //         $selected.attr('port', _.isUndefined(attrs.port.id) ? attrs.port : attrs.port.id);
  //       }

  //       // `style` attribute is special in the sense that it sets the CSS style of the subelement.
  //       if (attrs.style) {

  //         $selected.css(attrs.style);
  //       }

  //       if (!_.isUndefined(attrs.html)) {

  //         $selected.each(function() {

  //           $(this).html(attrs.html + '');
  //         });
  //       }

  //       // Special `ref-x` and `ref-y` attributes make it possible to set both absolute or
  //       // relative positioning of subelements.
  //       if (!_.isUndefined(attrs['ref-x']) ||
  //         !_.isUndefined(attrs['ref-y']) ||
  //         !_.isUndefined(attrs['ref-dx']) ||
  //         !_.isUndefined(attrs['ref-dy']) ||
  //         !_.isUndefined(attrs['x-alignment']) ||
  //         !_.isUndefined(attrs['y-alignment']) ||
  //         !_.isUndefined(attrs['ref-width']) ||
  //         !_.isUndefined(attrs['ref-height'])
  //       ) {

  //         _.each($selected, function(el, index, list) {
  //           var $el = $(el);
  //           // copy original list selector to the element
  //           $el.selector = list.selector;
  //           relativelyPositioned.push($el);
  //         });
  //       }

  //     }, this);

  //     // We don't want the sub elements to affect the bounding box of the root element when
  //     // positioning the sub elements relatively to the bounding box.
  //     //_.invoke(relativelyPositioned, 'hide');
  //     //_.invoke(relativelyPositioned, 'show');

  //     // Note that we're using the bounding box without transformation because we are already inside
  //     // a transformed coordinate system.
  //     var size = this.model.get('size');
  //     var bbox = {
  //       x: 0,
  //       y: 0,
  //       width: size.width,
  //       height: size.height
  //     };

  //     renderingOnlyAttrs = renderingOnlyAttrs || {};

  //     _.each(relativelyPositioned, function($el) {

  //       // if there was a special attribute affecting the position amongst renderingOnlyAttributes
  //       // we have to merge it with rest of the element's attributes as they are necessary
  //       // to update the position relatively (i.e `ref`)
  //       var renderingOnlyElAttrs = renderingOnlyAttrs[$el.selector];
  //       var elAttrs = renderingOnlyElAttrs ? _.merge({}, allAttrs[$el.selector], renderingOnlyElAttrs) : allAttrs[$el.selector];

  //       this.positionRelative(vE($el[0]), bbox, elAttrs, nodesBySelector);

  //     }, this);

  //     if (rotatable) {

  //       rotatable.attr('transform', rotation || '');
  //     }
  //     // var bboxf = this.getBBox();
  //     if (this.model.attributes.dataDev.Insig === null && this.model.attributes.dataDev.Outsig === null) {
  //       $outdiv.addClass('list-group-item-warning');
  //     }
  //     $outdiv.find('.rights').text(this.model.attributes.dataDev.ProdevName)
  //       .attr('title', this.model.attributes.dataDev.ProdevName);
  //     var editIcdName;
  //     var editDeviceName;
  //     var editIcdVersion;
  //     var editIcdFactory;
  //     if (this.model.attributes.dataDev.IcdName) {
  //       if (this.model.attributes.dataDev.IcdName.length > 10) {
  //         editIcdName = this.model.attributes.dataDev.IcdName.slice(0, 11) + '...'
  //       } else {
  //         editIcdName = this.model.attributes.dataDev.IcdName;
  //       }
  //       $outdiv.find('.icdContain').text(editIcdName)
  //         .attr('title', this.model.attributes.dataDev.IcdName);
  //     }
  //     if (this.model.attributes.dataDev.ModelNumber) {
  //       if (this.model.attributes.dataDev.ModelNumber.length > 10) {
  //         editDeviceName = this.model.attributes.dataDev.ModelNumber.slice(0, 11) + '...'
  //       } else {
  //         editDeviceName = this.model.attributes.dataDev.ModelNumber;
  //       }
  //       $outdiv.find('.deviceContain').text(editDeviceName)
  //         .attr('title', this.model.attributes.dataDev.ModelNumber);
  //     }
  //     if (this.model.attributes.dataDev.IcdVersion) {
  //       if (this.model.attributes.dataDev.IcdVersion.length > 10) {
  //         editIcdVersion = this.model.attributes.dataDev.IcdVersion.slice(0, 11) + '...'
  //       } else {
  //         editIcdVersion = this.model.attributes.dataDev.IcdVersion;
  //       }
  //       $outdiv.find('.IcdVersions').text(editIcdVersion)
  //         .attr('title', this.model.attributes.dataDev.IcdVersion);
  //     }
  //     if (this.model.attributes.dataDev.IcdFactory) {
  //       if (this.model.attributes.dataDev.IcdFactory.length > 10) {
  //         editIcdFactory = this.model.attributes.dataDev.IcdFactory.slice(0, 11) + '...'
  //       } else {
  //         editIcdFactory = this.model.attributes.dataDev.IcdFactory
  //       }
  //       $outdiv.find('.IcdFactorys').text(editIcdFactory)
  //         .attr('title', this.model.attributes.dataDev.IcdFactory);
  //     }
  //     var deviceId = $outdiv.find('.rights').text();
  //     var heights = $('.123').parents().parents().attr('height') - 40;
  //     $('.111').css('height', 'heights');
  //     $outdiv.find('.123').css('height', heights);
  //     $outdiv.find('.123').css('vertical-align', 'middle');
  //     $outdiv.find('.123').css('display', 'table-cell');
  //     $outdiv.find('.123').css('width', '300px');
  //     if (deviceId === centIedName) {
  //       $outdiv.css('background-color', '#CCF1FF');
  //     }
  //     $outdiv.find('.deviceContain').off('mouseover').on('mouseover', function() {
  //       $('.panelS').find('.popover-title').hide();
  //       $('.panelS').find('.popover-content').text($(this).attr('title'));
  //       let findbuidthis = $(this);
  //       $('.panelS').css({
  //         top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
  //         left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
  //         width: 'auto',
  //         height: 'auto',
  //         fontSize: '12px'
  //       });
  //       $('.panelS').show();
  //     });
  //     $outdiv.find('.icdContain').off('mouseover').on('mouseover', function() {
  //       $('.panelS').find('.popover-title').hide();
  //       $('.panelS').find('.popover-content').text($(this).attr('title'));
  //       let findbuidthis = $(this);
  //       $('.panelS').css({
  //         top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
  //         left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
  //         width: 'auto',
  //         height: 'auto',
  //         fontSize: '12px'
  //       });
  //       $('.panelS').show();
  //     });
  //     $outdiv.find('.IcdVersions').off('mouseover').on('mouseover', function() {
  //       $('.panelS').find('.popover-title').hide();
  //       $('.panelS').find('.popover-content').text($(this).attr('title'));
  //       let findbuidthis = $(this);
  //       $('.panelS').css({
  //         top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
  //         left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
  //         width: 'auto',
  //         height: 'auto',
  //         fontSize: '12px'
  //       });
  //       $('.panelS').show();
  //     });
  //     $outdiv.find('.IcdFactorys').off('mouseover').on('mouseover', function() {
  //       $('.panelS').find('.popover-title').hide();
  //       $('.panelS').find('.popover-content').text($(this).attr('title'));
  //       let findbuidthis = $(this);
  //       $('.panelS').css({
  //         top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
  //         left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
  //         width: 'auto',
  //         height: 'auto',
  //         fontSize: '12px'
  //       });
  //       $('.panelS').show();
  //     });



  //     $outdiv.find('.rights').off('mouseover').on('mouseover', function() {
  //       $('.panelS').find('.popover-title').hide();
  //       $('.panelS').find('.popover-content').text($(this).attr('title'));
  //       let findbuidthis = $(this);
  //       $('.panelS').css({
  //         top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
  //         left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
  //         width: 'auto',
  //         height: 'auto',
  //         fontSize: '12px'
  //       });
  //       $('.panelS').show();
  //     });
  //   }

  // });
})(window.jQuery, window.joint, window.V, window._, window.parent.window, window.GFC, window.bootbox);