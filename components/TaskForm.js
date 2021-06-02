import React, { useState } from "react";
import {
    Picker,
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Alert,
    StyleSheet
} from "react-native";
import { useSelector } from "react-redux";
import { addTask, updateTask } from '../utils/requests'

const TaskForm = (props) => {
    const { navigation, task } = props;
    const [inputState, setInput] = useState(task ? task.todo_description : "");
    const [pickerState, setPickerValue] = useState(task ? task.todo_priority : "low");
    const user = useSelector((user) => user.user);

    const handleSubmit = async () => {
        if (!inputState || !pickerState) return;

        const newTask = {
            todo_description: inputState,
            todo_responsible: user.email,
            todo_priority: pickerState,
            todo_completed: false
        };

        if (task) {
            const res = await updateTask(newTask, task._id);

            if (res) {
                Alert.alert(res);
                navigation.goBack();
            }

            return;
        }

        const res = await addTask(newTask);

        if (res) {
            Alert.alert(res.todos);
            navigation.goBack();
        }
    }

    return (
        <View>
            <TextInput
                autoFocus
                style={styles.textInput}
                value={inputState}
                onChangeText={text => setInput(text)}
            />
            <Text style={styles.importanceText}>
                Önem Derecesi:
            </Text>
            <Picker
                selectedValue={pickerState}
                onValueChange={(itemValue, itemIndex) => {
                    setPickerValue(itemValue);
                }}
            >
                <Picker.Item label="low" value="low" />
                <Picker.Item label="medium" value="medium" />
                <Picker.Item label="high" value="high" />
            </Picker>
            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButton}
            >
                <Text style={styles.submitText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: "#5ce0e9",
        borderTopColor: "white",
        color: "black",
        fontSize: 50,
        marginTop: 10,
        paddingLeft: 10
    },
    submitButton: {
        borderRadius: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
        backgroundColor: "#25aae1",
        padding: 5,
        height: 60,
        width: 150,
        justifyContent: 'center'
    },
    submitText: {
        alignSelf: "center",
        color: "white",
        fontWeight: "800",
        padding: 5,
        fontSize: 20,
    },
    importanceText: {
        color: "#605e5e",
        marginLeft: 20,
        marginBottom: 20,
        fontWeight: "900",
        fontSize: 18,
        marginTop: 30,
    }
});



export default TaskForm;
