'use strict';
(function($, joint, ROOF, _, GFC, bootbox) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  joint.dia.NetSwitch = joint.dia.Cell.extend({
    init: function(paper, ntid) {
      let panelTempStr = `<div class="net-ied-select panel panel-primary">
                                    <div class="panel-heading text-center">
                                        <span class="panel-title">切换交换机</span>
                                        <span data-oad="slideOutRight" data-iad="slideInRight" class="f-d-shide glyphicon glyphicon-chevron-right"></span>
                                    </div>
                                    <div class="panel-body">
                                        <ul class="list-group">
                                        </ul>
                                    </div>
                                </div>
                                <div class="net-ied-vlan panel panel-primary">
                                    <div class="panel-heading text-center">
                                        <span class="panel-title">VLAN信息</span>
                                        <span data-oad="slideOutLeft" data-iad="slideInLeft" class="f-d-shide glyphicon glyphicon-chevron-left"></span>
                                    </div>
                                    <div class="panel-body">
                                        <ul class="list-group">
                                        </ul>
                                    </div>
                                    <div class="panel-footer">
                                        <div class="out-xx">
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="net-ied-open glyphicon glyphicon-chevron-left"></div>
                                <div class="vlan-ied-open glyphicon glyphicon-chevron-right"></div>`;
      $('.net-ied-select').remove();
      $('.net-ied-vlan').remove();
      $('.net-ied-open').remove();
      $('.vlan-ied-open').remove();
      $('body').append(panelTempStr);
      var getNetworkTopology = ROOF.communication.GetNetworkTopology;
      getNetworkTopology(ntid, function(obj) {
        if (obj.status) {
          console.log($.parseJSON(obj.json_info));
          var demodata = $.parseJSON(obj.json_info);
          if (demodata === null || demodata.NetInfo === null) {
            GFC.showWarning('不存在装置数据！');
            return;
          }
          var makeLink = function(parentElementLabel, childElementLabel) {
            return new joint.shapes.devs.NetVnlink({
              toolMarkup: 'none',
              vertexMarkup: 'none',
              arrowheadMarkup: [
                '<g class="marker-arrowhead-group-<%= end %>">',
                '</g>'
              ].join(''),
              id: childElementLabel.attributes.dataDev.SwitchPort,
              source: { id: parentElementLabel.id },
              target: { id: childElementLabel.id },
              parentDev: parentElementLabel,
              childDev: childElementLabel,
              labels: [{
                position: { distance: -40, offset: { x: 30, y: -5 } },
                attrs: {
                  text: {
                    text: joint.util.breakText(childElementLabel.attributes.dataDev.SwitchPortName, { width: 120, height: 30 }),
                    'font-size': 16,
                    'font-variant': 'small-caps',
                    fill: '#306796',
                    opacity: 0
                  },
                  rect: {
                    opacity: 0
                  }
                }
              }],
              attrs: {
                //'.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z', fill: '#306796', stroke: '#306796' },
                '.connection': { stroke: '#306796' }
              }
            });
          };

          var makeElement = function(dddev) {
            var label;
            var id;
            if (dddev.SwitchId !== undefined) {
              label = dddev.SwitchName;
              id = dddev.SwitchId;
            } else {
              label = dddev.EquipName;
              id = dddev.EquipId;
            }
            var letterSize = 12;
            return new joint.shapes.basic.NetDev({
              id: id,
              size: { width: 140, height: 70 },
              dataDev: dddev,
              rightPanel: [],
              attrs: {
                text: {
                  text: label,
                  'font-size': letterSize,
                  'font-family': 'Helvetica Neue,Helvetica,Arial,sans-serif',
                  fill: '#c2d9e9'
                },
                rect: {
                  width: 140,
                  height: 70,
                  rx: 5,
                  ry: 5,
                  stroke: '#4283bb',
                  'stroke-width': 2,
                  fill: '#4283bb'
                },
                '.switchOut': { width: 140, height: 70 }

              },
              rankDir: 'R'
            });
          };
          var graphLayout = new joint.layout.TreeLayout({
            graph: paper.graph,
            verticalGap: 100,
            siblingGap: 140,
            gap: 100,
            horizontalGap: 140,
            direction: 'B'
          });
          $('.net-ied-select').find('.list-group').html('');
          $.each(demodata.NetInfo, function(indexm, datam) {
            $('.net-ied-select').find('.list-group').append(`
                        <li class="list-group-item" data-id="${datam.SwitchId}">${datam.SwitchName}</li>
                        `.trim());
          });
          $('.net-ied-select').find('.list-group-item').off('click').on('click', function() {
            $('.list-group-item').removeClass('list-group-item-info');
            let tthis = $(this);
            tthis.addClass('list-group-item-info');
            let childmember = [makeElement(demodata.NetInfo[tthis.index()]).position(5000, 5000)];
            var forPushs = function(fdata) {
              if (fdata.LinkInfo !== null) {
                $.each(fdata.LinkInfo, function(indefo, datafo) {
                  datafo.Guid = datafo.EquipId;
                });
                fdata.LinkInfo = GFC.qcObj(fdata.LinkInfo);
                $.each(fdata.LinkInfo, function(indefoi, datafoi) {
                  childmember.push(makeElement(datafoi));
                  childmember.push(makeLink(makeElement(fdata), makeElement(datafoi)));
                  forPushs(datafoi);
                });
              }
            };
            forPushs(demodata.NetInfo[tthis.index()]);
            paper.graph.resetCells(childmember);
            graphLayout.layout();
            paper.resizePaperScroller();
          });
          var loadVlanlist = function() {
            let getVlanInfo = ROOF.communication.GetVlanInfo;
            getVlanInfo(function(objv) {
              if (objv.status) {
                //console.log(JSON.stringify(objv));
                if (objv.vlan_list.length !== 0) {
                  objv.vlan_list.sort(function(a, b) {
                    return parseInt(a.ProvlanId) - parseInt(b.ProvlanId);
                  });
                  //console.log();
                  let strs = '';
                  $.each(objv.vlan_list, function(indexvlist, datavlist) {
                    strs += `
                                        <li data-guid="${datavlist.Guid}" data-vname="${datavlist.ProvlanName}" data-vid="${datavlist.ProvlanId}" class="list-group-item">
                                        <div style="display: flex;
                                                    text-align: center;
                                                    height: 16px;
                                                    line-height: 16px;">
                                        <div style="flex: 0.1;" class="ProvlanId">${datavlist.ProvlanId}</div>
                                        <div style="flex: 0.9;" class="ProvlanName">${datavlist.ProvlanName}</div>
                                        </div>
                                        <span class="vlan-remove glyphicon glyphicon-remove"></span>
                                        </li>
                                        `;
                  });
                  $('.net-ied-vlan').find('.panel-body').html(strs).show();
                  $('.net-ied-vlan').find('.vlan-remove').off('click').on('click', function(e) {
                    e.stopPropagation();
                    if ($(this).parent('.list-group-item').hasClass('list-group-item-info')) {
                      $(this).parent('.list-group-item').trigger('click');
                    }
                    let vid = $(this).parent('.list-group-item').attr('data-guid');
                    let delVlan = ROOF.communication.DelVlan;
                    bootbox.dialog({
                      message: `确定删除VLAN?`,
                      title: '删除',
                      buttons: {
                        yes: {
                          label: '确定',
                          className: 'btn-primary',
                          callback: function() {
                            delVlan(vid, function(objrem) {
                              if (objrem.status) {
                                loadVlanlist();
                              } else {
                                GFC.showError(objrem.err_msg);
                              }
                            });
                            this.modal('hide');
                          }
                        },
                        no: {
                          label: '取消',
                          className: 'btn-default',
                          callback: function() {
                            this.modal('hide');
                          }
                        }
                      }
                    });
                  });
                  window.selectiondView = [];
                  window.selectiondTarPort = [];
                  window.zlIsCtrl = false;
                  let closeVlanC = function(event) {
                    if (event.which === 17) {
                      if (window.zlispl) {
                        window.zlIsCtrl = false;
                        $('.showTopBlackToast').hide();
                        if (window.selectiondView.length || window.selectiondTarPort.length) {
                          $('.main-modal').find('.main-modal-title').text('点击选择VLAN完成端口添加');
                          $('.main-modal').find('.modal-body').html(`<ul class="list-group">${strs}</ul>`);
                          $('.main-modal').find('.modal-footer').hide();
                          $('.main-modal').modal('show');
                          $('.main-modal').find('.list-group-item').off('click').on('click', function() {
                            let arr = [];
                            let uuid = $(this).attr('data-guid');
                            if (window.selectiondView.length) {
                              $.each(window.selectiondView, function(indexseview, dataseview) {
                                let objvf = {};
                                let childdev = dataseview.model.attributes.childDev.attributes.dataDev;
                                objvf.ProjectPortGuid = childdev.SwitchPort;
                                objvf.ProjectVlanGuid = uuid;
                                console.log(objvf);
                                arr.push(objvf);
                              });
                            }
                            if (window.selectiondTarPort.length) {
                              $.each(window.selectiondTarPort, function(indexseviewp, dataseviewp) {
                                let objvf = {};
                                objvf.ProjectPortGuid = dataseviewp;
                                objvf.ProjectVlanGuid = uuid;
                                console.log(objvf);
                                arr.push(objvf);
                              });
                            }
                            let getVlanNwPort = ROOF.communication.GetVlanNwPort;
                            //let tthis = $(this);
                            getVlanNwPort($(this).attr('data-guid'), function(objpp) {
                              if (objpp.status) {
                                let isadd = true;
                                $.each(objpp.port_list, function(indexpp, datapp) {
                                  if (_.findWhere(arr, { ProjectPortGuid: datapp.ProjectPortGuid }) !== undefined) {
                                    isadd = false;
                                    return false;
                                  }
                                });
                                if (!isadd) {
                                  GFC.showError('端口重复添加!');
                                  return;
                                }
                                let addPortToVlan = ROOF.communication.AddPortToVlan;
                                addPortToVlan(arr, function(sobj) {
                                  if (sobj.status) {
                                    console.log(sobj);
                                    $('.main-modal').modal('hide');
                                    let fmodels = window.paper.graph.attributes.cells.models;
                                    $.each(fmodels, function(cellindex, celldata) {
                                      if (celldata.attributes.type === 'devs.NetVnlink') {
                                        celldata.attributes.labels[0].attrs.text.fill = '#306796';
                                        window.paper.paper.findViewByModel(celldata).update();
                                      }
                                    });
                                  } else {
                                    console.log(JSON.stringify(arr));
                                    GFC.showError(sobj.err_msg);
                                  }
                                });
                              } else {
                                GFC.showError(obj.err_msg);
                              }
                            });
                          });
                          $('.main-modal').off('hidden.bs.modal').on('hidden.bs.modal', function() {
                            $.each(window.selectiondView, function(indexseview, dataseview) {
                              dataseview.model.attributes.labels[0].attrs.text.fill = '#306796';
                              dataseview.model.attributes.attrs['.connection'].stroke = '#306796';
                              dataseview.update();
                            });
                            window.selectiond = [];
                            window.selectiondView = [];
                            window.selectiondTarPort = [];
                            $('.ppor').removeClass('danger');
                            $('.main-modal').find('.modal-footer').show();
                          });

                        }
                      }
                    }
                  };
                  let openVlanC = function(event) {
                    if (!window.zlIsCtrl) {
                      let fmodels = window.paper.graph.attributes.cells.models;
                      $.each(fmodels, function(cellindex, celldata) {
                        if (celldata.attributes.type === 'devs.NetVnlink') {
                          celldata.attributes.labels[0].attrs.text.fill = '#306796';
                          window.paper.paper.findViewByModel(celldata).update();
                        }
                      });
                      $('.ppor').removeClass('danger');
                    }
                    if (window.zlispl) {
                      if (event.ctrlKey) {
                        window.zlIsCtrl = true;
                        $('.net-ied-vlan').find('.list-group-item').removeClass('list-group-item-info');
                        if ($('.showTopBlackToast').is(':hidden')) {
                          $('.showTopBlackToast').text('点击交换机端口，注意不要松开Ctrl键');
                          $('.showTopBlackToast').show();
                        }
                      }
                    }
                  };
                  $(window).off('keyup').on('keyup', closeVlanC);
                  $(window).off('keydown').on('keydown', openVlanC);
                  if (window.parent !== undefined) {
                    $(ROOF).off('keyup').on('keyup', closeVlanC);
                    $(ROOF).off('keydown').on('keydown', openVlanC);
                  }
                  //$(window).click();
                  $('.net-ied-vlan').find('.list-group-item').off('click').on('click', function() {
                    if ($(this).hasClass('list-group-item-info')) {
                      $(this).removeClass('list-group-item-info');
                    } else {
                      $('.net-ied-vlan').find('.list-group-item').removeClass('list-group-item-info');
                      $(this).addClass('list-group-item-info');
                    }
                    let getVlanNwPort = ROOF.communication.GetVlanNwPort;
                    let tthis = $(this);
                    getVlanNwPort($(this).attr('data-guid'), function(objpp) {
                      if (objpp.status) {
                        let fmodels = window.paper.graph.attributes.cells.models;
                        $.each(fmodels, function(cellindex, celldata) {
                          if (celldata.attributes.type === 'devs.NetVnlink') {
                            celldata.attributes.labels[0].attrs.text.fill = '#306796';
                            window.paper.paper.findViewByModel(celldata).update();
                          }
                        });
                        $('.ppor').removeClass('danger');
                        $.each(objpp.port_list, function(indexpp, datapp) {
                          try {
                            var modelcell = window.paper.graph.getCell(datapp.ProjectPortGuid);
                            var modelcellview = window.paper.paper.findViewByModel(modelcell);
                          } catch (err) {
                            return true;
                          }
                          if (tthis.hasClass('list-group-item-info')) {
                            modelcell.attributes.labels[0].attrs.text.fill = '#ff0000';
                            modelcellview.update();
                          } else {
                            modelcell.attributes.labels[0].attrs.text.fill = '#306796';
                            modelcellview.update();
                          }

                        });
                        $.each(objpp.port_list, function(indexppn, datappn) {
                          if (tthis.hasClass('list-group-item-info')) {
                            $('[data-id=' + datappn.ProjectPortGuid + ']').addClass('danger');
                          } else {
                            $('[data-id=' + datappn.ProjectPortGuid + ']').removeClass('danger');
                          }
                        });
                      } else {
                        GFC.showError(obj.err_msg);
                      }
                    });

                  });
                  $('.net-ied-vlan').find('.list-group-item').off('dblclick').on('dblclick', function() {
                    let findthis = $(this);
                    let EditStr = `<div class="form-group">
                                                        <label for="vlan-add-name">VLAN名称:</label>
                                                        <input type="text" class="form-control change-atr" value="" id="vlan-add-name">
                                                        </div>
                                                        <div class="form-group">
                                                        <label for="vlan-add-id">VLAN-编号:</label>
                                                        <input type="text" class="form-control change-atr" value="" id="vlan-add-id">
                                                        </div>`;
                    $('.main-modal').find('.modal-body').html(EditStr);
                    $('.main-modal-title').text('修改VLAN');
                    $('#vlan-add-name').val(findthis.find('.ProvlanName').text()); //Vlan名称
                    $('#vlan-add-id').val(findthis.find('.ProvlanId').text()); //Vlan编号
                    $('.main-modal').modal('show');
                    $('.edit-right').off('click').on('click', function() {
                      let objc = {};
                      objc.Guid = findthis.attr('data-guid'); //Vlanguid
                      let setVlanInfo = ROOF.communication.SetVlanInfo;
                      if (GFC.formValidation($('#vlan-add-name'))) {
                        objc.ProvlanName = GFC.formValidation($('#vlan-add-name')); //Vlan名称
                      } else {
                        GFC.showError('vlan名称必填!');
                        return;
                      }
                      if (GFC.formValidation($('#vlan-add-id'))) {
                        if (GFC.formValidation($('#vlan-add-id')).length > 3) {
                          GFC.showError('编号长度不能大于3位!');
                          return;
                        }
                        if (!GFC.checkHex($('#vlan-add-id'))) {
                          GFC.showError('编号必须为数字或16进制数!');
                          return;
                        }
                        objc.ProvlanId = GFC.formValidation($('#vlan-add-id')); //Vlan编号
                      } else {
                        GFC.showError('vlan编号必填');
                        return;
                      }

                      setVlanInfo(objc, function(sobj) {
                        if (sobj.status) {
                          findthis.find('.ProvlanName').text($('#vlan-add-name').val()); //Vlan名称
                          findthis.find('.ProvlanId').text($('#vlan-add-id').val()); //Vlan编号
                          $('.main-modal').modal('hide');
                        } else {
                          GFC.showError(sobj.err_msg);
                        }
                      });
                    });
                    // communication.SetVlanInfo(vd, function(sobj) {
                    //     if (sobj.status) {} else {}
                    // });
                    // console.log(vd);
                  });
                }
              } else {
                GFC.showError(objv.err_msg);
              }
            });
          };
          $('.net-ied-select').find('.list-group-item').eq(0).trigger('click');
          $('.net-ied-select').show();
          $('.net-ied-vlan').find('.out-xx').off('click').on('click', function() {
            let EditStr = `<div class="form-group">
                            <label for="vlan-add-name">VLAN名称:</label>
                            <input type="text" class="form-control change-atr" value="" id="vlan-add-name">
                            </div>
                            <div class="form-group">
                            <label for="vlan-add-id">VLAN-编号:</label>
                            <input type="text" class="form-control change-atr" value="" id="vlan-add-id">
                            </div>`;
            $('.main-modal').find('.modal-body').html(EditStr);
            $('.main-modal-title').text('新增VLAN');
            $('.main-modal').modal('show');
            $('.edit-right').off('click').on('click', function() {
              let objc = {};
              let addVlan = ROOF.communication.AddVlan;
              if (GFC.formValidation($('#vlan-add-name'))) {
                objc.ProvlanName = GFC.formValidation($('#vlan-add-name')); //Vlan名称
              } else {
                GFC.showError('vlan名称必填');
                return;
              }
              if (GFC.formValidation($('#vlan-add-id'))) {
                if (GFC.formValidation($('#vlan-add-id')).length > 3) {
                  GFC.showError('编号长度不能大于3位!');
                  return;
                }
                if (!GFC.checkHex($('#vlan-add-id'))) {
                  GFC.showError('编号必须为数字或16进制数!');
                  return;
                }
                objc.ProvlanId = GFC.formValidation($('#vlan-add-id')); //Vlan编号
              } else {
                GFC.showError('vlan编号必填');
                return;
              }

              addVlan(objc, function(sobj) {
                if (sobj.status) {
                  $('.main-modal').modal('hide');
                  loadVlanlist();
                } else {
                  GFC.showError(sobj.err_msg);
                }
              });
            });
          });
          loadVlanlist();
          $('.net-ied-vlan').show();
          $('.f-d-shide').off('click').on('click', function() {
            let prr = $(this).parents('.panel-primary');
            prr.animateCss($(this).attr('data-oad'), function() {
              prr.hide();
              if (prr.hasClass('net-ied-select')) {
                $('.net-ied-open').show();
              } else {
                $('.vlan-ied-open').show();
              }
            });
          });
          $('.net-ied-open').off('click').on('click', function() {
            $(this).hide();
            $('.net-ied-select').show();
            $('.net-ied-select').animateCss($('.net-ied-select').find('.f-d-shide').attr('data-iad'));
          });
          $('.vlan-ied-open').off('click').on('click', function() {
            $(this).hide();
            $('.net-ied-vlan').show();
            $('.net-ied-vlan').animateCss($('.net-ied-vlan').find('.f-d-shide').attr('data-iad'));
          });
        } else {
          GFC.showError(obj.err_msg);
          console.log(obj.err_msg);
        }
      });

    }
  });
})(window.jQuery, window.joint, window.parent.window, window._, window.GFC, window.bootbox);
