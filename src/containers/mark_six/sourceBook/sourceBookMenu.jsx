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
        window["page"] = "资料大全";
    }

    getMenuList() {
        post('/v1/api/article/category?id=219').then(data => {
            if (data.code == 200) {
                this.setState({ menuList: data.data, menuListOriginal: data.data });
            }
            this.setState({ loading: false });//关闭loading
        });
    }

    renderMenuListView() {
        return this.state.menuList.map((item, index) => (
            <div key={index} className="fl flex-center" style={{
                width: "28%", height: "30px", marginLeft: "3.3%", marginTop: "10px",
                border: "1px solid #EACDA3", borderRadius: "5px",
                marginBottom: index == this.state.menuList.length - 1 ? "20px" : "0"
            }}
                onClick={() => { this.go(item) }}>
                {item.name}
            </div>
        ));
    }

    search() {
        if (this.state.keyword !== "") {
            var path = {
                pathname: '/sourceBookListSearch',
                query:  {keyword: this.state.keyword },
            }
            this.props.history.push(path);
        }
    }

    go(item) {
        this.props.setSixTitle(item.name);
        this.props.setSixTypeId(item.extend_id);
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
                <div className="w100" style={{ height: "91%" }}>
                    <SearchBar onSubmit={() => { this.search() }} onChange={(value) => { this.setState({ keyword: value });  }} value={this.state.keyword} placeholder="搜索" maxLength={12} />

                    <div className="w100" style={{ height: "calc(100% - 44px)", overflow: "auto" }}>
                        {this.renderMenuListView()}
                    </div>
                </div>
            </div>
        );
    }
}
