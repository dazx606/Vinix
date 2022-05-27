import { Text, View, TextInput, Button, CheckBox } from "react-native"  
import { useState } from "react";
import { create } from "../services/service";

export default function AddScreen ({ route }){

    const [id,setId] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [status, setStatus] =useState("");
    const [isSelectedA, setSelectionA] = useState(false);
    const [isSelectedB, setSelectionB] = useState(false);
    const [isSelectedC, setSelectionC] = useState(false);
    const [tags, setTags] = useState("");
    

    return(
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ paddingTop: 10, paddingBottom: 10 }}>ID:</Text>
            <TextInput keyboardType="number-pad" placeholder="Insert the ID (unique)" value={id} onChangeText={setId} style={{ borderWidth: 1 }}></TextInput>
            <Text style={{ paddingTop: 5, paddingBottom: 10 }}>Name:</Text>
            <TextInput placeholder="Insert the Name" value={name} onChangeText={setName} style={{ borderWidth: 1 }}></TextInput>
            <Text style={{ paddingTop: 5, paddingBottom: 10 }}>Category::</Text>
            <TextInput placeholder="Insert the Category" value={category} onChangeText={setCategory} style={{ borderWidth: 1 }}></TextInput>
            <Text style={{ paddingTop: 5, paddingBottom: 10 }}>Tags {"(separes by an space)"}:</Text>
            <TextInput placeholder="Insert tags" value={tags} onChangeText={setTags} style={{ borderWidth: 1 }}></TextInput>
            <Text style={{ paddingTop: 5, paddingBottom: 10 }}>Images:</Text>
            {images.map((e,k)=> <Text key={k+1}>{e}</Text>)}
            <Text>{"\n"}</Text>
            <TextInput placeholder="Insert the Name" value={image} onChangeText={setImage} style={{ borderWidth: 1 }}></TextInput>
            <Text>{"\n"}</Text>
            <Button title="add more images" onPress={()=>(setImages([...images, image]))}></Button>
            <Text>{"\n"}</Text>
            <Button title="remove images" onPress={()=>{let newImg = images; newImg.pop(); setImages([...newImg])}}></Button>
            <Text>{"\n"}</Text>
            <Text value="active">Select an status:</Text>
            <Text value="active">Available</Text>
            <CheckBox value={isSelectedA} onValueChange={setSelectionA} onChange={()=>{setStatus("available"); setSelectionB(false); setSelectionC(false)}} /> 
            <Text value="active">pending</Text>
            <CheckBox value={isSelectedB} onValueChange={setSelectionB} onChange={()=>{setStatus("pending"); setSelectionA(false); setSelectionC(false)}} /> 
            <Text value="active">Sold</Text>
            <CheckBox value={isSelectedC} onValueChange={setSelectionC} onChange={()=>{setStatus("sold"); setSelectionB(false); setSelectionA(false)}} /> 
            <Text>{"\n"}</Text> 
            <Button title="Create pet" onPress={()=>{
                let arrTags = tags.split(" ")
                arrTags = arrTags.map(e=>({name:e}))
                if(images.length>=1 && id && name){
                    let pet ={id:parseInt(id),name, status, category:{name:category},tags:arrTags,photoUrls:images}
                    create(pet).then(res=>alert(res.msg))
                    setId("")
                    setName("")
                    setCategory("")
                    setTags("")
                    setImage("")
                    setImages([])
                    setSelectionA(false)
                    setSelectionB(false)
                    setSelectionC(false)

                }
                else{
                    alert("Fill all data")
                }
                
                }}></Button>
            
              
            
        </View>
        
    )
}