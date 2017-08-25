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
				Connection: [{//端口连接线信息
					PhylinkId: "111",//端口连接线id
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
					ProjectOpticalcableGuid: '6661'//暂时无用
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
				main_device: {//主装置信息
					deviceGuid: "11",
					deviceName: "线路保护",
					ProdevShortname: "PL2201A",
					Gport: [{//光配端子信息
						Guid: 'gp_1',
						toPortId: '111B'//光配对应的port的id
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
					Lport: [//光缆端子信息
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
					ports: [//主装置内部端口信息
						[{
							Guid: "11B",
							ProdevName: "B01",
							Type: "Card",//板卡信息
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
				other_device: [{//其他装置信息
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
					derection: 'left',//其他装置位于主装置左侧left，右侧right
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
					data.Connection = _.uniq(data.Connection, function(unwd) {
						return unwd.PhylinkId;
					});
					$.each(data.main.Connection, function(index, item) {
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

						// if (item.Port1.PortId === undefined) {
						// 	haveLinkDevice.push(item.Port2.NetswitchId);
						// } else {
						// 	haveLinkDevice.push(item.Port1.PortId);
						// }
						// if (item.Port2.PortId === undefined) {
						// 	haveLinkDevice.push(item.Port2.NetswitchId);
						// } else {
						// 	haveLinkDevice.push(item.Port2.PortId);
						// }

					});
					$.each(data.main.main_device.ports, function(index, item) {
						$.each(item, function(index2, item2) {
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
							if (item2.ports !== null) {
								$.each(item.ports, function(indexpp, itemPort) {
									var type = 0;
									$.each(data.Connection, function(indexLink, itemLink) {
										if (itemLink.Port1.PanelId === itemLink.Port2.PanelId && itemLink.Port1.PanelId === data.main_panel.PanelGuid) {
											if (itemPort.Guid === itemLink.Port1.PortId || itemPort.Guid === itemLink.Port2.PortId) {
												if (itemLink.Port1.DeviceId === undefined || itemLink.Port2.DeviceId === undefined) {

													if (itemLink.Port1.NetswitchId !== undefined || itemLink.Port2.NetswitchId !== undefined) {
														type = 1;
														itemPort.zllink = itemLink;
														return false;
													}
													type = 2;
													itemPort.phylink = itemLink;
													return false;
												}
												type = 1;
												itemPort.zllink = itemLink;
												return false;
											}
										} else {
											if (itemPort.Guid === itemLink.Port1.PortId || itemPort.Guid === itemLink.Port2.PortId) {
												type = 2;
												itemPort.phylink = itemLink;
												return false;
											}
										}
									});

									switch (type) {
										case 1:
											{
												shebei.port.leftPort.push(itemPort);
												break;
											}
										case 2:
											{
												itemPort.isclick = 1;
												shebei.port.rightPort.push(itemPort);
												break;
											}
										default:
											{
												//shebei.port.noLinkPort.push(itemPort);
												break;
											}
									}

								});
							}
							if ($.inArray(item2.Guid, haveLinkDevice) !== -1) {
								console.log('1111');
								mainPanel.devices.push(shebei);
							} else {
								mainPanel.noLinkDevices.push(item2);
							}
						});
					});
					if (data.other_panel !== null) {
						$.each(data.other_panel, function(indexother, dataotherpanel) {
							if (dataotherpanel.devices === null) {
								dataotherpanel.devices = [];
								return true;
							}
							dataotherpanel.devices = _.filter(dataotherpanel.devices, function(numdev) {

								return (numdev.Guid !== '');
							});
							$.each(dataotherpanel.devices, function(indexdevices, datadevices) {
								let changeports = [];
								if (datadevices.ports === null) {
									return true;
								}
								$.each(datadevices.ports, function(indexports, dataports) {
									if (_.findWhere(data.Connection, {
											Port1: {
												PortId: dataports.Guid
											}
										}) !== undefined || _.findWhere(data.Connection, {
											Port2: {
												PortId: dataports.Guid
											}
										}) !== undefined) {
										if (_.findWhere(data.Connection, {
												Port1: {
													PortId: dataports.Guid
												}
											}) !== undefined) {
											dataports.phylink = _.findWhere(data.Connection, {
												Port1: {
													PortId: dataports.Guid
												}
											});
										}
										if (_.findWhere(data.Connection, {
												Port2: {
													PortId: dataports.Guid
												}
											}) !== undefined) {
											dataports.phylink = _.findWhere(data.Connection, {
												Port2: {
													PortId: dataports.Guid
												}
											});
										}
										changeports.push(dataports);
									}
								});
								datadevices.ports = changeports;
							});
						});
					}
					window.zjlinkDate = [];
					if (data.Connection !== null) {
						let oldlik = _.filter(data.Connection, function(ub) {
							return (ub.Port1.OdfId !== undefined || ub.Port2.OdfId !== undefined);
						});
						let oldlikOut = _.filter(oldlik, function(ubod) {
							return (ubod.Port1.PanelId !== ubod.Port2.PanelId);
						});
						let zjlikOut = _.filter(oldlikOut, function(ubzj) {
							let po1Zl = _.filter(oldlikOut, function(po1) {
								return (po1.Port1.PortId === ubzj.Port1.PortId || po1.Port2.PortId === ubzj.Port1.PortId);
							});
							let po2Zl = _.filter(oldlikOut, function(po2) {
								return (po2.Port1.PortId === ubzj.Port2.PortId || po2.Port2.PortId === ubzj.Port2.PortId);
							});
							let zlpo = [];
							if (po1Zl.length === 2) {
								zlpo = po1Zl;
							}
							if (po2Zl.length === 2) {
								zlpo = po2Zl;
							}
							return zlpo.length === 2;
						});
						// let nullDev = _.filter(data.other_panel, function(ubdev) {
						//   return ubdev.devices.length === 0;
						// });

						//转接点查找开始
						let outherZjPanel = [];
						let mainZjPanel = [];
						$.each(data.main_panel.ports, function(mainzjmindex, mainzjm) {
							let portnum = _.filter(zjlikOut, function(filterli) {
								return (filterli.Port1.PortId === mainzjm.Guid || filterli.Port2.PortId === mainzjm.Guid);
							});
							if (portnum.length === 2) {
								let mainzjd = mainzjm;
								mainzjd.linkArr = portnum;
								mainzjd.toPanel = [];
								$.each(mainzjd.linkArr, function(marrindex, marritem) {
									let aspanel = _.filter(data.other_panel, function(dpanel) {
										return (dpanel.PanelGuid === marritem.Port1.PanelId || dpanel.PanelGuid === marritem.Port2.PanelId);
									});
									$.each(aspanel, function() {
										mainzjd.toPanel.push(_.defaultsDeep({}, this));
									});

								});

								$.each(mainzjd.linkArr, function() {
									let selfb = this;
									let selpanelb = null;
									if (selfb.Port1.PortId === mainzjd.Guid) {
										selpanelb = selfb.Port2.PortId;
									} else {
										selpanelb = selfb.Port1.PortId;
									}
									$.each(mainzjd.toPanel, function() {

										let dpanela = this;
										if (dpanela.oneport) {
											return true;
										}
										if (_.findWhere(dpanela.ports, {
												Guid: selpanelb
											})) {
											dpanela.oneport = _.findWhere(dpanela.ports, {
												Guid: selpanelb
											});
											return true;
										}
										let devicesfilter = _.filter(dpanela.devices, function(gndi) {
											return (_.findWhere(gndi.ports, {
												Guid: selpanelb
											}) !== undefined);
										})[0];
										if (devicesfilter) {
											dpanela.oneport = _.findWhere(devicesfilter.ports, {
												Guid: selpanelb
											});
											return true;
										}
									});
								});
								$.each(mainzjd.toPanel, function() {
									let oupanel = this;
									$.each(data.other_panel, function() {
										this.ports = _.filter(this.ports, function(nfst) {
											return nfst.Guid !== oupanel.oneport.Guid;
										});
										$.each(this.devices, function() {
											this.ports = _.filter(this.ports, function(nfstg) {
												let bgs = 0;
												if (nfstg.phylink.Port1.PortId !== oupanel.oneport.Guid && nfstg.phylink.Port2.PortId !== oupanel.oneport.Guid) {
													bgs = 1;
												}
												return nfstg.Guid !== oupanel.oneport.Guid && bgs === 1;
											});
										});
									});
								});
								mainZjPanel.push(_.defaultsDeep({}, mainzjd));
								return true;
							}
						});
						//主屏转接点查找结束
						$.each(zjlikOut, function(indexzjm, itemzjm) {

							if (itemzjm.Port1.PanelId === data.main_panel.PanelGuid) {
								if (_.findWhere(mainZjPanel, {
										Guid: itemzjm.Port1.PortId
									})) {
									return true;
								}
								if (_.findWhere(data.other_panel, {
										PanelGuid: itemzjm.Port2.PanelId
									}) !== undefined) {

									let cacheZp = null;
									cacheZp = _.findWhere(data.other_panel, {
										PanelGuid: itemzjm.Port2.PanelId
									});
									cacheZp.portZjId = itemzjm.Port2.PortId;
									cacheZp.portZj = _.findWhere(cacheZp.ports, {
										Guid: cacheZp.portZjId
									});
									if (cacheZp.portZj === undefined) {

										return true;
									}
									cacheZp.mainPortId = itemzjm.Port1.PortId;
									itemzjm.iszl = 1;
									cacheZp.mainlink = itemzjm;
									outherZjPanel.push(_.defaultsDeep({}, cacheZp));
									return true;
								}
							}
							if (itemzjm.Port2.PanelId === data.main_panel.PanelGuid) {
								if (_.findWhere(mainZjPanel, {
										Guid: itemzjm.Port2.PortId
									})) {
									return true;
								}
								if (_.findWhere(data.other_panel, {
										PanelGuid: itemzjm.Port1.PanelId
									}) !== undefined) {

									let cacheZp = _.findWhere(data.other_panel, {
										PanelGuid: itemzjm.Port1.PanelId
									});
									cacheZp.portZjId = itemzjm.Port1.PortId;
									cacheZp.portZj = _.findWhere(cacheZp.ports, {
										Guid: cacheZp.portZjId
									});
									if (cacheZp.portZj === undefined) {

										return true;
									}
									cacheZp.mainPortId = itemzjm.Port2.PortId;
									cacheZp.mainlink = itemzjm;
									outherZjPanel.push(_.defaultsDeep({}, cacheZp));
									return true;
								}
							}
						});
						$.each(outherZjPanel, function(zlindexn, zlitemn) {
							$.each(zjlikOut, function(indexfl, itemfl) {
								if (itemfl.Port1.PanelId !== data.main_panel.PanelGuid && itemfl.Port2.PanelId !== data.main_panel.PanelGuid) {
									if (itemfl.Port1.PortId === zlitemn.portZjId && itemfl.Port2.PanelId !== zlitemn.PanelGuid) {
										zlitemn.outherPortId = itemfl.Port2.PortId;
										zlitemn.ohterlink = itemfl;
										return true;
									}
									if (itemfl.Port2.PortId === zlitemn.portZjId && itemfl.Port1.PanelId !== zlitemn.PanelGuid) {
										zlitemn.outherPortId = itemfl.Port1.PortId;
										zlitemn.ohterlink = itemfl;
										return true;
									}
								}

							});
						}); //中心转接点查找结束
						// console.log(zjlikOut);
						// console.log(outherZjPanel);
						window.zjdlikOut = zjlikOut;
						window.zjdOuther = outherZjPanel;
						window.zjdMain = mainZjPanel;
					}
					mainPanel.GPorts = data.main.main_device.Gport;
					mainPanel.LPorts = data.main.main_device.Lport;
					mainPanel.LineConnect = data.main.LineConnect;
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
			var leftCabiner = new joint.shapes.devs.Cabinet({
				z: window.assemblyz += 1,
				id: data.main.main_device.deviceGuid,
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
				devDatas: data.main.main_device,
				childequipments: finddata.devices,
				// devicesNolink: finddata.noLinkDevices,
				devicesNolink: finddata,
				paper: paper,
				mainpanel: true,
				attrs: {
					'text.title-class': {
						text: data.main.main_device.deviceName
					},
					'text.title-class2': {
						text: data.main.main_device.ProdevShortname
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
				//let MainHeight = 515;
				let OtherHeight = 200;
				let OtherY = 4110;
				// $.each(window.nowAssemblylink, function(index, item) {
				// 	window.paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'right', item);//此处为画出连接线
				// });
				$.each(data.main.other_device, function() {
					let arsgj = 0;
					// $.each(this.devices, function() {//暂时屏蔽
					// 	let selfodev = this;
					// 	if (this.ports === null || this.ports.length === 0) {
					// 		if (data.SignalFlows !== null) {
					// 			let filtersig = _.filter(data.SignalFlows, function(gjfl) {
					// 				return (gjfl.ProjectReceivedev === selfodev.Guid || gjfl.ProjectSenddev === selfodev.Guid);
					// 			});
					// 			if (filtersig.length === 0) {
					// 				arsgj = 1;
					// 				return false;
					// 			} else {
					// 				return true;
					// 			}
					// 		} else {
					// 			arsgj = 1;
					// 			return false;
					// 		}
					// 	}
					// });
					if (arsgj === 1) {
						this.devices = [];
					}
				});

				if (data.main.other_device !== null) {
					for (var i = 0; i < data.main.other_device.length; i++) {
						if (data.main.other_device[i].ports.length === 0) {
							continue;
						}
						let portsLen = data.main.other_device[i].ports.length;
						let titlePosition = (portsLen-1)*20;
						let ot = new joint.shapes.devs.CabinetT({
							z: window.assemblyz += 1,
							id: data.main.other_device[i].deviceGuid,
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
							devDatas: data.main.other_device[i],
							childequipments: data.main.other_device[i].ports,
							paper: paper,
							mainpanel: false,
							attrs: {
								// 'text.title-class': {
								// 	text: data.main.other_panel[i].PanelName
								// }
								'text.title-class': {
									text: "PL2201A智能终端"
								},
								'g.title-class': {
									x: 0,
									y: 0,
									transform: 'translate(45,'+titlePosition+')'
								},
							}
						});
						$(".icdContain").text("PL2201A智能终端");
						OtherHeight = ot.findView(paper.paper).$el[0];
						OtherY += viewE(OtherHeight).bbox(true).height + 10; //两个other_panel之间的纵向间距
					}
				}
				$.each(window.nowAssemblylink, function(index, item) {
					// console.log(window.nowAssemblylink, 'window.nowAssemblylink');
					window.paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'right', item); //此处为画出连接线
				});
				window.paper.conNect2();
				if (data.main.other_device.length !== 0) {
					var portGuid = [];
					$.each(data.main.other_device, function(index, item) {
						$.each(item.ports, function(index2, item2) {
							portGuid.push({
								'derection': item.derection,
								'Guid': item2.Guid
							});
						});
					});
					$.each(portGuid, function(index, item) {
						$.each(data.main.other_device[0].Gport, function(index2, item2) {
							if (item2.toPortId === item.Guid) {
								if (item.derection === 'left') {
									let getX = window.ppp.findViewByModel(item.Guid).model.attributes.position.x - 50;
									let getY = window.ppp.findViewByModel(item.Guid).model.attributes.position.y + 7;
									let getGport = new joint.shapes.basic.GPPort({
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
												// text: `${gppdata.OdfboxName}-${gppdata.ProodfName}-${gppdata.ProportName}`,
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
												fill: '#306796'
											}
										}
									});
									getGport.addTo(window.paper.graph);
								}
							}
						});
					});
				}
				$('#thb').hide();
				window.tbgraph.clear();
				window.assemblyZlink = [];
				if (window.zjdMain.length !== 0) {
					let po1Position = leftCabiner.attributes.position;
					let gpp = new joint.shapes.basic.GPPort({
						id: 'zjgpd',
						position: {
							x: po1Position.x + 360,
							y: po1Position.y + 50
						},
						size: {
							width: 10,
							height: 10
						},
						devDatas: window.zjdMain,
						rightMenu: null,
						showTopanel: function(cellView) {
							$('.main-modal-body').html('');
							$('.modal-title').text('转接信息');
							let zjdtpl = '';
							$.each(cellView.model.attributes.devDatas, function() {
								zjdtpl += `<div class="col-xs-4 text-ovf-h-d lh24" title="${this.toPanel[0].PanelName}-${this.toPanel[0].oneport.OdfboxName ? this.toPanel[0].oneport.OdfboxName : this.toPanel[0].oneport.ProbsName}-${this.toPanel[0].oneport.OdfboxName ? this.toPanel[0].oneport.ProodfName : this.toPanel[0].oneport.ProportName}-${this.toPanel[0].oneport.OdfboxName ? this.toPanel[0].oneport.ProportName : this.toPanel[0].oneport.ProportFunctiontype}" data-id="${this.Guid}">${this.toPanel[0].PanelName}-${this.toPanel[0].oneport.OdfboxName ? this.toPanel[0].oneport.OdfboxName : this.toPanel[0].oneport.ProbsName}-${this.toPanel[0].oneport.OdfboxName ? this.toPanel[0].oneport.ProodfName : this.toPanel[0].oneport.ProportName}-${this.toPanel[0].oneport.OdfboxName ? this.toPanel[0].oneport.ProportName : this.toPanel[0].oneport.ProportFunctiontype}</div>
                           <div class="col-xs-4 text-ovf-h-d lh24" title="${this.OdfboxName}-${this.ProodfName}-${this.ProportName}" data-id="${this.Guid}">${this.OdfboxName}-${this.ProodfName}-${this.ProportName}</div>
                           <div class="col-xs-4 text-ovf-h-d lh24" title="${this.toPanel[1].PanelName}-${this.toPanel[1].oneport.OdfboxName ? this.toPanel[1].oneport.OdfboxName : this.toPanel[1].oneport.ProbsName}-${this.toPanel[1].oneport.OdfboxName ? this.toPanel[1].oneport.ProodfName : this.toPanel[1].oneport.ProportName}-${this.toPanel[1].oneport.OdfboxName ? this.toPanel[1].oneport.ProportName : this.toPanel[1].oneport.ProportFunctiontype}" data-id="${this.Guid}">${this.toPanel[1].PanelName}-${this.toPanel[1].oneport.OdfboxName ? this.toPanel[1].oneport.OdfboxName : this.toPanel[1].oneport.ProbsName}-${this.toPanel[1].oneport.OdfboxName ? this.toPanel[1].oneport.ProodfName : this.toPanel[1].oneport.ProportName}-${this.toPanel[1].oneport.OdfboxName ? this.toPanel[1].oneport.ProportName : this.toPanel[1].oneport.ProportFunctiontype}</div>`;
							});
							let slotll = `<div class="row text-center fz12">
                            <div class="col-xs-4">转接装置</div>
                            <div class="col-xs-4">转接点</div>
                            <div class="col-xs-4">转接装置</div>
                            <br>
                                        ${zjdtpl}
                                        </div>`;
							$('.main-modal-body').html(slotll);
							$('.main-modal').off('shown.bs.modal').on('shown.bs.modal', function() {
								$(this).find('.modal-footer').addClass('hide');
							}).off('hidden.bs.modal').on('hidden.bs.modal', function() {
								$(this).find('.modal-footer').removeClass('hide');
							}).modal();

						},
						attrs: {
							text: {
								text: `转接点`,
								'font-size': 9,
								stroke: '',
								fill: '#F44336',
								'ref-y': -12,
								'ref-x': .5
							},
							rect: {
								width: 13,
								height: 13,
								rx: 13,
								ry: 13,
								fill: '#F44336'
							}
						}
					});
					gpp.addTo(window.paper.graph);
				}
				let directionGport = false;
				$.each(window.zjdOuther, function(indexzjd, itemzjd) {
					console.log(itemzjd, 'itemzjd');
					let port1Dev = window.paper.graph.getCell(itemzjd.mainPortId);
					let port2Dev = window.paper.graph.getCell(itemzjd.outherPortId);
					console.log(window.zjdOuther, port1Dev.attributes.type, port2Dev.attributes.type);
					let po1Position = port1Dev.attributes.position;
					let po2Position = port2Dev.attributes.position;
					let mathy;
					if (po1Position.y > po2Position.y) {
						mathy = po1Position.y - po2Position.y;
					} else {
						mathy = po2Position.y - po1Position.y;
					}
					if (po1Position.y === po2Position.y || (mathy < 38 && port1Dev.attributes.type !== port2Dev.attributes.type)) {
						let gppy;
						if (mathy < 38 && mathy !== 0) {
							if (po1Position.y > po2Position.y) {
								gppy = po2Position.y;
							} else {
								gppy = po1Position.y;
							}
						} else {
							gppy = po1Position.y;
						}
						if (mathy < 48 && (port1Dev.attributes.type === 'basic.RectPort' && port2Dev.attributes.type === 'basic.RectPort')) {
							gppy += 35
						}
						if (port2Dev.attributes.type === 'basic.GPPort') {
							var pp = 1;
						}
						let gpp = new joint.shapes.basic.GPPort({
							portRemove: 1,
							pppre: 1,
							id: itemzjd.portZjId,
							position: {
								x: 515 + 4000,
								y: gppy
							},
							size: {
								width: 10,
								height: 10
							},
							devDatas: itemzjd.portZj,
							attrs: {
								text: {
									text: `${itemzjd.PanelName}-${itemzjd.portZj.OdfboxName}-${itemzjd.portZj.ProodfName}-${itemzjd.portZj.ProportName}`,
									'font-size': 9,
									stroke: '',
									fill: '#f00',
									'ref-y': -8,
									'ref-x': .5
								},
								rect: {
									width: 13,
									height: 13,
									rx: 13,
									ry: 13,
									fill: '#f00'
								}
							}
						});
						gpp.addTo(window.paper.graph);
						itemzjd.mainlink.iszl = 1;
						itemzjd.ohterlink.iszl = 1;
						window.paper.conNect(itemzjd.mainlink.Port1.PortId, itemzjd.mainlink.Port2.PortId, 'gl', 'right', itemzjd.mainlink);
						window.paper.conNect(itemzjd.ohterlink.Port1.PortId, itemzjd.ohterlink.Port2.PortId, 'gl', 'right', itemzjd.ohterlink);
					} else {
						let qx = Math.sqrt((Math.pow(po1Position.x, 2) + Math.pow(po2Position.x, 2)) / 2);
						let qy = Math.sqrt((Math.pow(po1Position.y, 2) + Math.pow(po2Position.y, 2)) / 2);
						let textHeight = -12;
						if (directionGport) {
							qx += 70;
						} else {
							qx -= 30;
						}
						if (mathy < 48 && (port1Dev.attributes.type === 'basic.RectPort' && port2Dev.attributes.type === 'basic.RectPort')) {
							qy += 35
						}
						directionGport = !directionGport;
						if (port2Dev.attributes.type === 'basic.GPPort') {
							var pp = 1;
						}
						let gpp = new joint.shapes.basic.GPPort({
							portRemove: 1,
							pppre: 1,
							id: itemzjd.portZjId,
							position: {
								x: qx,
								y: qy
							},
							size: {
								width: 10,
								height: 10
							},
							devDatas: itemzjd.portZj,
							attrs: {
								text: {
									text: `${itemzjd.PanelName}-${itemzjd.portZj.OdfboxName}-${itemzjd.portZj.ProodfName}-${itemzjd.portZj.ProportName}`,
									'font-size': 9,
									stroke: '',
									fill: '#f00',
									'ref-y': textHeight,
									'ref-x': .5
								},
								rect: {
									width: 13,
									height: 13,
									rx: 13,
									ry: 13,
									fill: '#f00'
								}
							}
						});
						gpp.addTo(window.paper.graph);
						itemzjd.mainlink.iszl = 2;
						itemzjd.ohterlink.iszl = 2;
						window.paper.conNect(itemzjd.mainlink.Port1.PortId, itemzjd.mainlink.Port2.PortId, 'gl', 'right', itemzjd.mainlink);
						window.paper.conNect(itemzjd.ohterlink.Port1.PortId, itemzjd.ohterlink.Port2.PortId, 'gl', 'right', itemzjd.ohterlink);

					}
				});
			}; //初始化图像
			$.each(finddata.leftLink, function(index, item) {
				paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'left', item);
			});
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