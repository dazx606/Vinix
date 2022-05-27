import { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";

import { findOne } from "../services/service";
import CardPet from "./CardPet";

export default function ProfileScreen() {

    const [text, setText] = useState("");
    const [pet,setPet] = useState({});

    const handleChange = () => {
        findOne(parseInt(text))
        .then(res=>{
            if(res) setPet(res)
            else {alert("Not Found");
            setPet({})}
        })

        console.log(pet);
    }



    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ paddingTop: 40, paddingBottom: 10 }}>ID:</Text>
            <TextInput placeholder="Insert an ID" value={text} onChangeText={setText} style={{ borderWidth: 1 }}></TextInput>
            <Text>{"\n"}</Text>
            <Button onPress={handleChange} title="Search"></Button>
            {pet.pet?.name? <CardPet name={pet.pet.name} img={pet.images[0].photoUrls}
            status={pet.pet.statusStatus ? pet.pet.statusStatus:undefined}
            tags={pet.tags.toString().replaceAll(","," ")}
            />:null  }
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