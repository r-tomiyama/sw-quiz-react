import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { AppBar, Button, makeStyles } from '@material-ui/core'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

function App() {
  const classes = useStyles()

  return (
    <Router>
      <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar className={classes.toolbar}>
            <Button variant="contained">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="contained">
              <Link to="/quiz">Quiz</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
