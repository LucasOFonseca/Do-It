//------------------------------- Libraries -------------------------------
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TaskProvider from './contexts/Task';
//-------------------------------------------------------------------------

//------------------------------ Components -------------------------------
import CreateTaskScreen from './components/CreateTaskScreen';
import EditTaskScreen from './components/EditTaskScreen';
import EditUserScreen from './components/EditUserScreen';
import Menu from './components/Menu';
import About from './pages/About';
import Tasks from './pages/Tasks';
//-------------------------------------------------------------------------

//-------------------------------- Styles ---------------------------------
import styles from './styles/app.module.scss';
import './styles/global.scss';
//-------------------------------------------------------------------------

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className={ styles.wrapper }>
          <EditUserScreen />

          <EditTaskScreen />

          <CreateTaskScreen />

          <Menu />

          <main>
            <Switch>
              <Route exact path="/" component={ Tasks }/>
              <Route path="/about" component={ About } />
            </Switch>
          </main>

        </div>
      </Router>
    </TaskProvider>
  )
}

export default App;
