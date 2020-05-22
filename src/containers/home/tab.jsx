import React, { Component } from "react";
import Lottery from '../../components/index/lottery'
import Grid from '../../components/index/grid'
import common from '../../assets/js/common'
import { Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js'
import { connect } from 'react-redux'
import { setSelectedTab, setCurrentLotteryName, setCurrentLotteryId, setCurrentLotteryType, setTabSelected } from '../../redux/action'
@connect(
    state => ({ selectedTab: state.selectedTab, currentLotteryName: state.currentLotteryName, currentLotteryId: state.currentLotteryId, tabSelected: state.tabSelected }),
    { setSelectedTab, setCurrentLotteryName, setCurrentLotteryId, setCurrentLotteryType, setTabSelected }
)
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            special: [
                { key: "lottery", label: "彩票专区", is_open: 0 },
                { key: "article", label: "六合专区", is_open: 0 }],
        }
    }


    componentDidMount() {
        this.getConfig();
    }

    //set selected property
    setTabSelect(str) {
        //save last selected
        let lastSelected = this.props.tabSelected;
        this.props.setTabSelected(str);
        // setTimeout(() => {
        //     //修改彩票区域(六合彩，彩票专区)的标识，并延迟修改，用户动态改变彩票区域的高度
        //     this.props.setTabSelected(str);
        // }, 600);

        let marginLeft = this.refs.grid.style.marginLeft;
        marginLeft = Number(marginLeft.substr(0, marginLeft.length - 1));
        //console.log(marginLeft);
        if (str == this.props.tabSelected || (marginLeft != -100 && marginLeft != 0)) {
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

    async getConfig() {
        let data = await common.getConfigService();
        if (data.code == 200) {
            this.setState({ special: JSON.parse(data.data.app_special).special });
        }
    }

    //进入功能页面
    enterSixLotteryPage(id) {
        //console.log(id);
        if (id == 1) {
            this.props.history.push('/markSixLotteryVideo');
        } else if (id == 29) {
            this.props.history.push('/markSixLotteryHistory');
        } else if (id == 27) {
            this.props.history.push('/lotteryQueryAssistant');
        } else if (id == 30) {
            this.props.history.push('/lotteryStatistics');
        } else if (id == 26) {
            //六合图库
            this.props.history.push('/picturesLibraryMenu');
        } else if (id == 28) {
            //六合高手
            this.props.history.push('/sixMasterHand');
        } else if (id == 31) {
            //资料大全
            this.props.history.push('/sourceBookMenu');
        } else if (id == 32) {
            //蟠桃大会
            this.props.history.push('/peachMeetingMenu');
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
            fontSize: this.props.tabSelected == '六合专区' ? '14px' : '13px',
            color: this.props.tabSelected == '六合专区' ? 'black' : '#666666',
            display: this.state.special[0].is_open == 1 ? 'flex' : 'none'
        }

        let tabSelectStyle2 = {
            fontSize: this.props.tabSelected !== '六合专区' ? '14px' : '13px',
            color: this.props.tabSelected !== '六合专区' ? 'black' : '#666666',
            display: this.state.special[1].is_open == 1 ? 'flex' : 'none'
        }

        return (
            <div className="w100 clearfix" >
                <header className="w100 flex-center" style={{ height: '4%' }}>
                    <div className="h100 flex-center" style={{ width: '27%', ...tabSelectStyle2 }} onClick={() => { this.setTabSelect(this.state.special[0].label) }}>{this.state.special[0].label}</div>
                    <div className="h100 flex-center" style={{ width: '27%', ...tabSelectStyle1 }} onClick={() => { this.setTabSelect(this.state.special[1].label) }}>{this.state.special[1].label}</div>
                </header>
                <div className="w100 clearfix flex-center">
                    <div className="flex-center" style={{ width: '27%', height: '10px' }}>
                        <img style={{ width: '20%', height: '5px', display: this.props.tabSelected != '六合专区' ? 'block' : 'none' }} src={require("../../assets/img/home/header-unline.png")} />
                    </div>
                    <div className="flex-center" style={{ width: '27%', height: '10px' }}>
                        <img style={{ width: '20%', height: '5px', display: this.props.tabSelected == '六合专区' ? 'block' : 'none' }} src={require("../../assets/img/home/header-unline.png")} />
                    </div>
                </div>
                <main className="clearfix w100" style={{ overflow: this.props.tabSelected == '六合专区' ? 'hidden' : 'inherit' }}>
                    <div className="flex-center" ref="grid" style={{ height: this.props.tabSelected == '六合专区' ? '60%' : "auto", width: '200%', marginLeft: this.props.tabSelected == '六合专区' ? '0%' : '-100%', alignItems: ' flex-start' }}>
                        <div className="w50 h100" style={{ paddingTop: "10px" }}>
                            {this.sixAreaView()}
                        </div>
                        <div className="w50 h100">
                            {this.lotteryAreaView()}
                        </div>
                    </div>
                </main>
            </div >
        );
    }
}
export default withRouter(Tab)