'use strict';
(function($, joint, GFC, _, ROOF, vE, bootbox) {
    if (ROOF === undefined) {
        ROOF = window;
    }
    joint.shapes.basic.NetDev = joint.shapes.basic.Rect.extend({
        markup: '<g class="rotatable">' +
            '<g class="scalable">' +
            '</g>' +
            '<rect/>' +
            '<text/>' +
            '<foreignObject class="switchOut">' +
            '<div xmlns="http://www.w3.org/1999/xhtml" class="switchbody">' +
            '<div class="ppor"></div>' +
            '<div class="cont-x"></div>' +
            '<div class="cont-b"></div>' +
            '</div>' +
            '</foreignObject>' +
            '</g>',
        defaults: joint.util.deepSupplement({
            type: 'basic.NetDev',
            attrs: {
                'rect': {
                    fill: '#ffffff',
                    stroke: '#000000',
                    width: 100,
                    height: 60,
                    rx: 5,
                    ry: 5
                },
                'text': {
                    fill: '#000000',
                    text: '',
                    'font-size': 12,
                    'ref-x': .5,
                    'ref-y': .6,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'font-family': 'Arial, helvetica, sans-serif'
                }
            }
        }, joint.shapes.basic.Generic.prototype.defaults)
    });
    joint.shapes.basic.NetDevView = joint.dia.ElementView.extend({
        update: function(cell, renderingOnlyAttrs) {

            var allAttrs = this.model.get('attrs');

            var rotatable = this.rotatableNode;
            if (rotatable) {
                var rotation = rotatable.attr('transform');
                rotatable.attr('transform', '');
            }

            var relativelyPositioned = [];
            var nodesBySelector = {};
            var $outdiv = vE(this).node.$el.find('.switchbody');
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
            var pp = this.model.attributes.dataDev;
            if (pp.Bcslot === undefined || pp.Bcslot === '') {
                pp.Bcslot = '';
            } else {
                pp.Bcslot = pp.Bcslot + '-';
            }
            if (pp.EquipPort === undefined) {
                $outdiv.find('.ppor').css({ visibility: 'hidden' });
                $outdiv.find('.cont-b').text(this.model.attributes.attrs.text.text);
                $outdiv.find('.cont-x').text(pp.EquipDesc);
                return;
            }
            if (pp.EquipType === 'IED') {
                $outdiv.find('.cont-b').text(this.model.attributes.attrs.text.text);
                $outdiv.find('.cont-x').text(pp.EquipDesc);
                $outdiv.find('.ppor').text(pp.Bcslot + pp.EquipPort)
                    .off('mouseover').on('mouseover', function(e) {
                        $('.panelS').find('.popover-title').hide();
                        $('.panelS').find('.popover-content').text(pp.Bcslot + pp.EquipPort);
                        let findbuidthis = $(this);
                        $('.panelS').css({
                            top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
                            left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
                            width: 'auto',
                            height: 'auto',
                            fontSize: '12px'
                        });
                        $('.panelS').show();
                        e.stopPropagation();
                    });
                return;
            }
            $outdiv.find('.ppor').text(pp.Bcslot + pp.EquipPortName).attr('data-id', pp.EquipPort)
                .off('mouseover').on('mouseover', function(e) {
                    $('.panelS').find('.popover-title').hide();
                    $('.panelS').find('.popover-content').text(pp.Bcslot + pp.EquipPortName);
                    let findbuidthis = $(this);
                    $('.panelS').css({
                        top: findbuidthis.offset().top - $('.panelS').height() / 2 + 'px',
                        left: findbuidthis.offset().left + findbuidthis.width() * GFC.getPaperSxy(window.paper.paperScroller).fsx + 'px',
                        width: 'auto',
                        height: 'auto',
                        fontSize: '12px'
                    });
                    $('.panelS').show();
                    e.stopPropagation();
                }).off('click').on('click', function(e) {
                    // debugger;
                    var oprthis = $(this);
                    if (e.ctrlKey || e.metaKey) {
                        if ($(this).hasClass('danger')) {
                            $(this).removeClass('danger');
                            let tbthisid = $(this);
                            window.selectiondTarPort = _.filter(window.selectiondTarPort, function(nums) {
                                return nums !== tbthisid;
                            });
                        } else {
                            $(this).addClass('danger');
                            console.log($(this).attr('data-id'));
                            window.selectiondTarPort.push($(this).attr('data-id'));
                        }
                    } else {
                        if ($('.net-ied-vlan').find('.list-group-item.list-group-item-info').length === 1) {
                            let activevlan = $('.net-ied-vlan').find('.list-group-item.list-group-item-info');
                            let vname = activevlan.attr('data-vname');
                            //let vid = activevlan.attr('data-vid');
                            let removevv = {};
                            removevv.ProjectPortGuid = oprthis.attr('data-id');
                            removevv.ProjectVlanGuid = activevlan.attr('data-guid');
                            let arr = [];
                            arr[0] = removevv;
                            let delPortFromVlan = ROOF.communication.DelPortFromVlan;
                            bootbox.dialog({
                                message: `确定要从VLAN:${vname}中删除这个端口?`,
                                title: '删除',
                                buttons: {
                                    yes: {
                                        label: '确定',
                                        className: 'btn-primary',
                                        callback: function() {
                                            delPortFromVlan(arr, function(objlar) {
                                                if (objlar.status) {
                                                    oprthis.removeClass('danger');
                                                } else {
                                                    GFC.showError(objlar.err_msg);
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
                        }
                    }
                    e.stopPropagation();
                }).on('dblclick', function(e) {
                    e.stopPropagation();
                });

            $outdiv.find('.cont-b').text(this.model.attributes.attrs.text.text);
            $outdiv.find('.cont-x').text(pp.EquipDesc);
        }

    });
    joint.shapes.devs.NetVnlink = joint.dia.Link.extend({
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
            '<span class="glyphicon glyphicon-remove"></span>',
            '</div>',
            '</foreignObject>',
            '<text />',
            '<circle />',
            '</g>'
        ].join(''),

        defaults: {
            type: 'devs.NetVnlink',
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
    joint.shapes.devs.NetVnlinkView = joint.dia.LinkView.extend({
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
            var $fdlok = this.$el.find('.iconBody');
            let pp = this.model;
            $fdlok.find('.content-x')
                .text(this.model.attributes.labels[0].attrs.text.text);
            $fdlok.css({
                color: this.model.attributes.labels[0].attrs.text.fill,
                fontSize: this.model.attributes.labels[0].attrs.text['font-size'],
                cursor: 'pointer'
            });
            let bthis = this;
            console.log(this);
            if (this.model.attributes.labels[0].attrs.text.fill === '#ff0000') {
                $fdlok.off('click').on('click', function() {
                    if ($('.net-ied-vlan').find('.list-group-item.list-group-item-info').length === 1) {
                        let activevlan = $('.net-ied-vlan').find('.list-group-item.list-group-item-info');
                        let vname = activevlan.attr('data-vname');
                        //let vid = activevlan.attr('data-vid');
                        let removevv = {};
                        removevv.ProjectPortGuid = pp.id;
                        removevv.ProjectVlanGuid = activevlan.attr('data-guid');
                        let arr = [];
                        arr[0] = removevv;
                        let delPortFromVlan = ROOF.communication.DelPortFromVlan;
                        bootbox.dialog({
                            message: `确定要从VLAN:${vname}中删除这个端口?`,
                            title: '删除',
                            buttons: {
                                yes: {
                                    label: '确定',
                                    className: 'btn-primary',
                                    callback: function() {
                                        delPortFromVlan(arr, function(objlar) {
                                            if (objlar.status) {
                                                bthis.model.attributes.labels[0].attrs.text.fill = '#306796';
                                                bthis.update();
                                            } else {
                                                GFC.showError(objlar.err_msg);
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
                    }
                });
                $fdlok.find('.glyphicon').show();
            } else {
                $fdlok.off('click');
                $fdlok.find('.glyphicon').hide();
            }
            return this;
        }
    });
})(window.jQuery, window.joint, window.GFC, window._, window.parent.window, window.V, window.bootbox);
