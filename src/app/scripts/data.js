window.ddddata = {
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
			PortId: "611",
			Type: "rx"
		},
		Port2: {
			DeviceId: "2111",
			PortId: "631",
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
			PortId: "612",
			Type: "tx"
		},
		Port2: {
			DeviceId: "2111",
			PortId: "632",
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
			PortId: "621",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "641",
			Type: "rx"
		},
		ProjectOpticalcableGuid: '6664'
	}, {
		PhylinkId: "115",
		Gport: [{
			Guid: 'gp_3',
			toPortId: '113B'
		}, {
			Guid: 'gp_4',
			toPortId: '311'
		}],
		Port1: {
			DeviceId: "1111",
			PortId: "622",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "642",
			Type: "rx"
		},
		ProjectOpticalcableGuid: '6664'
	}],
	main_panel: { //main_panel内无光配的device排在前面接着再是有光配的device
		panelGuid: "panel_1",
		panelName: "屏柜_1",
		noLinkNum: 2,
		Gport: [{
			Guid: 'A_1',
			portPanelName: 'A层',
			ports: [{
				Guid: 'A_11',
				ProbsName:'11',
				toPortId: '651'
			}, {
				Guid: 'A_12',
				ProbsName:'12',
				toPortId: '652'
			}, {
				Guid: 'A_13',
				ProbsName:'13',
				toPortId: '661'
			}, {
				Guid: 'A_14',
				ProbsName:'14',
				toPortId: '662'
			}]
		}, {
			Guid: 'B_1',
			portPanelName: 'B层',
			ports: [{
				Guid: 'B_11',
				ProbsName:'11',
				toPortId: ''
			}, {
				Guid: 'B_12',
				ProbsName:'12',
				toPortId: ''
			}, {
				Guid: 'B_13',
				ProbsName:'13',
				toPortId: ''
			}]
		}],
		devicesWithoutGP: [{ //没有光配的装置
			DevType: "IED",
			Guid: "11",
			ProdevName: "线路保护1",
			ProdevShortname: "PL2201A",
			ports: [ //主装置内部端口信息
				{
					Guid: "611",
					ProbsName: "B01-01 LC",
					Type: "RX"
				}, {
					Guid: "612",
					ProbsName: "B01-02 LC",
					Type: "TX"
				}
			]
		},
		 { 
			DevType: "IED",
			Guid: "12",
			ProdevName: "线路保护2",
			ProdevShortname: "PL2202A",
			ports: [ //主装置内部端口信息
				{
					Guid: "621",
					ProbsName: "B02-01 LC",
					Type: "RX"
				}, {
					Guid: "622",
					ProbsName: "B02-02 LC",
					Type: "TX"
				}
			]
		}],

		devicesWithGP: [{ //主装置信息
			DevType: "IED",
			Guid: "15",
			ProdevName: "线路保护5",
			ProdevShortname: "PL2205A",
			ports: [ //主装置内部端口信息
				{
					Guid: "651",
					ProbsName: "B05-01 LC",
					Type: "RX"
				}, {
					Guid: "652",
					ProbsName: "B05-02 LC",
					Type: "TX"
				}
			]
		}, { //主装置信息
			DevType: "IED",
			Guid: "16",
			ProdevName: "线路保护6",
			ProdevShortname: "PL2204A",
			ports: [ //主装置内部端口信息
				{
					Guid: "661",
					ProbsName: "B06-01 LC",
					Type: "RX"
				}, {
					Guid: "662",
					ProbsName: "B06-02 LC",
					Type: "TX"
				}
			]
		}]
	},
	other_panel: [{
		panelGuid: "panel_2",
		panelName: "屏柜_2",
		derection: 'left',
		Gport: [{
			Guid: 'gp_631',
			toPortId: '631'
		}, {
			Guid: 'gp_632',
			toPortId: '632'
		}, {
			Guid: 'gp_641',
			toPortId: '641'
		}, {
			Guid: 'gp_642',
			toPortId: '642'
		}],
		devices: [{ //一个panel只能有一个device
			DevType: "IED",
			Guid: "13",
			ProdevName: "线路保护3",
			ProdevShortname: "PL2203A",
			// Lport: [ //光缆端子信息
			// 	[{
			// 		Guid: 'l_111', //自身的id
			// 		LinkConnectId: "l_11", //所在光缆的id
			// 		LinkId: "111", //所在线路的id
			// 		Port1: "111", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}, {
			// 		Guid: 'l_112', //自身的id，根据其来连接线
			// 		LinkConnectId: "l_11", //所在光缆的id
			// 		LinkId: "112", //所在线路的id
			// 		Port1: "112", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}],
			// 	[{ //暂时屏蔽数据
			// 		Guid: 'l_121', //自身的id，根据其来连接线
			// 		LinkConnectId: "l_12", //所在光缆的id
			// 		LinkId: "111", //所在线路的id
			// 		Port1: "111", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}, {
			// 		Guid: 'l_122', //自身的id，根据其来连接线
			// 		LinkConnectId: "l_12", //所在光缆的id
			// 		LinkId: "112", //所在线路的id
			// 		Port1: "112", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}]
			// ],
			ports: [ //主装置内部端口信息
				{
					Guid: "631",
					ProbsName: "B03-01 LC",
					Type: "TX"
				}, {
					Guid: "632",
					ProbsName: "B03-02 LC",
					Type: "RX"
				}
			]
		}]
	}, {
		panelGuid: "panel_3",
		panelName: "屏柜_3",
		derection: 'left',
		Gport: [{
			Guid: 'gp_631',
			toPortId: '631'
		}, {
			Guid: 'gp_632',
			toPortId: '632'
		}, {
			Guid: 'gp_641',
			toPortId: '641'
		}, {
			Guid: 'gp_642',
			toPortId: '642'
		}],
		devices: [{ //主装置信息
			DevType: "IED",
			Guid: "14",
			ProdevName: "线路保护4",
			ProdevShortname: "PL2204A",
			// Lport: [ //光缆端子信息
			// 	[{
			// 		Guid: 'l_111', //自身的id
			// 		LinkConnectId: "l_11", //所在光缆的id
			// 		LinkId: "111", //所在线路的id
			// 		Port1: "111", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}, {
			// 		Guid: 'l_112', //自身的id，根据其来连接线
			// 		LinkConnectId: "l_11", //所在光缆的id
			// 		LinkId: "112", //所在线路的id
			// 		Port1: "112", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}],
			// 	[{ //暂时屏蔽数据
			// 		Guid: 'l_121', //自身的id，根据其来连接线
			// 		LinkConnectId: "l_12", //所在光缆的id
			// 		LinkId: "111", //所在线路的id
			// 		Port1: "111", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}, {
			// 		Guid: 'l_122', //自身的id，根据其来连接线
			// 		LinkConnectId: "l_12", //所在光缆的id
			// 		LinkId: "112", //所在线路的id
			// 		Port1: "112", //所在线路始发port1的id
			// 		Port2: "未定义" //所在线路始发port2的id
			// 	}]
			// ],
			ports: [ //主装置内部端口信息
				{
					Guid: "641",
					ProbsName: "B04-01 LC",
					Type: "TX"
				}, {
					Guid: "642",
					ProbsName: "B04-02 LC",
					Type: "RX"
				}
			]
		}]
	}],
};