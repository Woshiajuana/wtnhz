
import React, { Component }             from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
}                                       from "react-native";
import Icon                             from 'react-native-vector-icons/Ionicons'
import {
    width,
    j,
}                                       from '../utils/dimensions.util'

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
                        rightSlot
                            ? rightSlot
                            : null
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
        height: j(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftSty: {
        position: 'absolute',
        height: j(90),
        left: 0,
        bottom: 0,
        lineHeight: j(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: j(25),
    },
    leftIconSty: {
        fontSize: j(48),
        color: '#fff',
        marginRight: j(25),
    },
    leftTxtSty: {
        color: '#fff',
        fontSize: j(28),
    },
    centerTxtSty: {
        fontSize: j(34),
        color: '#fff',
    },
    rightSty: {
        position: 'absolute',
        height: j(90),
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: j(25),
    },
    rightTxtSty: {
        fontSize: j(28),
        color: '#fff',
    },
});
