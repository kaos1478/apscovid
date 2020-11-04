import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  ImageBackground,
  Modal,
  TouchableHighlight
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {

    const image = { uri: "https://www.goias.gov.br/images/2020/Covid_3.jpg" };

    const [list, setList] = useState();
    const [itemG, setItemG] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const url = 'http://brasil.io/api/v1/dataset/covid19/caso_full/data?state=SP';

    const getList = async() => {
        const response = await axios.get(url);
        const responseJson = (response.data.results);
        setList(responseJson.sort().filter(item => item.city != null))
    }

    useEffect(()=>{
        getList();
    },[])

    const modalToggle = (item) => {
      setModalVisible(true);
      setItemG(item);
    }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.containerHeader}>
              <ImageBackground source={image} style={styles.imageHeader}>
                <Text style={styles.textHeader}>Dados Covid 19 (SP)</Text>
              </ImageBackground>
            </View>


            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalHeader}>
                    {itemG.city + ' - ' + itemG.state + ' ('+itemG.date+')'}
                  </Text>
                  <Text style={styles.modalText}>
                    {'Populaçao: ' + itemG.estimated_population 
                    + '\nCasos Confirmados: ' + itemG.last_available_confirmed
                    + '\nMortes Confirmadas:' + itemG.last_available_deaths}
                  </Text>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Sair</Text>
                  </TouchableHighlight>
                </View> 
              </View>
            </Modal>


            <FlatList
              style={styles.flatList}
              data={list}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({ item }) => {
                return (
                  <Text 
                    onPress={() => {
                      //showDetails(item)
                      modalToggle(item);
                    }} 
                    style={styles.listRow1}>
                      {item.city}
                  </Text>
                )
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  header: {
    backgroundColor: '#dddddd',
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    fontSize: 25
  },
  containerHeader: {
    flex: 1,
    flexDirection: "column",
    height: 150,
  },
  imageHeader: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textHeader: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold"
  },
  listRow1: {
    backgroundColor: "#f5faff",
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHeader: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  modalText: {
    textAlign: "left",
    marginBottom: 20,
  },
});

export default App;
