

import React, { Component }             from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
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
            labelTxt,
            value,
            onChangeText,
            children,
        } = this.props;
        let textInputProps = {
            ...this.props,
        };
        delete textInputProps.children;
        return (
            <View style={styles.wrapSty}>
                <View style={styles.labelSty}>
                    <Text style={styles.labelTxtSty}>{labelTxt}</Text>
                </View>
                <View style={styles.innerSty}>
                    <TextInput
                        {...textInputProps}
                        style={styles.inputSty}
                    />
                    {
                        value ?
                            <TouchableOpacity
                                onPress={() => {
                                    onChangeText && onChangeText('');
                                }}
                                style={styles.clearSty}>
                                <Icon name="ios-close" style={styles.clearIconSty}/>
                            </TouchableOpacity>
                            : null
                    }
                    { children }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapSty: {
        width,
        height: j(120),
        flexDirection: 'column',
        paddingLeft: j(55),
        paddingRight: j(55),
        marginTop: j(30),
    },
    labelSty: {
        height: j(40),
        lineHeight: j(40),
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelTxtSty: {
        fontSize: j(24),
        color: '#999',
    },
    innerSty: {
        height: j(80),
        borderColor: '#dedede',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputSty: {
        flex: 1,
        height: j(80),
        fontSize: j(28),
        color: '#333',
        padding: 0,
    },
    clearSty: {
        width: j(80),
        height: j(80),
        textAlign: 'center',
        lineHeight: j(80),
    },
    clearIconSty: {
        fontSize: j(60),
        color: '#999',
        textAlign: 'center',
        lineHeight: j(80),
    },
});

