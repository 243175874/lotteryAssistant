import React, { Component } from "react";
import PropTypes from 'prop-types';
import bgImage from '../../assets/img/toolbox/bg_column_vertical_n.png'
const Introduction = (props) => (
    <div className="flex flex-column align-item-center" style={{
        width: "320px", height: "110px", margin: "0 auto", background: `url(${bgImage})`,
        backgroundSize: "100% 100%", padding: "20px 30px", boxSizing: "border-box", fontSize: "12px", color: "#FFFFFF"
    }}>
        <div style={{ marginTop: "15px" }}>简介</div>
        <div style={{ marginTop: "5px", lineHeight: "18px" }}>{props.content}</div>
    </div>
)
Introduction.propTypes = {
    content: PropTypes.string.isRequired,
}

export default Introduction