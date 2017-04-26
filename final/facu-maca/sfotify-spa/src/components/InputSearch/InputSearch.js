import React, { Component } from 'react';

class InputSearch extends React.Component {

	handleClick(i){
			// llamar archivollamadas.llamada
	}	


	render() {
		return ( 
	    	<div class="container">
		    	<form id="search-form">
		        	<input type="text" id="query" value="" class="form-control" />
		        	<input type="submit" id="search" class="btn btn-primary" value="Search" onClick={(i) => this.handleClick(i)}/>
		    	</form>
		    </div>

	      /*<div>
	        <input type = "text" id = "inputSearch" placeholder = "Search the name of your favorite artist">
	        </input>
	      </div>*/
	    )
	  }
	}
