import React, { Component } from "react";
import { NavBar, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js';

class Personl extends Component {

    state = {
        data: [
            { src: require('../../assets/img/home/used_icon_post.png'), label: "我的帖子", pageRouter: "/myPosts" },
            { src: require('../../assets/img/home/used_icon_attention.png'), label: "我的关注", pageRouter: "/attention" },
            { src: require('../../assets/img/home/used_icon_feedback.png'), label: "站内消息", pageRouter: "/message" },
        ],
        username: '',
        userPhoto: ''
    };

    go = (pageRouter) => {
        this.props.history.push(pageRouter);
    }

    renderItem() {
        return this.state.data.map((item, index) => (
            <List.Item
                key={index}
                style={{ minHeight: '55px' }}
                thumb={item.src}
                arrow="horizontal"
                onClick={this.go.bind(this, item.pageRouter)}
            >{item.label}</List.Item>
        ));
    }

    /**
    *  设置个人信息
    */
    setUserInfo = async () => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState({
            username: userInfo.username,
            userPhoto: userInfo.userhead
        })
    }

    componentDidMount = () => {
        this.setUserInfo();
    }

    render() {
        return (
            <div className="wh100">
                <NavBar className="navbar_bg_level-one">个人</NavBar>
                <header onClick={() => this.go('/personalCenter')} className="w100 flex align-item-center pr bgWhite" style={{ height: '15%', paddingLeft: "5%" }}>
                    <img style={{ width: '20%', borderRadius: "5px" }} src={this.state.userPhoto} />
                    <div style={{ paddingLeft: '5%', fontSize: '18px' }}>{this.state.username}</div>
                    <img className="pa" style={{ right: "5%", width: '3%' }} src={require("../../assets/img/home/user_icon_left.png")} />
                </header>
                <main className="w100 clearfix bgWhite" style={{ marginTop: '2%' }}>
                    {/* <List>
                        {this.renderItem()}
                    </List> */}
                </main>
            </div>
        );
    }
}
export default withRouter(Personl)