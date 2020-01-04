import React, { Component } from "react";
import SixMarkStatistics from './sixMarkStatistics'
import TmHistory from './tmHistory'
import ZmHistory from './zmHistory'
import TmShengXiao from './tmShengXiao'
import ZmShengXiao from './zmShengXiao'
import TmBoSe from './tmBoSe'
import ZmBoSe from './zmBoSe'
import TmWeiShu from './tmWeiShu'
import ZmWeiShu from './zmWeiShu'
import NumberOfWaveband from './numberOfWaveband'
import TmTwoSides from './tmTwoSides'
import ZmSum from './zmSum'
import AttributeReference from './attributeReference'
import LastNumberBigAndSmall from './lastNumberBigAndSmall'
import PoultryAndWildAnimals from './poultryAndWildAnimals'
import ContinuousNumber from './continuousNumber'
import ContinuousShengXiao from './continuousShengXiao'

export default class LotteryStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageTitle: "六合统计",
            isShowTitleTable: false,
            titleList: ["六合统计", "属性参照", "特码历史", "正码历史", "尾数大小", "生肖特码", "生肖正码", "波色特码", "波色正码",
                "特码两面", "特码尾数", "正码尾数", "正码总分", "号码波段", "家禽野兽", "连码走势", "连肖走势"]
        };
    }

    selectTitle(item) {
        this.setState({ currentPageTitle: item });
        this.setState({ isShowTitleTable: false });
    }

    showTitleTable() {
        this.setState({ isShowTitleTable: this.state.isShowTitleTable ? false : true });
    }

    renderTitleTableView() {
        return this.state.titleList.map((item, index) => {
            return (
                <div className="fl flex-center"
                    onClick={() => { this.selectTitle(item) }}
                    style={{
                        width: "28%", height: "30px", marginLeft: "5%", marginTop: "10px", fontSize: "13px",
                        background: item == this.state.currentPageTitle ?
                            "url(../../../assets/img/mark_six/bg_orange_statistical.png)" : "#F5F5F5",
                        backgroundSize: item == this.state.currentPageTitle ? "100% 100%" : "0",
                    }}
                    key={index}>
                    {item}
                </div>
            )
        });
    }

    renderContentView() {
        //return <ContinuousNumber></ContinuousNumber>
        if (this.state.currentPageTitle == "六合统计") {
            return <SixMarkStatistics></SixMarkStatistics>
        } else if (this.state.currentPageTitle == "特码历史") {
            return <TmHistory></TmHistory>
        } else if (this.state.currentPageTitle == "正码历史") {
            return <ZmHistory></ZmHistory>
        } else if (this.state.currentPageTitle == "生肖特码") {
            return <TmShengXiao></TmShengXiao>
        } else if (this.state.currentPageTitle == "生肖正码") {
            return <ZmShengXiao></ZmShengXiao>
        } else if (this.state.currentPageTitle == "波色特码") {
            return <TmBoSe></TmBoSe>
        } else if (this.state.currentPageTitle == "波色正码") {
            return <ZmBoSe></ZmBoSe>
        } else if (this.state.currentPageTitle == "特码尾数") {
            return <TmWeiShu></TmWeiShu>
        } else if (this.state.currentPageTitle == "正码尾数") {
            return <ZmWeiShu></ZmWeiShu>
        } else if (this.state.currentPageTitle == "号码波段") {
            return <NumberOfWaveband></NumberOfWaveband>
        } else if (this.state.currentPageTitle == "特码两面") {
            return <TmTwoSides></TmTwoSides>
        } else if (this.state.currentPageTitle == "正码总分") {
            return <ZmSum></ZmSum>
        } else if (this.state.currentPageTitle == "属性参照") {
            return <AttributeReference></AttributeReference>
        } else if (this.state.currentPageTitle == "尾数大小") {
            return <LastNumberBigAndSmall></LastNumberBigAndSmall>
        } else if (this.state.currentPageTitle == "家禽野兽") {
            return <PoultryAndWildAnimals></PoultryAndWildAnimals>
        } else if (this.state.currentPageTitle == "连码走势") {
            return <ContinuousNumber></ContinuousNumber>
        } else if (this.state.currentPageTitle == "连肖走势") {
            return <ContinuousShengXiao></ContinuousShengXiao>
        } else {
            return (<div>{this.state.currentPageTitle}</div>)
        }
    }

    render() {
        const dialogBgStyle = {
            display: this.state.isShowTitleTable ? "block" : "none",
            position: "fixed", top: "9%", left: "0", zIndex: "100", background: 'rgba(0, 0, 0, 0.3)'
        };
        return (
            <div className="wh100">
                <div className="w100 navbar_bg flex">
                    <div onClick={() => { this.props.history.goBack() }} className="h100 flex align-item-center" style={{ width: "25%" }}>
                        <img style={{ width: "8%", marginLeft: "20px" }} src="../../assets/img/user/icon_goback.png" />
                    </div>
                    <div className="h100" className="w50 flex-center"
                        onClick={() => { this.showTitleTable() }}
                        style={{ color: "white" }}>
                        <div>
                            {this.state.currentPageTitle}
                            {this.state.isShowTitleTable ?
                                (<img style={{ width: "12px", marginLeft: "10px", transform: "rotate(180deg)" }}
                                    src="../../../assets/img/mark_six/icon_tab_unfold.png" />) :
                                (<img style={{ width: "12px", marginLeft: "10px" }}
                                    src="../../../assets/img/mark_six/icon_tab_unfold.png" />)}
                        </div>
                    </div>
                    <div className="h100" style={{ width: "25%" }}></div>
                </div>

                <div className="wh100" onClick={() => { this.showTitleTable() }} style={dialogBgStyle}>
                    <div className="w100 clearfix bgWhite" style={{ position: "fixed", top: "9%", left: "0", paddingBottom: "10px", zIndex: "100" }}>
                        {this.renderTitleTableView()}
                    </div>
                </div>

                <div className="w100" style={{ height: "91%" }}>
                    {this.renderContentView()}
                </div>
            </div>
        );
    }
}
