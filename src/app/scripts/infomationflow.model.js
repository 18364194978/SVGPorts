'use strict';
(function($, joint, GFC, _, ROOF, viewE) {
    if (ROOF === undefined) {
        ROOF = window;
    }
    joint.shapes.devs.InfomationDev = joint.shapes.devs.Model.extend({
        markup: `<g class="rotatable">
                <g class="scalable">
                </g>
                <rect class="body"/>
                <text class="labels"/>
                <g class="inPorts"/><g class="outPorts"/>
                </g>`.trim(),
        portMarkup: '<g class="port port<%= id %>"><rect class="port-body"/><text class="port-label"/></g>',
        defaults: joint.util.deepSupplement({
            type: 'devs.InfomationDev',
            rightMenu: {
                centerMenu: {
                    name: '编辑',
                    fc: function(cellView) {
                        var ViewModel = cellView.model;
                        var EditStr = '';
                        $('.modal-body').html('');
                        $('.modal-title').html(this.name);
                        console.log(ViewModel);
                        EditStr += '<div class="form-group">' +
                            '<label for="exampleInputEmail1">装置信息表述:</label>' +
                            '<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.attrs['.labels'].text + '" id="exampleInputEmail1" placeholder="">' +
                            '</div>';
                        $('.modal-body').html(EditStr);
                        $('.main-modal').modal();
                        /*$('.change-atr').on('keyup', function() {
                            ViewModel.attributes.attrs.text.text = joint.util.breakText($(this).val(), {
                                width: ViewModel.attributes.size.width * 0.7,
                                height: ViewModel.attributes.size.height * 0.7
                            });
                            cellView.update();
                        });*/
                        $('.edit-right').unbind('click');
                        $('.edit-right').click(function() {
                            if ($.trim($('.change-atr').val()) === '') {
                                GFC.formValidation($('.change-atr'));
                                //GFC.showWarning('设备名称不能为空！');
                                return;
                            }
                            var Devid = ViewModel.attributes.id;
                            // var ProdevName= ViewModel.attributes.attrs.text.text
                            var ProdevDate = {
                                ProdevName: $('.change-atr').val()
                            };
                            var changeProDeviceInfo = ROOF.devconfig.ChangeProDeviceInfo;
                            changeProDeviceInfo(Devid, ProdevDate, function(obj) {
                                if (obj.status) {
                                    GFC.showSuccess('修改设备成功！');
                                    ViewModel.attributes.attrs['.labels'].text = joint.util.breakText($('.change-atr').val(), {
                                        width: ViewModel.attributes.size.width * 0.7,
                                        height: ViewModel.attributes.size.height * 0.7
                                    });
                                    cellView.update();
                                    $('.main-modal').modal('hide');
                                    $('.modal-body').html('');
                                } else {
                                    $('.main-modal').modal('hide');
                                    $('.modal-body').html('');
                                    GFC.showError('修改设备失败:' + obj.err_msg);
                                }
                            });
                        });
                    }
                },
                otherMenu: [{
                    name: '连接',
                    fc: function(cellView) {
                        //var ViewModel = cellView.model;
                        var EditStr = '';
                        $('.modal-body').html('');
                        $('.modal-title').html(this.name);
                        var SignalFlow = {
                            ProjectSenddev: '', //发送端设备id
                            ProjectReceivedev: '', //接收端设备id
                            ProjectSigdesc: '', //信息流描述
                            ProjectLinktype: '' //组网类型
                        };
                        //bay.AddTypicalBaySignalFlow(signal_flow, function(obj));
                        cellView.update();
                        EditStr = '<div class="row">' +
                            '<div class="col-xs-2"></div>' +
                            '<div class="col-xs-8">' +
                            '<div class="form-group">' +
                            '<input type="text" class="form-control change-atr ProjectSigdesc" value="" placeholder="请输入信息流表述">' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-xs-2"></div>' +
                            '</div>' +
                            '<p></p>' +
                            ' <div class="row">' +
                            '<div class="col-xs-5">' +
                            '<div class="input-group input-group-sm">' +
                            '<span class="input-group-addon">间隔:</span>' +
                            '<select class="form-control start-bay-list"></select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-xs-2"></div>' +
                            '<div class="col-xs-5">' +
                            '<div class="input-group input-group-sm">' +
                            '<span class="input-group-addon">间隔:</span>' +
                            '<select class="form-control end-bay-list"></select>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<p></p>' +
                            '<div class="row">' +
                            '<div class="col-xs-5">' +
                            '<div class="input-group input-group-sm">' +
                            '<span class="input-group-addon">始端装置:</span>' +
                            '<select class="form-control start-devices-list"></select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-xs-2"></div>' +
                            '<div class="col-xs-5">' +
                            ' <div class="input-group input-group-sm">' +
                            ' <span class="input-group-addon">末端装置:</span>' +
                            '<select class="form-control end-devices-list"></select>' +
                            ' </div>' +
                            ' </div>' +
                            ' </div>' +
                            '<p></p>' +
                            '<div class="row">' +
                            '<div class="col-xs-3">' +
                            '</div>' +
                            ' <div class="col-xs-6">' +
                            '<div class="col-xs-6">' +
                            ' <span class="radio-inline">直连:</span>' +
                            ' <input type="radio" checked="checked" value="DirectLink" class="radio-inline rd-ro">' +
                            '</div>' +
                            '<div class="col-xs-6">' +
                            '<span class="radio-inline">组网:</span>' +
                            ' <input type="radio" value="NetworkLink" class="radio-inline rd-ro">' +
                            '</div>' +
                            '</div>' +
                            ' <div class="col-xs-3">' +
                            ' </div>' +
                            '</div>';
                        $('.modal-body').html(EditStr);
                        $('.main-modal').modal();
                        $('.edit-right').unbind('click');
                        var getAllBayList = ROOF.bay.GetAllBayList; //获取间隔列表
                        var getDevicesByBayId = ROOF.bay.GetDevicesByBayId; //根据间隔获取装置
                        var addTypicalBaySignalFlow = ROOF.bay.AddTypicalBaySignalFlow;
                        //var getBayInfoTree = ROOF.devconfig.GetBayInfoTree;
                        //根据起始间隔获取起始装置
                        $('.start-bay-list').on('change', function() {
                            getDevicesByBayId($(this).find('option:selected').val(), function(obj) {
                                if (obj.status) {
                                    $('.start-devices-list').html('').val('');
                                    var VoptStr = '';
                                    $.each(obj.device_list, function(index, item) {
                                        VoptStr += '<option sindex="' + index + '" value="' + item.Guid + '">' + item.ProdevName + '</option>';
                                    });
                                    $('.start-devices-list').html(VoptStr);
                                    $('.start-devices-list').val(cellView.model.id);
                                    $('.start-devices-list').on('change', function() {
                                        SignalFlow.ProjectReceivedev = $(this).find('option:selected').val();
                                    }).trigger('change');
                                } else {
                                    if (ROOF.common === undefined) {
                                        console.log(obj);
                                    } else {
                                        ROOF.common.promptInformation('失败');
                                    }

                                }
                            });

                        });
                        //根据末端间隔获取末端装置
                        $('.end-bay-list').on('change', function() {
                            getDevicesByBayId($(this).find('option:selected').val(), function(obj) {
                                if (obj.status) {
                                    $('.end-devices-list').html('').val('');
                                    var VoptStr = '';
                                    $.each(obj.device_list, function(index, item) {
                                        VoptStr += '<option sindex="' + index + '" value="' + item.Guid + '">' + item.ProdevName + '</option>';
                                    });
                                    $('.end-devices-list').html(VoptStr);
                                    $('.end-devices-list').on('change', function() {
                                        SignalFlow.ProjectReceivedev = $(this).find('option:selected').val();
                                    }).trigger('change');

                                } else {
                                    ROOF.common.promptInformation('失败');
                                }
                            });

                        });
                        $('.radio-inline').on('click', function() {
                            $('.radio-inline').prop('checked', false);
                            $(this).prop('checked', true);
                        });
                        //绑定提交按钮
                        $('.edit-right').on('click', function() {
                            if (GFC.formValidation($('.ProjectSigdesc'))) {
                                SignalFlow.ProjectSigdesc = GFC.formValidation($('.ProjectSigdesc'));
                            } else {
                                return;
                            }
                            if (GFC.formValidation($('.start-devices-list'))) {
                                SignalFlow.ProjectSenddev = GFC.formValidation($('.start-devices-list'));
                            } else {
                                return;
                            }
                            if (GFC.formValidation($('.end-devices-list'))) {
                                SignalFlow.ProjectReceivedev = GFC.formValidation($('.end-devices-list'));
                            } else {
                                return;
                            }
                            if (GFC.formValidation($('.rd-ro'))) {
                                SignalFlow.ProjectLinktype = GFC.formValidation($('.rd-ro'));
                            } else {
                                return;
                            }
                            if (SignalFlow.ProjectSenddev === SignalFlow.ProjectReceivedev) {
                                GFC.showWarning('发送端和接收端不能为同一装置');
                                return;
                            }
                            addTypicalBaySignalFlow(SignalFlow, function(obj) {
                                if (obj.status) {
                                    if (ROOF.common === undefined) {
                                        console.log(obj);
                                    } else {
                                        GFC.showSuccess('添加信息流成功！');
                                    }
                                    //ROOF.sendSvgPort.infomationFlow(ROOF.sendSvgPort.nowId);
                                    $('.main-modal').modal('hide');
                                    $('.modal-body').html('');
                                    GFC.reload();
                                } else {
                                    if (ROOF.common === undefined) {
                                        console.log(obj);
                                    } else {
                                        GFC.showError('添加信息流失败:' + obj.err_msg);
                                    }
                                    $('.main-modal').modal('hide');
                                    $('.modal-body').html('');
                                }
                            });
                        });
                        //第一次加载间隔和装置数据
                        getAllBayList(function(obj) {
                            if (obj.status) {
                                $('.end-bay-list').html('');
                                var VoptStr = '';
                                $.each(obj.bay_list, function(index, item) {
                                    VoptStr += '<option sindex="' + index + '" value="' + item.Guid + '">' + item.ProbayName + '</option>';
                                });
                                $('.start-bay-list').html(VoptStr);
                                $('.end-bay-list').html(VoptStr);
                                $('.end-bay-list').trigger('change');
                                $('.start-bay-list').val(cellView.model.attributes.bayId);
                                $('.start-bay-list').trigger('change');
                                $('.end-bay-list').val(cellView.model.attributes.bayId);
                                $('.end-bay-list').trigger('change');
                            } else {
                                ROOF.common.promptInformation('失败');
                            }
                        });
                    }
                }]
            },
            attrs: {
                '.body': {
                    fill: '#ffffff',
                    stroke: '#000000',
                    width: 100,
                    height: 60,
                    rx: 5,
                    ry: 5
                },
                '.label': {
                    fill: '#000000',
                    text: '',
                    'font-size': 12,
                    'ref-x': .5,
                    'ref-y': .5,
                    'text-anchor': 'middle',
                    'y-alignment': 'middle',
                    'font-family': 'Arial, helvetica, sans-serif'
                },
                '.inPorts .port-label': { x: -15, dy: 4, 'text-anchor': 'end', fill: '#000000' },
                '.outPorts .port-label': { x: 15, dy: 4, fill: '#000000' }
            }
        }, joint.shapes.devs.Model.prototype.defaults),
        getPortAttrs: function(portName, index, total, selector, type) {

            var attrs = {};

            var portClass = 'port' + index;
            var portSelector = selector + '>.' + portClass;
            var portLabelSelector = portSelector + '>.port-label';
            var portBodySelector = portSelector + '>.port-body';

            attrs[portLabelSelector] = { text: portName };
            attrs[portBodySelector] = { port: { id: portName || _.uniqueId(type), type: type } };
            attrs[portSelector] = { ref: '.body', 'ref-y': index * 60 };
            if (selector === '.outPorts') { attrs[portSelector]['ref-dx'] = 0; }

            return attrs;
        }
    });
    joint.shapes.devs.InfomationDevView = joint.shapes.devs.ModelView.extend({
        renderPorts: function() {

            var $inPorts = this.$('.inPorts').empty();
            var $outPorts = this.$('.outPorts').empty();
            var portTemplate = _.template(this.model.portMarkup);
            let inheight = _.filter(this.model.ports, function(p) {
                return p.type === 'in';
            });
            if (inheight.length * 60 > this.model.attributes.size.height) {
                this.model.attributes.size.height = inheight.length * 60;
                this.model.attributes.attrs['.body'].height = inheight.length * 60;
                //this.model.attributes.position.y -= (inheight.length * 60 - 70);
            }
            let ouheight = _.filter(this.model.ports, function(p) {
                return p.type === 'out';
            });
            if (ouheight.length * 60 > this.model.attributes.size.height) {
                this.model.attributes.size.height = ouheight.length * 60;
                this.model.attributes.attrs['.body'].height = ouheight.length * 60;
                // this.model.attributes.position.y += (ouheight.length * 100);
            }
            // let fmodels = window.paper.graph.attributes.cells.models;
            // let bthis = this;
            // let bthisX = bthis.model.attributes.position.x;
            // let bthisY = bthis.model.attributes.position.y;
            // let bthisH = bthis.model.attributes.size.height;
            // $.each(fmodels, function(cellindex, celldata) {
            //     if (celldata.attributes.type === 'devs.InfomationDev') {
            //         let fcellfill = celldata.attributes.position;
            //         if (bthisX === fcellfill.x) {
            //             if (fcellfill.y - bthisY === 70) {
            //                 if ((bthisY + bthisH + 70) > fcellfill.y) {
            //                     celldata.attributes.position.y = bthisY + bthisH + 70;
            //                     console.log(celldata);
            //                 }

            //             }
            //             //celldata.attributes.position.y = bthis.model.attributes.position.y + bthis.model.attributes.attrs['.body'].height + 70;
            //             //window.paper.paper.findViewByModel(celldata).update();
            //         }
            //     }
            // });
            _.each(_.filter(this.model.ports, function(p) {
                return p.type === 'in';
            }), function(port, index) {
                $inPorts.append(viewE(portTemplate({ id: index, port: port })).node);
            });
            _.each(_.filter(this.model.ports, function(p) {
                return p.type === 'out';
            }), function(port, index) {
                $outPorts.append(viewE(portTemplate({ id: index, port: port })).node);
            });
            //this.update();
        }
    });
})(window.jQuery, window.joint, window.GFC, window._, window.parent.window, window.V);
