import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Task, TasksListProps } from "./TasksList";
import closeIcon from "../assets/icons/close/close.png";
import pincelIcon from "../assets/icons/pincel/pincel.png";
import trashIcon from "../assets/icons/trash/trash.png";

interface TaskItem extends TasksListProps {
  index: number;
  task: Task;
}
export default function TaskItem({ index, task, toggleTaskDone, editTask, removeTask }: TaskItem) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTaskTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task, newTaskTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          disabled={isEditing}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            editable={isEditing}
            onChangeText={setNewTaskTitle}
            onSubmitEditing={handleSubmitEditing}
            value={newTaskTitle}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingRight: 24,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <View style={styles.taskIcons}>
          {isEditing ? (
            <TouchableOpacity onPress={handleCancelEditing}>
              <Image source={closeIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleStartEditing}>
              <Image source={pincelIcon} />
            </TouchableOpacity>
          )}
          <View style={styles.taskIconsDivider} />
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ opacity: isEditing ? 0.3 : 1 }}
            onPress={() => removeTask(task.id)}
            disabled={isEditing}
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        </View>
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
  taskIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskIconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196,196,196, 0.24)",
    marginHorizontal: 12,
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
