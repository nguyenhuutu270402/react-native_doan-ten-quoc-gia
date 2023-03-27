import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, useWindowDimensions, Modal, Pressable, Alert, ToastAndroid } from 'react-native';

export default function App() {
  const { height, width } = useWindowDimensions();
  const [country, setCountry] = useState({});
  const [arrChose, setArrChose] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const isCorrect = useRef(false);
  const nameCorrect = useRef('');
  const indexCountry = useRef(0);
  useEffect(() => {
    countries.sort(() => Math.random() - 0.5);
    setCountry(countries[0]);
    const arrChose0 = countries[0].chose;
    arrChose0.sort(() => Math.random() - 0.5);
    setArrChose(arrChose0);
    indexCountry.current = 0;
    arrChose0.forEach(element => {
      if (element.correct == true) {
        nameCorrect.current = element.name;
      }
    });
  }, []);

  const onCheckCorrect = (correct, index) => {
    isCorrect.current = correct;
    setIsShowModal(true);
  }
  const onNextQuizz = () => {
    if (indexCountry >= countries.length - 1) {
      ToastAndroid.show('You are god!!!', ToastAndroid.SHORT);
      return;
    }
    setCountry(countries[indexCountry.current + 1]);
    const arrChose0 = countries[indexCountry.current + 1].chose;
    arrChose0.sort(() => Math.random() - 0.5);
    setArrChose(arrChose0);
    indexCountry.current++;
    arrChose0.forEach(element => {
      if (element.correct == true) {
        nameCorrect.current = element.name;
      }
    });
    setIsShowModal(false);
    console.log(indexCountry.current);
    console.log(countries[0]);

  }
  return (
    <View>
      <ScrollView>
        <View style={[styles.container, { minWidth: width, minHeight: height }]}>
          <StatusBar style="light" translucent={true} />
          <Text style={styles.textAns}>Whose flag is it?</Text>
          < Image style={styles.image} source={{ uri: country.image }} />
          <View style={styles.contentItem}>
            {
              arrChose.map((item, index) => (
                <TouchableOpacity
                  onPress={() => onCheckCorrect(item.correct)}
                  style={styles.boxItem} key={item.name}>
                  <Text style={styles.textItem}>{item.name}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowModal}
        hardwareAccelerated={true}
        onRequestClose={() => onNextQuizz()}>
        <Pressable style={[styles.centeredView, { width: width, height: height }]} onPress={() => onNextQuizz()}>
          <Pressable style={styles.modalView}>
            {
              isCorrect.current ?
                <Text style={[styles.modalText, { color: 'green' }]}>CORRECT!</Text>
                :
                <Text style={[styles.modalText, { color: 'red' }]}>INCORRECT!</Text>
            }
            <Text style={styles.modalTextAns}>The exact answer is: {nameCorrect.current}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => onNextQuizz()}>
              <Text style={styles.textClose}>OK</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>

  );
}

const styles = StyleSheet.create({
  textClose: {
    color: 'white',
    fontSize: 16,
  },
  buttonClose: {
    backgroundColor: 'green',
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  modalTextAns: {
    fontSize: 16,
    marginVertical: 16,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalView: {
    backgroundColor: 'white',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    elevation: 2,
    borderRadius: 10,
  },
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItem: {
    fontSize: 16,
    color: 'white'
  },
  boxItem: {
    width: '40%',
    minHeight: 40,
    padding: 6,
    backgroundColor: 'gray',
    margin: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    elevation: 2,
  },
  contentItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    aspectRatio: 1.6,
    resizeMode: 'contain',
  },
  textAns: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: '700',
    color: 'white'
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
});
const countries = [
  {
    id: 1,
    flag: "Vietnam",
    image: "https://flagpedia.net/data/flags/w702/vn.webp",
    chose: [
      {
        name: "Vietnam",
        correct: true
      },
      {
        name: "Somalia",
        correct: false
      },
      {
        name: "Morocco",
        correct: false
      },
      {
        name: "Tunisia",
        correct: false
      }
    ]
  },
  {
    id: 2,
    flag: "United States of America",
    image: "https://flagpedia.net/data/flags/w702/us.webp",
    chose: [
      {
        name: "United States of America",
        correct: true
      },
      {
        name: "United Kingdom",
        correct: false
      },
      {
        name: "Australia",
        correct: false
      },
      {
        name: "Canada",
        correct: false
      }
    ]
  },
  {
    id: 3,
    flag: "France",
    image: "https://flagpedia.net/data/flags/w702/fr.webp",
    chose: [
      {
        name: "France",
        correct: true
      },
      {
        name: "Germany",
        correct: false
      },
      {
        name: "Italy",
        correct: false
      },
      {
        name: "Spain",
        correct: false
      }
    ]
  },
  {
    id: 4,
    flag: "Japan",
    image: "https://flagpedia.net/data/flags/w702/jp.webp",
    chose: [
      {
        name: "Japan",
        correct: true
      },
      {
        name: "China",
        correct: false
      },
      {
        name: "South Korea",
        correct: false
      },
      {
        name: "Taiwan",
        correct: false
      }
    ]
  },
  {
    id: 5,
    flag: "Brazil",
    image: "https://flagpedia.net/data/flags/w702/br.webp",
    chose: [
      {
        name: "Brazil",
        correct: true
      },
      {
        name: "Argentina",
        correct: false
      },
      {
        name: "Mexico",
        correct: false
      },
      {
        name: "Colombia",
        correct: false
      }
    ]
  },
  {
    id: 6,
    flag: "Russia",
    image: "https://flagpedia.net/data/flags/w702/ru.webp",
    chose: [
      {
        name: "Russia",
        correct: true
      },
      {
        name: "China",
        correct: false
      },
      {
        name: "Germany",
        correct: false
      },
      {
        name: "Japan",
        correct: false
      }
    ]
  },
  {
    id: 7,
    flag: "China",
    image: "https://flagpedia.net/data/flags/w702/cn.webp",
    chose: [
      {
        name: "China",
        correct: true
      },
      {
        name: "India",
        correct: false
      },
      {
        name: "Japan",
        correct: false
      },
      {
        name: "South Korea",
        correct: false
      }
    ]
  },
  {
    id: 8,
    flag: "Germany",
    image: "https://flagpedia.net/data/flags/w702/de.webp",
    chose: [
      {
        name: "Germany",
        correct: true
      },
      {
        name: "France",
        correct: false
      },
      {
        name: "Spain",
        correct: false
      },
      {
        name: "Italy",
        correct: false
      }
    ]
  },
  {
    id: 9,
    flag: "United Kingdom",
    image: "https://flagpedia.net/data/flags/w702/gb.webp",
    chose: [
      {
        name: "United Kingdom",
        correct: true
      },
      {
        name: "Australia",
        correct: false
      },
      {
        name: "Canada",
        correct: false
      },
      {
        name: "New Zealand",
        correct: false
      }
    ]
  },
  {
    id: 10,
    flag: "India",
    image: "https://flagpedia.net/data/flags/w702/in.webp",
    chose: [
      {
        name: "India",
        correct: true
      },
      {
        name: "Pakistan",
        correct: false
      },
      {
        name: "Bangladesh",
        correct: false
      },
      {
        name: "Sri Lanka",
        correct: false
      }
    ]
  },

  {
    id: 13,
    flag: "South Africa",
    image: "https://flagpedia.net/data/flags/w702/za.webp",
    chose: [
      {
        name: "South Africa",
        correct: true
      },
      {
        name: "Kenya",
        correct: false
      },
      {
        name: "Zimbabwe",
        correct: false
      },
      {
        name: "Namibia",
        correct: false
      }
    ]
  },
  {
    id: 14,
    flag: "Egypt",
    image: "https://flagpedia.net/data/flags/w702/eg.webp",
    chose: [
      {
        name: "Egypt",
        correct: true
      },
      {
        name: "Morocco",
        correct: false
      },
      {
        name: "Sudan",
        correct: false
      },
      {
        name: "Tunisia",
        correct: false
      }
    ]
  },
  {
    id: 15,
    flag: "Turkey",
    image: "https://flagpedia.net/data/flags/w702/tr.webp",
    chose: [
      {
        name: "Turkey",
        correct: true
      },
      {
        name: "Greece",
        correct: false
      },
      {
        name: "Israel",
        correct: false
      },
      {
        name: "Egypt",
        correct: false
      }
    ]
  },
  {
    id: 16,
    flag: "Thailand",
    image: "https://flagpedia.net/data/flags/w702/th.webp",
    chose: [
      {
        name: "Thailand",
        correct: true
      },
      {
        name: "Vietnam",
        correct: false
      },
      {
        name: "Cambodia",
        correct: false
      },
      {
        name: "Laos",
        correct: false
      }
    ]
  },
  {
    id: 17,
    flag: "Indonesia",
    image: "https://flagpedia.net/data/flags/w702/id.webp",
    chose: [
      {
        name: "Indonesia",
        correct: true
      },
      {
        name: "Philippines",
        correct: false
      },
      {
        name: "Thailand",
        correct: false
      },
      {
        name: "Malaysia",
        correct: false
      }
    ]
  },
  {
    id: 17,
    flag: "Indonesia",
    image: "https://flagpedia.net/data/flags/w702/id.webp",
    chose: [
      {
        name: "Indonesia",
        correct: true
      },
      {
        name: "Philippines",
        correct: false
      },
      {
        name: "Thailand",
        correct: false
      },
      {
        name: "Malaysia",
        correct: false
      }
    ]
  },
  {
    id: 18,
    flag: "Germany",
    image: "https://flagpedia.net/data/flags/w702/de.webp",
    chose: [
      {
        name: "Germany",
        correct: true
      },
      {
        name: "Belgium",
        correct: false
      },
      {
        name: "Netherlands",
        correct: false
      },
      {
        name: "Denmark",
        correct: false
      }
    ]
  },
  {
    id: 20,
    flag: "South Korea",
    image: "https://flagpedia.net/data/flags/w702/kr.webp",
    chose: [
      {
        name: "South Korea",
        correct: true
      },
      {
        name: "North Korea",
        correct: false
      },
      {
        name: "Japan",
        correct: false
      },
      {
        name: "Taiwan",
        correct: false
      }
    ]
  },
  {
    id: 21,
    flag: "Mexico",
    image: "https://flagpedia.net/data/flags/w702/mx.webp",
    chose: [
      {
        name: "Mexico",
        correct: true
      },
      {
        name: "Argentina",
        correct: false
      },
      {
        name: "Peru",
        correct: false
      },
      {
        name: "Spain",
        correct: false
      }
    ]
  },
  {
    id: 22,
    flag: "Saudi Arabia",
    image: "https://flagpedia.net/data/flags/w702/sa.webp",
    chose: [
      {
        name: "Saudi Arabia",
        correct: true
      },
      {
        name: "Oman",
        correct: false
      },
      {
        name: "Qatar",
        correct: false
      },
      {
        name: "Kuwait",
        correct: false
      }
    ]
  },
  {
    id: 23,
    flag: "Spain",
    image: "https://flagpedia.net/data/flags/w702/es.webp",
    chose: [
      {
        name: "Spain",
        correct: true
      },
      {
        name: "Italy",
        correct: false
      },
      {
        name: "Portugal",
        correct: false
      },
      {
        name: "Greece",
        correct: false
      }
    ]
  },
  {
    id: 24,
    flag: "Thailand",
    image: "https://flagpedia.net/data/flags/w702/th.webp",
    chose: [
      {
        name: "Thailand",
        correct: true
      },
      {
        name: "Cambodia",
        correct: false
      },
      {
        name: "Myanmar",
        correct: false
      },
      {
        name: "Laos",
        correct: false
      }
    ]
  },
  {
    id: 25,
    flag: "Australia",
    image: "https://flagpedia.net/data/flags/w702/au.webp",
    chose: [
      {
        name: "Australia",
        correct: true
      },
      {
        name: "New Zealand",
        correct: false
      },
      {
        name: "Papua New Guinea",
        correct: false
      },
      {
        name: "Fiji",
        correct: false
      }
    ]
  },
  {
    id: 26,
    flag: "South Korea",
    image: "https://flagpedia.net/data/flags/w702/kr.webp",
    chose: [
      {
        name: "South Korea",
        correct: true
      },
      {
        name: "North Korea",
        correct: false
      },
      {
        name: "Japan",
        correct: false
      },
      {
        name: "Taiwan",
        correct: false
      }
    ]
  },
  {
    id: 27,
    flag: "Egypt",
    image: "https://flagpedia.net/data/flags/w702/eg.webp",
    chose: [
      {
        name: "Egypt",
        correct: true
      },
      {
        name: "Morocco",
        correct: false
      },
      {
        name: "Algeria",
        correct: false
      },
      {
        name: "Tunisia",
        correct: false
      }
    ]
  },
  {
    id: 28,
    flag: "Nigeria",
    image: "https://flagpedia.net/data/flags/w702/ng.webp",
    chose: [
      {
        name: "Nigeria",
        correct: true
      },
      {
        name: "South Africa",
        correct: false
      },
      {
        name: "Ghana",
        correct: false
      },
      {
        name: "Kenya",
        correct: false
      }
    ]
  },
  {
    id: 29,
    flag: "Canada",
    image: "https://flagpedia.net/data/flags/w702/ca.webp",
    chose: [
      {
        name: "Canada",
        correct: true
      },
      {
        name: "United States",
        correct: false
      },
      {
        name: "Mexico",
        correct: false
      },
      {
        name: "Cuba",
        correct: false
      }
    ]
  },
  {
    id: 30,
    flag: "Singapore",
    image: "https://flagpedia.net/data/flags/w702/sg.webp",
    chose: [
      {
        name: "Singapore",
        correct: true
      },
      {
        name: "Malaysia",
        correct: false
      },
      {
        name: "Thailand",
        correct: false
      },
      {
        name: "Indonesia",
        correct: false
      }
    ]
  },
  {
    id: 31,
    flag: "Switzerland",
    image: "https://flagpedia.net/data/flags/w702/ch.webp",
    chose: [
      {
        name: "Switzerland",
        correct: true
      },
      {
        name: "Sweden",
        correct: false
      },
      {
        name: "Austria",
        correct: false
      },
      {
        name: "Denmark",
        correct: false
      }
    ]
  },
  {
    id: 32,
    flag: "New Zealand",
    image: "https://flagpedia.net/data/flags/w702/nz.webp",
    chose: [
      {
        name: "New Zealand",
        correct: true
      },
      {
        name: "Australia",
        correct: false
      },
      {
        name: "Canada",
        correct: false
      },
      {
        name: "United States",
        correct: false
      }
    ]
  },
  {
    id: 33,
    flag: "Norway",
    image: "https://flagpedia.net/data/flags/w702/no.webp",
    chose: [
      {
        name: "Norway",
        correct: true
      },
      {
        name: "Sweden",
        correct: false
      },
      {
        name: "Denmark",
        correct: false
      },
      {
        name: "Finland",
        correct: false
      }
    ]
  },
  {
    id: 34,
    flag: "Poland",
    image: "https://flagpedia.net/data/flags/w702/pl.webp",
    chose: [
      {
        name: "Poland",
        correct: true
      },
      {
        name: "Russia",
        correct: false
      },
      {
        name: "Czech Republic",
        correct: false
      },
      {
        name: "Slovakia",
        correct: false
      }
    ]
  },
  {
    id: 35,
    flag: "Portugal",
    image: "https://flagpedia.net/data/flags/w702/pt.webp",
    chose: [
      {
        name: "Portugal",
        correct: true
      },
      {
        name: "Spain",
        correct: false
      },
      {
        name: "Italy",
        correct: false
      },
      {
        name: "Greece",
        correct: false
      }
    ]
  },
  {
    id: 37,
    flag: "Saudi Arabia",
    image: "https://flagpedia.net/data/flags/w702/sa.webp",
    chose: [
      {
        name: "Saudi Arabia",
        correct: true
      },
      {
        name: "Kuwait",
        correct: false
      },
      {
        name: "Qatar",
        correct: false
      },
      {
        name: "United Arab Emirates",
        correct: false
      }
    ]
  },
  {
    id: 38,
    flag: "Singapore",
    image: "https://flagpedia.net/data/flags/w702/sg.webp",
    chose: [
      {
        name: "Singapore",
        correct: true
      },
      {
        name: "Malaysia",
        correct: false
      },
      {
        name: "Thailand",
        correct: false
      },
      {
        name: "Vietnam",
        correct: false
      }
    ]
  },
];