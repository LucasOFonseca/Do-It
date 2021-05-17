import { createContext, useState } from 'react';

export const TaskContext = createContext();

export default function TaskContextProvider({ children }) {
    //------------------ Hide and show controls ------------------
    const [showCreate, setShow] = useState(false)
    
    // Function to hide/show the create task screen
    function toggleCreateTask() {
        setShow(!showCreate)
    }
    
    const [showEdit, setShowEdit] = useState(false)
    
    // Function to hide/show the edit task screen
    function toggleEditTask() {
        setShowEdit(!showEdit)
    }
    
    const [showSideMenu, setShowSide] = useState(false)
    
    // Function to hide/show the side menu
    function toggleSideMenu() {
        setShowSide(!showSideMenu)
    }

    const [showContent, setShowContent] = useState()
    //------------------------------------------------------------
    
    //-------------------- Edit task controls --------------------
    const [data, setData] = useState({
        guid: "",
        title: "",
        description: "",
        situation: "",
    })
    
    function editTaskInfo(guid, title, description, situation) {
        const taskInfo = {
            guid: guid,
            title: title,
            description: description,
            situation: situation
        }
        
        setData(taskInfo)     
        setShowEdit(!showEdit)
    }
    
    function setUncompleted() {
        const setToUncompleted = {
            ...data,
            situation: "uncompleted"
        }
        
        setData(setToUncompleted)
    }
    
    function setCompleted() {
        const setToCompleted = {
            ...data,
            situation: "completed"
        }
        
        setData(setToCompleted)
    }
    //------------------------------------------------------------

    return (
        <TaskContext.Provider value={{ 
            data,
            showEdit,
            showCreate,
            showSideMenu,
            showContent,
            setData,
            setShow,
            setShowEdit,
            setShowContent,
            setShowSide,
            setCompleted,
            setUncompleted, 
            toggleCreateTask, 
            toggleEditTask,
            editTaskInfo,
            toggleSideMenu
        }}>
            {children}
        </TaskContext.Provider>
    )
}