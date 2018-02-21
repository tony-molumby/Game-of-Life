import React, {Component} from 'react';
import Row from './row';
import {Table} from 'react-bootstrap';

class Board extends Component{
	
	render(){
		let {board, checkNeighbors, handleClick} = this.props;
		return(
		
				<Table condensed>
					<tbody>
						{
							board.map((row, i)=>{
									return(
										<Row row={row} idx={i} key={"row-" + i} checkNeighbors={checkNeighbors} handleClick={handleClick}/>
									)
							})
						}
					</tbody>
				</Table>
		)
	}
}

export default Board;