import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { findAll } from "../services/service";
import CardPet from "./CardPet";
import { useCallback } from "react";

export default function PetsScreen() {

  const [pets, setPets] = useState([])

  useEffect(() => {

    findAll().then(res => {
      if (res) setPets(res)
      else { alert("Not Found") }
    })

    return () => {
      navigation.setParams({ screen: undefined })
    }
 

  }, [navigation])




  return (
    <View style={{ flex: 1, }}>
      <ScrollView >
        <Text >All pets</Text>
        {pets && pets.map((e, k) => <CardPet key={k + 1} name={e.name} status={e.statusStatus}
          img={e.photos[0].photoUrls} tags={e.tags.map(e => e.name)}
        ></CardPet>)}
      </ScrollView>
    </View>

  );
}


