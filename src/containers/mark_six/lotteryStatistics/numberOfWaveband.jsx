import React, { Component } from "react";
import { Toast, ActivityIndicator } from 'antd-mobile'
import { post } from '../../../fetch/post.js';
import Prompt from '../../../components/dialog/prompt'
import * as echarts from 'echarts';
const number1 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
const number2 = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
const number3 = ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];
const number4 = ["31", "32", "33", "34", "35", "36", "37", "38", "39", "40"];
const number5 = ["41", "42", "43", "44", "45", "46", "47", "48", "49"];
export default class NumberOfWaveband extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            periods: 100,//期数
            tab: "tm",//tm正码  zm正码 
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
                    let span = name == '1-10' ? "  " : "";
                    let blank = target > 9 ? "" : "  ";
                    let arr = [` ${name} ${span} ${blank} ${target}`]
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
                                var colorList = [
                                    '#826AF9', '#FFE700', '#2D99FF', '#E2D1C3', '#2CD9C5',
                                    '#A1C4FD', '#EACDA3', '#868F96', '#00CDAC', '#C2E9FB',
                                    '#96E6A1', '#FF9A9E'
                                ];
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
                let attribute = ["1-10", "11-20", "21-30", "31-40", "41-49"];
                let tm_list = this.handleRecordList(data.data, 6, 7);
                let tm_omit1 = this.statisticsOmitRecordList(tm_list, number1, '1-10');
                let tm_omit2 = this.statisticsOmitRecordList(tm_list, number2, '11-20');
                let tm_omit3 = this.statisticsOmitRecordList(tm_list, number3, '21-30');
                let tm_omit4 = this.statisticsOmitRecordList(tm_list, number4, '31-40');
                let tm_omit5 = this.statisticsOmitRecordList(tm_list, number5, '41-49');
                let tm_omit = tm_omit1.concat(tm_omit2, tm_omit3, tm_omit4, tm_omit5);
                //特码

                this.createChart(echarts.init(document.getElementById('tm_pie_chart')), attribute, tm_omit, this.getAmountTime(tm_omit));

                //正码
                let zm_list = this.handleRecordList(data.data, 0, 6);
                let zm_omit1 = this.statisticsOmitRecordList(zm_list, number1, '1-10');
                let zm_omit2 = this.statisticsOmitRecordList(zm_list, number2, '11-20');
                let zm_omit3 = this.statisticsOmitRecordList(zm_list, number3, '21-30');
                let zm_omit4 = this.statisticsOmitRecordList(zm_list, number4, '31-40');
                let zm_omit5 = this.statisticsOmitRecordList(zm_list, number5, '41-49');
                let zm_omit = zm_omit1.concat(zm_omit2, zm_omit3, zm_omit4, zm_omit5);
                //特码
                this.createChart(echarts.init(document.getElementById('zm_pie_chart')), attribute, zm_omit, this.getAmountTime(zm_omit));
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

    //循环统计当前遗漏最多的
    statisticsOmitRecordList(recordList, dataDictionary, attribute) {
        let list = [];
        let flag = false;
        for (let index = 0; index < recordList.length; index++) {
            const element = recordList[index];
            if (this.statisticsRecordItem(element, dataDictionary)) {
                flag = true;
                list.push({ "name": attribute, "value": index });
                break;
            }
        }

        if (!flag) {
            list.push({ "name": attribute, "value": recordList.length });
        }
        return list;
    }

    //循环统计
    statisticsRecordItem(recordItem, dataDictionary) {
        let flag = false;
        for (let index = 0; index < recordItem.length; index++) {
            const element = recordItem[index];
            for (let j = 0; j < dataDictionary.length; j++) {
                const element2 = dataDictionary[j];
                if (element == element2) {
                    flag = true;
                    break;
                }

            }
        }
        return flag;
    }

    //处理记录数据
    handleRecordList(data, start, end) {
        let list = [];
        data.forEach(item => {
            list.push(item.numbers.slice(start, end));
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
                        <div className="w50 h100 fl flex-center" onClick={() => { this.setState({ tab: "tm" }) }}>
                            <div className="fl h100">
                                <div className="flex-center"
                                    style={{
                                        width: "35px", height: "30px", fontSize: "13px",
                                        letterSpacing: "1px", color: this.state.tab == "tm" ? "#ff7344" : "#333333"
                                    }}>
                                    特码
                        </div>
                                <div style={{ width: "35px", height: "3px", background: "#ff7344", display: this.state.tab == "tm" ? "block" : "none" }}></div>
                            </div>
                        </div>

                        <div className="w50 h100 fr flex-center" onClick={() => { this.setState({ tab: "zm" }) }}>
                            <div className="fr h100">
                                <div className="flex-center" style={{
                                    width: "35px", height: "30px", fontSize: "13px",
                                    letterSpacing: "1px", letterSpacing: "1px", color: this.state.tab == "zm" ? "#ff7344" : "#333333"
                                }}>正码</div>
                                <div style={{ width: "35px", height: "3px", background: "#ff7344", display: this.state.tab == "zm" ? "block" : "none" }}></div>
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
                    <div style={{ left: "0", top: "0", zIndex: this.state.tab == "tm" ? "1" : "0", background: "#f5f5f9" }} className="wh100 pa">
                        <div className="wh100" id="tm_pie_chart"></div>
                    </div>
                    <div style={{ left: "0", top: "0", zIndex: this.state.tab == "zm" ? "1" : "0", background: "#f5f5f9" }} className="wh100 pa">
                        <div className="wh100" id="zm_pie_chart"></div>
                    </div>
                </div>
                <div className="flex-center w100 clearfix" style={{ fontSize: "12px" }}>
                    <p style={{ display: this.state.tab == "tm" ? "block" : "none" }}>遗漏期数（所选期数范围内遗漏的期数）</p>
                    <p style={{ display: this.state.tab == "zm" ? "block" : "none" }}>遗漏期数（所选期数范围内遗漏的期数）</p>
                </div>
            </div >
        );
    }
}
