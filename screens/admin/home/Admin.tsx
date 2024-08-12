import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAuthContext } from '../../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const Admin = () => {
  const { signOut } = useAuthContext();
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut();
    navigation.navigate("Login")
  }
  return (
    <View style={styles.container}>
      <Text>Admin</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Admin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    padding: 10
  }
})