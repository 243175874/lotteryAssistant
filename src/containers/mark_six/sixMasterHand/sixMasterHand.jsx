import React, { Component } from "react";
import { post } from '../../../fetch/post.js';
import { NavBar, Icon, ActivityIndicator } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { setSixTitle, setSixTypeId } from '../../../redux/action'
@connect(
    state => ({ sixMasterHandTitle: state.sixTitle, sixMasterHandTid: state.sixTypeId }),
    { setSixTitle, setSixTypeId }
)

class SixMasterHand extends Component {
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

    //获取六合高手菜单数据
    getMenuList() {
        post('/v1/api/article/category?id=218').then(data => {
            if (data.code == 200) {
                this.setState({ menuList: data.data });//关闭loading
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
        this.props.setSixTypeId(item.extend_id);
        this.props.history.push(`/sixMasterHandList`)
    }

    render() {
        return (
            <div className="wh100 bgwhite clearfix">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar
                    className="navbar_bg"
                    leftContent={[
                        <Icon key="0" onClick={() => this.props.history.goBack()} type="left" />
                    ]}
                >六合高手</NavBar>
                <div className="w100 clearfix">
                    {this.renderMenuListView()}
                </div>
            </div>
        );
    }
}
export default withRouter(SixMasterHand)