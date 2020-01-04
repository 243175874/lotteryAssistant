import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator, SearchBar } from 'antd-mobile';
import { connect } from 'react-redux'
import { setSixTitle, setSixTypeId } from '../../../redux/action'
@connect(
    state => ({}),
    { setSixTitle, setSixTypeId }
)
export default class PicturesLibraryMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            loading: true,
            menuListOriginal: [],
            keyword: "",
        };
    }

    componentWillMount() {
        this.getMenuList();
    }

    getMenuList() {
        post('/api/index/zldq_list.html').then(data => {
            if (data.code == 200) {
                this.setState({ menuList: data.data.data, menuListOriginal: data.data.data });
            }
            this.setState({ loading: false });//关闭loading
        });
    }

    renderMenuListView() {
        return this.state.menuList.map((item, index) => (
            <div key={index} className="fl flex-center" style={{
                width: "28%", height: "30px", marginLeft: "3.3%", marginTop: "10px",
                border: "1px solid #EACDA3", borderRadius: "5px"
            }}
                onClick={() => { this.go(item) }}>
                {item.name}
            </div>
        ));
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

    go(item) {
        this.props.setSixTitle(item.name);
        this.props.setSixTypeId(item.id);
        this.props.history.push(`/sourceBookList`)
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
                >资料大全</NavBar>
                <div className="w100 clearfix">
                    <SearchBar onSubmit={() => { this.search() }} onChange={(value) => { this.setState({ keyword: value }); this.search2(value) }} value={this.state.keyword} placeholder="搜索" maxLength={12} />
                    {this.renderMenuListView()}
                </div>
            </div>
        );
    }
}
