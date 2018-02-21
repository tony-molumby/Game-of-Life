import React, { Component } from 'react';
import './App.css';
import {Well} from 'react-bootstrap';
import Board from './components/board';
import BoardSize from './components/boardSize';
import Controls from './components/controls';
import Generation from './components/generation';


class App extends Component{
	constructor(props){
		super(props);
		this.state={
			board: [],
			size: 40,
			generation: 0
		}
	
	}

	cellLife = (alive, count) =>{
		let lives = 0;
		if(alive){
			if(count === 2 || count === 3){
				lives = 1;
			}
		} else if(count === 3) {
			lives = 1;
		}
		return lives;
	}
	
	componentWillMount(){
		let {size} = this.state;
		this.createBoard(size);
		this.fillBoard();
	}
	
	componentDidMount(){
		this.playGame();
	}
 	
	checkNeighbors = () => {
		let {board} = this.state;
		this.setState((previousState) => {
			for(let rowNum = 0; rowNum < board.length ; rowNum++ ){
				for(let cellNum = 0; cellNum < board.length; cellNum++){
					let row = this.inboundsCheck(rowNum);
					let cell = this.inboundsCheck(cellNum);
					let alive = board[rowNum][cellNum];
					let rStart = 0, rEnd = 0, cStart = 0, cEnd = 0, count = 0;
					switch(cell){
						case "low":
							cStart = 0;
							cEnd = cellNum + 1;
							break;
						case "high":
							cStart = cellNum - 1;
							cEnd = cellNum;
							break;
						default:
							cStart = cellNum - 1;
							cEnd = cellNum + 1;
							break;
						}
					switch(row){
						case "low":
							rStart = 0;
							rEnd = rowNum + 1;
							break;
						case "high":
							rStart = rowNum - 1;
							rEnd = rowNum;
							break;
						default:
							rStart = rowNum - 1;
							rEnd = rowNum + 1;
							break;
					}
					for(let r = rStart; r <= rEnd; r++){
						for(let c = cStart; c <= cEnd; c++){
										if(board[r][c] === 1){
								count++;
										}
						}
					}
					if(alive){
						count--;
					}
				let lives = this.cellLife(alive, count);
				previousState.board[rowNum].splice(cellNum, 1, lives);
				}
			}
			return {board: previousState.board}
		})
		
	}
	
	createBoard = (size) => {
		this.setState((previousState)=>{
			let {board} = previousState;
			board = [];
			for(let i = 0; i < size; i++){
					board.push([]);
					for(let j = 0; j < size; j++ ){
							board[i].push(0);
					}
				}
				return {
					board: board,
					play: 0,
					size: size
				}
			});
	}	
	
	fillBoard = () => {
		this.stopGame();
		this.setState((previousState)=>{
			let {board} = previousState;
			let len = board.length;
			for(let k = 0; k < len; k++){
				board[k] = [];
			}
			for(let i = 0; i < len ; i++){
				for(let j = 0; j < len; j++){
					if(Math.random() > 0.7){
						board[i].push(1);
					} else {
						board[i].push(0);
					}
				}
		}
			return {board: board}
		});
	}
	
	handleClick = (rowNum, cellNum) => {
		this.setState((previousState)=>{
			let {board} = previousState;
			let clickedCell = board[rowNum][cellNum];
			clickedCell ? clickedCell = 0 : clickedCell = 1;
			board[rowNum].splice(cellNum, 1, clickedCell);
			return {board: board}
		})
	}
	
	inboundsCheck = (item) => {
  let position = "", {board} = this.state;
		let len = board.length - 1;
  switch(item){
    case 0:
      position = "low";
      break;
    case (len):
      position = "high";
      break;
    default:
      position = "in"
      break;
  }
  return position;
}
	
	playGame = () => {
		let {play} = this.state;
		play = !play;
		this.setState({
			play: play
		});
		if(play){
			this.timerId = setInterval(()=>{
				this.checkNeighbors();
				this.setState({
					generation: this.state.generation + 1
				});
			}, 500)
		} else {
			clearInterval(this.timerId);
			
		}
	}
	
	stopGame = () => {
		clearInterval(this.timerId);
		this.setState({
			play: 0,
			generation: 0
		});
	}
	
	render(){
		let {board, size, play, generation} = this.state;
			return(
				<div className="site">
					<header className="header">
						<h2>Game of Life</h2>
					</header>
					<main className="main table">
						<Generation generation={generation} board={board}/>
						<Well bsSize="small">
						<Board board={board} checkNeighbors={this.checkNeighbors} handleClick={this.handleClick} playGame={this.playGame}/>
						</Well>
						<Controls fillBoard={this.fillBoard} size={size} createBoard={this.createBoard} playGame={this.playGame} play={play} stopGame={this.stopGame} />
					</main>
					<div className="sidebar">
						<BoardSize createBoard={this.createBoard} stopGame={this.stopGame}/>
					</div>
					<footer className="footer">
      <p>By Tony Molumby</p>
					</footer>
				</div>
			)
  }
}
  export default App;