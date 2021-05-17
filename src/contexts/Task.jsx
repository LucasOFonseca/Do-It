import { createContext, useEffect, useState } from 'react';

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

    // State to hide/show the task list
    const [showContent, setShowContent] = useState()

    const [showEditUser, setShowEditUser] = useState(true)

    // Function to hide/show the edit user info screen
    function toggleEditUser() {
        setShowEditUser(!showEditUser)
    }
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

    const [user, setUser] = useState({
        name: "",
        function: ""
    })

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return (
        <TaskContext.Provider value={{ 
            data,
            showEdit,
            showCreate,
            showSideMenu,
            showContent,
            showEditUser,
            setData,
            setShow,
            setShowEdit,
            setShowContent,
            setShowEditUser,
            setShowSide,
            setCompleted,
            setUncompleted, 
            toggleCreateTask, 
            toggleEditTask,
            editTaskInfo,
            toggleSideMenu,
            toggleEditUser
        }}>
            {children}
        </TaskContext.Provider>
    )
}