import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { ActivityIndicator } from 'antd-mobile';
import MarkSixLotteryHistoryHeader from '../../../components/sixLotteryArea/markSixLotteryHistoryHeader'
import MarkSixLotteryHistoryList from '../../../components/sixLotteryArea/markSixLotteryHistoryList'
export default class LotteryHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            //开奖历史
            lotteryHistoryList: [],
            //开奖历史数据备份
            lotteryHistoryListBackups: []
        };
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    componentWillMount() {
        //获取历史开奖列表
        this.getLotteryHistoryList(new Date().getFullYear(), "升序");
    }

    //获取历史开奖列表
    getLotteryHistoryList(year, orderState) {
        post('/v1/api/lottery/history', { year }).then(data => {
            if (data.code == 200) {
                let list = data.data.data;
                console.log(list)
                if (orderState == "升序") {
                    list = list.sort((a, b) => b.period - a.period)
                } else {
                    list = list.sort((a, b) => a.period - b.period)
                }
                this.setState({ lotteryHistoryList: list });
            }
            this.setState({ loading: false });
        });
    }

    //升序
    orderByAscending() {
        let data = this.state.lotteryHistoryList.sort((a, b) => a.period - b.period)
        this.setState({ lotteryHistoryList: data });
    }

    //降序
    orderByDescending() {
        let data = this.state.lotteryHistoryList.sort((a, b) => b.period - a.period)
        this.setState({ lotteryHistoryList: data });
    }

    //根据年份筛选
    filterHistoryListByYear(year, orderState) {
        this.getLotteryHistoryList(year, orderState);
    }

    render() {
        return (
            <div className="wh100">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <MarkSixLotteryHistoryHeader filterHistoryListByYear={this.filterHistoryListByYear.bind(this)} orderByAscending={this.orderByAscending.bind(this)} orderByDescending={this.orderByDescending.bind(this)}></MarkSixLotteryHistoryHeader>
                <div className="w100" style={{ height: "calc(100% - 30px)", overflow: "auto" }}>
                    <MarkSixLotteryHistoryList list={this.state.lotteryHistoryList}></MarkSixLotteryHistoryList>
                </div>
            </div>
        );
    }
}
