import NavigationBar from './Views/NavigationBar'
import Index from './Views/Index'
import Teachers from './Views/Teachers'
import GroupPlans from './Views/GroupPlans.jsx'
import Details from './Views/Details'
import Create from './Views/Create'
import Update from './Views/Update'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return(
    <Router>
      <NavigationBar/>
      <div>
        <main role="main" className="pb-2">
          <Switch>
            <Route exact path="/">
              <Index/>
            </Route>
            <Route exact path="/teachers">
              <Teachers/>
            </Route>
            <Route exact path="/groupplan">
              <GroupPlans/>
            </Route>
            <Route exact path="/details">
              <Details/>
            </Route>
            <Route exact path="/create">
              <Create/>
            </Route>
            <Route exact path="/update">
              <Update/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App;





