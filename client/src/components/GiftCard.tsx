import 'bootstrap/dist/css/bootstrap.min.css'

type BuyGiftsProps = {
    title: string, description: string, image: string;
  };

function GiftCard({ title, description, image }: BuyGiftsProps) {
    return(
        <>
        <div className="card" style={{width: "300px"}}>
            <img src={image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href="#" className="buy-btn">Buy</a>
        </div>
        </div>
    </>
  );
}

export default GiftCard;
