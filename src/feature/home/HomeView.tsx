import * as React from 'react'
import { View, Button } from 'react-native'
import StyledText from 'shared/components/base/StyledText'
import { useNavigation } from '@react-navigation/native'
import DialogManager from 'shared/components/modal/'

const HomeView = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StyledText>{'Home'}</StyledText>
            <Button
                title={'Modal'}
                onPress={() =>
                    DialogManager.show(
                        {
                            children: (
                                <View
                                    style={{
                                        height: 100,
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <StyledText>zxczxczcx</StyledText>
                                    <Button title={'hide'} onPress={() => DialogManager.dismiss()} />
                                </View>
                            ),
                            width: 0.9,
                        },
                        () => {
                            console.log('call-back')
                        },
                    )
                }
            />
        </View>
    )
}
export default HomeView
