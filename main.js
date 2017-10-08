var aims = [], modules = [];
var grades = ["First", "2:1", "2:2", "Third"];
var results = document.getElementById("results");
var average = 0;
var prediction;

function Module(e, c){
	var _this = this;

	this.credits = c;

	this.grade = function(){
		var val = document.getElementById(e).value;
		return isNaN(val) ? 0 : parseInt(val);
	};

	this.percent = function(){
		return Math.floor((_this.grade() / 100) * ((_this.credits / 6) * 5));
	};

	modules.push(this);
};

function findAverage(arr){
	var total = 0;
	for(var i = 0; i < arr.length; i++){
		total += arr[i].grade();
	}
	return total / arr.length;
}

function calculate(num){
	modules = [];

	var professionalContext = new Module("professional-context", 20);
	var designResearchStudy = new Module("design-research-study", 40);

	var milestone = isNaN(num) ? 70 : num;
	if(milestone === 70){
		aims = [];
	}

	average = findAverage(modules);

	var totalNeeded = (milestone - (professionalContext.percent() + designResearchStudy.percent())) * 2;

	if(totalNeeded >= 40){
		aims.push(totalNeeded);
	}

	if(milestone > 40){
		calculate(milestone - 10);
	} else {
		if(!isNaN(aims[0])){
			outputResults();
		}
	}
};

function outputResults(){
	results.style.display = "block";
	results.innerHTML = "";
	
	for(var i = 0; i < aims.length; i++){
		if(aims[i] <= 100){
			results.innerHTML += "<span>You need <strong>" + aims[i] + "</strong> in Final Major Project to get a <strong>" + grades[i] + "</strong></span><br>";
		} else {
			results.innerHTML += "<span>You <strong>cannot</strong> achieve a <strong>" + grades[i] + "</strong></span><br>";
		}
	}

	if(aims.length !== grades.length){
		var diff = grades.length - aims.length;
		var idx = grades.length - diff;
		results.innerHTML += "<span>Providing you pass, you are <strong>guarenteed</strong> a " + grades[idx] + "</span><br>";
	}

	if(average < 40){
		prediction = "Fail";
	} else if(average < 50){
		prediction = "Third";
	} else if(average < 60){
		prediction = "2:2";
	} else if(average < 70){
		prediction = "2:1";
	} else {
		prediction = "First";
	}

	results.innerHTML += "<br><span>Your average grade is <strong>" + average + "</strong></span><br>";
	results.innerHTML += "<span>You are predicted a <strong>" + prediction + "</strong></span>";
}

var btnCalculate = document.getElementById("btn-calculate");
btnCalculate.addEventListener("click", calculate, false);