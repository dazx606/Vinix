import { Text, View, TextInput, Button } from "react-native"
import { useState } from "react";

export default function AddScreen ({ route }){

    const [name, setName] = useState("");
    const [image, setImage] = useState([]);
    const [contImg, setContImg] = useState(1);

    return(
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ paddingTop: 40, paddingBottom: 10 }}>Name:</Text>
            <TextInput placeholder="Insert the Name" value={name} onChangeText={setName} style={{ borderWidth: 1 }}></TextInput>
            
            <Text style={{ paddingTop: 20, paddingBottom: 10 }}>Images:</Text>
            {}
            <TextInput placeholder="Insert the Name" value={image} onChangeText={setImage} style={{ borderWidth: 1 }}></TextInput>
            <Text>{"\n"}</Text>
            <Button title="add more images" onPress={()=>(setContImg(contImg+1))}></Button>
            <Text>{"\n"}</Text>
            <Button title="remove images" onPress={()=>(contImg>1? setContImg(contImg-1):null)}></Button>
            
        </View>
        
    )
}