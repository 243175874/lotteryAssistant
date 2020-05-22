import React, { Component } from "react";
import Common from '../../../assets/js/common'
import { asyncComponent } from 'react-async-component';
const FunctionMenu = asyncComponent({ name: "FunctionMenu", resolve: () => import('../../../components/lotteryArea/functionMenu') });
const Header = asyncComponent({ name: "Header", resolve: () => import('../../../components/lotteryArea/header') });
const Recommend = asyncComponent({ name: "Recommend", resolve: () => import('../../../components/lotteryArea/recommend') });
const History = asyncComponent({ name: "History", resolve: () => import('../../../components/lotteryArea/beiJingRacing/history') });
const BeadAnalyse = asyncComponent({ name: "BeadAnalyse", resolve: () => import('../../../components/lotteryArea/beiJingRacing/beadAnalyse') });
const HotAndCold = asyncComponent({ name: "HotAndCold", resolve: () => import('../../../components/lotteryArea/beiJingRacing/hotAndCold') });
const BigAndSmallOmit = asyncComponent({ name: "BigAndSmallOmit", resolve: () => import('../../../components/lotteryArea/bigAndSmallOmit') });
const OddAndEvenOmit = asyncComponent({ name: "OddAndEvenOmit", resolve: () => import('../../../components/lotteryArea/oddAndEvenOmit') });
const DoubleLongDragon = asyncComponent({ name: "DoubleLongDragon", resolve: () => import('../../../components/lotteryArea/beiJingRacing/doubleLongDragon') });
const GyStatistics = asyncComponent({ name: "GyStatistics", resolve: () => import('../../../components/lotteryArea/beiJingRacing/gyStatistics') });
const BigAndSmallHistory = asyncComponent({ name: "BigAndSmallHistory", resolve: () => import('../../../components/lotteryArea/bigAndSmallHistory') });
const OddAndEvenHistory = asyncComponent({ name: "OddAndEvenHistory", resolve: () => import('../../../components/lotteryArea/oddAndEvenHistory') });
const DragonAndTigerHistory = asyncComponent({ name: "DragonAndTigerHistory", resolve: () => import('../../../components/lotteryArea/dragonAndTigerHistory') });
const Trend = asyncComponent({ name: "Trend", resolve: () => import('../../../components/lotteryArea/beiJingRacing/trend') });

// 参考计划
import icon_mftj from '../../../assets/img/lottery/menu/icon_mftj.png'
import icon_mftj_press from '../../../assets/img/lottery/menu/icon_mftj_press.png'
// 历史开奖
import icon_lskj from '../../../assets/img/lottery/menu/icon_lskj.png'
import icon_lskj_press from '../../../assets/img/lottery/menu/icon_lskj_press.png'
// 路珠分析
import icon_lzfx from '../../../assets/img/lottery/menu/icon_lzfx.png'
import icon_lzfx_press from '../../../assets/img/lottery/menu/icon_lzfx_press.png'
// 冷热分析
import icon_lrfx from '../../../assets/img/lottery/menu/icon_lrfx.png'
import icon_lrfx_press from '../../../assets/img/lottery/menu/icon_lrfx_press.png'
// 横板走势
import icon_hbzs from '../../../assets/img/lottery/menu/icon_hbzs.png'
import icon_hbzs_press from '../../../assets/img/lottery/menu/icon_hbzs_press.png'
//大小遗漏
import icon_dxyl from '../../../assets/img/lottery/menu/icon_dxyl.png'
import icon_dxyl_press from '../../../assets/img/lottery/menu/icon_dxyl_press.png'
//单双遗漏
import icon_dsyl from '../../../assets/img/lottery/menu/icon_dsyl.png'
import icon_dsyl_press from '../../../assets/img/lottery/menu/icon_dsyl_press.png'
//两面长龙
import icon_lmtj from '../../../assets/img/lottery/menu/icon_lmtj.png'
import icon_lmtj_press from '../../../assets/img/lottery/menu/icon_lmtj_press.png'
//冠亚统计
import icon_gytj from '../../../assets/img/lottery/menu/icon_gytj.png'
import icon_gytj_press from '../../../assets/img/lottery/menu/icon_gytj_press.png'
//大小历史
import icon_dxls from '../../../assets/img/lottery/menu/icon_dxls.png'
import icon_dxls_press from '../../../assets/img/lottery/menu/icon_dxls_press.png'
//单双历史
import icon_dsls from '../../../assets/img/lottery/menu/icon_dsls.png'
import icon_dsls_press from '../../../assets/img/lottery/menu/icon_dsls_press.png'
//龙虎历史
import icon_lhls from '../../../assets/img/lottery/menu/icon_lhls.png'
import icon_lhls_press from '../../../assets/img/lottery/menu/icon_lhls_press.png'

import { connect } from 'react-redux'
import { setCurrentLotteryName } from '../../../redux/action'
@connect(
    state => ({ currentLotteryName: state.currentLotteryName, currentLotteryPageIndex: state.currentLotteryPageIndex, currentLotteryId: state.currentLotteryId }),
    { setCurrentLotteryName }
)
//北京赛车
export default class BeiJingRacing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [
                { icon: icon_mftj, icon_press: icon_mftj_press, name: "参考计划", type: "预测", place: "menu" },
                { icon: icon_lskj, icon_press: icon_lskj_press, name: "历史开奖", type: "综合", place: "menu" },
                { icon: icon_lzfx, icon_press: icon_lzfx_press, name: "路珠分析", type: "综合", place: "menu" },
                { icon: icon_lrfx, icon_press: icon_lrfx_press, name: "冷热分析", type: "综合", place: "menu" },
                { icon: icon_hbzs, icon_press: icon_hbzs_press, name: "横板走势", type: "综合", place: "list" },
                { icon: icon_dxyl, icon_press: icon_dxyl_press, name: "大小遗漏", type: "遗漏", place: "list" },
                { icon: icon_dsyl, icon_press: icon_dsyl_press, name: "单双遗漏", type: "遗漏", place: "list" },
                { icon: icon_lmtj, icon_press: icon_lmtj_press, name: "两面长龙", type: "遗漏", place: "list" },
                { icon: icon_gytj, icon_press: icon_gytj_press, name: "冠亚统计", type: "遗漏", place: "list" },
                { icon: icon_dxls, icon_press: icon_dxls_press, name: "大小历史", type: "历史", place: "list" },
                { icon: icon_dsls, icon_press: icon_dsls_press, name: "单双历史", type: "历史", place: "list" },
                { icon: icon_lhls, icon_press: icon_lhls_press, name: "龙虎历史", type: "历史", place: "list" }],
            //当前彩种id
            currentLotteryId: "",
        };
    }

    renderContentView(currentLotteryId) {
        //大小遗漏，单双遗漏 菜单选项卡
        const menuList = [{ key: "第一球", value: 0 }, { key: "第二球", value: 1 }, { key: "第三球", value: 2 }, { key: "第四球", value: 3 }, { key: "第五球", value: 4 },
        { key: "第六球", value: 5 }, { key: "第七球", value: 6 }, { key: "第八球", value: 7 }, { key: "第九球", value: 8 }, { key: "第十球", value: 9 }];

        //大小，单双，两面历史  表格 title
        const titleList = ["冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"];

        //龙虎历史 表格 title
        const DragonTigerTitleList = ["冠军", "亚军", "第三名", "第四名", "第五名"];

        if (this.props.currentLotteryPageIndex == "参考计划") {
            const numberTitle = ["冠军", "亚军", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"];
            return (<Recommend id={currentLotteryId} numberTitle={numberTitle}></Recommend>)
        } else if (this.props.currentLotteryPageIndex == "历史开奖") {
            return (<History id={currentLotteryId}></History>)
        } else if (this.props.currentLotteryPageIndex == "路珠分析") {
            return (<BeadAnalyse id={currentLotteryId}></BeadAnalyse>)
        } else if (this.props.currentLotteryPageIndex == "冷热分析") {
            return (<HotAndCold id={currentLotteryId}></HotAndCold>)
        } else if (this.props.currentLotteryPageIndex == "大小遗漏") {
            return (<BigAndSmallOmit id={currentLotteryId} menuList={menuList} menuWidth={"200%"} thresholdValue={5}></BigAndSmallOmit>)
        } else if (this.props.currentLotteryPageIndex == "单双遗漏") {
            return (<OddAndEvenOmit id={currentLotteryId} menuList={menuList} menuWidth={"200%"}></OddAndEvenOmit>)
        } else if (this.props.currentLotteryPageIndex == "两面长龙") {
            return (<DoubleLongDragon id={currentLotteryId}></DoubleLongDragon>)
        } else if (this.props.currentLotteryPageIndex == "冠亚统计") {
            return (<GyStatistics id={currentLotteryId}></GyStatistics>)
        } else if (this.props.currentLotteryPageIndex == "大小历史") {
            return (<BigAndSmallHistory id={currentLotteryId} titleList={titleList} width={"220%"}></BigAndSmallHistory>)
        } else if (this.props.currentLotteryPageIndex == "单双历史") {
            return (<OddAndEvenHistory id={currentLotteryId} titleList={titleList} width={"220%"}></OddAndEvenHistory>)
        } else if (this.props.currentLotteryPageIndex == "龙虎历史") {
            return (<DragonAndTigerHistory id={currentLotteryId} titleList={DragonTigerTitleList}></DragonAndTigerHistory>)
        } else if (this.props.currentLotteryPageIndex == "横板走势") {
            return (<Trend id={currentLotteryId}></Trend>)
        } else {
            return (<div></div>)
        }
    }

    render() {

        let currentLotteryId = this.props.currentLotteryId;
        if(this.props.currentLotteryId == "" ){
            currentLotteryId = localStorage.getItem("currentLotteryId");
        }else{
            localStorage.setItem("currentLotteryId",this.props.currentLotteryId);
        }


        let currentLotteryName = this.props.currentLotteryName;
     
        if(this.props.currentLotteryName == ""){
            currentLotteryName = localStorage.getItem("currentLotteryName");
        }else{
            localStorage.setItem("currentLotteryName",this.props.currentLotteryName);
        }
        
        return (
            <div className="wh100">
                <div className="w100" style={{ height: "calc(100% - 55px)" }}>
                    <Header id={currentLotteryId} name={currentLotteryName}></Header>
                    <div className="w100" style={{ height: "calc(100% - 40px)" }}>
                        {this.renderContentView(currentLotteryId)}
                    </div>
                </div>

                <div className="w100" style={{ height: "55px", borderTop: "1px solid #BCBCBC", position: "fixed", bottom: "0", left: "0", zIndex: "20" }}>
                    <FunctionMenu name={currentLotteryName} menuList={this.state.menuList}></FunctionMenu>
                </div>
            </div>
        );
    }
}
