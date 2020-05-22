import React, { Component } from "react";
import LotteryAPI from '../../../assets/js/lotteryAPI'
import emitter from '../../../assets/js/events'
import { ActivityIndicator, Toast } from 'antd-mobile';
import Common from '../../../assets/js/common'
import { connect } from 'react-redux'
import { setCurrentPeriods } from '../../../redux/action'
// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/line';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';
@connect(
    state => ({ currentPeriods: state.currentPeriods }),
    { setCurrentPeriods }
)
export default class History extends Component {
    constructor(props) {
        super(props);
        this.emitter = null;
        this.menuList = ["位置走势", "号码走势", "冠亚和走势"];
        this.positionList = [{ key: "冠军", value: 0 }, { key: "亚军", value: 1 }, { key: "第三名", value: 2 }, { key: "第四名", value: 3 },
        { key: "第五名", value: 4 }, { key: "第六名", value: 5 }, { key: "第七名", value: 6 }, { key: "第八名", value: 7 }, { key: "第九名", value: 8 }, { key: "第十名", value: 9 }];
        this.numberList = [{ key: "号码一", value: '01' }, { key: "号码二", value: '02' }, { key: "号码三", value: '03' }, { key: "号码四", value: '04' }, { key: "号码五", value: '05' },
        { key: "号码六", value: '06' }, { key: "号码七", value: '07' }, { key: "号码八", value: '08' }, { key: "号码九", value: '09' }, { key: "号码十", value: '10' }];
        this.state = {
            loading: false,
            list: [],
            menuSelected: "位置走势",
            positionSelected: 0,
            numberSelected: '01',
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
                this.positionChart(data.data, this.state.positionSelected);
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        })
    }

    //位置走势
    positionChart(data, index) {
        let xAxis = this.getNumber(data);
        let list = this.getNumberListByIndex(data, index);
        let end = 24 / (this.props.currentPeriods / 50);
        // 基于准备好的dom，初始化echarts实例
        this.createChart(echarts.init(document.getElementById('charts')), xAxis, list, end);
    }

    //号码走势
    numberChart(data, number) {
        let xAxis = this.getNumber(data);
        let list = this.getIndexListByNumber(data, number);
        let end = 24 / (this.props.currentPeriods / 50);
        // 基于准备好的dom，初始化echarts实例
        this.createChart(echarts.init(document.getElementById('charts')), xAxis, list, end);
    }

    //冠亚和走势
    gyhChart(data) {
        let xAxis = this.getNumber(data);
        let list = this.getGyhList(data);
        let end = 24 / (this.props.currentPeriods / 50);
        // 基于准备好的dom，初始化echarts实例
        this.createChart(echarts.init(document.getElementById('charts')), xAxis, list, end);
    }

    //获取所有期数
    getNumber(data) {
        let list = [];
        data.forEach(item => {
            let str = String(item.number);
            list.push(str.substring(str.length - 2));
        });
        return list;
    }

    //根据位置获取号码
    getNumberListByIndex(data, index) {
        let list = [];
        data.forEach(item => {
            let str = Number(item.kj_data[index]);
            list.push(str);
        });
        return list;
    }

    //根据号码获取位置
    getIndexListByNumber(data, number) {
        let list = [];
        data.forEach(item => {
            let str = item.kj_data.indexOf(number);
            list.push(str);
        });
        return list;
    }

    //获取冠亚和列表
    getGyhList(data) {
        let list = [];
        data.forEach(item => {
            let str = Number(item.kj_data[0]) + Number(item.kj_data[1]);
            list.push(str);
        });
        return list;
    }

    createChart(myChart, xAxisData, data, end) {
        // 指定图表的配置项和数据
        var option = {
            tooltip: {},
            xAxis: {
                data: xAxisData
            },
            yAxis: {},
            dataZoom: [{
                show: false,
                realtime: true,
                height: 20,
                start: 0,
                end: end
            }, {
                type: 'inside'
            }],
            series: [{
                type: 'line',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        color: "black"
                    }
                },
                data: data
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }


    renderMenuListView() {
        return this.menuList.map((item, index) => {
            let flag = this.state.menuSelected == item;
            return (<div key={index} className="flex-center" onClick={() => { this.selectedMenu(item) }}
                style={{ flex: "1", color: flag ? "#ff3344" : "black", fontWeight: flag ? "bold" : "normal" }}>{item}</div>)
        });
    }

    selectedMenu(item) {
        this.setState({ menuSelected: item });
        if (item == "位置走势") {
            this.positionChart(this.state.list, this.state.positionSelected);
        } else if (item == "号码走势") {
            this.numberChart(this.state.list, this.state.numberSelected);
        } else {
            this.gyhChart(this.state.list);
        }
    }

    renderPositionList() {
        return this.positionList.map((item, index) => {
            let flag = this.state.positionSelected == item.value;
            return (<div key={index} className="flex-center" onClick={() => { this.setState({ positionSelected: item.value }); this.positionChart(this.state.list, item.value) }}
                style={{ flex: "1", color: flag ? "#ff3344" : "black" }}>{item.key}</div>)
        });
    }

    renderNumberList() {
        return this.numberList.map((item, index) => {
            let flag = this.state.numberSelected == item.value;
            return (<div key={index} className="flex-center" onClick={() => { this.setState({ numberSelected: item.value }); this.numberChart(this.state.list, item.value) }}
                style={{ flex: "1", color: flag ? "#ff3344" : "black" }}>{item.key}</div>)
        });
    }


    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="wh100">
                    <div className="w100 flex" style={{ height: "36px", flexDirection: "row", fontSize: "14px" }}>
                        {this.renderMenuListView()}
                    </div>
                    <div className="w100" style={{ height: "36px", fontSize: "14px", overflow: "auto", display: this.state.menuSelected != "冠亚和走势" ? "block" : "none" }}>
                        <div style={{ width: "200%", display: this.state.menuSelected == "位置走势" ? "flex" : "none" }} className="h100 flex">
                            {this.renderPositionList()}
                        </div>
                        <div style={{ width: "200%", display: this.state.menuSelected == "号码走势" ? "flex" : "none" }} className="h100 flex">
                            {this.renderNumberList()}
                        </div>
                    </div>
                    <div className="w100" id="charts" style={{ height: "calc(100% - 72px)" }}></div>
                </div>
            </div>
        );
    }
}
