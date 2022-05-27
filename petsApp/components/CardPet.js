import { Text } from "react-native";
import { Card, Title } from "react-native-paper";
export default function CardPet(params) {

    return (
        <Card style={{ width: '90%', marginBottom: 20 }}>

            <Card.Content>
                <Title style={{ textAlign: 'center' }}>{params.name}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: params.img }} />
            {params.status?<Text>Status: {params.status}</Text>:null}
            {params.tags.length?<Text>Tags: {params.tags.toString().replaceAll(","," ")}</Text>:null}

        </Card>
    )
}   