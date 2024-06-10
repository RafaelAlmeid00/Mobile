import ButtonComp from "@/components/Button";
import InputComp from "@/components/Input";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedScroll } from "@/components/ThemedScroll";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ICard } from "@/interfaces/ICard";
import { AntDesign, Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";

export default function HomeSystemScreen() {
  const [card, setCard] = useState<ICard>();
  const backgroundColor = useThemeColor({ light: "black", dark: "white" }, 'background');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  const banners = [
    {
      key: "img1",
      image: require("@/assets/images/onibus.jpg")
    },
    {
      key: "img2",
      image: require("@/assets/images/meu-onibus-noticia.jpg")
    },
    {
      key: "img3",
      image: require("@/assets/images/Viaje__-_VR_Card.jpeg")
    }
  ];
  const [shortcuts, setShortcuts] = useState([
    {
      key: 'QRCode',
      icon: <AntDesign name="qrcode" size={25} color={backgroundColor} />,
      text: 'Pagar com QRCode'
    },
    {
      key: 'Partner',
      icon: <FontAwesome name="handshake-o" size={25} color={backgroundColor} />,
      text: 'Nossos Parceiros'
    },
    {
      key: 'WhereToUse',
      icon: <FontAwesome5 name="store-alt" size={25} color={backgroundColor} />,
      text: 'Onde usar'
    }
  ]);

  

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex = currentIndex + 1;
      if (newIndex >= banners.length) {
        newIndex = 0;
      }
      setCurrentIndex(newIndex);
      scrollViewRef.current.scrollTo({ x: Dimensions.get('window').width * newIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / Dimensions.get('window').width);
    setCurrentIndex(index);
  };

  const renderIndicators = () => {
    return banners.map((banner, index) => (
      <TouchableOpacity
        key={banner.key}
        style={[styles.indicator, index === currentIndex ? styles.activeIndicator : null]}
        onPress={() => {
          scrollViewRef.current.scrollTo({ x: Dimensions.get('window').width * index, animated: true });
          setCurrentIndex(index);
        }}
      />
    ));
  };

  console.log("AAAAAAAAAAAAAAAAAAAA", backgroundColor);


  return (
    <>
      <ThemedScroll>
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
          headerImage={
            <>
              <View style={{
                display: 'flex', flexDirection: 'row', width: '100%', paddingLeft: 20,
                paddingTop: 50,
              }}>
                <View style={styles.container1}>
                  <Image
                    source={require("@/assets/images/logopass.png")}
                    style={styles.passLogo}
                  />
                  <ThemedText lightColor="white" type="title" style={styles.textLogo}>
                    EasyPass
                  </ThemedText>
                </View>
                <View style={styles.container2}>
                  <Feather
                    name="user"
                    size={30}
                    color={'black'}
                    style={{
                      backgroundColor: 'white',
                      width: '30%',
                      textAlign: 'center',
                      borderRadius: 200,
                      padding: 13,
                      marginLeft: 100,
                      marginTop: -30
                    }}
                    onPress={() => { }}
                  />
                </View>
              </View>
            </>
          }
        />
        <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <View
            style={{
              alignSelf: "center",
              width: "80%",
            }}
          >
            {card ? (<ThemedView
              darkColor="#ffffff55"
              lightColor="#00000022"
              style={{
                alignSelf: "center",
                width: "100%",
                height: 100,
                borderWidth: 1,
                borderColor: "#00000055",
                borderStyle: "solid",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  width: "80%",
                  height: "100%",
                  gap: 10
                }}
              >
                <ThemedText >Saldo:</ThemedText>
                <ThemedText type="subtitle">
                  R$ {card?.CardSaldo}
                </ThemedText>
              </View>
            </ThemedView>)
              : (
                <ButtonComp
                  text={"Adicione um Cartão"}
                  mode={"contained"}
                  style={[{
                    alignSelf: 'center',
                    backgroundColor: Colors.dark.icon,
                    width: '60%',
                    wrap: 'wrap'
                  }]} />
              )
            }
          </View>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 150 }}>
            <ThemedText lightColor="black" darkColor="white" style={{ width: '80%', fontWeight: 'bold' }}>
              Acesso Rápido:
            </ThemedText>
          </View>

          <View
            style={{
              alignSelf: "center",
              width: "100%",
              height: "auto",
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 10,
              paddingTop: 10,
            }}
          >
            {shortcuts.map((shortcut) => (
              <ThemedView
                key={shortcut.key}
                darkColor="#ffffff55"
                lightColor="#00000022"
                style={{
                  alignSelf: "center",
                  width: "25%",
                  height: 100,
                  borderWidth: 1,
                  borderColor: "#00000055",
                  borderStyle: "solid",
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {shortcut.icon}
                <ThemedText type="default" lightColor="black" darkColor="white" style={{ fontWeight: 'bold', fontSize: 10, flexWrap: 'wrap', textAlign: 'center', width: '60%', lineHeight: 15, marginTop: 10 }}>{shortcut.text}</ThemedText>
              </ThemedView>
            ))}
            <View
              style={{
                alignSelf: "center",
                width: "100%",
                height: "auto",
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingTop: 100,
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'column'}}>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  style={{ marginBottom: -40}}
                >
                  {banners.map((banner, index) => (
                    <View key={banner.key} style={styles.bannerContainer}>
                      <Image
                        source={banner.image}
                        style={styles.bannerImage}
                      />
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.indicatorsContainer}>{renderIndicators()}</View>
              </View>
            </View>
          </View>
        </View>
      </ThemedScroll>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 60,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logoContainer: {
    display: "flex",
    alignSelf: "flex-start",
  },
  container1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    borderRadius: 200, padding: 20,
    marginTop: 5
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    opacity: 0.4,
  },
  passLogo: {
    height: 40,
    width: 40,
  },
  textLogo: {
    marginLeft: 10,
    marginTop: 4,
    fontSize: 25,
    fontWeight: "bold",
  },
  footer: {
    height: 70,
    width: "100%",
  },
  shadowLine: {
    height: 2,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    opacity: 0.15,
  },
  progressBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    width: "90%",
    height: "100%",
  },
  progress: {
    marginTop: -20,
    width: "70%",
    alignSelf: "center",
    height: 5,
    borderRadius: 20,
  },
  bannerContainer: {
    width: Dimensions.get('window').width,
    height: 150,
    borderRadius: 20,
    marginBottom: 50,
  },
  bannerImage: {
    alignSelf: 'center',
    borderRadius: 20,
    width: '80%',
    height: '100%',
    resizeMode: 'cover',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
    marginBottom: 50
  },
  activeIndicator: {
    backgroundColor: '#FFF',
  },
});
