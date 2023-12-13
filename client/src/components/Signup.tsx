import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar
 from './Navbar'
function Signup() {
    return(
        <>
        <Navbar title="Log in"/>
         <div className="background d-flex justify-content-center">
            <div className="signup card border-info mb-3">
                <div className="card-body">
                <h5 className="card-title">Sign up</h5>
                <p className="card-text">Let's get festive and get you started to set up a Secret Santa experience.</p>
                <form>
                <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
                </form>
                </div>
            </div>
            <div>
        </div>
        </div>
        </>
    )
}


export default Signup