let tasks = [];
let idCounter = 1;

// status: overdue, done, pending
// id, title, deadline, status

const updateOverdueStatus = (task) => {
  const now = new Date();
  const deadline = new Date(task.deadline);
  if (deadline < now && task.status !== "done") {
    task.status = "overdue";
  }
};

const getAllTasks = () => {
  // Check quá hạn
  tasks.forEach(updateOverdueStatus);
  return tasks;
};

const createTask = (title, deadline) => {
  const task = {
    id: idCounter++,
    title,
    deadline,
    status: "pending",
  };
  tasks.push(task);
  return task;
};

const getTaskbyId = (id) => {
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return null;
  }
  updateOverdueStatus(task);
  return task;
};

const updateTask = (id, data) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  if (data.title) task.title = data.title;
  if (data.deadline) task.deadline = data.deadline;
  if (data.status) task.status = data.status;

  updateOverdueStatus(task);
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  // Nếu không tìm thấy thì index = -1
  if (index === -1) return null;
  // index: vị trí xoá, 1 là xoá đúng 1 phần tử
  return tasks.splice(index, 1);
};

export { getAllTasks, createTask, getTaskbyId, updateTask, deleteTask };
