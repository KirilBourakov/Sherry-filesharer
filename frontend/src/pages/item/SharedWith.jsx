

export default function SharedWith(props){
    if(props.data === undefined){
        return(
            <div className="ms-1 badge bg-secondary text-wrap align-self-center">
                    loading...
            </div>
        );
    };

    if(props.public){
        return(
            <div className="ms-1 badge bg-success text-wrap align-self-center">
                Public
            </div>
        );
    };

    if (props.data.length > 0){
        return(
            <>
                {props.data.map(share => {
                    return(
                        <div key={share} className="ms-1 badge bg-secondary text-wrap align-self-center">
                            {share}
                        </div>
                    )
                })}
            </>
        );
    };
    return(
        <div className="ms-1 badge bg-danger text-wrap align-self-center">
            None
        </div>
    );

    
};