import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#f7f7f7',
      justifyContent: 'start',
      alignItems: 'start',
    },
  
    title: {
      fontSize: 22,
      fontWeight: '600',
      color: '#555',
      marginVertical: 15,
      borderBottomColor:"orange",
      borderBottomWidth:1,
      borderTopColor:"orange",
      shadowRadius:2,
      shadowColor:"orange"
    },
    formContainer: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#e9e9e9',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#FF6B00',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    addButton: {
      backgroundColor: '#FF6B00',
    },
    switchButton: {
      backgroundColor: '#FF6B00',
    },
    productList: {
      width: '100%',
      paddingVertical: 20,
    },
    productItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    productImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginRight: 15,
      borderWidth: 2,
      borderColor: '#FF6B00',
    },
    productInfo: {
      flex: 1,
    },
    productName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 18,
      color: '#FF6B00',
      fontWeight: '600',
    },
    welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'orange',
    marginBottom: 15,
    
    },
    imagePickerContainer: {
    marginBottom: 20,
    },
    
    imageButton: {
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'start',
    padding: 10,
    borderRadius: 8,
    },
    imageButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    },
    });