import React, { Component } from "react";
import { NavBar, Icon, Toast, ActivityIndicator } from 'antd-mobile';
import { post } from '../../fetch/post.js';
import { asyncComponent } from 'react-async-component';
const Introduction = asyncComponent({ name: "Introduction", resolve: () => import('../../components/common/introduction') });
import LotteryBall from '../../components/common/lotteryBall'
import CommonJS from '../../assets/js/common'
export default class Shake extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isFinish: false,
            isShowBtn: true,
            lotteryList: []
        };
    }

    componentWillMount() {
        this.getShakeData();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取服务器数据
    getShakeData() {
        post("/v1/api/hunt/get_rand?type=3").then(data => {
            this.setState({ loading: false });
            if (data.code == 200 && data.data.content != "") {
                let lotteryList = data.data.content.split(',').map(item => Number(item));
                this.setState({ lotteryList, isShowBtn: false, isFinish: true });
            }
        });
    }

    //向服务器存储数据
    setShakeData(content) {
        post("/v1/api/hunt/save_rand", { type: 3, content: content.toString() }).then(data => {
            if (data.code == 200) {
                this.setState({ isFinish: true, lotteryList: content });
            }
        });
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
            this.setShakeData(list);
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
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >摇一摇</NavBar>
                <Introduction content={'试试您的手气到底有多准！只要摇一摇，就能算出专属您的本期特码！'}></Introduction>

                <div className="flex-center" style={{
                    width: "240px", height: "240px", margin: "0 auto", marginTop: "50px", display: this.state.isFinish ? "flex" : "none",
                    background: `url(${require('../../assets/img/toolbox/img_shake_phone_p.png')})`, backgroundSize: "100% 100%",
                }}><div className="flex-center">{this.renderLotteryListView()}</div></div>

                <div style={{
                    width: "240px", height: "240px", margin: "0 auto", marginTop: "50px", display: this.state.isFinish ? "none" : "block",
                    background: `url(${require('../../assets/img/toolbox/img_shake_phone_n.png')})`, backgroundSize: "100% 100%",
                }}></div>

                <div className="flex-center" style={{
                    margin: "0 auto", marginTop: "30px", width: "140px", height: "35px", color: "white", fontSize: "12px",
                    background: `url(${require('../../assets/img/toolbox/btn_matching_n.png')})`, backgroundSize: "100% 100%", visibility: this.state.isShowBtn ? "visible" : "hidden"
                }} onClick={() => { this.startShake() }}>开始摇一摇</div>
                <div className="w100 text-center" style={{ marginTop: "30px", fontSize: "12px", color: "#E06E4F" }}>小提示：每期只能进行一次幸运摇一摇</div>
            </div>
        );
    }
}
