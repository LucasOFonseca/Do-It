//---------------------- Libraries ----------------------
import { useTransition, animated } from 'react-spring';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
//-------------------------------------------------------

//------------------------ Styles -----------------------
import styles from './styles.module.scss';
//-------------------------------------------------------

export default function Task({
    guid,
    title,
    description,
    situation,
    editTaskInfo
}) {
    const [open, setOpen] = useState(false)

    let menuRef = useRef()
    
    // Close the action menu when click outside
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false)
            }
        })
    })

    // Function to hide/show the task menu
    function toggleOpen() {
        setOpen(!open)
    }
    
    // Delete a task using its id 
    function deleteTask(id) {
        setCreate(false)
        
        api.delete(`/${id}`)
    }
    
    //----------------------- Animation section -----------------------
    const [create, setCreate] = useState(true)
    
    const transition = useTransition(create, {
        from: { y: -50, opacity: 0,transform: 'rotateX(70deg)' },
        enter: { y: 0, opacity: 1, transform: 'rotateX(0deg)' },
        leave: { y: 50, opacity: 0, transform: 'rotateX(-70deg)' }
    })

    const menuTransition = useTransition(open, {
        from: { x: 40, y: -20, opacity: 0, transform: 'scale(0.4)' },
        enter: { x: 0, y: 0, opacity: 1, transform: 'scale(1)' },
        leave: { x: 40, y: -20, opacity: 0, transform: 'scale(0.4)' }
    })
    //-----------------------------------------------------------------

    return (
        <section>
            {transition((style, item) => item ?
                <animated.div style={style} className={ styles.task }>
                    <div className={ styles.taskInfo }>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>

                    {/* Actions-menu */}
                    <div ref={menuRef} className={ styles.menuDiv}>
                    {menuTransition((style, item) => item ?
                        <animated.div style={style} className={ styles.taskMenu }>
                            <button onClick={() => editTaskInfo(guid, title, description, situation)}>
                                <img src="/edit.svg" alt="lápis"/>
                                <p>Atualizar tarefa</p>
                            </button>

                            <button onClick={() => deleteTask(guid)}>
                                <img src="/delete.svg" alt="lixeira" /> 
                                <p>Remover tarefa</p>
                            </button>
                        </animated.div>
                    : null )}
                    {/* /Actions-menu */}

                    <button type="button" className={ styles.menuButton } onClick={toggleOpen}>
                        <img src="/menu.svg" alt="abrir menu de opções"/>
                    </button> 
                    </div>

                    <div className={ styles.progress }>
                        {situation === 'uncompleted' ? 
                            <p>Em progresso</p>
                        :
                            <span>
                                <img src="confirm.svg" alt="concluído" />
                                <p>Concluído</p>
                            </span>
                        }    
                    </div>
                </animated.div>
                : null
            )}
        </section>
    )
}