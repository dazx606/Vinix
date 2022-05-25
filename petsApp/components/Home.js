import { View, Button, Text } from "react-native";

export default function Home({ navigation, route }) {


    return (
        <View>
            <Button
                title="Black Widow"
                onPress={() =>
                    navigation.navigate('Other', { name: 'Black Widow' })
                }
            />
            <Button
                title="Black Panther"
                onPress={() =>
                    navigation.navigate('Other', { name: 'Black Panther' })
                }
            />
            <Button
                title="Extra"
                onPress={() =>
                    navigation.navigate('Extra')
                }
            />
            <Text>{route.params?.fromChild || "Param not provided yet"}</Text>
        </View>
    );

}