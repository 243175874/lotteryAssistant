import React, { Component } from "react";
import PropTypes from 'prop-types';
export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }

    close() {
        this.setState({ isShow: false });
    }

    render() {
        const alertStyle = {
            width: "74%", height: "140px", position: "fixed", top: "50%",
            left: "50%", zIndex: "201", marginLeft: "-37%", marginTop: "-70px", borderRadius: "3px"
        };
        return (
            <div className="wh100" style={{
                position: "fixed", top: "0", left: "0", zIndex: "200",
                background: "rgba(0, 0, 0, 0.3)", display: this.state.isShow ? "block" : "none"
            }}>
                <div className="bgWhite" style={alertStyle}>
                    <div className="w100 flex-center" style={{
                        borderRadius: "3px 3px 0 0", height: "53px",
                        background: "#FE623F", color: "white", fontSize: "15px", letterSpacing: "1px"
                    }}>
                        {this.props.title}
                    </div>
                    <div className="w100" style={{ height: "87px" }}>
                        <div className="w100 flex-center" style={{ height: "55%", fontSize: "13px", color: "#666666" }}> {this.props.message}</div>
                        <div className="w100" style={{ height: "45%" }}>
                            <div className="h100 flex-center fr" style={{ width: "65px", marginRight: "5%", fontSize: "12px", color: "#FE623F" }} onClick={() => { this.close() }}>确定</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
