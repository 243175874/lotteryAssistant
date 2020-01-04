import React, { Component } from "react";
import LotteryAPI from '../../../assets/js/lotteryAPI'
import emitter from '../../../assets/js/events'
import { ActivityIndicator, Toast } from 'antd-mobile';
export default class BeadAnalyse extends Component {
    constructor(props) {
        super(props);
        this.emitter = null;
        this.menuList = [{ key: "第一球", value: 0 }, { key: "第二球", value: 1 }, { key: "第三球", value: 2 }, { key: "第四球", value: 3 }, { key: "第五球", value: 4 }]
        this.state = {
            loading: false,
            list: [],//开奖历史数据
            selectedMenu: 0,
            hot: [], //热
            mild: [], //温
            cold: [],  //冷
        };
    }

    componentWillReceiveProps(nextProps) {
        //获取历史数据
        this.getHistoryService(nextProps.id, 20);
    }

    componentWillMount() {
        //获取历史数据
        this.getHistoryService(this.props.id, 20);
    }

    componentDidMount() {
        //根据改变的期数，加载相应的数据
        this.emitter = emitter.on("emitChangeNumber", this.listenerCallback);
    }

    listenerCallback = () => {
        setTimeout(() => {
            //获取历史数据
            this.getHistoryService(this.props.id, 20);
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
                //分析冷热
                this.hotAndColdAnalyze(data.data, this.state.selectedMenu);
                this.setState({ list: data.data });
            }
            this.setState({ loading: false });
        });
    }

    /**
     * 分析冷热
     * @param {开奖历史数据} list 
     * @param {当前第几球索引} index 
     */
    hotAndColdAnalyze(list, index) {
        //统计号码出现的次数
        const mapList = new Map();
        for (let i = 1; i <= 11; i++) {
            let sum = 0;
            for (let j = 0; j < list.length; j++) {
                const element = list[j];
                if (Number(element.kj_data[index]).valueOf() == i) {
                    sum++;
                }
            }
            mapList.set(i, sum);
        }

        //根据号码出现的次数区分冷热
        let hot = [];
        let mild = [];
        let cold = [];
        for (let key of mapList.keys()) {
            let time = mapList.get(key);
            if (time >= 4) {
                hot.push(key);  //热
            } else if (time > 1) {
                mild.push(key); //温
            } else {
                cold.push(key); //冷
            }
        }
        this.setState({ hot, mild, cold });
    }

    //选择菜单（选择第几球）
    setSelectedMenu(value) {
        this.setState({ selectedMenu: value });
        //分析冷热
        this.hotAndColdAnalyze(this.state.list, value);
    }

    //渲染菜单
    renderMenuListView() {
        return this.menuList.map((item, index) => {
            let style = { flex: "1", color: this.state.selectedMenu == item.value ? "red" : "" };
            return (<div onClick={() => { this.setSelectedMenu(item.value) }} className="flex-center" key={index} style={style}>{item.key}</div>)
        });
    }

    /**
     * 渲染彩票球
     * @param {彩票球号} list 
     * @param {彩球颜色} baColor 
     */
    renderBallNumberListView(list, baColor) {
        const style = { width: "32px", height: "32px", borderRadius: "50%", background: baColor, marginLeft: "11px", marginTop: "5px", color: "white" }
        return list.map((item, index) => {
            return (<div className="fl flex-center" key={index} style={style}>{item}</div>)
        });
    }

    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", fontSize: "15px" }}>
                    冷热分析&nbsp;<span style={{ fontSize: "12px", color: "#999" }}>(近20期)</span>
                </div>
                <div className="w100 flex" style={{ height: "32px", background: "#EDEDED", flexDirection: "row", fontWeight: "bold", fontSize: "13px", color: "#333" }}>
                    {this.renderMenuListView()}
                </div>

                <div className="w100 clearfix">
                    <div className="w100 flex" style={{ height: "90px" }}>
                        <div style={{ width: "90px", height: "90px" }}>
                            <div className="w100 flex-center" style={{ height: "50px", fontSize: "22px", fontWeight: "500", color: "red" }}>热</div>
                            <div className="text-center" style={{ color: "rgb(153, 153, 153)" }}>（频繁出现的号<br />码为热）</div>
                        </div>

                        <div className={this.state.hot.length <= 6 ? "flex-center" : ""} style={{ width: "calc(100% - 90px)", height: "90px", padding: "3px 10px 5px 10px" }}>
                            {this.renderBallNumberListView(this.state.hot, "#e51f20")}
                        </div>

                    </div>

                    <div className="w100 flex" style={{ height: "90px" }}>
                        <div style={{ width: "90px", height: "90px" }}>
                            <div className="w100 flex-center" style={{ height: "50px", fontSize: "22px", fontWeight: "500", color: "#f89201" }}>温</div>
                            <div className="text-center" style={{ color: "rgb(153, 153, 153)" }}>（出现频率适中<br />的号码为温）</div>
                        </div>
                        <div className={this.state.mild.length <= 6 ? "flex-center" : ""} style={{ width: "calc(100% - 90px)", height: "90px", padding: "3px 10px 5px 10px" }}>
                            {this.renderBallNumberListView(this.state.mild, "#f89201")}
                        </div>
                    </div>

                    <div className="w100 flex" style={{ height: "90px" }}>
                        <div style={{ width: "90px", height: "90px" }}>
                            <div className="w100 flex-center" style={{ height: "50px", fontSize: "22px", fontWeight: "500", color: "#0297e9" }}>冷</div>
                            <div className="text-center" style={{ color: "rgb(153, 153, 153)" }}>（没有出现的号<br />码为冷）</div>
                        </div>
                        <div className={this.state.cold.length <= 6 ? "flex-center" : ""} style={{ width: "calc(100% - 90px)", height: "90px", padding: "3px 10px 5px 10px" }}>
                            {this.renderBallNumberListView(this.state.cold, "#0297e9")}
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}