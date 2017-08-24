'use strict';
(function($, joint, GFC, _, ROOF) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  joint.dia.Info = joint.dia.Cell.extend({
    init: function(paper, bayId) {
      window.linkvv = 20;
      window.pushLinkX = [];
      window.pushLinkY = [];
      let aBgroupStr = `<div class="AB-group btn-group" style="display:none;">
                                    <button type="button" class="btn btn-default">A套</button>
                                    <button type="button" class="btn btn-default">B套</button>
                                </div>`;
      $('.AB-group').remove();
      $('body').append(aBgroupStr);
      $('#loading').css({ display: 'block' });
      var getTypicalBaySignalFlow = ROOF.bay.GetTypicalBaySignalFlow;
      if ($('.descheme-right-content-b', window.parent.document).is(':visible')) {
        getTypicalBaySignalFlow = ROOF.typdesign.GetSignalFlowByTypicalDesginBay;
      }
      getTypicalBaySignalFlow(bayId, function(obj) {
        if (obj.status) {
          var datas = $.parseJSON(obj.signalflows_json);
          var centerX = 5000;
          var centerY = 5000;
          var nolinkCell = [];
          //重复的连线进行去重
          if (datas.devices === null || datas.devices.length === 0) {
            GFC.showWarning('这个间隔没有装置数据！');
            $('#loading').css({ display: 'none' });
            return;
          } else {
            datas.devices = _.filter(datas.devices, function(numb) {
              return numb.NodeType !== 'N';
            });
          }
          if (datas.connections === null || datas.connections.length === 0) {
            GFC.showWarning('这个间隔没有信息流数据！');
            $.each(datas.devices, function(indd, indatas) {
              nolinkCell.push({
                id: indatas.Guid,
                type: 'devs.InfomationDev',
                size: { width: 140, height: 70 },
                devDatas: indatas,
                bayId: bayId,
                attrs: {
                  '.body': {
                    width: 140,
                    height: 70,
                    fill: {
                      type: 'linearGradient',
                      stops: [
                        { offset: '0%', color: '#138AC0' },
                        { offset: '20%', color: '#138AC8' },
                        { offset: '40%', color: '#138ACB' },
                        { offset: '60%', color: '#138AC8' },
                        { offset: '80%', color: '#138AC0' }
                      ],
                      attrs: { x1: '5%', y1: '5%', x2: '5%', y2: '50%' }
                    },
                    'stroke-width': 0
                  },
                  '.labels': {
                    text: joint.util.breakText(indatas.ProdevName, { width: 120, height: 60 }),
                    fill: '#ffffff',
                    'font-size': 14,
                    'margin-bottom':5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'font-family': 'Arial, helvetica, sans-serif',
                    'ref-y': .5,
                    'ref-x': .5
                  },
                  '.inPorts rect': {
                    fill: '#8980bc',
                    stroke: '#665ba7',
                    x: -20,
                    y: 30,
                    width: 100,
                    height: 24
                  },
                  '.outPorts rect': {
                    fill: '#8980bc',
                    stroke: '#665ba7',
                    x: -82,
                    y: 30,
                    width: 100,
                    height: 24
                  },
                  '.inPorts text.port-label': {
                    width: 100,
                    height: 24,
                    fill: '#ffffff',
                    'font-size': 9,
                    x: -20,
                    'ref-x': 50,
                    'ref-y': 44,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'font-family': 'Arial, helvetica, sans-serif'

                  },
                  '.outPorts text.port-label': {
                    fill: '#ffffff',
                    'font-size': 9,
                    x: -82,
                    'ref-x': 50,
                    'ref-y': 44,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'font-family': 'Arial, helvetica, sans-serif'

                  }
                }
              });
            });
            paper.graph.fromJSON({ cells: nolinkCell });
            joint.layout.GridLayout.layout(paper.graph, {
              columns: 4,
              columnWidth: 200,
              rowHeight: 140
            });
            paper.resizePaperScroller();
            $('#loading').css({ display: 'none' });
            return;
          }
          datas.connections = GFC.qcObj(datas.connections);
          var findCenterDev = function(type) {
            var arrychace = [];
            // var changemax;
            if (_.isArray(type)) {
              $.each(datas.devices, function(indec, itemc) {

                if (itemc.NodeType === type[0] || itemc.NodeType === type[1]) {
                  if (itemc.position === undefined) {
                    arrychace.push({ dev: itemc, index: indec });
                  }
                }
              });
            } else {
              $.each(datas.devices, function(indec, itemc) {
                if (itemc.NodeType === type) {
                  if (itemc.position === undefined) {
                    arrychace.push({ dev: itemc, index: indec });
                  }
                }
              });
            }

            $.each(arrychace, function(indexx, itemx) {
              var sendnumber = _.where(datas.connections, { ProjectSenddev: itemx.dev.Guid }).length;
              var recnumber = _.where(datas.connections, { ProjectReceivedev: itemx.dev.Guid }).length;
              itemx.linknumber = sendnumber + recnumber;
            });
            arrychace = _.filter(arrychace, function(num) {
              return num.linknumber !== 0;
            });
            arrychace = _.sortBy(arrychace, 'linknumber');
            return arrychace;
          }; //end筛选中心
          var updT = false;
          var merindexup = 0;
          var merindexdown = 0;
          var centerD = findCenterDev(['I', 'S']);
          var lefterD = findCenterDev(['C']);
          var righterD = findCenterDev(['P']);
          $.each(centerD, function(indec, itemc) {
            var objsd = centerD[centerD.length - 1 - indec];
            if (objsd === undefined) {
              return true;
            }
            if (updT) {
              datas.devices[objsd.index].position = { x: centerX, y: centerY + 240 + merindexdown * 70 };
              merindexdown += 1;
            } else {
              datas.devices[objsd.index].position = { x: centerX, y: centerY - 240 - merindexup * 70 };
              merindexup += 1;
            }
            updT = !updT;
            GFC.noUseF(itemc);

          });
          $.each(lefterD, function(indec, itemc) {
            var objsd = lefterD[lefterD.length - 1 - indec];
            if (objsd === undefined) {
              return true;
            }
            if (updT) {
              datas.devices[objsd.index].position = { x: centerX - 400, y: centerY + 240 + merindexdown * 70 };
              merindexdown += 1;
            } else {
              datas.devices[objsd.index].position = { x: centerX - 400, y: centerY - 240 - merindexup * 70 };
              merindexup += 1;
            }
            updT = !updT;
            GFC.noUseF(itemc);

          });
          $.each(righterD, function(indec, itemc) {
            var objsd = righterD[lefterD.length - 1 - indec];
            if (objsd === undefined) {
              return true;
            }
            if (updT) {
              datas.devices[objsd.index].position = { x: centerX + 400, y: centerY + 240 + merindexdown * 70 };
              merindexdown += 1;
            } else {
              datas.devices[objsd.index].position = { x: centerX + 400, y: centerY - 240 - merindexup * 70 };
              merindexup += 1;
            }
            updT = !updT;
            GFC.noUseF(itemc);

          });
          var cells = [];
          var creatToViewDev = function(dev) {
            if (dev === undefined) {
              return;
            }
            if (_.findWhere(cells, { id: dev.Guid }) !== undefined) {
              return;
            }
            var po;
            if (dev.position === undefined) {
              po = dev.noposotion;
            } else {
              po = dev.position;
            }
            let sendnu = _.where(datas.connections, { ProjectSenddev: dev.Guid });
            let recvnu = _.where(datas.connections, { ProjectReceivedev: dev.Guid });
            let srzh = sendnu.concat(recvnu);
            let inR = [],
              ouR = [];
            if (dev.NodeType === 'C') {
              $.each(srzh, function(srzindex, srzdata) {
                if (srzdata.sender === undefined) {
                  srzdata.sender = _.findWhere(datas.devices, { Guid: srzdata.ProjectSenddev });
                  srzdata.recvder = _.findWhere(datas.devices, { Guid: srzdata.ProjectReceivedev });
                }
                if (srzdata.sender === undefined || srzdata.recvder === undefined) {
                  return true;
                }
                if (srzdata.sender.NodeType === 'C') {
                  ouR.push(srzdata.Guid);
                } else {
                  ouR.push(srzdata.Guid);
                }
              });
            }
            if (dev.NodeType === 'N') {
              $.each(srzh, function(srzindex, srzdata) {
                if (srzdata.sender === undefined) {
                  srzdata.sender = _.findWhere(datas.devices, { Guid: srzdata.ProjectSenddev });
                  srzdata.recvder = _.findWhere(datas.devices, { Guid: srzdata.ProjectReceivedev });
                }
                if (srzdata.sender === undefined || srzdata.recvder === undefined) {
                  return true;
                }
                if (srzdata.sender.NodeType === 'N') {
                  if (srzdata.recvder.NodeType === 'C') {
                    inR.push(srzdata.Guid);
                  } else {
                    ouR.push(srzdata.Guid);
                  }
                } else {
                  if (srzdata.sender.NodeType === 'C') {
                    inR.push(srzdata.Guid);
                  } else {
                    ouR.push(srzdata.Guid);
                  }
                }
              });
            }
            if (dev.NodeType === 'S' || dev.NodeType === 'I') {
              $.each(srzh, function(srzindex, srzdata) {
                if (srzdata.sender === undefined) {
                  srzdata.sender = _.findWhere(datas.devices, { Guid: srzdata.ProjectSenddev });
                  srzdata.recvder = _.findWhere(datas.devices, { Guid: srzdata.ProjectReceivedev });
                }
                if (srzdata.sender === undefined || srzdata.recvder === undefined) {
                  return true;
                }
                if (srzdata.sender === undefined) {
                  inR.push(srzdata.Guid);
                  return true;
                }
                if (srzdata.sender.NodeType === 'S' || srzdata.sender.NodeType === 'I') {
                  if (srzdata.recvder === undefined) {
                    inR.push(srzdata.Guid);
                  } else {
                    if (srzdata.recvder.NodeType === 'C' || srzdata.recvder.NodeType === 'N') {
                      inR.push(srzdata.Guid);
                    } else {
                      ouR.push(srzdata.Guid);
                    }
                  }

                } else {
                  if (srzdata.sender === undefined) {
                    inR.push(srzdata.Guid);
                  } else {
                    if (srzdata.sender.NodeType === 'C' || srzdata.sender.NodeType === 'N') {
                      inR.push(srzdata.Guid);
                    } else {
                      ouR.push(srzdata.Guid);
                    }
                  }

                }
              });
            }
            if (dev.NodeType === 'P') {
              $.each(srzh, function(srzindex, srzdata) {
                if (srzdata.sender === undefined) {
                  srzdata.sender = _.findWhere(datas.devices, { Guid: srzdata.ProjectSenddev });
                  srzdata.recvder = _.findWhere(datas.devices, { Guid: srzdata.ProjectReceivedev });
                }
                if (srzdata.sender === undefined || srzdata.recvder === undefined) {
                  return true;
                }
                if (srzdata.sender === undefined) {
                  inR.push(srzdata.Guid);
                } else {
                  if (srzdata.sender.NodeType === 'P') {
                    inR.push(srzdata.Guid);
                  } else {
                    inR.push(srzdata.Guid);
                  }
                }

              });
            }
            if (dev.NodeType === 'OTHER') {
              $.each(srzh, function(srzindex, srzdata) {
                if (srzdata.sender === undefined) {
                  srzdata.sender = _.findWhere(datas.devices, { Guid: srzdata.ProjectSenddev });
                  srzdata.recvder = _.findWhere(datas.devices, { Guid: srzdata.ProjectReceivedev });
                }
                if (srzdata.sender === undefined || srzdata.recvder === undefined) {
                  return true;
                }
                if (srzdata.sender === undefined) {
                  inR.push(srzdata.Guid);
                } else {
                  if (srzdata.sender.NodeType === 'OTHER') {
                    inR.push(srzdata.Guid);
                  } else {
                    inR.push(srzdata.Guid);
                  }
                }

              });
            }
            cells.push({
              id: dev.Guid,
              type: 'devs.InfomationDev',
              size: { width: 140, height: 70 },
              position: po,
              inPorts: inR,
              outPorts: ouR,
              devDatas: dev,
              bayId: bayId,
              z: -1,
              attrs: {
                '.body': {
                  width: 140,
                  height: 70,
                  fill: {
                    type: 'linearGradient',
                    stops: [
                      { offset: '0%', color: '#138AC0' },
                      { offset: '20%', color: '#138AC8' },
                      { offset: '40%', color: '#138ACB' },
                      { offset: '60%', color: '#138AC8' },
                      { offset: '80%', color: '#138AC0' }
                    ],
                    attrs: { x1: '5%', y1: '5%', x2: '5%', y2: '50%' }
                  },
                  'stroke-width': 0
                },
                '.labels': {
                  text: joint.util.breakText(dev.ProdevName, { width: 120, height: 60 }),
                  fill: '#ffffff',
                  'font-size': 14,
                  'text-anchor': 'middle',
                  'y-alignment': 'middle',
                  'font-family': 'Arial, helvetica, sans-serif',
                  'ref-y': .5,
                  'ref-x': .5
                },
                '.inPorts rect': {
                  'pointer-events': 'none',
                  opacity: 0,
                  fill: '#8980bc',
                  stroke: '#665ba7',
                  x: 0,
                  y: 0,
                  width: 5,
                  height: 5
                },
                '.outPorts rect': {
                  'pointer-events': 'none',
                  opacity: 0,
                  fill: '#8980bc',
                  stroke: '#665ba7',
                  x: 0,
                  y: 0,
                  width: 5,
                  height: 5
                },
                '.inPorts text.port-label': {
                  opacity: 0,
                  width: 100,
                  height: 24,
                  fill: '#ffffff',
                  'font-size': 0,
                  x: 0,
                  'ref-x': 0,
                  'ref-y': 0,
                  'text-anchor': 'middle',
                  'y-alignment': 'middle',
                  'font-family': 'Arial, helvetica, sans-serif'

                },
                '.outPorts text.port-label': {
                  opacity: 0,
                  fill: '#ffffff',
                  'font-size': 0,
                  x: 0,
                  'ref-x': 0,
                  'ref-y': 0,
                  'text-anchor': 'middle',
                  'y-alignment': 'middle',
                  'font-family': 'Arial, helvetica, sans-serif'

                }
              }
            });
          };
          var creatToViewLink = function(linksg) {
            var distanced = 100;
            if (linksg.sender.noposotion !== undefined && linksg.recvder.noposotion !== undefined) {
              if (linksg.sender.noposotion.x === linksg.recvder.noposotion.x) {
                distanced = .5;
              }
            }
            if (linksg.sender.posotion !== undefined && linksg.recvder.posotion !== undefined) {
              if (linksg.sender.posotion.x === linksg.recvder.posotion.x) {
                distanced = .5;
              }
            }
            if (linksg.sender.posotion !== undefined && linksg.recvder.noposotion !== undefined) {
              if (linksg.sender.posotion.x === linksg.recvder.noposotion.x) {
                distanced = .5;
              }
            }
            if (linksg.sender.noposotion !== undefined && linksg.recvder.posotion !== undefined) {
              if (linksg.sender.noposotion.x === linksg.recvder.posotion.x) {
                distanced = .5;
              }
            }
            cells.push({
              id: linksg.Guid,
              type: 'devs.Infolink',
              devDatas: linksg,
              bayId: bayId,
              source: { id: linksg.ProjectSenddev, port: linksg.Guid },
              target: { id: linksg.ProjectReceivedev, port: linksg.Guid },
              textme: linksg.ProjectSigdesc,
              router: {
                name: 'manhattan'
              },
              z: -1,
              labels: [{
                position: { distance: distanced, offset: { x: 0, y: -8 } },
                attrs: {
                  rect: {
                    opacity: 0,
                    stroke: '#ffffff',
                    'stroke-width': 10,
                    rx: 5,
                    ry: 5
                  },
                  foreignobject: {
                    transform: '',
                    width: 180,
                    height: 30
                  },
                  text: {
                    opacity: 0,
                    text: joint.util.breakText(linksg.ProjectSigdesc, { width: 180, height: 30 }),
                    'font-weight': 'lighter',
                    'font-variant': 'small-caps'
                  }
                }
              }]
            });
            creatToViewDev(linksg.sender);
            creatToViewDev(linksg.recvder);
          };
          var nolinkDevX = 5800;
          var nolinkDevY = 5000;
          var nolinkDevNum = 0;
          var nolinkDevT = true;
          $.each(datas.devices, function(indec, itemc) {
            var stnom = 0;
            if (nolinkDevNum === 0) {
              stnom = 0;
            } else {
              stnom = 300;
            }
            if (itemc.position === undefined) {
              if (nolinkDevT) {
                itemc.noposotion = { x: nolinkDevX, y: nolinkDevY - stnom - nolinkDevNum * 70 };
              } else {
                itemc.noposotion = { x: nolinkDevX, y: nolinkDevY + stnom + nolinkDevNum * 100 };
              }
              nolinkDevNum += 1;
              nolinkDevT = !nolinkDevT;
              creatToViewDev(itemc);
            }
          });
          var outlinkDev = [];
          $.each(datas.connections, function(inlink, dlink) {
            dlink.sender = _.findWhere(datas.devices, { Guid: dlink.ProjectSenddev });
            dlink.recvder = _.findWhere(datas.devices, { Guid: dlink.ProjectReceivedev });
            if (dlink.sender === undefined || dlink.recvder === undefined) {
              outlinkDev.push(dlink);
              creatToViewDev(dlink.sender);
              creatToViewDev(dlink.recvder);
              return true;
            }
            creatToViewLink(dlink);
          });
          console.log(datas);
          if (cells.length === 0) {
            GFC.showError('间隔数据非法！');
            $('#loading').css({ display: 'none' });
            return;
          }
          let Adev = [];
          let Bdev = [];
          let Nodev = [];
          $.each(cells, function(abindex, abdata) {
            if (abdata.type !== 'devs.InfomationDev') {
              return true;
            }
            if (abdata.devDatas.ProdevName.charAt(abdata.devDatas.ProdevName.length - 1) === 'A') {
              Adev.push(abdata);
              return true;
            }
            if (abdata.devDatas.ProdevName.charAt(abdata.devDatas.ProdevName.length - 1) === 'B') {
              Bdev.push(abdata);
              return true;
            }
            Nodev.push(abdata);
            // Bdev.push(abdata);
            // Adev.push(abdata);
          });
          $.each(cells, function(sigabindex, sigabdata) {
            if (sigabdata.type === 'devs.InfomationDev') {
              return true;
            }
            if (_.findWhere(cells, { id: sigabdata.devDatas.ProjectSenddev }) === undefined || _.findWhere(cells, { id: sigabdata.devDatas.ProjectReceivedev }) === undefined) {
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) === 'A' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) === 'A') {
              Adev.push(sigabdata);
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) === 'B' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) === 'B') {
              Bdev.push(sigabdata);
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) === 'A' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) === 'B') {
              Bdev.push(sigabdata);
              Adev.push(sigabdata);
              Adev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectSenddev }));
              Bdev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectReceivedev }));
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) === 'B' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) === 'A') {
              Bdev.push(sigabdata);
              Adev.push(sigabdata);
              Adev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectReceivedev }));
              Bdev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectSenddev }));
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) === 'A' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) !== 'A') {
              Adev.push(sigabdata);
              Adev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectSenddev }));
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) === 'B' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) !== 'B') {
              Bdev.push(sigabdata);
              Bdev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectSenddev }));
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) !== 'A' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) === 'A') {
              Adev.push(sigabdata);
              Adev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectReceivedev }));
              return true;
            }
            if (sigabdata.devDatas.RecvdevName.charAt(sigabdata.devDatas.RecvdevName.length - 1) !== 'B' && sigabdata.devDatas.SenddevName.charAt(sigabdata.devDatas.SenddevName.length - 1) === 'B') {
              Bdev.push(sigabdata);
              Bdev.push(_.findWhere(cells, { id: sigabdata.devDatas.ProjectReceivedev }));
              return true;
            }
            Nodev.push(sigabdata);
          });
          var runOuterlink = function() {
            var pushVertice = [];
            $.each(outlinkDev, function(indexoutlink, dataoutlink) {
              let sendpp, recvpp, vertices = [];
              if (dataoutlink.sender !== undefined) {
                let sendvm = paper.graph.getCell(dataoutlink.sender.Guid);
                if (sendvm === undefined) {
                  return true;
                }
                switch (dataoutlink.sender.NodeType) {
                  case 'P':
                    {
                      sendpp = {
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y
                      };
                      vertices.push({
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y - 18
                      });
                      recvpp = {
                        x: sendvm.attributes.position.x + 140,
                        y: sendvm.attributes.position.y - 18
                      };
                    }
                    break;
                  case 'OTHER':
                    {
                      sendpp = {
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y
                      };
                      vertices.push({
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y - 18
                      });
                      recvpp = {
                        x: sendvm.attributes.position.x + 140,
                        y: sendvm.attributes.position.y - 18
                      };
                    }
                    break;
                  case 'S':
                    {
                      sendpp = {
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y
                      };
                      vertices.push({
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y - 18
                      });
                      recvpp = {
                        x: sendvm.attributes.position.x + 140,
                        y: sendvm.attributes.position.y - 18
                      };
                    }
                    break;
                  case 'C':
                    {
                      sendpp = {
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y
                      };
                      vertices.push({
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y - 18
                      });
                      recvpp = {
                        x: sendvm.attributes.position.x - 140,
                        y: sendvm.attributes.position.y - 18
                      };
                    }
                    break;
                  case 'I':
                    {
                      sendpp = {
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y
                      };
                      vertices.push({
                        x: sendvm.attributes.position.x,
                        y: sendvm.attributes.position.y - 18
                      });
                      recvpp = {
                        x: sendvm.attributes.position.x - 140,
                        y: sendvm.attributes.position.y - 18
                      };
                    }
                    break;
                }
              } else {
                let recvdvm = paper.graph.getCell(dataoutlink.recvder.Guid);
                if (recvdvm === undefined) {
                  return true;
                }
                switch (dataoutlink.recvder.NodeType) {
                  case 'P':
                    {
                      recvpp = {
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height
                      };
                      vertices.push({
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      });
                      sendpp = {
                        x: recvdvm.attributes.position.x + 140,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      };
                    }
                    break;
                  case 'OTHER':
                    {
                      recvpp = {
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height
                      };
                      vertices.push({
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      });
                      sendpp = {
                        x: recvdvm.attributes.position.x + 140,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      };
                    }
                    break;
                  case 'S':
                    {
                      recvpp = {
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height
                      };
                      vertices.push({
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      });
                      sendpp = {
                        x: recvdvm.attributes.position.x + 140,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      };
                    }
                    break;
                  case 'C':
                    {
                      recvpp = {
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height
                      };
                      vertices.push({
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      });
                      sendpp = {
                        x: recvdvm.attributes.position.x - 140,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      };
                    }
                    break;
                  case 'I':
                    {
                      recvpp = {
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height
                      };
                      vertices.push({
                        x: recvdvm.attributes.position.x,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      });
                      sendpp = {
                        x: recvdvm.attributes.position.x - 140,
                        y: recvdvm.attributes.position.y + recvdvm.attributes.size.height + 18
                      };
                    }
                    break;
                }
              }
              if (_.findWhere(pushVertice, { x: vertices[0].x, y: vertices[0].y }) !== undefined) {
                if (dataoutlink.sender !== undefined) {
                  for (let i = vertices[0].y; i < 10000; i -= 24) {
                    if (_.findWhere(pushVertice, { x: vertices[0].x, y: i }) === undefined) {
                      vertices[0].y = i;
                      break;
                    }
                  }
                  //vertices[0].y -= 24;
                  recvpp.y = vertices[0].y;
                } else {
                  for (let i = vertices[0].y; i < 10000; i += 24) {
                    if (_.findWhere(pushVertice, { x: vertices[0].x, y: i }) === undefined) {
                      vertices[0].y = i;
                      break;
                    }
                  }
                  sendpp.y = vertices[0].y;
                }
              }
              let distancedup = 50;
              var nam;
              if (dataoutlink.sender !== undefined) {
                distancedup = -50;
              }
              if(dataoutlink.sender === undefined){
                nam = dataoutlink.ProjectSigdesc +'__'+ dataoutlink.SenddevName;
              }else if(dataoutlink.recvder === undefined){
                nam = dataoutlink.ProjectSigdesc +'__'+ dataoutlink.RecvdevName;
              }
              pushVertice.push(vertices[0]);
              let camo = new joint.shapes.devs.Infolink({
                id: dataoutlink.Guid,
                devDatas: dataoutlink,
                source: sendpp,
                target: recvpp,
                vertices: vertices,
                // textme: dataoutlink.ProjectSigdesc,
                textme: nam,
                labels: [{
                  position: { distance: distancedup, offset: { x: 0, y: -8 } },
                  attrs: {
                    rect: {
                      stroke: null,
                      'stroke-width': 0,
                      opacity: 0,
                      rx: 5,
                      ry: 5
                    },
                    text: {
                      text: joint.util.breakText(dataoutlink.ProjectSigdesc, { width: 180, height: 30 }),
                      fill: '#306796',
                      'font-size': '12',
                      'font-variant': 'small-caps',
                      opacity: 0
                    }
                  }
                }],
                attrs: {
                  '.marker-target': {
                    fill: '#306796',
                    stroke: null,
                    d: 'M 10 0 L 0 5 L 10 10 z'
                  },
                  '.connection': { stroke: '#306796', opacity: 0.3, 'stroke-width': 3, 'stroke-dasharray': '5 2' }
                }
              });
              // camo.addTo(paper.graph);
            });
          };
          var runToPaper = function(runArrys) {
            let sortCells = [];
            let findCells = runArrys;
            let linkCache = [];
            $.each(findCells, function(indexfin, itemfin) {
              if (itemfin.type === 'devs.InfomationDev') {
                if (_.where(sortCells, { id: itemfin.id }).length === 0) {
                  let findXs = _.filter(_.where(findCells, { type: 'devs.InfomationDev' }), function(numsf) {
                    return numsf.position.x === itemfin.position.x;
                  });
                  if (findXs.length === 0) {
                    return true;
                  }
                  findXs.sort(function(a, b) {
                    return a.position.y > b.position.y;
                  });
                  $.each(findXs, function(indexxs, itemxs) {
                    if (itemxs.bottomYc !== undefined) {
                      return true;
                    }
                    let portheight = itemxs.inPorts.length;
                    if (itemxs.outPorts.length > portheight) {
                      portheight = itemxs.outPorts.length;
                    }
                    if (portheight * 60 > itemxs.size.height) {
                      if (indexxs === 0) {
                        itemxs.bottomYc = itemxs.position.y + (portheight * 60);
                      } else {
                        itemxs.position.y = findXs[indexxs - 1].bottomYc + 240;
                        itemxs.bottomYc = itemxs.position.y + (portheight * 60);
                      }
                    } else {
                      if (indexxs === 0) {
                        itemxs.bottomYc = itemxs.position.y + itemxs.size.height;
                      } else {
                        itemxs.position.y = findXs[indexxs - 1].bottomYc + 240;
                        itemxs.bottomYc = itemxs.position.y + itemxs.size.height;
                      }
                    }

                  });
                  sortCells = sortCells.concat(findXs);
                }
              } else {
                linkCache.push(itemfin);
              }

            });
            paper.graph.fromJSON({ cells: sortCells.concat(linkCache) });
            return sortCells.concat(linkCache);
          };
          var rcell = Adev.concat(Nodev);
          var rcelle = Bdev.concat(Nodev);
          $('.AB-group').find('button').off('click').on('click', function() {
            window.linkvv = 20;
            window.pushLinkX = [];
            window.pushLinkY = [];
            if ($(this).index() === 0) {

              rcell = runToPaper(rcell);
              $('#loading').css({ display: 'none' });
              if (_.findWhere(rcell, { type: 'devs.Infolink' }) === undefined && outlinkDev.length === 0) {
                joint.layout.GridLayout.layout(paper.graph, {
                  columns: 4,
                  columnWidth: 200,
                  rowHeight: 140
                });
              }
              paper.resizePaperScroller();
            } else {
              rcelle = runToPaper(rcelle);
              if (_.findWhere(Bdev.concat(rcelle), { type: 'devs.Infolink' }) === undefined && outlinkDev.length === 0) {
                joint.layout.GridLayout.layout(paper.graph, {
                  columns: 4,
                  columnWidth: 200,
                  rowHeight: 140
                });
              }
              paper.resizePaperScroller();
            }
            runOuterlink();
          });
          if (Adev.length === 0 && Bdev.length === 0) {
            cells = runToPaper(cells);
            $('#loading').css({ display: 'none' });
            paper.resizePaperScroller();
            $('.AB-group').hide();
            runOuterlink();
          } else {
            $('.AB-group').show();
            $('.AB-group').find('button').eq(0).trigger('click');
          }
        } else {
          GFC.showError('获取装置列表失败:' + obj.err_msg);
        }
      });

    }
  });
})(window.jQuery, window.joint, window.GFC, window._, window.parent.window);
