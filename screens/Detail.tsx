/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const Detail = ({ navigation, route }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const movie = route.params.item;

  const trimHtml = (text: string) => {
    let temp = text;
    const charsToRemove = ['<p>', '</p>', '<b>', '</b>']
    charsToRemove.forEach((x) => {
        temp = temp.replace(x, '')
    })
    return temp;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: movie.imgUrl}}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.movieHeader}>{movie.title}</Text>
            <Text>{trimHtml(movie.summary)} </Text>
        </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textContainer: {
    padding: 20,
    height: '100%',
    color: 'white'
   },
   movieHeader: {
    fontSize: 20,
    fontStyle: 'bold',
    marginBottom: 8
   }

});


export default Detail;



