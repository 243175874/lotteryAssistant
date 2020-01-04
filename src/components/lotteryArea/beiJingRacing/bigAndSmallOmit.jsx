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
export default class History extends Component {
    constructor(props) {
        super(props);
        this.emitter = null;
        this.menuList = [{ key: "第一球", value: 0 }, { key: "第二球", value: 1 }, { key: "第三球", value: 2 }, { key: "第四球", value: 3 }, { key: "第五球", value: 4 },
        { key: "第六球", value: 5 }, { key: "第七球", value: 6 }, { key: "第八球", value: 7 }, { key: "第九球", value: 8 }, { key: "第十球", value: 9 }];
        this.state = {
            loading: false,
            list: [],
            selectedMenu: 0,
            bigOmitList: [],
            smallOmitList: []
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

    //选择菜单（选择第几球）
    setSelectedMenu(value) {
        this.setState({ selectedMenu: value });
        this.statistics(this.state.list, value);
    }

    //获取历史开奖数据
    getHistoryService(id, number) {
        this.setState({ loading: true });
        LotteryAPI.getHistoryService(id, number).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                this.statistics(data.data, this.state.selectedMenu);
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        })
    }


    /**
       * 统计大小遗漏
       * @param {开奖历史数据} list 
       * @param {第n球的索引} i 
       */
    statistics(list, i) {
        let bigOrSmallList = this.statisticsNumberBigAndSmall(list, i);
        let bigOmitList = Common.statisticsOmitTime(bigOrSmallList, "大");
        let smallOmitList = Common.statisticsOmitTime(bigOrSmallList, "小");
        //使两个数组长度一样。
        let { omitList1, omitList2 } = Common.dealWithTwoList(bigOmitList, smallOmitList);
        this.setState({ bigOmitList: omitList1, smallOmitList: omitList2 });
    }


    /**
     * 统计第n球得大小
     * @param {开奖历史数据} list 
     * @param {第n球的索引} i 
     */
    statisticsNumberBigAndSmall(list, i) {
        //console.log(list.kj_data[index]);
        let data = [];
        list.forEach(element => {
            if (Number(element.kj_data[i]) > 5) {
                data.push("大");
            } else {
                data.push("小");
            }
        });
        return data;
    }

    renderMenuListView() {
        return this.menuList.map((item, index) => {
            let style = {
                width: "68%", height: "90%", borderRadius: "5px", background: this.state.selectedMenu == item.value ? "#ff3344" : "white",
                color: this.state.selectedMenu == item.value ? "white" : "#333", fontSize: "14px"
            };
            return (
                <div key={index} className="flex-center" style={{ flex: "1" }} onClick={() => { this.setSelectedMenu(item.value) }}>
                    <div className="flex-center" style={style}>
                        {item.key}
                    </div>
                </div>
            )
        });
    }

    renderLeftListView(list, tableBorder) {
        return list.map((item, index) => {
            return (
                <div key={index} className="wh100 flex" style={{ flexDirection: "row", background: index % 2 !== 0 ? '#f5f5f9' : "white" }}>
                    <div className="flex-center" style={{ flex: "1", ...tableBorder }}>{item.omit}</div>
                    <div className="flex-center" style={{ flex: "1", ...tableBorder }}>{item.time}</div>
                </div>
            );
        });
    }


    renderRightListView(list, tableBorder, finalTableCellBorder) {
        return list.map((item, index) => {
            return (
                <div key={index} className="wh100 flex" style={{ flexDirection: "row", background: index % 2 !== 0 ? '#f5f5f9' : "white" }}>
                    <div className="flex-center" style={{ flex: "1", ...tableBorder }}>{item.omit}</div>
                    <div className="flex-center" style={{ flex: "1", ...finalTableCellBorder }}>{item.time}</div>
                </div>
            );
        });
    }


    render() {
        const tableBorder = { borderRight: "1px solid #bfbfbf", borderBottom: "1px solid #bfbfbf" }
        const finalTableCellBorder = { borderBottom: "1px solid #bfbfbf" }
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", fontSize: "12px", borderTop: "1px solid #E6E6E6", fontSize: "15px" }}>
                    大小遗漏
                </div>
                <div className="w100" style={{ height: "36px", fontSize: "12px", borderTop: "1px solid #E6E6E6", overflow: "auto" }}>
                    <div className="h100 flex" style={{ width: "200%", flexDirection: "row" }}>
                        {this.renderMenuListView()}
                    </div>
                </div>
                <div className="w100 flex" style={{ height: "45px", fontSize: "16px", color: "white" }}>
                    <div className="w50 h100 flex-center" style={{ background: "#FF3344" }}>大</div>
                    <div className="w50 h100 flex-center" style={{ background: "#0068B7" }}>小</div>
                </div>
                <div className="w100 flex" style={{ height: "30px", flexDirection: "row" }}>
                    <div className="flex-center" style={{ flex: "1", color: "#FF3344", ...tableBorder }}>连续遗漏</div>
                    <div className="flex-center" style={{ flex: "1", color: "#FF3344", ...tableBorder }}>出现次数</div>
                    <div className="flex-center" style={{ flex: "1", color: "#0068B7", ...tableBorder }}>连续遗漏</div>
                    <div className="flex-center" style={{ flex: "1", color: "#0068B7", ...finalTableCellBorder }}>出现次数</div>
                </div>
                <div className='w100 flex clearfix'>
                    <div className="w50" style={{ height: "30px" }}>
                        {this.renderLeftListView(this.state.bigOmitList, tableBorder)}
                    </div>
                    <div className="w50" style={{ height: "30px" }}>
                        {this.renderRightListView(this.state.smallOmitList, tableBorder, finalTableCellBorder)}
                    </div>
                </div>
            </div>
        );
    }
}
