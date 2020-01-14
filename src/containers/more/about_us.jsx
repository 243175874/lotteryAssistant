import React, { Component } from "react";
import { NavBar, Icon, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class About_us extends Component {
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
                    onLeftClick={() => this.props.history.goBack()}>关于我们</NavBar>
                <div className="w100 clearfix" style={{ paddingTop: "15px" }}>
                    <div className="fl clearfix flex justify-content-center" style={{ width: "20%" }}>
                        <img style={{ width: "3rem", height: "3rem" }} src={require("../../assets/img/more/appicon_czs_n.png")} />
                    </div>
                    <div className="flex-center fr" style={{ width: "80%" }}>
                        <div style={{ width: "90%", padding: "3% 10%", background: "#F5F5F5", borderRadius: "10px" }} className="clearfix">
                            <p style={style}>多年来稳健的经营并成功的将产品销售至亚洲各地,与著名的皇冠、新宝、ESPN等公司有过相关的技术合作。以追求最佳品质,重视用户反馈的娱乐平台服务著称。</p>
                            <p style={style}>愿景:最受欢迎的娱乐互联网企业</p>
                            <p style={style}>使命:通过互联网服务提升娱乐生活新品质</p>
                            <p style={style}>肩负着重要的使命,美好的愿景,不断的努力,提供科技化的人性服务,开拓市场新领土。公司一直持续的进行市场资讯的收集和研究,持续拓展业务和开拓全新的服务领域,加强发展技术,至力于新产品的开发、合作。</p>
                            <p style={style}>我们每一项产品和软件设计思念,都要求最简单最实用最方便,所以大大的满足用户和家户的娱乐要求,我们不断的为目标市场创造机会和话题,将新产品推向我们的合作伙伴、用户,创造双赢、多嬴的局面。</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(About_us)