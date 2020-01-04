import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { NavBar } from 'antd-mobile'
class DiscoveringTreasure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { src: "../../assets/img/home/icon_chests_lovers.png", label: "恋人特码", pageRouter: "/loversCode" },
                { src: "../../assets/img/home/icon_chests_horse.png", label: "生肖卡牌", pageRouter: "/animalsCard" },
                { src: "../../assets/img/home/icon_chests_shake.png", label: "摇一摇", pageRouter: "/shake" },
                { src: "../../assets/img/home/icon_chests_kits.png", label: "玄机锦囊", pageRouter: "/mysteriousBag" },
                { src: "../../assets/img/home/icon_chests_lucky.png", label: "幸运摇奖", pageRouter: "/luckyLottery" },
                { src: "../../assets/img/home/icon_chests_turntable.png", label: "波肖转盘", pageRouter: "/shengxiaoTurntable" },
                { src: "../../assets/img/home/icon_chests_data.png", label: "搅珠日期", pageRouter: "/calendar" },
                { src: "../../assets/img/home/icon_chests_measure.png", label: "天机测算", pageRouter: "/forecast" },
                { src: "../../assets/img/home/icon_chests_code.png", label: "挑码助手", pageRouter: "/selectCodeAssistant" }
            ]
        };
    }

    renderGrid() {
        return this.state.data.map((item, index) => (
            <div key={index} className="w33 fl" style={{ padding: "3%" }}>
                <div onClick={() => this.props.history.push(item.pageRouter)} className="w100 bgWhite flex flex-column" style={{ alignItems: "center", padding: "15% 20%", borderRadius: "10px" }}>
                    <img className="w70" src={item.src} />
                    <div className="w100 clearfix flex-center" style={{ fontSize: '13px', marginTop: "20%" }}>{item.label}</div>
                </div>
            </div>
        ));
    }
    
    render() {
        return (
            <div className="clearfix">
                <NavBar className="navbar_bg_level-one">工具宝箱</NavBar>
                {this.renderGrid()}
            </div>
        );
    }
}
export default withRouter(DiscoveringTreasure)