// ==============================================================================
//
// This file is part of the Fangying Diagram.
//
// Create by Zhihao Ge <zhihao@fangyingmobile.com>
// Copyright (c) 2015-2016 fangyingmobile.com
//
// For the full copyright and license information, please view the LICENSE
// file that was distributed with this source code.
//
// ==============================================================================

'use strict';
(function($, joint, ROOF, Backbone, GFC, bootbox) {
  var documentInit = function() {
    $('body').html('');
    let mainTempStr = `<div id="paper" class="common-str-temp">
                        </div>
                        <div class="svg-edit common-str-temp"><span class="rlabel">edit</span></div>
                        <ul id="wheel" data-angle="all" class="common-str-temp" style="display: none;">
                            <li class="item"><span class="rlabel">光配</span></li>
                            <li class="item"><span class="rlabel">电配</span></li>
                            <li class="item cell-remove"><span class="rlabel">remove</span></li>
                            <li class="item"><span class="rlabel">连接</span></li>
                        </ul>
                        <div class="modal main-modal animated common-str-temp">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title main-modal-title">Modal title</h4>
                                    </div>
                                    <div class="modal-body main-modal-body">
                                        <p>One fine body&hellip;</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">取消</button>
                                        <button type="button" class="btn btn-sm btn-primary edit-right">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal daboule-modal animated  common-str-temp">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title2 daboule-modal-title">Modal title</h4>
                                    </div>
                                    <div class="modal-body2 daboule-modal-body">
                                        <p>One fine body&hellip;</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                        <button type="button" class="btn btn-primary edit-bt2">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="showTopBlackToast animated fadeIn common-str-temp"></div>
                        <div class="popover right panelS  common-str-temp" style="position:fixed;display:none; z-index: 999999;" role="tooltip">
                            <div class="arrow"></div>
                            <h3 class="popover-title"></h3>
                            <div class="popover-content"></div>
                        </div>`;
    $('.common-str-temp').remove();
    $('body').append(mainTempStr);
    bootbox.setLocale('zh_CN');
    if (ROOF === undefined) {
      ROOF = window;
    }
    if (window.zlIsCtrl === undefined) {
      window.zlIsCtrl = false;
      window.zlispl = true;
    }
    $(ROOF).off('keyup');
    $(ROOF).off('keydown');
    window.paper = $('#paper').createPaper({ isAutoW: true });
    window.paper.paperScroller.zoom(-0.1, { min: 0.5 });
    if (window.parent.window !== undefined) {
      ROOF.SvgPaper = window.paper;
    }

  };

  var SvgRouter = Backbone.Router.extend({
    routes: {
      'infomationflow/:id': 'infomationFlow',
      'initnetswitch/:id': 'initNetSwitch',
      'hardwire/:id': 'hardWire',
      'initgoose/:id': 'initGoose',
      'initditchs/:id': 'initDitchs',
      'mainclink/:id': 'initMainclink'
    },
    initMainclink: function(mapId) {
      if (mapId === '' || mapId === undefined) {
        throw '你必须传入图片类型';
      }
      documentInit();
      var mainclinks = new joint.dia.Mainclinks(window.paper);
      mainclinks.init(window.paper, mapId);
      return mainclinks;
    },
    infomationFlow: function(bayId) {
      if (bayId === '' || bayId === undefined) {
        throw '你必须传入间隔id';
      }
      documentInit();
      ROOF.svgInfomationFlowApi = window;
      var infomationFlow = new joint.dia.Info();
      infomationFlow.init(window.paper, bayId);
      this.nowId = bayId;
      return infomationFlow;
    },
    initNetSwitch: function(ntid) {
      if (ntid === '' || ntid === undefined) {
        throw '你必须传入网络id';
      }
      documentInit();
      ROOF.svgNetSwitchApi = window;
      var netSwitch = new joint.dia.NetSwitch(window.paper);
      netSwitch.init(window.paper, ntid);
      return netSwitch;
    },
    hardWire: function(panelId) {
      if (panelId === '' || panelId === undefined) {
        throw '你必须传入屏柜id';
      }
      documentInit();
      ROOF.svgHardApi = window;
      window.assembly[0].show(window.paper, panelId);
      this.nowId = panelId;
    },
    // initGoose: function(iedID) {
    //   if (iedID === '' || iedID === undefined) {
    //     throw '你必须传入屏柜id';
    //   }
    //   documentInit();
    //   ROOF.svgGooseApi = window;
    //   var goose = new joint.dia.Goose();
    //   goose.init(window.paper, iedID);
    //   return goose;
    // },
    initGoose: function(iedID) {
      if (iedID === '' || iedID === undefined) {
        throw '你必须传入屏柜id';
      }
      documentInit();
      ROOF.svgHardApi = window;
      window.assemblys[0].show(window.paper, iedID);
      this.nowId = iedID;
    },
    initDitchs: function(ditchsID) {
      if (ditchsID === '' || ditchsID === undefined) {
        throw '你必须传入屏柜id';
      }
      documentInit();
      ROOF.svgDitchsApi = window;
      var ditchs = new joint.dia.Ditchs(window.paper);
      ditchs.init(window.paper, ditchsID);
      return ditchs;
    }

  });
  var SuRouter = new SvgRouter();
  window.initValue(false, function() {
    Backbone.history.start();
  });
  return SuRouter;
})(window.jQuery, window.joint, window.parent.window, window.Backbone, window.GFC, window.bootbox);
