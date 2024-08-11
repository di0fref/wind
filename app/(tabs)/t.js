import {useInfiniteQuery} from "@tanstack/react-query";
import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {FlashList} from "@shopify/flash-list";


function useFetchDogs() {
    const getDogs = async ({pageParam = 0}) => {

        const res = await (
            await fetch(
                `https://api.thedogapi.com/v1/breeds?limit=10&page=${pageParam}`
            )
        ).json();

        return {
            data: res,
            nextPage: pageParam + 1,
        };
    };

    return useInfiniteQuery(
        {
            queryKey: ["dogs"],
            queryFn: getDogs,
            getNextPageParam: (lastPage, pages) => {

                console.log(JSON.stringify(lastPage, null, 2))

                return lastPage.nextPage
            },
        });
}




const DogCard = ({dog}) => {
    return (
        <View>
            <View style={styles.row}>
                <Image source={{uri: dog?.image?.url}} style={styles.pic}/>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{dog.name}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#DCDCDC",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: "600",
        color: "#222",
        fontSize: 18,
    },
});

const T = () => {
    const {data, isLoading, isError, hasNextPage, fetchNextPage} =
        useFetchDogs();


    if (isLoading) return <Text>Loading...</Text>;

    if (isError) return <Text>An error occurred while fetching data</Text>;

    const flattenData = data.pages.flatMap((page) => page.data);

    const loadNext = () => {
        console.log("page: ",JSON.stringify(hasNextPage, null, 2))
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
            <FlashList
                keyExtractor={(item) => item.id}
                data={flattenData}
                renderItem={({item}) => <DogCard dog={item}/>}
                onEndReached={loadNext}
                onEndReachedThreshold={0.3}
                estimatedItemSize={100}
            />
        </SafeAreaView>
    );
};
export default T
