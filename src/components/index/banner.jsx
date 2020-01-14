import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Carousel } from 'antd-mobile';
import '../../assets/css/banner.css'
import bannerOriginal from '../../assets/img/home/banner-original.png'
const _bannerUrl = Symbol('bannerUrl');
export default class Banner extends Component {
    constructor(props) {
        super(props);
        this[_bannerUrl] = bannerOriginal;
        this.state = {
            data: [this[_bannerUrl], this[_bannerUrl], this[_bannerUrl]],
            imgHeight: 100,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.bannerList
        });
    }


    static propTypes = {
        bannerList: PropTypes.array.isRequired,
    }

    setBannerData() {
        return this.state.data.map((val, index) =>
            (
                <a
                    key={index}
                    href="javascript:;"
                    style={{
                        display: 'block',
                        position: 'relative',
                        top: this.state.slideIndex !== index ? -6 : 0,
                        height: this.state.imgHeight,
                        padding: this.state.slideIndex !== index ? 12 : 0,
                        marginBottom: this.state.slideIndex === index ? 12 : 0,
                    }}
                >
                    <img
                        src={val.pic}
                        style={{ borderRadius: '10px', width: '100%', verticalAlign: 'top' }}
                        onError={(e) => { e.target.onerror = null; e.target.src = bannerOriginal }}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                        }}
                    />
                </a>
            )
        )
    }

    render() {
        return (
            <Carousel className="space-carousel"
                frameOverflow="visible"
                cellSpacing={10}
                slideWidth={0.8}
                style={{ height: "116px" }}
                autoplay
                infinite
                afterChange={index => this.setState({ slideIndex: index })}
            >
                {this.setBannerData()}
            </Carousel >
        );
    }
}
