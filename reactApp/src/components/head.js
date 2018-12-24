
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
    wrapSty : {

    },
    leftSty: {

    },
    leftIconSty: {

    },
    leftTxtSty: {

    },
    centerTxtSty: {

    },
    rightSty: {

    },
    rightTxtSty: {

    },
});
