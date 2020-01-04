import React, { Component } from "react";
import { Toast, ActivityIndicator } from 'antd-mobile'
import { post } from '../../../fetch/post.js';
import Prompt from '../../../components/dialog/prompt'
import * as echarts from 'echarts';

const enumerate = ["大", "小", "单", "双", "合单", "合双", "尾大", "尾小"];
export default class tmTwoSides extends Component {
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
                type: 'bar',
                itemStyle: areaStyle,
                data: data,
                barWidth: 20 //柱子的大小
            }]
        });
    }

    //获取开奖记录
    getLotteryRecordList(period) {
        this.setState({ loading: true });
        post('/v1/api/lottery/statistics', { period }).then(data => {
            if (data.code == 200) {
                this.setState({ recordList: data.data });
                //号码 大小 单双 尾数 数组
                let { number, daxiao, danshuang, weishu } = this.handleRecordList(data.data);

                //合单 合双
                let { singular, even } = this.statisticsSingularAndEven(number);
                //尾大 尾小
                let weishuBigAndSmall = this.statisticsWeiShuBigAndSmall(weishu);
                //大小个数统计
                let { big, small } = this.statisticsNumberBigAndSmall(daxiao);
                //单双个数统计
                let numberSingularAndEven = this.statisticsNumberSingularAndEven(danshuang);

                let barData = [big, small, numberSingularAndEven.singular, numberSingularAndEven.even, singular, even,
                    weishuBigAndSmall.big, weishuBigAndSmall.small];
                const bar_style = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#00EDCE' },
                                { offset: 1, color: '#02CBF9' }
                            ]
                        ),
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: 'black'
                            }
                        }
                    }
                };
                this.createChart(echarts.init(document.getElementById('canvas')), enumerate, barData, bar_style);
            }
            this.setState({ loading: false });
        });
    }

    //统计单双
    statisticsNumberSingularAndEven(list) {
        let singular = 0;
        let even = 0;
        list.forEach(item => {
            item.forEach(element => {
                if (element == "单") {
                    singular++
                } else {
                    even++
                }
            });

        });
        return { singular, even };
    }


    //统计合单合双
    statisticsSingularAndEven(list) {
        let singular = 0;
        let even = 0;
        list.forEach(item => {
            item.forEach(element => {
                let numbers = element.split("");
                let num = Number(numbers[0]) + Number(numbers[1]);
                if (Number(num) % 2) {
                    singular++;
                } else {
                    even++;
                }
            });

        });
        return { singular, even };
    }

    //统计号码大小
    statisticsNumberBigAndSmall(list) {
        let big = [];
        let small = [];
        list.forEach(item => {
            item.forEach(element => {
                if (element == "大") {
                    big++
                } else {
                    small++
                }
            });

        });
        return { big, small }
    }

    //统计尾数大小
    statisticsWeiShuBigAndSmall(list) {
        let big = [];
        let small = [];
        list.forEach(item => {
            item.forEach(element => {
                let number = Number(element);
                if (number >= 5) {
                    big++
                } else {
                    small++
                }
            });
        });
        return { big, small }
    }


    //处理记录数据
    handleRecordList(data) {
        let number = [];//号码
        let daxiao = [];//大小
        let danshuang = [];//单双
        let weishu = [];//尾数
        data.forEach(item => {
            number.push(item.numbers.slice(6, 7));//开奖特码号码
            daxiao.push(item.dx.slice(6, 7));//开奖大小
            danshuang.push(item.ds.slice(6, 7));//开奖单双
            weishu.push(item.ws.slice(6, 7));//开奖尾数
        });
        return { number, daxiao, danshuang, weishu };
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
                <div className="w100" style={{ paddingTop: "20px" }}>
                    <div className="flex-center" style={{ height: "30px", fontSize: "14px" }}>当前统计的期数：
                    <div className="flex-center"
                            onClick={() => { this.refs.prompt.setState({ isShow: true }) }}
                            style={{
                                boxSizing: "border-box", width: "13.5%", height: "22px", fontSize: "13px",
                                borderRadius: "3px", color: "#999999", border: "1px solid #999999"
                            }}>{this.state.periods}</div>
                    </div>
                </div>
                <div className="w100" style={{ height: "340px" }} id="canvas"></div>
            </div>
        );
    }
}
