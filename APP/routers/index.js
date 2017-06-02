/**
 * Created by boli on 2017/5/22.
 */

import {Route, IndexRoute} from 'react-router';
const App = (nextState, cb) => {//主入口
    require.ensure([], require => {
        cb(null, require('./APP').default)
    }, 'App')
}
const Index = (nextState, cb) => {
    require.ensure([], require => {
        cb(null, require('../pages/index/Index').default)
    }, 'Index')
}
const ProductList = (nextState, cb) => {
    require.ensure([], require => {
        cb(null, require('../pages/productList/Productlist').default)
    }, 'ProductList')
};
const details = (nextState, cb) => {
    require.ensure([], require => {
        cb(null, require('../pages/details/Details').default)
    }, 'details')
}
const search = (nextState, cb) => {
    require.ensure([], require => {
        cb(null, require('../pages/search/Search').default)
    }, 'search')
}
const activity=(nextState,cb)=>{
    require.ensure([],require=>{
        cb(null,require('../pages/activity/activity').default)
    },'activity')
}
const NotFount=(nextState,cb)=>{
    require.ensure([],require=>{
        cb(null,require('../pages/NotFound/NotFound').default)
    },'NotFound')
}
const routes = (
    <Route path="/" getComponent={App}>
        <IndexRoute getComponent={Index}/>
        <Route path="/index/:id" getComponent={Index}/>
        <Route path="/product" getComponent={ProductList}/>
        <Route path="/search/:keywords" getComponent={search}/>
        <Route path="/details/:id" getComponent={details}/>
        <Route path="/activity/:id" getComponent={activity}/>
        <Route path="*" getComponent={NotFount}/>
    </Route>
);
export default routes;

