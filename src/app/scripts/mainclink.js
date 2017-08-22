'use strict';
(function($, joint, ROOF, _, GFC) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  GFC.noUseF(window);
  joint.dia.Mainclinks = joint.dia.Cell.extend({
    init: function(paper, mapId) {
      this.sfc = paper;
      console.log(mapId);
      this.getData(mapId);

    },
    runDitchsSvg: function(linkchsv) {
      joint.shapes.basic.Dzgz = joint.shapes.basic.Generic.extend({

        markup: `<g class="rotatable"><g class="scalable">
                    <path class="mydz"
                       d="m 308.57143,540.64792 0,88.57143 m -62.85714,-134 62.85714,45.71428 m 0,-180 0,94.28572 m -22.85714,-28.57143 42.85714,57.14286 M 340,426.64792 280,489.50506" />
                    <path
                       style="fill:#ffffff;stroke:#ffffff;stroke-width:5px;"
                       d="m 308.57143,480.3622 0,42.85714" />
                </g><text/></g>`,
        defaults: joint.util.deepSupplement({

          type: 'basic.Dzgz',
          size: { width: 40, height: 100 },
          attrs: {
            '.mydz': {
              stroke: '#000000',
              'stroke-width': '2px',
              opacity: 0.9
            }
          }

        }, joint.shapes.basic.Generic.prototype.defaults)
      });
      joint.shapes.devs.Mainclink = joint.dia.Link.extend({
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
        defaults: {
          type: 'devs.Mainclink',
          /* router: { name: 'manhattan' },
           connector: { name: 'rounded' },*/
          attrs: {
            '.marker-target': {
              fill: 'black',
              transform: 'scale(0.5,0.5)',
              style: 'stroke:#000000;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1',
              d: 'm 377.36105,468.07648 a 8.7896144,10.218185 0 0 1 -8.78961,10.21818 8.7896144,10.218185 0 0 1 -8.78961,-10.21818 8.7896144,10.218185 0 0 1 8.78961,-10.21819 8.7896144,10.218185 0 0 1 8.78961,10.21819 z'
            },
            '.marker-source': {
              fill: 'black',
              transform: 'scale(0.5,0.5)',
              style: 'stroke:#000000;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1',
              d: 'm 377.36105,468.07648 a 8.7896144,10.218185 0 0 1 -8.78961,10.21818 8.7896144,10.218185 0 0 1 -8.78961,-10.21818 8.7896144,10.218185 0 0 1 8.78961,-10.21819 8.7896144,10.218185 0 0 1 8.78961,10.21819 z'
            }
          }
        }
      });
      joint.shapes.devs.MainclinkView = joint.dia.LinkView.extend({
        update: function(model, attributes, opt) {
          opt = opt || {};

          if (!opt.updateConnectionOnly) {
            // update SVG attributes defined by 'attrs/'.
            this.updateAttributes();
          }

          // update the link path, label position etc.
          this.updateConnection(opt);
          this.updateLabelPositions();
          this.updateToolsPosition();
          this.updateArrowheadMarkers();

          // Local perpendicular flag (as opposed to one defined on paper).
          // Could be enabled inside a connector/router. It's valid only
          // during the update execution.
          this.options.perpendicular = null;
          // Mark that postponed update has been already executed.
          this.updatePostponed = false;
          return this;
        }
      });
      this.sfc.graph.resetCells(linkchsv);
      this.sfc.resizePaperScroller();
    },
    getData: function(mapId) {
      var centerPosition = { x: 5000, y: 5000 };
      var leftPosition = { x: 4400, y: 5000 };
      var rightPosition = { x: 5600, y: 5000 };

      //var topPosition = { x: 5000, y: 4600 };
      //var bottomPosition = { x: 5000, y: 5400 };

      var topLeftPosition = { x: 4700, y: 4600 };
      var bottomLeftPosition = { x: 4700, y: 5400 };

      var topRightPosition = { x: 5300, y: 4600 };
      var bottomRightPosition = { x: 5300, y: 5400 };
      let mainlineA = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: leftPosition,
        target: rightPosition,
        mxzr: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }];
      let mainlineAo = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x, y: leftPosition.y },
        target: rightPosition,
        mxzrno: 'no',
        twofor: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x - 50, y: leftPosition.y },
        target: leftPosition,
        mxzr: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }];
      let mainlineAB = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        mxzr: 'yes',
        vertexMarkup: 'none',
        source: { x: leftPosition.x, y: leftPosition.y - 50 },
        target: { x: rightPosition.x, y: rightPosition.y - 50 },
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }];
      let mainlineABo = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        mxzr: 'yes',
        source: { x: centerPosition.x - 50, y: leftPosition.y - 50 },
        target: { x: leftPosition.x, y: rightPosition.y - 50 },
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x, y: leftPosition.y - 50 },
        target: { x: rightPosition.x, y: rightPosition.y - 50 },
        mxzrno: 'no',
        twofor: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }];
      let datasOne = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: bottomLeftPosition,
        target: topLeftPosition,
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'
          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }
      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: bottomRightPosition,
        target: topRightPosition,
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'

          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: bottomLeftPosition.x - 130.5, y: bottomLeftPosition.y - 300 },
        size: { width: 40, height: 100 }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: topLeftPosition.x - 130.5, y: topLeftPosition.y - 100 },
        size: { width: 40, height: 100 }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: bottomRightPosition.x - 130.5, y: bottomRightPosition.y - 300 },
        size: { width: 40, height: 100 }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: topRightPosition.x - 130.5, y: topRightPosition.y - 100 },
        size: { width: 40, height: 100 }
      }];


      //two
      let datasTwo = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x - 150, y: centerPosition.y },
        target: { x: centerPosition.x + 150, y: centerPosition.y },
        vertices: [{ x: centerPosition.x - 150, y: centerPosition.y + 150 }, { x: centerPosition.x + 150, y: centerPosition.y + 150 }],
        bottomfd: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: centerPosition.x + 200, y: centerPosition.y + 150 - 131 },
        size: { width: 40, height: 100 },
        bottomfd: 'yes',
        attrs: {
          'g': {
            transform: 'rotate(90) scale(0.4242424634753107,0.3727369663205852)'
          }

        }
      }];


      //tree
      let datasTree = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x - 150, y: centerPosition.y },
        target: { x: centerPosition.x + 150, y: centerPosition.y - 50 },
        vertices: [{ x: centerPosition.x - 150, y: centerPosition.y + 150 }, { x: centerPosition.x + 150, y: centerPosition.y + 150 }],
        bottomfd: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: leftPosition.x + 300 - 50, y: leftPosition.y - 50 },
        target: { x: leftPosition.x + 300 + 50, y: leftPosition.y },
        vertices: [{ x: leftPosition.x + 300 - 50, y: leftPosition.y + 150 }, { x: leftPosition.x + 300 + 50, y: leftPosition.y + 150 }],
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: leftPosition.x + 300 - 50, y: leftPosition.y - 50 },
        target: { x: leftPosition.x + 300 + 50, y: leftPosition.y },
        vertices: [{ x: leftPosition.x + 300 - 50, y: leftPosition.y - 200 }, { x: leftPosition.x + 300 + 50, y: leftPosition.y - 200 }],
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: rightPosition.x - 300 - 50, y: rightPosition.y - 50 },
        target: { x: rightPosition.x - 300 + 50, y: rightPosition.y },
        vertices: [{ x: rightPosition.x - 300 - 50, y: rightPosition.y + 150 }, { x: rightPosition.x - 300 + 50, y: rightPosition.y + 150 }],
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: rightPosition.x - 300 - 50, y: rightPosition.y - 50 },
        target: { x: rightPosition.x - 300 + 50, y: rightPosition.y },
        vertices: [{ x: rightPosition.x - 300 - 50, y: rightPosition.y - 200 }, { x: rightPosition.x - 300 + 50, y: rightPosition.y - 200 }],
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: centerPosition.x + 200, y: centerPosition.y + 150 - 131 },
        size: { width: 40, height: 100 },
        bottomfd: 'yes',
        attrs: {
          'g': {
            transform: 'rotate(90) scale(0.4242424634753107,0.3727369663205852)'
          }

        }
      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: bottomLeftPosition.x, y: leftPosition.y - 200 },
        target: topLeftPosition,
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'
          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }
      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: topLeftPosition.x, y: leftPosition.y + 150 },
        target: bottomLeftPosition,
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'
          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }
      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: bottomRightPosition.x, y: rightPosition.y - 200 },
        target: topRightPosition,
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'
          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }
      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: topRightPosition.x, y: rightPosition.y + 150 },
        target: bottomRightPosition,
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'
          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: bottomLeftPosition.x - 130.5, y: bottomLeftPosition.y - 300 },
        size: { width: 40, height: 100 }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: topLeftPosition.x - 130.5, y: topLeftPosition.y - 100 },
        size: { width: 40, height: 100 }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: bottomRightPosition.x - 130.5, y: bottomRightPosition.y - 300 },
        size: { width: 40, height: 100 }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: topRightPosition.x - 130.5, y: topRightPosition.y - 100 },
        size: { width: 40, height: 100 }
      }];


      // Four
      let datasFour = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: leftPosition.x + 50, y: leftPosition.y - 50 },
        target: { x: leftPosition.x + 50, y: leftPosition.y },
        vertices: [{
          x: leftPosition.x + 50,
          y: leftPosition.y - 200
        }, {
          x: leftPosition.x + 50 - 100,
          y: leftPosition.y - 200
        }, {
          x: leftPosition.x + 50 - 100,
          y: leftPosition.y + 150
        }, {
          x: leftPosition.x + 50,
          y: leftPosition.y + 150
        }],
        leftfd: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: rightPosition.x - 50, y: rightPosition.y - 50 },
        target: { x: rightPosition.x - 50, y: rightPosition.y },
        vertices: [{
          x: rightPosition.x - 50,
          y: rightPosition.y - 200
        }, {
          x: rightPosition.x - 50 + 100,
          y: rightPosition.y - 200
        }, {
          x: rightPosition.x - 50 + 100,
          y: rightPosition.y + 150
        }, {
          x: rightPosition.x - 50,
          y: rightPosition.y + 150
        }],
        rightfd: 'yes',
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: leftPosition.x + 50 - 100 - 130.5, y: leftPosition.y - 200 },
        leftfd: 'yes',
        size: { width: 40, height: 100 }
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: rightPosition.x - 50 + 100 - 130.5, y: rightPosition.y - 200 },
        rightfd: 'yes',
        size: { width: 40, height: 100 }
      }];
      // Five
      let datasFive = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        topfd: 'yes',
        source: { x: centerPosition.x - 150, y: centerPosition.y },
        target: { x: centerPosition.x + 150, y: centerPosition.y - 50 },
        vertices: [{ x: centerPosition.x - 150, y: centerPosition.y - 200 }, { x: centerPosition.x + 150, y: centerPosition.y - 200 }],
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: centerPosition.x + 200, y: centerPosition.y - 200 - 130.5 },
        size: { width: 40, height: 100 },
        topfd: 'yes',
        attrs: {
          'g': {
            transform: 'rotate(90) scale(0.4242424634753107,0.3727369663205852)'
          }

        }
      }];

      // six
      let datasSix = [{
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: leftPosition.x + 500, y: leftPosition.y },
        target: { x: rightPosition.x - 500, y: rightPosition.y },
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: leftPosition.x + 500, y: leftPosition.y + 450 },
        target: { x: rightPosition.x - 500, y: rightPosition.y + 450 },
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 10 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x, y: leftPosition.y },
        target: { x: centerPosition.x, y: rightPosition.y + 450 },
        attrs: {
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: centerPosition.x - 131, y: rightPosition.y + 50 - 130.5 },
        size: { width: 40, height: 100 },
        topzdq: 'yes'
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: centerPosition.x - 131, y: rightPosition.y + 140 - 130.5 },
        size: { width: 40, height: 100 },
        centerzdq: 'yes'
      }, {
        type: 'basic.Dzgz',
        z: 10,
        id: joint.util.uuid(),
        position: { x: centerPosition.x - 131, y: rightPosition.y + 240 - 130.5 },
        size: { width: 40, height: 100 },
        bottomzdq: 'yes'
      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x, y: leftPosition.y + 150 },
        target: { x: topLeftPosition.x + 250, y: topLeftPosition.y + 250 },
        vertices: [{ x: topLeftPosition.x + 250, y: leftPosition.y + 150 }],
        topcx: 'yes',
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'

          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }, {
        type: 'devs.Mainclink',
        id: joint.util.uuid(),
        arrowheadMarkup: [
          '<g class="marker-arrowhead-group marker-arrowhead-group-<%= end %>">',
          '</g>'
        ].join(''),
        vertexMarkup: 'none',
        source: { x: centerPosition.x, y: leftPosition.y + 250 },
        target: { x: bottomLeftPosition.x + 250, y: bottomLeftPosition.y + 150 },
        vertices: [{ x: bottomLeftPosition.x + 250, y: leftPosition.y + 250 }],
        bottomcx: 'yes',
        attrs: {
          '.marker-target': {
            fill: 'black',
            d: 'M 10 0 L 0 5 L 10 10 z'

          },
          '.connection': { stroke: '#000000', 'stroke-width': 2 }
        }

      }];


      // if (isNaN(parseInt(mapId))) {
      //     GFC.showError('图片id不正确!');
      //     return;

      // }
      let finddatas = [];
      switch (mapId) {
        case 'ConnType5':
          {
            finddatas = finddatas.concat(datasOne).concat(mainlineA);
          }
          break;
        case 'ConnType6':
          {
            finddatas = finddatas.concat(datasTwo).concat(datasOne).concat(mainlineAo);
          }
          break;
        case 'ConnType2':
          {
            finddatas = finddatas.concat(datasTree).concat(mainlineAB).concat(mainlineA);
          }
          break;
        case 'ConnType4':
          {
            finddatas = finddatas.concat(datasTree).concat(mainlineAB).concat(mainlineAo).concat(datasFour);
          }
          break;
        case 'ConnType3':
          {
            finddatas = finddatas.concat(datasTree).concat(mainlineABo).concat(mainlineAo).concat(datasFour).concat(datasFive);
          }
          break;
        case 'ConnType1':
          {
            finddatas = finddatas.concat(datasSix);
          }
          break;
      }
      if (mapId === 'ConnType1') {
        window.paper.paperScroller.zoom(-1, { min: 0.5 });
      } else {
        window.paper.paperScroller.zoom(-1.2, { min: 0.3 });
      }
      this.runDitchsSvg(finddatas);
      ROOF.mainConfigurationDiagramToSvg = function(typenumber) {
        let ggcell = window.paper.graph.getCells();
        ggcell.forEach(function(num) {
          if (num instanceof joint.dia.Link) {
            num.attr('.connection', { stroke: '#000000' });
          } else {
            num.attr('.mydz', { stroke: '#000000' });
          }

        });
        switch (parseInt(typenumber)) {
          case 1:
            {
              ggcell.forEach(function(num) {
                if (mapId !== 'ConnType3') {
                  if (num.attributes.mxzr) {
                    num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 10 });
                  }
                  if (num.attributes.twofor) {
                    num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 10 });
                  }
                } else {
                  if (num.attributes.mxzr && num.attributes.mxzr !== 'no') {
                    num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 10 });
                  }
                }

                if (num.attributes.topzdq) {
                  num.attr('.mydz', { stroke: '#ff0000' });
                }

              });
            }
            break;
          case 2:
            {
              ggcell.forEach(function(num) {
                if (num.attributes.mxzrno && mapId !== 'ConnType4' && mapId !== 'ConnType6') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 10 });
                }
                if (num.attributes.bottomfd && mapId !== 'ConnType3') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.topcx) {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                }

              });
            }
            break;
          case 3:
            {
              ggcell.forEach(function(num) {
                if (num.attributes.leftfd && mapId !== 'ConnType3') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.topfd) {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.centerzdq) {
                  num.attr('.mydz', { stroke: '#ff0000' });
                }

              });
            }
            break;
          case 4:
            {
              ggcell.forEach(function(num) {
                if (num.attributes.rightfd && mapId !== 'ConnType3') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.topfd && mapId !== 'ConnType3') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.bottomfd && mapId !== 'ConnType4' && mapId !== 'ConnType6' && mapId !== 'ConnType2') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.bottomcx) {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                }

              });
            }
            break;
          case 5:
            {
              ggcell.forEach(function(num) {
                if (num.attributes.leftfd && mapId !== 'ConnType4') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.topfd && mapId !== 'ConnType3') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.bottomfd && mapId !== 'ConnType4' && mapId !== 'ConnType6' && mapId !== 'ConnType2' && mapId !== 'ConnType3') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }
                if (num.attributes.bottomzdq) {
                  num.attr('.mydz', { stroke: '#ff0000' });
                }

              });
            }
            break;
          case 6:
            {
              ggcell.forEach(function(num) {
                if (num.attributes.rightfd && mapId !== 'ConnType4') {
                  num.attr('.connection', { stroke: '#ff0000', 'stroke-width': 2 });
                  num.attr('.mydz', { stroke: '#ff0000' });
                }

              });
            }
            break;
        }
      };
    }

  });
})(window.jQuery, window.joint, window.parent.window, window._, window.GFC);
