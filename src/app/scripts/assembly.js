'use strict';
(function($, joint, _, ROOF, viewE, GFC) {
	if (ROOF === undefined) {
		ROOF = window;
	}
	window.assembly = [{
		data: null,
		otherpanel: [],
		show: function(paper, panelId) {
			window.assemblyz = 0;
			window.assemblyZlink = [];
			var $this = this;
			var getPanelConnFiberMap = ROOF.physical.GetPanelConnFiberMap;
			var getSvgInfoCentralDevice = ROOF.physical.GetSvgInfoCentralDevice;
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
			var dddata = {
				LineConnect: [{
					LinkConnectId: "LG_11", //整条光缆的信息
					Guid: '456', //此条短线的id
					Port1: {
						LinkId: "111", //所在线的id
						PortId: "l_111" //光缆圆圈的id
					},
					Port2: {
						LinkId: "112",
						PortId: "l_112"
					}
				}, {
					LinkConnectId: "LG_11", //整条光缆的信息
					Guid: '457', //此条短线的id
					Port1: {
						LinkId: "112", //所在线的id
						PortId: "l_112" //光缆圆圈的id
					},
					Port2: {
						LinkId: "113",
						PortId: "l_113"
					}

				}, {
					LinkConnectId: "LG_12", //整条光缆的信息
					Guid: '458', //此条短线的id
					Port1: {
						LinkId: "111", //所在线的id
						PortId: "l_121" //光缆圆圈的id
					},
					Port2: {
						LinkId: "112",
						PortId: "l_122"
					}
				}, {
					LinkConnectId: "LG_12", //整条光缆的信息
					Guid: '459', //此条短线的id
					Port1: {
						LinkId: "112", //所在线的id
						PortId: "l_122" //光缆圆圈的id
					},
					Port2: {
						LinkId: "113",
						PortId: "l_123"
					}

				}],
				Connection: [{ //端口连接线信息
					PhylinkId: "111", //端口连接线id
					Port1: {
						DeviceId: "1111",
						PortId: "111B",
						Type: "rx"
					},
					Port2: {
						DeviceId: "2111",
						PortId: "211",
						Type: "tx"
					},
					ProjectOpticalcableGuid: '6661' //暂时无用
				}, {
					PhylinkId: "112",
					Gport: [{
						Guid: 'gp_2',
						toPortId: '212'
					}],
					Port1: {
						DeviceId: "1111",
						PortId: "112B",
						Type: "tx"
					},
					Port2: {
						DeviceId: "2111",
						PortId: "212",
						Type: "rx"
					},
					ProjectOpticalcableGuid: '6662'
				}, {
					PhylinkId: "114",
					Gport: [{
						Guid: 'gp_3',
						toPortId: '113B'
					}, {
						Guid: 'gp_4',
						toPortId: '311'
					}],
					Port1: {
						DeviceId: "1111",
						PortId: "113B",
						Type: "tx"
					},
					Port2: {
						DeviceId: "3111",
						PortId: "311",
						Type: "rx"
					},
					ProjectOpticalcableGuid: '6664'
				}],
				main_device: { //主装置信息
					deviceGuid: "11",
					deviceName: "线路保护",
					ProdevShortname: "PL2201A",
					Gport: [{ //光配端子信息
						Guid: 'gp_1',
						toPortId: '111B' //光配对应的port的id
					}, {
						Guid: 'gp_3',
						toPortId: '113B'
					}, {
						Guid: 'gp_4',
						toPortId: '211'
					}, {
						Guid: 'gp_5',
						toPortId: '212'
					}, {
						Guid: 'gp_6',
						toPortId: '311'
					}],
					Lport: [ //光缆端子信息
						[{
							Guid: 'l_111', //自身的id
							LinkConnectId: "l_11", //所在光缆的id
							LinkId: "111", //所在线路的id
							Port1: "111B", //所在线路始发port1的id
							Port2: "211" //所在线路始发port2的id
						}, {
							Guid: 'l_112', //自身的id，根据其来连接线
							LinkConnectId: "l_11", //所在光缆的id
							LinkId: "112", //所在线路的id
							Port1: "112B", //所在线路始发port1的id
							Port2: "212" //所在线路始发port2的id
						}, {
							Guid: 'l_113', //自身的id，根据其来连接线
							LinkConnectId: "l_11", //所在光缆的id
							LinkId: "113", //所在线路的id
							Port1: "113B", //所在线路始发port1的id
							Port2: "311" //所在线路始发port2的id
						}],
						[{ //暂时屏蔽数据
							Guid: 'l_121', //自身的id，根据其来连接线
							LinkConnectId: "l_12", //所在光缆的id
							LinkId: "111", //所在线路的id
							Port1: "111B", //所在线路始发port1的id
							Port2: "211" //所在线路始发port2的id
						}, {
							Guid: 'l_122', //自身的id，根据其来连接线
							LinkConnectId: "l_12", //所在光缆的id
							LinkId: "112", //所在线路的id
							Port1: "112B", //所在线路始发port1的id
							Port2: "212" //所在线路始发port2的id
						}, {
							Guid: 'l_123', //自身的id，根据其来连接线
							LinkConnectId: "l_12", //所在光缆的id
							LinkId: "113", //所在线路的id
							Port1: "113B", //所在线路始发port1的id
							Port2: "311" //所在线路始发port2的id
						}]
					],
					ports: [ //主装置内部端口信息
						[{
							Guid: "11B",
							ProdevName: "B01",
							Type: "Card", //板卡信息
							// GGPort:
						}, {
							Guid: "111B",
							ProdevName: "B01-01 LC",
							Type: "RX"
						}, {
							Guid: "112B",
							ProdevName: "B01-02 LC",
							Type: "TX"
						}, {
							Guid: "113B",
							ProdevName: "B01-03 LC",
							Type: "RX"
						}, {
							Guid: "114B",
							ProdevName: "B01-04 LC",
							Type: "TX"
						}],
						[{
							Guid: "12B",
							ProdevName: "B02",
							Type: "Card"
						}, {
							Guid: "121B",
							ProdevName: "B02-012 LC",
							Type: "TX"
						}, {
							Guid: "122B",
							ProdevName: "B02-012 LC",
							Type: "RX"
						}]
					]
				},
				other_device: [{ //其他装置信息
					Gport: [{ //此处返回跟main_pannel一样的Gport即可
						Guid: 'gp_1',
						toPortId: '111B'
					}, {
						Guid: 'gp_3',
						toPortId: '113B'
					}, {
						Guid: 'gp_4',
						toPortId: '211'
					}, {
						Guid: 'gp_5',
						toPortId: '212'
					}, {
						Guid: 'gp_6',
						toPortId: '311'
					}],
					derection: 'left', //其他装置位于主装置左侧left，右侧right
					deiviceGuid: "21",
					deviceName: "智能终端",
					ProdevShortname: "ML2201A",
					ports: [{
						Guid: "211",
						ProdevName: "B01-11 LC",
						Type: "TX"
					}, {
						Guid: "212",
						ProdevName: "B01-12 LC",
						Type: "RX"
					}]
				}, {
					Gport: [{ //此处返回跟main_pannel一样的Gport即可
						Guid: 'gp_1',
						toPortId: '111B'
					}, {
						Guid: 'gp_3',
						toPortId: '113B'
					}, {
						Guid: 'gp_4',
						toPortId: '211'
					}, {
						Guid: 'gp_5',
						toPortId: '212'
					}, {
						Guid: 'gp_6',
						toPortId: '311'
					}],
					derection: 'left',
					deiviceGuid: "31",
					deviceName: "合并单元",
					ProdevShortname: "IL2201A",
					ports: [{
						Guid: "311",
						ProdevName: "B01-13 LC",
						Type: "RX"
					}]
				}]
			};
			var newData;
			getSvgInfoCentralDevice("8b3b9125-21fb-49ea-972f-7a5233bfbfed", function(obj) {
				if (obj.status) {
					var data = $.parseJSON(obj.json_info);
					console.log(panelId, obj, data, '---------------');
					newData = data;
				}
			})
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
						other_device: [],
						LineConnect: []
					};
					var data = $.parseJSON(obj.json_info);
					data.main = dddata;
					console.log(data);
					var haveLinkDevice = [];
					data.main_panel.isZ = 1;
					$.each(data.main.Connection, function(index, item) { //硬接线数据处理
						// mainPanel.rightLink.push(item);
						if (item.Port1.DeviceId === undefined) {
							if (item.Port1.NetswitchId) {
								item.Port1.DeviceId = item.Port1.NetswitchId;
								item.Port1.NetswitchId = undefined;
							}
						}
						if (item.Port2.DeviceId === undefined) {
							if (item.Port2.NetswitchId) {
								item.Port2.DeviceId = item.Port2.NetswitchId;
								item.Port2.NetswitchId = undefined;
							}

						}
						if (item.Port1.DeviceId === item.Port2.DeviceId) {
							if (item.Port1.DeviceId === undefined || item.Port2.DeviceId === undefined) {
								if (item.Port1.NetswitchId !== undefined || item.Port2.NetswitchId !== undefined) {
									mainPanel.leftLink.push(item);
								} else {
									mainPanel.rightLink.push(item);
								}
							} else {
								mainPanel.leftLink.push(item);
							}
						} else {
							mainPanel.rightLink.push(item);
						}
					});
					$.each(newData.main_device.Bcslot, function(index, item) { //硬接线端口数据处理
						$.each(item.DevPort, function(index2, item2) {
							var shebei = {
								devicesInfo: {},
								port: {
									leftPort: [],
									rightPort: [],
									noLinkPort: []
								}
							};
							shebei.devicesInfo = item2;
							for (var fcopy in item2) {
								shebei.devicesInfo[fcopy] = item2[fcopy];
							}


						});
						mainPanel.noLinkDevices.push(item);
					});
					var other_devices = [];
					for (var k = 0; k < newData.other_device.length; k++) {
						if (newData.other_device[k].DevPort !== null || newData.other_device[k].DevPort !== undefined) {
							if (newData.other_device[k].DevPort.length > 1) {
								for (var j = 0; j < newData.other_device[k].DevPort.length; j++) {
									other_devices.push({
										"DevPort":[newData.other_device[k].DevPort[j]],
										"Guid": newData.other_device[k].Guid,
										"Name": newData.other_device[k].Name,
										"PanelId": newData.other_device[k].PanelId,
										"ShortName":newData.other_device[k].ShortName
									});
								}
							} else {
								other_devices.push(newData.other_device[k]);
							}
						}
					}
					window.zjlinkDate = [];
					mainPanel.other_device = other_devices;
					mainPanel.GPorts = data.main.main_device.Gport;
					mainPanel.LPorts = data.main.main_device.Lport;
					mainPanel.LineConnect = newData.PhyLink;
					console.log(mainPanel, 'mainpanel');
					$this.creatModel(newData, mainPanel, paper);
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
			var leftCabiner = new joint.shapes.devs.Cabinet({
				z: window.assemblyz += 1,
				id: data.main_device.deviceGuid,
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
				devDatas: data.main_device,
				childequipments: finddata.devices,
				// devicesNolink: finddata.noLinkDevices,
				devicesNolink: finddata,
				paper: paper,
				mainpanel: true,
				attrs: {
					'text.title-class': {
						text: data.main_device.Name
					},
					'text.title-class2': {
						text: data.main_device.ShortName
					}
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
				let OtherX = 590 + 4000 + 150;
				let WidthG = 393;
				let OtherHeight = 200;
				let OtherY = 4110;
				if (finddata.other_device !== null) { //的other_device
					var getPortId = [];
					for (var i = 0; i < data.PhyLink.length; i++) { //依据连接的端口来定位other-device的位置
						getPortId.push({
							"Port1": data.PhyLink[i].Port1.PortId,
							"Port2": data.PhyLink[i].Port2.PortId
						});
					}
					for (var i = 0; i < finddata.other_device.length; i++) {
						if (finddata.other_device[i].DevPort.length === 0) {
							continue;
						}
						let getids;
						if (getPortId.length > 0) {
							for (var h = 0; h < getPortId.length; h++) {
								if (finddata.other_device[i].DevPort[0].Guid === getPortId[h].Port1) {
									getids = getPortId[h].Port2;
								} else if (finddata.other_device[i].DevPort[0].Guid === getPortId[h].Port2) {
									getids = getPortId[h].Port1;
								}
							}
						}
						let getY = window.ppp.findViewByModel(getids).model.attributes.position.y;
						// console.log(getPortId, getids, getY, 'portid');
						let portsLen = finddata.other_device[i].DevPort.length;
						let titlePosition = (portsLen - 1) * 20;
						let ot = new joint.shapes.devs.CabinetT({
							z: window.assemblyz += 1,
							// id: data.other_device[i].Guid,//将含有多个端口的device分成多个相同id的device，故此处暂时屏蔽让系统自动分配id，后续需要也可以自己生成id赋值
							devID: finddata.other_device[i].Guid, //装置id
							portRemove: 1,
							position: {
								x: OtherX,
								y: getY
							},
							size: {
								width: WidthG,
								height: OtherHeight
							},
							inPorts: [],
							outPorts: [],
							devDatas: finddata.other_device[i],
							childequipments: finddata.other_device[i].DevPort,
							paper: paper,
							mainpanel: false,
							attrs: {
								'text.title-class': {
									text: finddata.other_device[i].Name
								},
								'g.title-class': {
									x: 0,
									y: 0,
									transform: 'translate(45,' + titlePosition + ')'
								},
							}
						});
						$(".icdContain").text("PL2201A智能终端");
						OtherHeight = ot.findView(paper.paper).$el[0];
						OtherY += viewE(OtherHeight).bbox(true).height + 10; //两个other_panel之间的纵向间距
					}
				}
				$.each(window.nowAssemblylink, function(index, item) {
					window.paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'right', item); //此处为画出连接线
				});
				window.paper.conNect2();
				// if (data.main.other_device.length !== 0) { //暂时暂时other_device的光配
				// 	var portGuid = [];
				// 	$.each(data.main.other_device, function(index, item) {
				// 		$.each(item.ports, function(index2, item2) {
				// 			portGuid.push({
				// 				'derection': item.derection,
				// 				'Guid': item2.Guid
				// 			});
				// 		});
				// 	});
				// 	$.each(portGuid, function(index, item) { //other_device的光配
				// 		$.each(data.main.other_device[0].Gport, function(index2, item2) {
				// 			if (item2.toPortId === item.Guid) {
				// 				if (item.derection === 'left') {
				// 					let getX = window.ppp.findViewByModel(item.Guid).model.attributes.position.x - 50;
				// 					let getY = window.ppp.findViewByModel(item.Guid).model.attributes.position.y + 7;
				// 					let getGport = new joint.shapes.basic.GPPort({
				// 						portRemove: 1,
				// 						id: item2.Guid,
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
				let directionGport = false;

			}; //初始化图像
			// $.each(finddata.leftLink, function(index, item) {
			// 	paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'left', item);
			// });
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
			// $.each(finddata.LPorts, function(index, item) { //暂时暂时光缆的port点
			// 	$.each(item, function(index2, item2) {
			// 		var getX = window.ppp.findViewByModel(item2.Port1).model.attributes.position.x + 280 + (index - 1) * 45;
			// 		var getY = window.ppp.findViewByModel(item2.Port1).model.attributes.position.y + 7;
			// 		var LinePorts = new joint.shapes.basic.LPPort({
			// 			portRemove: 1,
			// 			id: item2.Guid,
			// 			// projectOpticalcableGuid: projectOpticalcableGuid,
			// 			position: {
			// 				x: getX,
			// 				y: getY
			// 			},
			// 			size: {
			// 				width: 10,
			// 				height: 10
			// 			},
			// 			attrs: {
			// 				text: {
			// 					text: item2.Guid,
			// 					'font-size': 9,
			// 					stroke: '',
			// 					fill: '#306796',
			// 					'ref-y': -10
			// 				},
			// 				rect: {
			// 					width: 13,
			// 					height: 13,
			// 					rx: 13,
			// 					ry: 13,
			// 					fill: 'white',
			// 					stroke: 'red',
			// 					'stroke-dasharray': '3,4'
			// 				}
			// 			}
			// 		});
			// 		LinePorts.addTo(window.paper.graph);
			// 	});
			// });
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