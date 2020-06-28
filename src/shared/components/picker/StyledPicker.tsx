import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { StyledText, StyledIcon } from '../base'
import { View, ImageSourcePropType, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import { Themes } from 'assets/themes'
import DialogManager from '../modal'
import Picker from 'react-native-picker'

interface PickerData {
    label: string
    value: string | number
}

interface StyledImageProps {
    title?: string
    value: string | number
    customStyle?: StyleProp<ViewStyle>
    icon?: ImageSourcePropType
    data: Array<PickerData>
    onChangeValue(value: string | number): void
}

const StyledPicker = (props: StyledImageProps) => {
    const exits: PickerData | undefined = props.data.find((k: PickerData) => k.value === props.value)
    const exitsValue: string | number = exits ? exits.label : props.data.length > 0 ? props.data[0].value : ''
    const arrData = props.data ? props.data.map((k: any) => k.label) : []

    const renderPicker = () => {
        console.log(exits?.value)
        DialogManager.show({
            children: <View />,
            onTouchOutside: () => {
                DialogManager.dismiss()
                Picker.hide()
            },
        })
        Picker.init({
            pickerData: arrData,
            selectedValue: [exits?.label],
            pickerCancelBtnText: '',
            pickerConfirmBtnText: '',
            pickerFontSize: 13,
            onPickerSelect: (data: any) => {
                const value = props.data.find((k: PickerData) => k.label === data[0])?.value
                props.onChangeValue(value || '')
            },
        })
        Picker.show()
    }
    return (
        <View style={props.customStyle}>
            {props.title ? <StyledText>{props.title}</StyledText> : null}
            <TouchableOpacity style={styles.content} onPress={renderPicker}>
                <StyledText>{exitsValue.toString()}</StyledText>
                {props.icon ? <StyledIcon source={props.icon} size={14} /> : null}
            </TouchableOpacity>
        </View>
    )
}

const styles = ScaledSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10@vs',
        paddingHorizontal: '15@s',
        width: '100%',
        backgroundColor: Themes.COLORS.secondary,
        marginTop: '5@vs',
        borderRadius: 6,
    },
})

export default React.memo(StyledPicker)
