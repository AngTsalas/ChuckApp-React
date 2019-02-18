//Component for results
import React from "react";
import ResultRow from "./ResultRow";

function Result(props){
	const rows = [];
	for (let i = 0; i < props.results.total; i++) {
		rows.push(<ResultRow key={i} img={props.results.result[i].icon_url}
						value={props.results.result[i].value} /> );
	}

	return(
		<div id="result">
			{rows}
		</div>
	);
}

export default Result