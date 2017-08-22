'use strict';
(function($, joint, ROOF, _, GFC) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  GFC.noUseF(window);
  joint.dia.Ditchs = joint.dia.Cell.extend({
    init: function(paper, ditchsID) {
      let ditTempStr = `<div class="runFloor">
                                <div class="floor">1m</div>
                                <div class="floor">1m</div>
                                <div class="floor">1m</div>
                                <div class="floor">1m</div>
                            </div>
                            <div class="floor-cla-list">
                                <div class="panel panel-primary" style="width:100%; font-size: 12px;">
                                    <div class="panel-body" style="height: 200px; width: 100%; overflow: auto;">
                                        <div style="display: flex;text-align: center;">
                                            <div class="" style="flex: 0.75;">分层</div>
                                            <div class="" style="flex: 1.5;">编号</div>
                                            <div class="" style="flex: 1.5;">型号</div>
                                            <div class="" style="flex: 1.25;">始端</div>
                                            <div class="" style="flex: 0.75;">终端</div>
                                        </div>
                                        <div id="floor-v-lists" style="">
                                        </div>
                                    </div>
                                </div>
                            </div>`;
      $('.runFloor').remove();
      $('.floor-cla-list').remove();
      $('body').append(ditTempStr);
      this.sfc = paper;
      console.log(ditchsID);
      this.getData();

    },
    runFloor: function(ditchssource) {
      let strs = '';
      $.each(ditchssource.Ditchs, function(indexdit, datadit) {
        strs += `<div data-floor="${datadit.floor}" class="floor">${datadit.Positon}m</div>`;
      });
      let $this = this;
      $('.runFloor').html(strs);
      $('.runFloor').find('.floor').off('click').on('click', function() {
        $('.floor').removeClass('active');
        $(this).addClass('active');
        $this.runDitchsSvg(ditchssource.Ditchs[$(this).index()]);
      });
      $('.runFloor').show();
      $('.runFloor').find('.floor').eq(0).trigger('click');
    },
    runDitchsSvg: function(ditchsv) {
      console.log(ditchsv.Ditch.length);
      let canvasarr = [];
      let ciclearr = [];
      let linkfarr = [];
      $.each(ditchsv.Ditch, function(indexdi, datadi) {
        let stid = joint.util.uuid();
        let enid = joint.util.uuid();
        if (_.findWhere(ciclearr, { position: datadi.Start }) === undefined) {
          ciclearr.push({
            id: stid,
            type: 'basic.Circle',
            position: datadi.Start,
            size: { width: 20, height: 20 },
            devDatas: datadi,
            attrs: {
              circle: {
                fill: '#4283bb',
                stroke: '#4283bb'
              }
            }
          });
        } else {
          stid = _.findWhere(ciclearr, { position: datadi.Start }).id;
        }
        if (_.findWhere(ciclearr, { position: datadi.End }) === undefined) {
          ciclearr.push({
            id: enid,
            type: 'basic.Circle',
            position: datadi.End,
            size: { width: 20, height: 20 },
            devDatas: datadi,
            attrs: {
              circle: {
                fill: '#4283bb',
                stroke: '#4283bb'
              }
            }
          });
        } else {
          enid = _.findWhere(ciclearr, { position: datadi.End }).id;
        }
        if (_.findWhere(linkfarr, { s: stid, t: enid }) === undefined) {
          linkfarr.push({ s: stid, t: enid, d: datadi });
        }

      });
      $.each(linkfarr, function(indexlink, datalink) {
        let lid = joint.util.uuid();
        let jcolor = '';
        switch (datalink.d.Density) {
          case '0':
            jcolor = 'green';
            break;
          case '1':
            jcolor = 'yellow';
            break;
          case '2':
            jcolor = 'red';
            break;
        }
        canvasarr.push({
          id: lid,
          type: 'devs.ditchslink',
          source: { id: datalink.s },
          target: { id: datalink.t },
          devDatas: datalink.d,
          z: -1,
          attrs: {
            '.connection': {
              stroke: jcolor,
              'stroke-width': 5
            }
          }
        });
      });
      this.sfc.graph.resetCells(canvasarr.concat(ciclearr));
      this.sfc.resizePaperScroller();
    },
    getData: function() {
      var ditchsdata = {
        Ditchs: [{
          floor: '1',
          Positon: '-0.8',
          Ditch: [{
            Start: { x: 5000, y: 5000 },
            End: { x: 5000, y: 5400 },
            Density: '0',
            Cables: [{
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '1'
            }, {
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '2'
            }]
          }, {
            Start: { x: 5000, y: 5400 },
            End: { x: 5400, y: 5400 },
            Density: '1',
            Cables: [{
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '1'
            }, {
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '1'
            }]
          }]
        }, {
          floor: '2',
          Positon: '0',
          Ditch: [{
            Start: { x: 5000, y: 5000 },
            End: { x: 5400, y: 5000 },
            Density: '0',
            Cables: [{
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '2'
            }, {
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '3'
            }]
          }, {
            Start: { x: 5400, y: 5000 },
            End: { x: 5400, y: 5400 },
            Density: '1',
            Cables: [{
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '1'
            }, {
              Number: '编号',
              Type: '型号',
              Start: '起始屏柜',
              End: '终点屏柜',
              Layer: '1'
            }]
          }]
        }]
      };
      console.log(JSON.stringify(ditchsdata));
      this.runFloor(ditchsdata);
    }

  });
})(window.jQuery, window.joint, window.parent.window, window._, window.GFC);
