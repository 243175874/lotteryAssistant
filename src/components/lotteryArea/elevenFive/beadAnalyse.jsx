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

            dragonAndTigerList: [], //龙虎
            dragon: 0,  //龙出现的次数
            tiger: 0,   //虎出现的次数

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

            tab: "龙虎"
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

            if (data.code == 200) {
                data = data.data;
                //龙虎
                let dragonAndTigerList = Common.statisticsList(data, this.returnDragonAndTiger);
                let dragon = Common.statistics(dragonAndTigerList, "龙");
                let tiger = Common.statistics(dragonAndTigerList, "虎");
                this.setState({ dragonAndTigerList, dragon, tiger });

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
            } else {
                //this.setState({ bigAndSmallList: [], oddAndEvenList: [] });
            }
            this.setState({ loading: false });
        })
    }


    //统计
    // statisticsList(list, reutrnValue, index = 0) {
    //     let last = "";
    //     let arr = [];
    //     list.forEach(item => {
    //         let current = reutrnValue(item.kj_data, index);
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
    returnDragonAndTiger(kj) {
        if (kj[0] > kj[kj.length - 1]) {
            return "龙";
        } else {
            return "虎";
        }
    }

    //统计大小
    returnBigAndSmall(kj, index) {
        let number = Number(kj[index]);
        if (number > 5) {
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

    //龙虎
    renderDragonAndTigerView() {
        return this.state.dragonAndTigerList.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "龙" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }


    //大小
    renderBigAndSmallView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "大" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }

    //单双
    renderOddAndEvenView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "单" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
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
                    <div className="h100 flex" style={{ width: "180px", flexDirection: "row" }}>
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
                    </div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "龙虎" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一球龙虎', '龙', this.state.dragon, '虎', this.state.tiger)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerList.length * 25 }}>
                            {this.renderDragonAndTigerView()}
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "大小" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一球大小', '大', this.state.dxOneBig, '小', this.state.dxOneSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxOneList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第二球大小', '大', this.state.dxTwoBig, '小', this.state.dxTwoSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxTwoList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxTwoList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三球大小', '大', this.state.dxThreeBig, '小', this.state.dxThreeSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxThreeList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxThreeList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四球大小', '大', this.state.dxFourBig, '小', this.state.dxFourSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxFourList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxFourList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五球大小', '大', this.state.dxFiveBig, '小', this.state.dxFiveSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxFiveList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxFiveList)}
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "单双" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一球单双', '单', this.state.dsOneOdd, '双', this.state.dsOneEven)} ,
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsOneList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第二球单双', '单', this.state.dsTwoOdd, '双', this.state.dsTwoEven)} ,
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsTwoList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsTwoList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三球单双', '单', this.state.dsThreeOdd, '双', this.state.dsThreeEven)} ,
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsThreeList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsThreeList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四球单双', '单', this.state.dsFourOdd, '双', this.state.dsFourEven)} ,
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsFourList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsFourList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五球单双', '单', this.state.dsFiveOdd, '双', this.state.dsFiveEven)} ,
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsFiveList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsFiveList)}
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}