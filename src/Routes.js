import React from 'react';
import  {Switch, Route } from 'react-router-dom';
import Article from './components/pages/article';
import GlobalFeed from './components/pages/globalFeed';
import Auth from './components/pages/auth';
import TagFeed from './components/pages/tagFeed';
import YourFeed from './components/pages/yourFeed';
import CreateArticle from './components/pages/createArticle'
import EditArticle from './components/pages/editArticle'
import Settings from './components/pages/settings';
import UserProfile from './components/pages/userProfile'
export default function Routes() {
  return (
  
      <Switch>
        <Route exact path='/' component={GlobalFeed} />
        <Route  path='/profiles/:slug' component={UserProfile} />
        <Route  path='/profiles/:slug/favorites' component={UserProfile} />
        <Route  path='/articles/new' component={CreateArticle} />
        <Route  path='/settings' component={Settings} />
        <Route  path='/articles/:slug/edit' component={EditArticle} />
        <Route  path='/feed' component={YourFeed} />
        <Route  path='/tags/:slug' component={TagFeed} />
        <Route  path='/login' component={Auth} />
        <Route  path='/register' component={Auth} />
        <Route path='/articles/:slug' component={Article} />
      </Switch>
   
  );
}
