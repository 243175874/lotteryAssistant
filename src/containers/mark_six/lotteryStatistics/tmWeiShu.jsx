import React, { Component } from "react";
import { Toast, ActivityIndicator } from 'antd-mobile'
import { post } from '../../../fetch/post.js';
import Prompt from '../../../components/dialog/prompt'
// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/pie';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

const weishu = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
export default class TmWeiShu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            periods: 100,//期数
            tab: "hot",//hot and cold 
            recordList: []
        };
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    componentDidMount() {
        this.getLotteryRecordList(this.state.periods);
    }

    createChart(Chart, attribute, data, dataAmount) {
        Chart.setOption({
            legend: {
                bottom: 10,
                width: "338px",
                icon: "square",
                left: 'center',
                borderWidth: 1,
                borderColor: "#EAF0F4",
                padding: 8,
                data: attribute,
                formatter: function (name) {
                    let target;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name === name) {
                            target = data[i].value
                        }
                    }
                    let blank = target > 9 ? "" : "  ";
                    let arr = [` ${name} ${blank} ${target}`]
                    return arr;
                },
            },
            series: [
                {
                    type: 'pie',
                    radius: ['35%', '50%'], //第一个值控制空心圆大小 第二个值控制外圆大小
                    center: ['50%', '40%'],
                    data: data,
                    label: {
                        normal: {
                            formatter: function (o) {
                                let percentage = (Number(o.data.value) / dataAmount) * 100;
                                return [`${o.data.name}(${o.data.value}次)`, `${percentage.toFixed(2)}% `].join("\n");
                            },
                            color: ["#43425D"],
                            textStyle: {
                                fontWeight: 500,
                                fontSize: 12    //文字的字体大小
                            },
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontWeight: 'bold'
                            },
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        normal: {
                            color: function (params) {
                                //自定义颜色
                                var colorList = ['#FFE700', '#2D99FF', '#E2D1C3', '#2CD9C5', '#A1C4FD', '#EACDA3', '#868F96', '#00CDAC', '#F24E61', '#826AF9'];
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }
            ]
        });
    }

    //获取开奖记录
    getLotteryRecordList(period) {
        this.setState({ loading: true });
        post('/v1/api/lottery/statistics', { period }).then(data => {
            if (data.code == 200) {
                this.setState({ recordList: data.data });
                let list = this.handleRecordList(data.data);
                //热图
                let statistics = this.statisticsRecordList(list, weishu);
                this.createChart(echarts.init(document.getElementById('hot')), weishu, statistics, this.getAmountTime(statistics));

                //冷图
                let omit = this.statisticsOmitRecordList(list, weishu);
                this.createChart(echarts.init(document.getElementById('cold')), weishu, omit, this.getAmountTime(omit));
            }

            this.setState({ loading: false });
        });
    }

    //统计总次数
    getAmountTime(list) {
        let amount = 0;
        list.forEach((item) => {
            amount += Number(item.value)
        });
        return amount;
    }


    //计算出现的次数
    statisticsItem(item, number) {
        let num = 0;
        item.forEach(Element => {
            if (Element == number) {
                num++;
            }
        })
        return num;
    }

    //循环统计当前遗漏最多的
    statisticsOmitRecordList(recordList, dataDictionary) {
        let list = [];
        dataDictionary.forEach(item => {
            let flag = false;
            for (let index = 0; index < recordList.length; index++) {
                const element = recordList[index];
                if (element.indexOf(item) != -1) {
                    flag = true;
                    list.push({ "name": item, "value": index });
                    break;
                }
            }
            if (!flag) {
                list.push({ "name": item, "value": recordList.length });
            }
        });
        return list;
    }

    //循环统计并且排序
    statisticsRecordList(recordList, dataDictionary) {
        let list = [];
        dataDictionary.forEach((item) => {
            let amount = 0;
            recordList.forEach(Element => {
                amount += this.statisticsItem(Element, item);
            })
            list.push({ "name": item, "value": amount });
        })
        return list;
    }

    //处理记录数据
    handleRecordList(data) {
        let list = [];
        data.forEach(item => {
            list.push(item.ws.slice(6, 7));    //开奖特码波色
        });
        return list;
    }

    //选择期数
    promptCallback(value) {
        if (value >= 10) {
            this.setState({ periods: value });
            this.getLotteryRecordList(value);
        } else {
            Toast.info('期数必须大于10', 3, null, false);
        }
    }

    render() {
        return (
            <div className="wh100">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <Prompt value={this.state.periods} callback={this.promptCallback.bind(this)} ref="prompt" title={"请输入期数"}></Prompt>
                <div className="w100" style={{ height: "36px", borderBottom: "1px solid #EDEDED" }}>
                    <div style={{ width: "160px", height: "35px", margin: "0 auto" }}>
                        <div className="w50 h100 fl flex-center" onClick={() => { this.setState({ tab: "hot" }) }}>
                            <div className="fl h100">
                                <div className="flex-center"
                                    style={{
                                        width: "35px", height: "30px", fontSize: "13px",
                                        letterSpacing: "1px", color: this.state.tab == "hot" ? "#ff7344" : "#333333"
                                    }}>
                                    热图
                        </div>
                                <div style={{ width: "35px", height: "3px", background: "#ff7344", display: this.state.tab == "hot" ? "block" : "none" }}></div>
                            </div>
                        </div>

                        <div className="w50 h100 fr flex-center" onClick={() => { this.setState({ tab: "cold" }) }}>
                            <div className="fr h100">
                                <div className="flex-center" style={{
                                    width: "35px", height: "30px", fontSize: "13px",
                                    letterSpacing: "1px", letterSpacing: "1px", color: this.state.tab == "cold" ? "#ff7344" : "#333333"
                                }}>冷图</div>
                                <div style={{ width: "35px", height: "3px", background: "#ff7344", display: this.state.tab == "cold" ? "block" : "none" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w100" style={{ marginTop: "10px" }}>
                    <div className="flex-center" style={{ height: "30px", fontSize: "14px" }}>当前统计的期数：
                    <div className="flex-center"
                            onClick={() => { this.refs.prompt.setState({ isShow: true }) }}
                            style={{
                                boxSizing: "border-box", width: "13.5%", height: "22px", fontSize: "13px",
                                borderRadius: "3px", color: "#999999", border: "1px solid #999999"
                            }}>{this.state.periods}</div>
                    </div>
                </div>

                <div className="w100 pr" style={{ height: "450px" }}>
                    <div style={{ left: "0", top: "0", zIndex: this.state.tab == "hot" ? "1" : "0", background: "#f5f5f9" }} className="wh100 pa">
                        <div className="wh100" id="hot"></div>
                    </div>
                    <div style={{ left: "0", top: "0", zIndex: this.state.tab == "cold" ? "1" : "0", background: "#f5f5f9" }} className="wh100 pa">
                        <div className="wh100" id="cold"></div>
                    </div>
                </div>
                <div className="flex-center w100 clearfix" style={{ fontSize: "12px" }}>
                    <p style={{ display: this.state.tab == "hot" ? "block" : "none" }}>出现次数（所选期数范围内出现的次数）</p>
                    <p style={{ display: this.state.tab == "cold" ? "block" : "none" }}>遗漏期数（所选期数范围内遗漏的期数）</p>
                </div>
            </div >
        );
    }
}
