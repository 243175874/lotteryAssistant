import React, { Component } from "react";
import { post } from '../../fetch/post';
import '../../assets/css/lottery.css'
export default class Lottery extends Component {
    constructor(props) {
        super(props);
    }

    initData() {
        return this.props.lotteryData.son.map((n, i) => {
            return (
                <div key={i} style={{ width: "24%" }} onClick={() => { this.props.click(n.name, n.id) }}>
                    <div className="text-center"> <img style={{ width: '46px' }} src={n.icon} alt="" onError={(e) => { e.target.onerror = null; e.target.src = "http://500w1.oss-cn-hongkong.aliyuncs.com/style/66.png?x-oss-process=style/100w" }} /> </div>
                    <p className="text-center" style={{ fontWeight: "600", fontFamily: "宋体", margin: "10px 0", fontSize: "12px" }}> {n.name} </p>
                </div>
            )
        })
    }

    render() {
        return (
            <template style={{ display: 'block', background: '#fff', marginBottom: '10px' }}>
                <div style={{ padding: '0 20px' }}>
                    <div style={{ paddingTop: '5px', paddingBottom: '22px', fontSize: '16px', color: '#333333', fontWeight: 'bold' }}><img style={{ width: '16px', transform: 'rotate(90deg)', position: 'relative', bottom: '4px' }}
                     src={require("../../assets/img/home/header-unline.png")} alt="" />{this.props.lotteryData.name}</div>
                    <div className="w100 clearfix flex" style={{ flexWrap: "wrap" }}>
                        {this.initData()}
                    </div>
                </div>
            </template>
        );
    }
}
