import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import uuid from "react-native-uuid";
import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
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
    const bombeiro = tasks.filter((task) => task.id !== id);
    setTasks(bombeiro);
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
