import "bootstrap/dist/css/bootstrap.min.css";
import christmas from "/./public/christmas_home.png";
import { useForm, SubmitHandler } from "react-hook-form";
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  type Inputs = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <>
      <div className="background d-flex justify-content-center">
        <div>
          <div className="signup card border-success-subtle mb-3">
            <div className="card-body">
              <h5 className="card-title">Sign up</h5>
              <p className="card-text">
                Let's get festive and get you started to set up a Secret Santa
                experience.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label className="form-label ">First Name</label>
                  <input
                    type="text"
                    className={
                      errors.firstName
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="exampleInputEmail1"
                    aria-describedby="First name"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={
                      errors.lastName
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="exampleInputEmail1"
                    aria-describedby="Last name"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className={
                      errors.email
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={
                      errors.password
                        ? "form-control border border-danger"
                        : "form-control"
                    }
                    id="exampleInputPassword1"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <span>This field is required</span>}
                </div>
                <button type="submit" className="btn btn-success">
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Log in
          </button>
          <div></div>
        </div>
        <img src={christmas} />
      </div>
    </>
  );
}

export default Signup;
