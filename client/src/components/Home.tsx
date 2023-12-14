import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Navbar'
function Home() {
    return(
        <>
        <Navbar path="/organize" title="Organize"/>
        <div className="container">
            <div className="christmas-box">
                <h1 className="box-text text-center ">{25 - new Date().getDate().valueOf()}</h1>  
                <p className='box-description text-center'>Days until Secret Santa Reveal</p>
            </div> 
        </div>
    </>
  );
}

export default Home;
