import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";
import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find((item) => item.title === newTaskTitle);
    if (findTask) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }
    const newTask: Task = {
      id: uuid.v4().toString(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((tasks) => [...tasks, newTask]);
  }

  function handleToggleTaskDone(id: string) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map((tasks) => ({ ...tasks }));
    const denis = updatedTasks.find((item) => item.id === id);
    if (denis) {
      denis.done = !denis.done;
    }

    setTasks(updatedTasks);
    console.log(updatedTasks);
  }

  function handleRemoveTask(id: string) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            const bombeiro = tasks.filter((task) => task.id !== id);
            setTasks(bombeiro);
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: string, taskNewTitle: string) {
    console.log("================= Edit ===================");
    console.log(taskId);
    console.log(taskNewTitle);

    const updatedTasks = tasks.map((tasks) => ({ ...tasks }));
    const upTask = updatedTasks.find((item) => item.id === taskId);
    if (upTask) {
      upTask.title = taskNewTitle;
    }

    setTasks(updatedTasks);
    console.log(updatedTasks);
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 4000);
  }, [message]);

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        editTask={handleEditTask}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    justifyContent: "center",
  },
  message: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  erro: {
    color: "red",
  },
});
