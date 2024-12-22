import './App.css'
import Acc from './components/Acc'
import Login from './components/Login'
import Register from './components/Register'
import Deposit from '../src/components/Deposit'
import Transactions from '../src/components/Transactions'
import {Route,Routes} from 'react-router-dom'
import UserList from './Page/UserList'
import Dat from './Page/Dat'
import NewTran from './components/NewTran'
// import CreateUser from './Page/CreateUser'


function App() {

  return (
  <>


<div>
      {/* <h1>CRUD Operations for Users</h1> */}
      {/* <CreateUser /> */}
      {/* <UserList /> */}
    </div>
  <Routes>

    <Route  path='/login' element={<Login/>}/>
    <Route  path='/user-list' element={<UserList/>}/>
    <Route  path='/' element={<Register/>}/>
    <Route  path='/accounts' element={<Acc/>}/>
    <Route  path='/dat' element={<Dat/>}/>
    <Route  path='/deposit' element={<Deposit/>}/>
    <Route  path='/transactions' element={<Transactions/>}/>
    <Route  path='/dat' element={<Dat/>}/>
    <Route  path='/user-list' element={<UserList/>}/>
    <Route  path='/new-tran' element={<NewTran />}/>

  </Routes>


  {/* <Acc/>
  <Login/>
  <br />
  <br />
  <Register/>
  </> */}
  </>
  )
}

export default App
