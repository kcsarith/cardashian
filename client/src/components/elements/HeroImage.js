import React, { Component } from 'react';
import styled from 'styled-components';

import generateBgGradient from '../../utils/generateBgGradient';

export default class HeroImage extends Component {
    render() {
        return (
            <>
                <HeroImageWrapper {...this.props}>
                    <ChildrenWrapper
                        style={{ ...this.props.childrenStyles }}
                    >
                        {this.props.children}
                    </ChildrenWrapper>
                </HeroImageWrapper>
            </>
        );
    }
}

const HeroImageWrapper = styled.div`
	align-items: center;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	position: relative;
	text-align: center;
	// width: 100vw;
	height: ${props => props.height};
	/* Determine parallax behavior based on our 'parallax' prop */
	background-attachment: ${props =>
        props.parallax ? 'fixed' : 'scroll'};
	/* Dynamically set this property based on our 'textPosition' prop */
	justify-content: ${props => {
        switch (props.textPosition) {
            case 'center':
                return 'center';
            case 'left':
                return 'flex-start';
            case 'right':
                return 'flex-end';
            default:
                return 'center';
        }
    }};
	background-image: ${props =>
        generateBgGradient(
            props.gradientDirection,
            props.color,
            props.opacity
        )},
		url(${props => props.imageSrc});
`;

const ChildrenWrapper = styled.div``;
