//-------------------------- Libraries --------------------------
import { useContext, useEffect, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { TaskContext } from '../../contexts/Task';
import { Link } from 'react-router-dom';
//---------------------------------------------------------------

//--------------------------- Styles ----------------------------
import styles from './styles.module.scss';
//---------------------------------------------------------------

// Custom React Hook to get and use the current window width value
function useWindowWidth() {
    const [windowWidth, setWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        
        window.addEventListener('resize', handleResize)
    })
    
    return windowWidth
}
//----------------------------------------------------------------

export default function Menu() {
    // Import the content of task to use here
    const { showSideMenu, setShowSide } = useContext(TaskContext)

    // Const to store the window width
    const width = useWindowWidth()

    // Variable to control the animations
    let open = true

    // Verification to hide or show the side menu on mobile devices
    if (showSideMenu && width <= 510) {
        open = true
    } else if (width > 510) {
        open = true
    } else {
        open = false
    }

    let menuRef = useRef()
    
    // Close the side menu when click outside
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowSide(false)
            }
        })
    })

    //--------------- Animation section ---------------
    const transition = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })
    
    const menuTransition = useTransition(open,{
        from: { x: -170 },
        enter: { x: 0 },
        leave: { x: -170 }
    })
    //--------------------------------------------------

    return (
        <>
        {transition((style, item) => item ?
        <animated.section style={style} className={ styles.background }>
            
            {menuTransition((style, item) => item ?
                <animated.section style={style} ref={menuRef} className={ styles.menuContainer }>
                    <div className={ styles.userInfo }>
                        <img src="/user.svg" alt="usuário" />
                        <ul>
                            <li><p className={ styles.userName }>Nome</p></li>
                            <li><p className={ styles.function }>Função</p></li>
                        </ul>
                    </div>

                    <div className={ styles.buttons }>
                        <Link to="/">
                            <button>
                                <img src="/list.svg" alt="lista" />
                                <p>Tarefas</p>
                            </button>
                        </Link>

                        <Link to={`/about`}>
                            <button>
                                <img src="/info.svg" alt="sobre" />
                                <p>Sobre</p>
                            </button>
                        </Link>
                    </div>
                </animated.section>
            : null )}

        </animated.section>
        : null )}
        </>
    )
}