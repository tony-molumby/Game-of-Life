import React, {Component} from 'react';
import Cell from './cell';

class Row extends Component{

	render(){
		let {row, idx, checkNeighbors, handleClick} = this.props;
		return(
		<tr>
				{
					row.map((cell, i)=>{
						return(
							<Cell alive={cell} key={"cell-" + i} row={idx} index={i} checkNeighbors={checkNeighbors} handleClick={handleClick}/>
						)
					})
				}
		</tr>
		)
	}
}

export default Row;