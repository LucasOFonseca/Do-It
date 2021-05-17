//--------------------- Libraries ---------------------
import { useTransition, animated } from 'react-spring';
import { useContext, useEffect, useRef } from 'react';
import { TaskContext } from '../../contexts/Task';
import { api } from '../../services/api';
//------------------------------------------------------

//----------------------- Styles -----------------------
import styles from './styles.module.scss';
//------------------------------------------------------

export default function EditTaskScreen() {
    // Import the content of the task context to use here
    const {
        data,
        showEdit,
        setData,
        setShowEdit,
        setCompleted,
        setUncompleted,
        toggleEditTask
    } = useContext(TaskContext)

    let formRef = useRef()
    
    // Close the edit task screen when click outside the form
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowEdit(false)
            }
        })
    })

    //------------ Edit task process section ------------
    function handle(e) {
        const updateTask = { ...data }
        
        updateTask[e.target.id] = e.target.value
        
        setData(updateTask)
    }
    
    function submit(e) {
        e.preventDefault()
        
        api.put(
            '',
            {
                guid: data.guid,
                title: data.title,
                description: data.description,
                situation: data.situation
            }
        )
            
        setShowEdit(false)
    }
    //---------------------------------------------------
    
    //---------------- Animation section ----------------
    const transition = useTransition(showEdit, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })

    const formTransition = useTransition(showEdit, {
        from: { y: -100, transform: 'rotateX(60deg)'},
        enter: { y: 0, transform: 'rotateX(0deg)' },
        leave: { y: 100, transform: 'rotateX(-50deg)' }
    })
    //---------------------------------------------------
        
    return (
        <section>
            {transition((style, item) => item ? 
                <animated.div style={style} className={ styles.editTaskScreen }>

                    {/* Form-div */}
                    {formTransition((style, item) => item ?
                    <animated.div style={style} ref={formRef} className={ styles.formDiv }>
                        <h2>Editar tarefa</h2>

                        {/* Edit-task-form */}
                        <form onSubmit={(e) => submit(e)}>
                            <label>Nome da tarefa</label>
                            <input 
                                id="title"
                                value={ data.title }
                                type="text" 
                                placeholder="Insira o nome"
                                onChange={(e) => handle(e)} 
                                className={ styles.createName }
                            />
                            

                            <label>Descrição da tarefa</label>
                            <input
                                id="description"
                                value={ data.description }
                                type="text" 
                                placeholder="Insira a descrição"
                                onChange={(e) => handle(e)}  
                                className={ styles.createDescription }
                            />

                            <div className={ styles.situation }>
                                <button type="button" className={ data.situation === "uncompleted" ? styles.selected : styles.unselected } onClick={setUncompleted}>
                                    <p>Em progresso</p>
                                </button>

                                <button type="button" className={ data.situation === "completed" ? styles.selected : styles.unselected } onClick={setCompleted}>
                                    <p>Concluído</p>
                                </button>
                            </div>

                            <div className={ styles.buttons }>
                                <button type="button" onClick={toggleEditTask}>
                                    <p>Cancelar</p>
                                </button>

                                <button  onClick={console.log(data)}>
                                    <p>Salvar</p>
                                </button>
                            </div>
                        </form>
                        {/* /Edit-task-form */}

                    </animated.div>
                    : null
                    )}
                    {/* /Form-div */}

                </animated.div>

            : null
            )}
        </section>
    )
}