import 'bootstrap/dist/css/bootstrap.min.css'

function MakeSession() {
    return(
        <>
        <div className="background d-flex justify-content-center">
            <div className="organize card border-success mb-3">
                <div className="card-body">
                <h5 className="card-title">Organize a session</h5>
                <p className="card-text">Let's get you set up for a gift giving session! Be sure to set the budget that each gift should be, the date, and invite the guests, and we'll take care of the rest.</p>
                <form>
                    <div className="mb-3">
                    <label className="form-label">Session Date</label>
                    <input type="date" value="2023-12-01" />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Description (budget, rules)</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1"></textarea>
                    </div>

                    <div className="form-card">
                    <h5 className="card-title">Invite guests</h5>
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
                            <button type="submit" className="btn border-success space-btns">Add person</button>   
                            <button type="submit" className="btn btn-success space-btns">Save</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default MakeSession