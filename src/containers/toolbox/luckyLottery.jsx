import React, { Component } from "react";
import { NavBar, Icon } from 'antd-mobile';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import '../../assets/css/luckyTurntable.css'
import CommonJS from '../../assets/js/common'
import LotteryBall from '../../components/common/lotteryBall'

export default class LuckyLottery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lotteryList: [],
            start: false
        };
    }

    renderBallListView() {
        return (
            <div className="flex" style={{ width: "280px", height: '50px', marginTop: "25px" }}>
                {this.state.lotteryList.map((item, index) => {
                    return index != 6 ?
                        <div key={index} className="h100 flex-center pr" style={{ width: '30px', marginLeft: '5px' }}>
                            <LotteryBall width={'30px'} height={'30px'} number={item}></LotteryBall>
                        </div> :
                        <div key={index} className="h100  flex-center" style={{ width: "24%" }}>
                            <div className="h100 flex-center" style={{ width: '40%', marginLeft: '2%' }}>
                                <img className="w50" src={require("../../assets/img/lotteryResult/icon_add.png")} />
                            </div>
                            <div className="h100 flex-center pr" style={{ width: '42%', marginLeft: '2%' }}>
                                <LotteryBall width={'30px'} height={'30px'} number={item}></LotteryBall>
                            </div>
                        </div>
                })}
            </div>
        )
    }

    //获取7个随机得号码
    getRandomList() {
        let list = [];

        while (list.length < 7) {
            let randomNumber = CommonJS.getRandom(1, 49);
            if (list.indexOf(randomNumber) == -1) {
                list.push(randomNumber);
            }
        }

        setTimeout(() => {
            this.setState({ lotteryList: list });
            this.setState({ start: false }); //还原动画插件
        }, 3000);

    }

    render() {
        return (
            <div className="wh100 bgwhite">
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >幸运摇奖</NavBar>
                <img className="w100" src={require('../../assets/img/toolbox/img_lucky_flags_n.png')} alt="" />

                <div className="pr" style={{
                    width: "240px", height: "240px", margin: "0 auto", marginTop: "40px"
                }}>
                    <div className="pa"
                        onClick={() => { this.setState({ start: true, lotteryList: [] }); this.getRandomList() }}
                        style={{
                            width: "50px", height: "50px", top: "50%", left: "50%", zIndex: "10", marginLeft: "-25px", marginTop: "-25px",
                            background: `url(${require('../../assets/img/toolbox/img_lucky_darw_btn.png')})`, backgroundSize: "100% 100%"
                        }}></div>
                    <CSSTransition in={this.state.start} timeout={3000} classNames="turntable">
                        <div className="wh100" style={{
                            background: `url(${require('../../assets/img/toolbox/img_lucky_darw_1.png')})`,
                            backgroundSize: "100% 100%"
                        }}>
                        </div>
                    </CSSTransition>
                </div>

                <div className="flex-center" style={{
                    width: "320px", height: "130px", margin: "0 auto", marginTop: "30px",
                    background: `url(${require('../../assets/img/toolbox/img_machines_lucky_w_n.png')})`, backgroundSize: "100% 100%"
                }}>

                    {this.renderBallListView()}
                </div>

                <div className="w100 text-center" style={{ marginTop: "70px", fontSize: "12px", color: "#E06E4F" }}>
                    <p>小提示：打开锦囊将获得本期一道六合谜题，参透谜题将获得本</p>
                    <p>期中奖号码，快来打开您的玄机之旅吧！</p>
                </div>
            </div>
        );
    }
}
