'use strict';
(function($, joint, _, GFC, g, V) {
  $.fn.extend({
    animateCss: function(animationName, func) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
        if (func !== undefined) {
          func();
        }
      });
    }
  });
  var isAndroid = (/android/gi).test(navigator.appVersion);
  var uzStorage = function() {
    var ls = window.localStorage;
    if (isAndroid) {
      ls = os.localStorage();
    }
    return ls;
  };
  window.GFC = {
    editModal: function(cellView) {
      cellView.model.attributes.rightMenu.centerMenu.fc(cellView);
    },
    promptConfirm: function(text, callback, type, cancleCallback) {
      noty({
        type: arguments[2] || 'notification',
        text: text,
        layout: 'center',
        theme: 'defaultTheme',
        modal: true,
        buttons: [{
          addClass: 'btn btn-primary',
          text: '是',
          onClick: function($noty) {
            if (callback && typeof(eval(callback)) == "function") {
              callback();
            }
            $noty.close();
          }
        }, {
          addClass: 'btn btn-danger',
          text: '否',
          onClick: function($noty) {
            if (cancleCallback && typeof(eval(cancleCallback)) == "function") {
              cancleCallback();
            }
            $noty.close();
          }
        }]
      });
    },
    pointerdblclick: function(cellView) {
      if (cellView.model.attributes.dblclickMenu !== undefined) {
        cellView.model.attributes.dblclickMenufj.fc(cellView);
      }
    },
    LeftPointerdown: {
      show: function(cv, evt) {
        if (!cv.model.attributes.rightMenu || cv.model.attributes.rightMenu.length === 0) {
          return;
        }
        var $this = this;
        $('.svg-edit').unbind('click');
        $('#wheel').html('').hide();
        if (cv.model.attributes.rightMenu !== undefined) {
          $('.svg-edit').find('.rlabel').html(cv.model.attributes.rightMenu.centerMenu.name);
          $('.svg-edit').one('click', function() {
            cv.model.attributes.rightMenu.centerMenu.fc(cv);
            $this.hide();
          });
          var clidom = '';
          for (var rt = 0; rt < cv.model.attributes.rightMenu.otherMenu.length; rt++) {
            clidom += '<li class="item"><span class="rlabel">' + cv.model.attributes.rightMenu.otherMenu[rt].name + '</span></li>';
          }
          $('#wheel').html(clidom).show();
          $('#wheel').find('li').one('click', function() {
            var seq = $(this).index();
            //console.log(cv.model.attributes.rightMenu.otherMenu[rt] + '||' + rt);
            cv.model.attributes.rightMenu.otherMenu[seq].fc(cv);
            $this.hide();
          });
        }

        $('gehaosdcard').wheelmenu({
          cell: cv,
          trigger: 'mousedown',
          animation: 'fly',
          animationSpeed: 'fast',
          evts: evt
        });

        if (cv.model.attributes.rightMenu === undefined) {
          $('#wheel').html('').hide();
        }
        $('.svg-edit').show();
      },
      hide: function() {
        $('.svg-edit').hide();
        $('#wheel').removeClass('active').css('visibility', 'hidden').hide();
        $('g').removeClass('active');
        if (window.NowSeletcCell !== undefined) {
          window.NowSeletcCell.unhighlight();
        }
      }
    },
    formValidation: function(ele) {
      if (ele.attr('type') === 'radio') {
        for (var i = 0; i < ele.length; i++) {
          if (ele.eq(i).prop('checked')) {
            return ele.eq(i).val();
          }
        }
        ele.parent('div').addClass('has-warning');
        ele.one('click', function() {
          ele.parent('div').removeClass('has-warning');
        });
        return false;
      } else {
        if ($.trim(ele.val()) === '') {
          ele.parent('div').addClass('has-warning');
          ele.attr('placeholder', '此项为必填项！');
          ele.one('click', function() {
            ele.parent('div').removeClass('has-warning');
            ele.attr('placeholder', '');
          });
          return false;
        } else {
          return ele.val();
        }
      }
    },
    addHtmlToPage: function(htmlObj, select) {
      if ($(select).length === 0) {
        $("body").append(htmlObj);
      } else {
        $(select).remove();
        $("body").append(htmlObj);
      }
    },
    reload: function(cellView) {
      if (cellView || cellView !== undefined) {
        cellView.update();
      } else {
        window.location.reload();
      }
    },
    qcObj: function(obj) {
      var caheObj = [];
      $.each(obj, function(qcindex, qc) {
        if (_.findWhere(caheObj, {
            Guid: qc.Guid
          }) === undefined) {
          caheObj.push(qc);
        }
      });
      return caheObj;
    },
    getPaperSxy: function(obj) {
      return {
        fsx: obj._sx,
        fsy: obj._sy
      };
    },
    noUseF: function(obj) {
      var ss = '';
      ss = obj;
      ss.toString();
    },
    showSuccess: function(message) {
      $.growl.notice({
        title: '正确!',
        message: message
      });
    },
    showWarning: function(message) {
      $.growl.warning({
        title: '警告!',
        message: message
      });
    },
    showError: function(message) {
      $.growl.error({
        title: '错误!',
        message: message
      });
    },
    setStorage: function(key, value) {
      if (arguments.length === 2) {
        var v = value;
        if (typeof v == 'object') {
          v = JSON.stringify(v);
          v = 'obj-' + v;
        } else {
          v = 'str-' + v;
        }
        var ls = uzStorage();
        if (ls) {
          ls.setItem(key, v);
        }
      }
    },
    getStorage: function(key) {
      var ls = uzStorage();
      if (ls) {
        var v = ls.getItem(key);
        if (!v) {
          return;
        }
        if (v.indexOf('obj-') === 0) {
          v = v.slice(4);
          return JSON.parse(v);
        } else if (v.indexOf('str-') === 0) {
          return v.slice(4);
        }
      }
    },
    rmStorage: function(key) {
      var ls = uzStorage();
      if (ls && key) {
        ls.removeItem(key);
      }
    },
    clearStorage: function() {
      var ls = uzStorage();
      if (ls) {
        ls.clear();
      }
    },
    checkHex: function(key) {
      var textfg = key.val();
      var isHexg = true;
      var nbstr = parseInt('0x' + textfg);
      if (!nbstr) {
        isHexg = false;
      }
      return isHexg;
    }
  };
  joint.shapes.devs.InfolinkView = joint.dia.LinkView.extend({
    updateConnection: function(opt) {

      opt = opt || {};

      var model = this.model;
      var route;

      if (opt.translateBy && model.isRelationshipEmbeddedIn(opt.translateBy)) {
        // The link is being translated by an ancestor that will
        // shift source point, target point and all vertices
        // by an equal distance.
        var tx = opt.tx || 0;
        var ty = opt.ty || 0;

        route = this.route = _.map(this.route, function(point) {
          // translate point by point by delta translation
          return g.point(point).offset(tx, ty);
        });
        // translate source and target connection and marker points.
        this._translateConnectionPoints(tx, ty);

      } else {
        // Necessary path finding
        route = this.route = this.findRoute(model.get('vertices') || [], opt);
        // finds all the connection points taking new vertices into account
        this._findConnectionPoints(route);
      }
      if (window.pushLinkX === undefined) {
        window.pushLinkX = [];
        window.pushLinkY = [];
      }
      //if (window.pushLinkX.length > 0) {

      // }
      //console.log(mathV(felldata.x, true));
      var vthis = this;
      $.each(route, function(indexfell, felldata) {
        if (indexfell === 2 && $.inArray(felldata.x, window.pushLinkX) !== -1) {
          var thisVx = felldata.x;
          var mathV = function(bl) {
            if ($.inArray(thisVx, window.pushLinkX) === -1) {
              return;
            } else {
              if (bl) {
                thisVx += 20;
                mathV(true);
              } else {
                thisVx -= 20;
                mathV(false);
              }
            }
          };
          if (vthis.targetPoint.x < vthis.sourcePoint.x) {
            thisVx = window.pushLinkX[$.inArray(felldata.x, window.pushLinkX)] + 20;
            mathV(true);
            if (vthis.targetView.model.attributes.position.x !== route[2].x) {
              route[2].x = thisVx;
            }
            route[1].x = route[2].x;
          } else {
            thisVx = window.pushLinkX[$.inArray(felldata.x, window.pushLinkX)] - 20;
            mathV(false);
            if (vthis.targetView.model.attributes.position.x !== route[2].x) {
              route[2].x = thisVx;
            }
            route[1].x = route[2].x;
          }

        }
        //console.log(pushLinkX);
        window.pushLinkX.push(felldata.x);
        window.pushLinkY.push(felldata.y);
      });
      //console.log(this.sourcePoint,this.targetPoint);
      var pathData = this.getPathData(route);

      // The markup needs to contain a `.connection`
      this._V.connection.attr('d', pathData);
      this._V.connectionWrap && this._V.connectionWrap.attr('d', pathData);

      this._translateAndAutoOrientArrows(this._V.markerSource, this._V.markerTarget);
    },
    update: function(model, attributes, opt) {
      opt = opt || {};

      if (!opt.updateConnectionOnly) {
        // update SVG attributes defined by 'attrs/'.
        this.updateAttributes();
      }
      // update the link path, label position etc.
      this.updateConnection(opt);
      if (this.sourcePoint.x === this.targetPoint.x) {
        this.model.attributes.labels[0].position.distance = V(this.sourceView.$el[0]).bbox(true).height + 70;
      }
      this.updateLabelPositions();
      this.updateToolsPosition();
      this.updateArrowheadMarkers();

      // Local perpendicular flag (as opposed to one defined on paper).
      // Could be enabled inside a connector/router. It's valid only
      // during the update execution.
      this.options.perpendicular = null;
      // Mark that postponed update has been already executed.
      this.updatePostponed = false;
      var $fdlok = this.$el.find('.iconBody');
      var $htincon = this.$el.find('.htIconOut');
      var $rrs = this.$el.find('rect');
      var pp = this.model.attributes.devDatas;
      $htincon.attr('x', $rrs.attr('x'));
      $htincon.attr('y', $rrs.attr('y'));
      $fdlok.find('.content-x').text(this.model.attributes.textme);
      if (pp.ProjectLinktype === 'DirectLink') {
        $fdlok.find('.glyphicon').hide();
      } else {
        $fdlok.find('.glyphicon').show();
      }
      //return this;
    }
  }); //信息流连接模型
})(window.jQuery, window.joint, window._, window.GFC, window.g, window.V);