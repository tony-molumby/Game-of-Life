import React, {Component} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';

class Controls extends Component{
	constructor(props){
		super(props);
		this.clearBoard = this.clearBoard.bind(this);
	}

	clearBoard(){
		let {createBoard, size, stopGame} = this.props;
		stopGame();
		createBoard(size);
	}
	
	render(){
        let {fillBoard, playGame, play} = this.props;
        
		return(
			<ButtonGroup bsSize="xsmall">
				<Button bsStyle="success" onClick={playGame}>{play ? "Pause" : "Play"}
				</Button>
				<Button bsStyle="danger" onClick={this.clearBoard}>Clear Board
				</Button>
				<Button bsStyle="warning" onClick={fillBoard}>Random Board
				</Button>
			</ButtonGroup>
		)
	}
}

export default Controls;