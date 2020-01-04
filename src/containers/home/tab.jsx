import React, { Component } from "react";
import Lottery from '../../components/index/lottery'
import Grid from '../../components/index/grid'
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js'
import { connect } from 'react-redux'
import { setSelectedTab, setCurrentLotteryName, setCurrentLotteryId } from '../../redux/action'
@connect(
    state => ({ selectedTab: state.selectedTab, currentLotteryName: state.currentLotteryName, currentLotteryId: state.currentLotteryId }),
    { setSelectedTab, setCurrentLotteryName, setCurrentLotteryId }
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

    componentWillMount() {
        //获取彩票菜单
        this.getSixLotteryData();
        //获取所有彩种类型
        this.getAllLotteryType();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取所有彩种类型
    getAllLotteryType() {
        post('/api/index/type_list').then(data => {
            if (data.code == 200) {
                sessionStorage.setItem("lotteryListType", JSON.stringify(data.data));
            }
        });
    }

    //获取六合彩菜单
    getSixLotteryData() {
        post('/v1/api/lottery/index').then(data => {
            if (data.code == 200) {
                this.setState({ app_menu: data.data.app_menu, cp_menu: data.data.cp_menu });
                //把所有彩种拿出放入sessionStorage
                this.setLotteryToStorage(data.data.cp_menu);
            }
        });
    }

    //把所有彩种拿出放入sessionStorage
    setLotteryToStorage(menu) {
        let list = [];
        menu.forEach(element => {
            list = list.concat(element.son);
        });
        sessionStorage.setItem("lotteryList", JSON.stringify(list));
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
    enterSixLotteryPage(name) {
        if (name == "视频开奖") {
            this.props.history.push('/markSixLotteryVideo');
        } else if (name == "开奖历史") {
            this.props.history.push('/markSixLotteryHistory');
        } else if (name == "查询助手") {
            this.props.history.push('/lotteryQueryAssistant');
        } else if (name == "资讯统计") {
            this.props.history.push('/lotteryStatistics');
        } else if (name == "六合图库") {
            if (localStorage.getItem("token") !== null) {
                this.props.history.push('/picturesLibraryMenu');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (name == "六合高手") {
            if (localStorage.getItem("token") !== null) {
                this.props.history.push('/sixMasterHand');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (name == "资料大全") {
            if (localStorage.getItem("token") !== null) {
                this.props.history.push('/sourceBookMenu');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (name == "蟠桃大会") {
            if (localStorage.getItem("token") !== null) {
                this.props.history.push('/peachMeetingMenu');
            } else {
                this.props.setSelectedTab('personal');
            }
        } else if (name == "工具箱") {
            this.props.setSelectedTab('discoveringTreasure');
        }
    }

    enterLotteryPage(name, id) {

        //存入redux
        this.props.setCurrentLotteryName(name);
        this.props.setCurrentLotteryId(id);
        this.props.history.push('/lotteryCenter');
    }

    lotteryAreaView() {
        return this.state.cp_menu.map((item, index) => (
            <Lottery lotteryData={item} key={index} click={this.enterLotteryPage.bind(this)}></Lottery>
        ));
    }

    sixAreaView() {
        return this.state.app_menu.map((item, index) => (
            <Grid src={item.icon} name={item.name} key={index} click={() => { this.enterSixLotteryPage(item.name) }}></Grid>
        ));
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
                        <img style={{ width: '20%', height: '5px', display: this.state.tabSelected == '六合专区' ? 'block' : 'none' }} src="../../assets/img/home/header-unline.png" />
                    </div>
                    <div className="flex-center" style={{ width: '27%', height: '10px' }}>
                        <img style={{ width: '20%', height: '5px', display: this.state.tabSelected != '六合专区' ? 'block' : 'none' }} src="../../assets/img/home/header-unline.png" />
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