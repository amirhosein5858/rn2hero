
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
export const App = () => {
  const [text, setText] = useState("")
  const [todo, setTodo] = useState([])
  const [mounted, setMounted] = useState(false)

  const changeText = (t) => {
    setText(t)
  }

  useEffect(() => { //like componentDidMount - called with every update
    if (!mounted) {
      loadData()
      setMounted(true)
    }
  })

  const loadData = async () => {
    var storedData = await AsyncStorage.getItem("todolist");
    if (storedData) {
      setTodo(JSON.parse(storedData))
    }
  }

  const addTodo = () => {
    if (text.trim().length == 0) {
      Alert.alert('error!', 'please enter a value')
      return;
    }
    var tempTodo = todo.map(i => i);
    tempTodo.push(text);
    updateData(tempTodo)
    setText("")
  }

  const removeTodo = (index) => {
    console.log('remove todo called')
    var tempTodo = todo.map(i => i);
    tempTodo.splice(index, 1);
    updateData(tempTodo)
  }

  const updateData = (data) => {
    setTodo(data)
    AsyncStorage.setItem("todolist", JSON.stringify(data))
  }

  return (
    <View style={style.container}>

      <View style={style.buttonContainer}>
        <TextInput style={style.input} value={text} onChangeText={changeText} placeholder='enter something' />
        <TouchableHighlight underlayColor={'red'} style={style.button} onPress={addTodo}>
          <Text style={style.buttonText}>add</Text>
        </TouchableHighlight>
      </View>
      <FlatList
        style={{ width: '100%', marginTop: 10 }}
        data={todo}

        renderItem={({ item, index }) => {
          return (
            <View style={[style.rowData, { height: 40, borderRadius: 8, borderWidth: 1, marginTop: 5, alignItems: 'center', padding: 5 }]}>
              <Text style={{ fontSize: 18, color: '#000' }}>{index + 1} :  </Text>
              <Text style={{ display: 'flex', flex: 1 }}>{item}</Text>
              <TouchableHighlight onPress={() => removeTodo(index)}>
                <Text style={{ color: 'red' }}>Remove</Text>
              </TouchableHighlight>
            </View>
          )
        }}
      />

    </View>
  )
}
export default App;

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 10
  },
  button: {
    height: 40,
    width: 110,
    borderRadius: 8,
    backgroundColor: 'green',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'

  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40, flex: 1, borderColor: '#000', borderWidth: 1, borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  rowData: {
    display: 'flex',
    flexDirection: 'row'
  }
})
