import React, { Component } from "react";
import Lottery from '../../components/index/lottery'
import Grid from '../../components/index/grid'
import { Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js'
import { connect } from 'react-redux'
import { setSelectedTab, setCurrentLotteryName, setCurrentLotteryId, setCurrentLotteryType } from '../../redux/action'
@connect(
    state => ({ selectedTab: state.selectedTab, currentLotteryName: state.currentLotteryName, currentLotteryId: state.currentLotteryId }),
    { setSelectedTab, setCurrentLotteryName, setCurrentLotteryId, setCurrentLotteryType }
)
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabSelected: "六合专区",
            lottertArea: "六合专区",
            cp_menu: [],
            app_menu: [],
        };
    }

    //set selected property
    setTabSelect(str) {
        //save last selected
        let lastSelected = this.state.tabSelected;
        this.setState({
            tabSelected: str
        });
        setTimeout(() => {
            //修改彩票区域(六合彩，彩票专区)的标识，并延迟修改，用户动态改变彩票区域的高度
            this.setState({
                lottertArea: str
            });
        }, 600);

        let marginLeft = this.refs.grid.style.marginLeft;
        marginLeft = Number(marginLeft.substr(0, marginLeft.length - 1));
        //console.log(marginLeft);
        if (str == this.state.tabSelected || (marginLeft != -100 && marginLeft != 0)) {
            //if the div cannot move,you will set state tabSelected to the last value
            this.setState({
                tabSelected: lastSelected
            });
            return;
        }

        //requestAnimationFrame()
        let timer = setInterval(() => {
            if (str == '六合专区') {
                marginLeft += 2;
                this.refs.grid.style.marginLeft = `${marginLeft}%`
            } else {
                marginLeft -= 2;
                this.refs.grid.style.marginLeft = `${marginLeft}%`
            }
            if (marginLeft == -100 || marginLeft == 0) {
                window.clearInterval(timer);
            }
        }, 1);
    }

    //进入功能页面
    enterSixLotteryPage(id) {
        if (id == 1) {
            this.props.history.push('/markSixLotteryVideo');
        } else if (id == 29) {
            this.props.history.push('/markSixLotteryHistory');
        } else if (id == 27) {
            this.props.history.push('/lotteryQueryAssistant');
        } else if (id == 30) {
            this.props.history.push('/lotteryStatistics');
        } else if (name == "六合图库") {
            if (localStorage.getItem("cs_token") !== null) {
                this.props.history.push('/picturesLibraryMenu');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (name == "六合高手") {
            if (localStorage.getItem("cs_token") !== null) {
                this.props.history.push('/sixMasterHand');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (name == "资料大全") {
            if (localStorage.getItem("cs_token") !== null) {
                this.props.history.push('/sourceBookMenu');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (name == "蟠桃大会") {
            if (localStorage.getItem("cs_token") !== null) {
                this.props.history.push('/peachMeetingMenu');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (id == 33) {
            this.props.setSelectedTab('discoveringTreasure');
        }
    }

    enterLotteryPage(type, name, id) {
        //存入redux
        this.props.setCurrentLotteryName(name);
        this.props.setCurrentLotteryId(id);
        this.props.setCurrentLotteryType(type);
        //console.log(id);
        this.props.history.push('/lotteryCenter');
    }

    lotteryAreaView() {
        return this.props.cp_menu.map((item, index) => (
            <Lottery lotteryData={item} key={index} click={this.enterLotteryPage.bind(this, item.id)}></Lottery>
        ));
    }

    sixAreaView() {
        return this.props.app_menu.map((item, index) =>
            (<Grid src={item.icon} name={item.name} key={index} click={() => { this.enterSixLotteryPage(item.id) }}></Grid>)
        )
    }

    render() {
        let tabSelectStyle1 = {
            fontSize: this.state.tabSelected == '六合专区' ? '14px' : '13px',
            color: this.state.tabSelected == '六合专区' ? 'black' : '#666666'
        }
        let tabSelectStyle2 = {
            fontSize: this.state.tabSelected !== '六合专区' ? '14px' : '13px',
            color: this.state.tabSelected !== '六合专区' ? 'black' : '#666666'
        }
        return (
            <div className="w100 clearfix" >
                <header className="w100 flex-center" style={{ height: '4%' }}>
                    <div className="h100 flex-center" style={{ width: '27%', ...tabSelectStyle1 }} onClick={() => { this.setTabSelect('六合专区') }}>六合专区</div>
                    <div className="h100 flex-center" style={{ width: '27%', ...tabSelectStyle2 }} onClick={() => { this.setTabSelect('彩票专区') }}>彩票专区</div>
                </header>
                <div className="w100 clearfix flex-center">
                    <div className="flex-center" style={{ width: '27%', height: '10px' }}>
                        <img style={{ width: '20%', height: '5px', display: this.state.tabSelected == '六合专区' ? 'block' : 'none' }} src={require("../../assets/img/home/header-unline.png")} />
                    </div>
                    <div className="flex-center" style={{ width: '27%', height: '10px' }}>
                        <img style={{ width: '20%', height: '5px', display: this.state.tabSelected != '六合专区' ? 'block' : 'none' }} src={require("../../assets/img/home/header-unline.png")} />
                    </div>
                </div>
                <main className="clearfix w100" style={{ overflow: this.state.tabSelected == '六合专区' ? 'hidden' : 'inherit' }}>
                    <div className="flex-center" ref="grid" style={{ height: this.state.lottertArea == '六合专区' ? '60%' : "auto", width: '200%', marginLeft: '0%', alignItems: ' flex-start' }}>
                        <div className="w50 h100" style={{ paddingTop: "10px" }}>
                            {this.sixAreaView()}
                        </div>
                        <div className="w50 h100">
                            {this.lotteryAreaView()}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default withRouter(Tab)