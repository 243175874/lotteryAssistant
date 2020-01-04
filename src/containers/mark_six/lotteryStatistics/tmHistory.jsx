import React, { Component } from "react";
import { Toast, ActivityIndicator } from 'antd-mobile'
import { post } from '../../../fetch/post.js';
import Prompt from '../../../components/dialog/prompt'
import * as echarts from 'echarts';

const number = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49"];
export default class TmHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            periods: 100,//期数
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

    createChart(Chart, xAxis, data, areaStyle = {}) {
        Chart.setOption({
            xAxis: {
                data: xAxis
            },
            yAxis: {},
            series: [{
                type: 'line',
                areaStyle: areaStyle,
                data: data
            }],
        });
    }

    //获取开奖记录
    getLotteryRecordList(period) {
        this.setState({ loading: true });
        post('/v1/api/lottery/statistics', { period }).then(data => {
            if (data.code == 200) {
                // data = data.data.sort((a, b) => b.action - a.action);   //排序
                this.setState({ recordList: data.data });
                let list = this.handleRecordList(data.data);
                // //热图
                let statistics = this.statisticsRecordList(list, number);
                let hot_xAxis = this.getAxis(statistics, "attribute");
                let hot_data = this.getAxis(statistics, "amount");
                const hot_style = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#FF4800' },
                                { offset: 0.5, color: 'red' },
                                { offset: 1, color: '#ddd' }
                            ]
                        )
                    }
                };
                // console.log(hot_xAxis);
                // console.log(hot_data);
                this.createChart(echarts.init(document.getElementById('hot')), hot_xAxis, hot_data, hot_style);
                //冷图
                let omit = this.statisticsOmitRecordList(list, number);
                let cold_xAxis = this.getAxis(omit, "attribute");
                let cold_data = this.getAxis(omit, "amount");
                const cold_style = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#3C96C3' },
                                { offset: 0.5, color: '#3C96C3' },
                                { offset: 1, color: '#ddd' }
                            ]
                        )
                    }
                };
                this.createChart(echarts.init(document.getElementById('cold'), { color: ["#3C96C3", "#3C96C3"] }), cold_xAxis, cold_data, cold_style);
            }
            this.setState({ loading: false });
        });
    }

    getAxis(data, attribute) {
        let list = [];
        data.forEach(item => {
            list.push(item[attribute]);
        });
        return list;
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
                    list.push({ "attribute": item, "amount": index });
                    break;
                }
            }
            if (!flag) {
                list.push({ "attribute": item, "amount": recordList.length });
            }
        });
        return list.sort((a, b) => a.amount - b.amount);
    }

    //循环统计并且排序
    statisticsRecordList(recordList, dataDictionary) {
        let list = [];
        dataDictionary.forEach((item) => {
            let amount = 0;
            recordList.forEach(Element => {
                amount += this.statisticsItem(Element, item);
            })
            list.push({ "attribute": item, "amount": amount });
        })
        console.log(list);
        return list.sort((a, b) => b.amount - a.amount);
    }

    //处理记录数据
    handleRecordList(data) {
        let list = [];
        data.forEach(item => {
            list.push(item.numbers.slice(6, 7));//开奖特码号码
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
                <div className="w100">
                    <div className="flex-center" style={{ height: "30px", fontSize: "14px" }}>当前统计的期数：
                    <div className="flex-center"
                            onClick={() => { this.refs.prompt.setState({ isShow: true }) }}
                            style={{
                                boxSizing: "border-box", width: "13.5%", height: "22px", fontSize: "13px",
                                borderRadius: "3px", color: "#999999", border: "1px solid #999999"
                            }}>{this.state.periods}</div>
                    </div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 35px)" }}>
                    <div className="w100 pr" style={{ height: "50%" }}>
                        <div className="pa flex" style={{ top: "10px", left: "20px", height: "15px" }}>
                            <img style={{ width: "15px" }} src="../../../assets/img/mark_six/ico_count_3.png" />
                            <div style={{ marginLeft: "10px", fontSize: "13px" }}>特码历史热图（所选期数范围内出现的次数）</div>
                        </div>
                        <div className="wh100" id="hot"></div>
                    </div>

                    <div className="w100 pr" style={{ height: "50%" }}>
                        <div className="pa flex" style={{ top: "10px", left: "20px", height: "15px" }}>
                            <img style={{ width: "15px" }} src="../../../assets/img/mark_six/ico_count_4.png" />
                            <div style={{ marginLeft: "10px", fontSize: "13px" }}>特码历史冷图（所选期数范围内遗漏的次数）</div>
                        </div>
                        <div className="wh100" id="cold"></div>
                    </div>
                </div>
            </div>
        );
    }
}
