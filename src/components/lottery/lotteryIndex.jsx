import React, { Component } from "react";
import MarkSixResults from './markSixResults'
import LoteryTemplateOne from './lotteryTemplate_one'
import LoteryTemplateTwo from './lotteryTemplate_two'
import LoteryTemplateThree from './lotteryTemplate_three'
export default class LotteryIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    //根据彩票名称取得相对应的彩票view
    renderLotteryView() {
        if (this.props.data.class == 6) {
            //return (<div>{this.props.data.title}<br />没有数据，暂时注释起来</div>);
            //香港六合彩
            return (<MarkSixResults haoma={this.props.data.kj.haoma} haoma_sx={this.props.data.kj.haoma_sx} kj_w={this.props.data.next_kj.kj_w} title={this.props.data.title} number={this.props.data.kj.number} kj_time={this.props.data.next_kj.kj_time} ></MarkSixResults>);
        } else if (this.props.data.class == 3 || this.props.data.class == 4 ||
            this.props.data.class == 7 || this.props.data.class == 8 || this.props.data.class == 9 || this.props.data.class == 10) {
            return (<LoteryTemplateOne data={this.props.data}></LoteryTemplateOne>);
        } else if (this.props.data.class == 1) {
            //北京赛车，幸运飞艇
            //return (<div>{this.props.data.title}<br />没有数据，暂时注释起来</div>);
            return (<LoteryTemplateTwo data={this.props.data}></LoteryTemplateTwo>);
        } else if (this.props.data.class == 2) {
            //加拿大28，PC蛋蛋，北京快乐8
            //return (<div>{this.props.data.title}<br />没有数据，暂时注释起来</div>);
            return (<LoteryTemplateThree data={this.props.data}></LoteryTemplateThree>);
        } {
            return (<div>{this.props.data.title}</div>);
        }
    }

    render() {
        return (
            this.renderLotteryView()
        );``
    }
}
