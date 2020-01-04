import React, { Component } from "react";
import { NavBar, Icon, Toast } from 'antd-mobile';
import LotteryBall from '../../components/common/lotteryBall'
import Introduction from '../../components/common/introduction'
import CommonJS from '../../assets/js/common'
export default class Shake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFinish: false,
            isShowBtn: true,
            lotteryList: []
        };
    }

    //获取3个随机得号码
    getRandomList() {
        let list = [];
        for (let i = 0; i < 3; i++) {
            list.push(CommonJS.getRandom(1, 49));
        }
        return list;
    }

    //开始摇一摇
    startShake() {
        this.setState({ isShowBtn: false });
        setTimeout(() => {
            let list = this.getRandomList();
            this.setState({ isFinish: true, lotteryList: list });
        }, 2000);
    }

    renderLotteryListView() {
        return this.state.lotteryList.map((item, index) => (
            <div key={index} style={{ width: "30px", height: "30px", marginLeft: "20px" }}>
                <LotteryBall width={'30px'} height={'30px'} number={item}></LotteryBall>
            </div>
        ));
    }



    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >摇一摇</NavBar>
                <Introduction content={'试试您的手气到底有多准！只要摇一摇，就能算出专属您的本期特码！'}></Introduction>

                <div className="flex-center" style={{
                    width: "240px", height: "240px", margin: "0 auto", marginTop: "50px", display: this.state.isFinish ? "flex" : "none",
                    background: "url(../../assets/img/toolbox/img_shake_phone_p.png)", backgroundSize: "100% 100%",
                }}><div className="flex-center">{this.renderLotteryListView()}</div></div>

                <div style={{
                    width: "240px", height: "240px", margin: "0 auto", marginTop: "50px", display: this.state.isFinish ? "none" : "block",
                    background: "url(../../assets/img/toolbox/img_shake_phone_n.png)", backgroundSize: "100% 100%",
                }}></div>

                <div className="flex-center" style={{
                    margin: "0 auto", marginTop: "30px", width: "140px", height: "35px", color: "white", fontSize: "12px",
                    background: "url(../../assets/img/toolbox/btn_matching_n.png)", backgroundSize: "100% 100%", visibility: this.state.isShowBtn ? "visible" : "hidden"
                }} onClick={() => { this.startShake() }}>开始摇一摇</div>
                <div className="w100 text-center" style={{ marginTop: "30px", fontSize: "12px", color: "#E06E4F" }}>小提示：每期只能进行一次幸运摇一摇</div>
            </div>
        );
    }
}
