var floorLevels = []; 	//This placeholder array gets filled with more arrays that make up each floor (These sub-arrays will be made by the arraySet function)
						//The floors are added to the array as they are made, therefore the algorithm begins with the lowest floor. to access floorN simply call floorLevels[N-1]
						//Example: to access the array with all of the objects of floor1, where N = 1 call: floorLevels[0]

/*  
	##############################################
	makeFloor(lvl,contentDocument)	: Creates the floor array and assigns event listeners that will take care of switching floor levels
	lvl 							: integer of which floor level is to be made
	contentDocument					: DOM level access for SVG document
	##############################################
*/
var makeFloor = function(lvl,contentDocument) {	

	var svgDoc = contentDocument;	//Obtain the contentDocument from the parameter
	
	var className = "floor"+lvl;	//floor level identifier (i.e. floor1, floor2, etc.). lvl number obtaine dfrom parameter
	
	//start new array for floor	
	var floorArray = new Array(svgDoc.getElementsByClassName(className).length);	//create a new array for the floor with a size big enough to fit all elements with the class name "floorN"
	
	//create a reference to the floor selection button
	var floorToggleID = "F"+lvl;								//it should be hardcoded to begin with a capital F followed by N the floornumber ex: F1 for floor1
	var floorToggle = document.getElementById(floorToggleID);	//obtain the object that will toggle a floor change

	//event listeners
	if (floorToggle == null) {	//if no floor toggle object found
		alert("error..");		//spit out an error.. 
	} else {					//if the floorToggle is set...
		arraySet(floorArray,className,svgDoc);	//populate array w/ objects using arraySet function defined below
		floorToggle.addEventListener("click",function() {	//whenever clicked
			showFloorFunc(lvl);	//use an anonymous function to pass through the level
		},false);	
	}
};

/*  
	##############################################
	arraySet(floorArray,className,svgDoc)	: Helper function that assists in populating the floorArray with objects 
	floorArray 								: Array that contains all of the objects within a floor level
	className								: floor level identifier (i.e. floor1, floor2, etc.)
	svgDoc									: reference to svg contentDocument
	##############################################
*/
var arraySet = function(floorArray,className,svgDoc) {
	for (x = 0 ; x < svgDoc.getElementsByClassName(className).length ; x++) { //for all objects that are tagged with className i.e <g class="floor1">
		floorArray[x] = svgDoc.getElementsByClassName(className)[x];	
	}
	floorLevels.push(floorArray); 	//add the array of floor objects to the floorLevels list. 
};

/*  
	##############################################
	showFloorFunc(lvl)				: Shows the requested floor
	lvl								: floor level (i.e. 1, 2, 3, etc.)
	##############################################
*/
var showFloorFunc = function(lvl) {
	var targetFloor = lvl - 1;						//floor that is the target to show. Subtract 1 so we can find it in the index that starts with 0. Recall: floorLevels has the floor contents ordered from least to greatest.
	for (i = 0 ; i < floorLevels.length ; i++) {
		if (i != targetFloor) { 					//if the floor in the current iteration is not the target floor, hide all elements
			for (k = 0; k < floorLevels[i].length; k++) {
				floorLevels[i][k].style.display='none';	
			}
		} else {									//if the floor in the current iteration DOES match; set the elements to show.
			for (j = 0 ; j < floorLevels[i].length ; j++) {
				floorLevels[i][j].style.display='block';	
			}
		}
	}
}



var a = document.getElementById("theSVG");
		//load the svg doc asynchronously	
		a.addEventListener("load",function(){
			var svgDoc = a.contentDocument; 			//get the inner DOM of the SVG object
			
			var floorCount = $('.breadcrumb li').size() - 1;	//get how many floors there are based on the breadcrumb floor selection.
																//subtract 1 because of extra <li> header.
			
			for (m = 1; m < floorCount+1; m++) { 	//start at 1 to match real numbers so that they can be passed into the makeFloor
				makeFloor(m,svgDoc);	
			}			
			
			////////////////////CHECK IF IN AN IFRAME (housing site), IF TRUE, auto-show roomplan by default/////////////
			function inIframe () {
				try {
					return window.self !== window.top;
				} catch (e) {
					return true;
				}
			}
			
			if (inIframe()) {
				$('.navbar-collapse').addClass('in');
				$('.navbar-collapse').css('height','auto');
			}

        },false);

			

