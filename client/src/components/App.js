import React from 'react';
import Blogs from './Blogs';
import NavBar from './Navbar';
import Users from './Users';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Comments from './Comments';
import ContactUs from './ContactUs';
import AboutUs from './AboutUS';
import Home from './Home';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/comments" component={Comments} />
        <Route path='/contacts' component={ContactUs}/>
        <Route path='/about' component={AboutUs} />
      </Switch>
    </Router>
  );
}

export default App;