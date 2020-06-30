import * as React from 'react'
import { View, Button } from 'react-native'
import StyledText from 'shared/components/base/StyledText'
import { useNavigation } from '@react-navigation/native'
import DialogManager from 'shared/components/modal/'
import Images from 'assets/images'
import StyledModalPicker from 'shared/components/picker/StyledModalPicker'

const HomeView = () => {
    const navigation = useNavigation()
    const [valuePicker, setValuePicker] = React.useState(1)
    return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 50, paddingHorizontal: 25 }}>
            {/* <StyledPicker
                title={'picker title'}
                value={valuePicker}
                icon={Images.icons.selected}
                customStyle={{ marginVertical: 10, width: '100%' }}
                data={[
                    { label: 'label1', value: 1 },
                    { label: 'label2', value: 2 },
                ]}
                onChangeValue={(value: number) => {
                    setValuePicker(value)
                }}
            /> */}
            <StyledModalPicker
                title={'picker title'}
                value={valuePicker}
                icon={Images.icons.selected}
                customStyle={{ marginVertical: 10, width: '100%' }}
                data={[
                    { label: 'label1', value: 1 },
                    { label: 'label2', value: 2 },
                    { label: 'label3', value: 3 },
                    { label: 'label4', value: 4 },
                    { label: 'label5', value: 5 },
                    { label: 'label6', value: 6 },
                    { label: 'label7', value: 7 },
                    { label: 'label8', value: 8 },
                    { label: 'label9', value: 9 },
                    { label: 'label10', value: 10 },
                    { label: 'label11', value: 11 },
                    { label: 'label12', value: 12 },
                    { label: 'label13', value: 13 },
                    { label: 'label14', value: 14 },
                    { label: 'label15', value: 15 },
                    { label: 'label16', value: 16 },
                    { label: 'label17', value: 17 },
                ]}
                onChangeValue={(value: number) => {
                    setValuePicker(value)
                }}
            />
            <Button
                title={'Modal'}
                onPress={() =>
                    DialogManager.show({
                        children: (
                            <View
                                style={{
                                    height: 100,
                                    backgroundColor: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <StyledText>Hello</StyledText>
                                <Button title={'hide'} onPress={() => DialogManager.dismiss()} />
                            </View>
                        ),
                        width: 0.9,
                        onTouchOutside: () => {
                            DialogManager.dismiss()
                        },
                    })
                }
            />
        </View>
    )
}
export default HomeView
