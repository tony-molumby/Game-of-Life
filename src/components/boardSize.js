import React, {Component} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

class BoardSize extends Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e){
        let {stopGame, createBoard} = this.props;
        let {value} = e.target;
		stopGame();
		value = parseInt(value, 10);
		createBoard(value);
	}
	
	render(){
		return(
			<ButtonGroup bsSize="xsmall" vertical>
				<h6>Board Size</h6>
				<Button value={10} onClick={this.handleClick}>10x10
				</Button>
				<Button value={20} onClick={this.handleClick}>20x20
				</Button>
				<Button value={40} onClick={this.handleClick}>40x40
				</Button>
				<Button value={80} onClick={this.handleClick}>80x80
				</Button>
			</ButtonGroup>
		)
	}
}

export default BoardSize;