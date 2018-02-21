import React, {Component} from 'react'

class Cell extends Component{
	constructor(props){
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState){
		let {alive} = this.props;
		let nextAlive = nextProps.alive;
		return alive !== nextAlive;
		
	}	
	
	clickHandler(e){
		let{row, index, handleClick} = this.props;
		handleClick(row, index);
	}
	
	render(){
		let {alive, row, index} = this.props;
		return(
				<td key={"cell[" + row + "][" + index + "]"} row={row} cell={index} className={"cell " + (alive ? "filled" : "") } onClick={this.clickHandler}>
				</td>
		)
	}
}

export default Cell;