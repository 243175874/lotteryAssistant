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
            data: [],
            loading: false,
            tab: "龙虎",

            dragonAndTigerOneList: [], //冠军龙虎
            dragonOne: 0,  //龙出现的次数
            tigerOne: 0,   //虎出现的次数

            dragonAndTigerTwoList: [], //亚军龙虎
            dragonTwo: 0,  //龙出现的次数
            tigerTwo: 0,   //虎出现的次数

            dragonAndTigerThreeList: [], //第三名龙虎
            dragonThree: 0,  //龙出现的次数
            tigerThree: 0,   //虎出现的次数

            dragonAndTigerFourList: [], //第四名龙虎
            dragonFour: 0,  //龙出现的次数
            tigerFour: 0,   //虎出现的次数

            dragonAndTigerFiveList: [], //第五名龙虎
            dragonFive: 0,  //龙出现的次数
            tigerFive: 0,   //虎出现的次数

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

            dxSixList: [],  //第六球大小
            dxSixBig: 0,    //大出现的次数
            dxSixSmall: 0,  //小出现的次数

            dxSevenList: [],  //第七球大小
            dxSevenBig: 0,    //大出现的次数
            dxSevenSmall: 0,  //小出现的次数

            dxEightList: [],  //第八球大小
            dxEightBig: 0,    //大出现的次数
            dxEightSmall: 0,  //小出现的次数

            dxNineList: [],  //第九球大小
            dxNineBig: 0,    //大出现的次数
            dxNineSmall: 0,  //小出现的次数

            dxTenList: [],  //第十球大小
            dxTenBig: 0,    //大出现的次数
            dxTenSmall: 0,  //小出现的次数

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

            dsSixList: [],  //第六球单双
            dsSixOdd: 0,    //单出现的次数
            dsSixEven: 0,  //双出现的次数

            dsSevenList: [],  //第七球单双
            dsSevenOdd: 0,    //单出现的次数
            dsSevenEven: 0,  //双出现的次数

            dsEightList: [],  //第八球单双
            dsEightOdd: 0,    //单出现的次数
            dsEightEven: 0,  //双出现的次数

            dsNineList: [],  //第九球单双
            dsNineOdd: 0,    //单出现的次数
            dsNineEven: 0,  //双出现的次数

            dsTenList: [],  //第十球单双
            dsTenOdd: 0,    //单出现的次数
            dsTenEven: 0,  //双出现的次数

            frontAndBackNumber1List: [], //号码1前后 
            frontNumber1: 0, //前出现的次数
            backNumber1: 0, //后出现的次数

            frontAndBackNumber2List: [], //号码2前后 
            frontNumber2: 0, //前出现的次数
            backNumber2: 0, //后出现的次数

            frontAndBackNumber3List: [], //号码3前后 
            frontNumber3: 0, //前出现的次数
            backNumber3: 0, //后出现的次数

            frontAndBackNumber4List: [], //号码4前后 
            frontNumber4: 0, //前出现的次数
            backNumber4: 0, //后出现的次数

            frontAndBackNumber5List: [], //号码5前后 
            frontNumber5: 0, //前出现的次数
            backNumber5: 0, //后出现的次数

            frontAndBackNumber6List: [], //号码6前后 
            frontNumber6: 0, //前出现的次数
            backNumber6: 0, //后出现的次数

            frontAndBackNumber7List: [], //号码7前后 
            frontNumber7: 0, //前出现的次数
            backNumber7: 0, //后出现的次数

            frontAndBackNumber8List: [], //号码8前后 
            frontNumber8: 0, //前出现的次数
            backNumber8: 0, //后出现的次数

            frontAndBackNumber9List: [], //号码9前后 
            frontNumber9: 0, //前出现的次数
            backNumber9: 0, //后出现的次数

            frontAndBackNumber10List: [], //号码10前后 
            frontNumber10: 0, //前出现的次数
            backNumber10: 0, // 后出现的次数

            gyhBigAndSmallList: [],  //冠亚和大小
            gyhBig: 0,    //大出现的次数
            gyhSmall: 0,  //小出现的次数

            gyhOddAndEvenList: [],  //冠亚和单双
            gyhOdd: 0,    //单出现的次数
            gyhEven: 0,  //双出现的次数

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
                this.setState({ data });
                //第一名龙虎
                let dragonAndTigerOneList = Common.statisticsList(data, this.returnDragonAndTiger, 0, 9);
                let dragonOne = Common.statistics(dragonAndTigerOneList, "龙");
                let tigerOne = Common.statistics(dragonAndTigerOneList, "虎");
                this.setState({ dragonAndTigerOneList, dragonOne, tigerOne });

                //第二名龙虎
                let dragonAndTigerTwoList = Common.statisticsList(data, this.returnDragonAndTiger, 1, 8);
                let dragonTwo = Common.statistics(dragonAndTigerTwoList, "龙");
                let tigerTwo = Common.statistics(dragonAndTigerTwoList, "虎");
                this.setState({ dragonAndTigerTwoList, dragonTwo, tigerTwo });

                //第三名龙虎
                let dragonAndTigerThreeList = Common.statisticsList(data, this.returnDragonAndTiger, 2, 7);
                let dragonThree = Common.statistics(dragonAndTigerThreeList, "龙");
                let tigerThree = Common.statistics(dragonAndTigerThreeList, "虎");
                this.setState({ dragonAndTigerThreeList, dragonThree, tigerThree });

                //第四名龙虎
                let dragonAndTigerFourList = Common.statisticsList(data, this.returnDragonAndTiger, 3, 6);
                let dragonFour = Common.statistics(dragonAndTigerFourList, "龙");
                let tigerFour = Common.statistics(dragonAndTigerFourList, "虎");
                this.setState({ dragonAndTigerFourList, dragonFour, tigerFour });

                //第五名龙虎
                let dragonAndTigerFiveList = Common.statisticsList(data, this.returnDragonAndTiger, 4, 5);
                let dragonFive = Common.statistics(dragonAndTigerFiveList, "龙");
                let tigerFive = Common.statistics(dragonAndTigerFiveList, "虎");
                this.setState({ dragonAndTigerFiveList, dragonFive, tigerFive });


                //统计冠亚和大小
                let gyhBigAndSmallList = Common.statisticsList(data, this.returnGyhBigAndSmall);
                let gyhBig = Common.statistics(gyhBigAndSmallList, "大");
                let gyhSmall = Common.statistics(gyhBigAndSmallList, "小");
                this.setState({ gyhBigAndSmallList, gyhBig, gyhSmall });

                //统计冠亚和单双
                let gyhOddAndEvenList = Common.statisticsList(data, this.returnGyhOddAndEven);
                let gyhOdd = Common.statistics(gyhOddAndEvenList, "单");
                let gyhEven = Common.statistics(gyhOddAndEvenList, "双");
                this.setState({ gyhOddAndEvenList, gyhOdd, gyhEven });

            }
            this.setState({ loading: false });
        })
    }


    //统计
    // statisticsList(list, reutrnValue, index = 0, index2 = 0) {
    //     let last = "";
    //     let arr = [];
    //     list.forEach(item => {
    //         let current = reutrnValue(item.kj_data, index, index2);
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

    //统计数量
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
        if (kj[index] > kj[index2]) {
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

    //统计前后
    returnfrontAndBack(kj, number) {
        let index = kj.indexOf(number) + 1;
        if (index > 5) {
            return "后"
        } else {
            return "前"
        }
    }

    //统计冠亚和大小
    returnGyhBigAndSmall(kj) {
        let sum = Number(kj[0]) + Number(kj[1]);
        if (sum > 11) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计冠亚和单双
    returnGyhOddAndEven(kj) {
        let sum = Number(kj[0]) + Number(kj[1]);
        if (sum % 2 == 0) {
            return "双"
        } else {
            return "单"
        }
    }

    //龙虎
    renderDragonAndTigerView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "100px" }}>
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
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "100px" }}>
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
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "100px" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "单" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }


    //前后
    renderFrontAndBackView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "100px" }}>
                    {item.map((element, i) => {
                        return <div style={{ width: "25px", height: "25px", color: element == "前" ? "red" : "blue" }} key={i} className="flex-center">{element}</div>
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

    changeTab(tab) {
        this.setState({ tab });
        let data = this.state.data;
        if (tab == "大小") {
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

            //第六球大小
            let dxSixList = Common.statisticsList(data, this.returnBigAndSmall, 5);
            let dxSixBig = Common.statistics(dxSixList, "大");
            let dxSixSmall = Common.statistics(dxSixList, "小");
            this.setState({ dxSixList, dxSixBig, dxSixSmall });

            //第七球大小
            let dxSevenList = Common.statisticsList(data, this.returnBigAndSmall, 6);
            let dxSevenBig = Common.statistics(dxSevenList, "大");
            let dxSevenSmall = Common.statistics(dxSevenList, "小");
            this.setState({ dxSevenList, dxSevenBig, dxSevenSmall });

            //第八球大小
            let dxEightList = Common.statisticsList(data, this.returnBigAndSmall, 7);
            let dxEightBig = Common.statistics(dxEightList, "大");
            let dxEightSmall = Common.statistics(dxEightList, "小");
            this.setState({ dxEightList, dxEightBig, dxEightSmall });

            //第九球大小
            let dxNineList = Common.statisticsList(data, this.returnBigAndSmall, 8);
            let dxNineBig = Common.statistics(dxNineList, "大");
            let dxNineSmall = Common.statistics(dxNineList, "小");
            this.setState({ dxNineList, dxNineBig, dxNineSmall });

            //第十球大小
            let dxTenList = Common.statisticsList(data, this.returnBigAndSmall, 9);
            let dxTenBig = Common.statistics(dxTenList, "大");
            let dxTenSmall = Common.statistics(dxTenList, "小");
            this.setState({ dxTenList, dxTenBig, dxTenSmall });
        } else if (tab == "单双") {

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

            //第六球单双
            let dsSixList = Common.statisticsList(data, this.returnOddAndEven, 5);
            let dsSixOdd = Common.statistics(dsSixList, "单");
            let dsSixEven = Common.statistics(dsSixList, "双");
            this.setState({ dsSixList, dsSixOdd, dsSixEven });

            //第七球单双
            let dsSevenList = Common.statisticsList(data, this.returnOddAndEven, 6);
            let dsSevenOdd = Common.statistics(dsSevenList, "单");
            let dsSevenEven = Common.statistics(dsSevenList, "双");
            this.setState({ dsSevenList, dsSevenOdd, dsSevenEven });

            //第八球单双
            let dsEightList = Common.statisticsList(data, this.returnOddAndEven, 7);
            let dsEightOdd = Common.statistics(dsEightList, "单");
            let dsEightEven = Common.statistics(dsEightList, "双");
            this.setState({ dsEightList, dsEightOdd, dsEightEven });

            //第九球单双
            let dsNineList = Common.statisticsList(data, this.returnOddAndEven, 8);
            let dsNineOdd = Common.statistics(dsNineList, "单");
            let dsNineEven = Common.statistics(dsNineList, "双");
            this.setState({ dsNineList, dsNineOdd, dsNineEven });

            //第十球单双
            let dsTenList = Common.statisticsList(data, this.returnOddAndEven, 9);
            let dsTenOdd = Common.statistics(dsTenList, "单");
            let dsTenEven = Common.statistics(dsTenList, "双");
            this.setState({ dsTenList, dsTenOdd, dsTenEven });
        } else if (tab == "前后") {
            //号码1前后
            let frontAndBackNumber1List = Common.statisticsList(data, this.returnfrontAndBack, '01');
            let frontNumber1 = Common.statistics(frontAndBackNumber1List, "前");
            let backNumber1 = Common.statistics(frontAndBackNumber1List, "后");
            this.setState({ frontAndBackNumber1List, frontNumber1, backNumber1 });

            //号码2前后
            let frontAndBackNumber2List = Common.statisticsList(data, this.returnfrontAndBack, '02');
            let frontNumber2 = Common.statistics(frontAndBackNumber2List, "前");
            let backNumber2 = Common.statistics(frontAndBackNumber2List, "后");
            this.setState({ frontAndBackNumber2List, frontNumber2, backNumber2 });


            //号码3前后
            let frontAndBackNumber3List = Common.statisticsList(data, this.returnfrontAndBack, '03');
            let frontNumber3 = Common.statistics(frontAndBackNumber3List, "前");
            let backNumber3 = Common.statistics(frontAndBackNumber3List, "后");
            this.setState({ frontAndBackNumber3List, frontNumber3, backNumber3 });

            //号码4前后
            let frontAndBackNumber4List = Common.statisticsList(data, this.returnfrontAndBack, '04');
            let frontNumber4 = Common.statistics(frontAndBackNumber4List, "前");
            let backNumber4 = Common.statistics(frontAndBackNumber4List, "后");
            this.setState({ frontAndBackNumber4List, frontNumber4, backNumber4 });

            //号码5前后
            let frontAndBackNumber5List = Common.statisticsList(data, this.returnfrontAndBack, '05');
            let frontNumber5 = Common.statistics(frontAndBackNumber5List, "前");
            let backNumber5 = Common.statistics(frontAndBackNumber5List, "后");
            this.setState({ frontAndBackNumber5List, frontNumber5, backNumber5 });

            //号码6前后
            let frontAndBackNumber6List = Common.statisticsList(data, this.returnfrontAndBack, '06');
            let frontNumber6 = Common.statistics(frontAndBackNumber6List, "前");
            let backNumber6 = Common.statistics(frontAndBackNumber6List, "后");
            this.setState({ frontAndBackNumber6List, frontNumber6, backNumber6 });

            //号码7前后
            let frontAndBackNumber7List = Common.statisticsList(data, this.returnfrontAndBack, '07');
            let frontNumber7 = Common.statistics(frontAndBackNumber7List, "前");
            let backNumber7 = Common.statistics(frontAndBackNumber7List, "后");
            this.setState({ frontAndBackNumber7List, frontNumber7, backNumber7 });

            //号码8前后
            let frontAndBackNumber8List = Common.statisticsList(data, this.returnfrontAndBack, '08');
            let frontNumber8 = Common.statistics(frontAndBackNumber8List, "前");
            let backNumber8 = Common.statistics(frontAndBackNumber8List, "后");
            this.setState({ frontAndBackNumber8List, frontNumber8, backNumber8 });

            //号码9前后
            let frontAndBackNumber9List = Common.statisticsList(data, this.returnfrontAndBack, '09');
            let frontNumber9 = Common.statistics(frontAndBackNumber9List, "前");
            let backNumber9 = Common.statistics(frontAndBackNumber9List, "后");
            this.setState({ frontAndBackNumber9List, frontNumber9, backNumber9 });

            //号码10前后
            let frontAndBackNumber10List = Common.statisticsList(data, this.returnfrontAndBack, '10');
            let frontNumber10 = Common.statistics(frontAndBackNumber10List, "前");
            let backNumber10 = Common.statistics(frontAndBackNumber10List, "后");
            this.setState({ frontAndBackNumber10List, frontNumber10, backNumber10 });
        }
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "40px" }}>
                    <div className="wh100 flex" style={{ flexDirection: "row" }}>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.changeTab("龙虎") }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>龙虎</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "龙虎" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.changeTab("大小"); }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>大小</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "大小" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.changeTab("单双"); }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>单双</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "单双" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.changeTab("前后"); }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>前后</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "前后" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.changeTab("冠亚和"); }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>冠亚和</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "冠亚和" ? "block" : "none" }}></div>
                        </div>
                    </div>
                </div>

                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "龙虎" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('冠军龙虎', '龙', this.state.dragonOne, '虎', this.state.tigerOne)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerOneList.length * 25 }}>
                            {this.renderDragonAndTigerView(this.state.dragonAndTigerOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('亚军龙虎', '龙', this.state.dragonTwo, '虎', this.state.tigerTwo)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerTwoList.length * 25 }}>
                            {this.renderDragonAndTigerView(this.state.dragonAndTigerTwoList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三名龙虎', '龙', this.state.dragonThree, '虎', this.state.tigerThree)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerThreeList.length * 25 }}>
                            {this.renderDragonAndTigerView(this.state.dragonAndTigerThreeList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四名龙虎', '龙', this.state.dragonFour, '虎', this.state.tigerFour)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerFourList.length * 25 }}>
                            {this.renderDragonAndTigerView(this.state.dragonAndTigerFourList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五名龙虎', '龙', this.state.dragonFive, '虎', this.state.tigerFive)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerFiveList.length * 25 }}>
                            {this.renderDragonAndTigerView(this.state.dragonAndTigerFiveList)}
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "大小" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('冠军大小', '大', this.state.dxOneBig, '小', this.state.dxOneSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxOneList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('亚军大小', '大', this.state.dxTwoBig, '小', this.state.dxTwoSmall)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
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

                    {/* header */}
                    {this.renderHeaderView('第六球大小', '大', this.state.dxSixBig, '小', this.state.dxSixSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxSixList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxSixList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第七球大小', '大', this.state.dxSevenBig, '小', this.state.dxSevenSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxSevenList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxSevenList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第八球大小', '大', this.state.dxEightBig, '小', this.state.dxEightSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxEightList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxEightList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第九球大小', '大', this.state.dxNineBig, '小', this.state.dxNineSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxNineList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxNineList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第十球大小', '大', this.state.dxTenBig, '小', this.state.dxTenSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxTenList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.dxTenList)}
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "单双" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('冠军单双', '单', this.state.dsOneOdd, '双', this.state.dsOneEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsOneList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('亚军单双', '单', this.state.dsTwoOdd, '双', this.state.dsTwoEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsTwoList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsTwoList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三球单双', '单', this.state.dsThreeOdd, '双', this.state.dsThreeEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsThreeList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsThreeList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四球单双', '单', this.state.dsFourOdd, '双', this.state.dsFourEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsFourList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsFourList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五球单双', '单', this.state.dsFiveOdd, '双', this.state.dsFiveEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsFiveList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsFiveList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第六球单双', '单', this.state.dsSixOdd, '双', this.state.dsSixEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsSixList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsSixList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第七球单双', '单', this.state.dsSevenOdd, '双', this.state.dsSevenEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsSevenList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsSevenList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第八球单双', '单', this.state.dsEightOdd, '双', this.state.dsEightEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsEightList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsEightList)}
                        </div>
                    </div>


                    {/* header */}
                    {this.renderHeaderView('第九球单双', '单', this.state.dsNineOdd, '双', this.state.dsNineEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsNineList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsNineList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第十球单双', '单', this.state.dsTenOdd, '双', this.state.dsTenEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsTenList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.dsTenList)}
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "前后" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('号码1', '前', this.state.frontNumber1, '后', this.state.backNumber1)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber1List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber1List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码2', '前', this.state.frontNumber2, '后', this.state.backNumber2)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber2List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber2List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码3', '前', this.state.frontNumber3, '后', this.state.backNumber3)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber3List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber3List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码4', '前', this.state.frontNumber4, '后', this.state.backNumber4)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber4List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber4List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码5', '前', this.state.frontNumber5, '后', this.state.backNumber5)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber5List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber5List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码6', '前', this.state.frontNumber6, '后', this.state.backNumber6)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber6List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber6List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码7', '前', this.state.frontNumber7, '后', this.state.backNumber7)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber7List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber7List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码8', '前', this.state.frontNumber8, '后', this.state.backNumber8)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber8List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber8List)}
                        </div>
                    </div>

                    {this.renderHeaderView('号码9', '前', this.state.frontNumber9, '后', this.state.backNumber9)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber9List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber9List)}
                        </div>
                    </div>


                    {this.renderHeaderView('号码10', '前', this.state.frontNumber10, '后', this.state.backNumber10)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.frontAndBackNumber10List.length * 25 }}>
                            {this.renderFrontAndBackView(this.state.frontAndBackNumber10List)}
                        </div>
                    </div>
                </div>

                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "冠亚和" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('冠亚和大小', '大', this.state.gyhBig, '小', this.state.gyhSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.gyhBigAndSmallList.length * 25 }}>
                            {this.renderBigAndSmallView(this.state.gyhBigAndSmallList)}
                        </div>
                    </div>

                    {this.renderHeaderView('冠亚和单双', '单', this.state.gyhOdd, '双', this.state.gyhEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.gyhOddAndEvenList.length * 25 }}>
                            {this.renderOddAndEvenView(this.state.gyhOddAndEvenList)}
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}