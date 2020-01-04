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
                    onLeftClick={() => this.props.history.goBack()}>应用简介</NavBar>
                <div className="w100 clearfix" style={{ paddingTop: "15px" }}>
                    <div className="fl clearfix flex justify-content-center" style={{ width: "20%" }}>
                        <img style={{ width: "3rem", height: "3rem" }} src="../../assets/img/more/appicon_czs_n.png" />
                    </div>
                    <div className="flex-center fr" style={{ width: "80%" }}>
                        <div style={{ width: "90%", padding: "3% 10%", background: "#F5F5F5", borderRadius: "10px" }} className="clearfix">
                            <p style={{ marginTop: "10px" }}>尊敬的用户：</p>
                            <p style={style}>感谢您选择我们的服务。彩助手是一款基于民间收集资料为内容,历史开奖、统计信息、推荐数据于一体的六合信息应用。</p>
                            <p style={style}> 彩助手通过大量的数据,以及运用民间自主研发的分析六合方法,率先实现了六合各玩法的推荐。</p>
                            <p style={style}> 应用中的数据统计把特码、正码、波色、生肖等各玩法的历史以图表形式显示出来,用户可以查询到过往的任何阶段的数据。</p>
                            <p style={style}>彩助手是具有资源占用低、操作简捷、数据齐全等特点,是目前民间最受欢迎的全能六合信息应用之一。</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Introduce)