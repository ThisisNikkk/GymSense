import { useRoute, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/Reducers/userData";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppRoutes from "../../routes/RouteKeys/appRoutes";

// Image imports


interface HomeProps {
  navigation: any;
}

const Avatar: React.FC<HomeProps> = ({ navigation }) => {
  const bg = require('../../assets/avatarbg.png');
  const male = require('../../assets/male.png');
  const female = require('../../assets/female.png');
  const route = useRoute();
  const { name } = route.params as { name: string };
  console.log(name)
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [image, setImage] = useState(bg);
  const [selected, setSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.parent}>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="dark-content"
          hidden={false}
        />

        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Back</Text>
        </Pressable>

        <View style={styles.content}>
          <Image
            source={image}
            style={styles.bg}
            resizeMode={selected ? "contain" : undefined}
          />
        </View>

        <View style={styles.whiteContainer}>
          <View style={{ alignItems: 'center', marginVertical: 32 }}>
            <Text style={styles.avatarText}>Create your avatar</Text>
            <Text style={styles.avText}>
              Create your avatar and unlock new gear{'\n'}
              as you crush your workouts!
            </Text>

            <View style={styles.avatarSelectionButton}>
              <TouchableOpacity
                style={[styles.selectorbutton, { backgroundColor: '#242528' }]}
                onPress={() => {
                  setImage(male);
                  setSelected(true);
                  setSelectedImage(male);
                }}
              >
                <Text style={styles.buttonText}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.selectorbutton, { backgroundColor: '#242528' }]}
                onPress={() => {
                  setImage(female);
                  setSelected(true);
                  setSelectedImage(female)
                }}
              >
                <Text style={styles.buttonText}>Female</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#242528' }]}
              onPress={() => {
                if (!selectedImage) return Alert.alert("Please select an avatar");
                navigation.navigate(AppRoutes.WelcomeApp, {
                  name,
                  avatar: selectedImage
                });
              }}
            >
              <Text style={styles.buttonText}>Configure Avatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#DBFFF0',
  },
  btn: {
    position: 'absolute',
    paddingTop: 48,
    paddingHorizontal: 25,
    zIndex: 10,
  },
  cancelText: {
    fontFamily: "Poppins-Medium",
    color: '#757575',
    fontSize: 14,
    lineHeight: 24,
  },
  content: {
    flex: 0.6,
    alignItems: 'center',
  },
  bg: {
    height: 499,
    width: 375,
  },
  whiteContainer: {
    flex: 0.42,
    marginBottom: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 16,
    elevation: 5,
  },
  avatarText: {
    fontFamily: "Poppins-Regular",
    fontSize: 30,
    lineHeight: 32,
  },
  avText: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 24,
    marginVertical: 10,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  avatarSelectionButton: {
    flexDirection: 'row',
    gap: 50,
  },
  selectorbutton: {
    width: 150,
    height: 55,
    borderRadius: 18,
    padding: 12,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 350,
    height: 55,
    borderRadius: 18,
    padding: 12,
    marginVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Avatar;
