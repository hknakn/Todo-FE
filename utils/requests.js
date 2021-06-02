const API = "http://localhost:4000";

const getIncompletedTasks = async () => {
    try {
        const response = await fetch(API + "/todos/incomplete");
        const json = await response.json();

        return json;
    } catch (error) {
        return error;
    }
}

const getCompletedTasks = async () => {
    try {
        const response = await fetch(API + "/todos/completed");
        const json = await response.json();

        return json;
    } catch (error) {
        return error;
    }
}

const addTask = async (newTask) => {
    try {
        const response = await fetch(API + "/todos/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const json = await response.json();

        return json;
    } catch (error) {
        return error;
    }
}

const updateTask = async (updatedTask, taskId) => {
    try {
        const response = await fetch(`${API}/todos/update/${taskId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        const json = await response.json();

        return json;
    } catch (error) {
        return error;
    }
}

export {
    getIncompletedTasks,
    addTask,
    updateTask,
    getCompletedTasks,
}