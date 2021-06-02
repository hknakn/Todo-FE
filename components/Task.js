import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { updateTask } from '../utils/requests'


const Task = (props) => {
    const [completed, setCompleted] = useState(false);
    const { task, updatedTasks, navigation } = props;

    if (task.todo_completed && !completed) {
        setCompleted(true);
    }

    const handleComplete = async () => {
        const updatedTask = {
            todo_description: task.todo_description,
            todo_responsible: task.todo_responsible,
            todo_priority: task.todo_priority,
            todo_completed: true
        };

        const res = await updateTask(updatedTask, task._id);

        if (res) {
            Alert.alert(res);
            updatedTasks(task._id);
        }
        setCompleted(!completed);
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <TouchableOpacity
                    disabled={task.todo_completed ? true : false}
                    style={completed ? styles.completed : styles.button}
                    onPress={handleComplete}
                />
                <Text style={styles.text}>
                    {task.todo_description.length > 20
                        ? task.todo_description.substring(0, 21).concat("...")
                        : task.todo_description}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.editContainer}
                onPress={() => {
                    navigation.navigate('Form', { task })
                }}
            >
                <Ionicons name="apps" size={32} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    editContainer: {
        alignSelf: "flex-end",
        marginLeft: 50
    },
    innerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    button: {
        backgroundColor: "#eeeaea",
        borderRadius: 50,
        height: 25,
        marginRight: 20,
        width: 25
    },
    completed: {
        backgroundColor: "#5ff0bd",
        borderRadius: 50,
        height: 25,
        marginRight: 20,
        width: 25
    },
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        fontWeight: "600"
    }
});

export default Task;
