export default function ReadMoreCard(props: { backgroundImg?: string }){
    return(
        <div 
            className="card-container min-w-80 max-h-[215px]" 
            style={props.backgroundImg ? { backgroundImage: `url(${props.backgroundImg})` } : undefined}
        >
            <div className="readMoreCard-description">
                <h1>Water source</h1>
                <p>Provides clean water to millions of Filipinos through its vast watershed systems.</p>
                <button>Read More &gt</button>
            </div>
        </div>
    );
}
