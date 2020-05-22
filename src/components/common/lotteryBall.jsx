import React, { Component } from "react";
import PropTypes from 'prop-types';
import icon_ball_red from "../../assets/img/lotteryResult/icon_ball_red.png"
import icon_ball_blue from "../../assets/img/lotteryResult/icon_ball_blue.png"
import icon_ball_green from "../../assets/img/lotteryResult/icon_ball_green.png"
const red = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'];
const blue = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'];
const green = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'];
const renderBallIcon = (num) => {
    let redball = red.find(item => item == num);
    let blueball = blue.find(item => item == num);
    let greenball = green.find(item => item == num);
    if (redball != null) {
        return (<img style={{ width: '90%' }} src={icon_ball_red} />);
    }
    if (blueball != null) {
        return (<img style={{ width: '90%' }} src={icon_ball_blue} />);
    }
    if (greenball != null) {
        return (<img style={{ width: '90%' }} src={icon_ball_green} />);
    }
}

const LotteryBall = (props) => (
    <div className="flex-center pr" style={{ width: props.width, height: props.height }}>
        <div className="pa flex-center w50" style={{ top: '25%', left: '20%', fontSize: '12px' }}>{props.number}</div>
        {renderBallIcon(props.number)}
    </div>
)
PropTypes.propTypes = {
    number: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
}
export default LotteryBall