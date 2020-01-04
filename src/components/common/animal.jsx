// import React, { Component } from "react";
// export default (props) => (
//     <div className="pa" style={{ width: props.style.width, height: props.style.height, top: props.style.top, left: props.style.left }}>
//         <div className="pr" style={{ width: props.style.width, height: props.style.height, background: props.style.background,backgroundSize:props.style.backgroundSize, borderRadius: props.style.borderRadius }}>
//             <div className="pa" style={{ color: "white", top: "5px", left: "5px" }}>{props.animal}</div>
//             <div className="pa" style={props.animalStyle}><img className="w100" src={props.src} /></div>
//         </div >
//     </div>
// )

import React, { Component } from "react";
import PropTypes from 'prop-types';
export default class Animal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static propTypes = {
        animal: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        style: PropTypes.object.isRequired,
        animalStyle: PropTypes.object.isRequired
    }

    render() {
        const props = this.props;
        return (
            <div className="pa" style={{ width: props.style.width, height: props.style.height, top: props.style.top, left: props.style.left }}>
                <div className="pr" style={{ width: props.style.width, height: props.style.height, background: props.style.background, backgroundSize: props.style.backgroundSize, borderRadius: props.style.borderRadius }}>
                    <div className="pa" style={{ color: "white", top: "5px", left: "5px" }}>{props.animal}</div>
                    <div className="pa" style={props.animalStyle}><img className="w100" src={props.src} /></div>
                </div >
            </div>
        )
    }
}
