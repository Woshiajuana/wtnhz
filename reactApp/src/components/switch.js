import React, { Component }             from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
}                                       from "react-native";
import {
    width,
    j,
}                                       from '../utils/dimensions.util'

export default class Switch extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        let {
            value,
            onChangeText,
        } = this.props;
        return (
            <TouchableOpacity
                onPress={() => {
                    onChangeText && onChangeText()
                }}
                style={[styles.wrapSty, value && styles.wrapActiveSty]}>
                <View style={styles.innerSty}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    wrapSty: {
        width: j(50),
        height: j(32),
        borderColor: '#dedede',
        borderRadius: j(32),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#999',
        padding: j(2),
    },
    wrapActiveSty: {
        backgroundColor: '#fc5366',
        justifyContent: 'flex-end',
    },
    innerSty: {
        width: j(28),
        height: j(28),
        borderRadius: j(28),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
