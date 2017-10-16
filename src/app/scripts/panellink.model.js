'use strict';
(function($, joint, GFC, _, ROOF) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  joint.shapes.devs.Infolink = joint.dia.Link.extend({
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
    toolMarkup: 'none',
    labelMarkup: [
      '<g class="label">',
      '<rect />',
      '<foreignObject width="100" height="30" x="0" y="0" class="htIconOut">',
      '<div xmlns="http://www.w3.org/1999/xhtml" class="iconBody">',
      '<span class="content-x"></span> ',
      '<span class="glyphicon glyphicon-refresh"></span>',
      '</div>',
      '</foreignObject>',
      '<text />',
      '<circle />',
      '</g>'
    ].join(''),
    arrowheadMarkup: [
      '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
      '</g>'
    ].join(''),
    vertexMarkup: 'none',
    defaults: {
      type: 'devs.Infolink',
      /* router: { name: 'manhattan' },
       connector: { name: 'rounded' },*/
      rightMenu: {
        centerMenu: {
          name: '编辑',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            var EditStr = '';
            $('.modal-title').html(this.name);
            EditStr += '<div class="form-group">' +
              '<label for="exampleInputEmail1">信息流表述:</label>' +
              '<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.devDatas.ProjectSigdesc + '" id="exampleInputEmail1" placeholder="">' +
              '</div>';
            $('.modal-body').html(EditStr);
            $('.main-modal').modal();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var signalflow = {
                Guid: ViewModel.id,
                ProjectSigdesc: $('.change-atr').val()
              };
              var changeTypicalBaySignalFlow = ROOF.bay.ChangeTypicalBaySignalFlow;
              changeTypicalBaySignalFlow(signalflow, function(obj) {
                if (obj.status) {
                  ViewModel.attributes.labels[0].attrs.text.text = $('.change-atr').val();
                  ViewModel.attributes.devDatas.ProjectSigdesc = $('.change-atr').val();
                  ViewModel.attributes.textme = $('.change-atr').val();
                  $('.main-modal').modal('hide');
                  $('.modal-body').html('');
                  cellView.onLabelsChange();
                  var $fdlok = cellView.$el.find('.iconBody');
                  var $htincon = cellView.$el.find('.htIconOut');
                  var $rrs = cellView.$el.find('rect');
                  var pp = cellView.model.attributes.devDatas;
                  $htincon.attr('x', $rrs.attr('x'));
                  $htincon.attr('y', $rrs.attr('y'));
                  $fdlok.find('.content-x').text(cellView.model.attributes.textme);
                  if (pp.ProjectLinktype === 'DirectLink') {
                    $fdlok.find('.glyphicon').hide();
                  } else {
                    $fdlok.find('.glyphicon').show();
                  }
                } else {
                  GFC.showError('编辑信息流失败' + obj.err_msg);
                }
              });
            });
          }
        },
        otherMenu: [{
          name: '反转',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            //var EditStr = '';
            $('.modal-body').text('确定反转该信息流么');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();

            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var values = {
                Guid: ViewModel.id,
                ProjectSenddev: ViewModel.attributes.devDatas.ProjectReceivedev,
                ProjectReceivedev: ViewModel.attributes.devDatas.ProjectSenddev
              };
              var changeTypicalBaySignalFlow = ROOF.bay.ChangeTypicalBaySignalFlow;
              changeTypicalBaySignalFlow(values, function(obj) {
                if (obj.status) {
                  $('.main-modal').modal('hide');
                  GFC.reload();
                } else {
                  GFC.showError('反转信息流失败' + obj.err_msg);
                }
              });
            });
          }
        }, {
          name: '断开',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            $('.modal-body').text('确定要删除一条信息流吗?');
            $('.modal-title').html(this.name);
            $('.main-modal').modal();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var deleteTypicalBaySignalFlow = ROOF.bay.DeleteTypicalBaySignalFlow;
              deleteTypicalBaySignalFlow(ViewModel.id, function(obj) {
                if (obj.status) {
                  cellView.model.remove();
                  $('.main-modal').modal('hide');
                  $('.modal-body').html('');
                } else {
                  GFC.showError('删除信息流失败' + obj.err_msg);
                }
              });
            });
          }
        }, {
          name: '直连',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            var signalflow = {
              Guid: ViewModel.id,
              ProjectLinktype: 'DirectLink'
            };
            var changeTypicalBaySignalFlow = ROOF.bay.ChangeTypicalBaySignalFlow;
            changeTypicalBaySignalFlow(signalflow, function(obj) {
              if (obj.status) {
                cellView.model.attributes.devDatas.ProjectLinktype = 'DirectLink';
                cellView.onLabelsChange();
                var $fdlok = cellView.$el.find('.iconBody');
                var $htincon = cellView.$el.find('.htIconOut');
                var $rrs = cellView.$el.find('rect');
                var pp = cellView.model.attributes.devDatas;
                $htincon.attr('x', $rrs.attr('x'));
                $htincon.attr('y', $rrs.attr('y'));
                $fdlok.find('.content-x').text(cellView.model.attributes.textme);
                if (pp.ProjectLinktype === 'DirectLink') {
                  $fdlok.find('.glyphicon').hide();
                } else {
                  $fdlok.find('.glyphicon').show();
                }
                //cellView.update();
              } else {
                GFC.showError('编辑信息流失败' + obj.err_msg);

              }
            });
          }
        }, {
          name: '组网',
          fc: function(cellView) {
            var ViewModel = cellView.model;
            var signalflow = {
              Guid: ViewModel.id,
              ProjectLinktype: 'NetworkLink'
            };
            var changeTypicalBaySignalFlow = ROOF.bay.ChangeTypicalBaySignalFlow;
            changeTypicalBaySignalFlow(signalflow, function(obj) {
              if (obj.status) {
                cellView.model.attributes.devDatas.ProjectLinktype = 'NetworkLink';
                cellView.onLabelsChange();
                var $fdlok = cellView.$el.find('.iconBody');
                var $htincon = cellView.$el.find('.htIconOut');
                var $rrs = cellView.$el.find('rect');
                var pp = cellView.model.attributes.devDatas;
                $htincon.attr('x', $rrs.attr('x'));
                $htincon.attr('y', $rrs.attr('y'));
                $fdlok.find('.content-x').text(cellView.model.attributes.textme);
                if (pp.ProjectLinktype === 'DirectLink') {
                  $fdlok.find('.glyphicon').hide();
                } else {
                  $fdlok.find('.glyphicon').show();
                }
                //cellView.update();
              } else {
                GFC.showError('编辑信息流失败' + obj.err_msg);

              }
            });
          }
        }]
      },
      attrs: {
        '.marker-target': {
          fill: 'black',
          d: 'M 10 0 L 0 5 L 10 10 z'
        }
      },
      labels: [{
        position: { distance: .5, offset: { x: 0, y: 0 } },
        attrs: {
          rect: {
            stroke: '#ffffff',
            'stroke-width': 10,
            rx: 5,
            ry: 5
          },
          foreignobject: { width: 30, height: 30 },
          text: {
            text: 'name',
            'font-weight': 'lighter',
            'font-variant': 'small-caps'
          }
        }
      }]
    }
  });
  joint.shapes.devs.PhyLink = joint.dia.Link.extend({
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
    arrowheadMarkup: [
      '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
      '</g>'
    ].join(''),
    vertexMarkup: 'none',
    defaults: {
      type: 'devs.PhyLink',
      rightMenu: {
        centerMenu: {
          name: '断开',
          fc: function(cellView) {
            $('.modal-title').html(this.name);
            $('.modal-body').html('');
            $('.modal-body').text('确定断开该光纤吗?');
            $('.main-modal').modal();
            $('.edit-right').unbind('click');
            $('.edit-right').click(function() {
              var deletePhyFiber = ROOF.physical.DeletePhyFiber;
              deletePhyFiber(cellView.model.id, function(obj) {
                if (obj.status) {
                  cellView.model.remove();
                  GFC.reload();
                  $('.main-modal').modal('hide');
                  $('.modal-body').html('');
                } else {
                  ROOF.common.promptInformation('断开光纤失败！');
                }
              });
            });
          }
        },
        otherMenu: [{
          name: '转接',
          fc: function(cellView) {
            let isEdit = 0;
            var $this = this;
            let port1Panel = cellView.model.attributes.devDatas.Port1.PanelId;
            let port2Panel = cellView.model.attributes.devDatas.Port2.PanelId;
            var getAllPanelsHaveOdfs = ROOF.physical.GetAllPanelsHaveOdfs;
            getAllPanelsHaveOdfs(function(obj) {
              if (obj.status) {
                let panelstr = '';
                $.each(obj.panel_list, function(indg, dgg) {
                  if (dgg.Guid === '' || dgg.ProprName === '') {
                    return true;
                  }
                  if (dgg.Guid === port1Panel || dgg.Guid === port2Panel) {
                    return true;
                  }
                  panelstr += `
                                                <option value="${dgg.Guid}">${dgg.ProprName}</option>
                                                `.trim();
                });
                if (panelstr === '') {
                  GFC.showWarning('找不到第三方屏柜！');
                  return;
                }
                $('.main-modal-body').html('');
                $('.modal-title').html($this.name);
                let slotll = `
                                <div class="form-group">
                                    <label>屏柜:</label>
                                    <select class="form-control fill-panel-list">${panelstr}</select>
                                    <label>光配箱:</label>
                                    <select class="form-control fill-gp-box"></select>
                                </div>
                                <div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                    <div class="panel-group" id="port-box-list">
                                    </div>
                                </div>`;
                $('.main-modal-body').html(slotll);
                let getOdfPortsByPanel = ROOF.physical.GetOdfPortsByPanel;
                $('.fill-panel-list').off('change').on('change', function() {
                  getOdfPortsByPanel($(this).val(), function(objlith) {
                    if (objlith.status) {
                      let porboxlist = '';
                      $.each(objlith.port_list, function(opname, opdata) {
                        GFC.noUseF(opdata);
                        porboxlist += `
                                                <option value="${opname}">${opname}</option>
                                                `.trim();
                      });
                      if (porboxlist === '') {
                        $('.fill-gp-box').html('');
                        $('#port-box-list').html('');
                        return;
                      }
                      $('.fill-gp-box').html(porboxlist).off('change').on('change', function() {
                        let boxlist = objlith.port_list[$(this).val()];
                        let str = '';
                        $.each(boxlist, function(poindx, podate) {
                          var strc = '';
                          $.each(podate, function(index, item) {
                            let isdisabled = '';
                            if (parseInt(item.Avriable) > 0) {
                              isdisabled = 'disabled';
                            }
                            strc += `
                                                            <a class="list-group-item boxtem-to ${isdisabled}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                            <span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]
                                                            </a>
                                                            `.trim();

                          });
                          //let soledesc = podate.box_name;
                          str += `<div class="panel panel-info" style="border:none;">
                                                            <div class="panel-heading" role="tab" id="headingOne-${poindx}${podate.length}">
                                                                <a data-id="${poindx}${podate.length}" role="button" data-toggle="collapse" data-parent="#port-box-list" href="#collapseOne-${poindx}${podate.length}" aria-expanded="true" aria-controls="collapseOne-${poindx}${podate.length}">
                                                                 ${poindx}
                                                                </a>
                                                            </div>
                                                            <div id="collapseOne-${poindx}${podate.length}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-${poindx}${podate.length}">
                                                              <div class="panel-body">
                                                                <div class="list-group">
                                                                ${strc}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                            `.trim();
                        });
                        $('#port-box-list').html(str);

                        $('.boxtem-to').off('click').on('click', function() {
                          if ($(this).hasClass('disabled')) {
                            return;
                          }
                          let fiberId = cellView.model.id;
                          let portId = $(this).attr('data-id');
                          let changePhyFiberConn = ROOF.physical.ChangePhyFiberConn;
                          changePhyFiberConn(fiberId, portId, function(objjj) {
                            if (objjj.status) {
                              $(this).addClass('disabled');
                              isEdit = 1;
                              $('.main-modal').modal('hide');
                            } else {
                              GFC.showError(objjj.err_msg);
                            }
                          });
                        });
                      });
                      $('.fill-gp-box').trigger('change');
                    } else {
                      GFC.showError(objlith.err_msg);
                    }
                  });
                });
                $('.fill-panel-list').trigger('change');
                $('.main-modal').modal();
                $('.main-modal').off('hidden.bs.modal').on('hidden.bs.modal', function() {
                  if (isEdit === 0) {
                    return;
                  }
                  GFC.reload();
                });
                $('.edit-right').off('click').on('click', function() {
                  $('.main-modal').modal('hide');
                });
              } else {
                GFC.showError(obj.err_msg);
              }
            });
          }
        }]
      },
      attrs: {
        '.connection': { stroke: '#7bb4dc', 'stroke-width': 4 }
      }
    }

  });
  // joint.shapes.devs.PhyLinkView = joint.dia.LinkView.extend({
  //   update: function(model, attributes, opt) {
  //     opt = opt || {};

  //     if (!opt.updateConnectionOnly) {
  //       // update SVG attributes defined by 'attrs/'.
  //       this.updateAttributes();
  //     }
  //     // update the link path, label position etc.
  //     this.updateConnection(opt);

  //     this.updateLabelPositions();
  //     this.updateToolsPosition();
  //     this.updateArrowheadMarkers();
  //     this.options.perpendicular = null;
  //     // Mark that postponed update has been already executed.
  //     this.updatePostponed = false;
  //     let bdata = this.model.attributes.devDatas;
  //     let ttthisfinde = this;
  //     if (bdata.ProjectOpticalcableGuid !== '') {
  //       let gldata = _.findWhere(window.opticalCable, { Guid: bdata.ProjectOpticalcableGuid });
  //       let getFibersOfOpticalCable = ROOF.physical.GetFibersOfOpticalCable;
  //       // getFibersOfOpticalCable(gldata.Guid, function(objgll) {
          
  //       //   if (objgll.status) {
  //       //     let descsv = _.findWhere(objgll.fiber_list, { Guid: bdata.PhylinkId });
  //       //     if (descsv === undefined) {
  //       //       return;
  //       //     }

  //       //     ttthisfinde.model.set('labels', [{
  //       //       position: { distance: .3 },
  //       //       attrs: {
  //       //         rect: {
  //       //           stroke: null,
  //       //           'stroke-width': 0,
  //       //           opacity: 0,
  //       //           fill: '#306796',
  //       //           rx: 5,
  //       //           ry: 5
  //       //         },
  //       //         text: {
  //       //           text: gldata.ProocNumber + '-' + descsv.ProplNumber + '(' + gldata.ProocType + ')',
  //       //           'font-size': 9,
  //       //           fill: '#306796',
  //       //           stroke: null,
  //       //           opacity: 1,
  //       //           'font-family': 'Arial, helvetica, sans-serif'
  //       //         }
  //       //       }
  //       //     }]);
  //       //   } else {
  //       //     GFC.showError(objgll.err_msg);
  //       //   }
  //       // });
  //     }
  //     if (bdata.left) {
  //       this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //       return;
  //     }
  //     let sourceViewH = this.sourceView;
  //     let targetViewH = this.targetView;
  //     if (sourceViewH.model.attributes.devDatas === undefined && targetViewH.model.attributes.devDatas === undefined) {
  //       this.model.set('vertices', []);
  //       if (bdata.ProjectOpticalcableGuid !== '') {
  //         this.model.attributes.rightMenu.otherMenu = [];
  //       }
  //       return;
  //     }
  //     if (!bdata.iszl) {


  //       if (sourceViewH.model.attributes.devDatas === undefined && bdata.Port1.PanelId === bdata.Port2.PanelId) {
  //         this.model.set('vertices', []);
  //         this.model.set('rightMenu', undefined);
  //         this.model.set('vertexMarkup', 'none');
  //         return;
  //       }
  //       if (targetViewH.model.attributes.devDatas === undefined && bdata.Port1.PanelId === bdata.Port2.PanelId) {
  //         this.model.set('vertices', []);
  //         this.model.set('rightMenu', undefined);
  //         this.model.set('vertexMarkup', 'none');
  //         return;
  //       }
  //       if (targetViewH.model.attributes.devDatas === undefined && bdata.Port1.PanelId !== bdata.Port2.PanelId) {
  //         this.model.set('vertices', [{ x: sourceViewH.model.attributes.position.x + 120, y: sourceViewH.model.attributes.position.y + 35 }]);
  //         //this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //         this.model.set('vertexMarkup', 'none');
  //         return;
  //       }
  //       if (sourceViewH.model.attributes.devDatas === undefined && bdata.Port1.PanelId !== bdata.Port2.PanelId) {
  //         this.model.set('vertices', [{ x: targetViewH.model.attributes.position.x - 120, y: targetViewH.model.attributes.position.y + 41 }]);
  //         //this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //         this.model.set('vertexMarkup', 'none');
  //         return;
  //       }
  //     }

  //     if (!sourceViewH.model.attributes.devDatas) {
  //       targetViewH.model.attributes.devDatas = { as: 1 };
  //     }
  //     if (!targetViewH.model.attributes.devDatas) {
  //       targetViewH.model.attributes.devDatas = { as: 1 };
  //       //return;
  //     }
  //     if (bdata.iszl && bdata.iszl === 1) {
  //       this.model.set('vertices', []);
  //       this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //       // this.model.attributes.rightMenu.otherMenu = [];
  //       return;
  //     }
  //     if (bdata.iszl && bdata.iszl === 2) {
  //       if (targetViewH.model.attributes.position.x > sourceViewH.model.attributes.position.x) {
  //         if (targetViewH.model.attributes.type === 'basic.GPPort' && sourceViewH.model.attributes.type !== 'basic.GPPort') {
  //           this.model.set('vertices', [{ x: sourceViewH.model.attributes.position.x + 120, y: sourceViewH.model.attributes.position.y + 35 }]);
  //           this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //           return;
  //         }
  //         if (targetViewH.model.attributes.type !== 'basic.GPPort' && sourceViewH.model.attributes.type === 'basic.GPPort') {
  //           this.model.set('vertices', [{ x: targetViewH.model.attributes.position.x - 50, y: targetViewH.model.attributes.position.y + 41 }]);
  //           this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //           return;
  //         }
  //         if (targetViewH.model.attributes.type === 'basic.GPPort' && sourceViewH.model.attributes.type === 'basic.GPPort') {
  //           this.model.set('vertices', []);
  //           this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //           return;
  //         }

  //       } else {
  //         if (targetViewH.model.attributes.type === 'basic.GPPort' && sourceViewH.model.attributes.type !== 'basic.GPPort') {
  //           this.model.set('vertices', [{ x: sourceViewH.model.attributes.position.x - 120, y: sourceViewH.model.attributes.position.y + 41 }]);
  //           this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //           return;
  //         }
  //         if (targetViewH.model.attributes.type !== 'basic.GPPort' && sourceViewH.model.attributes.type === 'basic.GPPort') {
  //           this.model.set('vertices', [{ x: targetViewH.model.attributes.position.x + 120, y: targetViewH.model.attributes.position.y + 35 }]);
  //           this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //           return;
  //         }
  //         if (targetViewH.model.attributes.type === 'basic.GPPort' && sourceViewH.model.attributes.type === 'basic.GPPort') {
  //           this.model.set('vertices', []);
  //           this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //           return;
  //         }
  //       }

  //       // this.model.attributes.rightMenu.otherMenu = [];

  //     }

  //     if (targetViewH.model.attributes.devDatas.as) {
  //       return;
  //     }
  //     if (sourceViewH.model.attributes.devDatas.as) {
  //       return;
  //     }

  //     let sourceFunctionType = sourceViewH.model.attributes.devDatas.ProportFunctiontype;
  //     let targetFunctionType = targetViewH.model.attributes.devDatas.ProportFunctiontype;
  //     if (sourceFunctionType !== undefined && targetFunctionType !== undefined) {
  //       if (sourceFunctionType === 'DX' || sourceFunctionType === 'DX') {
  //         this.model.set({ rightMenu: { centerMenu: this.model.attributes.rightMenu.centerMenu, otherMenu: [] } });
  //         this.model.attr('.connection', { stroke: '#306796' });
  //       }
  //     }
  //     //return this;
  //   }
  // });
})(window.jQuery, window.joint, window.GFC, window._, window.parent.window);
