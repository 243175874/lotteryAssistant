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

            dragonAndTigerList: [], //冠军龙虎
            dragon: 0,  //龙出现的次数
            tiger: 0,   //虎出现的次数
            dogfall: 0, //和出现得次数

            numberZeroList: [],//号码0统计
            numberZeroHave: 0,//号码0 出现的次数
            numberZeroNoHave: 0,//号码0 没有出现的次数

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

            numberSevenList: [],//号码7统计
            numberSevenHave: 0,//号码7 出现的次数
            numberSevenNoHave: 0,//号码7 没有出现的次数

            numberEightList: [],//号码8统计
            numberEightHave: 0,//号码8 出现的次数
            numberEightNoHave: 0,//号码8 没有出现的次数

            numberNineList: [],//号码9统计
            numberNineHave: 0,//号码9 出现的次数
            numberNineNoHave: 0,//号码9 没有出现的次数

            dxOneList: [],  //第一球大小
            dxOneBig: 0,    //大出现的次数
            dxOneSmall: 0,  //小出现的次数

            dxTwoList: [],  //第二球大小
            dxTwoBig: 0,    //大出现的次数
            dxTwoSmall: 0,  //小出现的次数

            dxThreeList: [],  //第三球大小
            dxThreeBig: 0,    //大出现的次数
            dxThreeSmall: 0,  //小出现的次数

            dxFourList: [],  //第四球大小
            dxFourBig: 0,    //大出现的次数
            dxFourSmall: 0,  //小出现的次数

            dxFiveList: [],  //第五球大小
            dxFiveBig: 0,    //大出现的次数
            dxFiveSmall: 0,  //小出现的次数

            dsOneList: [],  //第一球单双
            dsOneOdd: 0,    //单出现的次数
            dsOneEven: 0,  //双出现的次数

            dsTwoList: [],  //第二球单双
            dsTwoOdd: 0,    //单出现的次数
            dsTwoEven: 0,  //双出现的次数

            dsThreeList: [],  //第三球单双
            dsThreeOdd: 0,    //单出现的次数
            dsThreeEven: 0,  //双出现的次数

            dsFourList: [],  //第四球单双
            dsFourOdd: 0,    //单出现的次数
            dsFourEven: 0,  //双出现的次数

            dsFiveList: [],  //第五球单双
            dsFiveOdd: 0,    //单出现的次数
            dsFiveEven: 0,  //双出现的次数

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

                let dragonAndTigerList = Common.statisticsList(data, this.returnDragonAndTiger, 0, 4);
                let dragon = Common.statistics(dragonAndTigerList, "龙");
                let tiger = Common.statistics(dragonAndTigerList, "虎");
                let dogfall = Common.statistics(dragonAndTigerList, "和");
                this.setState({ dragonAndTigerList, dragon, tiger, dogfall });

                //第一球大小
                let dxOneList = Common.statisticsList(data, this.returnBigAndSmall, 0);
                let dxOneBig = Common.statistics(dxOneList, "大");
                let dxOneSmall = Common.statistics(dxOneList, "小");
                this.setState({ dxOneList, dxOneBig, dxOneSmall });

                //第二球大小
                let dxTwoList = Common.statisticsList(data, this.returnBigAndSmall, 1);
                let dxTwoBig = Common.statistics(dxTwoList, "大");
                let dxTwoSmall = Common.statistics(dxTwoList, "小");
                this.setState({ dxTwoList, dxTwoBig, dxTwoSmall });

                //第三球大小
                let dxThreeList = Common.statisticsList(data, this.returnBigAndSmall, 2);
                let dxThreeBig = Common.statistics(dxThreeList, "大");
                let dxThreeSmall = Common.statistics(dxThreeList, "小");
                this.setState({ dxThreeList, dxThreeBig, dxThreeSmall });

                //第四球大小
                let dxFourList = Common.statisticsList(data, this.returnBigAndSmall, 3);
                let dxFourBig = Common.statistics(dxFourList, "大");
                let dxFourSmall = Common.statistics(dxFourList, "小");
                this.setState({ dxFourList, dxFourBig, dxFourSmall });

                //第五球大小
                let dxFiveList = Common.statisticsList(data, this.returnBigAndSmall, 4);
                let dxFiveBig = Common.statistics(dxFiveList, "大");
                let dxFiveSmall = Common.statistics(dxFiveList, "小");
                this.setState({ dxFiveList, dxFiveBig, dxFiveSmall });

                //第一球单双
                let dsOneList = Common.statisticsList(data, this.returnOddAndEven, 0);
                let dsOneOdd = Common.statistics(dsOneList, "单");
                let dsOneEven = Common.statistics(dsOneList, "双");
                this.setState({ dsOneList, dsOneOdd, dsOneEven });

                //第二球单双
                let dsTwoList = Common.statisticsList(data, this.returnOddAndEven, 1);
                let dsTwoOdd = Common.statistics(dsTwoList, "单");
                let dsTwoEven = Common.statistics(dsTwoList, "双");
                this.setState({ dsTwoList, dsTwoOdd, dsTwoEven });

                //第三球单双
                let dsThreeList = Common.statisticsList(data, this.returnOddAndEven, 2);
                let dsThreeOdd = Common.statistics(dsThreeList, "单");
                let dsThreeEven = Common.statistics(dsThreeList, "双");
                this.setState({ dsThreeList, dsThreeOdd, dsThreeEven });

                //第四球单双
                let dsFourList = Common.statisticsList(data, this.returnOddAndEven, 3);
                let dsFourOdd = Common.statistics(dsFourList, "单");
                let dsFourEven = Common.statistics(dsFourList, "双");
                this.setState({ dsFourList, dsFourOdd, dsFourEven });

                //第五球单双
                let dsFiveList = Common.statisticsList(data, this.returnOddAndEven, 4);
                let dsFiveOdd = Common.statistics(dsFiveList, "单");
                let dsFiveEven = Common.statistics(dsFiveList, "双");
                this.setState({ dsFiveList, dsFiveOdd, dsFiveEven });

                //统计号码0
                let numberZeroList = Common.statisticsList(data, this.returnIsHasNumber, '0');
                let numberZeroHave = Common.statistics(numberZeroList, "√");
                let numberZeroNoHave = Common.statistics(numberZeroList, "×");
                this.setState({ numberZeroList, numberZeroHave, numberZeroNoHave });

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

                //统计号码7
                let numberSevenList = Common.statisticsList(data, this.returnIsHasNumber, '7');
                let numberSevenHave = Common.statistics(numberSevenList, "√");
                let numberSevenNoHave = Common.statistics(numberSevenList, "×");
                this.setState({ numberSevenList, numberSevenHave, numberSevenNoHave });

                //统计号码8
                let numberEightList = Common.statisticsList(data, this.returnIsHasNumber, '8');
                let numberEightHave = Common.statistics(numberEightList, "√");
                let numberEightNoHave = Common.statistics(numberEightList, "×");
                this.setState({ numberEightList, numberEightHave, numberEightNoHave });

                //统计号码9
                let numberNineList = Common.statisticsList(data, this.returnIsHasNumber, '9');
                let numberNineHave = Common.statistics(numberNineList, "√");
                let numberNineNoHave = Common.statistics(numberNineList, "×");
                this.setState({ numberNineList, numberNineHave, numberNineNoHave });

            }

        })
    }

    //统计
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

    //统计龙虎
    returnDragonAndTiger(kj, index, index2) {
        if (kj[index] == kj[index2]) {
            return "和";
        } else if (Number(kj[index]) > Number(kj[index2])) {
            return "龙";
        } else {
            return "虎";
        }
    }

    //统计大小
    returnBigAndSmall(kj, index) {
        let number = Number(kj[index]);
        if (number >= 5) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计单双
    returnOddAndEven(kj, index) {
        let number = Number(kj[index]);
        if (number % 2 == 0) {
            return "双"
        } else {
            return "单"
        }
    }

    //统计总和大小
    returnSumBigAndSmall(kj) {
        let sum = Number(kj[0]) + Number(kj[1]) + Number(kj[2]) + Number(kj[3]) + Number(kj[4]);
        if (sum > 22) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计总和单双
    returnSumOddEven(kj) {
        let sum = Number(kj[0]) + Number(kj[1]) + Number(kj[2]) + Number(kj[3]) + Number(kj[4]);
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

    //龙虎
    renderDragonAndTigerView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "和" ? "green" : element == "龙" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
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

    //号码
    renderNumberView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "150px" }}>
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
                    <div className="wh100 flex" style={{ flexDirection: "row" }}>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "总和" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>总和</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "总和" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "龙虎" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>龙虎</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "龙虎" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "大小" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>大小</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "大小" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "单双" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>单双</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "单双" ? "block" : "none" }}></div>
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

                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "龙虎" ? "block" : "none" }}>
                    {/* header */}
                    <div className="w100 flex align-item-center" style={{ height: "30px", background: '#f5f5f9' }}>
                        &nbsp;&nbsp;【第一球龙虎】&nbsp;&nbsp;最近{this.props.currentPeriods}期统计：龙<span style={{ color: "red" }}>({this.state.dragon})</span>
                        &nbsp;虎<span style={{ color: "blue" }}>({this.state.tiger})</span>&nbsp;和<span style={{ color: "green" }}>({this.state.dogfall})</span>
                    </div>
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerList.length * 25 }}>
                            {this.renderDragonAndTigerView(this.state.dragonAndTigerList)}
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "大小" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一球大小', '大', this.state.dxOneBig, '小', this.state.dxOneSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxOneList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第二球大小', '大', this.state.dxTwoBig, '小', this.state.dxTwoSmall)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxTwoList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxTwoList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三球大小', '大', this.state.dxThreeBig, '小', this.state.dxThreeSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxThreeList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxThreeList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四球大小', '大', this.state.dxFourBig, '小', this.state.dxFourSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxFourList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxFourList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五球大小', '大', this.state.dxFiveBig, '小', this.state.dxFiveSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxFiveList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxFiveList)}
                        </div>
                    </div>
                </div>

                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "单双" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一球单双', '单', this.state.dsOneOdd, '双', this.state.dsOneEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsOneList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第二球单双', '单', this.state.dsTwoOdd, '双', this.state.dsTwoEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsTwoList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsTwoList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三球单双', '单', this.state.dsThreeOdd, '双', this.state.dsThreeEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsThreeList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsThreeList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四球单双', '单', this.state.dsFourOdd, '双', this.state.dsFourEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsFourList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsFourList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五球单双', '单', this.state.dsFiveOdd, '双', this.state.dsFiveEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsFiveList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsFiveList)}
                        </div>
                    </div>

                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "号码" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('号码0', '总来', this.state.numberZeroHave, '没来', this.state.numberZeroNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberZeroList.length * 25 }}>
                            {this.renderNumberView(this.state.numberZeroList)}
                        </div>
                    </div>

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

                    {/* header */}
                    {this.renderHeaderView('号码7', '总来', this.state.numberSevenHave, '没来', this.state.numberSevenNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberSevenList.length * 25 }}>
                            {this.renderNumberView(this.state.numberSevenList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('号码8', '总来', this.state.numberEightHave, '没来', this.state.numberEightNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberEightList.length * 25 }}>
                            {this.renderNumberView(this.state.numberEightList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('号码9', '总来', this.state.numberNineHave, '没来', this.state.numberNineNoHave)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.numberNineList.length * 25 }}>
                            {this.renderNumberView(this.state.numberNineList)}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}