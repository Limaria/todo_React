import { useState } from 'react'

import CustomForm from './components/CustomForm'
import TaskList from './components/TaskList'
import EditForm from './components/EditForm'
import DeleteForm from './components/DeleteForm'

import useLocalStorage from './hooks/useLocalStorage'


function App() {
    const [tasks, setTasks] = useLocalStorage('my-app.tasks', []);
    const [previousFocusEl, setPreviousFocusEl] = useState(null);
    const [editedTask, setEditedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [taskId, setTaskId] = useState(0);

    const addTask = (task) => {
        setTasks(prevState => [...prevState, task])
    }

    const deleteTask = (id) => {
        setShowDeleteForm(true);
        setTaskId(id);
    }



    const toggleTask = (id) => {
        setTasks(prevState => prevState.map(t => (
            t.id === id
                ? { ...t, checked: !t.checked }
                : t
        )))
    }

  const updateTask = (task) => {
        setTasks(prevState => prevState.map(t => (
            t.id === task.id
                ? { ...t, name: task.name }
                : t
        )))
        closeEditMode();
    }

    const closeEditMode = () => {
        setIsEditing(false);
        previousFocusEl.focus();
    }

    const enterEditMode = (task) => {
        setEditedTask(task);
        setIsEditing(true);
        setPreviousFocusEl(document.activeElement);
    }
    const closeDeleteMode = () => {
        setShowDeleteForm(false);
    }

    const yDeleteTask = () => {
        setTasks(prevState => prevState.filter(t => t.id !== taskId));
        setShowDeleteForm(false);
    }

    return (
        <div className="container">
            <header>
                <h1>My Task List</h1>
            </header>

            {isEditing && (<EditForm
                editedTask={editedTask}
                updateTask={updateTask}
                closeEditMode={closeEditMode}/>)
            }

            <DeleteForm title="DELETE TASK"
                active={showDeleteForm}
                onClose={closeDeleteMode}
                onSubmit = {yDeleteTask}>
                <div>Are you sure you want to delete the task?</div>
            </DeleteForm>


            <CustomForm addTask={addTask}/>
            {tasks && <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
                enterEditMode={enterEditMode}
          />}
        </div>
    );
}

export default App;
