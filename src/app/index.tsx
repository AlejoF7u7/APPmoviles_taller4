import {useEffect, useState} from 'react'
import {View, Text, TextInput, Button, FlatList} from 'react-native'
import{Carro} from '../../types/carro'

//URL base de la API, tomada de variables de entorno de EXPO
const URL = `${process.env.EXPO_PUBLIC_API_URL}patio`

export default function App(){
  //Estado para almacenar la lista de carros obtenidos del backend mockeado
  const [carros, setCarros] = useState<Carro[]>([])
  //Estado para manejar el texto ingresado en el input(marca del carro)
  const[marca, setMarca] = useState('')

  //Get: funcion reutilizable para traer la lista desde el backend
  const cargar = () => {
    fetch(URL) //Llamada de la API
    .then(res => res.json()) //Parsear la respuesta a JSON
    .then(setCarros) //Guardar en el estado 'carros'
    console.log('GET ejecutado desde pantalla index') // Imprimerse en cada get realizado
  }

  //el useEffect se ejecuta una sola vez al montar el componente
  useEffect(() => {cargar()}, [])

  const agregar = async () => {
    await fetch(URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({marca})
    })
    setMarca('') //Limpiar el input
    cargar() //Recargar la lista de carros
  }

  return(
    <View style={{flex:1, padding:60 ,backgroundColor:'#f5f5f5'}}>
      <TextInput
       value={marca}
       onChangeText={setMarca}
       placeholder='Ingrese marca del carro'
        style={{borderWidth:3}}
      />
      <Button title='Agregar' onPress={agregar}/>
      <FlatList
        data={carros}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.marca}</Text>}
      />
    </View>
  ) 

}