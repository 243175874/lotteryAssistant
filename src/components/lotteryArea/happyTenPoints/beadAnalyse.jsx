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
            tab: "大小",

            bigAndSmallList: [],//总和大小
            sumBig: 0,//总和 大
            sumSmall: 0,//总和 小 

            oddAndEvenList: [],//总和单双
            sumodd: 0,//总和 单
            sumeven: 0,//总和 双 

            sumLastNumber: [],//总和尾数
            sumLastNumberBig: 0, //总和尾数 大
            sumLastNumberSmall: 0, //总和尾数 小

            dragonAndTigerOneList: [], //第一名龙虎
            dragonOne: 0,  //龙出现的次数
            tigerOne: 0,   //虎出现的次数

            dragonAndTigerTwoList: [], //第二名龙虎
            dragonTwo: 0,  //龙出现的次数
            tigerTwo: 0,   //虎出现的次数

            dragonAndTigerThreeList: [], //第三名龙虎
            dragonThree: 0,  //龙出现的次数
            tigerThree: 0,   //虎出现的次数

            dragonAndTigerFourList: [], //第四名龙虎
            dragonFour: 0,  //龙出现的次数
            tigerFour: 0,   //虎出现的次数

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

            lastNumberList_1: [], //第一球尾数
            lastNumberBig_1: 0,//大出现的次数
            lastNumberSmall_1: 0,//大出现的次数

            lastNumberList_2: [], //第二球尾数
            lastNumberBig_2: 0,//大出现的次数
            lastNumberSmall_2: 0,//大出现的次数

            lastNumberList_3: [], //第三球尾数
            lastNumberBig_3: 0,//大出现的次数
            lastNumberSmall_3: 0,//大出现的次数

            lastNumberList_4: [], //第四球尾数
            lastNumberBig_4: 0,//大出现的次数
            lastNumberSmall_4: 0,//大出现的次数

            lastNumberList_5: [], //第五球尾数
            lastNumberBig_5: 0,//大出现的次数
            lastNumberSmall_5: 0,//大出现的次数

            lastNumberList_6: [], //第六球尾数
            lastNumberBig_6: 0,//大出现的次数
            lastNumberSmall_6: 0,//大出现的次数

            lastNumberList_7: [], //第七球尾数
            lastNumberBig_7: 0,//大出现的次数
            lastNumberSmall_7: 0,//大出现的次数

            lastNumberList_8: [], //第八球尾数
            lastNumberBig_8: 0,//大出现的次数
            lastNumberSmall_8: 0,//大出现的次数

            hsList_1: [],   //第一球合数
            hsOdd_1: 0,     //单出现的次数
            hsEven_1: 0,    //双出现的次数

            hsList_2: [],   //第二球合数
            hsOdd_2: 0,     //单出现的次数
            hsEven_2: 0,    //双出现的次数

            hsList_3: [],   //第三球合数
            hsOdd_3: 0,     //单出现的次数
            hsEven_3: 0,    //双出现的次数

            hsList_4: [],   //第四球合数
            hsOdd_4: 0,     //单出现的次数
            hsEven_4: 0,    //双出现的次数

            hsList_5: [],   //第五球合数
            hsOdd_5: 0,     //单出现的次数
            hsEven_5: 0,    //双出现的次数

            hsList_6: [],   //第六球合数
            hsOdd_6: 0,     //单出现的次数
            hsEven_6: 0,    //双出现的次数

            hsList_7: [],   //第七球合数
            hsOdd_7: 0,     //单出现的次数
            hsEven_7: 0,    //双出现的次数

            hsList_8: [],   //第八球合数
            hsOdd_8: 0,     //单出现的次数
            hsEven_8: 0,    //双出现的次数


            orientationList_1: [], //第一球方向
            east_1: [], //东出现的次数
            west_1: 0, //西出现的次数
            south_1: 0, //南出现的次数
            north_1: 0,//北出现的次数

            orientationList_2: [], //第二球方向
            east_2: [], //东出现的次数
            west_2: 0, //西出现的次数
            south_2: 0, //南出现的次数
            north_2: 0,//北出现的次数

            orientationList_3: [], //第三球方向
            east_3: [], //东出现的次数
            west_3: 0, //西出现的次数
            south_3: 0, //南出现的次数
            north_3: 0,//北出现的次数

            orientationList_4: [], //第四球方向
            east_4: [], //东出现的次数
            west_4: 0, //西出现的次数
            south_4: 0, //南出现的次数
            north_4: 0,//北出现的次数

            orientationList_5: [], //第五球方向
            east_5: [], //东出现的次数
            west_5: 0, //西出现的次数
            south_5: 0, //南出现的次数
            north_5: 0,//北出现的次数

            orientationList_6: [], //第六球方向
            east_6: [], //东出现的次数
            west_6: 0, //西出现的次数
            south_6: 0, //南出现的次数
            north_6: 0,//北出现的次数

            orientationList_7: [], //第七球方向
            east_7: [], //东出现的次数
            west_7: 0, //西出现的次数
            south_7: 0, //南出现的次数
            north_7: 0,//北出现的次数

            orientationList_8: [], //第八球方向
            east_8: [], //东出现的次数
            west_8: 0, //西出现的次数
            south_8: 0, //南出现的次数
            north_8: 0,//北出现的次数

            windList_1: [], //第一球风位
            zhong_1: 0,    //中
            fa_1: 0,       //发
            bai_1: 0,      //白

            windList_2: [], //第二球风位
            zhong_2: 0,    //中
            fa_2: 0,       //发
            bai_2: 0,      //白

            windList_3: [], //第三球风位
            zhong_3: 0,    //中
            fa_3: 0,       //发
            bai_3: 0,      //白

            windList_4: [], //第四球风位
            zhong_4: 0,    //中
            fa_4: 0,       //发
            bai_4: 0,      //白

            windList_5: [], //第五球风位
            zhong_5: 0,    //中
            fa_5: 0,       //发
            bai_5: 0,      //白

            windList_6: [], //第六球风位
            zhong_6: 0,    //中
            fa_6: 0,       //发
            bai_6: 0,      //白

            windList_7: [], //第七球风位
            zhong_7: 0,    //中
            fa_7: 0,       //发
            bai_7: 0,      //白

            windList_8: [], //第八球风位
            zhong_8: 0,    //中
            fa_8: 0,       //发
            bai_8: 0,      //白

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

                //总和尾数大小统计
                let sumLastNumber = Common.statisticsList(data, this.returnSumLastNumberBigAndSmall);
                let sumLastNumberBig = Common.statistics(sumLastNumber, "大");
                let sumLastNumberSmall = Common.statistics(sumLastNumber, "小");
                this.setState({ sumLastNumber, sumLastNumberBig, sumLastNumberSmall });

                //第一名龙虎
                let dragonAndTigerOneList = Common.statisticsList(data, this.returnDragonAndTiger, 0, 7);
                let dragonOne = Common.statistics(dragonAndTigerOneList, "龙");
                let tigerOne = Common.statistics(dragonAndTigerOneList, "虎");
                this.setState({ dragonAndTigerOneList, dragonOne, tigerOne });

                //第二名龙虎
                let dragonAndTigerTwoList = Common.statisticsList(data, this.returnDragonAndTiger, 1, 6);
                let dragonTwo = Common.statistics(dragonAndTigerTwoList, "龙");
                let tigerTwo = Common.statistics(dragonAndTigerTwoList, "虎");
                this.setState({ dragonAndTigerTwoList, dragonTwo, tigerTwo });

                //第三名龙虎
                let dragonAndTigerThreeList = Common.statisticsList(data, this.returnDragonAndTiger, 2, 5);
                let dragonThree = Common.statistics(dragonAndTigerThreeList, "龙");
                let tigerThree = Common.statistics(dragonAndTigerThreeList, "虎");
                this.setState({ dragonAndTigerThreeList, dragonThree, tigerThree });

                //第四名龙虎
                let dragonAndTigerFourList = Common.statisticsList(data, this.returnDragonAndTiger, 3, 4);
                let dragonFour = Common.statistics(dragonAndTigerFourList, "龙");
                let tigerFour = Common.statistics(dragonAndTigerFourList, "虎");
                this.setState({ dragonAndTigerFourList, dragonFour, tigerFour });

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


                //第一球尾数大小
                let lastNumberList_1 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 0);
                let lastNumberBig_1 = Common.statistics(lastNumberList_1, "大");
                let lastNumberSmall_1 = Common.statistics(lastNumberList_1, "小");
                this.setState({ lastNumberList_1, lastNumberBig_1, lastNumberSmall_1 });

                //第二球尾数大小
                let lastNumberList_2 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 1);
                let lastNumberBig_2 = Common.statistics(lastNumberList_2, "大");
                let lastNumberSmall_2 = Common.statistics(lastNumberList_2, "小");
                this.setState({ lastNumberList_2, lastNumberBig_2, lastNumberSmall_2 });

                //第三球尾数大小
                let lastNumberList_3 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 2);
                let lastNumberBig_3 = Common.statistics(lastNumberList_3, "大");
                let lastNumberSmall_3 = Common.statistics(lastNumberList_3, "小");
                this.setState({ lastNumberList_3, lastNumberBig_3, lastNumberSmall_3 });

                //第四球尾数大小
                let lastNumberList_4 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 3);
                let lastNumberBig_4 = Common.statistics(lastNumberList_4, "大");
                let lastNumberSmall_4 = Common.statistics(lastNumberList_4, "小");
                this.setState({ lastNumberList_4, lastNumberBig_4, lastNumberSmall_4 });

                //第五球尾数大小
                let lastNumberList_5 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 4);
                let lastNumberBig_5 = Common.statistics(lastNumberList_5, "大");
                let lastNumberSmall_5 = Common.statistics(lastNumberList_5, "小");
                this.setState({ lastNumberList_5, lastNumberBig_5, lastNumberSmall_5 });

                //第六球尾数大小
                let lastNumberList_6 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 5);
                let lastNumberBig_6 = Common.statistics(lastNumberList_6, "大");
                let lastNumberSmall_6 = Common.statistics(lastNumberList_6, "小");
                this.setState({ lastNumberList_6, lastNumberBig_6, lastNumberSmall_6 });

                //第七球尾数大小
                let lastNumberList_7 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 6);
                let lastNumberBig_7 = Common.statistics(lastNumberList_7, "大");
                let lastNumberSmall_7 = Common.statistics(lastNumberList_7, "小");
                this.setState({ lastNumberList_7, lastNumberBig_7, lastNumberSmall_7 });

                //第八球尾数大小
                let lastNumberList_8 = Common.statisticsList(data, this.returnLastNumberBigAndSmall, 7);
                let lastNumberBig_8 = Common.statistics(lastNumberList_8, "大");
                let lastNumberSmall_8 = Common.statistics(lastNumberList_8, "小");
                this.setState({ lastNumberList_8, lastNumberBig_8, lastNumberSmall_8 });

                //第一球合数单双
                let hsList_1 = Common.statisticsList(data, this.returnHeShuOddEven, 0);
                let hsOdd_1 = Common.statistics(hsList_1, "单");
                let hsEven_1 = Common.statistics(hsList_1, "双");
                this.setState({ hsList_1, hsOdd_1, hsEven_1 });

                //第二球合数单双
                let hsList_2 = Common.statisticsList(data, this.returnHeShuOddEven, 1);
                let hsOdd_2 = Common.statistics(hsList_2, "单");
                let hsEven_2 = Common.statistics(hsList_2, "双");
                this.setState({ hsList_2, hsOdd_2, hsEven_2 });

                //第三球合数单双
                let hsList_3 = Common.statisticsList(data, this.returnHeShuOddEven, 2);
                let hsOdd_3 = Common.statistics(hsList_3, "单");
                let hsEven_3 = Common.statistics(hsList_3, "双");
                this.setState({ hsList_3, hsOdd_3, hsEven_3 });

                //第四球合数单双
                let hsList_4 = Common.statisticsList(data, this.returnHeShuOddEven, 3);
                let hsOdd_4 = Common.statistics(hsList_4, "单");
                let hsEven_4 = Common.statistics(hsList_4, "双");
                this.setState({ hsList_4, hsOdd_4, hsEven_4 });

                //第五球合数单双
                let hsList_5 = Common.statisticsList(data, this.returnHeShuOddEven, 4);
                let hsOdd_5 = Common.statistics(hsList_5, "单");
                let hsEven_5 = Common.statistics(hsList_5, "双");
                this.setState({ hsList_5, hsOdd_5, hsEven_5 });

                //第六球合数单双
                let hsList_6 = Common.statisticsList(data, this.returnHeShuOddEven, 5);
                let hsOdd_6 = Common.statistics(hsList_6, "单");
                let hsEven_6 = Common.statistics(hsList_6, "双");
                this.setState({ hsList_6, hsOdd_6, hsEven_6 });

                //第七球合数单双
                let hsList_7 = Common.statisticsList(data, this.returnHeShuOddEven, 6);
                let hsOdd_7 = Common.statistics(hsList_7, "单");
                let hsEven_7 = Common.statistics(hsList_7, "双");
                this.setState({ hsList_7, hsOdd_7, hsEven_7 });

                //第八球合数单双
                let hsList_8 = Common.statisticsList(data, this.returnHeShuOddEven, 7);
                let hsOdd_8 = Common.statistics(hsList_8, "单");
                let hsEven_8 = Common.statistics(hsList_8, "双");
                this.setState({ hsList_8, hsOdd_8, hsEven_8 });

                //第一球方向
                let orientationList_1 = Common.statisticsList(data, this.returnOrientation, 0);
                let east_1 = Common.statistics(orientationList_1, "东");
                let west_1 = Common.statistics(orientationList_1, "西");
                let south_1 = Common.statistics(orientationList_1, "南");
                let north_1 = Common.statistics(orientationList_1, "北");
                this.setState({ orientationList_1, east_1, west_1, south_1, north_1 });

                //第二球方向
                let orientationList_2 = Common.statisticsList(data, this.returnOrientation, 1);
                let east_2 = Common.statistics(orientationList_2, "东");
                let west_2 = Common.statistics(orientationList_2, "西");
                let south_2 = Common.statistics(orientationList_2, "南");
                let north_2 = Common.statistics(orientationList_2, "北");
                this.setState({ orientationList_2, east_2, west_2, south_2, north_2 });

                //第三球方向
                let orientationList_3 = Common.statisticsList(data, this.returnOrientation, 2);
                let east_3 = Common.statistics(orientationList_3, "东");
                let west_3 = Common.statistics(orientationList_3, "西");
                let south_3 = Common.statistics(orientationList_3, "南");
                let north_3 = Common.statistics(orientationList_3, "北");
                this.setState({ orientationList_3, east_3, west_3, south_3, north_3 });

                //第四球方向
                let orientationList_4 = Common.statisticsList(data, this.returnOrientation, 3);
                let east_4 = Common.statistics(orientationList_4, "东");
                let west_4 = Common.statistics(orientationList_4, "西");
                let south_4 = Common.statistics(orientationList_4, "南");
                let north_4 = Common.statistics(orientationList_4, "北");
                this.setState({ orientationList_4, east_4, west_4, south_4, north_4 });

                //第五球方向
                let orientationList_5 = Common.statisticsList(data, this.returnOrientation, 4);
                let east_5 = Common.statistics(orientationList_5, "东");
                let west_5 = Common.statistics(orientationList_5, "西");
                let south_5 = Common.statistics(orientationList_5, "南");
                let north_5 = Common.statistics(orientationList_5, "北");
                this.setState({ orientationList_5, east_5, west_5, south_5, north_5 });

                //第六球方向
                let orientationList_6 = Common.statisticsList(data, this.returnOrientation, 5);
                let east_6 = Common.statistics(orientationList_6, "东");
                let west_6 = Common.statistics(orientationList_6, "西");
                let south_6 = Common.statistics(orientationList_6, "南");
                let north_6 = Common.statistics(orientationList_6, "北");
                this.setState({ orientationList_6, east_6, west_6, south_6, north_6 });

                //第七球方向
                let orientationList_7 = Common.statisticsList(data, this.returnOrientation, 6);
                let east_7 = Common.statistics(orientationList_7, "东");
                let west_7 = Common.statistics(orientationList_7, "西");
                let south_7 = Common.statistics(orientationList_7, "南");
                let north_7 = Common.statistics(orientationList_7, "北");
                this.setState({ orientationList_7, east_7, west_7, south_7, north_7 });

                //第八球方向
                let orientationList_8 = Common.statisticsList(data, this.returnOrientation, 7);
                let east_8 = Common.statistics(orientationList_8, "东");
                let west_8 = Common.statistics(orientationList_8, "西");
                let south_8 = Common.statistics(orientationList_8, "南");
                let north_8 = Common.statistics(orientationList_8, "北");
                this.setState({ orientationList_8, east_8, west_8, south_8, north_8 });

                //第一球风位
                let windList_1 = Common.statisticsList(data, this.returnWind, 0);
                let zhong_1 = Common.statistics(windList_1, "中");
                let fa_1 = Common.statistics(windList_1, "发");
                let bai_1 = Common.statistics(windList_1, "白");
                this.setState({ windList_1, zhong_1, fa_1, bai_1 });

                //第二球风位
                let windList_2 = Common.statisticsList(data, this.returnWind, 1);
                let zhong_2 = Common.statistics(windList_2, "中");
                let fa_2 = Common.statistics(windList_2, "发");
                let bai_2 = Common.statistics(windList_2, "白");
                this.setState({ windList_2, zhong_2, fa_2, bai_2 });

                //第三球风位
                let windList_3 = Common.statisticsList(data, this.returnWind, 2);
                let zhong_3 = Common.statistics(windList_3, "中");
                let fa_3 = Common.statistics(windList_3, "发");
                let bai_3 = Common.statistics(windList_3, "白");
                this.setState({ windList_3, zhong_3, fa_3, bai_3 });

                //第四球风位
                let windList_4 = Common.statisticsList(data, this.returnWind, 3);
                let zhong_4 = Common.statistics(windList_4, "中");
                let fa_4 = Common.statistics(windList_4, "发");
                let bai_4 = Common.statistics(windList_4, "白");
                this.setState({ windList_4, zhong_4, fa_4, bai_4 });

                //第五球风位
                let windList_5 = Common.statisticsList(data, this.returnWind, 4);
                let zhong_5 = Common.statistics(windList_5, "中");
                let fa_5 = Common.statistics(windList_5, "发");
                let bai_5 = Common.statistics(windList_5, "白");
                this.setState({ windList_5, zhong_5, fa_5, bai_5 });

                //第六球风位
                let windList_6 = Common.statisticsList(data, this.returnWind, 5);
                let zhong_6 = Common.statistics(windList_6, "中");
                let fa_6 = Common.statistics(windList_6, "发");
                let bai_6 = Common.statistics(windList_6, "白");
                this.setState({ windList_6, zhong_6, fa_6, bai_6 });

                //第七球风位
                let windList_7 = Common.statisticsList(data, this.returnWind, 6);
                let zhong_7 = Common.statistics(windList_7, "中");
                let fa_7 = Common.statistics(windList_7, "发");
                let bai_7 = Common.statistics(windList_7, "白");
                this.setState({ windList_7, zhong_7, fa_7, bai_7 });

                //第八球风位
                let windList_8 = Common.statisticsList(data, this.returnWind, 7);
                let zhong_8 = Common.statistics(windList_8, "中");
                let fa_8 = Common.statistics(windList_8, "发");
                let bai_8 = Common.statistics(windList_8, "白");
                this.setState({ windList_8, zhong_8, fa_8, bai_8 });
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
        if (Number(kj[index]) > Number(kj[index2])) {
            return "龙";
        } else {
            return "虎";
        }
    }

    //统计大小
    returnBigAndSmall(kj, index) {
        let number = Number(kj[index]);
        if (number > 10) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计尾数大小
    returnLastNumberBigAndSmall(kj, index) {
        let number = Number(kj[index]);
        //切分总和数字
        let strs = String(number).split('');
        //找到尾数
        let lastNumber = strs[strs.length - 1];
        if (lastNumber >= 5) {
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
        let sum = 0
        kj.forEach(item => {
            sum += Number(item);
        });
        if (sum > 80) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计总和尾数大小
    returnSumLastNumberBigAndSmall(kj) {
        let sum = 0
        kj.forEach(item => {
            sum += Number(item);
        });
        //切分总和数字
        let strs = String(sum).split('');
        //找到尾数
        let lastNumber = strs[strs.length - 1];
        if (lastNumber >= 5) {
            return "大"
        } else {
            return "小"
        }
    }

    //统计总和单双
    returnSumOddEven(kj) {
        let sum = 0
        kj.forEach(item => {
            sum += Number(item);
        });
        if (sum % 2 == 0) {
            return "双"
        } else {
            return "单"
        }
    }

    //统计合数单双
    returnHeShuOddEven(kj, index) {
        //切分总和数字
        let strs = kj[index].split('');
        let number = Number(strs[0]) + Number(strs[1]);
        if (number % 2 == 0) {
            return "双"
        } else {
            return "单"
        }
    }

    //统计方向（东南西北）
    returnOrientation(kj, index) {
        let number = Number(kj[index]);
        if (number % 4 == 0) {
            return "北";
        } else if (number % 4 == 1) {
            return "东";
        } else if (number % 4 == 2) {
            return "南";
        } else if (number % 4 == 3) {
            return "西";
        }
    }

    //统计风位 (中发白)
    returnWind(kj, index) {
        let number = Number(kj[index]);
        if (number <= 7) {
            return "中";
        } else if (number <= 14) {
            return "发";
        } else {
            return "白";
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

    //方向
    renderOrientationView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "150px" }}>
                    {item.map((element, i) => {

                        let colorStyle = "red";
                        switch (element) {
                            case "东":
                                colorStyle = "red";
                                break;
                            case "南":
                                colorStyle = "blue";
                                break;
                            case "西":
                                colorStyle = "green";
                                break;
                            case "北":
                                colorStyle = "orange";
                                break;
                        }
                        return <div style={{ width: "25px", height: "25px", color: colorStyle }} key={i} className="flex-center">{element}</div>
                    })}
                </div>
            )
        });
    }

    //风位
    renderWindView(list) {
        return list.map((item, index) => {
            return (
                <div key={index} className="clearfix" style={{ width: "25px", borderRight: "1px solid #CDCDCD", minHeight: "150px" }}>
                    {item.map((element, i) => {

                        let colorStyle = "red";
                        switch (element) {
                            case "中":
                                colorStyle = "red";
                                break;
                            case "发":
                                colorStyle = "blue";
                                break;
                            case "白":
                                colorStyle = "green";
                                break;
                        }
                        return <div style={{ width: "25px", height: "25px", color: colorStyle }} key={i} className="flex-center">{element}</div>
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

    /**
     * 渲染东南西北露珠头部
     * name名称
     * orientation1 东的数量
     * orientation2 南的数量
     * orientation3 西的数量
     * orientation4 北的数量
     */
    renderOrientationHeaderView(name, orientation1, orientation2, orientation3, orientation4) {
        return (
            <div className="w100 flex align-item-center" style={{ height: "30px", background: '#f5f5f9' }}>
                &nbsp;&nbsp;【{name}】&nbsp;&nbsp;最近{this.props.currentPeriods}期统计：
                东<span style={{ color: "red" }}>({orientation1})</span>&nbsp;
                南<span style={{ color: "blue" }}>({orientation2})</span>&nbsp;
                西<span style={{ color: "green" }}>({orientation3})</span>&nbsp;
                北<span style={{ color: "orange" }}>({orientation4})</span>
            </div>
        )
    }

    /**
     * 渲染中发白露珠头部
     * name名称
     * wind1 中
     * wind2 发
     * wind3 白
     */
    renderWindHeaderView(name, wind1, wind2, wind3) {
        return (
            <div className="w100 flex align-item-center" style={{ height: "30px", background: '#f5f5f9' }}>
                &nbsp;&nbsp;【{name}】&nbsp;&nbsp;最近{this.props.currentPeriods}期统计：
                中<span style={{ color: "red" }}>({wind1})</span>&nbsp;
                发<span style={{ color: "blue" }}>({wind2})</span>&nbsp;
                白<span style={{ color: "green" }}>({wind3})</span>
            </div>
        )
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100" style={{ height: "40px", overflow: "auto" }}>
                    <div className="flex h100" style={{ width: "160%", flexDirection: "row" }}>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "大小" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>大小</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "大小" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "单双" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>单双</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "单双" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "龙虎" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>龙虎</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "龙虎" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "总和" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>总和</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "总和" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "尾数" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>尾数</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "尾数" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "合数" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>合数</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "合数" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "东南西北" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>东南西北</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "东南西北" ? "block" : "none" }}></div>
                        </div>
                        <div className="flex" style={{ flex: "1", flexDirection: "column" }} onClick={() => { this.setState({ tab: "中发白" }) }}>
                            <div className="w100 flex-center" style={{ height: "98%" }}>中发白</div>
                            <div className="w100" style={{ height: "2%", background: "red", display: this.state.tab == "中发白" ? "block" : "none" }}></div>
                        </div>
                    </div>
                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "中发白" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderWindHeaderView('第一球风位', this.state.zhong_1, this.state.fa_1, this.state.bai_1)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_1.length * 25 }}>
                            {this.renderWindView(this.state.windList_1)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderWindHeaderView('第二球风位', this.state.zhong_2, this.state.fa_2, this.state.bai_2)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_2.length * 25 }}>
                            {this.renderWindView(this.state.windList_2)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderWindHeaderView('第三球风位', this.state.zhong_3, this.state.fa_3, this.state.bai_3)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_3.length * 25 }}>
                            {this.renderWindView(this.state.windList_3)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderWindHeaderView('第四球风位', this.state.zhong_4, this.state.fa_4, this.state.bai_4)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_4.length * 25 }}>
                            {this.renderWindView(this.state.windList_4)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderWindHeaderView('第五球风位', this.state.zhong_5, this.state.fa_5, this.state.bai_5)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_5.length * 25 }}>
                            {this.renderWindView(this.state.windList_5)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderWindHeaderView('第六球风位', this.state.zhong_6, this.state.fa_6, this.state.bai_6)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_6.length * 25 }}>
                            {this.renderWindView(this.state.windList_6)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderWindHeaderView('第七球风位', this.state.zhong_7, this.state.fa_7, this.state.bai_7)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_7.length * 25 }}>
                            {this.renderWindView(this.state.windList_7)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderWindHeaderView('第八球风位', this.state.zhong_8, this.state.fa_8, this.state.bai_8)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.windList_8.length * 25 }}>
                            {this.renderWindView(this.state.windList_8)}
                        </div>
                    </div>

                </div>


                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "东南西北" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderOrientationHeaderView('第一球方向', this.state.east_1, this.state.south_1, this.state.west_1, this.state.north_1)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_1.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_1)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderOrientationHeaderView('第二球方向', this.state.east_2, this.state.south_2, this.state.west_2, this.state.north_2)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_2.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_2)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderOrientationHeaderView('第三球方向', this.state.east_3, this.state.south_3, this.state.west_3, this.state.north_3)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_3.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_3)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderOrientationHeaderView('第四球方向', this.state.east_4, this.state.south_4, this.state.west_4, this.state.north_4)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_4.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_4)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderOrientationHeaderView('第五球方向', this.state.east_5, this.state.south_5, this.state.west_5, this.state.north_5)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_5.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_5)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderOrientationHeaderView('第六球方向', this.state.east_6, this.state.south_6, this.state.west_6, this.state.north_6)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_6.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_6)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderOrientationHeaderView('第七球方向', this.state.east_7, this.state.south_7, this.state.west_7, this.state.north_7)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_7.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_7)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderOrientationHeaderView('第八球方向', this.state.east_8, this.state.south_8, this.state.west_8, this.state.north_8)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.orientationList_8.length * 25 }}>
                            {this.renderOrientationView(this.state.orientationList_8)}
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

                    {/* header */}
                    {this.renderHeaderView('总和尾数', '大', this.state.sumLastNumberBig, '小', this.state.sumLastNumberSmall)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.sumLastNumber.length * 25 }}>
                            {this.renderBigSmallView(this.state.sumLastNumber)}
                        </div>
                    </div>
                </div>

                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "尾数" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一球尾数', '大', this.state.lastNumberBig_1, '小', this.state.lastNumberSmall_1)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_1.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_1)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第二球尾数', '大', this.state.lastNumberBig_2, '小', this.state.lastNumberSmall_2)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_2.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_2)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三球尾数', '大', this.state.lastNumberBig_3, '小', this.state.lastNumberSmall_3)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_3.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_3)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四球尾数', '大', this.state.lastNumberBig_4, '小', this.state.lastNumberSmall_4)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_4.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_4)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五球尾数', '大', this.state.lastNumberBig_5, '小', this.state.lastNumberSmall_5)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_5.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_5)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第六球尾数', '大', this.state.lastNumberBig_6, '小', this.state.lastNumberSmall_6)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_6.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_6)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第七球尾数', '大', this.state.lastNumberBig_7, '小', this.state.lastNumberSmall_7)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_7.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_7)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第八球尾数', '大', this.state.lastNumberBig_8, '小', this.state.lastNumberSmall_8)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.lastNumberList_8.length * 25 }}>
                            {this.renderBigSmallView(this.state.lastNumberList_8)}
                        </div>
                    </div>

                </div>
                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "合数" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一球合数', '单', this.state.hsOdd_1, '双', this.state.hsEven_1)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_1.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_1)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第二球合数', '单', this.state.hsOdd_2, '双', this.state.hsEven_2)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_2.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_2)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第三球合数', '单', this.state.hsOdd_3, '双', this.state.hsEven_3)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_3.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_3)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第四球合数', '单', this.state.hsOdd_4, '双', this.state.hsEven_4)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_4.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_4)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第五球合数', '单', this.state.hsOdd_5, '双', this.state.hsEven_5)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_5.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_5)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第六球合数', '单', this.state.hsOdd_6, '双', this.state.hsEven_6)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_6.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_6)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第七球合数', '单', this.state.hsOdd_7, '双', this.state.hsEven_7)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_7.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_7)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第八球合数', '单', this.state.hsOdd_8, '双', this.state.hsEven_8)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.hsList_8.length * 25 }}>
                            {this.renderOddEvenView(this.state.hsList_8)}
                        </div>
                    </div>

                </div>

                <div className="w100" style={{ height: "calc(100% - 40px)", overflow: "auto", display: this.state.tab == "龙虎" ? "block" : "none" }}>
                    {/* header */}
                    {this.renderHeaderView('第一名龙虎', '龙', this.state.dragonOne, '虎', this.state.tigerOne)}
                    <div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dragonAndTigerOneList.length * 25 }}>
                            {this.renderDragonAndTigerView(this.state.dragonAndTigerOneList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第二名龙虎', '龙', this.state.dragonTwo, '虎', this.state.tigerTwo)}
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

                    {/* header */}
                    {this.renderHeaderView('第六球大小', '大', this.state.dxSixBig, '小', this.state.dxSixSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxSixList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxSixList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第七球大小', '大', this.state.dxSevenBig, '小', this.state.dxSevenSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxSevenList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxSevenList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第八球大小', '大', this.state.dxEightBig, '小', this.state.dxEightSmall)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dxEightList.length * 25 }}>
                            {this.renderBigSmallView(this.state.dxEightList)}
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

                    {/* header */}
                    {this.renderHeaderView('第六球单双', '单', this.state.dsSixOdd, '双', this.state.dsSixEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsSixList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsSixList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第七球单双', '单', this.state.dsSevenOdd, '双', this.state.dsSevenEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsSevenList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsSevenList)}
                        </div>
                    </div>

                    {/* header */}
                    {this.renderHeaderView('第八球单双', '单', this.state.dsEightOdd, '双', this.state.dsEightEven)}
                    < div className="w100 clearfix" style={{ overflow: "auto" }}>
                        <div className="clearfix flex" style={{ width: this.state.dsEightList.length * 25 }}>
                            {this.renderOddEvenView(this.state.dsEightList)}
                        </div>
                    </div>

                </div>


            </div>
        );
    }
}