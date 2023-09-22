import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link, Stack } from 'expo-router';

function index() {
    return (
        <View style={styles.container}>
          <Stack.Screen options={{ headerShown: false}}/>
          <View style={styles.imageContainer}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/logo-home.png')}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.mainFont, styles.mainTitle]}>AlertSimplon</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.mainFont, styles.mainText]}>Vous êtes témoin d'un dysfonctionnement au sein de Simplonville, alors n'attendez plus, prévenez nous !</Text>
          </View>
          <Link href="/form" style={styles.buttonContainer}>ALERTER</Link>
          <StatusBar style="auto" />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CD0034',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainFont : {
      fontWeight: 'bold',
      color: '#fff',
    },
    imageContainer: {
      position: 'absolute',
      top: 100,
      borderRadius: 100,
      backgroundColor: "#000",
    },
    tinyLogo: {
      borderRadius: 100,
      width: 120,
      height: 120,
    },
    titleContainer: {
      marginBottom: 70,
    },
    mainTitle: {
      fontSize: 40,
    },
    textContainer : {
      marginLeft: 30,
      marginRight: 30,
    },
    mainText: {
      fontSize: 16,
      textAlign: 'center',
      fontStyle: "italic",
      lineHeight: 30,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 120,
      backgroundColor: '#fff',
      width: 280,
      height: 68,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: 16,
    },
  });

export default index