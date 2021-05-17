//-------------------------- Libraries --------------------------
import { useContext, useEffect, useRef, useState } from 'react';
import { useTransition, animated, update } from 'react-spring';
import { TaskContext } from '../../contexts/Task';
import { api } from '../../services/api';
//---------------------------------------------------------------

//---------------------------- Styles ---------------------------
import styles from './styles.module.scss';
//---------------------------------------------------------------

export default function EditUserScreen() {
    // Import the content of task to use here
    const {
        showEditUser,
        toggleEditUser,
        setShowEditUser
    } = useContext(TaskContext)

    let formRef = useRef()
    
    // Close the create task screen when click outside the form
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowEditUser(false)
            }
        })
    })

    //---------- Create task process section ----------

    // State to store input values
    const [updateUser, setUpdate] = useState({
        name: "",
        function: ""
    })

    // State to prevent invalid submition
    const [error, setError] = useState(false)
    
    function handle(e) {
        const update = { ...updateUser }
        
        update[e.target.id] = e.target.value

        setUpdate(update) 
    }
    
    function submit(e) {
        e.preventDefault()

           
        setShowEditUser(false)
    }
    //-------------------------------------------------
    
    //--------------- Animation section ---------------
    const transition = useTransition(showEditUser, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })

    const formTransition = useTransition(showEditUser, {
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
                                <label>Seu nome</label>
                                <input 
                                    id="name"
                                    value={ updateUser.name }
                                    type="text" 
                                    placeholder="Insira seu nome"
                                    onChange={(e) => handle(e)}
                                    className={ styles.editUserInput }
                                />
                                
                                <label>Sua função</label>
                                <input
                                    id="function"
                                    value={ updateUser.function }
                                    type="text" 
                                    placeholder="Qual sua função?" 
                                    onChange={(e) => handle(e)} 
                                    className={ styles.editUserInput }
                                />

                                <div className={ styles.buttons }>
                                    <button type="button" onClick={toggleEditUser}>
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