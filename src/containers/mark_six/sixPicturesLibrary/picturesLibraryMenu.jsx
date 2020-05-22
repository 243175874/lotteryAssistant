import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, Grid, ActivityIndicator } from 'antd-mobile';
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
            loading: true
        };
    }

    componentDidMount() {
        this.getMenuList();
    }

    //获取六合图库菜单数据
    getMenuList() {
        post('/v1/api/article/category?id=348').then(data => {
            if (data.code == 200) {
                let GridData = data.data.map((item) => ({
                    id: item.extend_id,
                    icon: item.pic,
                    text: item.name
                }));
                this.setState({ menuList: GridData });
            }
            this.setState({ loading: false });//关闭loading
        });
    }


    
    go(item) {
        this.props.setSixTitle(item.text);
        this.props.setSixTypeId(item.id);
        this.props.history.push(`/PicturesLibrary`)
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
                <Grid data={this.state.menuList} columnNum={3}
                    onClick={(item) => { this.go(item) }} />
            </div>
        );
    }
}
