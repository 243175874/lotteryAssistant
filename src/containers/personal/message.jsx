import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js';
import { Toast, ActivityIndicator } from 'antd-mobile'
import CommonJS from '../../assets/js/common'
import { NavBar, Icon } from 'antd-mobile';


class Message extends Component {

    state = {
        loading: false,
    }

    componentWillMount() {
        this.getMessage();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    //获取站内消息
    getMessage() {
        post('/api/user/message').then(data => {
            console.log(data);
        });
    }

    render() {
        return (
            <div className="wh100 login">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>我的帖子</NavBar>
                <div className="bgWhite" style={{ width: "90%", margin: "0 auto", height: "120px", marginTop: "10px", borderRadius: "5px", padding: "10px" }}>
                    <div className="w100 flex align-item-center" style={{ borderBottom: "1px solid #E1E1E1", height: "30%", paddingBottom: "10px" }}>
                        <div style={{ width: "12px", height: "12px", marginLeft: "10px" }}>
                            <img className="w100 h100" src="../../assets/img/home/used_icon_feedback.png" />
                        </div>
                        <div className="h100 flex-center" style={{ marginLeft: "10px" }}>系统消息</div>
                    </div>
                    <div className="w100" style={{ height: "70%", paddingLeft: "10px", paddingTop: "10px", color: "#666666" }}>
                        <p className="h50 flex align-item-center">关于本平台升级完成及彩豆说明</p>
                        <p className="h50 flex align-item-center">2019.07.30</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Message)