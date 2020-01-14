import React, { Component } from "react";
import icon_ball_red from "../../assets/img/lotteryResult/icon_ball_red.png"
import icon_ball_blue from "../../assets/img/lotteryResult/icon_ball_blue.png"
import icon_ball_green from "../../assets/img/lotteryResult/icon_ball_green.png"
const red = ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'];
const blue = ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'];
const green = ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49'];
export default class MarkSix extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderBallIcon(num) {
        let redball = red.find(item => item == num);
        let blueball = blue.find(item => item == num);
        let greenball = green.find(item => item == num);
        if (redball != null) {
            return (<img style={{ width: '85%' }} src={icon_ball_red} />);
        }
        if (blueball != null) {
            return (<img style={{ width: '85%' }} src={icon_ball_blue} />);
        }
        if (greenball != null) {
            return (<img style={{ width: '85%' }} src={icon_ball_green} />);
        }
    }


    renderItemBall() {
        return (
            <div className="w100 flex" style={{ height: '55%', paddingTop: "2%" }}>
                {this.props.number.map((item, index) => {
                    return index != 6 ?
                        <div key={index} className="h100 flex-center pr" style={{ width: '9%', marginLeft: '3.2%' }}>
                            <div className="pa flex-center w50" style={{ top: '18%', left: '20%', fontSize: '11px' }}>{item}</div>
                            {this.renderBallIcon(item)}
                        </div> :
                        <div key={index} className="h100  flex-center" style={{ width: "24%" }}>
                            <div className="h100 flex-center" style={{ width: '50%', marginLeft: '2%' }}>
                                <img className="w33" src={require("../../assets/img/lotteryResult/icon_add.png")} />
                            </div>
                            <div className="h100 flex-center pr" style={{ width: '37%', marginLeft: '2%' }}>
                                <div className="pa flex-center w50" style={{ top: '18%', left: '20%', fontSize: '11px' }}>{item}</div>
                                {this.renderBallIcon(item)}
                            </div>
                        </div>
                })}
            </div>
        )
    }

    
    renderItemAnimal() {
        return (
            <div className="w100 flex" style={{ height: '35%', fontSize: "10px" }}>
                {this.props.attribute.map((item, index) => {
                    return index != 6 ?
                        <div key={index} className="h100 flex-center" style={{ width: '10%', marginLeft: '2.3%' }}>
                            {item}<span style={{ display: !this.props.fiveState ? "none" : "inline-block" }}>/{this.props.five[index]}</span>
                        </div>
                        : <div key={index} className="h100 flex-center" style={{ width: '10%', marginLeft: '13%' }}>
                            {item}<span style={{ display: !this.props.fiveState ? "none" : "inline-block" }}>/{this.props.five[index]}</span>
                        </div>
                })}
            </div>
        )
    }
    
    render() {
        return (
            <div className="wh100">
                {this.renderItemBall()}
                {this.renderItemAnimal()}
            </div>
        );
    }
}
