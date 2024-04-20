import { useState } from "react"
import { loginWithGoogle } from "../../app/auth"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase/firebase"
import { useNavigate } from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            updateProfile(user, {
                displayName: displayName
            })
        })
        .catch((error) => {
            const errorMessage = error.message
            alert(errorMessage)
        })
        navigate('/login')
    }

    return (
        <div className="signup">
            <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                        <div className="card-body p-5 text-center">

                            <h3 className="mb-5">Sign up</h3>

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
                                    type="text" 
                                    id="displayName" 
                                    className="form-control form-control-lg"
                                    onChange={event => setDisplayName(event.target.value)}
                                    value={displayName}
                                />
                                <label className="form-label" for="displayName">Display Name</label>
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

                                <button className="btn btn-primary btn-lg btn-block" type="submit">Sign Up</button>
                            </form>

                            <hr className="my-4" />

                            <button className="btn btn-lg btn-block btn-primary" style={{backgroundColor: "#dd4b39"}} 
                                onClick={() => {
                                    loginWithGoogle()
                                    navigate('/')
                                }}
                            ><i className="fab fa-google me-2"></i> Sign in with google</button>

                            <div>
                                <p className="mb-0">Already have account? <a href="/login" className="text-blue-50 fw-bold">Log In</a>
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

export default Signup;