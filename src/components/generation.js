import React, {Component} from 'react';

class Generation extends Component{
	
	render(){
		let {generation} = this.props;
		return(
			<div className="generation">
				<h6>{"Generation: " + generation }</h6>
			</div>
		)
	}
}

export default Generation;