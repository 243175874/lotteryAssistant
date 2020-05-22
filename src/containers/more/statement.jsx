import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class Introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let style = { marginTop: "10px", letterSpacing: "1px", textIndent: "28px" };
        return (
            <div className="wh100 bgWhite">
                <NavBar className="navbar_bg"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}>免责声明</NavBar>
                <div className="w100 clearfix" style={{ paddingTop: "15px" }}>
                    <div className="fl clearfix flex justify-content-center" style={{ width: "20%" }}>
                        <img style={{ width: "3rem", height: "3rem" }} src={require("../../assets/img/more/appicon_czs_n.png")} />
                    </div>
                    <div className="flex-center fr" style={{ width: "80%" }}>
                        <div style={{ width: "90%", padding: "3% 10%", background: "#F5F5F5", borderRadius: "10px" }} className="clearfix">
                            <p style={{ marginTop: "10px" }}>尊敬的用户：</p>
                            <p style={style}>感谢您选择我们的服务。</p>
                            <p style={style}>彩助手是我们研发的壹款统计资讯、推荐数据的应用,仅供香港地区人士购买6合进行相关的参考。本应用登载的广告均为广告客户的个人意愿与表达方式,其广告内容与本应用无任何关系。</p>
                            <p style={style}>用户必须留意本身所处之地区及相关法律,不得利用本软件进行任何非法活动,任何情况下导致触犯所属地区之法律,用户须自行承担责任,壹切后果概不负责。</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Introduce)