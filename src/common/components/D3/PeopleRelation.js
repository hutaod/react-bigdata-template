import React, {Component} from 'react';
import boy from './img/boy.png';
import girl from './img/girl.png';
import male from './img/male.png';
import female from './img/female.png';
import NoData from '../NoData/NoDataComponent'; //暂无数据组件
import { isObjectValueEqual } from '../../../utils'

const d3 = window.d3;
/**
 * 可接收参数
 * data  数据 格式为 { 
 *                      nodes: [{ "image": "", "role": "female", "name": "吴智蕾" }], 
 *                      edges:[{ "source": 0, "target": 1, "relation": "老师" }] 
 *                  }
 * height  设置高度
 * width   设置宽度
 * className  设置组件class样式
 * 
 */
class PeopleRelation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relationsId: 'relationsId',
        }
    }

    initData = (relationInfo) => {
        if(!relationInfo || !relationInfo.nodes || !relationInfo.edges){
            return;
        }
        let newNodes = [];
        relationInfo.nodes.forEach((unit) => {
            if (unit.role === "boy") {
                unit.image = boy;
                newNodes.push(unit);
            } else if (unit.role === "girl") {
                unit.image = girl;
                newNodes.push(unit);
            } else if (unit.role === "male") {
                unit.image = male;
                newNodes.push(unit);
            } else if (unit.role === "female") {
                unit.image = female;
                newNodes.push(unit);
            }
        })
        this.setRelationshipUI({
            nodes: newNodes,
            edges: relationInfo.edges
        });
    }

    setRelationshipUI = (data) => {
        const showWith = this.props.width || document.getElementById("root").clientWidth - 315;
        const {nodes, edges} = data;
        const relationsId = this.state.relationsId;
        let width = showWith;//设置宽度
        let height = this.props.height ||  800;//设置高度
        let img_w = 20;
        let img_h = 20;
        let radius = 20;    //圆形半径

        let svg = d3.select("#" + relationsId).append("svg")
            .attr("width", width)
            .attr("height", height);

        //D3力导向布局
        let force = d3.layout.force()
            .nodes(nodes)  //指定节点数组
            .links(edges)  //指定连线数据
            .size([width, height])  //指定作用域范围
            .linkDistance(200)  //指定连线长度
            .charge(-1500)  //相互之间的作用力
            .start();  //开始作用


        //边（添加连线）
        let edges_line = svg.selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke", "#ccc")
            .style("stroke-width", 1);

        //边上的文字（人物之间的关系）
        let edges_text = svg.selectAll(".linetext")
            .data(edges)
            .enter()
            .append("text")
            .attr("class", "linetext")
            .attr("style", "font-size: 12px")
            .text(function (d) {
                return d.relation;
            });


        // 圆形图片节点（人物头像）
        let nodes_img = svg.selectAll("image")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("class", "circleImg")
            .attr("r", radius)
            .attr("fill", function (d, i) {
                //创建圆形图片
                let defs = svg.append("defs").attr("id", "imgdefs")
                let catpattern = defs.append("pattern")
                    .attr("id", "catpattern" + i)
                    .attr("height", 1)
                    .attr("width", 1)
                catpattern.append("image")
                    .attr("x", -(img_w / 2 - radius))
                    .attr("y", -(img_h / 2 - radius))
                    .attr("width", img_w)
                    .attr("height", img_h)
                    .attr("xlink:href", d.image)
                return "url(#catpattern" + i + ")";
            }).call(force.drag);


        let text_dx = -20;
        let text_dy = 20;

        let nodes_text = svg.selectAll(".nodetext")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class", "nodetext")
            .attr("dx", text_dx)
            .attr("dy", text_dy)
            .text(function (d) {
                return d.name;
            });


        force.on("tick", function () {
            //限制结点的边界
            nodes.forEach(function (d, i) {
                // console.log('nodes');
                d.x = d.x - img_w / 2 < 0 ? img_w / 2 : d.x;
                d.x = d.x + img_w / 2 > width ? width - img_w / 2 : d.x;
                d.y = d.y - img_h / 2 < 0 ? img_h / 2 : d.y;
                d.y = d.y + img_h / 2 + text_dy > height ? height - img_h / 2 - text_dy : d.y;
            });

            //更新连接线的位置
            edges_line.attr("x1", function (d) {
                return d.source.x;
            });
            edges_line.attr("y1", function (d) {
                return d.source.y;
            });
            edges_line.attr("x2", function (d) {
                return d.target.x;
            });
            edges_line.attr("y2", function (d) {
                return d.target.y;
            });

            //更新连接线上文字的位置
            edges_text.attr("x", function (d) {
                return (d.source.x + d.target.x) / 2;
            });
            edges_text.attr("y", function (d) {
                return (d.source.y + d.target.y) / 2;
            });


            //更新结点图片和文字
            nodes_img.attr("cx", function (d) {
                return d.x
            });
            nodes_img.attr("cy", function (d) {
                return d.y
            });

            nodes_text.attr("x", function (d) {
                return d.x
            });
            nodes_text.attr("y", function (d) {
                return d.y + img_w / 2;
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && !isObjectValueEqual(nextProps.data,this.props.data)) {
            setTimeout(() => {
                this.initData(nextProps.data)
            },50)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (isObjectValueEqual(nextProps.data,this.props.data)) {
            return false;
        } else {
            return true;
        }
    }

    componentDidMount(){
        if(this.props.data && this.props.data.nodes.length > 0 && this.props.data.edges.length > 0){
            this.initData(this.props.data)
        }
    }

    render() {
        if (!this.props.data || this.props.data.nodes.length <= 0 || this.props.data.edges.length <= 0) {
			return (
                <div style={{ backgroundColor: '#fff' }}><NoData data={'nodata'} height={this.props.height}/></div>
            )
		} else{
			return (
				<div id={this.state.relationsId} className={this.props.className}></div>
			)
		}
    }
}

export default PeopleRelation;

// 数据格式
// const relationInfo = {
//     "nodes": [
//         { "image": "", "role": "female", "name": "吴智蕾" },
//         { "image": "", "role": "male", "name": "季刚波" },
//         { "image": "", "role": "male", "name": "傅欣" },
//         { "image": "", "role": "female", "name": "王潘潘" },
//         { "image": "", "role": "female", "name": "张旭" },
//         { "image": "", "role": "male", "name": "赵海晶" }
//     ],
//     "edges": [
//         { "source": 0, "target": 1, "relation": "老师" },
//         { "source": 0, "target": 2, "relation": "老师" },
//         { "source": 0, "target": 3, "relation": "老师" },
//         { "source": 0, "target": 4, "relation": "老师" },
//         { "source": 0, "target": 5, "relation": "老师" }
//     ]
// }