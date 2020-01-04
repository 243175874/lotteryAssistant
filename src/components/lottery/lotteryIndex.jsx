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
        if (this.props.data.name == "xglhc") {
            //return (<div>{this.props.data.title}<br />没有数据，暂时注释起来</div>);
            //香港六合彩
            return (<MarkSixResults haoma={this.props.data.kj.haoma} haoma_sx={this.props.data.kj.haoma_sx} kj_w={this.props.data.next_kj.kj_w} title={this.props.data.title} number={this.props.data.kj.number} kj_time={this.props.data.next_kj.kj_time} ></MarkSixResults>);
        } else if (
            this.props.data.name == "xjssc" || //新疆时时彩
            this.props.data.name == "cqssc" || //重庆时时彩
            this.props.data.name == "tjssc" || //天津时时彩
            this.props.data.name == "ahk3" || //安徽快三
            this.props.data.name == "gxk3" || //广西快三
            this.props.data.name == "jsks" || //江苏快三
            this.props.data.name == "gdklsf" || //广东快乐十分
            this.props.data.name == "tjklsf" ||   //天津快乐十分
            this.props.data.name == "hunklsf" ||//湖南快乐十分
            this.props.data.name == "gdsyxw" || //广东11选5
            this.props.data.name == "jx11x5" ||  //江西11选5
            this.props.data.name == "11ydj" || //11运夺金
            this.props.data.name == "sh11x5" || //上海11选5
            this.props.data.name == "fc3d" || //福彩3D
            this.props.data.name == "pl3" || //排列3
            this.props.data.name == "shssl" ||//上海时时乐
            this.props.data.name == "bjk3" ||//北京快3
            this.props.data.name == "hebk3" || //河北快3
            this.props.data.name == "hubk3" || //湖北快3
            this.props.data.name == "xync" //幸运农场
        ) {
            return (<LoteryTemplateOne data={this.props.data}></LoteryTemplateOne>);
        } else if (this.props.data.name == "xyft" || this.props.data.name == "bjpks") {
            //北京赛车，幸运飞艇
            //return (<div>{this.props.data.title}<br />没有数据，暂时注释起来</div>);
            return (<LoteryTemplateTwo data={this.props.data}></LoteryTemplateTwo>);
        } else if (this.props.data.name == "jnd28" || this.props.data.name == "pcdd" || this.props.data.name == "bjklb") {
            //加拿大28，PC蛋蛋，北京快乐8
            //return (<div>{this.props.data.title}<br />没有数据，暂时注释起来</div>);
            return (<LoteryTemplateThree data={this.props.data}></LoteryTemplateThree>);
        } {
            return (<div>{this.props.data.title}<br />暂无记录</div>);
        }
    }

    render() {
        return (
            this.renderLotteryView()
        );
    }
}
