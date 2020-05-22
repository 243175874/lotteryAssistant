import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Index from './index.jsx'
import DiscoveringTreasure from './discoveringTreasure.jsx'
import Personal from './personal.jsx'
import More from './more.jsx'
import Promotion from './promotion.jsx'
import Login from '../user/login.jsx'
import { connect } from 'react-redux'
import { setSelectedTab } from '../../redux/action'
@connect(
    state => ({ selectedTab: state.selectedTab }),
    { setSelectedTab }
)
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.selectedTab,
            hidden: false,
        };
    }

    changeSelectedTab(select) {
        //this.setState({ selectedTab: select });
        this.props.setSelectedTab(select);
    }

    renderContent(selected) {
        const selectedTab = this.props.selectedTab;
        if (selectedTab == selected && selected == 'index') {
            return <Index></Index>
        } else if (selectedTab == selected && selected == 'discoveringTreasure') {
            return <DiscoveringTreasure></DiscoveringTreasure>
        } else if (selectedTab == selected && selected == 'personal') {
            if (localStorage.getItem("cs_token") !== null) {
                return <Personal></Personal>
            } else {
                return <Login></Login>
            }
        } else if (selectedTab == selected && selected == 'more') {
            return <More></More>
        } else if (selectedTab == selected && selected == 'promotion') {
            if (localStorage.getItem("cs_token") !== null) {
                return <Promotion></Promotion>
            } else {
                return <Login></Login>
            }
        } else {
            return <div></div>
        }
    }

    render() {
        const selectedTab = this.props.selectedTab;
        return (
            <div className="wh100">
                <TabBar
                    tabBarPosition="bottom"
                    unselectedTintColor="#949494"
                    tintColor="#FF3243"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${require('../../assets/img/home/icon_tab_homepage_n.png')}) center center /  21px 21px no-repeat`
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${require('../../assets/img/home/icon_tab_homepage_p.png')}) center center /  21px 21px no-repeat`
                        }}
                        />
                        }
                        selected={selectedTab === 'index'}
                        onPress={() => { this.changeSelectedTab('index') }}
                    >
                        {this.renderContent('index')}
                    </TabBar.Item>

                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_treasure_n.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_treasure_p.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="寻宝"
                        key="寻宝"
                        selected={selectedTab === 'discoveringTreasure'}
                        onPress={() => { this.changeSelectedTab('discoveringTreasure') }}
                    >
                        {this.renderContent('discoveringTreasure')}
                    </TabBar.Item>



                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_promote.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_promote_selected.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="推广"
                        key="推广"
                        selected={selectedTab === 'promotion'}
                        onPress={() => { this.changeSelectedTab('promotion') }}
                    >
                        {this.renderContent('promotion')}
                    </TabBar.Item>


                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_people_n.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_people_p.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="个人"
                        key="个人"
                        selected={selectedTab === 'personal'}
                        onPress={() => { this.changeSelectedTab('personal') }}
                    >
                        {this.renderContent('personal')}
                    </TabBar.Item>


                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_more_n.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: `url(${require('../../assets/img/home/icon_tab_more_p.png')}) center center /  21px 21px no-repeat`
                            }}
                            />
                        }
                        title="更多"
                        key="更多"
                        selected={selectedTab === 'more'}
                        onPress={() => { this.changeSelectedTab('more') }}
                    >
                        {this.renderContent('more')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
export default withRouter(Home)