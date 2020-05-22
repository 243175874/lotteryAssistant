import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { post } from '../../fetch/post.js';
import { get } from '../../fetch/get.js';
import { Toast, ActivityIndicator } from 'antd-mobile'
import CommonJS from '../../assets/js/common'
import '../../assets/css/login.less'
import { setSelectedTab } from '../../redux/action'
import validateCodeImgDefault from '../../assets/img/user/validateCodeImgDefault.png'

@connect(
    state => ({ selectedTab: state.selectedTab }),
    { setSelectedTab }
)
class Login extends Component {

    state = {
        loading: false,
        username: '', //用户名
        password: '', //用户密码
        code: "",//验证码
        code_id: "",
        validateImg: validateCodeImgDefault
    }

    componentDidMount() {
        this.getValidateImg();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    goRegister() {
        this.props.history.push('/register?');
    }

    goForgetPassword() {
        this.props.history.push('/forgetPassword');
    }

    /**
    *  动态绑定input value
    */
    handleChange = (e, str) => {
        let params = {};
        params[str] = e.target.value;
        this.setState(params)
    }

    /**
    *  设置登录状态
    */
    loginIn = async () => {
        let resData = await this.registerLogin();
        //console.log(resData);
        this.getValidateImg();//刷新验证码
        this.setState({ loading: false });
        if (resData.code == 200) {
            localStorage.setItem('cs_token', resData.data.cs_token);
            localStorage.setItem('cp_uid', resData.data.cp_uid);
            localStorage.setItem('session_key', resData.data.session_key);
            //设置返回到首页
            this.props.setSelectedTab('index');
            //设置用户信息
            CommonJS.setUserInfo();
        }
    }

    /**
    *  登录
    */
    registerLogin = async () => {
        this.setState({ loading: true });
        let params = {
            username: this.state.username,//用户名
            password: this.state.password,//密码
            code: this.state.code,//图形验证码
            code_id: this.state.code_id
        }
        return await post('/v1/api/auth/login', params);
    }

    getValidateImg() {
        post("/v1/api/auth/verify").then(data => {
            if (data.code == 200) {
                this.setState({ validateImg: data.data.url, code_id: data.data.id });
            }
        });
    }

    render() {
        return (
            <div className="wh100 login">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <img className="w100" src={require("../../assets/img/user/bg_top.png")} />
                <div className="w100 clearfix flex flex-column align-item-center box">
                    <header className="clearfix flex-center">
                        <img style={{ height: "30px" }} src={require("../../assets/img/user/icon_hi.png")} />
                        <div className="text">
                            请输入信息登录账号
                        </div>
                    </header>
                    <main className="bgWhite" style={{ height: '300px' }}>
                        <div className="input-box w100 flex">
                            <div className="icon h100 flex align-item-center">
                                <img style={{ width: '16px' }} src={require("../../assets/img/user/icon_registered_user.png")} />
                            </div>
                            <div className="input h100">
                                <input value={this.state.username} onChange={(e) => this.handleChange(e, 'username')} placeholder="请输入用户名" className="wh100" type="text" />
                            </div>
                        </div>
                        <div className="input-box w100 flex">
                            <div className="icon h100 flex align-item-center">
                                <img style={{ width: '16px' }} src={require("../../assets/img/user/icon_registered_password.png")} />
                            </div>
                            <div className="input h100">
                                <input value={this.state.password} onChange={(e) => this.handleChange(e, 'password')} placeholder="请输入密码" className="wh100" type="password" />
                            </div>
                        </div>
                        <div className="input-box w100 flex" >
                            <div className="icon h100 flex align-item-center">
                                <img style={{ width: '16px' }} src={require("../../assets/img/user/verification_code.png")} />
                            </div>
                            <div className="input h100">
                                <input value={this.state.code} onChange={(e) => this.handleChange(e, 'code')} placeholder="请输入图形验证码" className="fl h100 w50" type="text" />
                                <img onClick={() => { this.getValidateImg() }} style={{ width: '40%', height: "60%", marginTop: "5%" }} className="fr" src={this.state.validateImg} />
                            </div>
                        </div>
                        <div className="w100 clearfix">
                            <div className="fr" style={{ width: '85%', height: '30px', marginTop: '10px', fontSize: '13px' }}>
                                <div onClick={this.goRegister.bind(this)} className="fl h100" style={{ lineHeight: '200%', color: '#666' }}>
                                    注册账号
                                    </div>
                                {/* <div onClick={() => { this.goForgetPassword() }} className="fr h100" style={{ lineHeight: '200%', color: 'red', textDecoration: 'underline' }}>
                                    忘记密码?
                                </div> */}
                            </div>
                        </div>
                        <div className="submit-btn flex-center" onClick={() => this.loginIn()}>登录</div>
                    </main>
                </div>
            </div>
        );
    }
}
export default withRouter(Login)