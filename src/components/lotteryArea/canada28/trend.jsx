import React, { Component } from "react";
import LotteryAPI from '../../../assets/js/lotteryAPI'
import emitter from '../../../assets/js/events'
import { ActivityIndicator, Toast } from 'antd-mobile';
import Common from '../../../assets/js/common'
import { connect } from 'react-redux'
import { setCurrentPeriods } from '../../../redux/action'
import * as echarts from 'echarts'
@connect(
    state => ({ currentPeriods: state.currentPeriods }),
    { setCurrentPeriods }
)
export default class History extends Component {
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


    //总和走势
    sumChart(data) {
        let xAxis = this.getNumber(data);
        let list = this.getSumList(data);
        console.log(list);
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

    //获取总和列表
    getSumList(data) {
        let list = [];
        data.forEach(item => {
            let sum = 0;
            item.kj_data.forEach((item) => {
                sum += Number(item);
            });
            list.push(sum);
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


    //获取历史开奖数据
    getHistoryService(id, number) {
        this.setState({ loading: true });
        LotteryAPI.getHistoryService(id, number).then(data => {
            this.setState({ loading: false });
            if (data.code == 200) {
                this.sumChart(data.data, this.state.positionSelected);
                this.setState({ list: data.data });
            } else {
                this.setState({ list: [] });
            }
        })
    }


    render() {
        return (
            <div className="wh100" style={{ fontSize: "12px" }}>
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <div className="w100 flex-center" style={{ height: "36px", fontSize: "12px", borderTop: "1px solid #E6E6E6", fontSize: "15px", color: "#ff3344", fontWeight: "bold" }}>
                    总和走势
                </div>
                <div className="wh100">
                    <div className="w100" style={{ height: "36px", fontSize: "14px", overflow: "auto" }}>
                    </div>
                    <div className="w100" id="charts" style={{ height: "calc(100% - 72px)" }}></div>
                </div>
            </div>
        );
    }
}
