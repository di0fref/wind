import {StyleSheet, View, Text} from "react-native";
import MapView, {Marker} from "react-native-maps";
import React, {useEffect, useRef, useState} from "react";
import {api} from "../lib/http-common";
import {defaultText} from "../assets/styles/default";

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "#ddd"
    },
    map: {
        width: '100%',
        height: '75%',
    },
});

export default function MapScreen({house_id}) {

    const [house, setHouse] = useState({});

    const mapRef = useRef(null);

    function getRegion(origin, destination, zoom) {
        const oLat = Math.abs(origin.latitude);
        const oLng = Math.abs(origin.longitude);
        const dLat = Math.abs(destination.latitude);
        const dLng = Math.abs(destination.longitude);

        return {
            latitude: (origin.latitude + destination.latitude) / 2,
            longitude: (origin.longitude + destination.longitude) / 2,
            latitudeDelta: Math.abs(oLat - dLat) + zoom,
            longitudeDelta: Math.abs(oLng - dLng) + zoom,
        };
    }


    useEffect(() => {
        if (house_id) {
            api.get("/api/house/" + house_id).then((res) => {
                setHouse(res.data)
                mapRef.current?.animateToRegion(
                    {
                        latitude: res.data.latitude,
                        longitude: res.data.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }
                );
            })
        }
    }, [house_id]);

    const focus = () => {

    }

    if (house?.id) {
        return (

            <>
                {/*<View><Text className={`${defaultText}`}>Kolla ett hus {house.id}</Text></View>*/}

                <View style={styles.container}>
                    <MapView style={styles.map}
                             ref={mapRef}
                             initialRegion={{
                                 latitude: house.latitude,
                                 longitude: house.longitude,
                                 latitudeDelta: 0.0922,
                                 longitudeDelta: 0.0421,
                             }}>
                        <Marker
                            key={1}
                            coordinate={house.latlng}
                            title={house.address_street}
                            description={"Fjäll"}
                        />
                    </MapView>
                </View>
                {/*<View style={styles.container}>*/}
                {/*    <MapView style={styles.map} initialRegion={*/}
                {/*        getRegion({*/}
                {/*            latitude: house.latitude,*/}
                {/*            longitude: house.longitude,*/}
                {/*        }, {*/}
                {/*            latitude: house.latitude,*/}
                {/*            longitude: house.longitude,*/}
                {/*        }, 0.012)*/}
                {/*    }>*/}

                {/*        <Marker*/}
                {/*            key={1}*/}
                {/*            coordinate={house.latlng}*/}
                {/*            title={house.address_street}*/}
                {/*            description={"Fjäll"}*/}
                {/*        />*/}
                {/*    </MapView>*/}
                {/*</View>*/}
            </>
        )
    }
    // else return (<View><Text className={`${defaultText}`}>Missing map</Text></View>)
}
