import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");

  function handleAddTask(newTaskTitle: Task) {
    //TODO - add new task
    if (!newTaskTitle.title) {
      setMessage("O campo de tarefa não pode ficar fazio!");
    }
    setTasks([...tasks, newTaskTitle]);

    console.log(18, tasks);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <View style={styles.message}>
        <Text style={styles.erro}>{message ? message : ""}</Text>
      </View>

      <TasksList
        tasks={tasks}
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
    // alignItems: "center",
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
