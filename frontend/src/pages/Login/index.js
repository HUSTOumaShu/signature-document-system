import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginWithEmailAndPassword, loginWithGoogle } from "../../app/auth"
import './index.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        loginWithEmailAndPassword(email, password)
        navigate('/', {state: {email: email}})
    }

    return (
        <div className="login">
            <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                        <div className="card-body p-5 text-center">

                            <h3 className="mb-5">Sign in</h3>

                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control form-control-lg"
                                    onChange={event => setEmail(event.target.value)}
                                    value={email}
                                />
                                <label className="form-label" for="email">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                <input 
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    onChange={event => setPassword(event.target.value)}
                                    value={password}    
                                />
                                <label className="form-label" for="password">Password</label>
                                </div>

                                <div className="form-check d-flex justify-content-start mb-4">
                                <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                <label className="form-check-label" for="form1Example3"> Remember password </label>
                                </div>

                                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                            </form>

                            <hr className="my-4" />

                            <button className="btn btn-lg btn-block btn-primary" style={{backgroundColor: "#dd4b39"}} 
                                onClick={loginWithGoogle}
                            ><i className="fab fa-google me-2"></i> Sign in with google</button>

                            <div>
                                <p className="mb-0">Don't have an account? <a href="/signup" className="text-blue-50 fw-bold">Sign Up</a>
                                </p>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
    </div>
    )
}

export default Login