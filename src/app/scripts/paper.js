// ==============================================================================
//
// This file is part of the Fangying Diagram.
//
// Create by Yongjie Liu <yongjie@fangyingmobile.com>
// Copyright (c) 2015-2016 fangyingmobile.com
//
// For the full copyright and license information, please view the LICENSE
// file that was distributed with this source code.
//
// ==============================================================================

'use strict';
// window.ports = [];
window.aaa = [];
window.bbb = [];
window.ccc = [];
window.ddd = [];
(function($, joint, viewE, _, GFC, ROOF, bootbox, Validator) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  var PaperClass = function(ele, opt) {
    this.$element = ele;
    this.defaults = {
      isAutoW: true,
      originX: 1,
      originY: 1,
      scaleX: 1,
      scaleY: 1,
      gridSize: 15,
      gridColor: '#AAA'
    };
    this.graph = new joint.dia.Graph();
    this.options = $.extend({}, this.defaults, opt);
  };
  PaperClass.prototype = {
    paper: null,
    paperScroller: null,
    creat: function() {
      var $this = this;
      var getGridBackgroundImage = function(gridX, gridY) {
        var canvas = document.createElement('canvas');
        canvas.width = gridX;
        canvas.height = gridY;
        if (gridX > 5 && gridY > 5) {
          var ox = $this.options.originX;
          var oy = $this.options.originY;

          gridX = ox >= 0 ? ox % gridX : gridX + ox % gridX - 1;
          gridY = oy >= 0 ? oy % gridY : gridY + oy % gridY - 1;

          var context = canvas.getContext('2d');
          context.beginPath();
          context.rect(gridX, gridY, 1, 1);
          context.fillStyle = $this.options.gridColor;
          context.fill();
        }

        return canvas.toDataURL('image/png');
      };

      var ScrollerAutoWidth = $this.$element.width();
      var LocalPaper = new joint.dia.Paper({
        width: 10000,
        height: 10000,
        model: $this.graph,
        gridSize: 1,
        perpendicularLinks: true,
        interactive: false
      });
      window.ppp = LocalPaper;
      this.paper = LocalPaper;
      var paperScroller = new joint.ui.PaperScroller({
        paper: LocalPaper,
        autoResizePaper: true,
        padding: 50
      });
      if (this.options.isAutoW) {
        paperScroller.$el.css({
          width: $(window).width(),
          height: $(window).height()
        });
        paperScroller.center();
        paperScroller.centerContent();
        paperScroller.$el.css({
          width: $(window).width(),
          height: $(window).height(),
          overflow: 'hidden',
          'background-image': 'url("' + getGridBackgroundImage(this.options.gridSize * this.options.scaleX, this.options.gridSize * this.options.scaleY) + '")'
        }).appendTo($this.$element);
        $(window).resize(function() {
          paperScroller.center();
          paperScroller.centerContent();
          paperScroller.$el.css({
            width: $(this).width(),
            height: $(this).height()
          });
        });
      } else {
        paperScroller.$el.css({
          width: ScrollerAutoWidth,
          height: '100%'
        });
        paperScroller.center();
        paperScroller.centerContent();
        paperScroller.$el.css({
          width: ScrollerAutoWidth,
          height: '100%',
          overflow: 'hidden'
        }).appendTo($this.$element);
      }

      LocalPaper.on('blank:pointerdown', paperScroller.startPanning);
      $(document).on('mouseleave', function() {
        paperScroller.stopPanning();
      });
      this.paperScroller = paperScroller;
      LocalPaper.on('blank:pointerdown', joint.ui.TextEditor.close, joint.ui.TextEditor);
      paperScroller.$el.on('mousewheel', function(event, delta, deltaX, deltaY) {

        if (delta > 0) {
          paperScroller.zoom(0.07, {
            max: 2
          });
        } else {
          paperScroller.zoom(-0.07, {
            min: 0.1
          });
        }
        if (window.NowSeletcCell !== undefined) {
          window.NowSeletcCell.unhighlight();
          GFC.LeftPointerdown.hide();
          window.NowSeletcCell = undefined;
        }
        $('.showPortzz').remove();
        return [event, delta, deltaX, deltaY];
      });
      LocalPaper.on('blank:pointerdown', function() {
        $('.panelS2').hide();
        GFC.LeftPointerdown.hide();
        if (window.NowSeletcCell !== undefined) {
          window.NowSeletcCell.unhighlight();
        }
        if (window.zlIsCtrl) {
          return;
        }
      });
      LocalPaper.on('cell:highlight', function(cellView) {
        var els = $('body').find('.infomation-body');
        if (els.length === 0) {
          $('body').append('<div class="infomation-body">' + '<div class="infom-titile">' + '</div>' + '</div>');
          $('.infomation-body').css({
            top: cellView.$el.offset().top + 'px',
            left: cellView.$el.offset().left + 'px',
            width: viewE(cellView.$el[0]).bbox(true).width * GFC.getPaperSxy(paperScroller).fsx + 'px',
            height: viewE(cellView.$el[0]).bbox(true).height * GFC.getPaperSxy(paperScroller).fsy + 'px'
          });
        } else {
          $('.infomation-body').css({
            top: cellView.$el.offset().top + 'px',
            left: cellView.$el.offset().left + 'px',
            width: viewE(cellView.$el[0]).bbox(true).width * GFC.getPaperSxy(paperScroller).fsx + 'px',
            height: viewE(cellView.$el[0]).bbox(true).height * GFC.getPaperSxy(paperScroller).fsy + 'px'
          }).show();
        }

      });
      LocalPaper.on('cell:unhighlight', function() {
        $('.infomation-body').hide();
        $('.panelS2').hide();
      });
      LocalPaper.on('cell:mouseover', function(cellView, evt) {
        if (cellView.model.attributes.porttts !== undefined) {
          $('.panelS').find('.popover-title').hide();
          $('.panelS').find('.popover-content').text(cellView.model.attributes.porttts);
          $('.panelS').show();
          $('.panelS').css({
            top: cellView.$el.offset().top - $('.panelS').height() / 2 + 10 + 'px',
            left: cellView.$el.offset().left + viewE(cellView.$el[0]).bbox(true).width * GFC.getPaperSxy(paperScroller).fsx + 'px',
            width: '140px',
            height: 'auto'
          });
        }
        if (cellView.model.attributes.sigshowinfo !== undefined) {

          cellView.model.attributes.labels[0].attrs.text.opacity = 1;
          cellView.onLabelsChange();
          evt.stopPropagation();
          $(window).one('mouseover', function() {
            cellView.model.attributes.labels[0].attrs.text.opacity = 0;
            cellView.onLabelsChange();
          });

        }
        if (cellView.model.attributes.type === 'devs.Infolink') {

          let $fdlok = cellView.$el.find('.iconBody');
          $fdlok.find('.content-x,.glyphicon').addClass('text-danger').css({
            fontSize: '12px'
          });
          evt.stopPropagation();
          $(window).one('mouseover', function() {
            $fdlok.find('.content-x,.glyphicon').removeClass('text-danger').css({
              fontSize: '12px'
            });
          });

        }
      });
      LocalPaper.on('cell:mouseout', function() {
        $('.panelS').hide();
      });
      LocalPaper.on('cell:pointerup', function(cellView, evt) {
        if ($('.descheme-right-content-b', window.parent.document).is(':visible')) {
          return;
        }
        if (cellView.model.attributes.rightPanel !== undefined) {
          if (cellView.model.attributes.dataDev.Ip === undefined) {
            return;
          }
          if ($('.panelS2').length === 0) {
            let strsps = `<div class="popover right panelS2" style="position:fixed;display:none; z-index: 999999;" role="tooltip">
                                        <div class="arrow"></div>
                                        <h3 class="popover-title"></h3>
                                        <div class="popover-content"></div>
                                    </div>`.trim();
            $('body').append(strsps);
          }
          $('.panelS2').find('.popover-title').hide();
          let ipdz = `<li class="list-group-item list-group-item-success">
                        ip地址: ${cellView.model.attributes.dataDev.Ip}
                        </li>`.trim();

          //IedMac CbMac CbName CbType <p class="list-group-item-text">${datamac.CbName}(${datamac.CbType})</p>
          let itemstr = '';
          $.each(cellView.model.attributes.dataDev.IedMac, function(indexmac, datamac) {
            if (datamac.CbMac === '') {
              return true;
            }
            itemstr += `
                        <li class="list-group-item list-group-item-warning" data-mac="${datamac.CbMac}" data-cbname="${datamac.CbName}" data-appid="${datamac.CbAppid}" data-id="${datamac.CbId}">
                        <p class="list-group-item-text">${datamac.CbName}: ${datamac.CbMac}</p>
                        </li>
                        `.trim();
          });
          let ipmak = `<li class="list-group-item list-group-item-info">
                        <p class="list-group-item-text">掩码: ${cellView.model.attributes.dataDev.IpMask}</p>
                        </li>`.trim();
          if (cellView.model.attributes.dataDev.Ip === '' && itemstr === '') {
            return;
          }
          let groupul = `<ul class="list-group">${ipdz}${ipmak}${itemstr}</ul>`.trim();
          $('.panelS2').find('.popover-content').html(groupul);
          $('.panelS2').find('.list-group-item-success').text('IP地址:' + cellView.model.attributes.dataDev.Ip)
            .off('click').on('click', function() {
              let tthis = $(this);
              bootbox.prompt({
                title: '请输入IP地址:',
                value: cellView.model.attributes.dataDev.Ip,
                callback: function(result) {
                  if (result === null) {
                    //GFC.showError('dd');
                    return;
                  } else {
                    if ($.trim(result) === '') {
                      GFC.showError('不可以输入空的IP地址！');
                      return;
                    }
                    let vad = new Validator();
                    if (vad.isIp(result)) {
                      let objip = {};
                      objip.Guid = cellView.model.attributes.dataDev.IpId;
                      objip.ProipIp = result;
                      let setIpInfo = ROOF.communication.SetIpInfo;
                      setIpInfo(objip, function(sobjip) {
                        if (sobjip.status) {
                          cellView.model.attributes.dataDev.Ip = result;
                          tthis.text('IP地址:' + result);
                        } else {
                          GFC.showError(sobjip.err_msg);
                        }
                      });
                    } else {
                      GFC.showError('IP地址不合法!');
                    }
                  }
                }
              });
            });
          $('.panelS2').find('.list-group-item-warning')
            .off('click').on('click', function() {
              let tthis = $(this);
              bootbox.prompt({
                title: '请输入MAC地址:',
                value: tthis.attr('data-mac'),
                callback: function(result) {
                  if (result === null) {
                    //GFC.showError('dd');
                    return;
                  } else {
                    if ($.trim(result) === '') {
                      GFC.showError('不可以输入空的MAC地址！');
                      return;
                    }
                    let vadmac = /[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}-[A-F\d]{2}/;
                    if (vadmac.test(result)) {
                      let objmac = {};
                      objmac.Guid = tthis.attr('data-id');
                      objmac.ProcbAppid = tthis.attr('data-appid');
                      objmac.ProcbMac = result;
                      let setMacInfo = ROOF.communication.SetMacInfo;
                      setMacInfo(objmac, function(sobjmac) {
                        if (sobjmac.status) {
                          $.each(cellView.model.attributes.dataDev.IedMac, function(indexmacb, datamacb) {
                            if (datamacb.CbId === tthis.attr('data-id')) {
                              datamacb.CbMac = result;
                              return false;
                            }
                          });
                          tthis.text(tthis.attr('data-cbname') + ':' + result);
                        } else {
                          GFC.showError(sobjmac.err_msg);
                        }
                      });
                    } else {
                      GFC.showError('MAC地址不合法!');
                    }
                  }
                }
              });
            });
          $('.panelS2').find('.list-group').css({
            marginBottom: 0
          });
          $('.panelS2').find('.list-group').addClass('list-group-sms');
          $('.panelS2').css({
            top: cellView.$el.offset().top - $('.panelS2').outerHeight() / 2 + 'px',
            left: cellView.$el.offset().left + viewE(cellView.$el[0]).bbox(true).width * GFC.getPaperSxy(paperScroller).fsx + 'px',
            width: 'auto',
            height: 'auto',
            fontSize: '12px'
          });
          $('.panelS2').show();
          $('.panelS').hide();
        }
        if (cellView.model.attributes.pupevt !== undefined) {
          cellView.model.attributes.pupevt(cellView);
        }
        if (cellView.model.attributes.showTopanel !== undefined) {
          cellView.model.attributes.showTopanel(cellView);
        }
        if ((evt.ctrlKey || evt.metaKey) && (cellView.model instanceof joint.dia.Link)) {
          if (window.selectiondView !== undefined) {
            if (_.findWhere(window.selectiondView, {
                id: cellView.id
              }) === undefined) {
              cellView.model.attributes.labels[0].attrs.text.fill = '#ff0000';
              cellView.update();
              window.selectiondView.push(cellView);
            } else {
              window.selectiondView = _.filter(window.selectiondView, function(nums) {
                return nums.id !== cellView.id;
              });
              cellView.model.attributes.labels[0].attrs.text.fill = '#306796';
              cellView.update();
            }
          }
        }
        if (cellView.model.attributes.type === 'basic.RectPort') {
          if (window.zlIsCtrl) {
            // var portId = cellView.model.attributes.devDatas.phylink.Port1.PortId;
            // var zh = $($(`[model-id='${portId}']`).find('tspan')[0]).text().split('-')[0];
            // var zh1 = $($(`[model-id='${portId}']`).find('tspan')[0]).text().split('-')[1];
            // var port = {};
            // port.zh = zh;
            // port.zh1 = zh1;
            // window.ports.push(port);
            if (cellView.model.attributes.devDatas.ProportFunctiontype === 'DX') {
              GFC.showError('此端口是电口！');
              return;
            }
            if (cellView.model.attributes.devDatas.phylink === undefined) {
              return;
            }
            if (cellView.model.attributes.gpportId !== undefined) {
              let iscenlink = _.filter(window.nowAssemblylink, function(lenmum) {
                return (lenmum.Port1.PortId === cellView.model.attributes.gpportId || lenmum.Port2.PortId === cellView.model.attributes.gpportId);
              });
              if (iscenlink.length !== 0) {
                let continueadd = 1;
                $.each(iscenlink, function(kindex, kdata) {
                  if (kdata.ProjectOpticalcableGuid !== '') {
                    continueadd = 0;
                    return false;
                  }
                });
                if (continueadd === 0) {
                  GFC.showError('此端口所连接光纤已经组缆!');
                  return;
                }
              }

            }
            if ($('.' + cellView.model.id).length === 0) {
              $('body').append(`
                    <div class="showPortzz animated fadeIn sozz${cellView.model.id}" data-id="${cellView.model.id}"
                    style="
                    width:${viewE(cellView.$el[0]).bbox(true).width * GFC.getPaperSxy(paperScroller).fsx}px;
                    height:${viewE(cellView.$el[0]).bbox(true).height * GFC.getPaperSxy(paperScroller).fsy}px;
                    top:${cellView.$el.offset().top}px;
                    left:${cellView.$el.offset().left}px;
                    "
                    ></div>
                    `.trim());
              $('.showPortzz').off('click').on('click', function(e) {
                window.zlPortArry = _.without(window.zlPortArry, {
                  PhylinkId: $(this).attr('data-id')
                });
                $(this).remove();
                e.stopPropagation();
              });
            }
            if (cellView.model.attributes.devDatas.phylink !== undefined) {
              if (cellView.model.attributes.gpportId !== undefined) {
                let gpportIdcache = cellView.model.attributes.gpportId;
                let port1Id = cellView.model.attributes.devDatas.phylink.Port1.PortId;
                let port2Id = cellView.model.attributes.devDatas.phylink.Port2.PortId;
                if (port1Id !== gpportIdcache && port2Id !== gpportIdcache) {


                  if (port1Id === cellView.model.id) {
                    cellView.model.attributes.devDatas.phylink = _.filter(window.nowAssemblylink, function(lenmum) {
                      if (lenmum.Port1.PortId === port2Id || lenmum.Port2.PortId === port2Id) {
                        return (lenmum.Port1.PortId !== cellView.model.id && lenmum.Port2.PortId !== cellView.model.id);
                      }
                    })[0];
                  } else {
                    cellView.model.attributes.devDatas.phylink = _.filter(window.nowAssemblylink, function(lenmum) {
                      if (lenmum.Port1.PortId === port1Id || lenmum.Port2.PortId === port1Id) {
                        return (lenmum.Port1.PortId !== cellView.model.id && lenmum.Port2.PortId !== cellView.model.id);
                      }
                    })[0];
                  }
                }
              }
              if (_.findWhere(window.zjdlikOut, {
                  PhylinkId: cellView.model.attributes.devDatas.phylink.PhylinkId
                })) {
                if (cellView.model.attributes.devDatas.phylink.Port1.PortId === cellView.model.id || cellView.model.attributes.devDatas.phylink.Port2.PortId === cellView.model.id) {
                  window.zlPortArry.push(cellView.model.attributes.devDatas.phylink.PhylinkId);
                } else {
                  let zlId = _.filter(window.zjdlikOut, function(nlinks) {
                    return (nlinks.Port1.PortId === cellView.model.id || nlinks.Port2.PortId === cellView.model.id);
                  });
                  if (zlId.length !== 0) {
                    if (zlId[0].ProjectOpticalcableGuid !== '') {
                      GFC.showError('此端口所连接光纤已经组缆!');
                      window.zlPortArry = [];
                      return;
                    }
                    window.zlPortArry.push(zlId[0]);
                  } else {
                    GFC.showError('此端口所连接光纤已经组缆!');
                    window.zlPortArry = [];
                    return;
                  }

                }

              } else {
                if (cellView.model.attributes.devDatas.phylink.Port1.PanelId === cellView.model.attributes.devDatas.phylink.Port2.PanelId) {

                  cellView.model.attributes.devDatas.phylink = _.filter(window.nowAssemblylink, function(numg) {
                    return (numg.Port1.PortId === cellView.model.id || numg.Port2.PortId === cellView.model.id) && (numg.Port1.PanelId !== numg.Port2.PanelId);
                  });
                  if (cellView.model.attributes.devDatas.phylink.length !== 0) {
                    cellView.model.attributes.devDatas.phylink = cellView.model.attributes.devDatas.phylink[0];
                    if (cellView.model.attributes.devDatas.phylink.ProjectOpticalcableGuid !== '') {
                      GFC.showError('此端口所连接光纤已经组缆!');
                      window.zlPortArry = [];
                      return;
                    } else {
                      window.zlPortArry.push(cellView.model.attributes.devDatas.phylink);
                    }

                  }
                } else {
                  if (cellView.model.attributes.devDatas.phylink.ProjectOpticalcableGuid !== '') {
                    GFC.showError('此端口所连接光纤已经组缆!');
                    window.zlPortArry = [];
                    return;
                  } else {
                    window.zlPortArry.push(cellView.model.attributes.devDatas.phylink);
                  }

                }

              }

            }
          }
        }
        evt.stopPropagation();

      });
      LocalPaper.on('cell:pointerdown', function(cellView, evt) {
        if ($('.descheme-right-content-b', window.parent.document).is(':visible')) {
          return;
        }
        if (window.zlIsCtrl) {
          paperScroller.stopPanning();
          return;
        }
        cellView.stopListening();
        if (cellView.model.attributes.type === 'basic.DeviceVir') {
          if (window.NowSeletcCell !== undefined) {
            window.NowSeletcCell.unhighlight();
          }
        }
        paperScroller.startPanning(evt);

        if (window.NowSeletcCell === undefined) {
          window.NowSeletcCell = cellView;
        } else {
          window.NowSeletcCell.unhighlight();
          window.NowSeletcCell = cellView;
        }
        window.NowSeletcCell.highlight();
        if (evt.which === 3) {
          paperScroller.stopPanning();
          if (window.NowSeletcCell.model.attributes.rightMenu !== undefined) {
            GFC.LeftPointerdown.show(window.NowSeletcCell, evt);
          }

        } else {
          window.NowSeletcCell.unhighlight();
          window.NowSeletcCell = undefined;
          GFC.LeftPointerdown.hide();
        }
      });
      $('.cell-remove').on('click', function() {
        if (window.NowSeletcCell === undefined) {
          return;
        }
        window.NowSeletcCell.model.remove();
        $('.svg-edit').hide();
        $('#wheel').removeClass('active').css('visibility', 'hidden').hide();
        $('g').removeClass('active');
        window.NowSeletcCell = undefined;
        console.log('remove ok');
      });


      LocalPaper.on('cell:pointerdblclick', function(cellView, evt) {
        if ($('.descheme-right-content-b', window.parent.document).is(':visible')) {
          if (cellView.model.attributes.type === 'devs.Infolink') {
            ROOF.descheme.setSigFlowID(cellView.model.id);
          }
          return;
        }
        if (cellView.model.attributes.type === 'basic.DeviceVir') {
          if (window.NowSeletcCell !== undefined) {
            window.NowSeletcCell.unhighlight();
          }
        }
        // paperScroller.startPanning(evt);
        if (window.NowSeletcCell === undefined) {
          window.NowSeletcCell = cellView;
        } else {
          window.NowSeletcCell.unhighlight();
          window.NowSeletcCell = cellView;
        }
        window.NowSeletcCell.highlight();
        if (window.NowSeletcCell.model.attributes.dbMenu !== undefined) {
          window.NowSeletcCell.model.attributes.dbMenu(window.NowSeletcCell, evt);
        }
      });

    },
    addInpaper: function(svgele) {
      if (svgele === undefined) {
        return;
      }
      if (svgele.constructor.name === 'Array') {
        this.graph.addCells(svgele);
      } else {
        this.graph.addCell(svgele);
        if (svgele.embedport !== undefined) {
          if (svgele.embedport.in.length !== 0) {
            for (var ins = 0; ins < svgele.embedport.in.length; ins++) {
              this.graph.addCell(svgele.embedport.in[ins]);
            }
          }
          if (svgele.embedport.out.length !== 0) {
            for (var outs = 0; outs < svgele.embedport.out.length; outs++) {
              this.graph.addCell(svgele.embedport.out[outs]);
            }
          }
        }
        var $this = this;
        if (svgele.attributes.type !== 'link') {
          var minwidth = svgele.attributes.size.width;
          var minheight = svgele.attributes.size.height;
        }

        svgele.on('change:attrs', function() {
          $this.autoSize(svgele, minwidth, minheight);
        });
      }
    },
    adjustSize: function(opts) {
      if (opts === undefined || opts === '') {
        var ScrollerAutoWidth = this.$element.width();
        var ScrollerAutoHeight = this.$element.height();
        this.paper.$el.css({
          width: ScrollerAutoWidth,
          height: ScrollerAutoHeight
        });
        this.paperScroller.$el.css({
          width: ScrollerAutoWidth,
          height: ScrollerAutoHeight
        });
      }

    },
    resizePaperScroller: function() {
      this.paperScroller.center();
      this.paperScroller.centerContent();
      this.paperScroller.$el.css({
        width: $(window).width(),
        height: $(window).height()
      });
    },
    autoSize: function(element, minwidth, minheight) {
      var view = this.paper.findViewByModel(element);
      var text = view.$('text')[0];
      var bbox = viewE(text).bbox(true);

      var wd = bbox.width + 16;
      var hi = bbox.height + 16;
      if (bbox.width <= minwidth) {
        wd = minwidth;
      }
      if (bbox.height <= minheight) {
        hi = minheight;
      }
      if (element.attributes.type === 'link') {
        return;
      }
      element.resize(wd, hi);
    },
    conNect: function(sourcePort, targetPort, type, posions, itemdatal) {
      let issourcefind = this.paper.findViewByModel(sourcePort);
      let istargetfind = this.paper.findViewByModel(targetPort);
      if (issourcefind === undefined) {
        return;
      }
      if (istargetfind === undefined) {
        return;
      }
      if (this.leftLinkVertices === undefined) {
        this.leftLinkVertices = 40;
      }

      var veElementS = this.paper.findViewByModel(sourcePort).model.attributes;
      var veElementT = this.paper.findViewByModel(targetPort).model.attributes;
      var vertices = [{
        x: veElementS.position.x + 120,
        y: veElementS.position.y + 40
      }, {
        x: veElementT.position.x - 60,
        y: veElementT.position.y + 40
      }];
      switch (posions) {
        case 'left':
          itemdatal.left = 1;
          vertices = [{
            x: veElementS.position.x - this.leftLinkVertices,
            y: veElementS.position.y + 40
          }, {
            x: veElementT.position.x - this.leftLinkVertices,
            y: veElementT.position.y + 40
          }];
          break;
        case 'right':
          vertices = [{
            x: veElementS.position.x + 120,
            y: veElementS.position.y + 40
          }, {
            x: veElementT.position.x - 60,
            y: veElementT.position.y + 40
          }];
          break;
      }
      this.leftLinkVertices += 40;
      var link = new joint.shapes.devs.PhyLink({
        id: itemdatal.PhylinkId,
        devDatas: itemdatal,
        source: {
          id: sourcePort,
          selector: 'circle'
        },
        target: {
          id: targetPort,
          selector: 'circle'
        },
        // vertices: vertices,//此处控制连接线两端是否弯折，若是直线则屏蔽即可。看一下具体逻辑
        attrs: {
          '.connection': {
            stroke: '#7bb4dc',
            'stroke-width': 3
          }
        }
      });
      link.addTo(this.graph);
    },
    LineConnect: function(data,vie) { //该函数处理光缆连接
      let camo = new joint.dia.Link({
        markup: [
          '<path class="connection" stroke="black" d="M 0 0 0 0"/>',
          '<path class="marker-source" fill="black" stroke="black" d="M 0 0 0 0"/>',
          '<path class="marker-target" fill="black" stroke="black" d="M 0 0 0 0"/>',
          // '<text class="port-label"/>',
          '<path class="connection-wrap" d="M 0 0 0 0"/>',
          '<g class="labels"/>',
          '<g class="marker-vertices"/>',
          '<g class="marker-arrowheads"/>',
          '<g class="link-tools"/>'
        ].join(''),
        toolMarkup: [ //以下几处是屏蔽joint.link自己定义的彩色箭头
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
        id: data.Guid,
        // sigshowinfo: '11111',//此处为鼠标放置在线上时展示名称，否则隐藏
        source: {
          id: data.Port1.PortId,
          // selector: selects
        },
        target: {
          id: data.Port2.PortId,
          // selector: selectt
        },
        // vertices: vertices,
        attrs: {
          // '.marker-target': {//此处为构造箭头
          //   fill: '#306796',
          //   stroke: null,
          //   d: 'M 10 0 L 0 5 L 10 10 z'
          // },
          '.connection': {
            stroke: 'red',
            // opacity: 0.3,
            'stroke-width': 1.3,
            'stroke-dasharray': '4 3'
          },
        },
        // router: routers,
        portRemove: 1,
        labels: [{
          position: {
            distance: .7
          },
          attrs: {
            rect: {
              stroke: null,
              'stroke-width': 0,
              opacity: 0,
              rx: 5,
              ry: 5
            },
            text: {
              text: data.LinkConnectId,
              fill: '#ff0000',
              opacity: vie,
              // 'transform': 'rotate(90deg)',
              // transform:'rotate(90deg)',
              'font-size':9,
              'font-variant': 'small-caps'
            }
          }
        }]
      });
      camo.addTo(this.graph);
    },
    conNect2: function() {
      if(window.a){
      for (var i = 0; i < window.a.length; i++) {
        var getX = window.a[i].attributes.position.x;
        var getY = window.a[i].attributes.position.y + 3;
        var getId = window.a[i].id;
        var getName = window.a[i].attributes.attrs.text.text;
        let getGport = new joint.shapes.basic.GPPort({
          portRemove: 1,
          id: getId,
          // projectOpticalcableGuid: projectOpticalcableGuid,
          position: {
            x: getX,
            y: getY
          },
          size: {
            width: 10,
            height: 10
          },
          attrs: {
            text: {
              // text: `${gppdata.OdfboxName}-${gppdata.ProodfName}-${gppdata.ProportName}`,
              text: getName,
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
        getGport.addTo(this.graph);
      }
    }
    }

  };
  $.fn.createPaper = function(options) {
    var creatCv = new PaperClass(this, options);
    creatCv.creat();
    return creatCv;
  };

})(window.jQuery, window.joint, window.V, window._, window.GFC, window.parent.window, window.bootbox, window.Validator);