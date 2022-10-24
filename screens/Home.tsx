/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { useNavigation } from '@react-navigation/native'
import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


interface Movie {
    title: string,
    imgUrl: string,
    summary: string,
    id: string,
}

/** Error component - Will be shown if the call to the api fails. **/
const ErrorComp: React.FC = () => {
   return (
    <View>
        <Text style={styles.noResults}>Sorry, there was an error loading.</Text>
    </View>
   );
 };


/** Result component. **/
const ResultComp: React.FC<
   PropsWithChildren<{
    item: Movie;
    movieList: []
   }>
 > = ({item, movieList}) => {
   return (
   <View>
      { movieList.length > 0 ?
           <View
             style={styles.listContainer}>

               {movieList.map((item) => {
                 return (<MovieCard key={item.id} item={item}></MovieCard>)})}
           </View>
           :
           <View>
              <Text style={styles.noResults}> Sorry, no results found.</Text>
           </View>
           }
   </View>
   );
 };


/** Movie card component - Will render one for each item in the movieList. **/
const MovieCard: React.FC<
  PropsWithChildren<{
    item: Movie;
  }>
> = ({item}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation();

  return (
    <View style={styles.movieCard} >
        <TouchableOpacity onPress={() => navigation.navigate('Detail', {item: item})}>
        <Image style={styles.image} source={{uri: item.imgUrl}} />
        </TouchableOpacity>

    </View>
  );
};



const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(false);

  const movieItemMapper = (list) => {
    let newList: Movie[] = list.map((item) => {
         return {
            title: item.show.name,
            imgUrl: item.show.image == null ? 'https://via.placeholder.com/210x295/111217/FFFFFF/?text=No%20Image' :  item.show.image.original,
            summary: item.show.summary,
            id: item.show.id
         }
    })
    setMovieList(newList);
  }

  useEffect(() => {
    let url = searchQuery != '' ? `https://api.tvmaze.com/search/shows?q=${searchQuery}` : 'https://api.tvmaze.com/search/shows?q=a';
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        setError(false);
        movieItemMapper(result);
    })
    .catch((error) => {
        setError(true);
    })
  }, [searchQuery]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <TextInput style={styles.input} onChangeText={setSearchQuery} value={searchQuery} placeholder="Search for something"/>
        { error ?  <ErrorComp/> : <ResultComp movieList={movieList}/> }
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#29323c',
    height: '100%',
    paddingTop: 8
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 16
  },
  noResults: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    paddingTop: 16,
  },
  listContainer: {
    backgroundColor: '#29323c',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexGap: 24,
    paddingTop: 24
  },
  movieCard: {
    paddingHorizontal: 24,
    width: '45%',
    height: 200,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%'
  }

});

export default Home;


