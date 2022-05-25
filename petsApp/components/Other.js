import { Text } from "react-native"

export default function Home ({ route }){

    return(
        <Text>This is {route.params.name}'s profile</Text>
    )
}