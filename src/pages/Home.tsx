import React, { useEffect, useState } from "react";
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
      setMessage("O campo de tarefa não pode ficar vazio!");
      return;
    }
    setTasks([...tasks, newTaskTitle]);
  }

  function handleToggleTaskDone(id: string) {
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: string) {
    //TODO - remove task from state
    tasks.filter((idTask) => idTask === id);
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
