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
export default class DoubleLongDragon extends Component {
    constructor(props) {
        super(props);
        this.emitter = null;
        this.state = {
            loading: false,
            list: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        this.getHistoryService(nextProps.id, this.props.currentPeriods);
    }

    componentWillMount() {
        this.getHistoryService(this.props.id, this.props.currentPeriods);
    }

    componentDidMount() {
        //根据改变的期数，加载相应的数据
        this.emitter = emitter.on("emitChangeNumber", this.listenerCallback);
    }

    listenerCallback = () => {
        setTimeout(() => {
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
            if (data.code = 200) {
                let list = this.statistics(data.data);
                //console.log(list);
                this.setState({ list });
            } else {
                this.setState({ list: [] });
            }
        })
    }

    statistics(data) {
        //大小
        let bigAndSmall = Common.setLongDragon(this.statisticsResoult(data, this.returnBigAndSmall));
        //console.log(bigAndSmall);
        //单双
        let oddAndEven = Common.setLongDragon(this.statisticsResoult(data, this.returnOddAndEven));
        //console.log(oddAndEven);
        //龙虎
        let dragonAndTiger = Common.setLongDragon(this.statisticsDragonAndTigerResoult(data, this.returnDragonAndTiger));
        //console.log(dragonAndTiger);
        //冠亚和大小
        let gyhBigAndSmall = Common.setLongDragon(this.statisticsGyhResoult(data, this.returnGyhBigAndSmall));
        //console.log(gyhBigAndSmall);
        //冠亚和大小
        let gyhOddAndEven = Common.setLongDragon(this.statisticsGyhResoult(data, this.returnGyhOddAndEven));
        //console.log(gyhOddAndEven);
        return [...bigAndSmall, ...oddAndEven, ...dragonAndTiger, ...gyhBigAndSmall, ...gyhOddAndEven].sort((a, b) => Number(b.periods) - Number(a.periods));;
    }

    /**
     * 统计出冠亚和结果并返回
     * @param {开奖数据} data 
     * @param {要统计的算法函数，返回当前冠亚和结果} returnValue 
     */
    statisticsGyhResoult(data, returnValue) {
        let array = [];
        let list = Common.statisticsList(data, returnValue);
        array.push({ index: "冠亚和", list });
        return array
    }

    /**
     * 统计出结果并返回
     * @param {开奖数据} data 
     * @param {要统计的算法函数，返回当前号码结果，单双，大小} returnValue 
     */
    statisticsResoult(data, returnValue) {
        let array = []
        for (let index = 1; index <= 10; index++) {
            let list = Common.statisticsList(data, returnValue, index - 1);
            array.push({ index, list });
        }
        return array;
    }
    /**
     * 统计龙虎结果并返回
     * @param {开奖数据} data 
     */
    statisticsDragonAndTigerResoult(data) {
        let array = []
        for (let index = 1; index <= 5; index++) {
            let list = Common.statisticsList(data, this.returnDragonAndTiger, index - 1, 10 - index);
            array.push({ index, list });
        }
        return array;
    }

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

    numberfilter(value) {
        switch (value) {
            case 1:
                return "冠军";
            case 2:
                return "亚军";
            case 3:
                return "第三名";
            case 4:
                return "第四名";
            case 5:
                return "第五名";
            case 6:
                return "第六名";
            case 7:
                return "第七名";
            case 8:
                return "第八名";
            case 9:
                return "第九名";
            case 10:
                return "第十名";
            default:
                return value;
        }
        return value;
    }

    renderListView() {
        return this.state.list.map((item, index) => {
            return (
                <div className="w100 flex" key={index} style={{ height: "32px", flexDirection: "row", background: index % 2 !== 0 ? '#f5f5f9' : "white" }}>
                    <div className="h100 flex-center" style={{ flex: "1" }}>{this.numberfilter(item.index)}</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>{item.value}</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>{item.periods}</div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", fontSize: "12px", borderTop: "1px solid #E6E6E6", fontSize: "15px" }}>
                    两面长龙
                </div>
                <div className="w100 flex" style={{ height: "36px", background: '#f5f5f9' }}>
                    <div className="h100 flex-center" style={{ flex: "1" }}>类型</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>两面类别</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>连开期数</div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 72px)", overflow: "auto" }}>
                    {this.renderListView()}
                </div>
            </div>
        );
    }
}
