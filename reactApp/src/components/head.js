
import React, { Component }             from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
}                                       from "react-native";
import Icon                             from 'react-native-vector-icons/Ionicons'
const width = Dimensions.get('window').width;

export default class Head extends Component {
    constructor (props) {
        super(props);

    }

    render () {
        let {
            centerSlot,
            leftSlot,
            rightSlot,
            leftTxt,
            rightTxt,
            centerTxt,
        } = this.props;
        return (
            <View style={styles.wrapSty}>
                <TouchableOpacity
                    style={styles.leftSty}>
                    {
                        leftSlot
                            ? leftSlot
                            : <Icon name="ios-arrow-back" style={styles.leftIconSty}/>
                    }
                    <Text style={styles.leftTxtSty}>{leftTxt}</Text>
                </TouchableOpacity>
                {
                    centerSlot
                        ? centerSlot
                        : <Text style={styles.centerTxtSty}>{centerTxt}</Text>
                }
                <TouchableOpacity
                    style={styles.rightSty}>
                    {
                        rightSlot && rightSlot
                    }
                    <Text style={styles.rightTxtSty}>{rightTxt}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    wrapSty: {
        width,
        height: 44,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSty: {
        position: 'absolute',
        height: 44,
        left: 0,
        bottom: 0,
        lineHeight: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
    },
    leftIconSty: {
        fontSize: 30,
        color: '#fff',
        marginRight: 10,
    },
    leftTxtSty: {
        color: '#fff',
        fontSize: 14,
    },
    centerTxtSty: {
        fontSize: 18,
        color: '#fff',
    },
    rightSty: {
        position: 'absolute',
        height: 44,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },
    rightTxtSty: {
        fontSize: 14,
        color: '#fff',
    },
});
