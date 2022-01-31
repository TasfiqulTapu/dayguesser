let date;
let timer,stopwatch;
let years = JSON.parse(localStorage.getItem("years"));
if(!years){
    years = [ parseInt(new Date().getFullYear()) , parseInt(new Date().getFullYear()) ];
}
document.getElementById("year-start").value = years[0];
document.getElementById("year-end").value = years[1];
document.getElementById("this-year-settings").textContent = new Date().getFullYear();
function start(){
    document.getElementById("welcome").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("gussing").style.display = "block";
    date = generateDate(years[0],years[1]);
    document.getElementById("date").textContent = date;
    endTimer();
    startTimer();
}
let dayInput = document.getElementsByClassName("submit-day")
for(let i = 0; i < dayInput.length; i++){
    dayInput[i].addEventListener("click", function(){
        let day = dayInput[i].textContent;
        submitDay(day);
    })}
    
function generateDate(year1,year2){
    let yearStart = new Date(year1, 0, 1);
    let yearEnd = new Date(year2, 11, 31);
    let randomDate = new Date(yearStart.getTime() + Math.random() * (yearEnd.getTime() - yearStart.getTime()));
    return randomDate.toLocaleString('en-GB',{'day':'numeric','month':'long','year':'numeric'});
   
}
function findDay(date){
    let day = new Date(date);
    return day.toLocaleString('en-GB',{'weekday':'long'});
}
function findAnswer(date){
    let day = new Date(date);
    return day.toLocaleString('en-GB',{'weekday': 'long','day':'numeric','month':'long','year':'numeric'});
}

function submitDay(day){
    let dayOfWeek = findDay(date);
    endTimer();
    document.getElementById("results").style.display = "block";
    document.getElementById("gussing").style.display = "none";
    document.getElementById("result-date").textContent = findAnswer(date);
    document.getElementById("time").innerHTML = formatTime(Date.now() - timer);
    if(dayOfWeek.toLowerCase() === day.toLowerCase()){
        document.getElementById("result-header").textContent = "You guessed the correct day!";
    }
    else{
        document.getElementById("result-header").textContent = "You guessed the wrong day!";
    }
}
function startTimer(){
    timer = Date.now()
    stopwatch = setInterval(function(){
        document.getElementById("timer").innerHTML = formatTime(Date.now() - timer);
    },50)
}
function endTimer(){
    clearInterval(stopwatch);
}
function formatTime(time){
    let seconds =(time/1000) % 60;
    let minutes = Math.floor(time/60000) % 60;
    let hours = Math.floor(time/3600000) % 60;
    let content = '';
    hours && (content += `<h3>${hours}</h3><p>h</p>`)
    minutes && (content += `<h3>${minutes}</h3><p>m</p>`)
    content += `<h3>${seconds.toFixed(2)}</h3><p>s</p>`
    // content += `<h3>${points}</h3><p>ms</p>`
    return content;
}
function customYearSet(){
    years = [parseInt(document.getElementById("year-start").value),parseInt(document.getElementById("year-end").value)];
    localStorage.setItem("years", JSON.stringify(years));
    start();
    document.getElementById("custom-years").style.display = "none";
}
function setThisYear(){
    years = [parseInt(new Date().getFullYear()),parseInt(new Date().getFullYear())];
    localStorage.setItem("years", JSON.stringify(years));
    start();
}
function showCustomYear(){
    document.getElementById("custom-years").style.display = "block";
}