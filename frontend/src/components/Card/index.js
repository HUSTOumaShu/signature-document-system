import './index.css'

const cards = [
    {
        title: 'Processing',
        count: 5,
    },
    {
        title: 'Required',
        count: 2,
    },
    {
        title: 'Waiting',
        count: 3,
    },
    {
        title: 'Completed',
        count: 10,
    },
]

const Card = () => {
    return (
        <div className="card--container">
            {cards.map(item => (
                <div className="card">
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