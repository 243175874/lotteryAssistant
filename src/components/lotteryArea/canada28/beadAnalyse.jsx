import React, { Component } from "react";
import LotteryAPI from '../../../assets/js/lotteryAPI'
import emitter from '../../../assets/js/events'
import { ActivityIndicator, Toast } from 'antd-mobile';
import Common from '../../../assets/js/common'
import { connect } from 'react-redux'
import { setCurrentPeriods } from '../../../redux/action'
@connect(
    state => ({ currentPeriods: state.currentPeriods }),
    { setCurrentPeriods }
)
export default class BeadAnalyse extends Component {
    constructor(props) {
        super(props);
        this.emitter = null;
        this.state = {
            loading: false,
            tab: "总和",

            bigAndSmallList: [],//总和大小
            sumBig: 0,//总和 大
            sumSmall: 0,//总和 小 

            oddAndEvenList: [],//总和单双
            sumodd: 0,//总和 单
            sumeven: 0,//总和 双 

            sumColorList: [], //总和波色
            sumRed: 0, //红波
            sumGreen: 0,//绿波
            sumBlue: 0,//蓝波
            sumGrey: 0, //灰波
        };
    }

    componentWillReceiveProps(nextProps) {
        //获取历史数据
        this.getHistoryService(nextProps.id, this.props.currentPeriods);
    }

    componentWillMount() {
        //获取历史数据
        this.getHistoryService(this.props.id, this.props.currentPeriods);
    }

    componentDidMount() {
        //根据改变的期数，加载相应的数据
        this.emitter = emitter.on("emitChangeNumber", this.listenerCallback);
    }

    listenerCallback = () => {
        setTimeout(() => {
            //获取历史数据
            this.getHistoryService(this.props.id, this.props.currentPeriods);
        }, 500);
    }

    componentWillUnmount() {
        this.emitter.removeListener("emitChangeNumber", this.listenerCallback)
    }

    //获取历史开奖数据
    getHistoryService(id, number) {
        this.setState({ loading: true });
        LotteryAPI.getHistoryService(id, number).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                data = data.data;
                //总和大小统计
                let dataList = Common.statisticsList(data, this.returnSumBigAndSmall);
                let big = Common.statistics(dataList, "大");
                let small = Common.statistics(dataList, "小");
                this.setState({ bigAndSmallList: dataList, sumBig: big, sumSmall: small });

                //总和单双统计
                let oddEvenDataList = Common.statisticsList(data, this.returnSumOddEven);
                let odd = Common.statistics(oddEvenDataList, "单");
                let even = Common.statistics(oddEvenDataList, "双");
                this.setState({ oddAndEvenList: oddEvenDataList, sumodd: odd, sumeven: even });

                //总和波色
                let sumColorList = Common.statisticsList(data, this.returnColor);
                let sumRed = Common.statistics(sumColorList, "红");
                let sumGreen = Common.statistics(sumColorList, "绿");
                let sumBlue = Common.statistics(sumColorList, "蓝");
                let sumGrey = Common.statistics(sumColorList, "灰");
                this.setState({ sumColorList, sumRed, sumGreen, sumBlue, sumGrey });

            }

        })
    }

    // //统计
    // statisticsList(list, reutrnValue, number, number2 = 0) {
    //     let last = "";
    //     let arr = [];
    //     list.forEach(item => {
    //         let current = reutrnValue(item.kj_data, number, number2);
    //         if (last == "") {
    //             arr.push([current]);
    //         } else if (last == current) {
    //             arr[arr.length - 1].push(current);
    //         } else {
    //             arr.push([current]);
    //         }
    //         last = current;
    //     });
    //     return arr;
    // }

    // //统计数量
    // statistics(list, str) {
    //     let sum = 0;
    //     list.forEach(item => {
    //         item.forEach(element => {
    //             if (element == str) {
    //                 sum++;
    //             }
    //         });
    //     });
    //     return sum;
    // }

    //统计总和大小
    returnSumBigAndSmall(kj) {
        let sum = Number(kj[0]) + Number(kj[1]) + Number(kj[2]);
        if (sum >= 14) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计总和单双
    returnSumOddEven(kj) {
        let sum = Number(kj[0]) + Number(kj[1]) + Number(kj[2]);
        if (sum % 2 == 0) {
            return "双"
        } else {
            return "单"
        }
    }

    //统计波色
    returnColor(kj) {
        //console.log(kj);
        let sum = Number(kj[0]) + Number(kj[1]) + Number(kj[2]);
        let redNumber = [3, 6, 9, 12, 15, 18, 21, 24];
        let greenNumber = [1, 4, 7, 10, 16, 19, 22, 25];
        let blueNumber = [2, 5, 8, 10, 11, 17, 20, 23, 26];
        let greyNumber = [13];
        if (redNumber.indexOf(sum) !== -1) {
            //console.log(sum)
            return "红"
        } else if (greenNumber.indexOf(sum) !== -1) {
            return "绿"
        } else if (blueNumber.indexOf(sum) !== -1) {
            return "蓝"
        } else if (greyNumber.indexOf(sum) !== -1) {
            return "灰"
        }
    }

    //总和大小
    renderBigSmallView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "150px" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "吃" ? "green" : element == "大" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }

    //总和单双
    renderOddEvenView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "150px" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "单" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }

    renderColorView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "150px" }}>
                    {item.map((element, i) => {
                        let color = "red";
                        if (element == "红") {
                            color = "red";
                        } else if (element == "绿") {
                            color = "green";
                        } else if (element == "蓝") {
                            color = "blue";
                        } else if (element == "灰") {
                            color = "orange";
                        }
                        return <div style={{ width: "25px", height: "25px", color: color }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }


    //渲染露珠头部
    renderHeaderView(name, title1, number1, title2, number2) {
        return (
            <div className="w100 flex align-item-center" style={{ height: "30px", background: '#f5f5f9' }}>
                &nbsp;&nbsp;【{name}】&nbsp;&nbsp;最近{this.props.currentPeriods}期统计：{title1}<span style={{ color: "red" }}>({number1})</span>
                &nbsp;{title2}<span style={{ color: "blue" }}>({number2})</span>
            </div>
        )
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "40px" }}>
                    <div className="h100 flex" style={{ flexDirection: "row", width: "150px" }}>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "总和" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>总和</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "总和" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "波色" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>波色</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "波色" ? "block" : "none" }}></div>
                        </div>
                    </div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "总和" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('总和大小', '大', this.state.sumBig, '小', this.state.sumSmall)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.bigAndSmallList.length * 25 }}>
                            {this.renderBigSmallView(this.state.bigAndSmallList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('总和单双', '单', this.state.sumodd, '双', this.state.sumeven)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.oddAndEvenList.length * 25 }}>
                            {this.renderOddEvenView(this.state.oddAndEvenList)}
                        </div>
                    </div>
                </div>

                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "波色" ? "block" : "none" }}>
                    <div className="w100 flex align-item-center" style={{ height: "30px", background: '#f5f5f9' }}>
                        &nbsp;&nbsp;总和波色&nbsp;&nbsp;最近{this.props.currentPeriods}期统计：
                        红<span style={{ color: "red" }}>({this.state.sumRed})</span>&nbsp;
                        蓝<span style={{ color: "blue" }}>({this.state.sumGreen})</span>&nbsp;
                        绿<span style={{ color: "green" }}>({this.state.sumBlue})</span>&nbsp;
                        灰<span style={{ color: "orange" }}>({this.state.sumGrey})</span>&nbsp;
                    </div>
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.sumColorList.length * 25 }}>
                            {this.renderColorView(this.state.sumColorList)}
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}