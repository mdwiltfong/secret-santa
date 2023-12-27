import 'bootstrap/dist/css/bootstrap.min.css'
import GiftCard from './GiftCard';
import Navbar from './Navbar';
function BuyGifts() {
    return(
    <>
    <Navbar />
    <div className="container">
    <div className="card">
        <h5 className="card-header">You've come to the giftshop! 🎁</h5>
        <div className="card-body">
            <p className="card-text">Buy one or as many gifts you want to gift to people. You'll receive at least a gift back from a Secret Santa!</p>
        </div>
    </div>
    </div>
    <div className="spacing"></div>
        <div className='container'>
            <div className="row">
                <div className="col">
                <GiftCard title="Starbucks ecard" description="For starbucks" image="././sbgiftcard.jpg"/>
                </div>
                <div className="col">
                <GiftCard title="Jamba Juice" description="Get yourself some smoothies" image="././jamba-giftcard.jpeg"/>
                </div>
                <div className="col">
                <GiftCard title="Philz" description="Get some caffeine fix" image="././philz-giftcard.png"/>
                </div>
                <div className="col">
                <GiftCard title="Imax" description="Watch something" image="././imax.jpeg"/>
                </div>
            </div>
        </div>
    </>
  );
}

export default BuyGifts;