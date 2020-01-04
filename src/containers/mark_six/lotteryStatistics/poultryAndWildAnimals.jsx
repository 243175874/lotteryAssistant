import React, { Component } from "react";
import { ActivityIndicator } from 'antd-mobile';
import { post } from '../../../fetch/post.js';
import Prompt from '../../../components/dialog/prompt'
export default class LastNumberBigAndSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentYear: new Date().getFullYear(),
            recordList: []
        };
    }

    componentWillMount() {
        //获取开奖记录数据
        this.getLotteryRecordList(this.state.currentYear);
    }

    //获取开奖记录数据
    getLotteryRecordList(year) {
        post('/v1/api/lottery/search', { year }).then(data => {
            if (data.code == 200) {
                this.setState({ recordList: this.initRecordList(data.data) });
            }
            this.setState({ loading: false });//关闭loading

        });
    }

    //初始化记录列表
    initRecordList(data) {
        let list = [];
        data.forEach(item => {
            let data = [];
            data = item.jy;
            list.push({ 'year': item.year, 'period': item.period, 'jy': data });
        });
        return list;
    }

    //选择年份
    promptCallback(value) {
        let year = Number(value);
        if (year < 2050 && year > 2000) {
            this.setState({ currentYear: value });
            this.getLotteryRecordList(value);
        }
    }


    //渲染记录列表
    renderRecordListView() {
        ///console.log(this.state.recordList);
        return this.state.recordList.map((item, index, array) => {
            //console.log(item);
            return (
                <div key={index} className="w100 flex" style={{
                    height: "30px", fontSize: "12px", background: index % 2 == 0 ? "white" : "#F6F7FB",
                    borderBottom: array.length - 1 == index ? "1px solid #D6D6D6" : "0"
                }}>
                    <div className="h100 flex-center" style={{ width: "90px" }}>{item.year}年/{item.period}期</div>
                    <ul className="h100 flex" style={{ width: "calc(100% - 90px)" }}>
                        {this.renderRecordItemView(item, index)}
                    </ul>
                </div>)
        });
    }

    renderRecordItemView(item, index) {
        return item.jy.map((element, i) => {
            return (
                <li key={i} className="flex-center" style={{ width: "14.2%", borderLeft: "1px solid #D6D6D6" }}>
                    <div className="flex-center">
                        {element == "家" ? <span style={{ color: "#ff3344" }}>家</span> : <span style={{ color: "#0068b7" }}>野</span>}
                    </div>
                </li>
            )
        })
    }

    render() {
        //按钮样式
        const btnStyle = {
            boxSizing: "border-box", width: "13.5%", height: "75%", marginRight: "10px",
            fontSize: "11px", borderRadius: "15px", color: "#999999", border: "1px solid #999999"
        }
        //头部彩球序号样式
        const itemWidth = { width: "14.2%", borderLeft: "1px solid #D6D6D6" };
        return (
            <div className="wh100">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <Prompt value={this.state.currentYear} callback={this.promptCallback.bind(this)} ref="prompt" title={"请输入年份"}></Prompt>
                <div className="w100 flex align-item-center" style={{ height: "30px", background: "white", justifyContent: "flex-end" }}>
                    <div className="flex-center" style={btnStyle} onClick={() => { this.refs.prompt.setState({ isShow: true }) }}>{this.state.currentYear}</div>
                </div>

                <div className="w100 bgWhite" style={{ height: "calc(100% - 30px)" }}>
                    <header className="w100 flex" style={{ height: "30px", fontSize: "12px", background: "#E6E6E6" }}>
                        <div className="h100 flex-center" style={{ width: "90px" }}>年份/期数</div>
                        <ul className="h100 flex" style={{ width: "calc(100% - 90px)" }}>
                            <li className="flex-center" style={itemWidth}>一</li>
                            <li className="flex-center" style={itemWidth}>二</li>
                            <li className="flex-center" style={itemWidth}>三</li>
                            <li className="flex-center" style={itemWidth}>四</li>
                            <li className="flex-center" style={itemWidth}>五</li>
                            <li className="flex-center" style={itemWidth}>六</li>
                            <li className="flex-center" style={itemWidth}>特码</li>
                        </ul>
                    </header>
                    <main className="w100" style={{ height: "calc(100% - 30px)", overflow: "auto" }}>
                        {this.renderRecordListView()}
                    </main>
                </div>

            </div>
        );
    }
}
