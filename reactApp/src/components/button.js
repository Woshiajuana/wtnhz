

import React, { Component }             from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    TextInput,
}                                       from "react-native";
import Icon                             from 'react-native-vector-icons/Ionicons'
const width = Dimensions.get('window').width;

export default class InputBox extends Component {
    constructor (props) {
        super(props);

    }

    render () {
        let {
            labelTxt,
        } = this.props;
        return (
            <View style={styles.wrapSty}>
                <View style={styles.labelSty}>
                    <Text style={styles.labelTxtSty}>{labelTxt}</Text>
                </View>
                <View style={styles.innerSty}>
                    <TextInput style={styles.inputSty} />
                    <TouchableOpacity
                        style={styles.clearSty}>
                        <Icon name="ios-arrow-back" style={styles.clearIconSty}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapSty: {
        width,
        height: 70,
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
    },
    labelSty: {
        height: 30,
        lineHeight: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelTxtSty: {
        fontSize: 14,
        color: '#999',
    },
    innerSty: {
        height: 40,
        borderColor: '#dedede',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputSty: {
        flex: 1,
        paddingLeft: 0,
    },
    clearSty: {
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        backgroundColor: 'red'
    },
    clearIconSty: {
        fontSize: 30,
        color: '#999',
        textAlign: 'center',
        lineHeight: 40,
    },
});

