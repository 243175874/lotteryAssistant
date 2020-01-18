import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js';
import { get } from '../../fetch/get.js';
import { connect } from 'react-redux'
import { Toast, ActivityIndicator } from 'antd-mobile'
import CommonJS from '../../assets/js/common'
import '../../assets/css/login.less'

import icon_registered_user from '../../assets/img/user/icon_registered_user.png'
import icon_registered_password from '../../assets/img/user/icon_registered_password.png'
import icon_registered_invitation from '../../assets/img/user/icon_registered_invitation.png'

import { setSelectedTab } from '../../redux/action'
@connect(
    state => ({ selectedTab: state.selectedTab }),
    { setSelectedTab }
)

class Register extends Component {

    state = {
        loading: false,
        username: '', //用户名
        password: '', //密码
        password2: '', //确认密码
        code: '', //验证码
        validateImg: '',//验证码图片
        invite_mobile: '', //邀请人手机号码
        mobile: '',//手机号
        code_id: '',
        //setUserInfo: this.props.setUserInfo,//初始化props变量，如果父页面的变量指向被改变，则子组件不受影响
        infoList: [
            {
                icon: icon_registered_user,
                placeholder: '请输入用户名',
                type: 'username',
                inputType: 'text'
            }, {
                icon: icon_registered_password,
                placeholder: '请输入密码',
                type: 'password',
                inputType: 'password'
            }, {
                icon: icon_registered_password,
                placeholder: '请再次输入密码',
                type: 'password2',
                inputType: 'password'
            }, {
                icon: icon_registered_invitation,
                placeholder: '请输入邀请用户手机号码(非必填)',
                type: 'invite_mobile',
                inputType: 'number'
            }
            , {
                icon: icon_registered_invitation,
                placeholder: '请输入手机号码',
                type: 'mobile',
                inputType: 'number'
            }
        ]
    };


    componentDidMount() {
        this.getValidateImg();
    }


    /**
    *  设置注册dom元素
    */
    setRegisterDom = () => {
        return this.state.infoList.map((item, i) => (
            <div key={i} className="input-box w100 flex">
                <div className="icon h100 flex align-item-center">
                    <img style={{ width: '16px' }} src={item.icon} />
                </div>
                <div className="input h100">
                    {
                        <input value={this.state[item.type]} onChange={(e) => this.handleChange(e, item.type)} placeholder={item.placeholder} className="wh100" type={item.inputType} />
                    }
                </div>
            </div>
        ))
    }

    goback() {
        this.props.history.goBack()
    }

    getValidateImg() {
        post("/v1/api/auth/verify").then(data => {
            if (data.code == 200) {
                this.setState({ validateImg: data.data.url, code_id: data.data.id });
            }
        });
    }

    /**
    *  设置注册状态
    */
    registerAccount = async () => {
        let resData = await this.requestRegister();
        this.getValidateImg();//刷新验证码
        this.setState({ loading: false });
        this.getValidateImg();
        if (resData.code == 200) {
            Toast.info('注册并登陆成功', 3, null, false);
            localStorage.setItem('cs_token', resData.data.cs_token);
            localStorage.setItem('cp_uid', resData.data.cp_uid);
            localStorage.setItem('session_key', resData.data.session_key);
            this.props.setSelectedTab('index');
            //跳转回home页面(home页面会自动指向登录)
            this.props.history.push('/');
            //设置用户信息
            CommonJS.setUserInfo();
        }
    }

    /**
    *  注册
    */
    requestRegister = async () => {
        console.log(this.props.location.search.substr(1))
        this.setState({ loading: true });
        let params = {
            referrer: this.props.location.search.substr(1),
            username: this.state.username,//用户名
            password: this.state.password,//密码
            password2: this.state.password2,//确认密码
            invite_mobile: this.state.invite_mobile,//邀请人手机号
            mobile: this.state.mobile,
            code: this.state.code,
            code_id: this.state.code_id
        }
        return await post('/v1/api/auth/register', params)
    }

    /**
    *  动态绑定input value
    */
    handleChange = (e, str) => {
        let params = {};
        params[str] = e.target.value;
        this.setState(params)
    }

    render() {
        return (
            <div className="wh100 login">
                <ActivityIndicator toast text="加载中..." animating={this.state.loading} />
                <img className="w100" src={require("../../assets/img/user/bg_top.png")} />
                <div className="w100 clearfix flex flex-column align-item-center box">
                    <div onClick={this.goback.bind(this)} className="flex-center" style={{ width: '24px', height: '30px', position: 'fixed', top: '5%', left: '5%' }} >
                        <img className="w50" src={require("../../assets/img/user/icon_goback.png")} />
                    </div>
                    <header className="clearfix flex-center">
                        <img src={require("../../assets/img/user/icon_hi.png")} />
                        <div className="text">
                            请输入信息注册账号
                        </div>
                    </header>
                    <main className="bgWhite">
                        {this.setRegisterDom()}
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
                            <div className="fr" style={{ width: '85%', height: '30px', marginTop: '10px', fontSize: '12px', color: '#666' }}>
                                注册阅读并同意<span style={{ color: 'red', textDecoration: 'underline' }}>彩助手用户协议</span>
                            </div>
                        </div>
                        <div className="submit-btn flex-center" onClick={this.registerAccount}>注册</div>
                    </main>
                </div>
            </div>
        );
    }
}
export default withRouter(Register)