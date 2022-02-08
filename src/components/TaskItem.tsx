import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import { Task } from "./TasksList";

interface TasksListProps {
  item: void;
  index: number;
  tasks: Task[];
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
  removeTask,
  toggleTaskDone,
  item,
  index,
  tasks,
}: TasksListProps) {
  const textInputRef = useRef<TextInput>(null);
  const [taskEdit, setTaskEdit] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(tasks.title);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => {
            toggleTaskDone(item.id);
          }}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <Text style={item.done ? styles.taskTextDone : styles.taskText}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => {
          removeTask(item.id);
        }}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
