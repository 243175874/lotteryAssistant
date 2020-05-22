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

    componentDidMount() {
        this.getMenuList();
        window["page"] = "蟠桃大会";
    }

    search() {
        if (this.state.keyword !== "") {
            var path = {
                pathname: '/peachMeetingListSearch',
                query:  {keyword: this.state.keyword },
            }
            this.props.history.push(path);
        }
    }

    //获取蟠桃大会菜单数据
    getMenuList() {
        post('/v1/api/article/category?id=331').then(data => {
            if (data.code == 200) {
                this.setState({ menuList: data.data, menuListOriginal: data.data });
            }
            this.setState({ loading: false });//关闭loading
        });
    }

    renderMenuListView() {
        return this.state.menuList.map((item, index) => {
            if (item.pic != "") {
                return (
                    <img style={{ width: "40%", marginLeft: "6.5%", marginTop: "10px" }} key={index} src={item.pic}
                        onClick={() => { this.go(item) }} />
                );
            }

        });
    }

    go(item) {
        this.props.setSixTitle(item.name);
        this.props.setSixTypeId(item.extend_id);
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
                    <SearchBar placeholder="搜索" onSubmit={() => { this.search() }} onChange={(value) => { this.setState({ keyword: value }); }} value={this.state.keyword} maxLength={12} />
                    <div className="wh100" style={{ overflow: "auto", paddingBottom: "20px" }}>
                        {this.renderMenuListView()}
                    </div>
                </div>
            </div>
        );
    }
}
