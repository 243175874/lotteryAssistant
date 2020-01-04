import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator, SearchBar } from 'antd-mobile';
import { connect } from 'react-redux'
import { setSixTitle, setSixTypeId } from '../../../redux/action'
@connect(
    state => ({}),
    { setSixTitle, setSixTypeId }
)
export default class PeachMeetingMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            menuListOriginal: [],
            keyword: "",
            loading: true
        };
    }

    componentWillMount() {
        this.getMenuList();
    }

    search() {
        let list = [];
        if (this.state.keyword == "") {
            this.setState({ menuList: this.state.menuListOriginal });
            return;
        }

        list = this.state.menuList.filter((item) => {
            return item.name.indexOf(this.state.keyword) != -1;
        });

        this.setState({ menuList: list });
    }


    search2(keyword) {
        if (keyword == "") {
            this.setState({ menuList: this.state.menuListOriginal });
        }
    }
    //获取蟠桃大会菜单数据
    getMenuList() {
        post('/api/index/ptdh_all.html').then(data => {
            if (data.code == 200) {
                this.setState({ menuList: data.data, menuListOriginal: data.data });
            }
            this.setState({ loading: false });//关闭loading
        });
    }

    renderMenuListView() {
        return this.state.menuList.map((item, index) => (
            <img style={{ width: "40%", marginLeft: "6.5%", marginTop: "10px" }} key={index} src={item.pic}
                onClick={() => { this.go(item) }} />
        ));
    }

    go(item) {
        this.props.setSixTitle(item.name);
        this.props.setSixTypeId(item.id);
        this.props.history.push(`/peachMeetingList`)
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
                >蟠桃大会</NavBar>
                <div className="w100" style={{ height: "calc(91% - 64px)" }}>
                    <SearchBar placeholder="搜索" onSubmit={() => { this.search() }} onChange={(value) => { this.setState({ keyword: value }); this.search2(value) }} value={this.state.keyword} maxLength={12} />
                    <div className="wh100" style={{ overflow: "auto", paddingBottom: "20px" }}>
                        {this.renderMenuListView()}
                    </div>
                </div>
            </div>
        );
    }
}
