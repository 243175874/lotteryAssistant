import React, { Component } from "react";
import FunctionMenu from '../../../components/lotteryArea/functionMenu'
const path = "../../assets/img/lottery/menu/";

//幸运飞艇
export default class LuckyAirship extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { icon: `${path}icon_mftj.png`, icon_press: `${path}icon_mftj_press.png`, name: "免费参考", type: "预测", place: "menu" },
                { icon: `${path}icon_lskj.png`, icon_press: `${path}icon_lskj_press.png`, name: "历史开奖", type: "综合", place: "menu" },
                { icon: `${path}icon_lzfx.png`, icon_press: `${path}icon_lzfx_press.png`, name: "路珠分析", type: "综合", place: "menu" },
                { icon: `${path}icon_lrfx.png`, icon_press: `${path}icon_lrfx_press.png`, name: "冷热分析", type: "综合", place: "menu" },
                { icon: `${path}icon_hbzs.png`, icon_press: `${path}icon_hbzs_press.png`, name: "横板走势", type: "综合", place: "list" },
                { icon: `${path}icon_dxyl.png`, icon_press: `${path}icon_dxyl_press.png`, name: "大小遗漏", type: "遗漏", place: "list" },
                { icon: `${path}icon_dsyl.png`, icon_press: `${path}icon_dsyl_press.png`, name: "单双遗漏", type: "遗漏", place: "list" },
                { icon: `${path}icon_lmtj.png`, icon_press: `${path}icon_lmtj_press.png`, name: "两面长龙", type: "遗漏", place: "list" },
                { icon: `${path}icon_gytj.png`, icon_press: `${path}icon_gytj_press.png`, name: "冠亚统计", type: "遗漏", place: "list" },
                { icon: `${path}icon_dxls.png`, icon_press: `${path}icon_dxls_press.png`, name: "大小历史", type: "历史", place: "list" },
                { icon: `${path}icon_dsls.png`, icon_press: `${path}icon_dsls_press.png`, name: "单双历史", type: "历史", place: "list" },
                { icon: `${path}icon_lhls.png`, icon_press: `${path}icon_lhls_press.png`, name: "龙虎历史", type: "历史", place: "list" }],
        };
    }


    render() {
        return (
            <div className="wh100">
                <div className="w100" style={{ height: "calc(100% - 55px)" }}>
                </div>

                <div className="w100" style={{ height: "55px", borderTop: "1px solid #BCBCBC", position: "fixed", bottom: "0", left: "0", zIndex: "20" }}>
                    <FunctionMenu menuList={this.state.menuList}></FunctionMenu>
                </div>
            </div>
        );
    }
}