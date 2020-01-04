import React, { Component } from "react";
import PropTypes from 'prop-types';
const Grid = (props) => (
    <div className="w33 clearfix flex flex-column align-item-center fl" style={{ padding: "2%" }} onClick={() => { props.click() }}>
        <img style={{ width: "40%" }} src={props.src} onError={(e) => { e.target.onerror = null; e.target.src = "http://500w1.oss-cn-hongkong.aliyuncs.com/style/66.png?x-oss-process=style/100w" }} />
        <div className="w100 text-center" style={{ padding: "10px 0", fontWeight: "600", fontFamily: "宋体" }}>{props.name}</div>
    </div>
)
Grid.propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired
}
export default Grid