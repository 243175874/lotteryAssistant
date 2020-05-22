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
export default class MissingStatistics extends Component {
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
            if (data.code == 200) {
                //总次数
                let sumTimeList = this.statisticsRecordList(data.data, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
                //遗漏次数
                let sumOmitList = this.statisticsOmitRecordList(data.data, [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
                //把总次数和遗漏次数组合起来,放到一个数组中
                let list = this.combinationOfTimeAndOmit(sumTimeList, sumOmitList);
                this.setState({ list });
            } else {
                this.setState({ list: [] });
            }
        })
    }

    //把总次数和遗漏次数组合起来
    combinationOfTimeAndOmit(timeList, omitList) {
        let list = [];
        timeList.forEach((item, index) => {
            list.push({ "attribute": item.attribute, "amount": item.amount, "omit": omitList[index].amount });
        });
        return list;
    }

    //计算出现的次数
    statisticsItem(item, number) {
        let num = 0;
        let sum = Number(item[0]) + Number(item[1]);
        if (sum == number) {
            num++;
        }
        return num;
    }


    //循环统计并且排序
    statisticsRecordList(recordList, dataDictionary) {
        let list = [];
        dataDictionary.forEach((item) => {
            let amount = 0;
            recordList.forEach(Element => {
                amount += this.statisticsItem(Element.kj_data, item);
            })
            list.push({ "attribute": item, "amount": amount });
        })
        return list.sort((a, b) => Number(a.attribute) - Number(b.attribute));
    }

    //循环统计当前遗漏最多的
    statisticsOmitRecordList(recordList, dataDictionary) {
        let list = [];
        dataDictionary.forEach(item => {
            let flag = false;
            for (let index = 0; index < recordList.length; index++) {
                const element = recordList[index].kj_data;
                let sum = Number(element[0]) + Number(element[1]);
                if (sum == item) {
                    flag = true;
                    list.push({ "attribute": item, "amount": index });
                    break;
                }
            }
            if (!flag) {
                list.push({ "attribute": item, "amount": recordList.length });
            }
        });
        return list.sort((a, b) => Number(a.attribute) - Number(b.attribute));
    }


    renderListView() {
        return this.state.list.map((item, index) => {
            return (
                <div className="w100 flex" key={index} style={{ height: "32px", flexDirection: "row", background: index % 2 !== 0 ? '#f5f5f9' : "white" }}>
                    <div className="h100 flex-center" style={{ flex: "1" }}>{item.attribute}</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>{item.amount}</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>{item.omit}</div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", fontSize: "12px", borderTop: "1px solid #E6E6E6", fontSize: "15px" }}>
                    冠亚统计
                </div>
                <div className="w100 flex" style={{ height: "36px", background: '#f5f5f9' }}>
                    <div className="h100 flex-center" style={{ flex: "1", color: "red" }}>冠亚军和</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>总次数</div>
                    <div className="h100 flex-center" style={{ flex: "1" }}>当前遗漏</div>
                </div>
                <div className="w100" style={{ height: "calc(100% - 72px)", overflow: "auto" }}>
                    {this.renderListView()}
                </div>
            </div>
        );
    }
}
