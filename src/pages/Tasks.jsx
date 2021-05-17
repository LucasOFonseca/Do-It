//---------------------- Libraries ----------------------
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../contexts/Task';
import { api } from '../services/api';
//-------------------------------------------------------

//--------------------- Components ----------------------
import Task from '../components/Task';
//-------------------------------------------------------

//----------------------- Styles ------------------------
import styles from '../styles/tasks.module.scss';
//-------------------------------------------------------

export default function Tasks() {
    // Import the content of the task context to use here
    const { 
        toggleCreateTask,
        toggleSideMenu,
        editTaskInfo,
        showContent,
        setShowContent
    } = useContext(TaskContext)

    //------------ Get tasks information section -----------

    // State to store tasks info
    const [tasks, setTasks] = useState([])
    const [statusMessage, setMessage] = useState('')
    
    // Make request to the api for get tasks info
    useEffect(() => {
        api.get('').then(res => {
            if (res.status === 200) {
                setTasks(res.data)

                setShowContent(true)
            } else if (res.status === 204) {
                setMessage("Suas tarefas aparecerão aqui")

                setShowContent(false)
            }
        })
    })
    //------------------------------------------------------
    
    // State to store search term
    const [toFind, setToFind] = useState('')

    return (
        <section className={ styles.tasksPage }>
            
            <button type="button" className={ styles.createTask} onClick={toggleCreateTask}>
                <img src="/plus.svg" alt="adicionar tarefa" />
                <p>Nova tarefa</p>
            </button>

            {/* Tasks-section */}
            <div className={ styles.container }>

                <button className={ styles.mobileBtn } onClick={toggleSideMenu}>
                    <img src="/mobile-menu-btn.svg" alt="abrir menu lateral" />
                </button>

                {/* Search-bar */}
                <div className={ styles.searchBar }>
                    <img src="/lupa.svg" alt="buscar" title="Buscar"/>

                    <input
                        type="text"
                        placeholder="Procurar tarefas"
                        onChange={event => {setToFind(event.target.value)}}
                    />
                </div>
                {/* /Search-bar */}

                {/* Task-list */}
                <h1>Tarefas</h1>

                    {showContent ?
                <ul className={ styles.tasks }>
                    {tasks.filter((task) => {
                        if (toFind === "") {
                            return task
                        } else if (task.title.toLowerCase().includes(toFind.toLowerCase())) {
                            return task
                        }
                    }).map((task) => {
                        return (
                            <li key={task.guid}>
                                <Task 
                                    guid={task.guid} 
                                    title={task.title}
                                    description={task.description}
                                    situation={task.situation}
                                    editTaskInfo={editTaskInfo}
                                />
                            </li>
                        )
                    })}
                </ul>
                : <span className={ styles.statusMessage }>{statusMessage}</span> }
                {/* /Task-list */}

            </div>
            {/* /Tasks-section */}

                
        </section>        
    )
}