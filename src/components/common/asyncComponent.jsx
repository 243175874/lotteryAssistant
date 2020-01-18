import React, { Component } from "react";
export default class AsyncComponent extends Component {
    constructor() {
        super();
        this.state = {
            component: null
        }
    }
    componentDidMount() {
        importComponent()
            .then(cmp => {
                this.setState({ component: cmp.default });
            });
    }
    render() {
        const C = this.state.component;
        return C ? <C {...this.props} /> : null;
    }
}
