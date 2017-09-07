'use strict';
(function($, joint, _, viewE, ROOF, GFC, bootbox) {
	if (ROOF === undefined) {
		ROOF = window;
	}
	joint.shapes.devs.AtomicR = joint.shapes.devs.Model.extend({ //main_device内部端口
		markup: `<g class="rotatable">
                <g class="scalable">
                </g>
                <rect class="body"/>
                <text class="labels"/>
                <foreignObject width="80" height="30" x="0" y="0" class="htIconOut">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:center;">
                    <a title="rdgdfgd" class="content-x text-center" style="color:white;font-size: inherit;display:inline-block;width:80px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
                    </div>
                </foreignObject>
                <foreignObject width="30" height="30" x="102" y="0" class="htIconOut2">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="background-color:#00B0F0;text-align:center;">
                    <a title="" class="content-xx text-center" style="color:white;display:inline-block;width:30px;height:30px;line-height: 30px;text-decoration: none;"></a>
                    </div>
                </foreignObject>
                </g>`.trim(),
		defaults: joint.util.deepSupplement({
			type: 'devs.AtomicR',
			paper: null,
			showTopanel: function(cellView) {
				$('.infosig-group').find('button').removeClass('disabled');
				let fmodels = window.paper.graph.getLinks();
				let dvdpostion = cellView.model;
			},
			rightMenu: {
				centerMenu: {
					name: '编辑',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						console.log(cellView, 'cellllll')
						var EditStr = '';
						$('.modal-body').html('');
						$('.modal-title').html(this.name);
						EditStr += '<div class="form-group">' +
							'<label for="ProportName">端口信息名称:</label>' +
							'<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.devDatas.ProdevName + '" id="ProportName">' +
							'</div>';
						$('.modal-body').html(EditStr);
						$('.main-modal').modal();
						$('.edit-right').unbind('click');
						$('.edit-right').click(function() {
							if (!GFC.formValidation($('#ProportName'))) {
								GFC.showError('名称必填!');
								return;
							}
							if (GFC.formValidation($('#ProportName')).length > 12) {
								GFC.showError('端口名称长度不能大于12位!');
								return;
							}
							if (isNaN(parseInt(GFC.formValidation($('#ProportName'))))) {
								GFC.showError('端口名称必须为数字!');
								return;
							}
							var slotObj = {
								Guid: ViewModel.id, //端口id
								PortName: GFC.formValidation($('#ProportName'))
							};
							slotObj.Guid = ViewModel.attributes.devDatas.Guid;
							slotObj.PubbsPubportBcslotGuid = ViewModel.attributes.devDatas.ProbsProportBcslotGuid;
							slotObj.PortName = GFC.formValidation($('#ProportName'));
							slotObj.PortDesc = ViewModel.attributes.devDatas.ProportDesc;
							slotObj.PortMediaType = ViewModel.attributes.devDatas.ProportMediatype;
							slotObj.PortJointType = ViewModel.attributes.devDatas.ProportJointtype;
							slotObj.PortFuncType = ViewModel.attributes.devDatas.ProportFunctiontype;
							slotObj.ProportDesc = ViewModel.attributes.devDatas.ProportDesc;
							var setPubPortInfo = ROOF.devconfig.SetPortInfo;
							setPubPortInfo(slotObj, function(obj) {
								if (obj.status) {
									ViewModel.attributes.devDatas.ProportName = GFC.formValidation($('#ProportName'));
									let cjname = cellView.model.attributes.devDatas.ProdevName;
									if (cellView.model.attributes.devDatas.ProdevName === '') {
										cjname = '';
									}
									cellView.model.attributes.porttts = cjname;
									cellView.model.attributes.attrs.text.text = cjname;
									cellView.update();
									//GFC.reload();
									$('.main-modal').modal('hide');
								} else {
									GFC.showError(obj.err_msg);
								}
							});
						});

					}
				},
				otherMenu: [{
					name: '上光配',
					fc: function(cellView) {
						var $this = this;
						if (1 == 1) { //todo此处后期会换成加载上光配的接口
							var gettreedata = window.treedata;
							var data = [];
							for (var i = 0; i < gettreedata.length; i++) {
								data.push({
									name: gettreedata[i].Name,
									Guid: gettreedata[i].Guid,
									children: getChildren(gettreedata[i].child)
								});
							}

							function getChildren(list) {
								let arr = [];
								for (var l = 0; l < list.length; l++) {
									arr.push({
										name: list[l].Name,
										Guid: list[l].Guid,
										children: getChildren2(list[l].child)
									});
								}
								return arr;
							}

							function getChildren2(list) {
								let arr = [];
								for (var i = 0; i < list.length; i++) {
									arr.push({
										name: list[i].Name,
										Guid: list[i].Guid
									});
								}
								return arr;
							}

							function getDefaultTreeOption() { //此处是给ztree加默认的图标
								function addDiyDom(treeId, treeNode) {
									var spaceWidth = 8;
									var switchObj = $("#" + treeNode.tId + "_switch"),
										icoObj = $("#" + treeNode.tId + "_ico"),
										checkObj = $("#" + treeNode.tId + "_check");
									switchObj.remove();
									checkObj.remove();
									icoObj.before(switchObj);
									icoObj.before(checkObj);
									if (treeNode.level > 0) {
										var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
										switchObj.before(spaceStr);
									}
								}
								var defaultTreeSetting = {
									view: {
										showLine: false,
										showIcon: false,
										dblClickExpand: false,
										addDiyDom: addDiyDom,
										dblClickExpand: true
									}
								};
								return defaultTreeSetting;
							}
							console.log(data, 'dddddddd')
							var EditStr = '';
							$('.modal-body').html('').css({
								'padding-top': '5px'
							});
							$('.modal-title').html($this.name);
							EditStr =
								`<div class="modal-body" id="plugSelectModalModal"> 
								<div style="height:360px;width:552px;margin:auto;"> 
								<div class="plugselect-modal-left"> 
								<div class="plugselect-pubtree-div"> 
								<label style="margin-right:120px">光配列表：</label>
								<button id="plugtreeSearch" class="btn btn-default" style=" float:right">添加光配箱</button> 
								</div> 
								<ul class="plugselect-pubtree ztree" id="publicplugTree"></ul> 
								</div> 
								<div class="plugselect-modal-middle"> 
								<span id="plugselectBtn" class="fa fa-chevron-right"></span> 
								</div> 
								</div> 
								</div> `.trim();
							// $('.modal-dialog').css('width','400px');
							$('.modal-body').html(EditStr);
							$('.main-modal').modal('show');
							var option = {
								callback: {
									beforeExpand: function(treeId, treeNode) {
										if (treeNode.level == 2) {
											treeNode.hasLoad = true;
											console.log('node2');
										}
										if (treeNode.level == 3) {
											console.log('node3');
										}
										return true;
									}
								}
							};
							var zTree = $.fn.zTree.init($("#publicplugTree"), $.extend(true, option, getDefaultTreeOption()));
							zTree.addNodes(null, data);
						}
					}
				}, {
					name: '去光配',
					fc: function(cellView) {
						console.log('点击端口');
					}
				}, {
					name: '更换',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						var $this = this;
						let AppH = [];
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
						getPortsByDeviceId(ViewModel.attributes.parent, function(obj) {
							if (obj.status) {
								$('.main-modal-body').html('');
								$('.modal-title').html($this.name);
								let str = '';
								$.each(obj.slot_list, function(poindx, podate) {
									var strc = '';
									$.each(podate.Port_List, function(index, item) {
										var spanStr = '',
											findStr = '',
											isdisable = '';
										if (item.c_pd_id !== undefined || item.c_pd_id === '') {
											let devname;
											if (item.c_dev_name === undefined) {
												devname = item.c_ns_name;
											} else {
												devname = item.c_dev_name;
											}
											findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
											isdisable = 'disabled';
										}
										if (item.c_p1_id !== undefined) {
											spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
										}
										if (podate.BcslotId === '' || podate.ProbsDesc === '') {
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                <span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										} else {
											item.BcslotId = podate.BcslotId;
											item.ProbsDesc = podate.ProbsDesc;
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${podate.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${podate.ProbsName}-<span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										}
										AppH.push(item);

									});
									let soledesc = podate.ProbsDesc;
									if (soledesc === '') {
										soledesc = '点击展开';
									}
									str += `<div class="panel panel-info" style="border:none;">
                                                <div class="panel-heading" role="tab" id="headingOne-${poindx}">
                                                    <a data-id="${podate.BcslotId}" role="button" data-toggle="collapse" data-parent="#port-solt-list" href="#collapseOne-${poindx}" aria-expanded="true" aria-controls="collapseOne-${poindx}">
                                                     ${soledesc}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${poindx}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-${poindx}">
                                                  <div class="panel-body">
                                                    <div class="list-group">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
								});
								let slotll = `<div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                        <div class="panel-group" id="port-solt-list">
                                                        ${str}
                                                        </div>
                                                </div>`;
								$('.main-modal-body').html(slotll);
								$('.main-modal').modal();
								$('.edit-right').off('click').on('click', function() {
									$('.main-modal').modal('hide');
								});
								$('.list-group-item').off('click').on('click', function() {
									let $thisE = $(this);
									if ($thisE.hasClass('disabled')) {
										return;
									}
									let changePhyPort = ROOF.physical.ChangePhyPort;
									changePhyPort(ViewModel.id, $thisE.attr('data-id'), function(objmn) {
										if (objmn.status) {
											$('.main-modal').modal('hide');
											GFC.reload();
										} else {
											GFC.showError(objmn.err_msg);
										}
									});
								});

							} else {
								GFC.showError(obj.err_msg);
							}
						});
					}
				}, {
					name: '连接',
					fc: function(cellView) {
						var getAllPanelsAndDevs = ROOF.physical.GetAllPanelsAndDevs; //获取接口
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId; //获取接口
						var addPhyFiberEx = ROOF.physical.AddPhyFiberEx; //获取接口
						var addPhyFiber = ROOF.physical.AddPhyFiber;
						var $this = this;
						getAllPanelsAndDevs(function(obj) {
							if (obj.status) {
								var EditStr = '';
								$('.modal-body').html('').css({
									'padding-top': '5px'
								});
								$('.modal-title').html($this.name);
								EditStr = `<div class="ctrl-ist text-muted" style="position:absolute; left:18px;bottom:-40px;font-size: 14px;">按下ctrl键用鼠标点击可以批量选择端口.</div>
                                                <div class="row" style="padding-top:inherit;padding-right:inherit;padding-left:inherit">
                                                    <div class="form-group" style="float:left;width:40%;margin-right:10%">
                                                    <label>对侧屏柜:</label>
                                                        <select class="form-control end-panel-list"></select>
                                                    </div>
                                                    <div class="form-group" style="float:left;width:40%">
                                                    <label>对侧装置:</label>
                                                        <select class="form-control end-pdevices-list"></select>
                                                    </div>
                                                </div>
                                            <p></p>
                                            <div class="row" style="padding-bottom:inherit;padding-left:inherit;padding-right:inherit">
                                                <label>对侧端口:</label>
                                                    <div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                            <div class="panel-group end-solt-list" id="end-solt-list">
                                                            </div>
                                                    </div>
                                            </div>
                                            <div class="row" style="padding-top:inherit;padding-right:inherit;padding-left:inherit">
                                                    <div class="form-group" style="float:left;width:20%;margin-right:5%">
                                                    <input class="" type="checkbox" checked="true">
                                                    <label>收发联动</label>
                                                    </div>
                                                    <div class="form-group" style="float:left;width:20%">
                                                    <input class="" type="checkbox"/>
                                                    <label>自动上光配</label>
                                                    </div>
                                                </div>`.trim();
								$('.modal-body').html(EditStr);
								// $('.main-modal').find('.modal-dialog').addClass('inherit-width');//将弹框设置为屏幕宽度
								$('.main-modal').modal('show');
								let isEdit = 0;
								$('.main-modal').off('hidden.bs.modal').on('hidden.bs.modal', function() {
									// $('.main-modal').find('.modal-dialog').removeClass('inherit-width');//将弹框设置为屏幕宽度
									GFC.rmStorage('linkOpenListCollapse');
									if (isEdit === 0) {
										return;
									}
									GFC.reload();
								});
								$('.edit-right').unbind('click');
								var IsCtrl = false;
								var ispl = false;
								let openPlC = function(event) {
									if (event.ctrlKey === true) {
										IsCtrl = true;
										//$('.poitem-to').removeClass('active');
										$('.ctrl-ist').removeClass('text-muted');
										$('.ctrl-ist').addClass('text-danger').text('目前状态是批量选择端口.');
									}
								};
								let closePlC = function(event) {
									if (event.which === 17) {
										IsCtrl = false;
										//$('.poitem-to').removeClass('list-group-item-info');
										$('.ctrl-ist').removeClass('text-danger');
										$('.ctrl-ist').addClass('text-muted').text('按下ctrl键用鼠标点击可以批量选择端口.');
									}
								};
								$(window).off('keyup').on('keyup', closePlC);
								$(window).off('keydown').on('keydown', openPlC);
								if (window.parent !== undefined) {
									$(ROOF).off('keyup').on('keyup', closePlC);
									$(ROOF).off('keydown').on('keydown', openPlC);
								}
								var creatlistPanel = function(sdg, ts) {
									sdg.html('');
									var str = '';
									var thispannel;
									$.each(obj.panel_list, function(indg, dgg) {
										if (dgg.PanelId === '' || dgg.ProprName === '') {
											return true;
										}
										str += `
                                                <option value="${dgg.PanelId}">${dgg.ProprName}</option>
                                                `.trim();
									});
									sdg.html(str);
									sdg.off('change').on('change', function() {
										var dArray = _.findWhere(obj.panel_list, {
											PanelId: $(this).val()
										});
										if (ts === 'l') {
											creatlistDev($('.start-pdevices-list'), dArray.Children, ts);
										} else {
											creatlistDev($('.end-pdevices-list'), dArray.Children, ts);
										}
									});
									if (ts === 'l') {
										$.each(obj.panel_list, function(ghind, ddde) {
											if (_.findWhere(ddde.Children, {
													Guid: cellView.model.id
												}) !== undefined) {
												thispannel = ddde.PanelId;
											}
										});
										sdg.val(thispannel);
										sdg.trigger('change');
										sdg.attr('disabled', 'disabled');
									} else {
										sdg.trigger('change');
									}

								};
								var creatlistDev = function(dsdg, ddata, ts) {
									dsdg.html('');
									var str = '';
									$.each(ddata, function(indg, dgg) {
										if (dgg.Guid === '' || dgg.ProdevName === '') {
											return true;
										}
										str += `
                                                <option value="${dgg.Guid}">${dgg.ProdevName}</option>
                                                `.trim();
									});
									dsdg.html(str);
									dsdg.off('change').on('change', function() {
										getPortsByDeviceId($(this).val(), function(portobj) {
											if (portobj.status) {
												var dArray = portobj.slot_list;
												// if (dArray.length === 0) {
												//   return;
												// }
												if (ts === 'l') {
													$('.start-solt-list').html('');
													creatlistSolt($('.start-solt-list'), dArray, ts);
												} else {
													$('.end-solt-list').html('');
													creatlistSolt($('.end-solt-list'), dArray, ts);
												}
											} else {
												console.log('ddd');
											}
										});

									});
									if (ts === 'l') {
										dsdg.val(cellView.model.id);
										dsdg.trigger('change');
										dsdg.attr('disabled', 'disabled');
									} else {
										dsdg.trigger('change');
									}
								};
								var creatlistSolt = function(dsdg, ddata, ts) {

									dsdg.html('');
									var str = '';
									var thislistid = '';
									var thisclass = '';
									if (ts === 'l') {
										thislistid = '#start-solt-list';
										thisclass = 'start-port-list';
									} else {
										thislistid = '#end-solt-list';
										thisclass = 'end-port-list';
									}
									$.each(ddata, function(indg, dgg) {
										var strc = '';
										$.each(dgg.Port_List, function(index, item) {
											var spanStr = '',
												findStr = '',
												isdisable = '';
											//console.log(item.c_pd_id);
											if (item.c_pd_id !== undefined || item.c_pd_id === '') {
												let devname;
												if (item.c_dev_name === undefined) {
													devname = item.c_ns_name;
												} else {
													devname = item.c_dev_name;
												}
												findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
												isdisable = 'disabled';
											}
											if (item.c_p1_id !== undefined) {
												spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
											}
											if (dgg.BcslotId === '' || dgg.ProbsDesc === '') {
												strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${item.ProportName}[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
											} else {
												strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${dgg.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${dgg.ProbsName}-${item.ProportName}[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
											}


											//ProbsDesc + '-' + ProbsName + '-' + ProportFunctiontype + '-' + ProportJointtype,
										});
										let isInNet = '';
										if (dgg.BcslotId === '' || dgg.ProbsDesc === '') {
											isInNet = 'in';
										}
										if (dgg.ProbsName === '') {
											dgg.ProbsName = '交换机端口';
										}
										str += `<div class="panel">
                                                <div class="panel-heading" role="tab" id="headingOne-${ts}${indg}">
                                                    <a data-id="${dgg.BcslotId}" role="button" data-toggle="collapse" data-parent="${thislistid}" href="#collapseOne-${ts}${indg}" aria-expanded="true" aria-controls="collapseOne-${ts}${indg}">
                                                     ${dgg.ProbsName}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${ts}${indg}" class="panel-collapse collapse ${isInNet}" role="tabpanel" aria-labelledby="headingOne-${ts}${indg}">
                                                  <div class="panel-body">
                                                    <div class="list-group ${thisclass}">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
									});
									console.log('aaa');
									dsdg.html(str);
									if (ts === 'l') {
										creatlistPort($('.start-port-list'));
									} else {
										creatlistPort($('.end-port-list'));
									}
									if (GFC.getStorage('linkOpenListCollapse') !== undefined) {
										$.each(GFC.getStorage('linkOpenListCollapse'), function(opindex, opids) {
											$('#' + opids).addClass('in');
										});
									}
								};
								var creatlistPort = function(sgt) {
									//sgt.html('');

									$('.findSenRevs').popover({
										trigger: 'hover'
									});
									sgt.find('.poitem-to').off('click').on('click', function() {
										if ($(this).hasClass('disabled')) {
											return;
										}
										if (IsCtrl) {
											ispl = true;
											$('.poitem-to.active').addClass('list-group-item-info');
											$('.poitem-to').removeClass('active');
											if ($(this).hasClass('list-group-item-info')) {
												$(this).removeClass('list-group-item-info');
											} else {
												$(this).addClass('list-group-item-info');
											}

										} else {
											ispl = false;
											$('.poitem-to').removeClass('list-group-item-info');
											if ($(this).hasClass('active')) {
												$(this).removeClass('active');
												sgt.find('.poitem-to').removeClass('active');
												return;
											}
											sgt.find('.poitem-to').removeClass('active');
											$(this).addClass('active');
										}

									}).off('dblclick').on('dblclick', function() {
										ispl = false;
										$('.poitem-to').removeClass('list-group-item-info');
										if ($(this).hasClass('active')) {
											$(this).removeClass('active');
											sgt.find('.poitem-to').removeClass('active');
											return;
										}
										sgt.find('.poitem-to').removeClass('active');
										$(this).addClass('active');
										if ($('.list-group-item.active').length === 2) {
											$('.edit-right').trigger('click');
										}
									});

									//GFC.showError(portobj.err_msg);
								};
								creatlistPanel($('.start-panel-list'), 'l');
								creatlistPanel($('.end-panel-list'), 'r');
								$('.edit-right').off('click').on('click', function() {
									var sendPortArray = [];
									var recvPortArray = [];
									let sendportname = [];
									let recvportname = [];
									let sendporttpye = [];
									let recvporttpye = [];
									var startAr = $('.start-port-list').find('.list-group-item-info');
									if (startAr.length !== 0) {
										$.each(startAr, function(stinx) {
											sendPortArray.push({
												type: startAr.eq(stinx).attr('data-types'),
												id: startAr.eq(stinx).attr('data-id')
											});
											sendportname.push(startAr.eq(stinx).attr('data-port-name'));
											sendporttpye.push(startAr.eq(stinx).attr('data-types'));
										});
									}
									var endAr = $('.end-port-list').find('.list-group-item-info');
									if (endAr.length !== 0) {
										$.each(endAr, function(endinx) {
											recvPortArray.push({
												type: endAr.eq(endinx).attr('data-types'),
												id: endAr.eq(endinx).attr('data-id')
											});
											recvportname.push(endAr.eq(endinx).attr('data-port-name'));
											recvporttpye.push(endAr.eq(endinx).attr('data-types'));
										});
									}
									var startAt = $('.start-port-list').find('.active').attr('data-id');
									var endAt = $('.end-port-list').find('.active').attr('data-id');
									if (ispl) {
										if (_.uniq(sendportname).length !== _.uniq(recvportname).length) {
											GFC.showError('请确保两侧批量选择的数量一致');
											return;
										}
										if (_.where(sendporttpye, 'DX').length !== 0 || _.where(recvporttpye, 'DX').length !== 0) {
											if (sendPortArray.length !== recvPortArray.length || _.where(sendporttpye, 'DX').length !== _.where(recvporttpye, 'DX').length) {
												GFC.showError('电口不能与光口连接');
												return;
											}

										} else {
											if (sendPortArray.length !== recvPortArray.length || _.where(sendporttpye, 'TX').length !== _.where(recvporttpye, 'RX').length) {
												GFC.showError('请确保两侧收发类型一致');
												return;
											}
											//var s = [1, 1, 1, 0, 1, 0, 0];
											if (_.findWhere(sendPortArray, {
													type: 'TX'
												}) !== undefined && _.findWhere(sendPortArray, {
													type: 'RX'
												}) !== undefined) {
												let senda = 0;
												let sendb = 1;
												let sendt = [];
												$.each(sendPortArray, function(indexsend, ss) {
													if (ss.type === 'TX') {
														sendt[senda] = ss;
														senda += 2;
													} else {
														sendt[sendb] = ss;
														sendb += 2;
													}
												});
												let recva = 1;
												let recvb = 0;
												let recvt = [];
												$.each(recvPortArray, function(indexrecv, rr) {
													if (rr.type === 'TX') {
														recvt[recva] = rr;
														recva += 2;
													} else {
														recvt[recvb] = rr;
														recvb += 2;
													}
												});
												sendPortArray = sendt;
												recvPortArray = recvt;
											}
										}
										var fiberlist = [];
										$.each(sendPortArray, function(sendindex, senditem) {
											fiberlist.push({
												SrcPortId: senditem.id
											});
										});
										$.each(recvPortArray, function(recvindex, recvitem) {
											fiberlist[recvindex].DstPortId = recvitem.id;
										});
										addPhyFiberEx(fiberlist, function(plstj) {
											if (plstj.status) {
												$('.poitem-to').removeClass('list-group-item-info');
												$('.poitem-to').removeClass('active');
												let arrOpen = [];
												$.each($('.panel-collapse.collapse.in'), function(epl, epd) {
													arrOpen.push(epd.id);
												});
												GFC.setStorage('linkOpenListCollapse', arrOpen);
												let endval = $('.end-pdevices-list').val();
												$('.start-pdevices-list').trigger('change');
												$('.end-pdevices-list').val(endval).trigger('change');
												isEdit = 1;
											} else {
												GFC.showError(plstj.err_msg);
											}
										});

									} else {
										var portinfo = {};
										if (startAt === undefined || endAt === undefined) {
											GFC.showError('请确保两侧各有一个端口被选中');
											return;
										}
										portinfo.SrcPortId = startAt;
										portinfo.DstPortId = endAt;
										console.log(portinfo);
										let sr = $('[data-id=' + portinfo.SrcPortId + ']').attr('data-types');
										let ds = $('[data-id=' + portinfo.DstPortId + ']').attr('data-types');
										if (sr === 'DX' || ds === 'DX') {
											if (sr !== ds) {
												GFC.showError('电口不能与光口连接');
												return;
											}
										} else {
											if (sr === ds) {
												GFC.showError('相同收发类型的端口不能相连');
												return;
											}
										}
										addPhyFiber(portinfo, function(dlstj) {
											if (dlstj.status) {
												$('.poitem-to').removeClass('list-group-item-info');
												$('.poitem-to').removeClass('active');
												let arrOpen = [];
												$.each($('.panel-collapse.collapse.in'), function(epl, epd) {
													arrOpen.push(epd.id);
												});
												GFC.setStorage('linkOpenListCollapse', arrOpen);
												let endval = $('.end-pdevices-list').val();
												$('.start-pdevices-list').trigger('change');
												$('.end-pdevices-list').val(endval).trigger('change');
												isEdit = 1;
											} else {
												GFC.showError(dlstj.err_msg);
											}
										});
									}
								});
							} else {
								GFC.showError(obj.err_msg);
							}
						});
					}
				}]
			},
			attrs: {
				'.body': {
					fill: 'salmon'
				},
				'.labels': {
					text: 'Atomic'
				},
				'.inPorts .port-body': {
					fill: 'PaleGreen',
					'pointer-events': 'none'
				},
				'.outPorts .port-body': {
					fill: 'Tomato',
					'pointer-events': 'none'
				}
			}
		}, joint.shapes.devs.Model.prototype.defaults),
		initialize: function() { //此处暂时没调用，后期没用的话可以删除
			joint.shapes.devs.Model.prototype.initialize.apply(this, arguments);
			this.bindAutoSize(this);
			this.attributes.llk = [];
			this.attributes.rik = [];
			var $this = this;
			$.each(this.attributes.inPorts, function(index, item) {
				$this.attributes.llk.push(item.Guid);
			});
			$.each(this.attributes.outPorts, function(index, item) {
				$this.attributes.rik.push(item.Guid);
			});
		},
		bindAutoSize: function(element) { //此处也暂时未用到，同上（注意：initialize里调用了此方法需要同步删除）
			var porNumber;
			if (element.attributes.inPorts.length > element.attributes.outPorts.length) {
				porNumber = element.attributes.inPorts.length;
			} else {
				porNumber = element.attributes.outPorts.length;
			}
			var portHeight = (element.attributes.attrs['.inPorts rect'].height + 2) * porNumber + 50;
		},
		getPortAttrs: function(portName, index, total, selector, type) { //此处为展示硬接线port与线的方法，后期用到可以研究下，此时可以先屏蔽
			var attrs = {};
			console.log('777777');
			var portClass = 'port' + index;
			var portSelector = selector + '>.' + portClass;
			var portLabelSelector = portSelector + '>.port-label';
			var portBodySelector = portSelector + '>.port-body';

			attrs[portLabelSelector] = {
				text: portName
			};
			attrs[portBodySelector] = {
				port: {
					id: portName || _.uniqueId(type),
					type: type
				}
			};
			attrs[portSelector] = {
				ref: '.body',
				'ref-y': index * 26
			};
			if (this.embedport === undefined) {
				this.embedport = {};
			}
			if (this.embedport.in === undefined) {
				this.embedport.in = [];
			}
			if (this.embedport.out === undefined) {
				this.embedport.out = [];
			}
			//插件名称-端口名称-收发类型-接口类型
			if (selector === '.inPorts') {
				if (this.attributes.inPorts.length !== 0) {
					let cjname = this.attributes.inPorts[index].ProbsName + '-';
					let dkname = this.attributes.inPorts[index].ProportName + '-';
					let fcname = this.attributes.inPorts[index].ProportFunctiontype + '-';
					let joname = this.attributes.inPorts[index].ProportJointtype + '-';
					let dename = this.attributes.inPorts[index].ProportDesc;
					let devdesc = this.attributes.inPorts[index].ProbsDesc;
					if (this.attributes.inPorts[index].ProbsName === '') {
						cjname = '';
						devdesc = '';
					}
					devdesc = '';
					this.embedport.in[index] = new joint.shapes.basic.RectPort({
						id: this.attributes.inPorts[index].Guid,
						position: {
							x: this.attributes.position.x,
							y: this.attributes.position.y + index * 26
						},
						porttts: devdesc + cjname + dkname + fcname + joname + dename,
						z: window.assemblyz += 1,
						size: {
							width: 100,
							height: 24
						},
						devDatas: this.attributes.inPorts[index],
						panelData: this.attributes.panelData,
						attrs: {
							text: {
								text: joint.util.breakText(cjname + dkname + fcname + joname, {
									width: 100,
									height: 24
								})
							}
						}
					});
					this.embed(this.embedport.in[index]);
				}
			}
			if (selector === '.outPorts') {
				attrs[portSelector]['ref-dx'] = 0;
				if (this.attributes.outPorts.length !== 0) {
					let cjname = this.attributes.outPorts[index].ProbsName + '-';
					let dkname = this.attributes.outPorts[index].ProportName + '-';
					let fcname = this.attributes.outPorts[index].ProportFunctiontype + '-';
					let joname = this.attributes.outPorts[index].ProportJointtype + '-';
					let dename = this.attributes.outPorts[index].ProportDesc;
					let devdesc = this.attributes.outPorts[index].ProbsDesc + '-';
					if (this.attributes.outPorts[index].ProbsName === '') {
						cjname = '';
						devdesc = '';
					}
					devdesc = '';
					this.embedport.out[index] = new joint.shapes.basic.RectPort({
						id: this.attributes.outPorts[index].Guid,
						position: {
							x: this.attributes.size.width + this.attributes.position.x - 63,
							y: this.attributes.position.y + index * 26
						},
						porttts: devdesc + cjname + dkname + fcname + joname + dename,
						z: window.assemblyz += 1,
						size: {
							width: 100,
							height: 24
						},
						devDatas: this.attributes.outPorts[index],
						panelData: this.attributes.panelData,
						attrs: {
							text: {
								text: joint.util.breakText(cjname + dkname + fcname + joname, {
									width: 100,
									height: 24
								})
							}
						}
					});
					this.embed(this.embedport.out[index]);
				}
			}

			return attrs;
		}
	});
	joint.shapes.devs.AtomicT = joint.shapes.devs.Model.extend({ //other_device内部端口
		markup: `<g class="rotatable">
                <g class="scalable">
                </g>
                <rect class="body"/>
                <text class="labels"/>
                <foreignObject width="80" height="30" x="30" y="0" class="htIconOut">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:center;">
                    <a title="rdgdfgd" class="content-x text-center" style="color:white;font-size: inherit;display:inline-block;width:80px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
                    </div>
                </foreignObject>
                <foreignObject width="30" height="30" x="0" y="0" class="htIconOut2">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="background-color:#00B0F0;text-align:center;">
                    <a title="" class="content-xx text-center" style="color:white;display:inline-block;width:30px;height:30px;line-height: 30px;text-decoration: none;"></a>
                    </div>
                </foreignObject>
                </g>`.trim(),
		defaults: joint.util.deepSupplement({
			type: 'devs.AtomicR',
			paper: null,
			showTopanel: function(cellView) {
				$('.infosig-group').find('button').removeClass('disabled');
				let fmodels = window.paper.graph.getLinks();
				let dvdpostion = cellView.model;
			},
			rightMenu: {
				centerMenu: {
					name: '编辑',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						console.log(cellView, 'cellllll')
						var EditStr = '';
						$('.modal-body').html('');
						$('.modal-title').html(this.name);
						EditStr += '<div class="form-group">' +
							'<label for="ProportName">端口信息名称:</label>' +
							'<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.devDatas.ProdevName + '" id="ProportName">' +
							'</div>';
						$('.modal-body').html(EditStr);
						$('.main-modal').modal();
						$('.edit-right').unbind('click');
						$('.edit-right').click(function() {
							if (!GFC.formValidation($('#ProportName'))) {
								GFC.showError('名称必填!');
								return;
							}
							if (GFC.formValidation($('#ProportName')).length > 12) {
								GFC.showError('端口名称长度不能大于12位!');
								return;
							}
							if (isNaN(parseInt(GFC.formValidation($('#ProportName'))))) {
								GFC.showError('端口名称必须为数字!');
								return;
							}
							var slotObj = {
								Guid: ViewModel.id, //端口id
								PortName: GFC.formValidation($('#ProportName'))
							};
							slotObj.Guid = ViewModel.attributes.devDatas.Guid;
							slotObj.PubbsPubportBcslotGuid = ViewModel.attributes.devDatas.ProbsProportBcslotGuid;
							slotObj.PortName = GFC.formValidation($('#ProportName'));
							slotObj.PortDesc = ViewModel.attributes.devDatas.ProportDesc;
							slotObj.PortMediaType = ViewModel.attributes.devDatas.ProportMediatype;
							slotObj.PortJointType = ViewModel.attributes.devDatas.ProportJointtype;
							slotObj.PortFuncType = ViewModel.attributes.devDatas.ProportFunctiontype;
							slotObj.ProportDesc = ViewModel.attributes.devDatas.ProportDesc;
							var setPubPortInfo = ROOF.devconfig.SetPortInfo;
							setPubPortInfo(slotObj, function(obj) {
								if (obj.status) {
									ViewModel.attributes.devDatas.ProportName = GFC.formValidation($('#ProportName'));
									let cjname = cellView.model.attributes.devDatas.ProdevName;
									if (cellView.model.attributes.devDatas.ProdevName === '') {
										cjname = '';
									}
									cellView.model.attributes.porttts = cjname;
									cellView.model.attributes.attrs.text.text = cjname;
									cellView.update();
									//GFC.reload();
									$('.main-modal').modal('hide');
								} else {
									GFC.showError(obj.err_msg);
								}
							});
						});

					}
				},
				otherMenu: [{
					name: '上光配',
					fc: function(cellView) {
						var $this = this;
						if (1 == 1) { //todo此处后期会换成加载上光配的接口
							var gettreedata = window.treedata;
							var data = [];
							for (var i = 0; i < gettreedata.length; i++) {
								data.push({
									name: gettreedata[i].Name,
									Guid: gettreedata[i].Guid,
									children: getChildren(gettreedata[i].child)
								});
							}

							function getChildren(list) {
								let arr = [];
								for (var l = 0; l < list.length; l++) {
									arr.push({
										name: list[l].Name,
										Guid: list[l].Guid,
										children: getChildren2(list[l].child)
									});
								}
								return arr;
							}

							function getChildren2(list) {
								let arr = [];
								for (var i = 0; i < list.length; i++) {
									arr.push({
										name: list[i].Name,
										Guid: list[i].Guid
									});
								}
								return arr;
							}

							function getDefaultTreeOption() { //此处是给ztree加默认的图标
								function addDiyDom(treeId, treeNode) {
									var spaceWidth = 8;
									var switchObj = $("#" + treeNode.tId + "_switch"),
										icoObj = $("#" + treeNode.tId + "_ico"),
										checkObj = $("#" + treeNode.tId + "_check");
									switchObj.remove();
									checkObj.remove();
									icoObj.before(switchObj);
									icoObj.before(checkObj);
									if (treeNode.level > 0) {
										var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
										switchObj.before(spaceStr);
									}
								}
								var defaultTreeSetting = {
									view: {
										showLine: false,
										showIcon: false,
										dblClickExpand: false,
										addDiyDom: addDiyDom,
										dblClickExpand: true
									}
								};
								return defaultTreeSetting;
							}
							console.log(data, 'dddddddd')
							var EditStr = '';
							$('.modal-body').html('').css({
								'padding-top': '5px'
							});
							$('.modal-title').html($this.name);
							EditStr =
								`<div class="modal-body" id="plugSelectModalModal"> 
								<div style="height:360px;width:552px;margin:auto;"> 
								<div class="plugselect-modal-left"> 
								<div class="plugselect-pubtree-div"> 
								<label style="margin-right:120px">光配列表：</label>
								<button id="plugtreeSearch" class="btn btn-default" style=" float:right">添加光配箱</button> 
								</div> 
								<ul class="plugselect-pubtree ztree" id="publicplugTree"></ul> 
								</div> 
								<div class="plugselect-modal-middle"> 
								<span id="plugselectBtn" class="fa fa-chevron-right"></span> 
								</div> 
								</div> 
								</div> `.trim();
							// $('.modal-dialog').css('width','400px');
							$('.modal-body').html(EditStr);
							$('.main-modal').modal('show');
							var option = {
								callback: {
									beforeExpand: function(treeId, treeNode) {
										if (treeNode.level == 2) {
											treeNode.hasLoad = true;
											console.log('node2');
										}
										if (treeNode.level == 3) {
											console.log('node3');
										}
										return true;
									}
								}
							};
							var zTree = $.fn.zTree.init($("#publicplugTree"), $.extend(true, option, getDefaultTreeOption()));
							zTree.addNodes(null, data);
						}
					}
				}, {
					name: '去光配',
					fc: function(cellView) {
						console.log('点击端口');
					}
				}, {
					name: '更换',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						var $this = this;
						let AppH = [];
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
						getPortsByDeviceId(ViewModel.attributes.parent, function(obj) {
							if (obj.status) {
								$('.main-modal-body').html('');
								$('.modal-title').html($this.name);
								let str = '';
								$.each(obj.slot_list, function(poindx, podate) {
									var strc = '';
									$.each(podate.Port_List, function(index, item) {
										var spanStr = '',
											findStr = '',
											isdisable = '';
										if (item.c_pd_id !== undefined || item.c_pd_id === '') {
											let devname;
											if (item.c_dev_name === undefined) {
												devname = item.c_ns_name;
											} else {
												devname = item.c_dev_name;
											}
											findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
											isdisable = 'disabled';
										}
										if (item.c_p1_id !== undefined) {
											spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
										}
										if (podate.BcslotId === '' || podate.ProbsDesc === '') {
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                <span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										} else {
											item.BcslotId = podate.BcslotId;
											item.ProbsDesc = podate.ProbsDesc;
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${podate.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${podate.ProbsName}-<span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										}
										AppH.push(item);

									});
									let soledesc = podate.ProbsDesc;
									if (soledesc === '') {
										soledesc = '点击展开';
									}
									str += `<div class="panel panel-info" style="border:none;">
                                                <div class="panel-heading" role="tab" id="headingOne-${poindx}">
                                                    <a data-id="${podate.BcslotId}" role="button" data-toggle="collapse" data-parent="#port-solt-list" href="#collapseOne-${poindx}" aria-expanded="true" aria-controls="collapseOne-${poindx}">
                                                     ${soledesc}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${poindx}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-${poindx}">
                                                  <div class="panel-body">
                                                    <div class="list-group">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
								});
								let slotll = `<div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                        <div class="panel-group" id="port-solt-list">
                                                        ${str}
                                                        </div>
                                                </div>`;
								$('.main-modal-body').html(slotll);
								$('.main-modal').modal();
								$('.edit-right').off('click').on('click', function() {
									$('.main-modal').modal('hide');
								});
								$('.list-group-item').off('click').on('click', function() {
									let $thisE = $(this);
									if ($thisE.hasClass('disabled')) {
										return;
									}
									let changePhyPort = ROOF.physical.ChangePhyPort;
									changePhyPort(ViewModel.id, $thisE.attr('data-id'), function(objmn) {
										if (objmn.status) {
											$('.main-modal').modal('hide');
											GFC.reload();
										} else {
											GFC.showError(objmn.err_msg);
										}
									});
								});

							} else {
								GFC.showError(obj.err_msg);
							}
						});
					}
				}, {
					name: '连接',
					fc: function(cellView) {
						var getAllPanelsAndDevs = ROOF.physical.GetAllPanelsAndDevs; //获取接口
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId; //获取接口
						var addPhyFiberEx = ROOF.physical.AddPhyFiberEx; //获取接口
						var addPhyFiber = ROOF.physical.AddPhyFiber;
						var $this = this;
						getAllPanelsAndDevs(function(obj) {
							if (obj.status) {
								var EditStr = '';
								$('.modal-body').html('').css({
									'padding-top': '5px'
								});
								$('.modal-title').html($this.name);
								EditStr = `<div class="ctrl-ist text-muted" style="position:absolute; left:18px;bottom:-40px;font-size: 14px;">按下ctrl键用鼠标点击可以批量选择端口.</div>
                                                <div class="row" style="padding-top:inherit;padding-right:inherit;padding-left:inherit">
                                                    <div class="form-group" style="float:left;width:40%;margin-right:10%">
                                                    <label>对侧屏柜:</label>
                                                        <select class="form-control end-panel-list"></select>
                                                    </div>
                                                    <div class="form-group" style="float:left;width:40%">
                                                    <label>对侧装置:</label>
                                                        <select class="form-control end-pdevices-list"></select>
                                                    </div>
                                                </div>
                                            <p></p>
                                            <div class="row" style="padding-bottom:inherit;padding-left:inherit;padding-right:inherit">
                                                <label>对侧端口:</label>
                                                    <div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                            <div class="panel-group end-solt-list" id="end-solt-list">
                                                            </div>
                                                    </div>
                                            </div>
                                            <div class="row" style="padding-top:inherit;padding-right:inherit;padding-left:inherit">
                                                    <div class="form-group" style="float:left;width:20%;margin-right:5%">
                                                    <input class="" type="checkbox" checked="true">
                                                    <label>收发联动</label>
                                                    </div>
                                                    <div class="form-group" style="float:left;width:20%">
                                                    <input class="" type="checkbox"/>
                                                    <label>自动上光配</label>
                                                    </div>
                                                </div>`.trim();
								$('.modal-body').html(EditStr);
								// $('.main-modal').find('.modal-dialog').addClass('inherit-width');//将弹框设置为屏幕宽度
								$('.main-modal').modal('show');
								let isEdit = 0;
								$('.main-modal').off('hidden.bs.modal').on('hidden.bs.modal', function() {
									// $('.main-modal').find('.modal-dialog').removeClass('inherit-width');//将弹框设置为屏幕宽度
									GFC.rmStorage('linkOpenListCollapse');
									if (isEdit === 0) {
										return;
									}
									GFC.reload();
								});
								$('.edit-right').unbind('click');
								var IsCtrl = false;
								var ispl = false;
								let openPlC = function(event) {
									if (event.ctrlKey === true) {
										IsCtrl = true;
										//$('.poitem-to').removeClass('active');
										$('.ctrl-ist').removeClass('text-muted');
										$('.ctrl-ist').addClass('text-danger').text('目前状态是批量选择端口.');
									}
								};
								let closePlC = function(event) {
									if (event.which === 17) {
										IsCtrl = false;
										//$('.poitem-to').removeClass('list-group-item-info');
										$('.ctrl-ist').removeClass('text-danger');
										$('.ctrl-ist').addClass('text-muted').text('按下ctrl键用鼠标点击可以批量选择端口.');
									}
								};
								$(window).off('keyup').on('keyup', closePlC);
								$(window).off('keydown').on('keydown', openPlC);
								if (window.parent !== undefined) {
									$(ROOF).off('keyup').on('keyup', closePlC);
									$(ROOF).off('keydown').on('keydown', openPlC);
								}
								var creatlistPanel = function(sdg, ts) {
									sdg.html('');
									var str = '';
									var thispannel;
									$.each(obj.panel_list, function(indg, dgg) {
										if (dgg.PanelId === '' || dgg.ProprName === '') {
											return true;
										}
										str += `
                                                <option value="${dgg.PanelId}">${dgg.ProprName}</option>
                                                `.trim();
									});
									sdg.html(str);
									sdg.off('change').on('change', function() {
										var dArray = _.findWhere(obj.panel_list, {
											PanelId: $(this).val()
										});
										if (ts === 'l') {
											creatlistDev($('.start-pdevices-list'), dArray.Children, ts);
										} else {
											creatlistDev($('.end-pdevices-list'), dArray.Children, ts);
										}
									});
									if (ts === 'l') {
										$.each(obj.panel_list, function(ghind, ddde) {
											if (_.findWhere(ddde.Children, {
													Guid: cellView.model.id
												}) !== undefined) {
												thispannel = ddde.PanelId;
											}
										});
										sdg.val(thispannel);
										sdg.trigger('change');
										sdg.attr('disabled', 'disabled');
									} else {
										sdg.trigger('change');
									}

								};
								var creatlistDev = function(dsdg, ddata, ts) {
									dsdg.html('');
									var str = '';
									$.each(ddata, function(indg, dgg) {
										if (dgg.Guid === '' || dgg.ProdevName === '') {
											return true;
										}
										str += `
                                                <option value="${dgg.Guid}">${dgg.ProdevName}</option>
                                                `.trim();
									});
									dsdg.html(str);
									dsdg.off('change').on('change', function() {
										getPortsByDeviceId($(this).val(), function(portobj) {
											if (portobj.status) {
												var dArray = portobj.slot_list;
												// if (dArray.length === 0) {
												//   return;
												// }
												if (ts === 'l') {
													$('.start-solt-list').html('');
													creatlistSolt($('.start-solt-list'), dArray, ts);
												} else {
													$('.end-solt-list').html('');
													creatlistSolt($('.end-solt-list'), dArray, ts);
												}
											} else {
												console.log('ddd');
											}
										});

									});
									if (ts === 'l') {
										dsdg.val(cellView.model.id);
										dsdg.trigger('change');
										dsdg.attr('disabled', 'disabled');
									} else {
										dsdg.trigger('change');
									}
								};
								var creatlistSolt = function(dsdg, ddata, ts) {

									dsdg.html('');
									var str = '';
									var thislistid = '';
									var thisclass = '';
									if (ts === 'l') {
										thislistid = '#start-solt-list';
										thisclass = 'start-port-list';
									} else {
										thislistid = '#end-solt-list';
										thisclass = 'end-port-list';
									}
									$.each(ddata, function(indg, dgg) {
										var strc = '';
										$.each(dgg.Port_List, function(index, item) {
											var spanStr = '',
												findStr = '',
												isdisable = '';
											//console.log(item.c_pd_id);
											if (item.c_pd_id !== undefined || item.c_pd_id === '') {
												let devname;
												if (item.c_dev_name === undefined) {
													devname = item.c_ns_name;
												} else {
													devname = item.c_dev_name;
												}
												findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
												isdisable = 'disabled';
											}
											if (item.c_p1_id !== undefined) {
												spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
											}
											if (dgg.BcslotId === '' || dgg.ProbsDesc === '') {
												strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${item.ProportName}[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
											} else {
												strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${dgg.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${dgg.ProbsName}-${item.ProportName}[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
											}


											//ProbsDesc + '-' + ProbsName + '-' + ProportFunctiontype + '-' + ProportJointtype,
										});
										let isInNet = '';
										if (dgg.BcslotId === '' || dgg.ProbsDesc === '') {
											isInNet = 'in';
										}
										if (dgg.ProbsName === '') {
											dgg.ProbsName = '交换机端口';
										}
										str += `<div class="panel">
                                                <div class="panel-heading" role="tab" id="headingOne-${ts}${indg}">
                                                    <a data-id="${dgg.BcslotId}" role="button" data-toggle="collapse" data-parent="${thislistid}" href="#collapseOne-${ts}${indg}" aria-expanded="true" aria-controls="collapseOne-${ts}${indg}">
                                                     ${dgg.ProbsName}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${ts}${indg}" class="panel-collapse collapse ${isInNet}" role="tabpanel" aria-labelledby="headingOne-${ts}${indg}">
                                                  <div class="panel-body">
                                                    <div class="list-group ${thisclass}">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
									});
									console.log('aaa');
									dsdg.html(str);
									if (ts === 'l') {
										creatlistPort($('.start-port-list'));
									} else {
										creatlistPort($('.end-port-list'));
									}
									if (GFC.getStorage('linkOpenListCollapse') !== undefined) {
										$.each(GFC.getStorage('linkOpenListCollapse'), function(opindex, opids) {
											$('#' + opids).addClass('in');
										});
									}
								};
								var creatlistPort = function(sgt) {
									//sgt.html('');

									$('.findSenRevs').popover({
										trigger: 'hover'
									});
									sgt.find('.poitem-to').off('click').on('click', function() {
										if ($(this).hasClass('disabled')) {
											return;
										}
										if (IsCtrl) {
											ispl = true;
											$('.poitem-to.active').addClass('list-group-item-info');
											$('.poitem-to').removeClass('active');
											if ($(this).hasClass('list-group-item-info')) {
												$(this).removeClass('list-group-item-info');
											} else {
												$(this).addClass('list-group-item-info');
											}

										} else {
											ispl = false;
											$('.poitem-to').removeClass('list-group-item-info');
											if ($(this).hasClass('active')) {
												$(this).removeClass('active');
												sgt.find('.poitem-to').removeClass('active');
												return;
											}
											sgt.find('.poitem-to').removeClass('active');
											$(this).addClass('active');
										}

									}).off('dblclick').on('dblclick', function() {
										ispl = false;
										$('.poitem-to').removeClass('list-group-item-info');
										if ($(this).hasClass('active')) {
											$(this).removeClass('active');
											sgt.find('.poitem-to').removeClass('active');
											return;
										}
										sgt.find('.poitem-to').removeClass('active');
										$(this).addClass('active');
										if ($('.list-group-item.active').length === 2) {
											$('.edit-right').trigger('click');
										}
									});

									//GFC.showError(portobj.err_msg);
								};
								creatlistPanel($('.start-panel-list'), 'l');
								creatlistPanel($('.end-panel-list'), 'r');
								$('.edit-right').off('click').on('click', function() {
									var sendPortArray = [];
									var recvPortArray = [];
									let sendportname = [];
									let recvportname = [];
									let sendporttpye = [];
									let recvporttpye = [];
									var startAr = $('.start-port-list').find('.list-group-item-info');
									if (startAr.length !== 0) {
										$.each(startAr, function(stinx) {
											sendPortArray.push({
												type: startAr.eq(stinx).attr('data-types'),
												id: startAr.eq(stinx).attr('data-id')
											});
											sendportname.push(startAr.eq(stinx).attr('data-port-name'));
											sendporttpye.push(startAr.eq(stinx).attr('data-types'));
										});
									}
									var endAr = $('.end-port-list').find('.list-group-item-info');
									if (endAr.length !== 0) {
										$.each(endAr, function(endinx) {
											recvPortArray.push({
												type: endAr.eq(endinx).attr('data-types'),
												id: endAr.eq(endinx).attr('data-id')
											});
											recvportname.push(endAr.eq(endinx).attr('data-port-name'));
											recvporttpye.push(endAr.eq(endinx).attr('data-types'));
										});
									}
									var startAt = $('.start-port-list').find('.active').attr('data-id');
									var endAt = $('.end-port-list').find('.active').attr('data-id');
									if (ispl) {
										if (_.uniq(sendportname).length !== _.uniq(recvportname).length) {
											GFC.showError('请确保两侧批量选择的数量一致');
											return;
										}
										if (_.where(sendporttpye, 'DX').length !== 0 || _.where(recvporttpye, 'DX').length !== 0) {
											if (sendPortArray.length !== recvPortArray.length || _.where(sendporttpye, 'DX').length !== _.where(recvporttpye, 'DX').length) {
												GFC.showError('电口不能与光口连接');
												return;
											}

										} else {
											if (sendPortArray.length !== recvPortArray.length || _.where(sendporttpye, 'TX').length !== _.where(recvporttpye, 'RX').length) {
												GFC.showError('请确保两侧收发类型一致');
												return;
											}
											//var s = [1, 1, 1, 0, 1, 0, 0];
											if (_.findWhere(sendPortArray, {
													type: 'TX'
												}) !== undefined && _.findWhere(sendPortArray, {
													type: 'RX'
												}) !== undefined) {
												let senda = 0;
												let sendb = 1;
												let sendt = [];
												$.each(sendPortArray, function(indexsend, ss) {
													if (ss.type === 'TX') {
														sendt[senda] = ss;
														senda += 2;
													} else {
														sendt[sendb] = ss;
														sendb += 2;
													}
												});
												let recva = 1;
												let recvb = 0;
												let recvt = [];
												$.each(recvPortArray, function(indexrecv, rr) {
													if (rr.type === 'TX') {
														recvt[recva] = rr;
														recva += 2;
													} else {
														recvt[recvb] = rr;
														recvb += 2;
													}
												});
												sendPortArray = sendt;
												recvPortArray = recvt;
											}
										}
										var fiberlist = [];
										$.each(sendPortArray, function(sendindex, senditem) {
											fiberlist.push({
												SrcPortId: senditem.id
											});
										});
										$.each(recvPortArray, function(recvindex, recvitem) {
											fiberlist[recvindex].DstPortId = recvitem.id;
										});
										addPhyFiberEx(fiberlist, function(plstj) {
											if (plstj.status) {
												$('.poitem-to').removeClass('list-group-item-info');
												$('.poitem-to').removeClass('active');
												let arrOpen = [];
												$.each($('.panel-collapse.collapse.in'), function(epl, epd) {
													arrOpen.push(epd.id);
												});
												GFC.setStorage('linkOpenListCollapse', arrOpen);
												let endval = $('.end-pdevices-list').val();
												$('.start-pdevices-list').trigger('change');
												$('.end-pdevices-list').val(endval).trigger('change');
												isEdit = 1;
											} else {
												GFC.showError(plstj.err_msg);
											}
										});

									} else {
										var portinfo = {};
										if (startAt === undefined || endAt === undefined) {
											GFC.showError('请确保两侧各有一个端口被选中');
											return;
										}
										portinfo.SrcPortId = startAt;
										portinfo.DstPortId = endAt;
										console.log(portinfo);
										let sr = $('[data-id=' + portinfo.SrcPortId + ']').attr('data-types');
										let ds = $('[data-id=' + portinfo.DstPortId + ']').attr('data-types');
										if (sr === 'DX' || ds === 'DX') {
											if (sr !== ds) {
												GFC.showError('电口不能与光口连接');
												return;
											}
										} else {
											if (sr === ds) {
												GFC.showError('相同收发类型的端口不能相连');
												return;
											}
										}
										addPhyFiber(portinfo, function(dlstj) {
											if (dlstj.status) {
												$('.poitem-to').removeClass('list-group-item-info');
												$('.poitem-to').removeClass('active');
												let arrOpen = [];
												$.each($('.panel-collapse.collapse.in'), function(epl, epd) {
													arrOpen.push(epd.id);
												});
												GFC.setStorage('linkOpenListCollapse', arrOpen);
												let endval = $('.end-pdevices-list').val();
												$('.start-pdevices-list').trigger('change');
												$('.end-pdevices-list').val(endval).trigger('change');
												isEdit = 1;
											} else {
												GFC.showError(dlstj.err_msg);
											}
										});
									}
								});
							} else {
								GFC.showError(obj.err_msg);
							}
						});
					}
				}]
			},
			attrs: {
				'.body': {
					fill: 'salmon'
				},
				'.labels': {
					text: 'Atomic'
				},
				'.inPorts .port-body': {
					fill: 'PaleGreen',
					'pointer-events': 'none'
				},
				'.outPorts .port-body': {
					fill: 'Tomato',
					'pointer-events': 'none'
				}
			}
		}, joint.shapes.devs.Model.prototype.defaults),
		initialize: function() { //此处暂时没调用，后期没用的话可以删除
			joint.shapes.devs.Model.prototype.initialize.apply(this, arguments);
			this.bindAutoSize(this);
			this.attributes.llk = [];
			this.attributes.rik = [];
			var $this = this;
			$.each(this.attributes.inPorts, function(index, item) {
				$this.attributes.llk.push(item.Guid);
			});
			$.each(this.attributes.outPorts, function(index, item) {
				$this.attributes.rik.push(item.Guid);
			});
		},
		bindAutoSize: function(element) { //此处也暂时未用到，同上（注意：initialize里调用了此方法需要同步删除）
			var porNumber;
			if (element.attributes.inPorts.length > element.attributes.outPorts.length) {
				porNumber = element.attributes.inPorts.length;
			} else {
				porNumber = element.attributes.outPorts.length;
			}
			var portHeight = (element.attributes.attrs['.inPorts rect'].height + 2) * porNumber + 50;
		},
		getPortAttrs: function(portName, index, total, selector, type) { //此处为展示硬接线port与线的方法，后期用到可以研究下，此时可以先屏蔽

			var attrs = {};

			var portClass = 'port' + index;
			var portSelector = selector + '>.' + portClass;
			var portLabelSelector = portSelector + '>.port-label';
			var portBodySelector = portSelector + '>.port-body';

			attrs[portLabelSelector] = {
				text: portName
			};
			attrs[portBodySelector] = {
				port: {
					id: portName || _.uniqueId(type),
					type: type
				}
			};
			attrs[portSelector] = {
				ref: '.body',
				'ref-y': index * 26
			};
			if (this.embedport === undefined) {
				this.embedport = {};
			}
			if (this.embedport.in === undefined) {
				this.embedport.in = [];
			}
			if (this.embedport.out === undefined) {
				this.embedport.out = [];
			}
			//插件名称-端口名称-收发类型-接口类型
			if (selector === '.inPorts') {
				if (this.attributes.inPorts.length !== 0) {
					let cjname = this.attributes.inPorts[index].ProbsName + '-';
					let dkname = this.attributes.inPorts[index].ProportName + '-';
					let fcname = this.attributes.inPorts[index].ProportFunctiontype + '-';
					let joname = this.attributes.inPorts[index].ProportJointtype + '-';
					let dename = this.attributes.inPorts[index].ProportDesc;
					let devdesc = this.attributes.inPorts[index].ProbsDesc;
					if (this.attributes.inPorts[index].ProbsName === '') {
						cjname = '';
						devdesc = '';
					}
					devdesc = '';
					this.embedport.in[index] = new joint.shapes.basic.RectPort({
						id: this.attributes.inPorts[index].Guid,
						position: {
							x: this.attributes.position.x,
							y: this.attributes.position.y + index * 26
						},
						porttts: devdesc + cjname + dkname + fcname + joname + dename,
						z: window.assemblyz += 1,
						size: {
							width: 100,
							height: 24
						},
						devDatas: this.attributes.inPorts[index],
						panelData: this.attributes.panelData,
						attrs: {
							text: {
								text: joint.util.breakText(cjname + dkname + fcname + joname, {
									width: 100,
									height: 24
								})
							}
						}
					});
					this.embed(this.embedport.in[index]);
				}
			}
			if (selector === '.outPorts') {
				attrs[portSelector]['ref-dx'] = 0;
				if (this.attributes.outPorts.length !== 0) {
					let cjname = this.attributes.outPorts[index].ProbsName + '-';
					let dkname = this.attributes.outPorts[index].ProportName + '-';
					let fcname = this.attributes.outPorts[index].ProportFunctiontype + '-';
					let joname = this.attributes.outPorts[index].ProportJointtype + '-';
					let dename = this.attributes.outPorts[index].ProportDesc;
					let devdesc = this.attributes.outPorts[index].ProbsDesc + '-';
					if (this.attributes.outPorts[index].ProbsName === '') {
						cjname = '';
						devdesc = '';
					}
					devdesc = '';
					this.embedport.out[index] = new joint.shapes.basic.RectPort({
						id: this.attributes.outPorts[index].Guid,
						position: {
							x: this.attributes.size.width + this.attributes.position.x - 63,
							y: this.attributes.position.y + index * 26
						},
						porttts: devdesc + cjname + dkname + fcname + joname + dename,
						z: window.assemblyz += 1,
						size: {
							width: 100,
							height: 24
						},
						devDatas: this.attributes.outPorts[index],
						panelData: this.attributes.panelData,
						attrs: {
							text: {
								text: joint.util.breakText(cjname + dkname + fcname + joname, {
									width: 100,
									height: 24
								})
							}
						}
					});
					this.embed(this.embedport.out[index]);
				}
			}

			return attrs;
		}
	});
	joint.shapes.devs.AtomicRView = joint.shapes.devs.ModelView.extend({
		renderPorts: function() {
			var $inPorts = this.$('.inPorts').empty(); //这一堆暂时不确定作用，但删除后不碍事
			var $outPorts = this.$('.outPorts').empty();
			var portTemplate = _.template(this.model.portMarkup);
			_.each(_.filter(this.model.ports, function(p) {
				return p.type === 'in';
			}), function(port, index) {
				$inPorts.append(viewE(portTemplate({
					id: index,
					port: port
				})).node);
			});
			_.each(_.filter(this.model.ports, function(p) {
				return p.type === 'out';
			}), function(port, index) {
				$outPorts.append(viewE(portTemplate({
					id: index,
					port: port
				})).node);
			}); //这一堆暂时不确定作用，但删除后不碍事
			let elementTitls = this.$el.find('.content-x');
			let elementTitls2 = this.$el.find('.content-xx');
			elementTitls.attr('title', this.model.attributes.dsname).text(this.model.attributes.dsname);
			elementTitls2.attr('title', this.model.attributes.portsname).text(this.model.attributes.portsname);
			if (this.model.attributes.portsname === 'TX') {
				elementTitls2.css('background-color', '#F4B183');
			}
			if (this.model.attributes.portsname === 'Card') {
				this.$el.find('.htIconOut2').addClass('hide');
				this.$el.find('.htIconOut').attr('x', '35');
			}
		}
	});
	joint.shapes.devs.CabinetT = joint.shapes.devs.Model.extend({ //other_deivce
		markup: '<g class="rotatable">' +
			'<rect class="body parent-class"/>' +
			'<g class="title-class">' +
			'<text class="labels title-class" />' +
			'</g>' +
			'</g>',
		defaults: joint.util.deepSupplement({
			paper: null,
			childequipments: null,
			type: 'devs.Cabinet',
			rightMenu: {
				centerMenu: {
					name: '编辑',
					fc: function(cellView) {
						console.log(cellView.model, 'cellViewcell')
						var ViewModel = cellView.model;
						var EditStr = '';
						var elementTitls = cellView.$el.find('.content-x');
						$('.modal-title').html(this.name);
						EditStr += '<div class="form-group">' +
							'<label for="exampleInputEmail1">装置名称:</label>' +
							'<input type="text" class="form-control change-atr" value="' + cellView.model.attributes.devDatas.deviceName + '" id="exampleInputEmail1" placeholder="">' +
							'</div>';
						$('.modal-body').html(EditStr);
						$('.main-modal').modal();
						$('.edit-right').unbind('click');
						$('.edit-right').click(function() {
							var NewName = '';
							var renamePhydevice = ROOF.physical.RenamePhydevice;
							if ($.trim($('.change-atr').val()) !== '') {
								NewName = $('.change-atr').val();
							}
							renamePhydevice(ViewModel.attributes.id, NewName, function(obj) {
								if (obj.status) {
									cellView.model.attributes.dsname = NewName;
									elementTitls.attr('title', NewName).text(NewName);
									$('.main-modal').modal('hide');
								} else {
									ROOF.common.promptInformation('编辑失败:' + obj.err_msg);
								}
							});
						});
					}
				},
				otherMenu: [{
					name: '移动至',
					fc: function(cellView) {
						var inport = cellView.model.attributes.inPorts;
						var outport = cellView.model.attributes.outPorts;
						if (inport.length !== 0 || outport.length !== 0) {
							GFC.showError('包含硬接线，不可移动');
							return;
						}
						var ViewModel = cellView.model;
						var treeNote = ROOF.svgPortHardwireNote.getNodeByParam('guid', ViewModel.attributes.id);
						ROOF.common.loadModalContent(ROOF.hardconnection.moveDeviceModal());
						ROOF.hardconnection.loadMoveDeviceData(treeNote);
						ROOF.hardconnection.initMoveDeviceHanlder(treeNote);
					}
				}, {
					name: '端口',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						var $this = this;
						let AppH = [];
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
						getPortsByDeviceId(ViewModel.id, function(obj) {
							if (obj.status) {
								console.log(obj);
								$('.main-modal-body').html('');
								$('.modal-title').html($this.name);
								let str = '';
								$.each(obj.slot_list, function(poindx, podate) {
									var strc = '';
									$.each(podate.Port_List, function(index, item) {
										var spanStr = '',
											findStr = '',
											isdisable = '';
										//console.log(item.c_pd_id);
										if (item.c_pd_id !== undefined || item.c_pd_id === '') {
											let devname;
											if (item.c_dev_name === undefined) {
												devname = item.c_ns_name;
											} else {
												devname = item.c_dev_name;
											}
											findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
											isdisable = '';
										}
										if (item.c_p1_id !== undefined) {
											spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
										}
										if (podate.BcslotId === '' || podate.ProbsDesc === '') {
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                <span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										} else {
											item.BcslotId = podate.BcslotId;
											item.ProbsDesc = podate.ProbsDesc;
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${podate.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${podate.ProbsName}-<span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										}
										AppH.push(item);

									});
									let soledesc = podate.ProbsDesc;
									if (soledesc === '') {
										soledesc = '点击展开';
									}
									str += `<div class="panel panel-info" style="border:none;">
                                                <div class="panel-heading" role="tab" id="headingOne-${poindx}">
                                                    <a data-id="${podate.BcslotId}" role="button" data-toggle="collapse" data-parent="#port-solt-list" href="#collapseOne-${poindx}" aria-expanded="true" aria-controls="collapseOne-${poindx}">
                                                     ${soledesc}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${poindx}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-${poindx}">
                                                  <div class="panel-body">
                                                    <div class="list-group">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
								});
								let slotll = `<div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                        <div class="panel-group" id="port-solt-list">
                                                        ${str}
                                                        </div>
                                                </div>`;
								$('.main-modal-body').html(slotll);
								$('.main-modal').modal();
								$('.main-modal').off('hidden.bs.modal').on('hidden.bs.modal', function() {
									GFC.reload();
								});
								$('.edit-right').off('click').on('click', function() {
									$('.main-modal').modal('hide');
								});
								$('.list-group-item').on('mousedown', function(event) {
									var $thisE = $(this);
									if (event.which === 3) {
										console.log($(this).attr('data-id'));
										var EditRStr = '<div class="right-edit-port-menu">' +
											'<div class="items edit-port">编辑</div>' +
											'<div class="items remove-port">删除</div>' +
											'<div>';
										GFC.addHtmlToPage(EditRStr, '.right-edit-port-menu');
										$('.right-edit-port-menu').offset({
											top: event.clientY,
											left: event.clientX
										});
										$('.edit-port').one('click', function() {
											let thisEdata = _.findWhere(AppH, {
												Guid: $thisE.attr('data-id')
											});
											bootbox.prompt({
												title: '请输入自定义名称',
												value: thisEdata.ProportName,
												callback: function(result) {
													if (result === null) {
														//GFC.showError('dd');
														return;
													} else {
														if ($.trim(result) === '') {
															GFC.showError('不可以输入空的名称！');
															return;
														}
														if (result.length > 12) {
															GFC.showError('端口名称长度不能大于12位!');
															return;
														}
														if (!parseInt('0x' + result)) {
															GFC.showError('端口名称必须为数字，或16进制数!');
															return;
														}
														let slotObj = {};
														console.log(thisEdata);
														// return;
														slotObj.Guid = thisEdata.Guid;
														//slotObj.PubbsPubportBcslotGuid = thisEdata.ProbsProportBcslotGuid;
														slotObj.PortName = result;
														slotObj.PortDesc = thisEdata.ProportDesc;
														slotObj.PortMediaType = thisEdata.ProportMediatype;
														slotObj.PortJointType = thisEdata.ProportJointtype;
														slotObj.ProportDesc = thisEdata.ProportDesc;
														slotObj.PortFuncType = thisEdata.ProportFunctiontype;
														let setPubPortInfo = ROOF.devconfig.SetPortInfo;
														setPubPortInfo(slotObj, function(objse) {
															if (objse.status) {
																$thisE.find('.dk').text(result);
															} else {
																GFC.showError(objse.err_msg);
															}
														});
													}
												}
											});
											//GFC.addHtmlToPage(AppH, '.daboule-modal');
											//$('.daboule-modal').modal('show');
										});
										var deleteDevPort = ROOF.devconfig.DeleteDevPort;
										$('.remove-port').one('click', function() {
											ROOF.common.promptConfirm('确认要执行删除操作吗？', function() {
												deleteDevPort($thisE.attr('data-id'), function(objr) {
													if (objr.status) {
														$thisE.remove();
													} else {
														GFC.showError(objr.err_msg);
													}
												});
											});

										});
										$(window).one('click', function() {
											$('.right-edit-port-menu').remove();
										});
									} else {
										$('.right-edit-port-menu').remove();
									}
								});
							} else {
								GFC.showError(obj.err_msg);
							}
						});
					}
				}]
			},
			attrs: {
				'.context': {
					width: 300,
					height: 'inherit'
				},
				'.icdContain': {
					'position': 'fixed',
					left: '30%',
					top: '30%'
				},
				'.gooseOut': {
					width: 300,
					height: 100
				},
				'.labels': {
					fill: '#ffffff',
					text: 'jigui',
					'font-size': 14,
					'ref-x': .5,
					'ref-y': 17,
					'text-anchor': 'middle',
					'y-alignment': 'middle',
					'font-family': 'Arial, helvetica, sans-serif'
				},
				'rect.parent-class': {
					fill: '#CBFFFF',
					stroke: '#CBFFFF',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 393,
					height: 515
				},
				'.body': {
					fill: '#CBFFFF',
					stroke: '#CBFFFF',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 233,
					height: 150
				},
				'g.title-class': {
					x: 0,
					y: 0
				},
				'rect.title-class': {
					fill: '#5B9BD5',
					stroke: '#5B9BD5',
					width: 233,
					height: 54

				},
				'text.title-class': { //此处控制外部svg的title的相对位置等
					fill: '#4F88BB',
					text: 'jigui',
					'font-size': 16,
					'ref-x': .3,
					'ref-y': 17,
					'text-anchor': 'middle',
					'y-alignment': 'middle',
					'font-family': 'Arial, helvetica, sans-serif'

				}
			}
		}, joint.shapes.devs.Model.prototype.defaults),
		initialize: function() { //将device的数据init进来
			joint.shapes.devs.Model.prototype.initialize.apply(this, arguments);
			this.on('change:attrs', this.bindAutoSize(this));
			if (this.attributes.childequipments !== null) {
				this.childEquipments(this.attributes.childequipments);
			}
			if (this.attributes.devicesNolink !== undefined) {
				this.childEquipments(this.attributes.devicesNolink);
			}
		},
		bindAutoSize: function(element) { //同上面的bindautosize，暂时无用可以删除测试
			var width = element.attributes.attrs['rect.title-class'].width;
			var height = element.attributes.attrs['rect.title-class'].height;
			var text = joint.util.breakText(element.attributes.attrs['text.title-class'].text, {
				width: width,
				height: height
			});
			element.attr({
				'text.title-class': {
					text: text
				}
			});
		},
		runder: function(ele) { //猜测是一个重新刷新图形的方法
			if (this.attributes.paper != null) {
				this.attributes.paper.graph.addCell(this);
				this.attributes.paper.graph.addCells(ele);
				for (var i = 0; i < ele.length; i++) {
					if (ele[i].embedport === undefined) {
						continue;
					}
					if (ele[i].embedport.in.length !== 0) {
						for (var ins = 0; ins < ele[i].embedport.in.length; ins++) {
							this.attributes.paper.graph.addCell(ele[i].embedport.in[ins]);
						}
					}
					if (ele[i].embedport.out.length !== 0) {
						for (var outs = 0; outs < ele[i].embedport.out.length; outs++) {
							this.attributes.paper.graph.addCell(ele[i].embedport.out[outs]);
						}
					}
				}
				this.findView(this.attributes.paper.paper).update();
			}
		},
		childEquipments: function(data) { //此处的data实际使用的是rx、tx那些port
			var $this = this;
			if ($this.chidpositons === undefined) { //此处是获取当前最外层svg的坐标，供下面里层的svg准备
				$this.chidpositons = {
					x: $this.attributes.position.x,
					y: $this.attributes.position.y,
					parentWidth: 90
				};
			}
			var ChildArray = [];
			//var ChildPort = [];
			var fdo;
			var inprt, ouprt, dsname, idvs, portsname;
			for (var i = 0; i < data.length; i++) {
				if (data[i].DevId !== undefined) {
					ChildArray = [];
					continue;
				}
				if ($this.attributes.mainpanel && data[i].devicesInfo !== undefined) { //此处这个连续的if是为了上文97行getPortAttrs硬接线port与线提供数据的，若未考虑线的情况可以先将几个数组设置为空的，这样就port与线就不展示了
					inprt = data[i].port.leftPort !== null ? data[i].port.leftPort : [];
					ouprt = data[i].port.rightPort !== null ? data[i].port.rightPort : [];
					dsname = data[i].devicesInfo.ProdevName;
					portsname = data[i].devicesInfo.Type;
					idvs = data[i].devicesInfo.Guid;
				} else if ($this.attributes.mainpanel && data[i].devicesInfo === undefined) {
					inprt = [];
					ouprt = data[i].ports !== null ? data[i].ports : [];
					dsname = data[i].ProdevName;
					portsname = data[i].Type;
					idvs = data[i].Guid;
				} else {
					inprt = data[i].ports !== null ? data[i].ports : [];
					ouprt = [];
					dsname = data[i].ProdevName;
					portsname = data[i].Type;
					idvs = data[i].Guid;
				}
				ChildArray[i] = new joint.shapes.devs.AtomicT({
					id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
					size: { //此处定义的是内部svg的size
						width: 132,
						height: 30
					},
					position: { //根据上文准备的外部svg的位置定义内部svg的位置
						x: $this.chidpositons.x - 35,
						y: $this.chidpositons.y
					},
					z: window.assemblyz += 1, //暂时不知道什么用，删除后无碍
					inPorts: inprt, //以下这一堆是配置数据，通过model.attribute可以获取
					outPorts: ouprt,
					devDatas: data[i],
					paper: this.attributes.paper,
					panelData: $this.attributes.devDatas,
					dsname: dsname,
					portsname: portsname,
					attrs: { //暂时无需改动
						rect: {
							fill: '#4F88BB',
							stroke: '#41719C',
							x: 0,
							y: 0,
							width: 132,
							height: 30
						},
						'.labels': {
							text: '',
							fill: '#306796',
							'font-size': 12,
							'text-anchor': 'middle',
							'y-alignment': 'middle',
							'font-family': 'Arial, helvetica, sans-serif',
							'ref-y': 15,
							'ref-x': .5
						},
						'.inPorts rect': {
							fill: '#4283bb',
							stroke: '#665ba7',
							x: -20,
							y: 30,
							width: 100,
							height: 24
						},
						'.outPorts rect': {
							fill: '#4283bb',
							stroke: '#665ba7',
							x: -82,
							y: 30,
							width: 100,
							height: 24
						},
						'.inPorts text.port-label': {
							width: 100,
							height: 24,
							fill: '#ffffff',
							'font-size': 9,
							x: -20,
							'ref-x': 50,
							'ref-y': 44,
							'text-anchor': 'middle',
							'y-alignment': 'middle',
							'font-family': 'Arial, helvetica, sans-serif'

						},
						'.outPorts text.port-label': {
							fill: '#ffffff',
							'font-size': 9,
							x: -82,
							'ref-x': 50,
							'ref-y': 44,
							'text-anchor': 'middle',
							'y-alignment': 'middle',
							'font-family': 'Arial, helvetica, sans-serif'

						}
					}
				});

				ChildArray[i].addTo(window.tbgraph);
				fdo = viewE(ChildArray[i].findView(window.tbpaper).$el[0]).bbox(true); //以下7行是定义外部svg的高根据内部svg的个数自适应
				$this.chidpositons.parentWidth += fdo.height + 10;
				$this.chidpositons.y += fdo.height + 10; //内部svg的纵向间距
				ChildArray[i].remove();
				this.embed(ChildArray[i]);
				this.attributes.size.height = $this.chidpositons.parentWidth;
				this.attributes.attrs['.body'].height = $this.chidpositons.parentWidth - 100;
			}
			if (data.length === 1) {
				this.attributes.size.height -= 20;
			}
			this.runder(ChildArray); //调用了上面的runder方法
		},
		getPortAttrs: function(portName, index, total, selector, type) { //z暂时没用到，删除无碍

			var attrs = {};

			var portClass = 'port' + index;
			var portSelector = selector + '>.' + portClass;
			var portLabelSelector = portSelector + '>.port-label';
			var portBodySelector = portSelector + '>.port-body';

			attrs[portLabelSelector] = {
				text: portName
			};
			attrs[portBodySelector] = {
				port: {
					id: portName || _.uniqueId(type),
					type: type
				}
			};
			attrs[portSelector] = {
				ref: '.body',
				'ref-y': index * 26
			};
			if (this.embedport === undefined) {
				this.embedport = {};
			}
			if (this.embedport.in === undefined) {
				this.embedport.in = [];
			}
			if (this.embedport.out === undefined) {
				this.embedport.out = [];
			}
			if (this.attributes.inPorts.length !== 0) {
				this.embedport.in[index] = new joint.shapes.basic.GPPort({
					position: {
						x: this.attributes.position.x + 38,
						y: this.attributes.position.y + index * 26 + 93
					},
					size: {
						width: 10,
						height: 10
					},
					//size: { width: 100, height: 24 },
					attrs: {
						text: {
							text: this.attributes.inPorts[index]
						}
					}
				});
				this.embed(this.embedport.in[index]);
			}
			if (selector === '.outPorts') {
				attrs[portSelector]['ref-dx'] = 0;
				if (this.attributes.outPorts.length !== 0) {
					this.embedport.out[index] = new joint.shapes.basic.GPPort({
						position: {
							x: this.attributes.size.width + this.attributes.position.x - 50,
							y: this.attributes.position.y + index * 26 + 93
						},
						size: {
							width: 10,
							height: 10
						},
						//size: { width: 100, height: 24 },
						attrs: {
							text: {
								text: this.attributes.outPorts[index]
							}
						}
					});
					this.embed(this.embedport.out[index]);
				}
			}

			return attrs;
		}
	});
	joint.shapes.devs.Cabinet = joint.shapes.devs.Model.extend({ //main_device
		markup: '<g class="rotatable">' +
			'<g class="scalable">' +
			'</g>' +
			'<rect class="body parent-class"/>' +
			'<g class="title-class">' +
			'<rect class="title-class" />' +
			'<text class="labels title-class" />' +
			'<text class="labels title-class2" />' +
			'</g>' +
			'</g>',
		defaults: joint.util.deepSupplement({
			paper: null,
			childequipments: null,
			type: 'devs.Cabinet',
			rightMenu: {
				centerMenu: {
					name: '编辑',
					fc: function(cellView) {
						console.log(cellView.model, 'cellViewcell')
						var ViewModel = cellView.model;
						var EditStr = '';
						var elementTitls = cellView.$el.find('.content-x');
						$('.modal-title').html(this.name);
						EditStr += '<div class="form-group">' +
							'<label for="exampleInputEmail1">装置名称:</label>' +
							'<input type="text" class="form-control change-atr" value="' + cellView.model.attributes.devDatas.deviceName + '" id="exampleInputEmail1" placeholder="">' +
							'</div>';
						$('.modal-body').html(EditStr);
						$('.main-modal').modal();
						$('.edit-right').unbind('click');
						$('.edit-right').click(function() {
							var NewName = '';
							var renamePhydevice = ROOF.physical.RenamePhydevice;
							if ($.trim($('.change-atr').val()) !== '') {
								NewName = $('.change-atr').val();
							}
							renamePhydevice(ViewModel.attributes.id, NewName, function(obj) {
								if (obj.status) {
									cellView.model.attributes.dsname = NewName;
									elementTitls.attr('title', NewName).text(NewName);
									$('.main-modal').modal('hide');
								} else {
									ROOF.common.promptInformation('编辑失败:' + obj.err_msg);
								}
							});
						});
					}
				},
				otherMenu: [{
					name: '移动至',
					fc: function(cellView) {
						var inport = cellView.model.attributes.inPorts;
						var outport = cellView.model.attributes.outPorts;
						if (inport.length !== 0 || outport.length !== 0) {
							GFC.showError('包含硬接线，不可移动');
							return;
						}
						var ViewModel = cellView.model;
						var treeNote = ROOF.svgPortHardwireNote.getNodeByParam('guid', ViewModel.attributes.id);
						ROOF.common.loadModalContent(ROOF.hardconnection.moveDeviceModal());
						ROOF.hardconnection.loadMoveDeviceData(treeNote);
						ROOF.hardconnection.initMoveDeviceHanlder(treeNote);
					}
				}, {
					name: '端口',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						var $this = this;
						let AppH = [];
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
						getPortsByDeviceId(ViewModel.id, function(obj) {
							if (obj.status) {
								console.log(obj);
								$('.main-modal-body').html('');
								$('.modal-title').html($this.name);
								let str = '';
								$.each(obj.slot_list, function(poindx, podate) {
									var strc = '';
									$.each(podate.Port_List, function(index, item) {
										var spanStr = '',
											findStr = '',
											isdisable = '';
										//console.log(item.c_pd_id);
										if (item.c_pd_id !== undefined || item.c_pd_id === '') {
											let devname;
											if (item.c_dev_name === undefined) {
												devname = item.c_ns_name;
											} else {
												devname = item.c_dev_name;
											}
											findStr = `<span
                                                     class="findSenRevs"
                                                      data-toggle="popover"
                                                       data-placement="bottom"
                                                        data-content="对侧装置:${devname}">
                                                        (${item.c_pd_name} [${item.c_pd_ftype}])
                                                        </span>`.trim();
											isdisable = '';
										}
										if (item.c_p1_id !== undefined) {
											spanStr = `<span style="position:absolute;right:0;top:2px;color:#fd9a00" class="iconhard icon-gp"></span>`;
										}
										if (podate.BcslotId === '' || podate.ProbsDesc === '') {
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                <span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										} else {
											item.BcslotId = podate.BcslotId;
											item.ProbsDesc = podate.ProbsDesc;
											strc += `
                                                <a class="list-group-item poitem-to ${isdisable}" data-port-name="${podate.ProbsName}-${item.ProportName}" data-types="${item.ProportFunctiontype}" data-id="${item.Guid}">
                                                ${podate.ProbsName}-<span class="dk">${item.ProportName}</span>[${item.ProportFunctiontype}]-${item.ProportJointtype}-${item.ProportDesc}${findStr}${spanStr}
                                                </a>
                                                `.trim();
										}
										AppH.push(item);

									});
									let soledesc = podate.ProbsDesc;
									if (soledesc === '') {
										soledesc = '点击展开';
									}
									str += `<div class="panel panel-info" style="border:none;">
                                                <div class="panel-heading" role="tab" id="headingOne-${poindx}">
                                                    <a data-id="${podate.BcslotId}" role="button" data-toggle="collapse" data-parent="#port-solt-list" href="#collapseOne-${poindx}" aria-expanded="true" aria-controls="collapseOne-${poindx}">
                                                     ${soledesc}
                                                    </a>
                                                </div>
                                                <div id="collapseOne-${poindx}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne-${poindx}">
                                                  <div class="panel-body">
                                                    <div class="list-group">
                                                    ${strc}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                `.trim();
								});
								let slotll = `<div style="min-height: 300px;padding: 0;overflow-y: auto;" class="form-control">
                                                        <div class="panel-group" id="port-solt-list">
                                                        ${str}
                                                        </div>
                                                </div>`;
								$('.main-modal-body').html(slotll);
								$('.main-modal').modal();
								$('.main-modal').off('hidden.bs.modal').on('hidden.bs.modal', function() {
									GFC.reload();
								});
								$('.edit-right').off('click').on('click', function() {
									$('.main-modal').modal('hide');
								});
								$('.list-group-item').on('mousedown', function(event) {
									var $thisE = $(this);
									if (event.which === 3) {
										console.log($(this).attr('data-id'));
										var EditRStr = '<div class="right-edit-port-menu">' +
											'<div class="items edit-port">编辑</div>' +
											'<div class="items remove-port">删除</div>' +
											'<div>';
										GFC.addHtmlToPage(EditRStr, '.right-edit-port-menu');
										$('.right-edit-port-menu').offset({
											top: event.clientY,
											left: event.clientX
										});
										$('.edit-port').one('click', function() {
											let thisEdata = _.findWhere(AppH, {
												Guid: $thisE.attr('data-id')
											});
											bootbox.prompt({
												title: '请输入自定义名称',
												value: thisEdata.ProportName,
												callback: function(result) {
													if (result === null) {
														//GFC.showError('dd');
														return;
													} else {
														if ($.trim(result) === '') {
															GFC.showError('不可以输入空的名称！');
															return;
														}
														if (result.length > 12) {
															GFC.showError('端口名称长度不能大于12位!');
															return;
														}
														if (!parseInt('0x' + result)) {
															GFC.showError('端口名称必须为数字，或16进制数!');
															return;
														}
														let slotObj = {};
														console.log(thisEdata);
														// return;
														slotObj.Guid = thisEdata.Guid;
														//slotObj.PubbsPubportBcslotGuid = thisEdata.ProbsProportBcslotGuid;
														slotObj.PortName = result;
														slotObj.PortDesc = thisEdata.ProportDesc;
														slotObj.PortMediaType = thisEdata.ProportMediatype;
														slotObj.PortJointType = thisEdata.ProportJointtype;
														slotObj.ProportDesc = thisEdata.ProportDesc;
														slotObj.PortFuncType = thisEdata.ProportFunctiontype;
														let setPubPortInfo = ROOF.devconfig.SetPortInfo;
														setPubPortInfo(slotObj, function(objse) {
															if (objse.status) {
																$thisE.find('.dk').text(result);
															} else {
																GFC.showError(objse.err_msg);
															}
														});
													}
												}
											});
											//GFC.addHtmlToPage(AppH, '.daboule-modal');
											//$('.daboule-modal').modal('show');
										});
										var deleteDevPort = ROOF.devconfig.DeleteDevPort;
										$('.remove-port').one('click', function() {
											ROOF.common.promptConfirm('确认要执行删除操作吗？', function() {
												deleteDevPort($thisE.attr('data-id'), function(objr) {
													if (objr.status) {
														$thisE.remove();
													} else {
														GFC.showError(objr.err_msg);
													}
												});
											});

										});
										$(window).one('click', function() {
											$('.right-edit-port-menu').remove();
										});
									} else {
										$('.right-edit-port-menu').remove();
									}
								});
							} else {
								GFC.showError(obj.err_msg);
							}
						});
					}
				}]
			},
			attrs: {
				'.labels': {
					fill: '#ffffff',
					text: 'jigui',
					'font-size': 14,
					'ref-x': .5,
					'ref-y': 17,
					'text-anchor': 'middle',
					'y-alignment': 'middle',
					'font-family': 'Arial, helvetica, sans-serif'
				},
				'rect.parent-class': {
					fill: '#CBFFFF',
					stroke: '#CBFFFF',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 393,
					height: 515

				},
				'.body': {
					fill: '#CBFFFF',
					stroke: '#CBFFFF',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 233,
					height: 250

				},
				'g.title-class': {
					x: 0,
					y: 0,
					transform: 'translate(0,0)'

				},
				'rect.title-class': {
					fill: '#5B9BD5',
					stroke: '#5B9BD5',
					width: 233,
					height: 54

				},
				'text.title-class': { //此处控制外部svg的title的相对位置等
					fill: '#ffffff',
					text: 'jigui',
					'font-size': 16,
					'ref-x': .3,
					'ref-y': 17,
					'text-anchor': 'middle',
					'y-alignment': 'middle',
					'font-family': 'Arial, helvetica, sans-serif'

				},
				'text.title-class2': {
					fill: '#ffffff',
					text: 'jigui',
					'font-size': 15,
					'ref-x': .3,
					'ref-y': 37,
					'text-anchor': 'middle',
					'y-alignment': 'middle',
					'font-family': 'Arial, helvetica, sans-serif'

				}
			}
		}, joint.shapes.devs.Model.prototype.defaults),
		initialize: function() { //将device的数据init进来
			joint.shapes.devs.Model.prototype.initialize.apply(this, arguments);
			this.on('change:attrs', this.bindAutoSize(this));
			if (this.attributes.childequipments !== null) {
				this.childEquipments(this.attributes.childequipments);
			}
			if (this.attributes.devicesNolink !== undefined) {
				this.childEquipments(this.attributes.devicesNolink.noLinkDevices, this.attributes.devicesNolink.GPorts);
			}
		},
		bindAutoSize: function(element) { //同上面的bindautosize，暂时无用可以删除测试
			var width = element.attributes.attrs['rect.title-class'].width;
			var height = element.attributes.attrs['rect.title-class'].height;
			var text = joint.util.breakText(element.attributes.attrs['text.title-class'].text, {
				width: width,
				height: height
			});
			element.attr({
				'text.title-class': {
					text: text
				}
			});
		},
		runder: function(ele) { //猜测是一个重新刷新图形的方法
			if (this.attributes.paper != null) {
				this.attributes.paper.graph.addCell(this);
				this.attributes.paper.graph.addCells(ele);
				for (var i = 0; i < ele.length; i++) {
					if (ele[i].embedport === undefined) {
						continue;
					}
					if (ele[i].embedport.in.length !== 0) {
						for (var ins = 0; ins < ele[i].embedport.in.length; ins++) {
							this.attributes.paper.graph.addCell(ele[i].embedport.in[ins]);
						}
					}
					if (ele[i].embedport.out.length !== 0) {
						for (var outs = 0; outs < ele[i].embedport.out.length; outs++) {
							this.attributes.paper.graph.addCell(ele[i].embedport.out[outs]);
						}
					}
				}
				this.findView(this.attributes.paper.paper).update();
			}
		},
		childEquipments: function(data, gports) { //此处的data实际使用的是rx、tx那些port
			var $this = this;
			var dataGuid = [];
			for (var m = 0; m < data.length; m++) {
				dataGuid.push(data[m].Guid);
			}
			console.log(data, 'data', gports, dataGuid);
			if ($this.chidpositons === undefined) { //此处是获取当前最外层svg的坐标，供下面里层的svg准备
				$this.chidpositons = {
					x: $this.attributes.position.x,
					y: $this.attributes.position.y,
					parentWidth: 90
				};
			}
			var ChildArrays = [];
			if (gports !== undefined) {
				window.a = [];
				for (var n = 0; n < dataGuid.length; n++) {
					for (var l = 0; l < gports.length; l++) {
						if (gports[l].toPortId === dataGuid[n]) {
							console.log('1111');
							let getGport = new joint.shapes.basic.GPPort({ //todo此处需要后期修改
								portRemove: 1,
								id: gports[l].Guid,
								position: {
									x: $this.chidpositons.x + 250,
									y: $this.chidpositons.y + 115 + (n - 1) * 40
								},
								size: {
									width: 10,
									height: 10
								},
								attrs: {
									text: {
										text: gports[l].Guid,
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
							ChildArrays[l] = getGport;
							a[l] = ChildArrays[l];
						}
					}
				}
			}
			var ChildArray = [];
			//var ChildPort = [];
			var fdo;
			var inprt, ouprt, dsname, idvs, portsname;
			if (data.length === 1) {
				this.attributes.size.height -= 20;
			}
			this.runder(ChildArrays); //调用了上面的runder方法
			for (var j = 0; j < data.length; j++) { //构建main_device
				if (data[j].DevId !== undefined) {
					ChildArray = [];
					continue;
				}
				if ($this.attributes.mainpanel && data[j].devicesInfo !== undefined) { //此处这个连续的if是为了上文97行getPortAttrs硬接线port与线提供数据的，若未考虑线的情况可以先将几个数组设置为空的，这样就port与线就不展示了
					inprt = data[j].port.leftPort !== null ? data[j].port.leftPort : [];
					ouprt = data[j].port.rightPort !== null ? data[j].port.rightPort : [];
					dsname = data[j].devicesInfo.ProdevName;
					portsname = data[j].devicesInfo.Type;
					idvs = data[j].devicesInfo.Guid;
					console.log('1111113', idvs);
				} else if ($this.attributes.mainpanel && data[j].devicesInfo === undefined) {
					inprt = [];
					ouprt = data[j].ports !== null ? data[j].ports : [];
					dsname = data[j].ProdevName;
					portsname = data[j].Type;
					idvs = data[j].Guid;
				} else {
					inprt = data[j].ports !== null ? data[j].ports : [];
					ouprt = [];
					dsname = data[j].ProdevName;
					portsname = data[j].Type;
					idvs = data[j].Guid;
					console.log('111111', idvs);
				}
				if (portsname === "Card") {
					ChildArray[j] = new joint.shapes.devs.AtomicR({
						id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
						size: { //此处定义的是内部svg的size
							width: 152,
							height: 35
						},
						position: { //根据上文准备的外部svg的位置定义内部svg的位置
							x: $this.chidpositons.x + 40,
							y: $this.chidpositons.y + 70
						},
						z: window.assemblyz += 1, //暂时不知道什么用，删除后无碍
						inPorts: inprt, //以下这一堆是配置数据，通过model.attribute可以获取
						outPorts: ouprt,
						devDatas: data[j],
						paper: this.attributes.paper,
						panelData: $this.attributes.devDatas,
						dsname: dsname,
						portsname: portsname,
						attrs: { //暂时无需改动
							rect: {
								fill: '#CC6600',
								stroke: '#CC6600',
								x: 0,
								y: 0,
								width: 152,
								height: 30
							},
							'.labels': {
								text: '',
								fill: '#306796',
								'font-size': 12,
								'text-anchor': 'middle',
								'y-alignment': 'middle',
								'font-family': 'Arial, helvetica, sans-serif',
								'ref-y': 15,
								'ref-x': .5
							},
							'.inPorts rect': {
								fill: '#4283bb',
								stroke: '#665ba7',
								x: -20,
								y: 30,
								width: 100,
								height: 24
							},
							'.outPorts rect': {
								fill: '#4283bb',
								stroke: '#665ba7',
								x: -82,
								y: 30,
								width: 100,
								height: 24
							},
							'.inPorts text.port-label': {
								width: 100,
								height: 24,
								fill: '#ffffff',
								'font-size': 9,
								x: -20,
								'ref-x': 50,
								'ref-y': 44,
								'text-anchor': 'middle',
								'y-alignment': 'middle',
								'font-family': 'Arial, helvetica, sans-serif'

							},
							'.outPorts text.port-label': {
								fill: '#ffffff',
								'font-size': 9,
								x: -82,
								'ref-x': 50,
								'ref-y': 44,
								'text-anchor': 'middle',
								'y-alignment': 'middle',
								'font-family': 'Arial, helvetica, sans-serif'

							}
						}
					})
				} else {
					ChildArray[j] = new joint.shapes.devs.AtomicR({
						id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
						size: { //此处定义的是内部svg的size
							width: 132,
							height: 30
						},
						position: { //根据上文准备的外部svg的位置定义内部svg的位置
							x: $this.chidpositons.x + 50,
							y: $this.chidpositons.y + 70
						},
						z: window.assemblyz += 1, //暂时不知道什么用，删除后无碍
						inPorts: inprt, //以下这一堆是配置数据，通过model.attribute可以获取
						outPorts: ouprt,
						devDatas: data[j],
						paper: this.attributes.paper,
						panelData: $this.attributes.devDatas,
						dsname: dsname,
						porttts: dsname,
						portsname: portsname,
						attrs: { //暂时无需改动
							rect: {
								fill: '#4F88BB',
								stroke: '#41719C',
								x: 0,
								y: 0,
								width: 132,
								height: 30
							},
							'.labels': {
								text: '',
								fill: '#306796',
								'font-size': 12,
								'text-anchor': 'middle',
								'y-alignment': 'middle',
								'font-family': 'Arial, helvetica, sans-serif',
								'ref-y': 15,
								'ref-x': .5
							},
							'.inPorts rect': {
								fill: '#4283bb',
								stroke: '#665ba7',
								x: -20,
								y: 30,
								width: 100,
								height: 24
							},
							'.outPorts rect': {
								fill: '#4283bb',
								stroke: '#665ba7',
								x: -82,
								y: 30,
								width: 100,
								height: 24
							},
							'.inPorts text.port-label': {
								width: 100,
								height: 24,
								fill: '#ffffff',
								'font-size': 9,
								x: -20,
								'ref-x': 50,
								'ref-y': 44,
								'text-anchor': 'middle',
								'y-alignment': 'middle',
								'font-family': 'Arial, helvetica, sans-serif'

							},
							'.outPorts text.port-label': {
								fill: '#ffffff',
								'font-size': 9,
								x: -82,
								'ref-x': 50,
								'ref-y': 44,
								'text-anchor': 'middle',
								'y-alignment': 'middle',
								'font-family': 'Arial, helvetica, sans-serif'

							},
							'.sig1': {
								width: 20,
								height: 20,
								fill: '#ffffff',
								'ref-x': 0,
								y: 0
							},
							'.sig2': {
								width: 20,
								height: 20,
								fill: '#ffffff',
								'ref-x': 0,
								'ref-y': .89
							},
							'.sig3': {
								width: 20,
								height: 20,
								fill: '#ffffff',
								'ref-x': .91,
								y: 0
							},
							'.sig4': {
								width: 20,
								height: 20,
								fill: '#ffffff',
								'ref-x': .91,
								'ref-y': .89
							}
						}
					});
				}
				ChildArray[j].addTo(window.tbgraph);
				fdo = viewE(ChildArray[j].findView(window.tbpaper).$el[0]).bbox(true); //以下7行是定义外部svg的高根据内部svg的个数自适应
				$this.chidpositons.parentWidth += fdo.height + 10;
				$this.chidpositons.y += fdo.height + 10;
				// ChildArrays.push(ChildArray[j]);//此处为了下面this.runder(ChildArrays)展示，如果直接用ChildArray[i]则只能站址最后一个
				ChildArray[j].remove();
				this.embed(ChildArray[j]);
				this.attributes.size.height = $this.chidpositons.parentWidth;
				this.attributes.attrs['.body'].height = $this.chidpositons.parentWidth;
			}
			if (data.length === 1) {
				this.attributes.size.height -= 20;
			}
			this.runder(ChildArray); //调用了上面的runder方法
		},
		getPortAttrs: function(portName, index, total, selector, type) { //z暂时没用到，删除无碍

			var attrs = {};

			var portClass = 'port' + index;
			var portSelector = selector + '>.' + portClass;
			var portLabelSelector = portSelector + '>.port-label';
			var portBodySelector = portSelector + '>.port-body';

			attrs[portLabelSelector] = {
				text: portName
			};
			attrs[portBodySelector] = {
				port: {
					id: portName || _.uniqueId(type),
					type: type
				}
			};
			attrs[portSelector] = {
				ref: '.body',
				'ref-y': index * 26
			};
			if (this.embedport === undefined) {
				this.embedport = {};
			}
			if (this.embedport.in === undefined) {
				this.embedport.in = [];
			}
			if (this.embedport.out === undefined) {
				this.embedport.out = [];
			}
			if (this.attributes.inPorts.length !== 0) {
				this.embedport.in[index] = new joint.shapes.basic.GPPort({
					position: {
						x: this.attributes.position.x + 38,
						y: this.attributes.position.y + index * 26 + 93
					},
					size: {
						width: 10,
						height: 10
					},
					//size: { width: 100, height: 24 },
					attrs: {
						text: {
							text: this.attributes.inPorts[index]
						}
					}
				});
				this.embed(this.embedport.in[index]);
			}
			if (selector === '.outPorts') {
				attrs[portSelector]['ref-dx'] = 0;
				if (this.attributes.outPorts.length !== 0) {
					this.embedport.out[index] = new joint.shapes.basic.GPPort({
						position: {
							x: this.attributes.size.width + this.attributes.position.x - 50,
							y: this.attributes.position.y + index * 26 + 93
						},
						size: {
							width: 10,
							height: 10
						},
						//size: { width: 100, height: 24 },
						attrs: {
							text: {
								text: this.attributes.outPorts[index]
							}
						}
					});
					this.embed(this.embedport.out[index]);
				}
			}

			return attrs;
		}
	});
	joint.shapes.devs.CabinetView = joint.shapes.devs.ModelView;
})(window.jQuery, window.joint, window._, window.V, window.parent.window, window.GFC, window.bootbox);