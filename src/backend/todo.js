const fs = require("fs");
const filePath = "./tasks.json";

const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log(`Task "${task}" added!`);
};

const listTasks = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks found!");
    return;
  }
  console.log("Your tasks:");
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task}`);
  });
};

const removeTask = (index) => {
  const tasks = loadTasks();
  if (index < 1 || index > tasks.length) {
    console.log("Invalid task number!");
    return;
  }
  const removedTask = tasks.splice(index - 1, 1);
  saveTasks(tasks);
  console.log(`Task "${removedTask[0].task}" removed!`);
};

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else if (command === "update") {
  const [index, newTask] = argument.split(",");
  const tasks = loadTasks();
  if (index < 1 || index > tasks.length) {
    console.log("Invalid task number!");
  }
  tasks[index - 1].task = newTask.trim();
  saveTasks(tasks);
  console.log(`Task ${index} updated to "${newTask.trim()}"!`);
} else {
  console.log("Command not found !");
}
