import './App.css';
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header/Header";
import Auth from "./Components/Auth/Auth";
import {useCookies, withCookies} from "react-cookie";
import User from "./Components/Users/Users";
import Dialogs from "./Components/Dialogs/Dialogs";
import Logout from "./Components/Auth/Logout";
import Users from "./Components/Users/Users";

function App() {
    const [cookies, ,] = useCookies(['auth']);
    return <div className='app-wrapper'>
        <main className="main">
            <div className="app-wrapper__container">
                <Header/>
                {!cookies.auth ? <div className='app-wrapper-auth'>
                        <Routes>
                            <Route exact path='/'
                                   element={<Auth/>}/>
                        </Routes></div> :
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route exact path='/main'
                                   element={<User/>}/>
                            <Route exact path='/users'
                                   element={<Users/>}/>
                            <Route exact path='/logout'
                                   element={<Logout/>}/>
                        </Routes>
                    </div>}
            </div>
        </main>
    </div>
}

export default withCookies(App);
