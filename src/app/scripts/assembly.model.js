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
                <foreignObject width="50" height="30" x="0" y="0" class="htIconOut">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:left;">
                    <a title="rdgdfgd" class="content-x text-center" style="color:white;font-size: inherit;display:inline-block;width:50px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
                    </div>
                </foreignObject>
                <foreignObject width="50" height="30" x="50" y="0" class="htIconOut3">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:left;">
                    <a title="rdgdfgd" class="content-xxx text-center" style="color:white;font-size: inherit;display:inline-block;width:50px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
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
						var EditStr = '';
						$('.modal-body').html('');
						$('.modal-title').html(this.name);
						EditStr += '<div class="form-group">' +
							'<label for="ProportName">端口信息名称:</label>' +
							'<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.devDatas.Name + '" id="ProportName">' +
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
									ViewModel.attributes.devDatas.Name = GFC.formValidation($('#ProportName'));
									let cjname = cellView.model.attributes.devDatas.Name;
									if (cellView.model.attributes.devDatas.Name === '') {
										cjname = '';
									}
									cellView.model.attributes.dsname = slotObj.PortName;
									// let elementTitl = cellView.$el.find('.content-x');
									// if (GFC.formValidation($('#ProportName')).length > 6) {
									// 	let name = GFC.formValidation($('#ProportName')).slice(0,6)+'...';
									// 	console.log(name)
									// 	elementTitl.text('234');
									// } else {
									// 	elementTitl.text(GFC.formValidation($('#ProportName')));
									// }
									cellView.model.attributes.porttts = slotObj.PortName + '(' + cellView.model.attributes.jointname + ')';
									// cellView.model.attributes.attrs.text.text = cjname;
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
						let getPanelId = cellView.model.attributes.panelData.PanelId;
						let GetPanelOdfList = ROOF.physical.GetPanelOdfList;
						let GetPortsByOdfId = ROOF.physical.GetPortsByOdfId;
						var addPhyFiber = ROOF.physical.AddPhyFiber;
						let AddOdfPortInLink = ROOF.physical.AddOdfPortInLink;
						GetPanelOdfList(getPanelId, function(obj) {
							if (obj.status) {
								var datas = [];
								for (var i = 0; i < obj.devices_list.length; i++) {
									datas.push({
										name: obj.devices_list[i].box_name,
										type: obj.devices_list[i].Type,
										Guid: obj.devices_list[i].box_idx,
										children: getChildren(obj.devices_list[i].odf_list)
									})
								}

								function getChildren(list) {
									let arr = [];
									for (var l = 0; l < list.length; l++) {
										arr.push({
											name: list[l].ProodfName,
											Guid: list[l].Guid,
											type: list[l].Type,
											isParent: true //使末节点可展开
												// children: getChildren2(list[l].child)
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

									function getFont(treeId, node) {
										return node.font ? node.font : {};
									}
									var defaultTreeSetting = {
										view: {
											showLine: false,
											showIcon: false,
											fontCss: getFont, //给节点添加html样式
											nameIsHTML: true, //给节点添加html样式，需设置为true
											dblClickExpand: false,
											addDiyDom: addDiyDom,
											dblClickExpand: true
										}
									};
									return defaultTreeSetting;
								}
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
								<button id="plugtreeSearch1" class="btn btn-default" style=" float:right">添加光配箱</button> 
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
											if (treeNode.level == 1) {
												treeNode.hasLoad = true;
												GetPortsByOdfId(treeNode.Guid, function(obj) {
													console.log(obj, treeNode)
													if (obj.status) {
														let arr = [];
														$.each(obj.slot_list[0].Port_List, function(i, child) {
															let font = {};
															let c_pd_id = '';
															if (child.c_pd_id !== undefined && child.c_pd_id === 'link') {
																font = {
																	'font-weight': 'bold',
																	'color': '#000',
																	'background-color': '#717171',
																	'cursor': 'not-allowed'
																};
																c_pd_id = 'link';
															}
															arr.push({
																'name': child.ProportName,
																'Guid': child.Guid,
																'c_pd_id': c_pd_id,
																'font': font,
															});
														});
														$.fn.zTree.getZTreeObj("publicplugTree").addNodes(treeNode, 0, arr);
													} else {
														console.log("获取信息失败：" + obj.err_msg);
													}
												});
											}
											return true;
										},
										beforeClick: zTreeBeforClick
									}
								};

								function zTreeBeforClick(treeId, treeNode) { //禁止选用c_pd_id的节点
									return (treeNode.c_pd_id !== 'link');
								}
								var zTree = $.fn.zTree.init($("#publicplugTree"), $.extend(true, option, getDefaultTreeOption()));
								zTree.addNodes(null, datas);
								$('.edit-right').off('click').on('click', function() {
									var selectnodes = $.fn.zTree.getZTreeObj("publicplugTree").getSelectedNodes();
									if (selectnodes.length === 0) {
										GFC.showError('请选择一个节点！');
										return;
									}
									if (selectnodes[0].level === 0 || selectnodes[0].level === 1) {
										GFC.showError('请选择三级节点');
										return;
									}
									let getExit = [];
									let getAllData = cellView.model.attributes.allData;
									let getPortId = cellView.model.attributes.id;
									let getAllMainPortId = cellView.model.attributes.allData.mainPortId;
									let getAllOthrDev = cellView.model.attributes.allData.other_deivce;
									let getAllGp = cellView.model.attributes.allData.GPorts; //0:mainGp 1:centGp 2:othrGp
									console.log(cellView, 'cellView');
									getExit = _.filter(getAllData.rightLink, function(x) {
										return x.Port1.PortId === getPortId || x.Port2.PortId === getPortId;
									});
									if (getExit.length === 0) { //端口无连接时上光配
										var startAt = getPortId;
										var endAt = selectnodes[0].Guid;
										var portinfo = {};
										if (startAt === undefined || endAt === undefined) {
											GFC.showError('请确保至少有一个端口被选中');
											return;
										}
										portinfo.SrcPortId = startAt;
										portinfo.DstPortId = endAt;
										console.log(portinfo, 'portinfo');
										addPhyFiber(portinfo, function(dlstj) {
											if (dlstj.status) {
												console.log(obj, 'obj');
												$('.main-modal').modal('hide');
												GFC.reload();
											} else {
												console.log(err_msg, 'err_msg')
											}
										});
									} else {
										if (_.indexOf(getAllMainPortId, getPortId) !== -1) { //端口为已有连接线且为mainPort
											let getExit2 = [];
											getExit2 = _.filter(getAllGp[0], function(o) {
												return o.ForPort === getPortId
											});
											if (getExit2.length !== 0) {
												GFC.showError("该端口已上光配！");
												$('.main-modal').modal('hide');
												return;
											} else {
												//转接
												let getExit4 = [];
												getExit4 = _.filter(getAllData.rightLink, function(p) {
													return p.Port1.PortId === getPortId;
												});
												let linkId = getExit4[0].PhylinkId;
												let endid = selectnodes[0].Guid;
												if (linkId === undefined || endid == undefined) {
													GFC.showError('请确保至少有一个端口被选中');
													return;
												}
												AddOdfPortInLink(linkId, endid, function(obd) {
													if (obd.status) {
														console.log(obd, 'obd')
														GFC.reload();
														$('.main-modal').modal('hide');
													} else {
														GFC.showError(obd.err_msg);
														console.log(obd.err_msg, linkId, endid);
													}
												});
											}
										}
									}
								});
								$('#plugtreeSearch1').off('click').on('click', function() {
									$('.modal-body2').html('').css({
										'padding-top': '5px'
									});
									$('.modal-title2').html('添加光配箱');
									var content = `
										<div class="modal-body" id="addLightBoxModal"> 
										<div class="modal-item"><span class="modal-item-title">光配箱规格:</span> 
										<select class="form-control" id="lightBoxSel"> 
										<option value="1U">1U</option> 
										<option value="2U">2U</option> 
										<option value="3U" selected="true">3U</option> 
										<option value="4U">4U</option> 
										<option value="5U">5U</option> 
										<option value="6U">6U</option> 
										</select> 
										</div> 
										</div> `.trim();
									$('.modal-body2').html(content);
									$('.daboule-modal').modal('show');
									$('.edit-bt2').click(function() {
										physical.AddPhyLightDistBox($("#lightBoxSel").val(), getPanelId, function(oks) {
											if (oks.status) {
												let newdata = [];
												newdata.push({
													name: oks.box_info.box_name,
													type: oks.box_info.Type,
													Guid: oks.box_info.box_idx,
													children: getChildren(oks.box_info.odf_list)
												});
												zTree.addNodes(null, newdata);
											} else {
												GFC.showError(oks.err_msg);
											}
										});
									});
								});

							} else {
								console.log(err_msg);
							}
						});
					}
				}, {
					name: '去光配',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						let getAllGp = cellView.model.attributes.allData.GPorts;
						let getExit = [];
						getExit = _.filter(getAllGp[0], function(obs) {
							return obs.ForPort === ViewModel.id;
						});
						if (getExit.length === 0) {
							GFC.showError("该端口未上光配！");
							return;
						}
						$('.modal-body').text('确认释放光配?');
						$('.modal-title').html(this.name);
						$('.main-modal').modal();
						cellView.update();
						$('.edit-right').unbind('click');
						$('.edit-right').click(function() {
							var ReleaseLightDistribution = ROOF.physical.ReleaseLightDistribution;
							ReleaseLightDistribution(getExit[0].PortId, function(obj) {
								console.log(getExit[0].PortId, obj, 'obj')
								if (obj.status) {
									GFC.reload();
									$('.modal-body').text('释放光配成功');
									$('.modal-body').text('');
									$('.main-modal').modal('hide');

								} else {
									$('.modal-body').text('释放光配失败');
								}
							});

						});
					}
				}, {
					name: '更换',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						var $this = this;
						let AppH = [];
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
						var getMainDevId = ViewModel.attributes.panelData.Guid;
						console.log(ViewModel.attributes, 'parent')
						getPortsByDeviceId(getMainDevId, function(obj) {
							console.log(obj, 'obj')
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
										console.log(ViewModel.id, $thisE.attr('data-id'), ViewModel, 'viewE')
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
						var ViewModel = cellView.model;
						var getAllPhy = ViewModel.attributes.allData.rightLink;
						let getExit = [];
						let getExit2 = [];
						getExit = _.filter(getAllPhy, function(oo1) {
							return oo1.Port1.PortId === ViewModel.id;
						});
						if (getExit.length !== 0) {
							getExit2 = _.filter(ViewModel.attributes.gports, function(oo2) {
								return oo2 === getExit[0].Port2.PortId;
							});
						}
						console.log(ViewModel.attributes.gports, getExit, getExit2)
						if (getExit2.length === 0) {
							GFC.showError('该端口已存在连接！');
							return;
						}
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
								// EditStr = `<div class="ctrl-ist text-muted" style="position:absolute; left:18px;bottom:-40px;font-size: 14px;">按下ctrl键用鼠标点击可以批量选择端口.</div>
								EditStr = `<div class="ctrl-ist text-muted" style="position:absolute; left:18px;bottom:-40px;font-size: 14px;"></div>
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
								var ispl = false;
								var creatlistPanel = function(sdg, ts) {
									sdg.html('');
									var str = '';
									var thispannel;
									console.log(obj, 'obj')
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
										creatlistDev($('.end-pdevices-list'), dArray.Children, ts);
									});
									sdg.trigger('change');
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
												$('.end-solt-list').html('');
												creatlistSolt($('.end-solt-list'), dArray, ts);
											} else {
												console.log('ddd');
											}
										});
									});
									dsdg.trigger('change');
								};
								var creatlistSolt = function(dsdg, ddata, ts) {
									dsdg.html('');
									var str = '';
									var thislistid = '';
									var thisclass = '';
									thislistid = '#end-solt-list';
									thisclass = 'end-port-list';
									console.log(ddata, 'ddata', ViewModel)
									let getType = ViewModel.attributes.devDatas.Type;
									$.each(ddata, function(indg, dgg) {
										var strc = '';
										$.each(dgg.Port_List, function(index, item) {
											var spanStr = '',
												findStr = '',
												isdisable = '';
											//console.log(item.c_pd_id);
											if (getType === "RX") {
												if (item.ProportFunctiontype === "TX") {
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
												}
											} else if (getType === "TX") {
												if (item.ProportFunctiontype === "RX") {
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
												}
											} else if (getType === "DX") {
												if (item.ProportFunctiontype === "DX") {
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
												}
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
										ispl = false;
										$('.poitem-to').removeClass('list-group-item-info');
										if ($(this).hasClass('active')) {
											$(this).removeClass('active');
											sgt.find('.poitem-to').removeClass('active');
											return;
										}
										sgt.find('.poitem-to').removeClass('active');
										$(this).addClass('active');


									}).off('dblclick').on('dblclick', function() {
										$(this).addClass('active');
										$('.edit-right').trigger('click');
									});
								};
								creatlistPanel($('.end-panel-list'), 'r');
								$('.edit-right').off('click').on('click', function() {
									let sendportname = [];
									let recvportname = [];
									var endAt = $('.end-port-list').find('.active').attr('data-id');
									var startAt = ViewModel.id;
									var portinfo = {};
									portinfo.SrcPortId = startAt;
									portinfo.DstPortId = endAt;
									addPhyFiber(portinfo, function(dlstj) {
										console.log(portinfo, dlstj, 'portinfo')
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
                <foreignObject width="50" height="30" x="30" y="0" class="htIconOut">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:center;">
                    <a title="rdgdfgd" class="content-x text-center" style="color:white;font-size: inherit;display:inline-block;width:50px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
                    </div>
                </foreignObject>
                <foreignObject width="50" height="30" x="80" y="0" class="htIconOut3">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:left;">
                    <a title="rdgdfgd" class="content-xxx text-center" style="color:white;font-size: inherit;display:inline-block;width:50px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
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
						var EditStr = '';
						$('.modal-body').html('');
						$('.modal-title').html(this.name);
						EditStr += '<div class="form-group">' +
							'<label for="ProportName">端口信息名称:</label>' +
							'<input type="text" class="form-control change-atr" value="' + ViewModel.attributes.devDatas.Name + '" id="ProportName">' +
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
									let cjname = cellView.model.attributes.devDatas.Name;
									if (cellView.model.attributes.devDatas.ProdevName === '') {
										cjname = '';
									}
									let elementTitl = cellView.$el.find('.content-x');
									elementTitl.text(slotObj.PortName);
									cellView.model.attributes.dsname = slotObj.PortName;
									cellView.model.attributes.porttts = slotObj.PortName;
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
						let getPanelId = cellView.model.attributes.panelData.PanelId;
						let GetPanelOdfList = ROOF.physical.GetPanelOdfList;
						let GetPortsByOdfId = ROOF.physical.GetPortsByOdfId;
						var addPhyFiber = ROOF.physical.AddPhyFiber;
						let AddOdfPortInLink = ROOF.physical.AddOdfPortInLink;
						GetPanelOdfList(getPanelId, function(obj) {
							if (obj.status) {
								var datas = [];
								for (var i = 0; i < obj.devices_list.length; i++) {
									datas.push({
										name: obj.devices_list[i].box_name,
										type: obj.devices_list[i].Type,
										Guid: obj.devices_list[i].box_idx,
										children: getChildren(obj.devices_list[i].odf_list)
									})
								}

								function getChildren(list) {
									let arr = [];
									for (var l = 0; l < list.length; l++) {
										arr.push({
											name: list[l].ProodfName,
											Guid: list[l].Guid,
											type: list[l].Type,
											isParent: true //使末节点可展开
												// children: getChildren2(list[l].child)
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
								<button id="plugtreeSearch2" class="btn btn-default" style=" float:right">添加光配箱</button> 
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
											if (treeNode.level == 1) {
												treeNode.hasLoad = true;
												GetPortsByOdfId(treeNode.Guid, function(obj) {
													if (obj.status) {
														$.each(obj.slot_list[0].Port_List, function(i, child) {
															child.name = child.ProportName;
															// child.isParent = true;
														})
														$.fn.zTree.getZTreeObj("publicplugTree").addNodes(treeNode, 0, obj.slot_list[0].Port_List);
													} else {
														console.log("获取信息失败：" + obj.err_msg);
													}
												})
											}
											return true;
										}
									}
								};
								var zTree = $.fn.zTree.init($("#publicplugTree"), $.extend(true, option, getDefaultTreeOption()));
								zTree.addNodes(null, datas);
								$('.edit-right').off('click').on('click', function() {
									var selectnodes = $.fn.zTree.getZTreeObj("publicplugTree").getSelectedNodes();
									if (selectnodes[0].level === 0 || selectnodes[0].level === 1) {
										GFC.showError('请选择三级节点');
										return;
									}
									let getAllData = cellView.model.attributes.allData;
									let getPortId = cellView.model.attributes.id;
									let getAllOthrDev = cellView.model.attributes.allData.other_deivce;
									let getAllGp = cellView.model.attributes.allData.GPorts; //0:mainGp 1:centGp 2:othrGp
									console.log(cellView, 'cellView');
									let getExit3 = [];
									getExit3 = _.filter(getAllGp[1], function(o) {
										return o.PortId === (_.filter(getAllOthrDev, function(p) {
											return p.Guid === getPortId
										}))[0].ForPort;
									});
									if (getExit3.length !== 0) {
										GFC.showError("该端口已上光配！");
									} else {
										//转接
										let getExit4 = [];
										getExit4 = _.filter(getAllData.rightLink, function(p) {
											return p.Port2.PortId === getPortId;
										});
										let linkId = getExit4[0].PhylinkId;
										let endid = selectnodes[0].Guid;
										if (linkId === undefined || endid == undefined) {
											GFC.showError('请确保至少有一个端口被选中');
											return;
										}
										AddOdfPortInLink(linkId, endid, function(obd) {
											if (obd.status) {
												console.log(obd, 'obd')
												GFC.reload();
												$('.main-modal').modal('hide');
											} else {
												GFC.showError(obd.err_msg);
												console.log(obd.err_msg, linkId, endid);
											}
										});
									}
								});
								$('#plugtreeSearch2').off('click').on('click', function() {
									$('.modal-body2').html('').css({
										'padding-top': '5px'
									});
									$('.modal-title2').html('添加光配箱');
									var content = `
										<div class="modal-body" id="addLightBoxModal"> 
										<div class="modal-item"><span class="modal-item-title">光配箱规格:</span> 
										<select class="form-control" id="lightBoxSel"> 
										<option value="1U">1U</option> 
										<option value="2U">2U</option> 
										<option value="3U" selected="true">3U</option> 
										<option value="4U">4U</option> 
										<option value="5U">5U</option> 
										<option value="6U">6U</option> 
										</select> 
										</div> 
										</div> `.trim();
									$('.modal-body2').html(content);
									$('.daboule-modal').modal('show');
									$('.edit-bt2').click(function() {
										physical.AddPhyLightDistBox($("#lightBoxSel").val(), getPanelId, function(oks) {
											if (oks.status) {
												let newdata = [];
												newdata.push({
													name: oks.box_info.box_name,
													type: oks.box_info.Type,
													Guid: oks.box_info.box_idx,
													children: getChildren(oks.box_info.odf_list)
												});
												zTree.addNodes(null, newdata);
											} else {
												GFC.showError(oks.err_msg);
											}
										});
									});
								});
							} else {
								console.log(err_msg);
							}
						});
					}
				}, {
					name: '去光配',
					fc: function(cellView) {
						window.ViewModel = cellView.model;
						let getAllGp = cellView.model.attributes.allData.GPorts;
						let getExit = [];
						let getExit2 = [];
						getExit2 = _.filter(ViewModel.attributes.allData.other_device, function(obs1) {
							return obs1.DevPort[0].Guid === ViewModel.id
						});
						if (getExit2.length > 0) {
							getExit = _.filter(getAllGp[1], function(obs) {
								return obs.PortId === getExit2[0].ForPort;
							});
						}
						if (getExit.length === 0) {
							GFC.showError("该端口未上光配！");
							return;
						}
						$('.modal-body').text('确认释放光配?');
						$('.modal-title').html(this.name);
						$('.main-modal').modal();
						cellView.update();
						$('.edit-right').unbind('click');
						$('.edit-right').click(function() {
							var ReleaseLightDistribution = ROOF.physical.ReleaseLightDistribution;
							ReleaseLightDistribution(getExit[0].PortId, function(obj) {
								console.log(getExit[0].PortId, obj, 'obj')
								if (obj.status) {
									GFC.reload();
									$('.modal-body').text('释放光配成功');
									$('.modal-body').text('');
									$('.main-modal').modal('hide');

								} else {
									$('.modal-body').text('释放光配失败');
								}
							});

						});
					}
				}, {
					name: '更换',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						var $this = this;
						let AppH = [];
						var getMainDevId = ViewModel.attributes.panelData.Guid;
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
						getPortsByDeviceId(getMainDevId, function(obj) {
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
			let elementTitls3 = this.$el.find('.content-xxx');
			if (this.model.attributes.dsname.length > 6) {
				elementTitls.attr('title', this.model.attributes.dsname).text(this.model.attributes.dsname.slice(0, 6) + '...');
			} else {
				elementTitls.attr('title', this.model.attributes.dsname).text(this.model.attributes.dsname);
			}
			elementTitls3.attr('title', this.model.attributes.jointname).text(this.model.attributes.jointname);
			elementTitls2.attr('title', this.model.attributes.portsname).text(this.model.attributes.portsname);
			if (this.model.attributes.portsname === 'TX') {
				elementTitls2.css('background-color', '#F4B183');
			}
			if (this.model.attributes.portsname === 'Card') {
				this.$el.find('.htIconOut2').addClass('hide');
				this.$el.find('.htIconOut3').addClass('hide');
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
							'<input type="text" class="form-control change-atr" value="' + cellView.model.attributes.devDatas.Name + '" id="exampleInputEmail1" placeholder="">' +
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
							renamePhydevice(ViewModel.attributes.devDatas.Guid, NewName, function(obj) {
								if (obj.status) {
									cellView.model.attributes.dsname = NewName + '(' + ViewModel.attributes.devDatas.ShortName + ')';
									cellView.model.attributes.porttts = NewName + '(' + ViewModel.attributes.devDatas.ShortName + ')';
									if (NewName.length > 14) {
										NewName = NewName.slice(0, 14) + '...';
										elementTitls.text(NewName);
									} else {
										elementTitls.text(NewName);
									}
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
					width: 283,
					height: 150
				},
				'g.title-class': {
					x: 0,
					y: 0
				},
				'rect.title-class': {
					fill: '#5B9BD5',
					stroke: '#5B9BD5',
					width: 283,
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
				this.childEquipments(this.attributes.childequipments, this.attributes.devicesNolink);
			}
			// if (this.attributes.devicesNolink !== undefined) {
			// 	this.childEquipments(this.attributes.devicesNolink);
			// }
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
		childEquipments: function(data, allData) { //此处的data实际使用的是rx、tx那些port
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
			var inprt, ouprt, dsname, idvs, portsname, jointname;
			for (var i = 0; i < data.length; i++) {
				if (data[i].DevId !== undefined) {
					ChildArray = [];
					continue;
				}
				if ($this.attributes.mainpanel && data[i].devicesInfo !== undefined) { //此处这个连续的if是为了上文97行getPortAttrs硬接线port与线提供数据的，若未考虑线的情况可以先将几个数组设置为空的，这样就port与线就不展示了
					inprt = data[i].port.leftPort !== null ? data[i].port.leftPort : [];
					ouprt = data[i].port.rightPort !== null ? data[i].port.rightPort : [];
					dsname = data[i].devicesInfo.Name;
					portsname = data[i].devicesInfo.Type;
					idvs = data[i].devicesInfo.Guid;
				} else if ($this.attributes.mainpanel && data[i].devicesInfo === undefined) {
					inprt = [];
					ouprt = data[i].ports !== null ? data[i].ports : [];
					dsname = data[i].Name;
					portsname = data[i].Type;
					idvs = data[i].Guid;
					jointname = data[i].JointType;
				} else {
					inprt = data[i].ports !== null ? data[i].ports : [];
					ouprt = [];
					dsname = data[i].Name;
					portsname = data[i].Type;
					idvs = data[i].Guid;
					jointname = data[i].JointType;
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
					allData: allData,
					paper: this.attributes.paper,
					panelData: $this.attributes.devDatas,
					dsname: dsname,
					jointname: jointname,
					porttts: dsname + '(' + jointname + ')',
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
	joint.shapes.devs.Cabinet2 = joint.shapes.devs.Model.extend({ //main_device
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
						let elementTitls = cellView.$el.find('text.title-class');
						$('.modal-title').html(this.name);
						EditStr += '<div class="form-group">' +
							'<label for="exampleInputEmail1">装置名称:</label>' +
							'<input type="text" class="form-control change-atr" value="' + cellView.model.attributes.devDatas.Name + '" id="exampleInputEmail1" placeholder="">' +
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
							renamePhydevice(ViewModel.attributes.devDatas.Guid, NewName, function(obj) {
								if (obj.status) {
									cellView.model.attributes.dsname = NewName + '(' + ViewModel.attributes.devDatas.ShortName + ')';
									cellView.model.attributes.porttts = NewName + '(' + ViewModel.attributes.devDatas.ShortName + ')';
									if (NewName.length > 14) {
										NewName = NewName.slice(0, 14) + '...';
										elementTitls.text(NewName);
									} else {
										elementTitls.text(NewName);
									}
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
						var treeNote = ROOF.svgPortHardwireNote.getNodeByParam('guid', ViewModel.attributes.devDatas.Guid);
						ROOF.common.loadModalContent(ROOF.hardconnection.moveDeviceModal());
						ROOF.hardconnection.loadMoveDeviceData(treeNote);
						ROOF.hardconnection.initMoveDeviceHanlder(treeNote);
					}
				}, {
					name: '端口',
					fc: function(cellView) {
						var ViewModel = cellView.model;
						console.log(ViewModel, 'ViewModel')
						var $this = this;
						let AppH = [];
						var getPortsByDeviceId = ROOF.physical.GetPortsByDeviceId;
						getPortsByDeviceId(ViewModel.attributes.devDatas.Guid, function(obj) {
							console.log(obj, ViewModel.attributes.devDatas.Guid, '端口');
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
				this.childEquipments(this.attributes.devicesNolink.noLinkDevices, this.attributes.devicesNolink.GPorts, this.attributes.devicesNolink.mainPortId, this.attributes.devicesNolink);
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
		childEquipments: function(data, gports, mainPortId, allData) { //此处的data实际使用的是rx、tx那些port
			var $this = this;
			var dataGuid = [];
			console.log(data, 'data')
			for (var m = 0; m < data.length; m++) {
				dataGuid.push(data[m].Guid);
			}
			// console.log(data, 'data', gports, dataGuid);
			if ($this.chidpositons === undefined) { //此处是获取当前最外层svg的坐标，供下面里层的svg准备
				$this.chidpositons = {
					x: $this.attributes.position.x,
					y: $this.attributes.position.y,
					parentWidth: 90
				};
			}
			var ChildArrays = [];
			var ChildArray = [];
			//var ChildPort = [];
			var fdo;
			var inprt, ouprt, dsname, idvs, portsname, PanelId, jointname;
			if (data.length === 1) {
				this.attributes.size.height -= 20;
			}
			this.runder(ChildArrays); //调用了上面的runder方法
			var portdata = [];
			for (var j = 0; j < data.length; j++) {
				portdata.push({
					"Guid": data[j].SlotId,
					"Name": data[j].SlotName,
					"Type": "Card"
				});
				if (data[j].DevPort !== null && data[j].DevPort.length > 0) {
					for (var l = 0; l < data[j].DevPort.length; l++) {
						portdata.push({
							"Guid": data[j].DevPort[l].Guid,
							"Name": data[j].DevPort[l].Name,
							"Type": data[j].DevPort[l].Type,
							"PanelId": data[j].DevPort[l].PanelId,
							"JointType": data[j].DevPort[l].JointType
						});
					}
				}
			}
			for (var n = 0; n < portdata.length; n++) { //构建main_device的端口
				// if ($this.attributes.mainpanel && data[j].devicesInfo !== undefined) { //此处这个连续的if是为了上文97行getPortAttrs硬接线port与线提供数据的，若未考虑线的情况可以先将几个数组设置为空的，这样就port与线就不展示了
				// inprt = data[j].port.leftPort !== null ? data[j].port.leftPort : [];
				// ouprt = data[j].port.rightPort !== null ? data[j].port.rightPort : [];
				inprt = [];
				ouprt = [];
				dsname = portdata[n].Name;
				portsname = portdata[n].Type;
				idvs = portdata[n].Guid;
				jointname = portdata[n].JointType;
				PanelId = portdata[n].PanelId;
				// }
				if (portsname === "Card") {
					ChildArray[n] = new joint.shapes.devs.AtomicR({
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
						devDatas: portdata[n],
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
					ChildArray[n] = new joint.shapes.devs.AtomicR({
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
						devDatas: portdata[n],
						paper: this.attributes.paper,
						panelData: $this.attributes.devDatas,
						allData: allData, //将所有的处理后的数据传给各个内部端口svg供其操作使用
						dsname: dsname,
						gports: gports[4],
						jointname: jointname,
						porttts: dsname + '(' + jointname + ')',
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
				ChildArray[n].addTo(window.tbgraph);
				fdo = viewE(ChildArray[n].findView(window.tbpaper).$el[0]).bbox(true); //以下7行是定义外部svg的高根据内部svg的个数自适应
				$this.chidpositons.parentWidth += fdo.height + 15;
				$this.chidpositons.y += fdo.height + 15; //内部各个端口svg的间距
				// ChildArrays.push(ChildArray[j]);//此处为了下面this.runder(ChildArrays)展示，如果直接用ChildArray[i]则只能站址最后一个
				ChildArray[n].remove();
				this.embed(ChildArray[n]);
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