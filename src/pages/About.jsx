//------------------ Libraries ------------------
import { TaskContext } from '../contexts/Task';
import { useContext } from 'react';
//-----------------------------------------------

//-------------------- Styles -------------------
import styles from '../styles/about.module.scss';
//-----------------------------------------------

export default function About() {
    // Import the content of the task context to use here
    const { toggleSideMenu } = useContext(TaskContext)

    return (
        <section className={ styles.aboutPage }>
            <div className={ styles.container }>

                <button className={ styles.mobileBtn } onClick={toggleSideMenu}>
                    <img src="/mobile-menu-btn.svg" alt="abrir menu lateral" />
                </button>

                <img className={ styles.logo } src="/logo.svg" alt="Um quadrado azul com bordas arredondadas e a representação de uma caixa de checagem marcada na cor branca seguido da escrita Do It também em azul." />

                <h1>Sobre o App</h1>
                <p>
                    Do It é um aplicativo para organizar seus compromissos e afazeres do dia a dia. Sinta-se a vontade para adicionar quantas tarefaz quiser.
                </p>

                <h2>Funcionalidades</h2>
                <ul>
                    <li>
                        <h3>Adicionar tarefas</h3>
                        <img className={ styles.taskExample } src="/create-task-exemple.png" alt="Na imagem, um formulário com o título criar tarefa na parte superior, seguido por um campo de texto denominado nomear tarefa preenchido com lavar louça e outro campo denominado descrição da tarefa preenchido com após o almoço, no canto inferior direito um botão para cancelar e outro para salvar." />
                        <p className={ styles.pMargin }>
                            Adicione tarefas clicando no botão&nbsp;
                            
                            <img className={ styles.button } src="/create-task-button.png" alt="Adicionar tarefa" />
                            
                            <img className={ styles.mobileCreateBtn } src="/create-task-mobile-btn.png" alt="Adicionar tarefa" />
                            
                            &nbsp;localizado no canto inferior direito da tela.
                        </p>
                        <p>
                            Atribua um nome e uma descrição, se quiser detalhar a tarefa, para se lembrar mais tarde do que tem que fazer.
                        </p>
                    </li>
                    <li>
                        <h3>Editar tarefas existentes</h3>
                        <img className={ styles.taskExample } src="/edit-task-exemple.png" alt="Na imagem, um formulário com o título editar tarefa na parte superior, seguido por um campo de texto denominado nomear tarefa preenchido com lavar louça e outro campo denominado descrição da tarefa preenchido com após o jantar. Um campo em cinza claro com a opção em progresso desmarcada e a opção concluído marcada, no canto inferior direito um botão para cancelar e outro para salvar." />
                        <p>
                            O modo de edição permite que você edite o título, descrição e estado da tarefa.
                        </p>
                    </li>
                    <li>
                        <h3>Excluir tarefas</h3>
                        <img className={ styles.optionExample } src="/option-menu.png" alt="Na imagem, uma tarefa com o menu de opções aberto, no menu, um lápis seguido por atualizar tarefa, abaixo uma lixeira seguida por remover tarefa." />
                        <p>
                            Você pode excluir tarefas antigas, indesejadas, canceladas ou que já foram concluídas.
                        </p>
                    </li>
                    <li>
                        <h3>Buscar tarefas</h3>
                        <img className={ styles.searchExample } src="/search-bar.png" alt="Na imagem, a representação da barra de busca do site com uma lupa preta a esquerda, a direita da lupa, procurar tarefas." />
                        <p>
                            A barra de busca permite que você localize com facilidade a tarefa que pretende verificar, atualizar ou excluir.
                        </p>
                    </li>
                    <li>
                        <h3>Status</h3>
                        <img className={ styles.statusExample } src="/task-status.png" alt="Na imagem, a representação do campo de status das tarefas, na esquerda um retangulo branco escrito em progresso, na direita outro retangulo branco com o símbolo de verificação seguido por concluído." />
                        <p>
                            Indica se uma tarefa foi concluída ou está pendente. Atualize sempre que precisar.
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    )
}