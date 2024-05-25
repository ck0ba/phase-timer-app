document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const mainScreen = document.getElementById('main-screen');
    const stageScreen = document.getElementById('stage-screen');
    const title = document.getElementById('stage-title');
    const timerDiv = document.getElementById('timer');
    const notesDiv = document.getElementById('notes');
	let currentStage = 0;
	let timer = null;

    const stages = [
		{ title: "CLARIFICATIONS", time: 120, color: "blue", notes: "<strong> Focus on problem details. </strong> <br>Resolve ambiguities." },
		{ title: "EXAMPLE", time: 120, color: "red", notes: "<ul><li> Find good egample. </li></ul>" },	
		{ title: "BRUTE FORCE", time: 120, color: "green", notes:  "<em> Try to find brute force solution first. </em>" },
		{ title: "OPTIMIZATION", time: 300, color: "light-salmon", notes:  "<em> Optimize. </em>" },
		{ title: "REVISE", time: 120, color: "light-pink", notes:  "<em> Revise. </em>" },
		{ title: "IMPLEMENT", time: 300, color: "peach-puff", notes:  "<em> Implement. </em>" },
		{ title: "TEST", time: 120, color: "dark-sea-green", notes:  "" }
    ];
 
    startButton.addEventListener('click', function() {
        mainScreen.style.display = 'none';
        stageScreen.style.display = 'flex';
		
        startStage();
    });
	
	document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            resetTimerAndAdvanceStage();
        }
    });

    function startStage() {
        if (currentStage < stages.length) {
            const stage = stages[currentStage];
            stageScreen.className = stage.color;
            title.textContent = stage.title;
            timerDiv.textContent = formatTime(stage.time);
			notesDiv.innerHTML = stage.notes;
			notesDiv.style.display = stage.notes ? 'block' : 'none';
			
            clearInterval(timer);
            startTimer(stage.time);
        } else {
            endInterview();
        }
    }

    function startTimer(seconds) {
        let timeLeft = seconds;
        timer = setInterval(() => {
            timeLeft--;
            timerDiv.textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                resetTimerAndAdvanceStage();
            }
        }, 1000);
    }

    function resetTimerAndAdvanceStage() {
        clearInterval(timer);
		
        currentStage++;
        if (currentStage >= stages.length) {
            endInterview();
        } else {
            startStage();
        }
    }

    function endInterview() {
        title.textContent = "END";
        notesDiv.style.display = 'none';
        timerDiv.textContent = "";
        stageScreen.style.backgroundColor = "black";
        setTimeout(() => {
			location.reload(); 
        }, 3000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
		
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
	
});
