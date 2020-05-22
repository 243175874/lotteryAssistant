import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import { post } from '../../fetch/post.js';
import { asyncComponent } from 'react-async-component';
const Introduction = asyncComponent({ name: "Introduction", resolve: () => import('../../components/common/introduction') });
const MysteriousHistory = asyncComponent({ name: "MysteriousHistory", resolve: () => import('./mysteriousHistory') });

export default class MysteriousBag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotteryList: [],
            open: false,
            mysterious: "",
            isShowHistoryListDialog: false, //往期历史弹出框
        };
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取生肖服务器数据
    getMysteriousData() {
        post("/v1/api/hunt/mysterious").then(data => {
            this.setState({ loading: false });
            if (data.code == 200 && data.data.content != "") {
                this.setState({ open: true, mysterious: data.data.content });
            }
        });
    }

    closeDialog() {
        this.setState({ isShowHistoryListDialog: false });
    }

    render() {
        let style = { position: "fixed", zIndex: "100", top: "0", left: "0", display: this.state.isShowHistoryListDialog ? "block" : "none" };
        return (
            <div className="wh100 bgwhite">
                <div className="w100 h100" style={style}>
                    <MysteriousHistory back={() => { this.closeDialog() }}></MysteriousHistory>
                </div>
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >玄机锦囊</NavBar>
                <Introduction content={'10万六合彩用户都说准的谜题，这一期，你猜出了什么玄机？'}></Introduction>

                <div className="clearfix" style={{ width: "200px", height: "40px", margin: "0 auto", marginTop: "20px" }}>
                    <div className="w100 h100" style={{ display: this.state.open ? "block" : "none" }}>{this.state.mysterious}</div>
                </div>

                <div style={{ width: "165px", height: "210px", margin: "0 auto", display: this.state.open ? "none" : "block" }}>
                    <img className="w100" src={require("../../assets/img/toolbox/img_kits_close_n.png")} />
                </div>

                <div style={{ width: "165px", height: "210px", margin: "0 auto", display: this.state.open ? "block" : "none" }}>
                    <img className="w100" src={require("../../assets/img/toolbox/img_kits_open_n.png")} />
                </div>

                <div className="flex-center" style={{
                    margin: "0 auto", marginTop: "30px", width: "140px", height: "35px", color: "white", fontSize: "12px",
                    background: `url(${require('../../assets/img/toolbox/btn_matching_n.png')})`, backgroundSize: "100% 100%",
                }} onClick={() => { this.getMysteriousData() }}>打开锦囊</div>

                <div className="flex-center" style={{
                    margin: "0 auto", marginTop: "30px", width: "140px", height: "35px", fontSize: "12px",
                    border: "1px solid #F85232", borderRadius: "2px", marginTop: "10px", color: "#F85232"
                }} onClick={() => { this.setState({ isShowHistoryListDialog: true }); }}>往期历史</div>

                <div className="w100 text-center" style={{ marginTop: "30px", fontSize: "12px", color: "#E06E4F" }}>
                    <p>小提示：打开锦囊将获得本期一道六合谜题，参透谜题将获得本</p>
                    <p>期中奖号码，快来打开您的玄机之旅吧！</p>
                </div>
            </div>
        );
    }
}
