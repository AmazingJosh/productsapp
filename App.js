import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const generateUniqueId = () => {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
};

const App = () => {
  const [user, setUser] = useState({ id: generateUniqueId(), products: [] });
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const addProduct = () => {
    if (user.products.length >= 5) {
      Alert.alert(
        "Product Limit Exceeded",
        "You can only add up to 5 products. Do you want to sign in as a different user?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Sign In", onPress: () => handleSignIn() }
        ]
      );
      return;
    }

    if (
      productName.trim() === "" ||
      productPrice.trim() === "" ||
      (!productImage && !imageUrl)
    ) {
      Alert.alert(
        "Invalid Input",
        "Please provide an image."
      );
      return;
    }

    const newProduct = {
      id: generateUniqueId(),
      name: productName,
      price: productPrice,
      image: productImage || imageUrl
    };

    setUser({
      ...user,
      products: [...user.products, newProduct]
    });

    Alert.alert("Successful", "Product added successfully! 🎉");
    setProductName("");
    setProductPrice("");
    setProductImage(null);
    setImageUrl("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setProductImage(result.uri);
    }
  };

  const handleSignIn = () => {
    setUser({ id: generateUniqueId(), products: [] });
    setProductName("");
    setProductPrice("");
    setProductImage(null);
    setImageUrl("");
    Alert.alert(
      "Signed In",
      "You are now signed in as a different user. You can add up to 5 new products."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Products</Text>
        <View style={styles.divider} />
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Product Price"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL (optional image address)"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.imagePickerText}>Select an Image</Text>
        </TouchableOpacity>
        {productImage && (
          <Image source={{ uri: productImage }} style={styles.image} />
        )}
        <View style={styles.divider} />
        <TouchableOpacity style={styles.addButton} onPress={addProduct}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
        <FlatList
          data={user.products}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
              )}
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        {user.products.length >= 5 && (
          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.signInButtonText}>
              Sign In as a Different User
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7" // Light grey background
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop:20,
    borderTopWidth:0.2,
    borderTopColor:"grey",
    padding:20

  },
  divider: {
    height: 2,
    backgroundColor: "#ddd",
    marginVertical: 10
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f2f2f2"
  },
  imagePickerButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: "center"
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 10
  },
  addButton: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
    alignItems: "center"
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  productContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5
  },
  productPrice: {
    fontSize: 16,
    color: "#28a745"
  },
  signInButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
    alignItems: "center",
    alignSelf: "center"
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default App;
