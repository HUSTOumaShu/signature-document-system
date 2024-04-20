import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = () => {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const sendResetEmail = (auth, email) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setEmailSent(true)
            setTimeout(() => {
                setEmailSent(false)
            }, 3000)
            alert(`Password reset email sent to ${email}`)
        }).catch((err) => {
            console.log(err)
            alert(err.message)
        });
    }

    return (
        <div className="resetPassword">
            <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                        <div className="card-body p-5 text-center">

                            <h3 className="mb-5">Reset Your Password</h3>

                            <form autoComplete="off" onSubmit={sendResetEmail}>
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

                                <button className="btn btn-primary btn-lg btn-block" type="submit">Reset Password</button>
                            </form>

                            <hr className="my-4" />

                            <div>
                                <p className="mb-0">Return to login?<a href="/login" className="text-blue-50 fw-bold">Login</a>
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

export default PasswordReset;