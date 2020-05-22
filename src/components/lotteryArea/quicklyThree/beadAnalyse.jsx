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
            bigAndSmallList: [],//总和大小
            sumBig: 0,//总和 大
            sumSmall: 0,//总和 小 
            oddAndEvenList: [],//总和单双
            sumodd: 0,//总和 单
            sumeven: 0,//总和 双 
            numberOneList: [],//号码1统计
            numberOneHave: 0,//号码1 出现的次数
            numberOneNoHave: 0,//号码1 没有出现的次数

            numberTwoList: [],//号码2统计
            numberTwoHave: 0,//号码2 出现的次数
            numberTwoNoHave: 0,//号码2 没有出现的次数

            numberThreeList: [],//号码3统计
            numberThreeHave: 0,//号码3 出现的次数
            numberThreeNoHave: 0,//号码3 没有出现的次数

            numberFourList: [],//号码4统计
            numberFourHave: 0,//号码4 出现的次数
            numberFourNoHave: 0,//号码4 没有出现的次数

            numberFiveList: [],//号码5统计
            numberFiveHave: 0,//号码5 出现的次数
            numberFiveNoHave: 0,//号码5 没有出现的次数

            numberSixList: [],//号码6统计
            numberSixHave: 0,//号码6 出现的次数
            numberSixNoHave: 0,//号码6 没有出现的次数
            tab: "总和"
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
                let dataList = Common.statisticsList(data, this.returnType);
                let big = Common.statistics(dataList, "大");
                let small = Common.statistics(dataList, "小");
                this.setState({ bigAndSmallList: dataList, sumBig: big, sumSmall: small });

                //总和单双统计
                let oddEvenDataList = Common.statisticsList(data, this.returnOddEven);
                let odd = Common.statistics(oddEvenDataList, "单");
                let even = Common.statistics(oddEvenDataList, "双");
                this.setState({ oddAndEvenList: oddEvenDataList, sumodd: odd, sumeven: even });

                //统计号码1
                let numberOneList = Common.statisticsList(data, this.returnIsHasNumber, '1');
                let numberOneHave = Common.statistics(numberOneList, "√");
                let numberOneNoHave = Common.statistics(numberOneList, "×");
                this.setState({ numberOneList, numberOneHave, numberOneNoHave });

                //统计号码2
                let numberTwoList = Common.statisticsList(data, this.returnIsHasNumber, '2');
                let numberTwoHave = Common.statistics(numberTwoList, "√");
                let numberTwoNoHave = Common.statistics(numberTwoList, "×");
                this.setState({ numberTwoList, numberTwoHave, numberTwoNoHave });

                //统计号码3
                let numberThreeList = Common.statisticsList(data, this.returnIsHasNumber, '3');
                let numberThreeHave = Common.statistics(numberThreeList, "√");
                let numberThreeNoHave = Common.statistics(numberThreeList, "×");
                this.setState({ numberThreeList, numberThreeHave, numberThreeNoHave });

                //统计号码4
                let numberFourList = Common.statisticsList(data, this.returnIsHasNumber, '4');
                let numberFourHave = Common.statistics(numberFourList, "√");
                let numberFourNoHave = Common.statistics(numberFourList, "×");
                this.setState({ numberFourList, numberFourHave, numberFourNoHave });

                //统计号码5
                let numberFiveList = Common.statisticsList(data, this.returnIsHasNumber, '5');
                let numberFiveHave = Common.statistics(numberFiveList, "√");
                let numberFiveNoHave = Common.statistics(numberFiveList, "×");
                this.setState({ numberFiveList, numberFiveHave, numberFiveNoHave });

                //统计号码6
                let numberSixList = Common.statisticsList(data, this.returnIsHasNumber, '6');
                let numberSixHave = Common.statistics(numberSixList, "√");
                let numberSixNoHave = Common.statistics(numberSixList, "×");
                this.setState({ numberSixList, numberSixHave, numberSixNoHave });
            } else {
                this.setState({ bigAndSmallList: [], oddAndEvenList: [] });
            }
        })
    }


    //统计
    // statisticsList(list, reutrnValue, number) {
    //     let last = "";
    //     let arr = [];
    //     list.forEach(item => {
    //         let current = reutrnValue(item.kj_data, number);
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

    //统计大小
    returnType(kj) {
        let sum = Number(kj[0]) + Number(kj[1]) + Number(kj[2]);
        if (kj[0] == kj[1] == kj[2]) {
            return "吃"
        } else if (sum > 10) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计单双
    returnOddEven(kj) {
        let sum = Number(kj[0]) + Number(kj[1]) + Number(kj[2]);
        if (sum % 2 == 0) {
            return "双"
        } else {
            return "单"
        }
    }

    //统计数字
    returnIsHasNumber(kj, number) {
        if (kj.indexOf(number) !== -1) {
            return "√"
        } else {
            return "×"
        }
    }

    //总和大小
    renderSumBigSmallView() {
        return this.state.bigAndSmallList.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "吃" ? "green" : element == "大" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }

    //总和单双
    renderSumOddEvenView() {
        return this.state.oddAndEvenList.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "单" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }

    //号码
    renderNumberView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", fontWeight: "700", color: element == "√" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }


    //渲染没个露珠头部
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
                    <div className="h100 flex" style={{ width: "150px", flexDirection: "row" }}>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "总和" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>总和</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "总和" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "号码" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>号码</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "号码" ? "block" : "none" }}></div>
                        </div>
                    </div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "总和" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('总和大小', '大', this.state.sumBig, '小', this.state.sumSmall)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.bigAndSmallList.length * 25 }}>
                            {this.renderSumBigSmallView()}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('总和单双', '单', this.state.sumodd, '双', this.state.sumeven)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.oddAndEvenList.length * 25 }}>
                            {this.renderSumOddEvenView()}
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "号码" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('号码1', '总来', this.state.numberOneHave, '没来', this.state.numberOneNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberOneList.length * 25 }}>
                            {this.renderNumberView(this.state.numberOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('号码2', '总来', this.state.numberTwoHave, '没来', this.state.numberTwoNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberTwoList.length * 25 }}>
                            {this.renderNumberView(this.state.numberTwoList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('号码3', '总来', this.state.numberThreeHave, '没来', this.state.numberThreeNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberThreeList.length * 25 }}>
                            {this.renderNumberView(this.state.numberThreeList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('号码4', '总来', this.state.numberFourHave, '没来', this.state.numberFourNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberFourList.length * 25 }}>
                            {this.renderNumberView(this.state.numberFourList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('号码5', '总来', this.state.numberFiveHave, '没来', this.state.numberFiveNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberFiveList.length * 25 }}>
                            {this.renderNumberView(this.state.numberFiveList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('号码6', '总来', this.state.numberSixHave, '没来', this.state.numberSixNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberSixList.length * 25 }}>
                            {this.renderNumberView(this.state.numberSixList)}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}