'use strict';
(function($, joint, _, viewE, ROOF, GFC, bootbox) {
	if (ROOF === undefined) {
		ROOF = window;
	}
	joint.shapes.devs.AtomicRPP = joint.shapes.devs.Model.extend({ //main_panel的device
		markup: `<g class="rotatable">
                <g class="scalable">
                </g>
                <rect class="body"/>
                <text class="labels"/>
                <foreignObject width="80" height="30" x="20" y="0" class="htIconOut">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:center;">
                    <a title="rdgdfgd" class="content-x text-center" style="font-size: inherit;display:inline-block;width:80px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
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
				'.content-x': {
					fill: '#CBFFFF'
				},
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
			var portHeight;
			if (porNumber === 1) {
				portHeight = (element.attributes.attrs['.inPorts rect'].height + 2) * porNumber + 0;
			} else {
				portHeight = (element.attributes.attrs['.inPorts rect'].height + 2) * porNumber + 8;
			}
			if (portHeight > element.attributes.attrs.rect.height) { //此处是加硬接线端口时，显示内部svg的最小高度，现在没有硬接线端口所以解除限制
				element.attributes.attrs.rect.height = portHeight;
				element.attributes.size.height = portHeight;
			}

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
					this.embedport.in[index] = new joint.shapes.basic.RectPortPP({
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
					let cjname = this.attributes.outPorts[index].ProbsName;
					if (this.attributes.outPorts[index].ProbsName === '') {
						cjname = '';
					}
					this.embedport.out[index] = new joint.shapes.basic.RectPortPP({
						id: this.attributes.outPorts[index].Guid,
						position: {
							// x: this.attributes.size.width + this.attributes.position.x - 63,
							x: this.attributes.position.x,
							y: this.attributes.position.y + index * 36 - 30
						},
						porttts: cjname,
						z: window.assemblyz += 1,
						size: {
							width: 100,
							height: 24
						},
						devDatas: this.attributes.outPorts[index],
						panelData: this.attributes.panelData,
						attrs: {
							text: {
								text: cjname
							}
						}
					});
					this.embed(this.embedport.out[index]);
				}
			}

			return attrs;
		}
	});
	joint.shapes.devs.AtomicRP = joint.shapes.devs.Model.extend({ //main_panel内的光配组模型
		markup: '<g class="rotatable">' +
			'<g class="scalable">' +
			'</g>' +
			'<rect class="body parent-class"/>' +
			'<g class="title-class">' +
			'<rect class="title-class" />' +
			'<text class="labels title-class" />' +
			'</g>' +
			'</g>',
		defaults: joint.util.deepSupplement({
			type: 'devs.AtomicRP',
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
						console.log('点击编辑');
					}
				},
				otherMenu: [{
					name: '移动至',
					fc: function(cellView) {
						console.log('点击移动至');
					}
				}, {
					name: '端口',
					fc: function(cellView) {
						console.log('点击端口');
					}
				}, {
					name: '连接',
					fc: function(cellView) {
						console.log('点击连接');
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
					fill: 'red',
					stroke: '#E2EFD9',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 30,
					height: 100

				},
				'.body': {
					fill: '#C5E0B3',
					stroke: '#C5E0B3',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 30,
					height: 100

				},
				'g.title-class': {
					x: 0,
					y: 0,
					transform: 'translate(0,0)'

				},
				'rect.title-class': {
					fill: '#538135',
					stroke: '#538135',
					width: 30,
					height: 25

				},
				'text.title-class': { //此处控制外部svg的title的相对位置等
					fill: '#ffffff',
					text: 'A层',
					'font-size': 16,
					'ref-x': .3,
					'ref-y': 15,
					'text-anchor': 'middle',
					'y-alignment': 'middle',
					'font-family': 'Arial, helvetica, sans-serif'

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
			// var portHeight = (element.attributes.attrs['.inPorts rect'].height + 2) * porNumber + 8;
			// if (portHeight > element.attributes.attrs.rect.height) { //此处是加硬接线端口时，显示内部svg的最小高度，现在没有硬接线端口所以解除限制
			// 	element.attributes.attrs.rect.height = portHeight;
			// 	element.attributes.size.height = portHeight;
			// }

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
			if (selector === '.outPorts') {
				attrs[portSelector]['ref-dx'] = 0;
				if (this.attributes.outPorts.length !== 0) {
					let cjname = this.attributes.outPorts[index].ProbsName;
					let dkname = this.attributes.outPorts[index].ProportName + '-';
					let fcname = this.attributes.outPorts[index].ProportFunctiontype + '-';
					let joname = this.attributes.outPorts[index].ProportJointtype + '-';
					let dename = this.attributes.outPorts[index].ProportDesc;
					let devdesc = this.attributes.outPorts[index].ProbsDesc + '-';
					let getType = this.attributes.outPorts[index].Type;
					if (this.attributes.outPorts[index].ProbsName === '') {
						cjname = '';
						devdesc = '';
					}
					devdesc = '';
					this.embedport.out[index] = new joint.shapes.basic.GPMainPort({
						id: this.attributes.outPorts[index].Guid,
						position: {
							// x: this.attributes.size.width + this.attributes.position.x - 63,
							x: this.attributes.position.x + 10,
							y: this.attributes.position.y + index * 45 + 40
						},
						// porttts: devdesc + cjname + dkname + fcname + joname + dename,
						z: window.assemblyz += 1,
						size: {
							width: 100,
							height: 24
						},
						devDatas: this.attributes.outPorts[index],
						panelData: this.attributes.panelData,
						attrs: {
							// text: {
							// 	text: joint.util.breakText(cjname + dkname + fcname + joname, {
							// 		width: 100,
							// 		height: 24
							// 	})
							// }
							text: {
								text: cjname
							}
						}
					});
					this.embed(this.embedport.out[index]);
				}
			}

			return attrs;
		}
	});
	joint.shapes.devs.AtomicTP = joint.shapes.devs.Model.extend({
		markup: `<g class="rotatable">
                <g class="scalable">
                </g>
                <rect class="body"/>
                <text class="labels"/>
                <foreignObject width="80" height="30" x="20" y="0" class="htIconOut">
                    <div xmlns="http://www.w3.org/1999/xhtml" class="iconBody" style="text-align:center;">
                    <a title="rdgdfgd" class="content-x text-center" style="font-size: inherit;display:inline-block;width:80px;height:30px;line-height: 30px;text-decoration: none;">jijkkjkj</a>
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
						console.log('点击编辑');
					}
				},
				otherMenu: [{
					name: '移动至',
					fc: function(cellView) {
						console.log('点击移动至');
					}
				}, {
					name: '端口',
					fc: function(cellView) {
						console.log('点击端口');
					}
				}, {
					name: '连接',
					fc: function(cellView) {
						console.log('点击连接');
					}
				}]
			},
			attrs: {
				'.content-x': {
					fill: '#CBFFFF'
				},
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
			var portHeight;
			if (porNumber === 1) {
				portHeight = (element.attributes.attrs['.inPorts rect'].height + 2) * porNumber + 0;
			} else {
				portHeight = (element.attributes.attrs['.inPorts rect'].height + 2) * porNumber + 8;
			}
			if (portHeight > element.attributes.attrs.rect.height) { //此处是加硬接线端口时，显示内部svg的最小高度，现在没有硬接线端口所以解除限制
				element.attributes.attrs.rect.height = portHeight;
				element.attributes.size.height = portHeight;
			}

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
					let cjname = this.attributes.inPorts[index].ProbsName;
					if (this.attributes.inPorts[index].ProbsName === '') {
						cjname = '';
					}
					this.embedport.in[index] = new joint.shapes.basic.RectPortP({
						id: this.attributes.inPorts[index].Guid,
						position: {
							x: this.attributes.position.x + 160,
							y: this.attributes.position.y + index * 36 - 30
						},
						porttts: cjname,
						z: window.assemblyz += 1,
						size: {
							width: 100,
							height: 24
						},
						devDatas: this.attributes.inPorts[index],
						panelData: this.attributes.panelData,
						attrs: {
							text: {
								text: cjname
							}
						}
					});
					this.embed(this.embedport.in[index]);
				}
			}
			if (selector === '.outPorts') {
				attrs[portSelector]['ref-dx'] = 0;
				if (this.attributes.outPorts.length !== 0) {
					let cjname = this.attributes.outPorts[index].ProbsName;
					let dkname = this.attributes.outPorts[index].ProportName + '-';
					let fcname = this.attributes.outPorts[index].ProportFunctiontype + '-';
					let joname = this.attributes.outPorts[index].ProportJointtype + '-';
					let dename = this.attributes.outPorts[index].ProportDesc;
					let devdesc = this.attributes.outPorts[index].ProbsDesc + '-';
					let getType = this.attributes.outPorts[index].Type;
					if (this.attributes.outPorts[index].ProbsName === '') {
						cjname = '';
						devdesc = '';
					}
					devdesc = '';
					this.embedport.out[index] = new joint.shapes.basic.RectPortPP({
						id: this.attributes.outPorts[index].Guid,
						position: {
							// x: this.attributes.size.width + this.attributes.position.x - 63,
							x: this.attributes.position.x,
							y: this.attributes.position.y + index * 36 - 30
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
								text: cjname
							}
						}
					});
					this.embed(this.embedport.out[index]);
				}
			}

			return attrs;
		}
	});
	joint.shapes.devs.AtomicRPView = joint.shapes.devs.ModelView.extend({
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
			elementTitls.attr('title', this.model.attributes.dsname).text(this.model.attributes.dsname);
		}
	});
	joint.shapes.devs.CabinetTP = joint.shapes.devs.Model.extend({ //other_panel
		markup: '<g class="rotatable">' +
			'<g class="scalable">' +
			'</g>' +
			'<rect class="body parent-class"/>' +
			// '<g class="title-class">' +
			// '<rect class="title-class" />' +
			'<text class="labels title-class" />' +
			// '</g>' +
			'</g>',
		defaults: joint.util.deepSupplement({
			paper: null,
			childequipments: null,
			type: 'devs.Cabinet',
			// dbMenu: function(cellView) {//此处为双击跳转，可以不添加
			// 	console.log(cellView);
			// 	$('.infosig-group').find('button').removeClass('disabled');
			// 	window.location.href = '#hardwire/' + cellView.model.id;
			// },
			rightMenu: {
				centerMenu: {
					name: '编辑',
					fc: function(centerMenu) {
						console.log('点击编辑');
					}
				},
				otherMenu: [{
					name: '移动至',
					fc: function(centerMenu) {
						console.log('点击移动至');
					}
				}, {
					name: '屏内装置',
					fc: function(centerMenu) {
						console.log('点击屏内装置');
					}
				}]
			},
			attrs: {
				'.labels': {
					fill: '#ffffff',
					text: 'jigui',
					'font-size': 14,
					'ref-x': .5,
					'ref-y': 5,
					'text-anchor': 'middle',
					'y-alignment': 'middle',
					'font-family': 'Arial, helvetica, sans-serif'
				},
				'rect.parent-class': {
					fill: '#E2EFD9',
					stroke: '#E2EFD9',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 453,
					height: 515

				},
				'.body': {
					fill: '#E2EFD9',
					stroke: '#E2EFD9',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 453,
					height: 100

				},
				'g.title-class': {
					x: 0,
					y: 0,
					transform: 'translate(0,0)'

				},
				'rect.title-class': {
					fill: '#A8D08D',
					stroke: '#A8D08D',
					width: 333,
					height: 32

				},
				'text.title-class': { //此处控制panel名称相对位置
					fill: '#538135',
					text: 'jigui',
					'font-size': 16,
					'ref-x': .1,
					'ref-y': 23,
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
			var dataGuid = [];
			for (var m = 0; m < data.length; m++) {
				dataGuid.push(data[m].Guid);
			}
			if ($this.chidpositons === undefined) { //此处是获取当前最外层svg的坐标，供下面里层的svg准备
				$this.chidpositons = {
					x: $this.attributes.position.x,
					y: $this.attributes.position.y,
					parentWidth: 90
				};
			}
			var ChildArray = [];
			var fdo;
			var inprt, ouprt, dsname, idvs, portsname;
			for (var j = 0; j < data.length; j++) {
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
				}
				var getTitlePosi = (data.length - 1) * 10;
				ChildArray[j] = new joint.shapes.devs.AtomicTP({
					id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
					size: { //此处定义的是内部svg的size
						width: 232,
						height: 0
					},
					position: { //根据上文准备的外部svg的位置定义内部svg的位置
						x: $this.chidpositons.x + 120,
						y: $this.chidpositons.y + 5
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
							fill: '#CBFFFF',
							stroke: '#CBFFFF',
							x: 0,
							y: 0,
							width: 232,
							height: 0
						},
						'.htIconOut': {
							x: 0,
							y: getTitlePosi
						},
						'.labels': {
							text: '',
							fill: '#41719C',
							'font-size': 12,
							'text-anchor': 'middle',
							'y-alignment': 'middle',
							'font-family': 'Arial, helvetica, sans-serif',
							'ref-y': 5,
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

				ChildArray[j].addTo(window.tbgraph);
				fdo = viewE(ChildArray[j].findView(window.tbpaper).$el[0]).bbox(true); //以下7行是定义外部svg的高根据内部svg的个数自适应
				$this.chidpositons.parentWidth += fdo.height + 60;
				$this.chidpositons.y += fdo.height + 30;
				ChildArray[j].remove();
				this.embed(ChildArray[j]);
				this.attributes.size.height = $this.chidpositons.parentWidth - 140; //屏柜的height
				this.attributes.attrs['.body'].height = $this.chidpositons.parentWidth - 140; //屏柜的height
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
				this.embedport.in[index] = new joint.shapes.basic.GPPortP({
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
					this.embedport.out[index] = new joint.shapes.basic.GPPortP({
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
	joint.shapes.devs.CabinetP = joint.shapes.devs.Model.extend({
		markup: '<g class="rotatable">' +
			'<g class="scalable">' +
			'</g>' +
			'<rect class="body parent-class"/>' +
			'<g class="title-class">' +
			'<rect class="title-class" />' +
			'<text class="labels title-class" />' +
			// '<text class="labels title-class2" />' +//ping
			'</g>' +
			'</g>',
		defaults: joint.util.deepSupplement({
			paper: null,
			childequipments: null,
			type: 'devs.Cabinet',
			// dbMenu: function(cellView) {//此处为双击跳转，可以不添加
			// 	console.log(cellView);
			// 	$('.infosig-group').find('button').removeClass('disabled');
			// 	window.location.href = '#hardwire/' + cellView.model.id;
			// },
			rightMenu: {
				centerMenu: {
					name: '编辑',
					fc: function(cellView) {
						console.log(cellView);
						var ViewModel = cellView.model;
						ROOF.common.loadModalContent(ROOF.hardconnection.renameBoxModal());
						ROOF.hardconnection.loadRenameBoxData(ViewModel.id, ViewModel.attributes.devDatas.PanelName);
						ROOF.hardconnection.initRenameBoxHanlder();
						$('#eidtboxSavtbtn', ROOF.document).on('click', function() {
							ViewModel.attributes.attrs.text.text = $('#renameboxName', ROOF.document).val();
							cellView.update();

						});

					}
				},
				otherMenu: [{
					name: '移动至',
					fc: function(cellView) {
						console.log(cellView);
						//右单击平柜移动到小室
						var ViewModel = cellView.model;
						var treeNote = ROOF.svgPortHardwireNote.getNodeByParam('guid', ViewModel.attributes.devDatas.PanelGuid);
						if (treeNote !== null) {
							ROOF.common.loadModalContent(ROOF.hardconnection.moveBoxModal());
							$('#moveBoxHomeSel', ROOF.document).val(treeNote.Parent);
							ROOF.hardconnection.loadMoveBoxData(treeNote);
							ROOF.hardconnection.initMoveBoxHanlder(treeNote);
						}
						console.log(treeNote);
					}
				}, {
					name: '组屏',
					fc: function(cellView) {
						console.log('屏内装置' + cellView);
						//$('.main-modal').modal();
						console.log(cellView.model);
						ROOF.common.loadModalContent(ROOF.hardconnection.mergeBox());
						ROOF.hardconnection.loadmergeBox(cellView.model.id);
						ROOF.hardconnection.initmergeBoxHanlder();
					}
				},{
					name:'组揽',
					fc:function(cellView){
						console.log('组揽');
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
					fill: '#E2EFD9',
					stroke: '#E2EFD9',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 393,
					height: 515

				},
				'.body': {
					fill: '#E2EFD9',
					stroke: '#E2EFD9',
					'stroke-width': '0',
					x: 0,
					y: 0,
					width: 483,
					height: 250

				},
				'g.title-class': {
					x: 0,
					y: 0,
					transform: 'translate(0,0)'

				},
				'rect.title-class': {
					fill: '#A8D08D',
					stroke: '#A8D08D',
					width: 483,
					height: 32

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
				this.childEquipments(this.attributes.childequipments.devices, this.attributes.childequipments.GPorts, this.attributes.childequipments.devicesWithGP);
			}
			// if (this.attributes.devicesNolink !== undefined) {
			// 	console.log('0000011');
			// 	this.childEquipments(this.attributes.devicesNolink.noLinkDevices);
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
		childEquipments: function(data, GPorts, devicesWithGP) {
			var $this = this;
			var dataGuid = [];
			for (var m = 0; m < data.length; m++) {
				dataGuid.push(data[m].Guid);
			}
			console.log(data, 'data', GPorts, devicesWithGP);
			if ($this.chidpositons === undefined) { //此处是获取当前最外层svg的坐标，供下面里层的svg准备
				$this.chidpositons = {
					x: $this.attributes.position.x,
					y: $this.attributes.position.y,
					parentWidth: 90
				};
			}
			var getHeight = {
				x: 4000,
				y: 3950
			};
			var ChildArray = [];
			var ChildWithGpArray = [];
			var GPortArray = [];
			window.getAllGPGuid = [];
			var fdo;
			var fdo2;
			var inprt, ouprt, dsname, idvs, portsname;
			for (var j = 0; j < data.length; j++) { //main_panel内的无光配devices
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
				}
				var getTitlePosi = (data.length - 1) * 10;
				ChildArray[j] = new joint.shapes.devs.AtomicRPP({
					id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
					size: { //此处定义的是内部svg的size
						width: 232,
						height: 0
					},
					position: { //根据上文准备的外部svg的位置定义内部svg的位置
						x: $this.chidpositons.x + 200,
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
							fill: '#CBFFFF',
							stroke: '#CBFFFF',
							x: 0,
							y: 0,
							width: 232,
							height: 0
						},
						'.htIconOut': {
							x: 90,
							y: getTitlePosi
						},
						'.labels': {
							text: '',
							fill: '#41719C',
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
				ChildArray[j].addTo(window.tbgraph);
				fdo = viewE(ChildArray[j].findView(window.tbpaper).$el[0]).bbox(true); //以下7行是定义外部svg的高根据内部svg的个数自适应
				$this.chidpositons.parentWidth += fdo.height + 60;
				$this.chidpositons.y += fdo.height + 50;
				ChildArray[j].remove();
				this.embed(ChildArray[j]);
				this.attributes.size.height = $this.chidpositons.parentWidth + 80; //屏柜的height
				this.attributes.attrs['.body'].height = $this.chidpositons.parentWidth + 80; //屏柜的height
			}
			if (data.length === 1) {
				this.attributes.size.height -= 20;
			}
			this.runder(ChildArray); //调用了上面的runder方法
			for (var i = 0; i < GPorts.length; i++) { //main_panel内光配组
				GPortArray[i] = new joint.shapes.devs.AtomicRP({
					id: GPorts[i].Guid,
					size: {
						width: 50,
						height: 100
					},
					position: {
						x: getHeight.x + 20,
						y: getHeight.y + data.length * 107 + 88
					},
					z: window.assemblyz += 1,
					outPorts: GPorts[i].ports,
					attrs: {
						text: {
							text: GPorts[i].portPanelName
						},
						'rect.parent-class': {
							height: GPorts[i].ports.length * 50
						},
						'.body': {
							height: GPorts[i].ports.length * 50
						}
					}
				});
				GPortArray[i].addTo(window.tbgraph);
				fdo2 = viewE(GPortArray[i].findView(window.tbpaper).$el[0]).bbox(true);
				$this.chidpositons.parentWidth += fdo2.height + 60;
				getHeight.y += fdo2.height + 0;
				this.attributes.size.height += (GPorts[i].ports.length) * 40;
				this.attributes.attrs['.body'].height += (GPorts[i].ports.length) * 40;
				GPortArray[i].remove();
				this.embed(GPortArray[i]);
				$.each(GPorts[i].ports, function(index, ite) {
					getAllGPGuid.push({
						Guid: ite.Guid,
						toPortIdMain: ite.toPortIdMain,
						toPortIdOther: ite.toPortIdOther
					});
				})
			}
			this.runder(GPortArray);
			console.log(getAllGPGuid, 'A_11');
			$.each(getAllGPGuid, function(ind, ite2) { //main_panel内的有光配devices
				var that = this;
				for (var j = 0; j < devicesWithGP.length; j++) {
					// inprt = data[j].port.leftPort !== null ? data[j].port.leftPort : [];
					ouprt = devicesWithGP[j].port.rightPort
					dsname = devicesWithGP[j].devicesInfo.ProdevName;
					portsname = devicesWithGP[j].devicesInfo.Type;
					idvs = devicesWithGP[j].devicesInfo.Guid;
					if (ite2.toPortIdMain === devicesWithGP[j].devicesInfo.ports[0].Guid) {
						let getY = window.ppp.findViewByModel(ite2.Guid).model.attributes.position.y;
						let getX = window.ppp.findViewByModel(ite2.Guid).model.attributes.position.x;
						ChildWithGpArray[j] = new joint.shapes.devs.AtomicRPP({
							id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
							size: { //此处定义的是内部svg的size
								width: 232,
								height: 0
							},
							position: { //根据上文准备的外部svg的位置定义内部svg的位置
								x: $this.chidpositons.x + 200,
								y: getY - 7
							},
							z: window.assemblyz += 1, //暂时不知道什么用，删除后无碍
							// inPorts: inprt, //以下这一堆是配置数据，通过model.attribute可以获取
							outPorts: ouprt,
							devDatas: devicesWithGP[j],
							// paper: that.attributes.paper,
							panelData: $this.attributes.devDatas,
							dsname: dsname,
							portsname: portsname,
							attrs: { //暂时无需改动
								rect: {
									fill: '#CBFFFF',
									stroke: '#CBFFFF',
									x: 0,
									y: 0,
									width: 232,
									height: 0
								},
								'.htIconOut': {
									x: 90,
									y: 0
								},
								'.labels': {
									text: '',
									fill: '#41719C',
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
						ChildWithGpArray[j].addTo(window.tbgraph);
						var fdooo = viewE(ChildWithGpArray[j].findView(window.tbpaper).$el[0]).bbox(true); //以下7行是定义外部svg的高根据内部svg的个数自适应
						ChildWithGpArray[j].remove();
					}
				}
			});
			this.runder(ChildWithGpArray);
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
				this.embedport.in[index] = new joint.shapes.basic.GPPortP({
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
					this.embedport.out[index] = new joint.shapes.basic.GPPortP({
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
	joint.shapes.devs.CabinetViewP = joint.shapes.devs.ModelView;
})(window.jQuery, window.joint, window._, window.V, window.parent.window, window.GFC, window.bootbox);