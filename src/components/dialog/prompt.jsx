import React, { Component } from "react";
import PropTypes from 'prop-types';
export default class Prompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            value: "",
        }
    }

    static propTypes = {
        title: PropTypes.string.isRequired,
        callback: PropTypes.func.isRequired
    }


    componentWillMount() {
        this.setState({ value: this.props.value });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value });
    }

    close() {
        this.setState({ isShow: false });
    }

    submit() {
        this.props.callback(this.state.value);
        this.setState({ isShow: false });
    }

    handleChange = (e) => {
        this.setState({ "value": e.target.value })
    }

    render() {
        const alertStyle = {
            width: "280px", height: "167px", position: "fixed", top: "50%",
            left: "50%", zIndex: "201", marginLeft: "-140px", marginTop: "-70px", borderRadius: "3px"
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
                    <div className="w100 flex flex-column justify-content-center align-item-center" style={{ height: "114px" }}>
                        <div className="h50 flex" style={{ width: "86%", alignItems: "flex-end", borderBottom: "1px solid #FE623F" }}>
                            <input className="w100 text-center"
                                value={this.state.value}
                                onChange={(e) => this.handleChange(e)}
                                style={{ height: "80%", color: "#666666", fontSize: "16px" }} type="tel" />
                        </div>
                        <div className="h50" style={{ width: "86%" }}>
                            <div className="h100 flex-center fr" style={{ width: "25%", fontSize: "12px", color: "#FE623F" }}
                                onClick={() => { this.submit() }}>确定</div>
                            <div className="h100 flex-center fr" style={{ width: "25%", marginRight: "5%", fontSize: "12px" }}
                                onClick={() => { this.close() }}>取消</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
