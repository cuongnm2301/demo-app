import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { StyledText, StyledIcon } from '../base'
import {
    View,
    ImageSourcePropType,
    StyleProp,
    ViewStyle,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
} from 'react-native'
import { Themes } from 'assets/themes'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'

const { height } = Dimensions.get('window')

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

const StyledModalPicker = (props: StyledImageProps) => {
    const exits: PickerData | undefined = props.data.find((k: PickerData) => k.value === props.value)
    const exitsLabel: string = exits ? exits.label : props.data.length > 0 ? props.data[0].label : ''
    const exitsValue: string | number = exits ? exits.value : props.data.length > 0 ? props.data[0].value : ''

    const modalize = React.useRef<Modalize>(null)

    const renderPicker = () => {
        modalize.current?.open()
    }
    return (
        <View style={props.customStyle}>
            {props.title ? <StyledText>{props.title}</StyledText> : null}
            <TouchableOpacity style={styles.content} onPress={renderPicker}>
                <StyledText>{exitsLabel.toString()}</StyledText>
                {props.icon ? <StyledIcon source={props.icon} size={14} /> : null}
            </TouchableOpacity>
            <Portal>
                <Modalize
                    ref={modalize}
                    HeaderComponent={() => {
                        return (
                            <View
                                style={{
                                    paddingVertical: 15,
                                    marginHorizontal: 15,
                                    borderBottomColor: '#eee',
                                    borderBottomWidth: 1,
                                }}
                            >
                                <Text style={{ fontSize: 15, fontWeight: '200' }}>{props.title}</Text>
                            </View>
                        )
                    }}
                    modalHeight={height * 0.6}
                >
                    <View style={{ paddingHorizontal: 15 }}>
                        {props.data.map((item: PickerData) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingVertical: 15,
                                        borderBottomColor: '#f9f9f9',
                                        borderBottomWidth: 1,
                                    }}
                                    key={item.value}
                                    onPress={() => {
                                        props.onChangeValue(item.value)
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 35,
                                            height: 35,
                                            marginRight: 15,
                                            overflow: 'hidden',
                                            backgroundColor: '#eee',
                                            borderRadius: 26,
                                        }}
                                    >
                                        {exitsValue === item.value ? (
                                            <Image
                                                style={{ width: '100%', height: '100%' }}
                                                source={{
                                                    uri:
                                                        'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/sign-check-icon.png',
                                                }}
                                            />
                                        ) : null}
                                    </View>
                                    <Text style={{ fontSize: 16 }}>{item.label}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Modalize>
            </Portal>
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

export default React.memo(StyledModalPicker)
