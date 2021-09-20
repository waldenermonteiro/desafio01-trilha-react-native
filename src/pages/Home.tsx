import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    const verifyEqualsTitle = tasks.filter((item) => item.title === newTask.title).length;

    if (verifyEqualsTitle !== 0) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    } else {
      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks((oldTasks) => {
      return oldTasks.map((item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
        return item;
      });
    });
  }
  function handleEditTask(task: Task, title: string) {
    setTasks((oldTasks) => {
      return oldTasks.map((item) => {
        if (item.id === task.id) {
          item.title = title;
        }
        return item;
      });
    });
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item ? ", [
      {
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => setTasks((oldState) => oldState.filter((item) => item.id !== id)),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
