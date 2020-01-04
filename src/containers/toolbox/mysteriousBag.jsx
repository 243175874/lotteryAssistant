import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import Introduction from '../../components/common/introduction'
export default class MysteriousBag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotteryList: [],
            open: false,
        };
    }

     
    openBag() {
        this.setState({ open: true });
    }


    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >玄机锦囊</NavBar>
                <Introduction content={'10万六合彩用户都说准的谜题，这一期，你猜出了什么玄机？'}></Introduction>

                <div style={{ width: "165px", height: "210px", margin: "0 auto", display: this.state.open ? "none" : "block" }}>
                    <img className="w100" src="../../assets/img/toolbox/img_kits_close_n.png" />
                </div>

                <div style={{ width: "165px", height: "210px", margin: "0 auto", display: this.state.open ? "block" : "none" }}>
                    <img className="w100" src="../../assets/img/toolbox/img_kits_open_n.png" />
                </div>

                <div className="flex-center" style={{
                    margin: "0 auto", marginTop: "30px", width: "140px", height: "35px", color: "white", fontSize: "12px",
                    background: "url(../../assets/img/toolbox/btn_matching_n.png)", backgroundSize: "100% 100%",
                }} onClick={() => { this.openBag() }}>打开锦囊</div>
                <div className="w100 text-center" style={{ marginTop: "30px", fontSize: "12px", color: "#E06E4F" }}>
                    <p>小提示：打开锦囊将获得本期一道六合谜题，参透谜题将获得本</p>
                    <p>期中奖号码，快来打开您的玄机之旅吧！</p>
                </div>
            </div>
        );
    }
}
