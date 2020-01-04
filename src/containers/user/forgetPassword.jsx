import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { post } from '../../fetch/post.js';
import { get } from '../../fetch/get.js';
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import CommonJS from '../../assets/js/common'
import '../../assets/css/login.less'

import { setSelectedTab } from '../../redux/action'
@connect(
    state => ({ selectedTab: state.selectedTab }),
    { setSelectedTab }
)

class ForgetPassword extends Component {

    state = {
        password: '', //密码
        password2: '', //确认密码
        mobile: '', //手机号码
        sms_code: '', //手机验证码
        vailStatus: false, //验证码发送状态
        countdown: 30, //验证码倒计时
        interval: {}, //存储setInterval的变量
        infoList: [
            {
                icon: '../../assets/img/user/icon_registered_phone_n.png',
                placeholder: '请输入手机号码',
                type: 'mobile',
                inputType: 'number'
            }, {
                icon: '../../assets/img/user/icon_registered_code_n.png',
                placeholder: '请输入验证码',
                type: 'sms_code'
            }, {
                icon: '../../assets/img/user/icon_registered_password.png',
                placeholder: '请输入密码',
                type: 'password',
                inputType: 'password'
            }, {
                icon: '../../assets/img/user/icon_registered_password.png',
                placeholder: '请再次输入密码',
                type: 'password2',
                inputType: 'password'
            }
        ]
    };

    componentWillUnmount() {
        window.clearInterval(this.state.interval);
    }

    /**
    *  重置倒计时
    */
    resetCountdown = () => {
        this.setState({ vailStatus: false })
        this.setState({ countdown: 30 })
    }

    /**
    *  开始验证码倒计时
    */
    startVailCode = () => {
        this.setState({ vailStatus: true })
        this.state.interval = setInterval(() => {
            this.setState({ countdown: this.state.countdown - 1 })
            if (this.state.countdown <= 0) {
                this.resetCountdown();
                window.clearInterval(this.state.interval);
            }
        }, 1000)
    }

    /**
    *  获取短信验证码权限
    */
    getPhoneCodeAuth() {
        if (this.state.mobile == "") {
            Toast.info('请先填写手机号码', 3, null, false);
            return;
        }
        post("/api/api/send_sms.html", {
            mobile: this.state.mobile,
            type: "forget"
        }).then(data => {
            Toast.info('短信已发送,请5分钟内完成验证', 3, null, false);
            this.startVailCode()
        });
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
                        item.type === 'sms_code' ?
                            <template style={{ display: 'block' }}>
                                <input style={{ width: 'inherit' }} value={this.state[item.type]} onChange={(e) => this.handleChange(e, item.type)} placeholder={item.placeholder} className="wh100" type="text" />
                                {this.state.vailStatus ? <span style={{ float: 'right', height: '50px', lineHeight: '50px', color: '#FF3344' }}>{this.state.countdown}</span> : <span onClick={() => this.getPhoneCodeAuth()} style={{ float: 'right', height: '50px', lineHeight: '50px', color: '#FF3344' }}>获取验证码</span>}
                            </template> :
                            <input value={this.state[item.type]} onChange={(e) => this.handleChange(e, item.type)} placeholder={item.placeholder} className="wh100" type={item.inputType} />
                    }
                </div>
            </div>
        ))
    }


    goback() {
        this.props.history.goBack()
    }

    /**
    *  提交
    */
    submit() {
        let params = {
            mobile: this.state.mobile,//手机号
            sms_code: this.state.sms_code,
            password: this.state.password,//密码
            password2: this.state.password2,//确认密码
        }
        post('/api/login/forgetsms', params).then(data => {
            localStorage.setItem('token', data.token);
            this.props.setSelectedTab('index');
            Toast.info('重置密码成功', 3, null, false);
            //设置用户信息
            CommonJS.setUserInfo();
            this.props.history.push('/');
        });
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
                <img className="w100" src="../../assets/img/user/bg_top.png" />
                <div className="w100 clearfix flex flex-column align-item-center box">
                    <div onClick={this.goback.bind(this)} className="flex-center" style={{ width: '24px', height: '30px', position: 'fixed', top: '5%', left: '5%' }} >
                        <img className="w50" src="../../assets/img/user/icon_goback.png" />
                    </div>

                    <header className="clearfix  flex-center">
                        <img src="../../assets/img/user/icon_hi.png" />
                        <div className="text">
                            请重新设置密码
                        </div>
                    </header>
                    <main className="bgWhite">
                        {this.setRegisterDom()}
                        <div className="submit-btn flex-center" onClick={() => { this.submit() }}>确定</div>
                    </main>
                </div>
            </div>
        );
    }
}
export default withRouter(ForgetPassword)