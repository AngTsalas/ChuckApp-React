//Component for a single row of results
import React from "react";

function ResultRow(props){
	return(
		<div className="joke">
			<img src={props.img} alt="Chuck"/> <p>{props.value}</p>
		</div>
	);
}

export default ResultRow