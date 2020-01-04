import React, { Component } from "react";
import PropTypes from 'prop-types';
const Bar = (props) => (
    <div className="pr" style={{ width: props.width, height: props.height, background: "#f8f7fc", borderRadius: "5px", float: "left" }}>
        <div className="h100" style={{ width: props.redWidth, background: "#FF3344", borderRadius: "5px", color: "#334C66" }}>
            <div className="wh100 flex-center pa" style={{ fontSize: "10px" }}>
                {props.text}
            </div>
        </div>
    </div >
)

Bar.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    redWidth: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}
export default Bar