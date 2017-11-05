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
                         <button type="button" class="btn btn-default btn-sm hide">全局信息流向</button>
                    </div>
                    <div id="thb" style="display: none;position: absolute; width:100%;height:100%;"></div>
                    <div id="cable-group" class="btn-group">
                        <button id="cable-line-status-btn" type="button" class="btn btn-primary btn-sm hide">组缆</button>
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

			var newData;
			getSvgInfoCentralDevice(panelId, function(obj) {
				if (obj.status) {
					var data = $.parseJSON(obj.json_info);
					console.log(panelId, obj, data, '---------------');
					newData = data;
				}

				window.aa = true;

				window.zlIsCtrl = false;
				window.zlispl = true;
				var mainPanel = {
					devices: [],
					noLinkDevices: [],
					leftLink: [],
					rightLink: [],
					GPorts: [],
					other_device: [],
					LineConnect: [],
					mainPortId: [],
					ZLLink: []
				};

				$.each(newData.PhyLink, function(index, item) { //硬接线数据处理
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

					mainPanel.rightLink.push(item);
				});
				$.each(newData.main_device.Bcslot, function(index, item) { //硬接线端口数据处理
					item.PanelId = newData.main_device.PanelId;
					mainPanel.noLinkDevices.push(item);
				});
				var other_devices = [];
				var other_devices2 = [];
				if (newData.other_device !== undefined && newData.other_device !== null) {
					for (var k = 0; k < newData.other_device.length; k++) { //将含有多个端口的other_device里拆分
						if (newData.other_device[k].DevPort !== null && newData.other_device[k].DevPort !== undefined) {
							if (newData.other_device[k].DevPort.length > 1) {
								for (var j = 0; j < newData.other_device[k].DevPort.length; j++) {
									other_devices.push({
										"DevPort": [newData.other_device[k].DevPort[j]],
										"Guid": newData.other_device[k].Guid,
										"Name": newData.other_device[k].Name,
										"PanelId": newData.other_device[k].PanelId,
										"ShortName": newData.other_device[k].ShortName
									});
								}
							} else {
								other_devices.push(newData.other_device[k]);
							}
						}
					}
				}
				console.log(other_devices, 'other_devices')
				var mainPortId = [];//main_device的端口
				var othrPortId = [];//othr_device的端口
				var AllMainGportId = [];//所有main_device的光配的id
				var AllOthrGportId = [];//所有othr_device的光配的id
				var AllCentGportId = [];//所有转接点的光配的id
				var newMainDevId = [];//所有main_device的id
				var newOterDevId = [];//所有othr_device的id
				var newMainGp = [];//所有main_device的光配
				var newOthrGP = [];//所有othr_device的光配
				var newThidGP = [];//所有用来中转筛选转接点的光配
				var newCentGp = [];//所有转接点的光配
				var newZLGpLink = [];//所有组揽的连接线
				var newZLGpLinkId = [];//所有组揽的连接线id
				var newAllZLGp = [];//所有组揽的连接线端子
				var newAllZLGpId = [];//所有组揽的连接线端子id
				var newOnlyMainPortId = [];//所有只与端口连接的光配点，用来区分端口是否可建立连接
				$.each(newData.main_device.Bcslot, function(in1, p1) {
					mainPortId.push(p1.SlotId);
					if (p1.DevPort !== null || p1.DevPort !== undefined) {
						$.each(p1.DevPort, function(in2, p2) {
							mainPortId.push(p2.Guid);
						});
					}
				});
				$.each(other_devices, function(in3, p3) {
					othrPortId.push(p3.DevPort[0].Guid);
				});

				if (newData.PhyLink !== null && newData.PhyLink !== undefined) {
					for (let p = 0; p < newData.PhyLink.length; p++) {
						if (newData.PhyLink[p].Port1.DevType !== "ODF" && newData.PhyLink[p].Port2.DevType !== "ODF") {
							let getothrdev1 = [];
							let getothrdev2 = [];
							getothrdev1 = other_devices.filter(x => x.DevPort[0].Guid === newData.PhyLink[p].Port1.PortId);
							getothrdev2 = other_devices.filter(x => x.DevPort[0].Guid === newData.PhyLink[p].Port2.PortId);
							if (getothrdev1.length === 0 && getothrdev2.length !== 0) {
								other_devices2.push({
									"DevPort": getothrdev2[0].DevPort,
									"Guid": getothrdev2[0].Guid,
									"Name": getothrdev2[0].Name,
									"PanelId": getothrdev2[0].PanelId,
									"ShortName": getothrdev2[0].ShortName,
									"ForPort": newData.PhyLink[p].Port1.PortId,
									"PosiType": true
								});
							}
							if (getothrdev1.length !== 0 && getothrdev2.length === 0) {
								other_devices2.push({
									"DevPort": getothrdev1[0].DevPort,
									"Guid": getothrdev1[0].Guid,
									"Name": getothrdev1[0].Name,
									"PanelId": getothrdev1[0].PanelId,
									"ShortName": getothrdev1[0].ShortName,
									"ForPort": newData.PhyLink[p].Port2.PortId,
									"PosiType": true
								});
							}

						}
						if (newData.PhyLink[p].Port1.DevType === "ODF" && newData.PhyLink[p].Port2.DevType !== "ODF") {
							let getothrdev1 = [];
							getothrdev1 = other_devices.filter(x => x.DevPort[0].Guid === newData.PhyLink[p].Port2.PortId);
							if (getothrdev1.length !== 0) {
								other_devices2.push({
									"DevPort": getothrdev1[0].DevPort,
									"Guid": getothrdev1[0].Guid,
									"Name": getothrdev1[0].Name,
									"PanelId": getothrdev1[0].PanelId,
									"ShortName": getothrdev1[0].ShortName,
									"ForPort": newData.PhyLink[p].Port1.PortId
								});
							}
						}
						if (newData.PhyLink[p].Port1.DevType !== "ODF" && newData.PhyLink[p].Port2.DevType === "ODF") {
							let getothrdev1 = [];
							getothrdev1 = other_devices.filter(x => x.DevPort[0].Guid === newData.PhyLink[p].Port1.PortId);
							if (getothrdev1.length !== 0) {
								other_devices2.push({
									"DevPort": getothrdev1[0].DevPort,
									"Guid": getothrdev1[0].Guid,
									"Name": getothrdev1[0].Name,
									"PanelId": getothrdev1[0].PanelId,
									"ShortName": getothrdev1[0].ShortName,
									"ForPort": newData.PhyLink[p].Port2.PortId
								});
							}
						}
					}
				}
				newMainDevId.push(newData.main_device.Guid);
				$.each(newData.other_device, function(indd, itt) {
					newOterDevId.push(itt.Guid);
				});
				if (newData.PhyLink !== null || newData.PhyLink !== undefined) {
					$.each(newData.PhyLink, function(ind1, itm1) {
						if (itm1.Port1.PanelId === itm1.Port2.PanelId) { //一个点：mainGp或othrGp时
							if (itm1.Port1.DevType !== "ODF" && itm1.Port2.DevType === "ODF") {
								if (newMainDevId.indexOf(itm1.Port1.DeviceId) !== -1) {
									let getExit = [];
									getExit = newMainGp.filter(x => x.PortId === itm1.Port2.PortId);
									if (getExit.length === 0) {
										newMainGp.push({
											"Type": "Main",
											"DeviceId": itm1.Port2.DeviceId,
											"PanelId": itm1.Port2.PanelId,
											"PortId": itm1.Port2.PortId,
											"PortName": itm1.Port2.PortName,
											"PanelName":itm1.Port2.PanelName,
											"ForPort": itm1.Port1.PortId
										});
									}
								}
								if (newOterDevId.indexOf(itm1.Port2.DeviceId) !== -1) {
									let getExit = [];
									getExit = newOthrGP.filter(x => x.PortId === itm1.Port2.PortId);
									if (getExit.length === 0) {
										newOthrGP.push({
											"Type": "Othr",
											"DeviceId": itm1.Port2.DeviceId,
											"PanelId": itm1.Port2.PanelId,
											"PortId": itm1.Port2.PortId,
											"PortName": itm1.Port2.PortName,
											"PanelName":itm1.Port2.PanelName,
											"ForPort": itm1.Port1.PortId
										})
									}
								}
							}
							if (itm1.Port1.DevType === "ODF" && itm1.Port2.DevType !== "ODF") {
								if (newMainDevId.indexOf(itm1.Port2.DeviceId) !== -1) {
									let getExit = [];
									getExit = newMainGp.filter(x => x.PortId === itm1.Port1.PortId);
									if (getExit.length === 0) {
										newMainGp.push({
											"Type": "Main",
											"DeviceId": itm1.Port1.DeviceId,
											"PanelId": itm1.Port1.PanelId,
											"PortId": itm1.Port1.PortId,
											"PortName": itm1.Port1.PortName,
											"PanelName":itm1.Port1.PanelName,
											"ForPort": itm1.Port2.PortId
										})
									}
								}
								if (newOterDevId.indexOf(itm1.Port2.DeviceId) !== -1) {
									let getExit = [];
									getExit = newOthrGP.filter(x => x.PortId === itm1.Port1.PortId);
									if (getExit.length === 0) {
										newOthrGP.push({
											"Type": "Othr",
											"DeviceId": itm1.Port1.DeviceId,
											"PanelId": itm1.Port1.PanelId,
											"PortId": itm1.Port1.PortId,
											"PortName": itm1.Port1.PortName,
											"PanelName":itm1.Port1.PanelName,
											"ForPort": itm1.Port2.PortId
										})
									}
								}
								if (newThidGP.length !== 0) {
									$.each(newThidGP, function(ii1, tt1) {
										let getExit = [];
										let getExit2 = [];
										let getExit3 = [];
										getExit = newMainGp.filter(x => x.PortId === tt1.PortId);
										getExit2 = newOthrGP.filter(x => x.PortId === tt1.PortId);
										getExit3 = newCentGp.filter(x => x.PortId === tt1.PortId);
										if (getExit.length === 0 && getExit2.length === 0 && getExit3.length === 0) {
											newCentGp.push({
												"Type": "Centr",
												"DeviceId": tt1.DeviceId,
												"PanelId": tt1.PanelId,
												"PortId": tt1.PortId,
												"PortName": tt1.PortName,
												"PanelName":tt1.PanelName,
												"ForPort": tt1.ForPort
											});
										}
									})
								}
							}
						}
						if (itm1.Port1.PanelId !== itm1.Port2.PanelId) { //一个点：转接点时
							if (itm1.Port1.DevType !== "ODF" && itm1.Port2.DevType === "ODF") {
								if (newMainDevId.indexOf(itm1.Port1.DeviceId) !== -1) {
									let getExit = [];
									let getExit2 = [];
									let getExit3 = [];
									getExit = newCentGp.filter(x => x.PortId === itm1.Port2.PortId);
									getExit2 = newMainGp.filter(x => x.PortId === itm1.Port2.PortId);
									getExit3 = newOthrGP.filter(x => x.PortId === itm1.Port2.PortId);
									if (getExit.length === 0 && getExit2.length === 0 && getExit3.length === 0) {
										newThidGP.push({
											"Type": "Centr",
											"DeviceId": itm1.Port2.DeviceId,
											"PanelId": itm1.Port2.PanelId,
											"PortId": itm1.Port2.PortId,
											"PanelName":itm1.Port2.PanelName,
											"PortName": itm1.Port2.PortName,
											"ForPort": itm1.Port1.PortId
										})
									}
								}
								if (newOterDevId.indexOf(itm1.Port1.DeviceId) !== -1) {
									let getExit = [];
									let getExit2 = [];
									let getExit3 = [];
									getExit = newCentGp.filter(x => x.PortId === itm1.Port2.PortId);
									getExit2 = newMainGp.filter(x => x.PortId === itm1.Port2.PortId);
									getExit3 = newOthrGP.filter(x => x.PortId === itm1.Port2.PortId);
									if (getExit.length === 0 && getExit2.length === 0 && getExit3.length === 0) {
										newOthrGP.push({
											"Type": "Othr",
											"DeviceId": itm1.Port2.DeviceId,
											"PanelId": itm1.Port2.PanelId,
											"PortId": itm1.Port2.PortId,
											"PanelName":itm1.Port2.PanelName,
											"PortName": itm1.Port2.PortName,
											"ForPort": itm1.Port1.PortId
										})
									}
								}
							}
							if (itm1.Port1.DevType === "ODF" && itm1.Port2.DevType !== "ODF") {
								if (newMainDevId.indexOf(itm1.Port2.DeviceId) !== -1) {
									let getExit = [];
									let getExit2 = [];
									let getExit3 = [];
									getExit = newCentGp.filter(x => x.PortId === itm1.Port1.PortId);
									getExit2 = newMainGp.filter(x => x.PortId === itm1.Port1.PortId);
									getExit3 = newOthrGP.filter(x => x.PortId === itm1.Port1.PortId);
									if (getExit.length === 0 && getExit2.length === 0 && getExit3.length === 0) {
										newCentGp.push({
											"Type": "Centr",
											"DeviceId": itm1.Port1.DeviceId,
											"PanelId": itm1.Port1.PanelId,
											"PortId": itm1.Port1.PortId,
											"PanelName":itm1.Port1.PanelName,
											"PortName": itm1.Port1.PortName,
											"ForPort": itm1.Port2.PortId
										})
									}
								}

								if (newThidGP.length !== 0) {
									$.each(newThidGP, function(ii1, tt1) {
										let getExit = [];
										let getExit2 = [];
										let getExit3 = [];
										getExit = newMainGp.filter(x => x.PortId === tt1.PortId);
										getExit2 = newOthrGP.filter(x => x.PortId === tt1.PortId);
										getExit3 = newCentGp.filter(x => x.PortId === tt1.PortId);
										if (getExit.length === 0 && getExit2.length === 0 && getExit3.length === 0) {
											newCentGp.push({
												"Type": "Centr",
												"DeviceId": tt1.DeviceId,
												"PanelId": tt1.PanelId,
												"PortId": tt1.PortId,
												"PanelName":tt1.PanelName,
												"PortName": tt1.PortName,
												"ForPort": tt1.ForPort
											});
										}
									})
								}
							}
							if (itm1.Port1.DevType === "ODF" && itm1.Port2.DevType === "ODF") {
								if (newThidGP.indexOf(itm1.Port1.DeviceId) === -1) {
									newThidGP.push({
										"Type": "Thid",
										"DeviceId": itm1.Port1.DeviceId,
										"PanelId": itm1.Port1.PanelId,
										"PortId": itm1.Port1.PortId,
										"PanelName":itm1.Port1.PanelName,
										"PortName": itm1.Port1.PortName,
										"ForPort": ''
									})
								}
								if (newThidGP.indexOf(itm1.Port2.DeviceId) === -1) {
									newThidGP.push({
										"Type": "Thid",
										"DeviceId": itm1.Port2.DeviceId,
										"PanelId": itm1.Port2.PanelId,
										"PortId": itm1.Port2.PortId,
										"PanelName":itm1.Port2.PanelName,
										"PortName": itm1.Port2.PortName,
										"ForPort": ''
									})
								}
							}
						}
					})
				}
				if (newCentGp.length > 0) {
					$.each(newData.PhyLink, function(iin0, iit0) {
						$.each(newCentGp, function(iin1, iit1) {
							if (iit0.Port2.PortId === iit1.PortId) {
								iit1.ForPort = iit0.Port1.PortId;
							}
							if (iit0.Port2.PortId === iit1.PortId && newMainDevId.indexOf(iit0.Port1.DeviceId) !== -1) {
								iit1.PosiType = true;
							}
						})
					})
				}
				if (newOthrGP.length > 0) {
					$.each(newData.PhyLink, function(iin0, iit0) {
						$.each(newOthrGP, function(iin1, iit1) {
							if (iit0.Port2.PortId === iit1.PortId) {
								iit1.ForPort = iit0.Port1.PortId;
							}
							if (iit0.Port2.PortId === iit1.PortId && newMainDevId.indexOf(iit0.Port1.DeviceId) !== -1) {
								iit1.PosiType = true; //处理位置信息，线始终位于mainDevice端口的中心
							}
						})

					})
				}
				if (newMainGp.length > 0) {
					$.each(newData.PhyLink, function(iin0, iit0) {
						$.each(newMainGp, function(iin1, iit1) {
							if (iit0.Port2.PortId === iit1.PortId) {
								iit1.ForPort = iit0.Port1.PortId;
								iit1.PosiType = true;
							}
						})

					})
				}
				if (newData.OpticalCable !== null || newData.OpticalCable !== undefined) {
					$.each(newData.OpticalCable, function(iis1, itt1) {
						let arr = [];
						$.each(itt1.PhyLink, function(iis2, itt2) {
							arr.push(itt2.PhyLinkId);
							newAllZLGpId.push({
								"Guid": itt2.PhyLinkId,
								"ZLLink":itt1.OpCableId,
								"Index": iis1
							});
						});
						newZLGpLinkId.push({
							"LinkIds": arr,
							"LinkName": itt1.OpCableName,
							"LinkId": itt1.OpCableId
						});
					});
				}
				if (newAllZLGpId.length !== 0) { //组揽端子处理
					$.each(newAllZLGpId, function(iis1, itt1) {
						let getExit5 = [];
						getExit5 = newData.PhyLink.filter(x => x.PhylinkId === itt1.Guid);
						if (mainPortId.indexOf(getExit5[0].Port1.PortId) !== -1) {
							newAllZLGp.push({
								"PortId": itt1.Guid,
								"Index": itt1.Index,
								"ZLLink":itt1.ZLLink,
								"ForPort": getExit5[0].Port1.PortId,
								"PosiType": true
							});
						} else {
							newAllZLGp.push({
								"PortId": itt1.Guid,
								"Index": itt1.Index,
								"ZLLink":itt1.ZLLink,
								"ForPort": getExit5[0].Port1.PortId,
								"PosiType": false
							});
						}
					})
				}
				if (newZLGpLinkId.length !== 0) { //组揽连接线处理
					$.each(newZLGpLinkId, function(iis1, itt1) {
						let arr = [];
						for (var g = 1; g < itt1.LinkIds.length; g++) {
							arr.push({
								"Port1": itt1.LinkIds[g - 1] + '1',
								"Port2": itt1.LinkIds[g] + '1',
								"Guid": itt1.LinkId,
								"Name": itt1.LinkName
							});
						}
						newZLGpLink.push(arr);
					})
				}
				$.each(newMainGp, function(indd, ittm) {
					AllMainGportId.push(ittm.PortId);
				});
				$.each(newOthrGP, function(indd, ittm) {
					AllOthrGportId.push(ittm.PortId);
				});
				$.each(newCentGp, function(indd, ittm) {
					AllCentGportId.push(ittm.PortId);
				});
				console.log(newMainGp, newOthrGP, newCentGp, '点点点点');
				if (newData.PhyLink !== null || newData.PhyLink !== undefined) {//处理连接线展示的操作端口展示
					$.each(newData.PhyLink, function(inds1, itms1) {
						let getmenu = AllCentGportId.indexOf(itms1.Port1.PortId)
						if (mainPortId.indexOf(itms1.Port1.PortId) !== -1 && AllMainGportId.indexOf(itms1.Port2.PortId) !== -1) {
							itms1.menu = 'empy';
						} else if (othrPortId.indexOf(itms1.Port2.PortId) !== -1 && AllOthrGportId.indexOf(itms1.Port1.PortId) !== -1) {
							itms1.menu = 'empy';
						} else if (AllCentGportId.indexOf(itms1.Port2.PortId) !== -1 || AllCentGportId.indexOf(itms1.Port1.PortId) !== -1) {
							itms1.menu = 'centr';
						} else {
							itms1.menu = 'all';
						}
						if(AllMainGportId.indexOf(itms1.Port1.PortId)!==-1&&itms1.Port2.PortId===''){
							newOnlyMainPortId.push(itms1.Port1.PortId);
						}
					});
				}
				var NewMainAndOthrGP = [];
				NewMainAndOthrGP.push(newMainGp); //main_device GP
				NewMainAndOthrGP.push(newOthrGP); //转接点
				NewMainAndOthrGP.push(newCentGp); //other_device Gp
				NewMainAndOthrGP.push(newAllZLGp); //组揽端子
				NewMainAndOthrGP.push(newOnlyMainPortId); //只与端口连接的main_device的光配点，用于判断端口是否可连接

				window.zjlinkDate = [];
				mainPanel.mainPortId = mainPortId;
				mainPanel.other_device = other_devices2;
				mainPanel.GPorts = NewMainAndOthrGP;
				mainPanel.LineConnect = newData.PhyLink;
				mainPanel.ZLLink = newZLGpLink;
				console.log(mainPanel, 'mainpanel');
				$this.creatModel(newData, mainPanel, paper);
			})

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
			let mainName = data.main_device.Name;
			if (data.main_device.Name.length > 14) {
				mainName = data.main_device.Name.slice(0, 14) + '...';
			}
			$.each(finddata.noLinkDevices, function(nolindex, noldata) {
				noldata.ports = [];
			});
			var leftCabiner = new joint.shapes.devs.Cabinet2({
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
				porttts: data.main_device.Name + '(' + data.main_device.ShortName + ')',
				mainpanel: true,
				attrs: {
					'text.title-class': {
						text: mainName
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
				if (finddata.GPorts[0].length !== 0) { //Main_device的光配
					$.each(finddata.GPorts[0], function(ins1, its1) {
						let getX = 200 + 4000;
						let getY;
						if (its1.PosiType !== undefined && its1.PosiType === true) {
							getY = window.ppp.findViewByModel(its1.ForPort).model.attributes.position.y + 12;
						} else {
							getY = window.ppp.findViewByModel(its1.ForPort).model.attributes.position.y;
						}
						let getGport = new joint.shapes.basic.GPPort({
							portRemove: 1,
							id: its1.PortId,
							porttts:its1.PortName +'-'+ its1.PanelName,
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
									text: its1.PortName,
									'font-size': '12px',
									stroke: '',
									fill: '#306796',
									'ref-y': -15
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
					})
				}
				if (finddata.GPorts[2].length !== 0) { //转接点的光配
					$.each(finddata.GPorts[2], function(ins1, its1) {
						let getX = 450 + 4000;
						let getY;
						if (its1.PosiType !== undefined && its1.PosiType === true) {
							getY = window.ppp.findViewByModel(its1.ForPort).model.attributes.position.y + 12;
						} else {
							getY = window.ppp.findViewByModel(its1.ForPort).model.attributes.position.y;
						}
						let getGport = new joint.shapes.basic.ZPPort({
							portRemove: 1,
							id: its1.PortId,
							porttts:its1.PortName +'-'+its1.PanelName,
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
									text: its1.PortName,
									'font-size': '12px',
									stroke: '',
									fill: 'red',
									'ref-y': -15
								},
								rect: {
									width: 13,
									height: 13,
									rx: 13,
									ry: 13,
									fill: 'red'
								}
							}
						});
						getGport.addTo(window.paper.graph);
					})
				}
				if (finddata.GPorts[1].length !== 0) { //other_device的光配
					$.each(finddata.GPorts[1], function(index2, item2) {
						let getX = 650 + 4000;;
						let getY;
						if (item2.PosiType !== undefined && item2.PosiType === true) {
							getY = window.ppp.findViewByModel(item2.ForPort).model.attributes.position.y + 12;
						} else {
							getY = window.ppp.findViewByModel(item2.ForPort).model.attributes.position.y;
						}
						let getGport = new joint.shapes.basic.GPPort({
							portRemove: 1,
							porttts:item2.PortName +'-'+item2.PanelName,
							id: item2.PortId,
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
									text: item2.PortName,
									'font-size': '12px',
									stroke: '',
									fill: '#306796',
									'ref-y': -15
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
					});
				}
				let OtherX = 590 + 4000 + 150;
				let WidthG = 393;
				let OtherHeight = 200;
				let OtherY = 4110;
				if (finddata.other_device !== null) { //other_device

					// let ggg = window.ppp.findViewByModel("0f97493d-09ab-430f-8400-d8c0b1f38b6e").model.attributes.position.y;
					// let ggg2 = window.ppp.findViewByModel("e8934ee5-ae64-40c2-abd2-126c5b665ac6").model.attributes.position.y;
					for (var i = 0; i < finddata.other_device.length; i++) {
						if (finddata.other_device[i].DevPort.length === 0) {
							continue;
						}
						let getY;
						if (finddata.other_device[i].PosiType !== undefined && finddata.other_device[i].PosiType === true) {
							getY = window.ppp.findViewByModel(finddata.other_device[i].ForPort).model.attributes.position.y;
						} else {
							getY = window.ppp.findViewByModel(finddata.other_device[i].ForPort).model.attributes.position.y - 9;
						}
						let portsLen = finddata.other_device[i].DevPort.length;
						let titlePosition = (portsLen - 1) * 20;
						let devname = '';
						if ((finddata.other_device[i].Name.length + finddata.other_device[i].ShortName.length) > 11) {
							devname = finddata.other_device[i].Name.slice(0, 10) + '...';
						} else {
							devname = finddata.other_device[i].Name + '(' + finddata.other_device[i].ShortName + ')';
						}

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
							porttts: finddata.other_device[i].Name + '(' + finddata.other_device[i].ShortName + ')',
							devicesNolink: finddata,
							devDatas: finddata.other_device[i],
							childequipments: finddata.other_device[i].DevPort,
							paper: paper,
							mainpanel: false,
							attrs: {
								'text.title-class': {
									text: devname
								},
								'g.title-class': {
									x: 0,
									y: 0,
									transform: 'translate(65,' + titlePosition + ')'
								},
							}
						});
						$(".icdContain").text("PL2201A智能终端");
						OtherHeight = ot.findView(paper.paper).$el[0];
						OtherY += viewE(OtherHeight).bbox(true).height + 10; //两个other_panel之间的纵向间距
					}
				}


				// $.each(window.nowAssemblylink, function(index, item) {
				$.each(finddata.LineConnect, function(index, item) {
					window.paper.conNect(item.Port1.PortId, item.Port2.PortId, 'gl', 'right', item); //此处为画出连接线
				});


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
			if (finddata.GPorts[3].length !== 0) { //组揽的光配
				$.each(finddata.GPorts[3], function(index2, item2) {
					let getX = 250 + 4000 + item2.Index * 30;
					if (item2.Index > 6) {
						getX = 250 + 4000 + (item2.Index + 1) * 30;
					}
					let getY = window.ppp.findViewByModel(item2.ForPort).model.attributes.position.y;
					if (item2.PosiType === true) {
						getY = window.ppp.findViewByModel(item2.ForPort).model.attributes.position.y + 10;
					}
					let iid = item2.PortId + '1';
					var LinePorts = new joint.shapes.basic.LPPort({
						portRemove: 1,
						id: iid,
						ZLLink:item2.ZLLink,
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
								// text: item2.Guid,
								'font-size': '12px',
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
			}
			var getLinkConnectId = [];
			$.each(finddata.ZLLink, function(index, item) { //暂时暂时光缆port点的连接线
				for (var p = 0; p < item.length; p++) {
					let len = (item.length) % 2 === 0 ? (item.length) / 2 : (item.length + 1) / 2;
					let vie = 0;
					if ((p + 1) === len) {
						vie = 1;
					}
					window.paper.LineConnect(item[p], vie);
				}
			});
		}
	}];
})(window.jQuery, window.joint, window._, window.parent.window, window.V, window.GFC);