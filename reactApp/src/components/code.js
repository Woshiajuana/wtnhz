import React, { Component }             from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
}                                       from "react-native";
import {
    width,
    j,
}                                       from '../utils/dimensions.util'

export default class Code extends Component {
    constructor (props) {
        super(props);
        let { number } = this.props;
        this.state = {
            number: number || 60,
            def: number || 60,
        };
    }
    _handleCode () {
        let {
            onPress
        } = this.props;
        if (!onPress) return;
        onPress(this._countDown.bind(this));
    }
    _countDown () {
        let {
            number,
            def,
        } = this.state;
        if (number <= 0)
            return this.setState({
                number: def,
            });
        number--;
        this.setState({
            number,
        });
        setTimeout(this._countDown.bind(this), 1000);
    }
    render () {
        let {
            number,
            def,
        } = this.state;
        return (
            <View style={styles.wrapSty}>
                {
                    number === def
                        ?
                        <TouchableOpacity style={styles.innerSty} onPress={this._handleCode.bind(this)}>
                            <Text style={styles.innerTextSty}>获取验证码</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.innerSty}>
                            <Text style={[styles.innerTextSty, styles.innerDisabledTextSty]}>已发送 {this.state.number}s</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapSty: {
        width: j(200),
        height: j(40),
        borderColor: '#dedede',
        borderLeftWidth: 1,
    },
    innerSty: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerTextSty: {
        color: '#fc5366',
        fontSize: j(24),
    },
    innerDisabledTextSty: {
        color: '#dedede',
    }
});

