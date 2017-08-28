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
	main_panel: {
		panelGuid: "panel_1",
		panelName: "屏柜_1",
		devices: [{ //主装置信息
			DevType:"IED",
			Guid: "11",
			ProdevName: "线路保护1",
			ProdevShortname: "PL2201A",
			Lport: [ //光缆端子信息
				[{
					Guid: 'l_111', //自身的id
					LinkConnectId: "l_11", //所在光缆的id
					LinkId: "111", //所在线路的id
					Port1: "111", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}, {
					Guid: 'l_112', //自身的id，根据其来连接线
					LinkConnectId: "l_11", //所在光缆的id
					LinkId: "112", //所在线路的id
					Port1: "112", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}],
				[{ //暂时屏蔽数据
					Guid: 'l_121', //自身的id，根据其来连接线
					LinkConnectId: "l_12", //所在光缆的id
					LinkId: "111", //所在线路的id
					Port1: "111", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}, {
					Guid: 'l_122', //自身的id，根据其来连接线
					LinkConnectId: "l_12", //所在光缆的id
					LinkId: "112", //所在线路的id
					Port1: "112", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}]
			],
			ports: [ //主装置内部端口信息
				{
					Guid: "111",
					ProbsName: "B01-01 LC",
					Type: "RX"
				}, {
					Guid: "112",
					ProbsName: "B01-02 LC",
					Type: "TX"
				}
			]
		},{ //主装置信息
			DevType:"IED",
			Guid: "12",
			ProdevName: "线路保护2",
			ProdevShortname: "PL2202A",
			Lport: [ //光缆端子信息
				[{
					Guid: 'l_131', //自身的id
					LinkConnectId: "l_21", //所在光缆的id
					LinkId: "111", //所在线路的id
					Port1: "121", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}, {
					Guid: 'l_132', //自身的id，根据其来连接线
					LinkConnectId: "l_21", //所在光缆的id
					LinkId: "112", //所在线路的id
					Port1: "122", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}],
				[{ //暂时屏蔽数据
					Guid: 'l_141', //自身的id，根据其来连接线
					LinkConnectId: "l_22", //所在光缆的id
					LinkId: "111", //所在线路的id
					Port1: "121", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}, {
					Guid: 'l_142', //自身的id，根据其来连接线
					LinkConnectId: "l_22", //所在光缆的id
					LinkId: "112", //所在线路的id
					Port1: "122", //所在线路始发port1的id
					Port2: "未定义" //所在线路始发port2的id
				}]
			],
			ports: [ //主装置内部端口信息
				 {
					Guid: "121",
					ProbsName: "B01-01 LC",
					Type: "RX"
				}, {
					Guid: "122",
					ProbsName: "B01-02 LC",
					Type: "TX"
				}
			]
		}]
	},
	other_panel:[],
	main_device: { //主装置信息
		deviceGuid: "11",
		deviceName: "线路保护",
		ProdevShortname: "PL2201A",
		Gport: [ //光配端子信息
			{
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
			}
		],
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