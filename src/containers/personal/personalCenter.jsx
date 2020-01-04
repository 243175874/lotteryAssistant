import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post';
import { Toast } from 'antd-mobile'
class PersonalCenter extends Component {

    state = {
        userInfo: {}
    }

    /**
    *  设置用户详细信息
    */
    setUserDetailsInfo = () => {
        this.setState({ userInfo: JSON.parse(localStorage.getItem("userInfo")).user })
    }

    loginOut = async () => {
        await post('/api/login/logout');
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        Toast.info('退出登录成功', 3, null, false);
        this.props.history.push('/');
    }

    /**
    *  更换头像
    */
    changePhoto = () => {
        this.props.history.push('/updatePhoto');
    }

    componentDidMount = () => {
        this.setUserDetailsInfo();
    }

    render() {
        return (
            <div className="wh100">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>个人中心</NavBar>
                <List>
                    <List.Item>
                        <div onClick={() => this.changePhoto()} className="w100 flex" style={{ height: "70px" }}>
                            <div className="w50 h100 flex align-item-center">头像</div>
                            <div className="w50 h100 flex align-item-center" style={{ justifyContent: "flex-end" }}>
                                <img style={{ width: "40%", height: 'auto' }} src={this.state.userInfo.userhead_url} />
                            </div>
                        </div>
                    </List.Item>
                    <List.Item extra={this.state.userInfo.username}>用户名</List.Item>
                </List>
                <List style={{ marginTop: "10px" }}>
                    <List.Item arrow="horizontal" onClick={() => { this.props.history.push('/modifyPassword') }}>修改密码</List.Item>
                </List>

                <div onClick={() => this.loginOut()} className="w100 bgWhite flex-center" style={{ height: "50px", marginTop: "10px" }}>退出登录</div>
            </div>
        );
    }
}
export default withRouter(PersonalCenter)