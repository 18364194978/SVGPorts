'use strict';
(function($, joint, _, viewE, ROOF, GFC, bootbox) {
	if (ROOF === undefined) {
		ROOF = window;
	}
	joint.shapes.devs.AtomicR = joint.shapes.devs.Model.extend({
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
			// if (portHeight > element.attributes.attrs.rect.height) {//此处是加硬接线端口时，显示内部svg的最小高度，现在没有硬接线端口所以解除限制
			// 	element.attributes.attrs.rect.height = portHeight;
			// 	element.attributes.size.height = portHeight;
			// }

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
	joint.shapes.devs.AtomicT = joint.shapes.devs.Model.extend({
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
			// if (portHeight > element.attributes.attrs.rect.height) {//此处是加硬接线端口时，显示内部svg的最小高度，现在没有硬接线端口所以解除限制
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
			// console.log(this.model.attributes,'attributes');
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
	joint.shapes.devs.CabinetT = joint.shapes.devs.Model.extend({
		markup: '<g class="rotatable">' +
			// '<g class="scalable">' +
			// '</g>' +
			'<rect class="body parent-class"/>' +
			// '<foreignObject class="gooseOut">' +
			// '<div xmlns="http://www.w3.org/1999/xhtml" class="goosebody">' +
			// '<div class="context">' +
			// '<div class="icdContain">' +
			// '</div>' +
			// '</div>' +
			// '</div>' +
			// '</foreignObject>' +
			'<g class="title-class">' +

			'<text class="labels title-class" />' +
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
				'.context': {
					width: 300,
					// 'position': 'relative',
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
					fill: 'red',
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
			// if (this.attributes.mainpanel) {
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
	joint.shapes.devs.Cabinet = joint.shapes.devs.Model.extend({
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
			// if (this.attributes.mainpanel) {
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
							let getGport = new joint.shapes.basic.GPPort({
								portRemove: 1,
								id: gports[l].Guid,
								// projectOpticalcableGuid: projectOpticalcableGuid,
								position: {
									x: $this.chidpositons.x + 250,
									y: $this.chidpositons.y + 115 + (n-1)*40
								},
								size: {
									width: 10,
									height: 10
								},
								attrs: {
									text: {
										// text: `${gppdata.OdfboxName}-${gppdata.ProodfName}-${gppdata.ProportName}`,
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
							// ChildArrays[l].addTo(window.tbgraph);
						}
					}
				}
			}
			
			var ChildArray = [];
			
			//var ChildPort = [];
			var fdo;
			var inprt, ouprt, dsname, idvs, portsname;
			for (var j = 0; j < data.length; j++) {//此处测试的是当返回的装置内部的port为双重数组时所用

				// for (var i = 0; i < data[j].length; i++) {
				// 	if (data[j][i].DevId !== undefined) {
				// 		ChildArray = [];
				// 		continue;
				// 	}
				// 	if ($this.attributes.mainpanel && data[j][i].devicesInfo !== undefined) { //此处这个连续的if是为了上文97行getPortAttrs硬接线port与线提供数据的，若未考虑线的情况可以先将几个数组设置为空的，这样就port与线就不展示了
				// 		inprt = data[j][i].port.leftPort !== null ? data[i].port.leftPort : [];
				// 		ouprt = data[j][i].port.rightPort !== null ? data[i].port.rightPort : [];
				// 		dsname = data[j][i].devicesInfo.ProdevName;
				// 		portsname = data[j][i].devicesInfo.Type;
				// 		idvs = data[j][i].devicesInfo.Guid;
				// 		console.log('1111113',idvs);
				// 	} else if ($this.attributes.mainpanel && data[j][i].devicesInfo === undefined) {
				// 		inprt = [];
				// 		ouprt = data[j][i].ports !== null ? data[j][i].ports : [];
				// 		dsname = data[j][i].ProdevName;
				// 		portsname = data[j][i].Type;
				// 		idvs = data[j][i].Guid;
				// 	} else {
				// 		inprt = data[j][i].ports !== null ? data[j][i].ports : [];
				// 		ouprt = [];
				// 		dsname = data[j][i].ProdevName;
				// 		portsname = data[j][i].Type;
				// 		idvs = data[j][i].Guid;
				// 		console.log('111111',idvs);
				// 	}
				// 	if (portsname === "Card") {
				// 		ChildArray[i] = new joint.shapes.devs.AtomicR({
				// 			id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
				// 			size: { //此处定义的是内部svg的size
				// 				width: 152,
				// 				height: 35
				// 			},
				// 			position: { //根据上文准备的外部svg的位置定义内部svg的位置
				// 				x: $this.chidpositons.x + 40,
				// 				y: $this.chidpositons.y + 70
				// 			},
				// 			z: window.assemblyz += 1, //暂时不知道什么用，删除后无碍
				// 			inPorts: inprt, //以下这一堆是配置数据，通过model.attribute可以获取
				// 			outPorts: ouprt,
				// 			devDatas: data[j][i],
				// 			paper: this.attributes.paper,
				// 			panelData: $this.attributes.devDatas,
				// 			dsname: dsname,
				// 			portsname: portsname,
				// 			attrs: { //暂时无需改动
				// 				rect: {
				// 					fill: '#CC6600',
				// 					stroke: '#CC6600',
				// 					x: 0,
				// 					y: 0,
				// 					width: 152,
				// 					height: 30
				// 				},
				// 				'.labels': {
				// 					text: '',
				// 					fill: '#306796',
				// 					'font-size': 12,
				// 					'text-anchor': 'middle',
				// 					'y-alignment': 'middle',
				// 					'font-family': 'Arial, helvetica, sans-serif',
				// 					'ref-y': 15,
				// 					'ref-x': .5
				// 				},
				// 				'.inPorts rect': {
				// 					fill: '#4283bb',
				// 					stroke: '#665ba7',
				// 					x: -20,
				// 					y: 30,
				// 					width: 100,
				// 					height: 24
				// 				},
				// 				'.outPorts rect': {
				// 					fill: '#4283bb',
				// 					stroke: '#665ba7',
				// 					x: -82,
				// 					y: 30,
				// 					width: 100,
				// 					height: 24
				// 				},
				// 				'.inPorts text.port-label': {
				// 					width: 100,
				// 					height: 24,
				// 					fill: '#ffffff',
				// 					'font-size': 9,
				// 					x: -20,
				// 					'ref-x': 50,
				// 					'ref-y': 44,
				// 					'text-anchor': 'middle',
				// 					'y-alignment': 'middle',
				// 					'font-family': 'Arial, helvetica, sans-serif'

				// 				},
				// 				'.outPorts text.port-label': {
				// 					fill: '#ffffff',
				// 					'font-size': 9,
				// 					x: -82,
				// 					'ref-x': 50,
				// 					'ref-y': 44,
				// 					'text-anchor': 'middle',
				// 					'y-alignment': 'middle',
				// 					'font-family': 'Arial, helvetica, sans-serif'

				// 				}
				// 			}
				// 		})
				// 	} else {
				// 		ChildArray[i] = new joint.shapes.devs.AtomicR({
				// 			id: idvs, //赋值id是在上面那一堆if中，屏蔽时注意下
				// 			size: { //此处定义的是内部svg的size
				// 				width: 132,
				// 				height: 30
				// 			},
				// 			position: { //根据上文准备的外部svg的位置定义内部svg的位置
				// 				x: $this.chidpositons.x + 50,
				// 				y: $this.chidpositons.y + 70
				// 			},
				// 			z: window.assemblyz += 1, //暂时不知道什么用，删除后无碍
				// 			inPorts: inprt, //以下这一堆是配置数据，通过model.attribute可以获取
				// 			outPorts: ouprt,
				// 			devDatas: data[j][i],
				// 			paper: this.attributes.paper,
				// 			panelData: $this.attributes.devDatas,
				// 			dsname: dsname,
				// 			portsname: portsname,
				// 			attrs: { //暂时无需改动
				// 				rect: {
				// 					fill: '#4F88BB',
				// 					stroke: '#41719C',
				// 					x: 0,
				// 					y: 0,
				// 					width: 132,
				// 					height: 30
				// 				},
				// 				'.labels': {
				// 					text: '',
				// 					fill: '#306796',
				// 					'font-size': 12,
				// 					'text-anchor': 'middle',
				// 					'y-alignment': 'middle',
				// 					'font-family': 'Arial, helvetica, sans-serif',
				// 					'ref-y': 15,
				// 					'ref-x': .5
				// 				},
				// 				'.inPorts rect': {
				// 					fill: '#4283bb',
				// 					stroke: '#665ba7',
				// 					x: -20,
				// 					y: 30,
				// 					width: 100,
				// 					height: 24
				// 				},
				// 				'.outPorts rect': {
				// 					fill: '#4283bb',
				// 					stroke: '#665ba7',
				// 					x: -82,
				// 					y: 30,
				// 					width: 100,
				// 					height: 24
				// 				},
				// 				'.inPorts text.port-label': {
				// 					width: 100,
				// 					height: 24,
				// 					fill: '#ffffff',
				// 					'font-size': 9,
				// 					x: -20,
				// 					'ref-x': 50,
				// 					'ref-y': 44,
				// 					'text-anchor': 'middle',
				// 					'y-alignment': 'middle',
				// 					'font-family': 'Arial, helvetica, sans-serif'

				// 				},
				// 				'.outPorts text.port-label': {
				// 					fill: '#ffffff',
				// 					'font-size': 9,
				// 					x: -82,
				// 					'ref-x': 50,
				// 					'ref-y': 44,
				// 					'text-anchor': 'middle',
				// 					'y-alignment': 'middle',
				// 					'font-family': 'Arial, helvetica, sans-serif'

				// 				},
				// 				'.sig1': {
				// 					width: 20,
				// 					height: 20,
				// 					fill: '#ffffff',
				// 					'ref-x': 0,
				// 					y: 0
				// 				},
				// 				'.sig2': {
				// 					width: 20,
				// 					height: 20,
				// 					fill: '#ffffff',
				// 					'ref-x': 0,
				// 					'ref-y': .89
				// 				},
				// 				'.sig3': {
				// 					width: 20,
				// 					height: 20,
				// 					fill: '#ffffff',
				// 					'ref-x': .91,
				// 					y: 0
				// 				},
				// 				'.sig4': {
				// 					width: 20,
				// 					height: 20,
				// 					fill: '#ffffff',
				// 					'ref-x': .91,
				// 					'ref-y': .89
				// 				}
				// 			}
				// 		});
				// 	}
				// 	ChildArray[i].addTo(window.tbgraph);
				// 	fdo = viewE(ChildArray[i].findView(window.tbpaper).$el[0]).bbox(true); //以下7行是定义外部svg的高根据内部svg的个数自适应
				// 	$this.chidpositons.parentWidth += fdo.height + 10;
				// 	$this.chidpositons.y += fdo.height + 10;
				// 	ChildArrays.push(ChildArray[i]);//此处为了下面this.runder(ChildArrays)展示，如果直接用ChildArray[i]则只能站址最后一个
				// 	ChildArray[i].remove();
				// 	this.embed(ChildArray[i]);
				// 	this.attributes.size.height = $this.chidpositons.parentWidth;
				// 	this.attributes.attrs['.body'].height = $this.chidpositons.parentWidth;
				// }
			}
			if (data.length === 1) {
				this.attributes.size.height -= 20;
			}
			this.runder(ChildArrays); //调用了上面的runder方法
			for (var j = 0; j < data.length; j++) { //此处测试的是当返回的装置内部的port为双重数组时所用
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
			if (gports !== undefined) {
				// for (var n = 0; n < dataGuid.length; n++) {
				// 	for (var l = 0; l < gports.length; l++) {
				// 		if (gports[l].toPortId === dataGuid[n]) {
				// 			console.log('1111');
				// 			let getGport = new joint.shapes.basic.GPPort({
				// 				portRemove: 1,
				// 				id: gports.Guid,
				// 				// projectOpticalcableGuid: projectOpticalcableGuid,
				// 				position: {
				// 					x: $this.chidpositons.x + 250,
				// 					y: $this.chidpositons.y -202 + (n-1)*40
				// 				},
				// 				size: {
				// 					width: 10,
				// 					height: 10
				// 				},
				// 				attrs: {
				// 					text: {
				// 						// text: `${gppdata.OdfboxName}-${gppdata.ProodfName}-${gppdata.ProportName}`,
				// 						text: gports[l].Guid,
				// 						'font-size': 9,
				// 						stroke: '',
				// 						fill: '#306796',
				// 						'ref-y': -10
				// 					},
				// 					rect: {
				// 						width: 13,
				// 						height: 13,
				// 						rx: 13,
				// 						ry: 13,
				// 						fill: '#306796'
				// 					}
				// 				}
				// 			});
				// 			ChildArrays[l] = getGport;
				// 			ChildArrays[l].addTo(window.tbgraph);
				// 		}
				// 	}
				// }
			}
			if (data.length === 1) {
				this.attributes.size.height -= 20;
			}
			this.runder(ChildArray); //调用了上面的runder方法
			// this.runder(ChildArrays);
			// console.log(window.ppp,window.ppp.findViewByModel('111B'),'111B111B111B');
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