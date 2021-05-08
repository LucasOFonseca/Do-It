import Menu from './components/Menu'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/About';
import Tasks from './pages/Tasks';

import './styles/global.scss';
import styles from './styles/app.module.scss';

function App() {
  return (
    <Router>
      <div className={ styles.wrapper }>
        <Menu />

        <main>
          <Switch>
            <Route exact path="/" component={ Tasks }/>
            <Route path="/about" component={ About } />
          </Switch>
        </main>
        
      </div>
    </Router>
  );
}

export default App;
