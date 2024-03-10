import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const URL = `http://localhost:3000/tasks`;

export const useTasksStore = defineStore("tasksStore", () => {
  const task = ref({});

  const getTask = async (taskNumber) => {
    const data = await axios.get(URL);
    task.value = data?.data[taskNumber - 1];
  };
  return { task, getTask };
});
