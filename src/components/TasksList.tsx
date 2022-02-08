import React, { useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
} from "react-native";
// import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";

import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: string) => void;
  removeTask: (id: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
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
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
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
