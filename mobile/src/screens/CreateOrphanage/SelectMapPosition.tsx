import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import mapMarker from "../../assets/map.png";

const LAT = 53.3437435;
const LON = -6.2752506;

export default function SelectMapPosition() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate("OrphanageData", { position });
  }

  function handleSelectedMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: LAT,
          longitude: LON,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectedMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,

    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});
