import React, { useState, useEffect } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Task from "../components/Task";
import { Ionicons } from "@expo/vector-icons";
import { getCompletedTasks } from "../utils/requests";

const CompletedScreen = (props) => {
    const [tasksCollection, setTasks] = useState([]);
    const { navigation } = props;

    useEffect(() => {
        async function fetchTasksData() {
            const res = await getCompletedTasks();

            if (res && !tasksCollection.length) {
                setTasks(res);
            }
        }

        fetchTasksData();

        navigation && navigation.addListener("didFocus", payload => { fetchTasksData(); });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.completedText}>
                Tamamlananlar
            </Text>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                {tasksCollection ? (
                    tasksCollection.map(taskObj => {
                        return <Task navigation={navigation} key={taskObj._id} task={taskObj} />;
                    })
                ) : (
                    <Text style={styles.emptyText}>Burada hiçbir şey yok :(</Text>
                )}
            </ScrollView>
        </View>
    );
}

export default CompletedScreen;

CompletedScreen.navigationOptions = ({ navigation }) => ({
    title: "Tamamlanan Görevler",
    headerTitleStyle: {
        color: "black",
        textAlign: "left",
        fontSize: 18,
        fontWeight: "900"
    },
    headerTintColor: "rgba(255,255,255,0.8)",

    headerRightContainerStyle: {
        paddingRight: 10
    },
    headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("Form")}>
            <Ionicons name="ios-add" size={30} color="black" left={50} />
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    emptyText: {
        marginTop: 10,
        marginLeft: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    developmentModeText: {
        marginBottom: 20,
        color: "rgba(0,0,0,0.4)",
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center"
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)"
    },
    codeHighlightContainer: {
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        lineHeight: 24,
        textAlign: "center"
    },
    tabBarInfoContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: "black",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: "center",
        backgroundColor: "#fbfbfb",
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: "rgba(96,100,109, 1)",
        textAlign: "center"
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: "center"
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: "#2e78b7"
    },
    completedText: {
        color: "#605e5e",
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 10,
        fontWeight: "900",
        fontSize: 25
    }
});
