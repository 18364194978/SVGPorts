'use strict';
(function($, joint, ROOF, GFC, _, vE) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  joint.shapes.basic.GPPort = joint.shapes.basic.Generic.extend({//other_panel光配端子
    markup: '<g class="rotatable" fill="none"><g class="scalable"></g><text class="port-label"/><circle /><rect /></g>',
    defaults: joint.util.deepSupplement({
      type: 'basic.GPPort',
      rightMenu: {
        centerMenu: {
          name: '释放', //释放光配
          fc: function(cellView) {
            var ViewModel = cellView.model;
            if (ViewModel.attributes.projectOpticalcableGuid === undefined) {
              GFC.showError('转接点不能被释放！');
              return;
            }
            if (ViewModel.attributes.projectOpticalcableGuid !== '') {
              GFC.showError('组缆端子不能被释放！');
              return;
            }
            $('.modal-body').text('确认释放光配?');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();
            cellView.update();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var releaseLightDistribution = ROOF.physical.ReleaseLightDistribution;
              releaseLightDistribution(ViewModel.id, function(obj) {
                if (obj.status) {
                  $('.main-modal').modal('hide');
                  GFC.reload();
                } else {
                  GFC.showError(obj.err_msg);
                }

              });
            });
          }
        },
        otherMenu: [{
          name: '上移',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            $('.modal-body').text('确认上移该光配?');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();
            cellView.update();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var fiberDistFrameMove = ROOF.physical.FiberDistFrameMove;
              fiberDistFrameMove(ViewModel.id, 'UP', function(obj) {
                if (obj.status) {
                  $('.main-modal').modal('hide');
                  GFC.reload();
                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            });
          }
        }, {
          name: '下移',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            $('.modal-body').text('确认下移该光配?');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();
            cellView.update();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var fiberDistFrameMove = ROOF.physical.FiberDistFrameMove;
              fiberDistFrameMove(ViewModel.id, 'DOWN', function(obj) {
                if (obj.status) {
                  $('.main-modal').modal('hide');
                  GFC.reload();
                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            });
          }
        }]
      },
      attrs: {
        circle: {
          fill: 'none',
          stroke: 'none',
          cx: 5,
          cy: 5,
          r: 10
        },
        'text.port-label': {
          text: 'dsfafdf',
          fill: '#000000',
          'font-size': 9,
          'ref-x': 0,
          'ref-y': -10,
          'text-anchor': 'middle',
          'y-alignment': 'middle',
          'font-family': 'Arial, helvetica, sans-serif'

        }

      }
    }, joint.shapes.basic.Generic.prototype.defaults)
  });
  joint.shapes.basic.GPMainPort = joint.shapes.basic.Generic.extend({//main_panel光配端子
    markup: '<g class="rotatable" fill="none"><g class="scalable"></g><text class="port-label"/><circle /><rect /></g>',
    defaults: joint.util.deepSupplement({
      type: 'basic.GPPort',
      rightMenu: {
        centerMenu: {
          name: '释放', //释放光配
          fc: function(cellView) {
          }
        },
        otherMenu: [{
          name: '上移',
          fc: function(cellView) {
          }
        }, {
          name: '下移',
          fc: function(cellView) {
          }
        }]
      },
      attrs: {
        circle: {
          fill: '#305497',
          stroke: 'none',
          cx: 5,
          cy: 5,
          r: 7
        },
        'text.port-label': {
          text: 'dsfafdf',
          fill: '#000000',
          'font-size': 9,
          'ref-x': 4,
          'ref-y': -6,
          'text-anchor': 'middle',
          'y-alignment': 'middle',
          'font-family': 'Arial, helvetica, sans-serif'

        }

      }
    }, joint.shapes.basic.Generic.prototype.defaults)
  });
  joint.shapes.basic.LPPort = joint.shapes.basic.Generic.extend({//光缆的port点
    markup: ['<g class="rotatable" fill="none">',
    '<g class="scalable"></g>',
    // '<text class="port-label"/>',//此处为文字展示，先屏蔽
    '<circle />',
    '<rect /></g>'
    ].join(''),
    defaults: joint.util.deepSupplement({
      type: 'basic.GPPort',
      rightMenu: {
        centerMenu: {
          name: '释放', //释放光配
          fc: function(cellView) {
            var ViewModel = cellView.model;
            if (ViewModel.attributes.projectOpticalcableGuid === undefined) {
              GFC.showError('转接点不能被释放！');
              return;
            }
            if (ViewModel.attributes.projectOpticalcableGuid !== '') {
              GFC.showError('组缆端子不能被释放！');
              return;
            }
            $('.modal-body').text('确认释放光配?');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();
            cellView.update();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var releaseLightDistribution = ROOF.physical.ReleaseLightDistribution;
              releaseLightDistribution(ViewModel.id, function(obj) {
                if (obj.status) {
                  $('.main-modal').modal('hide');
                  GFC.reload();
                } else {
                  GFC.showError(obj.err_msg);
                }

              });
            });
          }
        },
        otherMenu: [{
          name: '上移',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            $('.modal-body').text('确认上移该光配?');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();
            cellView.update();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var fiberDistFrameMove = ROOF.physical.FiberDistFrameMove;
              fiberDistFrameMove(ViewModel.id, 'UP', function(obj) {
                if (obj.status) {
                  $('.main-modal').modal('hide');
                  GFC.reload();
                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            });
          }
        }, {
          name: '下移',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            $('.modal-body').text('确认下移该光配?');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();
            cellView.update();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var fiberDistFrameMove = ROOF.physical.FiberDistFrameMove;
              fiberDistFrameMove(ViewModel.id, 'DOWN', function(obj) {
                if (obj.status) {
                  $('.main-modal').modal('hide');
                  GFC.reload();
                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            });
          }
        }]
      },
      attrs: {
        circle: {
          fill: 'none',
          stroke: 'none',
          cx: 5,
          cy: 5,
          r: 10
        },
        'text.port-label': {
          text: 'dsfafdf',
          fill: '#000000',
          'font-size': 9,
          'ref-x': 0,
          'ref-y': -10,
          'text-anchor': 'middle',
          'y-alignment': 'middle',
          'font-family': 'Arial, helvetica, sans-serif'

        }

      }
    }, joint.shapes.basic.Generic.prototype.defaults)
  });
  joint.shapes.basic.RectPort = joint.shapes.basic.Generic.extend({
    markup: '<g class="rotatable">'+
    '<g class="scalable"></g>'+
    '<rect />'+
    '<text class="port-label"/>'+
    '<foreignObject width="24" height="24" x="-20" y="30" class="htIconOut">'+
    '<div xmlns="http://www.w3.org/1999/xhtml" height="24px" class="iconBodys" style="background-color:#00B0F0;text-align:center;">'+
    '<a title="rdgdfgd" class="content-x text-center" style="color:white;font-size: 12;display:inline-block;width:24px;height:24px;line-height: 24px;text-decoration: none;">RX</a>'+
    '</div>'+
    '</foreignObject>'+
    '</g>',
    defaults: joint.util.deepSupplement({
      type: 'basic.RectPort',
      showTopanel: function(cellView) {
        $('.infosig-group').find('button').removeClass('disabled');
        window.assemblyZlink = [];
        if (cellView.model.attributes.devDatas.isclick !== undefined) {
          let poid = cellView.model.id;
          let dvd = cellView.model.attributes.devDatas;
          let tpoid = dvd.phylink.Port2.PortId;
          if (poid === dvd.phylink.Port2.PortId) {
            tpoid = dvd.phylink.Port1.PortId;
          }
          let nuwpanel = {};
          let dvdpostion = window.paper.graph.getCell(cellView.model.attributes.parent);
          window.assemblyz = window.gszz;
          $.each(window.outherPanels.other_panel, function(palindex, pal) {
            let istt = false;
            $.each(pal.devices, function(indexdv, datadv) {
              if (_.findWhere(datadv.ports, { Guid: tpoid }) !== undefined) {
                nuwpanel.devices = [];
                nuwpanel.devices.push(datadv);
                nuwpanel.PanelGuid = pal.PanelGuid;
                nuwpanel.PanelName = pal.PanelName;
                nuwpanel.ports = pal.ports;
                istt = true;
                return false;
              }
              if (_.findWhere(datadv.ports, { Guid: tpoid }) === undefined) {
                if (cellView.model.get('gpportId') !== undefined && _.findWhere(datadv.ports, { Guid: cellView.model.get('gpportId') }) !== undefined) {
                  nuwpanel.devices = [];
                  nuwpanel.devices.push(datadv);
                  nuwpanel.PanelGuid = pal.PanelGuid;
                  nuwpanel.PanelName = pal.PanelName;
                  nuwpanel.ports = pal.ports;
                  istt = true;
                  return false;
                }

              }
            });
            if (istt) {
              return false;
            }
          });
          let fmodels = window.paper.graph.getCells();

          $.each(fmodels, function(cellindex, celldata) {
            if (celldata === undefined) {
              return true;
            }
            if (celldata.attributes.portRemove !== undefined) {
              // window.paper.graph.removeCells();
              celldata.remove();
            }
          });
          if (window.gppPort !== undefined) {
            $.each(window.gppPort, function(indexgpp, datagpp) {
              datagpp.remove();
            });
            window.gppPort = [];
          }
          window.gppPort = [];
          window.tbgraph.clear();
          $('#thb').show();
          let otherpanelv = new joint.shapes.devs.Cabinet({
            z: window.assemblyz += 1,
            id: nuwpanel.PanelGuid,
            portRemove: 1,
            position: { x: 590 + 4000 + 150, y: dvdpostion.attributes.position.y - 50 },
            size: { width: 393, height: 200 },
            inPorts: [],
            outPorts: [],
            devDatas: nuwpanel,
            childequipments: nuwpanel.devices,
            paper: window.paper,
            mainpanel: false,
            attrs: {
              'text.title-class': { text: nuwpanel.PanelName }
            }
          });
          GFC.noUseF(otherpanelv);
          $('#thb').hide();
          window.tbgraph.clear();
          window.assemblyZlink = [];
          $.each(window.nowAssemblylink, function(index, item) {
            //let issourcefind = _.findWhere(dvdpostion.attributes.outPorts, { Guid: item.Port1.PortId });
            //let istargetfind = _.findWhere(dvdpostion.attributes.outPorts, { Guid: item.Port2.PortId });
            window.paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'right', item);
          });
          let directionGport = false;
          $.each(window.zjdOuther, function(indexzjd, itemzjd) {
            let port1Dev = window.paper.graph.getCell(itemzjd.mainPortId);
            let port2Dev = window.paper.graph.getCell(itemzjd.outherPortId);
            if (!port1Dev || !port2Dev) {
              return true;
            }
            let po1Position = port1Dev.attributes.position;
            let po2Position = port2Dev.attributes.position;

            let mathy;
            if (po1Position.y > po2Position.y) {
              mathy = po1Position.y - po2Position.y;
            } else {
              mathy = po2Position.y - po1Position.y;
            }
            if (po1Position.y === po2Position.y || (mathy < 38 && port1Dev.attributes.type !== port2Dev.attributes.type)) {
              let gppy;
              if (mathy < 38 && mathy !== 0) {
                if (po1Position.y > po2Position.y) {
                  gppy = po2Position.y;
                } else {
                  gppy = po1Position.y;
                }
              } else {
                gppy = po1Position.y;
              }
              if (mathy < 48 && (port1Dev.attributes.type === 'basic.RectPort' && port2Dev.attributes.type === 'basic.RectPort')) {
                gppy += 35
              }
              let gpp = new joint.shapes.basic.GPPort({
                portRemove: 1,
                id: itemzjd.portZjId,
                position: { x: 515 + 4000, y: gppy + 35 },
                size: { width: 10, height: 10 },
                devDatas: itemzjd.portZj,
                attrs: {
                  text: {
                    text: `${itemzjd.PanelName}-${itemzjd.portZj.OdfboxName}-${itemzjd.portZj.ProodfName}-${itemzjd.portZj.ProportName}`,
                    'font-size': 9,
                    stroke: '',
                    fill: '#f00',
                    'ref-y': -8,
                    'ref-x': .5
                  },
                  rect: {
                    width: 13,
                    height: 13,
                    rx: 13,
                    ry: 13,
                    fill: '#f00'
                  }
                }
              });
              gpp.addTo(window.paper.graph);
              itemzjd.mainlink.iszl = 1;
              itemzjd.ohterlink.iszl = 1;
              window.paper.conNect(itemzjd.mainlink.Port1.PortId, itemzjd.mainlink.Port2.PortId, 'gl', 'right', itemzjd.mainlink);
              window.paper.conNect(itemzjd.ohterlink.Port1.PortId, itemzjd.ohterlink.Port2.PortId, 'gl', 'right', itemzjd.ohterlink);
            } else {
              let qx = Math.sqrt((Math.pow(po1Position.x, 2) + Math.pow(po2Position.x, 2)) / 2);
              let qy = Math.sqrt((Math.pow(po1Position.y, 2) + Math.pow(po2Position.y, 2)) / 2);
              let textHeight = -12;
              if (directionGport) {
                qx += 70;
                //textHeight = 18;
              } else {
                qx -= 30;
                //textHeight = -14;
              }
              if (mathy < 48 && (port1Dev.attributes.type === 'basic.RectPort' && port2Dev.attributes.type === 'basic.RectPort')) {
                qy += 35
              }
              directionGport = !directionGport;
              let gpp = new joint.shapes.basic.GPPort({
                portRemove: 1,
                id: itemzjd.portZjId,
                position: { x: qx, y: qy },
                size: { width: 10, height: 10 },
                devDatas: itemzjd.portZj,
                attrs: {
                  text: {
                    text: `${itemzjd.PanelName}-${itemzjd.portZj.OdfboxName}-${itemzjd.portZj.ProodfName}-${itemzjd.portZj.ProportName}`,
                    'font-size': 9,
                    stroke: '',
                    fill: '#f00',
                    'ref-y': textHeight,
                    'ref-x': .5
                  },
                  rect: {
                    width: 13,
                    height: 13,
                    rx: 13,
                    ry: 13,
                    fill: '#f00'
                  }
                }
              });
              gpp.addTo(window.paper.graph);
              itemzjd.mainlink.iszl = 2;
              itemzjd.ohterlink.iszl = 2;
              window.paper.conNect(itemzjd.mainlink.Port1.PortId, itemzjd.mainlink.Port2.PortId, 'gl', 'right', itemzjd.mainlink);
              window.paper.conNect(itemzjd.ohterlink.Port1.PortId, itemzjd.ohterlink.Port2.PortId, 'gl', 'right', itemzjd.ohterlink);

            }
          });
          if (window.phySignalFlows !== null) {
            let stepf = 40;
            $.each(window.phySignalFlows, function(sigindex, sigdata) {
              let issourcefind = window.paper.paper.findViewByModel(sigdata.ProjectSenddev);
              let istargetfind = window.paper.paper.findViewByModel(sigdata.ProjectReceivedev);
              if (issourcefind === undefined || istargetfind === undefined) {
                return true;
              }
              if (sigdata.ProjectReceivedev !== dvdpostion.id && sigdata.ProjectSenddev !== dvdpostion.id) {
                return true;
              }
              let vertices = [];
              let selectt = '.sig3';
              let selects = '.sig1';
              if (sigdata.ProjectLinktype === 'Receive') {
                selectt = '.sig4';
                selects = '.sig2';
                if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined && _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                  selectt = '.sig1';
                  selects = '.sig2';
                  let recg = window.paper.graph.getCell(sigdata.ProjectReceivedev);
                  let seng = window.paper.graph.getCell(sigdata.ProjectSenddev);
                  vertices = [{ x: seng.attributes.position.x - stepf, y: seng.attributes.position.y }, { x: recg.attributes.position.x - stepf, y: recg.attributes.position.y + recg.attributes.size.height }];

                } else {
                  selectt = '.sig4';
                  selects = '.sig3';
                  if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined || _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                    selectt = '.sig4';
                    selects = '.sig2';
                  }
                }
              } else {
                selectt = '.sig1';
                selects = '.sig3';
                if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined && _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                  selectt = '.sig2';
                  selects = '.sig1';
                  let recg = window.paper.graph.getCell(sigdata.ProjectReceivedev);
                  let seng = window.paper.graph.getCell(sigdata.ProjectSenddev);
                  vertices = [{ x: seng.attributes.position.x - stepf, y: seng.attributes.position.y }, { x: recg.attributes.position.x - stepf, y: recg.attributes.position.y + recg.attributes.size.height }];
                } else {
                  selectt = '.sig3';
                  selects = '.sig4';
                  if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined || _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                    selectt = '.sig1';
                    selects = '.sig3';
                  }
                }
              }
              stepf += 30;
              let camo = new joint.dia.Link({
                markup: [
                  '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
                  '<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>',
                  '<path class="marker-target" fill="black" stroke="black" d="M 0 0 0 0"/>',
                  '<path class="connection-wrap" d="M 0 0 0 0"/>',
                  '<g class="labels"/>',
                  '<g class="marker-vertices"/>',
                  '<g class="marker-arrowheads"/>',
                  '<g class="link-tools"/>'
                ].join(''),
                toolMarkup: [
                  '<g class="link-tool">',
                  '</g>'
                ].join(''),
                labelMarkup: [
                  '<g class="label">',
                  '<rect />',
                  '<text />',
                  '<circle />',
                  '</g>'
                ].join(''),
                vertexMarkup: 'none',
                arrowheadMarkup: [
                  '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
                  '</g>'
                ].join(''),
                sigshowinfo: sigdata.ProjectSigdesc,
                source: { id: sigdata.ProjectSenddev, selector: selects },
                target: { id: sigdata.ProjectReceivedev, selector: selectt },
                attrs: {
                  '.marker-target': {
                    fill: '#306796',
                    stroke: null,
                    d: 'M 10 0 L 0 5 L 10 10 z'
                  },
                  '.connection': { stroke: '#306796', opacity: 0.3, 'stroke-width': 3, 'stroke-dasharray': '5 2' }
                },
                id: sigdata.Guid,
                vertices: vertices,
                portRemove: 1,
                //connector: { name: 'rounded' },
                labels: [{
                  position: { distance: .4 },
                  attrs: {
                    rect: {
                      stroke: null,
                      'stroke-width': 0,
                      opacity: 0,
                      rx: 5,
                      ry: 5
                    },
                    text: {
                      text: sigdata.ProjectSigdesc,
                      //'font-weight': 'lighter',
                      fill: '#ff0000',
                      opacity: 0,
                      'font-variant': 'small-caps'
                    }
                  }
                }]
              });
              camo.addTo(window.paper.graph);
            });
          }

        }
      },
      rightMenu: {
        centerMenu: {
          name: '编辑', //端口编辑
          fc: function(cellView) {
            var ViewModel = cellView.model;
            var EditStr = '';
            $('.modal-body').html('');
            $('.modal-title').html(this.name);
            EditStr += '<div class="form-group">' +
              '<label for="ProportName">端口信息名称:</label>' +
              '<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.devDatas.ProportName + '" id="ProportName">' +
              '</div>';
            $('.modal-body').html(EditStr);
            $('.main-modal').modal();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              if (!GFC.formValidation($('#ProportName'))) {
                GFC.showError('名称必填!');
                return;
              }
              if (GFC.formValidation($('#ProportName')).length > 12) {
                GFC.showError('端口名称长度不能大于12位!');
                return;
              }
              if (isNaN(parseInt(GFC.formValidation($('#ProportName'))))) {
                GFC.showError('端口名称必须为数字!');
                return;
              }
              var slotObj = {
                Guid: ViewModel.id, //端口id
                PortName: GFC.formValidation($('#ProportName'))
              };
              slotObj.Guid = ViewModel.attributes.devDatas.Guid;
              slotObj.PubbsPubportBcslotGuid = ViewModel.attributes.devDatas.ProbsProportBcslotGuid;
              slotObj.PortName = GFC.formValidation($('#ProportName'));
              slotObj.PortDesc = ViewModel.attributes.devDatas.ProportDesc;
              slotObj.PortMediaType = ViewModel.attributes.devDatas.ProportMediatype;
              slotObj.PortJointType = ViewModel.attributes.devDatas.ProportJointtype;
              slotObj.PortFuncType = ViewModel.attributes.devDatas.ProportFunctiontype;
              slotObj.ProportDesc = ViewModel.attributes.devDatas.ProportDesc;
              var setPubPortInfo = ROOF.devconfig.SetPortInfo;
              setPubPortInfo(slotObj, function(obj) {
                if (obj.status) {
                  ViewModel.attributes.devDatas.ProportName = GFC.formValidation($('#ProportName'));
                  let cjname = cellView.model.attributes.devDatas.ProbsName + '-';
                  let dkname = cellView.model.attributes.devDatas.ProportName + '-';
                  let fcname = cellView.model.attributes.devDatas.ProportFunctiontype + '-';
                  let joname = cellView.model.attributes.devDatas.ProportJointtype +'-';
                  let dename = cellView.model.attributes.devDatas.ProportDesc;
                  let devdesc = cellView.model.attributes.devDatas.ProbsDesc + '-';
                  if (cellView.model.attributes.devDatas.ProbsName === '') {
                    cjname = '';
                    devdesc = '';
                  }
                  cellView.model.attributes.porttts = devdesc + cjname + dkname + fcname + joname + dename; 
                  cellView.model.attributes.attrs.text.text = cjname + dkname + fcname + joname + dename;
                  cellView.update();
                  //GFC.reload();
                  $('.main-modal').modal('hide');
                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            });

          }
        },
        otherMenu: [{
            name: '更换', //更换端口
            fc: function(cellView) {
              var ViewModel = cellView.model;
              var $this = this;
              let AppH = [];
              var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
              getPortsByDeviceId(ViewModel.attributes.parent, function(obj) {
                if (obj.status) {
                  $('.main-modal-body').html('');
                  $('.modal-title').html($this.name);
                  let str = '';
                  $.each(obj.slot_list, function(poindx, podate) {
                    var strc = '';
                    $.each(podate.Port_List, function(index, item) {
                      var spanStr = '',
                        findStr = '',
                        isdisable = '';
                      if (item.c_pd_id !== undefined || item.c_pd_id === '') {
                        let devname;
                        if (item.c_dev_name === undefined) {
                          devname = item.c_ns_name;
                        } else {
                          devname = item.c_dev_name;
                        }
                        findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
                        isdisable = 'disabled';
                      }
                      if (item.c_p1_id !== undefined) {
                        spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
                      }
                      if (podate.BcslotId === '' || podate.ProbsDesc === '') {
                        strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                <span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
                      } else {
                        item.BcslotId = podate.BcslotId;
                        item.ProbsDesc = podate.ProbsDesc;
                        strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${podate.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${podate.ProbsName}-<span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
                      }
                      AppH.push(item);

                    });
                    let soledesc = podate.ProbsDesc;
                    if (soledesc === '') {
                      soledesc = '点击展开';
                    }
                    str += `<div class="panel panel-info" style="border:none;">
                                                <div class="panel-heading" role="tab" id="headingOne-${poindx}">
                                                    <a data-id="${podate.BcslotId}" role="button" data-toggle="collapse" data-parent="#port-solt-list" href="#collapseOne-${poindx}" aria-expanded="true" aria-controls="collapseOne-${poindx}">
                                                     ${soledesc}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${poindx}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-${poindx}">
                                                  <div class="panel-body">
                                                    <div class="list-group">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
                  });
                  let slotll = `<div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                        <div class="panel-group" id="port-solt-list">
                                                        ${str}
                                                        </div>
                                                </div>`;
                  $('.main-modal-body').html(slotll);
                  $('.main-modal').modal();
                  $('.edit-right').off('click').on('click', function() {
                    $('.main-modal').modal('hide');
                  });
                  $('.list-group-item').off('click').on('click', function() {
                    let $thisE = $(this);
                    if ($thisE.hasClass('disabled')) {
                      return;
                    }
                    let changePhyPort = ROOF.physical.ChangePhyPort;
                    changePhyPort(ViewModel.id, $thisE.attr('data-id'), function(objmn) {
                      if (objmn.status) {
                        $('.main-modal').modal('hide');
                        GFC.reload();
                      } else {
                        GFC.showError(objmn.err_msg);
                      }
                    });
                  });

                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            }
          }

        ]
      },
      attrs: {
        rect: {
          fill: '#4283bb',
          stroke: '#4283bb',
          x: -20,
          y: 30,
          width: 100,
          height: 24
        },
        '.iconBody':{
          height:24
        },
        'text.port-label': {
          text: 'dsfafdf',
          width: 100,
          height: 24,
          fill: '#ffffff',
          'font-size': 12,
          x: -20,
          'ref-x': 55,
          'ref-y': 44,
          'text-anchor': 'middle',
          'y-alignment': 'middle',
          'font-family': 'Arial, helvetica, sans-serif'

        }

      }
    }, joint.shapes.basic.Generic.prototype.defaults)
  });
  joint.shapes.basic.RectPortP = joint.shapes.basic.Generic.extend({
    markup: '<g class="rotatable">'+
    '<g class="scalable"></g>'+
    '<rect />'+
    '<text class="port-label"/>'+
    '<foreignObject width="24" height="24" x="56" y="30" class="htIconOut">'+
    '<div xmlns="http://www.w3.org/1999/xhtml" height="24px" class="iconBodys" style="background-color:#00B0F0;text-align:center;">'+
    '<a title="rdgdfgd" class="content-x text-center" style="color:white;font-size: 12;display:inline-block;width:24px;height:24px;line-height: 24px;text-decoration: none;">RX</a>'+
    '</div>'+
    '</foreignObject>'+
    '</g>',
    defaults: joint.util.deepSupplement({
      type: 'basic.RectPort',
      showTopanel: function(cellView) {
        $('.infosig-group').find('button').removeClass('disabled');
        window.assemblyZlink = [];
        if (cellView.model.attributes.devDatas.isclick !== undefined) {
          let poid = cellView.model.id;
          let dvd = cellView.model.attributes.devDatas;
          let tpoid = dvd.phylink.Port2.PortId;
          if (poid === dvd.phylink.Port2.PortId) {
            tpoid = dvd.phylink.Port1.PortId;
          }
          let nuwpanel = {};
          let dvdpostion = window.paper.graph.getCell(cellView.model.attributes.parent);
          window.assemblyz = window.gszz;
          $.each(window.outherPanels.other_panel, function(palindex, pal) {
            let istt = false;
            $.each(pal.devices, function(indexdv, datadv) {
              if (_.findWhere(datadv.ports, { Guid: tpoid }) !== undefined) {
                nuwpanel.devices = [];
                nuwpanel.devices.push(datadv);
                nuwpanel.PanelGuid = pal.PanelGuid;
                nuwpanel.PanelName = pal.PanelName;
                nuwpanel.ports = pal.ports;
                istt = true;
                return false;
              }
              if (_.findWhere(datadv.ports, { Guid: tpoid }) === undefined) {
                if (cellView.model.get('gpportId') !== undefined && _.findWhere(datadv.ports, { Guid: cellView.model.get('gpportId') }) !== undefined) {
                  nuwpanel.devices = [];
                  nuwpanel.devices.push(datadv);
                  nuwpanel.PanelGuid = pal.PanelGuid;
                  nuwpanel.PanelName = pal.PanelName;
                  nuwpanel.ports = pal.ports;
                  istt = true;
                  return false;
                }

              }
            });
            if (istt) {
              return false;
            }
          });
          let fmodels = window.paper.graph.getCells();

          $.each(fmodels, function(cellindex, celldata) {
            if (celldata === undefined) {
              return true;
            }
            if (celldata.attributes.portRemove !== undefined) {
              // window.paper.graph.removeCells();
              celldata.remove();
            }
          });
          if (window.gppPort !== undefined) {
            $.each(window.gppPort, function(indexgpp, datagpp) {
              datagpp.remove();
            });
            window.gppPort = [];
          }
          window.gppPort = [];
          window.tbgraph.clear();
          $('#thb').show();
          let otherpanelv = new joint.shapes.devs.Cabinet({
            z: window.assemblyz += 1,
            id: nuwpanel.PanelGuid,
            portRemove: 1,
            position: { x: 590 + 4000 + 150, y: dvdpostion.attributes.position.y - 50 },
            size: { width: 393, height: 200 },
            inPorts: [],
            outPorts: [],
            devDatas: nuwpanel,
            childequipments: nuwpanel.devices,
            paper: window.paper,
            mainpanel: false,
            attrs: {
              'text.title-class': { text: nuwpanel.PanelName }
            }
          });
          GFC.noUseF(otherpanelv);
          $('#thb').hide();
          window.tbgraph.clear();
          window.assemblyZlink = [];
          $.each(window.nowAssemblylink, function(index, item) {
            //let issourcefind = _.findWhere(dvdpostion.attributes.outPorts, { Guid: item.Port1.PortId });
            //let istargetfind = _.findWhere(dvdpostion.attributes.outPorts, { Guid: item.Port2.PortId });
            window.paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'right', item);
          });
          let directionGport = false;
          $.each(window.zjdOuther, function(indexzjd, itemzjd) {
            let port1Dev = window.paper.graph.getCell(itemzjd.mainPortId);
            let port2Dev = window.paper.graph.getCell(itemzjd.outherPortId);
            if (!port1Dev || !port2Dev) {
              return true;
            }
            let po1Position = port1Dev.attributes.position;
            let po2Position = port2Dev.attributes.position;

            let mathy;
            if (po1Position.y > po2Position.y) {
              mathy = po1Position.y - po2Position.y;
            } else {
              mathy = po2Position.y - po1Position.y;
            }
            if (po1Position.y === po2Position.y || (mathy < 38 && port1Dev.attributes.type !== port2Dev.attributes.type)) {
              let gppy;
              if (mathy < 38 && mathy !== 0) {
                if (po1Position.y > po2Position.y) {
                  gppy = po2Position.y;
                } else {
                  gppy = po1Position.y;
                }
              } else {
                gppy = po1Position.y;
              }
              if (mathy < 48 && (port1Dev.attributes.type === 'basic.RectPort' && port2Dev.attributes.type === 'basic.RectPort')) {
                gppy += 35
              }
              let gpp = new joint.shapes.basic.GPPort({
                portRemove: 1,
                id: itemzjd.portZjId,
                position: { x: 515 + 4000, y: gppy + 35 },
                size: { width: 10, height: 10 },
                devDatas: itemzjd.portZj,
                attrs: {
                  text: {
                    text: `${itemzjd.PanelName}-${itemzjd.portZj.OdfboxName}-${itemzjd.portZj.ProodfName}-${itemzjd.portZj.ProportName}`,
                    'font-size': 9,
                    stroke: '',
                    fill: '#f00',
                    'ref-y': -8,
                    'ref-x': .5
                  },
                  rect: {
                    width: 13,
                    height: 13,
                    rx: 13,
                    ry: 13,
                    fill: '#f00'
                  }
                }
              });
              gpp.addTo(window.paper.graph);
              itemzjd.mainlink.iszl = 1;
              itemzjd.ohterlink.iszl = 1;
              window.paper.conNect(itemzjd.mainlink.Port1.PortId, itemzjd.mainlink.Port2.PortId, 'gl', 'right', itemzjd.mainlink);
              window.paper.conNect(itemzjd.ohterlink.Port1.PortId, itemzjd.ohterlink.Port2.PortId, 'gl', 'right', itemzjd.ohterlink);
            } else {
              let qx = Math.sqrt((Math.pow(po1Position.x, 2) + Math.pow(po2Position.x, 2)) / 2);
              let qy = Math.sqrt((Math.pow(po1Position.y, 2) + Math.pow(po2Position.y, 2)) / 2);
              let textHeight = -12;
              if (directionGport) {
                qx += 70;
                //textHeight = 18;
              } else {
                qx -= 30;
                //textHeight = -14;
              }
              if (mathy < 48 && (port1Dev.attributes.type === 'basic.RectPort' && port2Dev.attributes.type === 'basic.RectPort')) {
                qy += 35
              }
              directionGport = !directionGport;
              let gpp = new joint.shapes.basic.GPPort({
                portRemove: 1,
                id: itemzjd.portZjId,
                position: { x: qx, y: qy },
                size: { width: 10, height: 10 },
                devDatas: itemzjd.portZj,
                attrs: {
                  text: {
                    text: `${itemzjd.PanelName}-${itemzjd.portZj.OdfboxName}-${itemzjd.portZj.ProodfName}-${itemzjd.portZj.ProportName}`,
                    'font-size': 9,
                    stroke: '',
                    fill: '#f00',
                    'ref-y': textHeight,
                    'ref-x': .5
                  },
                  rect: {
                    width: 13,
                    height: 13,
                    rx: 13,
                    ry: 13,
                    fill: '#f00'
                  }
                }
              });
              gpp.addTo(window.paper.graph);
              itemzjd.mainlink.iszl = 2;
              itemzjd.ohterlink.iszl = 2;
              window.paper.conNect(itemzjd.mainlink.Port1.PortId, itemzjd.mainlink.Port2.PortId, 'gl', 'right', itemzjd.mainlink);
              window.paper.conNect(itemzjd.ohterlink.Port1.PortId, itemzjd.ohterlink.Port2.PortId, 'gl', 'right', itemzjd.ohterlink);

            }
          });
          if (window.phySignalFlows !== null) {
            let stepf = 40;
            $.each(window.phySignalFlows, function(sigindex, sigdata) {
              let issourcefind = window.paper.paper.findViewByModel(sigdata.ProjectSenddev);
              let istargetfind = window.paper.paper.findViewByModel(sigdata.ProjectReceivedev);
              if (issourcefind === undefined || istargetfind === undefined) {
                return true;
              }
              if (sigdata.ProjectReceivedev !== dvdpostion.id && sigdata.ProjectSenddev !== dvdpostion.id) {
                return true;
              }
              let vertices = [];
              let selectt = '.sig3';
              let selects = '.sig1';
              if (sigdata.ProjectLinktype === 'Receive') {
                selectt = '.sig4';
                selects = '.sig2';
                if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined && _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                  selectt = '.sig1';
                  selects = '.sig2';
                  let recg = window.paper.graph.getCell(sigdata.ProjectReceivedev);
                  let seng = window.paper.graph.getCell(sigdata.ProjectSenddev);
                  vertices = [{ x: seng.attributes.position.x - stepf, y: seng.attributes.position.y }, { x: recg.attributes.position.x - stepf, y: recg.attributes.position.y + recg.attributes.size.height }];

                } else {
                  selectt = '.sig4';
                  selects = '.sig3';
                  if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined || _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                    selectt = '.sig4';
                    selects = '.sig2';
                  }
                }
              } else {
                selectt = '.sig1';
                selects = '.sig3';
                if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined && _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                  selectt = '.sig2';
                  selects = '.sig1';
                  let recg = window.paper.graph.getCell(sigdata.ProjectReceivedev);
                  let seng = window.paper.graph.getCell(sigdata.ProjectSenddev);
                  vertices = [{ x: seng.attributes.position.x - stepf, y: seng.attributes.position.y }, { x: recg.attributes.position.x - stepf, y: recg.attributes.position.y + recg.attributes.size.height }];
                } else {
                  selectt = '.sig3';
                  selects = '.sig4';
                  if (_.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectReceivedev }) !== undefined || _.findWhere(window.outherPanels.main_panel.devices, { Guid: sigdata.ProjectSenddev }) !== undefined) {
                    selectt = '.sig1';
                    selects = '.sig3';
                  }
                }
              }
              stepf += 30;
              let camo = new joint.dia.Link({
                markup: [
                  '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
                  '<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>',
                  '<path class="marker-target" fill="black" stroke="black" d="M 0 0 0 0"/>',
                  '<path class="connection-wrap" d="M 0 0 0 0"/>',
                  '<g class="labels"/>',
                  '<g class="marker-vertices"/>',
                  '<g class="marker-arrowheads"/>',
                  '<g class="link-tools"/>'
                ].join(''),
                toolMarkup: [
                  '<g class="link-tool">',
                  '</g>'
                ].join(''),
                labelMarkup: [
                  '<g class="label">',
                  '<rect />',
                  '<text />',
                  '<circle />',
                  '</g>'
                ].join(''),
                vertexMarkup: 'none',
                arrowheadMarkup: [
                  '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
                  '</g>'
                ].join(''),
                sigshowinfo: sigdata.ProjectSigdesc,
                source: { id: sigdata.ProjectSenddev, selector: selects },
                target: { id: sigdata.ProjectReceivedev, selector: selectt },
                attrs: {
                  '.marker-target': {
                    fill: '#306796',
                    stroke: null,
                    d: 'M 10 0 L 0 5 L 10 10 z'
                  },
                  '.connection': { stroke: '#306796', opacity: 0.3, 'stroke-width': 3, 'stroke-dasharray': '5 2' }
                },
                id: sigdata.Guid,
                vertices: vertices,
                portRemove: 1,
                //connector: { name: 'rounded' },
                labels: [{
                  position: { distance: .4 },
                  attrs: {
                    rect: {
                      stroke: null,
                      'stroke-width': 0,
                      opacity: 0,
                      rx: 5,
                      ry: 5
                    },
                    text: {
                      text: sigdata.ProjectSigdesc,
                      //'font-weight': 'lighter',
                      fill: '#ff0000',
                      opacity: 0,
                      'font-variant': 'small-caps'
                    }
                  }
                }]
              });
              camo.addTo(window.paper.graph);
            });
          }

        }
      },
      rightMenu: {
        centerMenu: {
          name: '编辑', //端口编辑
          fc: function(cellView) {
            var ViewModel = cellView.model;
            var EditStr = '';
            $('.modal-body').html('');
            $('.modal-title').html(this.name);
            EditStr += '<div class="form-group">' +
              '<label for="ProportName">端口信息名称:</label>' +
              '<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.devDatas.ProportName + '" id="ProportName">' +
              '</div>';
            $('.modal-body').html(EditStr);
            $('.main-modal').modal();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              if (!GFC.formValidation($('#ProportName'))) {
                GFC.showError('名称必填!');
                return;
              }
              if (GFC.formValidation($('#ProportName')).length > 12) {
                GFC.showError('端口名称长度不能大于12位!');
                return;
              }
              if (isNaN(parseInt(GFC.formValidation($('#ProportName'))))) {
                GFC.showError('端口名称必须为数字!');
                return;
              }
              var slotObj = {
                Guid: ViewModel.id, //端口id
                PortName: GFC.formValidation($('#ProportName'))
              };
              slotObj.Guid = ViewModel.attributes.devDatas.Guid;
              slotObj.PubbsPubportBcslotGuid = ViewModel.attributes.devDatas.ProbsProportBcslotGuid;
              slotObj.PortName = GFC.formValidation($('#ProportName'));
              slotObj.PortDesc = ViewModel.attributes.devDatas.ProportDesc;
              slotObj.PortMediaType = ViewModel.attributes.devDatas.ProportMediatype;
              slotObj.PortJointType = ViewModel.attributes.devDatas.ProportJointtype;
              slotObj.PortFuncType = ViewModel.attributes.devDatas.ProportFunctiontype;
              slotObj.ProportDesc = ViewModel.attributes.devDatas.ProportDesc;
              var setPubPortInfo = ROOF.devconfig.SetPortInfo;
              setPubPortInfo(slotObj, function(obj) {
                if (obj.status) {
                  ViewModel.attributes.devDatas.ProportName = GFC.formValidation($('#ProportName'));
                  let cjname = cellView.model.attributes.devDatas.ProbsName + '-';
                  let dkname = cellView.model.attributes.devDatas.ProportName + '-';
                  let fcname = cellView.model.attributes.devDatas.ProportFunctiontype + '-';
                  let joname = cellView.model.attributes.devDatas.ProportJointtype +'-';
                  let dename = cellView.model.attributes.devDatas.ProportDesc;
                  let devdesc = cellView.model.attributes.devDatas.ProbsDesc + '-';
                  if (cellView.model.attributes.devDatas.ProbsName === '') {
                    cjname = '';
                    devdesc = '';
                  }
                  cellView.model.attributes.porttts = devdesc + cjname + dkname + fcname + joname + dename; 
                  cellView.model.attributes.attrs.text.text = cjname + dkname + fcname + joname + dename;
                  cellView.update();
                  //GFC.reload();
                  $('.main-modal').modal('hide');
                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            });

          }
        },
        otherMenu: [{
            name: '更换', //更换端口
            fc: function(cellView) {
              var ViewModel = cellView.model;
              var $this = this;
              let AppH = [];
              var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
              getPortsByDeviceId(ViewModel.attributes.parent, function(obj) {
                if (obj.status) {
                  $('.main-modal-body').html('');
                  $('.modal-title').html($this.name);
                  let str = '';
                  $.each(obj.slot_list, function(poindx, podate) {
                    var strc = '';
                    $.each(podate.Port_List, function(index, item) {
                      var spanStr = '',
                        findStr = '',
                        isdisable = '';
                      if (item.c_pd_id !== undefined || item.c_pd_id === '') {
                        let devname;
                        if (item.c_dev_name === undefined) {
                          devname = item.c_ns_name;
                        } else {
                          devname = item.c_dev_name;
                        }
                        findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
                        isdisable = 'disabled';
                      }
                      if (item.c_p1_id !== undefined) {
                        spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
                      }
                      if (podate.BcslotId === '' || podate.ProbsDesc === '') {
                        strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                <span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
                      } else {
                        item.BcslotId = podate.BcslotId;
                        item.ProbsDesc = podate.ProbsDesc;
                        strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${podate.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${podate.ProbsName}-<span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
                      }
                      AppH.push(item);

                    });
                    let soledesc = podate.ProbsDesc;
                    if (soledesc === '') {
                      soledesc = '点击展开';
                    }
                    str += `<div class="panel panel-info" style="border:none;">
                                                <div class="panel-heading" role="tab" id="headingOne-${poindx}">
                                                    <a data-id="${podate.BcslotId}" role="button" data-toggle="collapse" data-parent="#port-solt-list" href="#collapseOne-${poindx}" aria-expanded="true" aria-controls="collapseOne-${poindx}">
                                                     ${soledesc}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${poindx}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-${poindx}">
                                                  <div class="panel-body">
                                                    <div class="list-group">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
                  });
                  let slotll = `<div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                        <div class="panel-group" id="port-solt-list">
                                                        ${str}
                                                        </div>
                                                </div>`;
                  $('.main-modal-body').html(slotll);
                  $('.main-modal').modal();
                  $('.edit-right').off('click').on('click', function() {
                    $('.main-modal').modal('hide');
                  });
                  $('.list-group-item').off('click').on('click', function() {
                    let $thisE = $(this);
                    if ($thisE.hasClass('disabled')) {
                      return;
                    }
                    let changePhyPort = ROOF.physical.ChangePhyPort;
                    changePhyPort(ViewModel.id, $thisE.attr('data-id'), function(objmn) {
                      if (objmn.status) {
                        $('.main-modal').modal('hide');
                        GFC.reload();
                      } else {
                        GFC.showError(objmn.err_msg);
                      }
                    });
                  });

                } else {
                  GFC.showError(obj.err_msg);
                }
              });
            }
          }

        ]
      },
      attrs: {
        rect: {
          fill: '#4283bb',
          stroke: '#4283bb',
          x: -20,
          y: 30,
          width: 100,
          height: 24
        },
        '.iconBody':{
          height:24
        },
        'text.port-label': {
          text: 'dsfafdf',
          width: 100,
          height: 24,
          fill: '#ffffff',
          'font-size': 12,
          x: -20,
          'ref-x': 30,
          'ref-y': 44,
          'text-anchor': 'middle',
          'y-alignment': 'middle',
          'font-family': 'Arial, helvetica, sans-serif'

        }

      }
    }, joint.shapes.basic.Generic.prototype.defaults)
  });


  joint.shapes.basic.RectPortView = joint.dia.ElementView.extend({
    update: function(cell, renderingOnlyAttrs) {
      let elementTitls = this.$el.find('.content-x');
      elementTitls.attr('title', this.model.attributes.devDatas.Type).text(this.model.attributes.devDatas.Type);
      if(this.model.attributes.devDatas.Type==="TX"){
        elementTitls.css('background-color','#F4B183');
      }
      var allAttrs = this.model.get('attrs');

      var rotatable = this.rotatableNode;
      if (rotatable) {
        var rotation = rotatable.attr('transform');
        rotatable.attr('transform', '');
      }

      var relativelyPositioned = [];
      var nodesBySelector = {};
      _.each(renderingOnlyAttrs || allAttrs, function(attrs, selector) {

        // Elements that should be updated.
        var $selected = this.findBySelector(selector);

        // No element matched by the `selector` was found. We're done then.
        if ($selected.length === 0) {
          return;
        }

        nodesBySelector[selector] = $selected;

        // Special attributes are treated by JointJS, not by SVG.
        var specialAttributes = this.SPECIAL_ATTRIBUTES.slice();

        // If the `filter` attribute is an object, it is in the special JointJS filter format and so
        // it becomes a special attribute and is treated separately.
        if (_.isObject(attrs.filter)) {

          specialAttributes.push('filter');
          this.applyFilter($selected, attrs.filter);
        }

        // If the `fill` or `stroke` attribute is an object, it is in the special JointJS gradient format and so
        // it becomes a special attribute and is treated separately.
        if (_.isObject(attrs.fill)) {

          specialAttributes.push('fill');
          this.applyGradient($selected, 'fill', attrs.fill);
        }
        if (_.isObject(attrs.stroke)) {

          specialAttributes.push('stroke');
          this.applyGradient($selected, 'stroke', attrs.stroke);
        }

        // Make special case for `text` attribute. So that we can set text content of the `<text>` element
        // via the `attrs` object as well.
        // Note that it's important to set text before applying the rest of the final attributes.
        // Vectorizer `text()` method sets on the element its own attributes and it has to be possible
        // to rewrite them, if needed. (i.e display: 'none')
        if (!_.isUndefined(attrs.text)) {

          $selected.each(function() {

            vE(this).text(attrs.text + '', { lineHeight: attrs.lineHeight, textPath: attrs.textPath, annotations: attrs.annotations });
          });
          specialAttributes.push('lineHeight', 'textPath', 'annotations');
        }

        // Set regular attributes on the `$selected` subelement. Note that we cannot use the jQuery attr()
        // method as some of the attributes might be namespaced (e.g. xlink:href) which fails with jQuery attr().
        var finalAttributes = _.omit(attrs, specialAttributes);

        $selected.each(function() {

          vE(this).attr(finalAttributes);
        });

        // `port` attribute contains the `id` of the port that the underlying magnet represents.
        if (attrs.port) {

          $selected.attr('port', _.isUndefined(attrs.port.id) ? attrs.port : attrs.port.id);
        }

        // `style` attribute is special in the sense that it sets the CSS style of the subelement.
        if (attrs.style) {

          $selected.css(attrs.style);
        }

        if (!_.isUndefined(attrs.html)) {

          $selected.each(function() {

            $(this).html(attrs.html + '');
          });
        }

        // Special `ref-x` and `ref-y` attributes make it possible to set both absolute or
        // relative positioning of subelements.
        if (!_.isUndefined(attrs['ref-x']) ||
          !_.isUndefined(attrs['ref-y']) ||
          !_.isUndefined(attrs['ref-dx']) ||
          !_.isUndefined(attrs['ref-dy']) ||
          !_.isUndefined(attrs['x-alignment']) ||
          !_.isUndefined(attrs['y-alignment']) ||
          !_.isUndefined(attrs['ref-width']) ||
          !_.isUndefined(attrs['ref-height'])
        ) {

          _.each($selected, function(el, index, list) {
            var $el = $(el);
            // copy original list selector to the element
            $el.selector = list.selector;
            relativelyPositioned.push($el);
          });
        }

      }, this);

      // We don't want the sub elements to affect the bounding box of the root element when
      // positioning the sub elements relatively to the bounding box.
      //_.invoke(relativelyPositioned, 'hide');
      //_.invoke(relativelyPositioned, 'show');

      // Note that we're using the bounding box without transformation because we are already inside
      // a transformed coordinate system.
      var size = this.model.get('size');
      var bbox = { x: 0, y: 0, width: size.width, height: size.height };

      renderingOnlyAttrs = renderingOnlyAttrs || {};

      _.each(relativelyPositioned, function($el) {

        // if there was a special attribute affecting the position amongst renderingOnlyAttributes
        // we have to merge it with rest of the element's attributes as they are necessary
        // to update the position relatively (i.e `ref`)
        var renderingOnlyElAttrs = renderingOnlyAttrs[$el.selector];
        var elAttrs = renderingOnlyElAttrs ? _.merge({}, allAttrs[$el.selector], renderingOnlyElAttrs) : allAttrs[$el.selector];

        this.positionRelative(vE($el[0]), bbox, elAttrs, nodesBySelector);

      }, this);

      if (rotatable) {

        rotatable.attr('transform', rotation || '');
      }
      let pp = this.model.attributes.panelData;
      // console.log('pp',pp);
      let panelPort = pp.ports;
      let phlink = this.model.attributes.devDatas.phylink;
      if (panelPort !== null && phlink !== undefined) {
        if (_.findWhere(panelPort, { Guid: phlink.Port1.PortId }) !== undefined) {
          let gppdata = _.findWhere(panelPort, { Guid: phlink.Port1.PortId });
          let filx = this.model.attributes.position.x;
          let fily = this.model.attributes.position.y;
          let projectOpticalcableGuid = _.filter(window.nowAssemblylink, function(pronum) {
            return (pronum.Port2.PortId === gppdata.Guid && pronum.ProjectOpticalcableGuid !== '');
          });
          if (projectOpticalcableGuid.length === 0) {
            projectOpticalcableGuid = '';
          } else {
            projectOpticalcableGuid = projectOpticalcableGuid[0];
          }
          let gpp = new joint.shapes.basic.GPPort({
            portRemove: 1,
            id: gppdata.Guid,
            projectOpticalcableGuid: projectOpticalcableGuid,
            position: { x: -50, y: 35 },
            size: { width: 10, height: 10 },
            attrs: {
              text: {
                text: `${gppdata.OdfboxName}-${gppdata.ProodfName}-${gppdata.ProportName}`,
                'font-size': 9,
                stroke: '',
                fill: '#306796',
                'ref-y': -10
              },
              rect: {
                width: 13,
                height: 13,
                rx: 13,
                ry: 13,
                fill: '#306796'
              }
            }
          });
          gpp.addTo(window.paper.graph);
          gpp.translate(filx, fily);
          if (window.gppPort !== undefined) {
            window.gppPort.push(gpp);
          }
        }
        if (_.findWhere(panelPort, { Guid: phlink.Port2.PortId }) !== undefined) {
          let filx2 = this.model.attributes.position.x;
          let fily2 = this.model.attributes.position.y;
          let gppdata2 = _.findWhere(panelPort, { Guid: phlink.Port2.PortId });
          let centergpp = _.filter(window.nowAssemblylink, function(numgpp) {
            return numgpp.Port1.PortId === gppdata2.Guid;
          });
          let rightgpp = _.filter(window.nowAssemblylink, function(numgpp) {
            return numgpp.Port1.PortId === centergpp[0].Port2.PortId;
          });
          if (rightgpp.length !== 0) {
            if (this.model.attributes.gpportId === undefined) {
              this.model.attributes.gpportId = rightgpp[0].Port2.PortId;
            }
          } else {
            if (this.model.attributes.gpportId === undefined) {
              this.model.attributes.gpportId = centergpp[0].Port2.PortId;
            }
          }
          let projectOpticalcableGuid = _.filter(window.nowAssemblylink, function(pronum) {
            return (pronum.Port1.PortId === gppdata2.Guid && pronum.ProjectOpticalcableGuid !== '');
          });
          if (projectOpticalcableGuid.length === 0) {
            projectOpticalcableGuid = '';
          } else {
            projectOpticalcableGuid = projectOpticalcableGuid[0];
          }
          let gpp2 = new joint.shapes.basic.GPPort({
            id: gppdata2.Guid,
            position: { x: 120, y: 35 },
            size: { width: 10, height: 10 },
            projectOpticalcableGuid: projectOpticalcableGuid,
            attrs: {
              text: {
                text: `${gppdata2.OdfboxName}-${gppdata2.ProodfName}-${gppdata2.ProportName}`,
                'font-size': 9,
                stroke: '',
                fill: '#306796',
                'ref-y': -10
              },
              rect: {
                width: 13,
                height: 13,
                rx: 13,
                ry: 13,
                fill: '#306796'
              }
            }
          });
          gpp2.addTo(window.paper.graph);
          gpp2.translate(filx2, fily2);
          return;
        }
        let outherPanelsKj = _.findWhere(window.outherPanels.other_panel, { PanelGuid: phlink.Port2.PanelId });
        if (outherPanelsKj !== undefined) {
          // let filx2 = this.model.attributes.position.x;
          // let fily2 = this.model.attributes.position.y;
          let gppdata2 = _.findWhere(outherPanelsKj.ports, { Guid: phlink.Port2.PortId });
          if (!gppdata2) {
            return;
          }
          let centergpp = _.filter(window.nowAssemblylink, function(numgpp) {
            return numgpp.Port1.PortId === gppdata2.Guid;
          });
          let rightgpp = _.filter(window.nowAssemblylink, function(numgpp) {
            return numgpp.Port1.PortId === centergpp[0].Port2.PortId;
          });
          if (rightgpp.length !== 0) {
            if (this.model.attributes.gpportId === undefined) {
              this.model.attributes.gpportId = rightgpp[0].Port2.PortId;
            }
          } else {
            if (this.model.attributes.gpportId === undefined) {
              this.model.attributes.gpportId = centergpp[0].Port2.PortId;
            }
          }
          let dqid = this.model.attributes.gpportId;
          if (!dqid) {
            return;
          }
          return;
        }

      }


    }

  });
})(window.jQuery, window.joint, window.parent.window, window.GFC, window._, window.V);
