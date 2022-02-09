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
import editIcon from "../assets/icons/trash/edit.png";

interface TasksListProps {
  item: void;
  index: number;
  tasks: Task[];
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
  editTask: (taskId: string, taskNewTitle: string) => void;
}

export function TaskItem({
  removeTask,
  toggleTaskDone,
  item,
  index,
  tasks,
  editTask,
}: TasksListProps) {
  const textInputRef = useRef<TextInput>(null);
  const [taskEdit, setTaskEdit] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(tasks.title);

  function handleStartEditing() {
    setTaskEdit(true);
  }

  function handleCancelEditing() {
    setTaskEdit(false);
    setNewTaskTitle(tasks.title);
  }

  function handleSubmitEditing(idTask: string) {
    editTask(idTask, newTaskTitle);
    setTaskEdit(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (taskEdit) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [taskEdit]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
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
          {taskEdit ? (
            <TextInput
              ref={textInputRef}
              style={item.done ? styles.taskTextDone : styles.taskText}
              value={newTaskTitle}
              editable={taskEdit}
              onChangeText={setNewTaskTitle}
              onSubmitEditing={() => handleSubmitEditing(item.id)}
            />
          ) : (
            <Text style={item.done ? styles.taskTextDone : styles.taskText}>
              {item.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {taskEdit ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.divider} />

        <TouchableOpacity
          disabled={taskEdit}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: taskEdit ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
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
  divider: {
    borderColor: "rgba(196, 196, 196, 0.24)",
    height: 24,
    width: 0,
    borderWidth: 1,
    margin: 8,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
});
