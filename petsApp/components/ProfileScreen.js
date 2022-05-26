import { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { findOne } from "../services/service";

export default function ProfileScreen() {

    const [text, setText] = useState("");
    const [pet,setPet] = useState({});

    const handleChange = () => {
        findOne(parseInt(text))
        .then(res=>{
            res? setPet(res):alert("Not Found");
            
        })
    }



    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ paddingTop: 40, paddingBottom: 10 }}>ID:</Text>
            <TextInput placeholder="Insert an ID" value={text} onChangeText={setText} style={{ borderWidth: 1 }}></TextInput>
            <Text>{"\n"}</Text>
            <Button onPress={handleChange} title="Search"></Button>
            {pet?.name!=="" && <Card style={{ width: '90%', height: '50%' }}>
               
               <Card.Content>
                   <Title style={{textAlign:'center' }}>Gato</Title>
               </Card.Content>
               <Card.Cover source={{ uri: 'https://www.zooplus.es/magazine/wp-content/uploads/2018/04/fotolia_169457098.jpg' }} />
               

           </Card>}
            


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    img: {
        width: '90%',
        height: '80%',
    }

});