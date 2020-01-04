import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post';
class Invitation extends Component {

    state = {
    }

    componentDidMount() {
        this.getAttention();
    }

    //获取我的关注
    getAttention() {
        post('/api/api/get_my_guanzhu').then(data => {
            console.log(data);
        });
    }

    //取消关注
    cancelAttention(id) {
        post('/api/api/zan_collect', { zan_collect: "collect", id: id, type: 0 }).then(data => {
            console.log(data);
        });
    }

    render() {
        return (
            <div className="wh100">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>我的关注</NavBar>
                <div className="w100 flex  align-item-center bgWhite" style={{ height: "60px", padding: "10px 10px 0 10px" }}>
                    <div className="w100 h100 flex  align-item-center" style={{ borderBottom: "1px solid #ededed" }}>
                        <div style={{ width: "40px", height: "40px" }}>
                            <img className="w100 h100" />
                        </div>
                        <div style={{ width: "calc(100% - 160px)", height: "100%", marginLeft: "20px" }}>
                            <div className="w100 flex align-item-center" style={{ height: "60%", fontSize: "14px" }}>特码诗880</div>
                            <div className="w100 flex align-item-center" style={{ height: "40%", fontSize: "12px" }}>粉丝：<span>1334</span></div>
                        </div>
                        <div className="flex-center" style={{ width: "100px", height: "30px", color: "#999999", background: "#ededed", borderRadius: "20px" }}>取消关注</div>
                    </div>
                </div>

            </div>
        );
    }
}
export default withRouter(Invitation)