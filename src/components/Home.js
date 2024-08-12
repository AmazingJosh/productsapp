import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList, Image, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons'; 
import {createUser,resetProducts,switchUser,addProduct} from "../redux/userSlice"
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';


const Home = () => {
  const [username, setUsername] = useState('');
  const [product, setProduct] = useState({ name: '', price: '', imageUrl: '' });
  const [imageSource, setImageSource] = useState(''); 
  const [isImageSelected, setIsImageSelected] = useState(false); 
  const [animation] = useState(new Animated.Value(0)); 
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);

  const handleCreateUser = () => {
    if (username.trim()) {
      const user = { id: Date.now().toString(), name: username, products: [] };
      dispatch(createUser(user));
      setUsername('');
    } else {
      Alert.alert('Input Error', 'Please enter a valid username.');
    }
  };
   const handleSwitchUser = () => {
    dispatch(resetProducts(currentUser));
    dispatch(switchUser(null));
  };
  
   const handleAddProduct = () => {
    if (product.name.trim() && product.price.trim()) {
      if (currentUser && users[currentUser].products.length < 5) {
        dispatch(addProduct({ userId: currentUser, product }));
        Alert.alert('Successful', 'your product added successfully 🎉');
        setProduct({ name: '', price: '', imageUrl: '' });
        setImageSource('');
        setIsImageSelected(false);
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      } else {
        Alert.alert('products Limit Exceeded', 'you can only add 5 products!');
      }
    } else {
      Alert.alert('Input Error', 'Please enter valid product details.');
    }
  };
  
   const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageSource('local');
      setProduct({ ...product, imageUrl: result.assets[0].uri });
      setIsImageSelected(true);
  
  
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };
   const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₦{item.price}</Text>
      </View>
    </View>
  );
  
  
  const buttonColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF6B00', '#4CAF50'], 
  });

  

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {!currentUser && (
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
            <Text style={styles.buttonText}>Create a User</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentUser && (
        <>
          <Text style={styles.welcomeText}>Welcome, {users[currentUser].name}!</Text>
          <Text style={styles.title}>Add a New Product</Text>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Product Name"
              value={product.name}
              onChangeText={(text) => setProduct({ ...product, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Product Price"
              value={product.price}
              onChangeText={(text) => setProduct({ ...product, price: text })}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.imagePickerContainer}>

              <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
                <Animated.View style={[styles.imageButton, { backgroundColor: buttonColor }]}>
                  {isImageSelected ? (
                    <FontAwesome name="check-circle" size={20} color="#fff" />
                  ) : null}
                  <Text style={styles.imageButtonText}>
                    {isImageSelected ? 'Image Selected' : 'Select Image from Storage'}
                  </Text>
                </Animated.View>
              </TouchableOpacity>

              <TextInput
                placeholder="Or Enter Image URL"
                value={imageSource === 'url' ? product.imageUrl : ''}
                onChangeText={(text) => {
                  setImageSource('url');
                  setProduct({ ...product, imageUrl: text });
                }}
                style={styles.input}
              />
            </View>

            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddProduct}>
              <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{width:"100%"}}
            data={users[currentUser]?.products}
            renderItem={renderProduct}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.productList}
          />

          <TouchableOpacity style={[styles.button, styles.switchButton]} onPress={handleSwitchUser}>
            <Text style={styles.buttonText}>Switch to another user</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};


  
  export default Home;
