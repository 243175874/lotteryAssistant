import React, { Component } from "react";
import { NavBar, Icon, List, InputItem } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import '../../assets/css/input.css'
import '../../assets/css/submit-btn.css'
import { post } from '../../fetch/post.js';
import { Toast } from 'antd-mobile'
class ModifyPassword extends Component {

    state = {
        nowpass: '',
        password: '',
        confirm_password: ''
    }

    /**
    *  动态绑定input value
    */
    handleChange = (val, str) => {
        let params = {};
        params[str] = val;
        this.setState(params)
    }

    /**
    *  修改密码
    */
    submit() {
        post(`/api/user/setpasswd`, this.state).then(data => {
            if (data.code == 200) {
                Toast.info('修改成功', 3, null, false);
                localStorage.removeItem("cs_token");
                localStorage.removeItem("userInfo");
                this.props.history.push('/');
            }
        });
    }

    render() {
        return (
            <div className="wh100">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>修改登录密码</NavBar>
                <div style={{ padding: "8px 15px", fontSize: "12px" }}>定期修改，有助于保护您的账户安全</div>
                <List>
                    <InputItem type="password" defaultValue={this.state.nowpass} onChange={(val) => this.handleChange(val, 'nowpass')} placeholder="请输入旧密码" />
                </List>
                <List style={{ marginTop: "10px" }}>
                    <InputItem type="password" defaultValue={this.state.password} onChange={(val) => this.handleChange(val, 'password')} placeholder="请输入新的登录密码" />
                    <InputItem type="password" defaultValue={this.state.confirm_password} onChange={(val) => this.handleChange(val, 'confirm_password')} placeholder="请再次确认新的登录密码" />
                </List>
                <div className="w100 bgWhite submit-btn-box" style={{ height: 'calc(100% - 228px)', marginTop: "10px" }}>
                    <div className="submit-btn flex-center" onClick={() => { this.submit() }}>确定</div>
                </div>
            </div>
        );
    }
}
export default withRouter(ModifyPassword)