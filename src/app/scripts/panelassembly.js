'use strict';
(function($, joint, _, ROOF, viewE, GFC) {
  if (ROOF === undefined) {
    ROOF = window;
  }
  
  window.assemblys = [{
		data: null,
		otherpanel: [],
		show: function(paper, panelId) {
			window.assemblyz = 0;
			window.assemblyZlink = [];
			var $this = this;
			var getPanelConnFiberMap = window.physical.GetPanelConnFiberMap;
			let thbStr = `<div class="infosig-group btn-group">
                        <button type="button" class="btn btn-default btn-sm">全局信息流向</button>
                    </div>
                    <div id="thb" style="display: none;position: absolute; width:100%;height:100%;"></div>
                    <div id="cable-group" class="btn-group">
                        <button id="cable-line-status-btn" type="button" class="btn btn-primary btn-sm">组缆</button>
                        <button id="cable-line-status-cancel" type="button" class="btn btn-default btn-sm hide">取消</button>
                        <button id="cable-line-btn" type="button" class="btn btn-success btn-sm hide">组缆</button>
                    </div>`;
			$('#cable-group').remove();
			$('.infosig-group').remove();
			$('#thb').remove();
			$('body').append(thbStr);
			$('#thb').show();
			window.tbgraph = new joint.dia.Graph();
			window.tbpaper = new joint.dia.Paper({
				el: $('#thb'),
				width: 600,
				height: 400,
				gridSize: 10,
				model: window.tbgraph
			});
			var dddata = window.ddddata;
			getPanelConnFiberMap(panelId, function(obj) {
				window.aa = true;
				if (obj.status) {
					window.zlIsCtrl = false;
					window.zlispl = true;
					var mainPanel = {
						devices: [],
						noLinkDevices: [],
						leftLink: [],
						rightLink: [],
						GPorts: [],
						LineConnect: []
					};
					var data = $.parseJSON(obj.json_info);
					data.main = dddata;
					console.log(data);
					var haveLinkDevice = [];
					data.main_panel.isZ = 1;
					// $.each(data.main.Connection, function(index, item) {//ping
					// 	// mainPanel.rightLink.push(item);
					// 	if (item.Port1.DeviceId === undefined) {
					// 		if (item.Port1.NetswitchId) {
					// 			item.Port1.DeviceId = item.Port1.NetswitchId;
					// 			item.Port1.NetswitchId = undefined;
					// 		}
					// 	}
					// 	if (item.Port2.DeviceId === undefined) {
					// 		if (item.Port2.NetswitchId) {
					// 			item.Port2.DeviceId = item.Port2.NetswitchId;
					// 			item.Port2.NetswitchId = undefined;
					// 		}

					// 	}
					// 	if (item.Port1.DeviceId === item.Port2.DeviceId) {
					// 		if (item.Port1.DeviceId === undefined || item.Port2.DeviceId === undefined) {
					// 			if (item.Port1.NetswitchId !== undefined || item.Port2.NetswitchId !== undefined) {
					// 				mainPanel.leftLink.push(item);
					// 			} else {
					// 				mainPanel.rightLink.push(item);
					// 			}
					// 		} else {
					// 			mainPanel.leftLink.push(item);
					// 		}
					// 	} else {
					// 		mainPanel.rightLink.push(item);
					// 	}
					// });
					$.each(data.main.main_panel.devices, function(index, item) {
							var shebei = {
								devicesInfo: {},
								port: {
									leftPort: [],
									rightPort: [],
									noLinkPort: []
								}
							};
							shebei.devicesInfo = item;
							if (item.ports !== null){
								$.each(item.ports,function(indexpp,itemPort){//此处对port进行处理，暂时未添加处理逻辑
									var type = 0;
								    shebei.port.rightPort.push(itemPort);
								});
								// switch (type) {//ping
								// 	case 1:
								// 		{
								// 			shebei.port.leftPort.push(itemPort);
								// 			break;
								// 		}
								// 	case 2:
								// 		{
								// 			itemPort.isclick = 1;
								// 			shebei.port.rightPort.push(itemPort);
								// 			break;
								// 		}
								// 	default:
								// 		{
								// 			//shebei.port.noLinkPort.push(itemPort);
								// 			break;
								// 		}
								// }
							}
							for (var fcopy in item) {
								shebei.devicesInfo[fcopy] = item[fcopy];
							}
							
							// if ($.inArray(item2.Guid, haveLinkDevice) !== -1) {//ping
							// 	console.log('1111');
							// 	mainPanel.devices.push(shebei);
							// } else {
							// 	mainPanel.noLinkDevices.push(item2);
							// }
							mainPanel.devices.push(shebei);
					});
					// mainPanel.GPorts = data.main.main_device.Gport;//ping
					// mainPanel.LPorts = data.main.main_device.Lport;//ping
					// mainPanel.LineConnect = data.main.LineConnect;//ping
					console.log(mainPanel, 'mainpanel');
					$this.creatModel(data, mainPanel, paper);
				}
			});
		},
		'link-cabinet': [],
		creatModel: function(data, finddata, paper) {
			window.paper.graph.clear();
			window.paper.leftLinkVertices = 40;
			window.outherPanels = data;
			window.gszz = window.assemblyz;
			window.phySignalFlows = data.SignalFlows; //虚线的回路
			window.opticalCable = data.OpticalCable;
			window.nowAssemblylink = finddata.rightLink;
			$.each(finddata.noLinkDevices, function(nolindex, noldata) {
				noldata.ports = [];
			});
			var leftCabiner = new joint.shapes.devs.CabinetP({
				z: window.assemblyz += 1,
				id: data.main.main_panel.panelGuid,
				position: {
					x: 50 + 4000 - 100,
					y: 4000
				},
				size: {
					width: 393,
					height: 515
				},
				inPorts: [],
				outPorts: [],
				devDatas: data.main.main_panel,
				childequipments: finddata.devices,
				// devicesNolink: finddata.noLinkDevices,
				devicesNolink: finddata,
				paper: paper,
				mainpanel: true,
				attrs: {
					'text.title-class': {
						text: data.main.main_panel.panelName
					},
					// 'text.title-class2': {//ping
					// 	text: data.main.main_device.ProdevShortname
					// }
				}
			});
			GFC.noUseF(leftCabiner);
			window.globalAssembly = function() {
				window.assemblyZlink = [];
				window.assemblyz = window.gszz;
				let fmodels = window.paper.graph.getCells();

				$.each(fmodels, function(cellindex, celldata) {
					if (celldata === undefined) {
						return true;
					}
					if (celldata.attributes.portRemove !== undefined) {
						celldata.remove();
					}
				});
				$('#thb').show();
				let OtherX = 740 + 2500;
				let WidthG = 393;
				//let MainHeight = 515;
				let OtherHeight = 200;
				let OtherY = 4110;
				if (data.main.other_panel !== null) {
					for (var i = 0; i < data.main.other_panel.length; i++) {
						console.log('***********',data.main.other_panel[i].panelName)
						if (data.main.other_panel[i].length === 0) {
							continue;
						}
						let ot = new joint.shapes.devs.CabinetTP({
							z: window.assemblyz += 1,
							id: data.main.other_panel[i].panelGuid,
							portRemove: 1,
							position: {
								x: OtherX,
								y: OtherY
							},
							size: {
								width: WidthG,
								height: OtherHeight
							},
							inPorts: [],
							outPorts: [],
							devDatas: data.main.other_panel[i],
							childequipments: data.main.other_panel[i].devices,
							paper: paper,
							mainpanel: false,
							attrs: {
								'text.title-class': {
									text: data.main.other_panel[i].panelName
								},
								// 'text.title-class': {
								// 	text: "PL2201A智能终端"
								// },
								'g.title-class': {
									x: 0,
									y: 0,
									// transform: 'translate(45,'+titlePosition+')'
								}
							}
						});
						OtherHeight = ot.findView(paper.paper).$el[0];
						OtherY += viewE(OtherHeight).bbox(true).height + 10; //两个other_panel之间的纵向间距
					}
				}
				$.each(window.nowAssemblylink, function(index, item) {
					window.paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'right', item); //此处为画出连接线
				});
				// window.paper.conNect2();//ping
				// if (data.main.other_device.length !== 0) {//遍历添加other_device的光配点ping
				// 	var portGuid = [];
				// 	$.each(data.main.other_device, function(index, item) {
				// 		$.each(item.ports, function(index2, item2) {
				// 			portGuid.push({
				// 				'derection': item.derection,
				// 				'Guid': item2.Guid
				// 			});
				// 		});
				// 	});
				// 	$.each(portGuid, function(index, item) {
				// 		$.each(data.main.other_device[0].Gport, function(index2, item2) {
				// 			if (item2.toPortId === item.Guid) {
				// 				if (item.derection === 'left') {
				// 					let getX = window.ppp.findViewByModel(item.Guid).model.attributes.position.x - 50;
				// 					let getY = window.ppp.findViewByModel(item.Guid).model.attributes.position.y + 7;
				// 					let getGport = new joint.shapes.basic.GPPort({
				// 						portRemove: 1,
				// 						id: item2.Guid,
				// 						// projectOpticalcableGuid: projectOpticalcableGuid,
				// 						position: {
				// 							x: getX,
				// 							y: getY
				// 						},
				// 						size: {
				// 							width: 10,
				// 							height: 10
				// 						},
				// 						attrs: {
				// 							text: {
				// 								// text: `${gppdata.OdfboxName}-${gppdata.ProodfName}-${gppdata.ProportName}`,
				// 								text: item2.Guid,
				// 								'font-size': 9,
				// 								stroke: '',
				// 								fill: '#306796',
				// 								'ref-y': -10
				// 							},
				// 							rect: {
				// 								width: 13,
				// 								height: 13,
				// 								rx: 13,
				// 								ry: 13,
				// 								fill: '#306796'
				// 							}
				// 						}
				// 					});
				// 					getGport.addTo(window.paper.graph);
				// 				}
				// 			}
				// 		});
				// 	});
				// }
				$('#thb').hide();
				window.tbgraph.clear();
				window.assemblyZlink = [];
				
			}; 
			
			$('.infosig-group').find('button').off('click').on('click', function() {
				if ($(this).hasClass('disabled')) {
					return;
				}

				window.globalAssembly();
				$(this).addClass('disabled');
			});
			$('.infosig-group').show();
			$('.infosig-group').find('button').trigger('click');
			paper.resizePaperScroller();
			$.each(finddata.LPorts, function(index, item) { //光缆的port点
				$.each(item, function(index2, item2) {
					var getX = window.ppp.findViewByModel(item2.Port1).model.attributes.position.x + 280 + (index - 1) * 45;
					var getY = window.ppp.findViewByModel(item2.Port1).model.attributes.position.y + 7;
					var LinePorts = new joint.shapes.basic.LPPort({
						portRemove: 1,
						id: item2.Guid,
						// projectOpticalcableGuid: projectOpticalcableGuid,
						position: {
							x: getX,
							y: getY
						},
						size: {
							width: 10,
							height: 10
						},
						attrs: {
							text: {
								text: item2.Guid,
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
								fill: 'white',
								stroke: 'red',
								'stroke-dasharray': '3,4'
							}
						}
					});
					LinePorts.addTo(window.paper.graph);
				});
			});
			var getLinkConnectId = [];
			$.each(finddata.LineConnect, function(index, item) { //光缆port点的连接线
				var vie = 0;
				if (getLinkConnectId.indexOf(item.LinkConnectId) === -1) {
					getLinkConnectId.push(item.LinkConnectId);
					vie = 1;
					window.paper.LineConnect(item, vie);
				} else {
					window.paper.LineConnect(item, vie);
				}
			})
		}
	}];
  })(window.jQuery, window.joint, window._, window.parent.window, window.V, window.GFC);