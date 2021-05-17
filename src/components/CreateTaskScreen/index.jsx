//-------------------------- Libraries --------------------------
import { useContext, useEffect, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { TaskContext } from '../../contexts/Task';
import { api } from '../../services/api';
//---------------------------------------------------------------

//---------------------------- Styles ---------------------------
import styles from './styles.module.scss';
//---------------------------------------------------------------

export default function CreateTaskScreen() {
    // Import the content of task to use here
    const {
        showCreate,
        toggleCreateTask,
        setShow,
        setShowContent
    } = useContext(TaskContext)

    let formRef = useRef()
    
    // Close the create task screen when click outside the form
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShow(false)
            }
        })
    })

    //---------- Create task process section ----------

    // State to store input values
    const [data, setData] = useState({
        title: "",
        description: ""
    })

    // State to prevent invalid submition
    const [error, setError] = useState(false)
    
    function handle(e) {
        const newData = { ...data }
        
        newData[e.target.id] = e.target.value

         setData(newData) 
    }
    
    function submit(e) {
        e.preventDefault()

        if (data.title === "") {
            setError(true)
        } else {
            if (data.description === "") {
                const noDescription = "Sem descrição"

                api.post(
                    '',
                    {
                        title: data.title,
                        description: noDescription
                    }
                )
            } else {
                api.post(
                    '',
                    {
                        title: data.title,
                        description: data.description
                    }
                )
            }
                
            setShow(false)
            setError(false)
            setShowContent(true)
        }
    }
    //-------------------------------------------------
    
    //--------------- Animation section ---------------
    const transition = useTransition(showCreate, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })

    const formTransition = useTransition(showCreate, {
        from: { y: -100, transform: 'rotateX(60deg)'},
        enter: { y: 0, transform: 'rotateX(0deg)' },
        leave: { y: 100, transform: 'rotateX(-50deg)' }
    })
    //--------------------------------------------------

    return (
        <section>
            {transition((style, item) => item ? 
                <animated.div style={style} className={ styles.createTaskScreen }>

                    {/* Form-div */}
                    {formTransition((style, item) => item ?
                        <animated.div style={style} ref={formRef} className={ styles.formDiv }>
                            <h2>Criar tarefa</h2>

                            {/* Create-task-form */}
                            <form onSubmit={(e) => submit(e)}>
                                <label className={!error ? '' : styles.nameError}>Nome da tarefa</label>
                                <input 
                                    id="title"
                                    value={ data.title }
                                    type="text" 
                                    placeholder={!error ? "Insira o nome" : "A tarefa precisa ter um nome"} 
                                    onChange={(e) => handle(e)}
                                    className={!error ? styles.createName : styles.createNameInvalid}
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

                                <div className={ styles.buttons }>
                                    <button type="button" onClick={toggleCreateTask}>
                                        <p>Cancelar</p>
                                    </button>

                                    <button type="submit">
                                        <p>Salvar</p>
                                    </button>
                                </div>
                            </form>
                            {/* /Create-task-form */}

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