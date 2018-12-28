

import React, { Component }             from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
}                                       from "react-native";
import Icon                             from 'react-native-vector-icons/Ionicons'
import {
    width,
    j,
}                                       from '../utils/dimensions.util'

export default class InputBox extends Component {
    constructor (props) {
        super(props);

    }
    render () {
        let {
            buttonTxt,
        } = this.props;
        return (
            <TouchableOpacity
                {...this.props}
                style={styles.wrapSty}>
                <Text style={styles.txtSty}>{buttonTxt}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    wrapSty: {
        width: j(640),
        height: j(100),
        marginTop: j(100),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fc5366',
    },
    txtSty: {
        fontSize: j(36),
        color: '#fff',
    },
});

