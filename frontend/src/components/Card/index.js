import './index.css'

const Card = ({cards}) => {
    return (
        <div className="card--container">
            {cards.map(item => (
                <div className="card" key={item.title}>
                    <div className="card--count">{item.count}</div>
                    <div className="card--title">
                        <h4>{item.title}</h4>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card