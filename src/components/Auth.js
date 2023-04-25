import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
    const authCtx = useContext(AuthContext)

   const submitHandler = e => {
       e.preventDefault()
 
       const body = {
        username,
        password
       }

       const url = 'http://localhost:4005'

       axios.post(register ? `http://localhost:4005/register` : `${url}/login`, body)
       .then(({data}) => {
        console.log(`AFTER AUTH`, data)
        authCtx.login(data.token, data.exp, data.userId)
       })
       .catch(err => {
        setPassword('')
        setUsername('')
        console.log(err);
       })
       console.log('submitHandler called')
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input' type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
               <input
                   className='form-input' type="password" placeholder="password" value={password} onChange={e =>setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button onClick={() => register ? setRegister(false) : setRegister(true)} className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth