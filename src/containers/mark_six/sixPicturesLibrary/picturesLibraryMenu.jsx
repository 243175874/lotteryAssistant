import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, Grid, ActivityIndicator } from 'antd-mobile';
export default class PicturesLibraryMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: [],
            loading: true
        };
    }

    componentWillMount() {
        this.getMenuList();
    }

    //获取六合图库菜单数据
    getMenuList() {
        post('/api/index/lhtk_all').then(data => {
            if (data.code == 200) {
                let GridData = data.data.map((item) => ({
                    id: item.id,
                    icon: item.pic,
                    text: item.name
                }));
                this.setState({ menuList: GridData }); //关闭loading
            }
            this.setState({ loading: false });//关闭loading
        });
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
                >六合图库</NavBar>
                <Grid data={this.state.menuList} columnNum={3} onClick={(object) => { this.props.history.push({ pathname: '/picturesLibrary', query: { id: object.id } }) }} />
            </div>
        );
    }
}
