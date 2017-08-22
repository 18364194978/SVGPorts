'use strict';
(function($, joint, GFC, _, ROOF, vE) {
    if (ROOF === undefined) {
        ROOF = window;
    }
    GFC.noUseF(vE);
    joint.shapes.devs.ditchslink = joint.dia.Link.extend({
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
            type: 'devs.ditchslink',
            pupevt: function(cv) {
                let vlinkStr = '';
                console.log(cv.model.attributes.devDatas);
                $.each(cv.model.attributes.devDatas.Cables, function(indexcab, datacab) {
                    vlinkStr += `<div class="vlink-trs">
                                        <div class="vlink-xh tk" style="flex: 0.75;">${datacab.Layer}</div>
                                        <div class="tk" style="flex: 1.5;">${datacab.Number}</div>
                                        <div class="tk" style="flex: 1.5;">${datacab.Type}</div>
                                        <div class="tk" style="flex: 1.25;">${datacab.Start}</div>
                                        <div class="tk" style="flex: 0.75;">${datacab.End}</div>
                                        </div>`.trim();
                });

                $('#floor-v-lists').html(vlinkStr);
                $('.floor-cla-list').show();
            },
            /* router: { name: 'manhattan' },
             connector: { name: 'rounded' },*/
            attrs: {}
        }
    });
    joint.shapes.devs.ditchslinkView = joint.dia.LinkView.extend({
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

})(window.jQuery, window.joint, window.GFC, window._, window.parent.window, window.V);
