import React, { Component } from "react";
import Prompt from '../dialog/prompt'
import { DatePicker } from 'antd-mobile';
export default class MarkSixLotteryHistoryHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderState: "升序",
            currentYear: new Date().getFullYear()
        };
    }

    order() {
        if (this.state.orderState == "升序") {
            this.props.orderByAscending();
            this.setState({ orderState: "降序" });
        } else {
            this.props.orderByDescending();
            this.setState({ orderState: "升序" });
        }
    }


    //选择年份
    promptCallback(value) {
        let year = Number(value);
        if (year < 2050 && year > 2000) {
            this.setState({ currentYear: value });
            this.props.filterHistoryListByYear(value, this.state.orderState);
        }
    }

    render() {
        let btnStyle = { boxSizing: "border-box", width: "14%", height: "75%", fontSize: "11px", color: "#999999", border: "1px solid #999999", borderRadius: "15px" };
        let btn2Style = btnStyle;
        btn2Style["marginLeft"] = "10px";
        return (
            <div className="w100 flex align-item-center" style={{ height: "30px" }}>
                <Prompt value={this.state.currentYear} callback={this.promptCallback.bind(this)} ref="prompt" title={"请输入年份"}></Prompt>
                <div className="h100 flex align-item-center" style={{ width: "54%", paddingLeft: "6%", fontSize: "13px", color: "#ff7344" }}>{this.state.currentYear}年历史推荐</div>
                <div className="flex-center" onClick={() => { this.order() }} style={btnStyle}>{this.state.orderState}</div>
                <div className="flex-center" style={btn2Style} onClick={() => { this.refs.prompt.setState({ isShow: true }) }}>{this.state.currentYear}</div>
            </div>
        );
    }
}
