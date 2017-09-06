window.ddddata = {
	LineConnect: [{
		LinkConnectId: "LG_11", //整条光缆的信息
		Guid: '456', //此条短线的id
		Port1: {
			LinkId: "119", //所在线的id
			PortId: "l_111" //光缆圆圈的id
		},
		Port2: {
			LinkId: "120",
			PortId: "l_112"
		}
	}, {
		LinkConnectId: "LG_11",
		Guid: '457',
		Port1: {
			LinkId: "120",
			PortId: "l_112"
		},
		Port2: {
			LinkId: "121",
			PortId: "l_113"
		}

	}, {
		LinkConnectId: "LG_12",
		Guid: '458',
		Port1: {
			LinkId: "119",
			PortId: "l_121"
		},
		Port2: {
			LinkId: "120",
			PortId: "l_122"
		}
	}, {
		LinkConnectId: "LG_12",
		Guid: '459',
		Port1: {
			LinkId: "120",
			PortId: "l_122"
		},
		Port2: {
			LinkId: "121",
			PortId: "l_123"
		}

	}],
	Connection: [{ //端口连接线信息
		PhylinkId: "111", //端口连接线id（唯一）
		Port1: {
			DeviceId: "1111",
			PortId: "611", //若从端口开始则为端口id；若从光配（组）开始，则为光配id
			Type: "rx"
		},
		Port2: {
			DeviceId: "2111",
			PortId: "631", //接收方id
			Type: "tx"
		},
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
		}
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
		}
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
		}
	}, {
		PhylinkId: "116",
		Port1: {
			DeviceId: "1111",
			PortId: "A_11",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "651",
			Type: "rx"
		}
	}, {
		PhylinkId: "117",
		Port1: {
			DeviceId: "1111",
			PortId: "A_12",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "652",
			Type: "rx"
		}
	}, {
		PhylinkId: "118",
		Port1: {
			DeviceId: "1111",
			PortId: "A_14",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "662",
			Type: "rx"
		}
	}, {
		PhylinkId: "119",
		Port1: {
			DeviceId: "1111",
			PortId: "A_11",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "731",
			Type: "rx"
		}
	}, {
		PhylinkId: "120",
		Port1: {
			DeviceId: "1111",
			PortId: "A_12",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "732",
			Type: "rx"
		}
	}, {
		PhylinkId: "121",
		Port1: {
			DeviceId: "1111",
			PortId: "A_14",
			Type: "tx"
		},
		Port2: {
			DeviceId: "3111",
			PortId: "734",
			Type: "rx"
		}
	}],
	main_panel: { //main_panel
		panelGuid: "panel_1", //panel的id
		panelName: "屏柜_1", //展示名称
		Lport: [ //光缆端子信息，每一条光缆分为一个数组
			[{
				Guid: 'l_111', //光缆端子的id
				LinkConnectId: "l_11", //所在光缆的id
				LinkId: "119", //所在线路的id
				Port1: "A_11", //所在线路始发port1的id,默认为main_panel
				Port2: "731" //所在线路始发port2的id
			}, {
				Guid: 'l_112',
				LinkConnectId: "l_11",
				LinkId: "120",
				Port1: "A_12",
				Port2: "732"
			}, {
				Guid: 'l_113',
				LinkConnectId: "l_11",
				LinkId: "121",
				Port1: "A_14",
				Port2: "734"
			}],
			[{
				Guid: 'l_121',
				LinkConnectId: "l_12",
				LinkId: "119",
				Port1: "A_11",
				Port2: "731"
			}, {
				Guid: 'l_122',
				LinkConnectId: "l_12",
				LinkId: "120",
				Port1: "A_12",
				Port2: "732"
			}, {
				Guid: 'l_123',
				LinkConnectId: "l_12",
				LinkId: "121",
				Port1: "A_14",
				Port2: "734"
			}]
		],
		Gport: [{ //main_panel内光配组
			Guid: 'A_1',
			portPanelName: 'A层',
			ports: [{
				Guid: 'A_11',
				ProbsName: '11', //展示名称
				toPortIdMain: '651', //对应mian_panel有光配的端口
				toPortIdOther: '731' //对应other_panel有光配的端口
			}, {
				Guid: 'A_12',
				ProbsName: '12',
				toPortIdMain: '652',
				toPortIdOther: '732'
			}, {
				Guid: 'A_13',
				ProbsName: '13',
				toPortIdMain: '661',
				toPortIdOther: '733'
			}, {
				Guid: 'A_14',
				ProbsName: '14',
				toPortIdMain: '662',
				toPortIdOther: '734'
			}, {
				Guid: 'A_15',
				ProbsName: '15',
				toPortIdMain: '',
				toPortIdOther: ''
			}]
		}, {
			Guid: 'B_1',
			portPanelName: 'B层',
			ports: [{
				Guid: 'B_11',
				ProbsName: '11',
				toPortId: ''
			}, {
				Guid: 'B_12',
				ProbsName: '12',
				toPortId: ''
			}, {
				Guid: 'B_13',
				ProbsName: '13',
				toPortId: ''
			}]
		}],
		devicesWithoutGP: [{ //没有光配的装置
			DevType: "IED",
			Guid: "11", //图元id
			deviceGuid: "w_22", //装置id
			ProdevName: "线路保护1", //展示名称
			ProdevShortname: "PL2201A", //，名称缩写
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
		}, {
			DevType: "IED",
			Guid: "12",
			deviceGuid: "w_33",
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
				Guid: "w_151", //图元id
				deviceGuid: "w_15", //装置id
				ProdevName: "线路保护5",
				ProdevShortname: "PL2205A",
				ports: [ //主装置有光配内部端口信息，只能存在一个端口
					{
						Guid: "651",
						ProbsName: "B05-01 LC",
						Type: "RX"
					}
				]
			}, { //主装置信息
				DevType: "IED",
				Guid: "w_152", //图元id
				deviceGuid: "w_15", //装置id
				ProdevName: "线路保护5",
				ProdevShortname: "PL2205A",
				ports: [ //主装置内部端口信息
					{
						Guid: "652",
						ProbsName: "B05-02 LC",
						Type: "TX"
					}
				]
			}
			// , { //主装置信息
			// 	DevType: "IED",
			// 	Guid: "w_161",
			// 	deviceGuid:"w_16",
			// 	ProdevName: "线路保护6",
			// 	ProdevShortname: "PL2204A",
			// 	ports: [ //主装置内部端口信息
			// 		{
			// 			Guid: "661",
			// 			ProbsName: "B06-01 LC",
			// 			Type: "RX"
			// 		}
			// 	]
			// }
			, { //主装置信息
				DevType: "IED",
				Guid: "w_162",
				deviceGuid: "w_16",
				ProdevName: "线路保护6",
				ProdevShortname: "PL2204A",
				ports: [ //主装置内部端口信息
					{
						Guid: "662",
						ProbsName: "B06-02 LC",
						Type: "TX"
					}
				]
			}
		]
	},
	other_panelWihtGP: [{ //other_panel与有光配装置链接的panel
		panelGuid: "panel_4", //id
		panelName: "屏柜_4", //展示名称
		derection: "left", //展示位置默认为left
		Gport: [{ //光配信息
			Guid: 'gp_731',
			toPortId: '731'
		}, {
			Guid: 'gp_732',
			toPortId: '732'
		}, {
			Guid: 'gp_734',
			toPortId: '734'
		}],
		devices: [{ //一个panel只能有一个device与port
			DevType: "IED",
			Guid: "171",
			ProdevName: "线路保护7",
			ProdevShortname: "PL2207A",
			ports: [{
				Guid: "731",
				ProbsName: "B07-01 LC",
				Type: "TX"
			}]
		}]
	}, {
		panelGuid: "panel_5",
		panelName: "屏柜_5",
		derection: "left",
		Gport: [{
			Guid: 'gp_731',
			toPortId: '731'
		}, {
			Guid: 'gp_732',
			toPortId: '732'
		}, {
			Guid: 'gp_734',
			toPortId: '734'
		}],
		devices: [{
			DevType: "IED",
			Guid: "172",
			ProdevName: "线路保护8",
			ProdevShortname: "PL2208A",
			ports: [{
				Guid: "732",
				ProbsName: "B08-01 LC",
				Type: "TX"
			}]
		}]
	}, {
		panelGuid: "panel_6",
		panelName: "屏柜_6",
		derection: "left",
		Gport: [{
			Guid: 'gp_731',
			toPortId: '731'
		}, {
			Guid: 'gp_732',
			toPortId: '732'
		}, {
			Guid: 'gp_734',
			toPortId: '734'
		}],
		devices: [{
			DevType: "IED",
			Guid: "174",
			ProdevName: "线路保护9",
			ProdevShortname: "PL2209A",
			ports: [{
				Guid: "734",
				ProbsName: "B09-01 LC",
				Type: "TX"
			}]
		}]
	}],
	other_panelWihtoutGP: [{ //other_panel与无光配装置链接的装置
		panelGuid: "panel_2",
		panelName: "屏柜_2",
		derection: 'left',
		Gport: [{ //光配
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
			ports: [{
				Guid: "631",
				ProbsName: "B03-01 LC",
				Type: "TX"
			}, {
				Guid: "632",
				ProbsName: "B03-02 LC",
				Type: "RX"
			}]
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
		devices: [{
			DevType: "IED",
			Guid: "14",
			ProdevName: "线路保护4",
			ProdevShortname: "PL2204A",
			ports: [{
				Guid: "641",
				ProbsName: "B04-01 LC",
				Type: "TX"
			}, {
				Guid: "642",
				ProbsName: "B04-02 LC",
				Type: "RX"
			}]
		}]
	}],
};
window.treedata = [{
	Guid:'111',
	Name:'111_q',
	child:[{
		Guid:'111a',
		Name:'111a_q',
		child:[{
			Name:'111aa_q',
			Guid:'111aa'
		},{
			Name:'112aa_q',
			Guid:'112aa'
		}]
	},{
		Guid:'112a',
		Name:'112a_q',
		child:[{
			Name:'1112aa_q',
			Guid:'1112aa'
		},{
			Name:'1122aa_q',
			Guid:'1122aa'
		}]
	},{
		Guid:'1113a',
		Name:'1113a_q',
		child:[{
			Name:'1113aa_q',
			Guid:'1113aa'
		},{
			Name:'1123aa_q',
			Guid:'1123aa'
		}]
	}]
}, {
	Guid:'1112',
	Name:'1112_q',
	child:[{
		Guid:'1112a',
		Name:'1112a_q',
		child:[{
			Name:'1112aa_q',
			Guid:'1112aa'
		},{
			Name:'1122aa_q',
			Guid:'1122aa'
		}]
	},{
		Guid:'1122a',
		Name:'1122a_q',
		child:[{
			Name:'11122aa_q',
			Guid:'11122aa'
		},{
			Name:'11222aa_q',
			Guid:'11222aa'
		}]
	},{
		Guid:'11132a',
		Name:'11132a_q',
		child:[{
			Name:'11132aa_q',
			Guid:'11132aa'
		},{
			Name:'11232aa_q',
			Guid:'11232aa'
		}]
	}]
}, {
	Guid:'1113',
	Name:'1113_q',
	child:[{
		Guid:'1311a',
		Name:'1131a_q',
		child:[{
			Name:'1311aa_q',
			Guid:'1131aa'
		},{
			Name:'1123aa_q',
			Guid:'112a3a'
		}]
	},{
		Guid:'112a3',
		Name:'112a_3q',
		child:[{
			Name:'11312aa_q',
			Guid:'11132aa'
		},{
			Name:'11223aa_q',
			Guid:'1122a3a'
		}]
	},{
		Guid:'1113a3',
		Name:'1113a_3q',
		child:[{
			Name:'11133aa_q',
			Guid:'11133aa'
		},{
			Name:'1123a3a_q',
			Guid:'1123aa3'
		}]
	}]
}, {
	Guid:'1141',
	Name:'1114_q',
	child:[{
		Guid:'4111a',
		Name:'1411a_q',
		child:[{
			Name:'1411aa_q',
			Guid:'1141aa'
		},{
			Name:'1124aa_q',
			Guid:'112a4a'
		}]
	},{
		Guid:'112a4',
		Name:'112a_4q',
		child:[{
			Name:'11412aa_q',
			Guid:'11142aa'
		},{
			Name:'11224aa_q',
			Guid:'1122a4a'
		}]
	},{
		Guid:'11134a',
		Name:'1113a4_q',
		child:[{
			Name:'11413aa_q',
			Guid:'11143aa'
		},{
			Name:'11234aa_q',
			Guid:'1123a4a'
		}]
	}]
}];