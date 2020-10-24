import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import api from "../services/api";

import mapMarker from "../assets/map.png";

const LAT = 53.3437435;
const LON = -6.2752506;

interface OrphanageProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useFocusEffect(() => {
    api.get("/").then((response) => setOrphanages(response.data));
  });
  const navigation = useNavigation();

  function sendToDetails(id: string) {
    navigation.navigate("OrphanageDetails", { id });
  }

  function sendToCreate() {
    navigation.navigate("SelectMapPosition");
  }

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: LAT,
          longitude: LON,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        style={styles.map}
      >
        {orphanages.map(({ id, name, latitude, longitude }) => (
          <Marker
            key={id}
            icon={mapMarker}
            calloutAnchor={{ x: 2.8, y: 0.85 }}
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <Callout tooltip onPress={() => sendToDetails(id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Found</Text>

        <RectButton onPress={sendToCreate} style={styles.createButton}>
          <Ionicons name="md-add" size={32} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },
  calloutText: {
    color: "#0089A5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 46,
    paddingLeft: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  footerText: {
    color: "#8fa7b3",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
  createButton: {
    height: 56,
    width: 56,
    backgroundColor: "#15c3D6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
