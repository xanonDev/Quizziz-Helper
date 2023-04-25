let showanswers;
let powerupsauto;
let button = "";
let AutoPowerUpsEnabled = false;
let AutoModeEnabled = false;
let speed = 1000;
function OnClick() {
    let pin = window.location.href;
    let url = `https://api.quizit.online/quizizz/answers?pin=${pin}`;
    console.log("pobierano odpowiedzi");
    
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        let answers = data['data']['answers'];
        let questions_and_answers = [];
  
        for (let i = 0; i < answers.length; i++) {
          let question = answers[i]['_id'];
          let answer = '';
          for (let j = 0; j < answers[i]['answers'].length; j++) {
            if(answers[i]['answers'][j]['text'] != "") {
            answer += answers[i]['answers'][j]['text'] + "|";
            }else {
              answer += answers[i]['answers'][j]['image'] + "|";
            }
          }
          let answer_cut = answer.replace("<p>", "").replace("</p>", "");
          let question_and_answer = { 'pytanie': question, 'odpowiedz': answer_cut };
          questions_and_answers.push(question_and_answer);
        }

        showanswers = setInterval(() => Hack(questions_and_answers), speed);
        if(AutoPowerUpsEnabled == true) {
        powerupsauto = setInterval(() => AutoPowerUps(), speed);
        }
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
      });
  }

  function Hack(questions_and_answers) {
    url = window.location.href;
    url = url.slice(-12);
		if (url === "page=summary") {
			console.log("quiz się zakończył");
			button.style.display = "block";
      setings.style.display = "block";
			czywyswietlany = true;
			clearInterval(showanswers);
      clearInterval(powerupsauto);
		}
    let foundAnswer = false;
    let question_element = localStorage.getItem('previousContext');
    const parsedContext = JSON.parse(question_element);
    const QuestionId = parsedContext.game.lastVisibleQuestionId;

    if (question_element) {
        let answer = '';
        for (let i = 0; i < questions_and_answers.length; i++) {
            if (questions_and_answers[i]['pytanie'] === QuestionId) {
                answer = questions_and_answers[i]['odpowiedz'];
                break;
            }
        }

        var elementyP = document.getElementsByTagName("p");
        var answerArray = answer.split("|");
        answerArray = answerArray.map(item => item.replace("<p>", ''));
        answerArray = answerArray.map(item => item.replace("</p>", ''));
        answerArray.pop();
        for (var j = 0; j < answerArray.length; j++) {
          var answerElement = answerArray[j].trim();
          for (var i = 0; i < elementyP.length; i++) {
            var elementP = elementyP[i];
            TempP = document.createElement("p");
            TempP.innerHTML = answerElement;
            if (elementP.innerHTML === TempP.innerHTML) {
              foundAnswer = true;
              elementP = elementP.parentNode;
              elementP = elementP.parentNode;
              elementP = elementP.parentNode;
              elementP = elementP.parentNode;
              try {
              elementP.style.backgroundColor = "#00FF00";
              elementP.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
              if(AutoModeEnabled == true) {
              elementP.click();
              next = document.getElementsByClassName("right-navigator strip-default-btn-style");
              next = next[0];
              next.click();
              }
              } catch (error) {
                console.log("błąd");
              }
            }
          }
        }
        if(!foundAnswer) {
        const textareaElement = document.querySelector('textarea.typed-option-input.is-incorrect');
        if (textareaElement) {
          textareaElement.value = answerArray[0];
          foundAnswer = true;
        } else {
          for(var i = 0; i < answerArray.length; i++) {
            try {
              const divElement = document.querySelector(`.option-image[style*="background-image"][style*="${answerArray[i]}"]`);
              if(divElement) {
                foundAnswer = true;
                divElement.style.borderRadius = "4px";
                divElement.style.border = "30px solid green"
                if(AutoModeEnabled == true) {
                  divElement.click();
                  next = document.getElementsByClassName("right-navigator strip-default-btn-style");
                  next = next[0];
                  next.click();
                  }
              }
            } catch (error) {
              console.log("nie znaleziono obrazka");
            }
          }
        }
          const optionsContainer = document.querySelector('.options-container');

          if (!foundAnswer && optionsContainer !== null && optionsContainer.classList.contains('w-full') && optionsContainer.classList.contains('text-center') && optionsContainer.classList.contains('rounded-t-lg') && optionsContainer.classList.contains('h-1/2')) {
              let answer_element = document.createElement('p');
                answer_element.innerHTML = answer.slice(0, -1);
                answer_element.style.backgroundColor = 'green';
                answer_element.style.padding = '8px';
                answer_element.style.color = 'white';
                answer_element.style.fontWeight = 'bold';
                answer_element.style.width = "100%";
                answer_element.style.position = "fixed";
                answer_element.style.bottom = "84%";
                answer_element.style.zIndex = "999";
                answer_element.style.fontSize = "18px";
                document.body.insertBefore(answer_element, document.body.firstChild);
              setTimeout(function(){
                answer_element.remove();
            }, speed + 400);
          }
        }
    } else {
        console.log('Nie znaleziono pytania na stronie.');
    }
  }
  function AutoPowerUps() {
    try {
    powerupslots = document.getElementsByClassName("belt-slot strip-default-btn-style powerup-slot h-full");
    powerupslot = powerupslots[0];
    powerupslot.click();
    powerupslot = powerupslots[1];
    powerupslot.click();
    powerupslot = powerupslots[2];
    powerupslot.click();
    powerup = document.getElementsByClassName("apply-now nud-btn strip-default-btn-style");
    powerup = powerup[0];
    powerup.click();
    powerup2 = document.getElementsByClassName("apply-button");
    powerup2 = powerup2[0];
    powerup2.click2();
    } catch (error) {
      console.log("nie ma okna powerupa");
    }
  }

  button = document.createElement("button");
  button.innerHTML = "Hack Answers";
  button.style.backgroundColor = 'red';
  button.style.color = "black";
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.padding = '30px';
  button.style.fontWeight = 'bold';
  button.style.borderRadius = "12px";
  button.style.border = "2px solid black"
  button.style.zIndex = "999";
  let czywyswietlany = true;
  button.onclick = function() {
    OnClick();
    button.innerHTML = "Hack Again";
    button.style.display = "none";
    czywyswietlany = false;
    setings.style.display = "none";
    setingsMenu.style.display = "none";
    button.onclick = function() {
      clearInterval(showanswers);
      clearInterval(powerupsauto);
      OnClick();
      button.innerHTML = "Hack Again";
      button.style.display = "none";
      setings.style.display = "none";
      setingsMenu.style.display = "none";
      czywyswietlany = false;
      alert("odpowiedzi zostały pobrane możesz rozpocząć quiz, by ponownie wyświetlić przycisk do pobierania odpowiedzi kliknij h(na telefonie po prostu odśwież strone), pamiętaj przy rozpoczęciu następnego quizu musisz pobrać je ponownie");
    }
    alert("odpowiedzi zostały pobrane możesz rozpocząć quiz, by ponownie wyświetlić przycisk do pobierania odpowiedzi kliknij h(na telefonie po prostu odśwież strone), pamiętaj przy rozpoczęciu następnego quizu musisz pobrać je ponownie");
  };
  button.addEventListener('mouseenter', function() {
    button.style.backgroundColor = 'green';
    button.style.color = "white";
    button.style.border = "2px solid white"
  });
  
  button.addEventListener('mouseleave', function() {
    button.style.backgroundColor = 'red';
    button.style.color = "black";
    button.style.border = "2px solid black"
  });
  document.body.appendChild(button);
  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 72 || event.key === 'h') {
      if (czywyswietlany == true) {
      button.style.display = "none";
      setings.style.display = "none";
      setingsMenu.style.display = "none";
      czywyswietlany = false;
      } else {
        button.style.display = "block";
        setings.style.display = "block";
        czywyswietlany = true;
      }
    }
  });
  setings = document.createElement("button");
  setings.innerHTML = "setings";
  setings.style.backgroundColor = 'red';
  setings.style.color = "black";
  setings.style.position = 'fixed';
  setings.style.bottom = '20px';
  setings.style.right = '195px';
  setings.style.padding = '30px';
  setings.style.fontWeight = 'bold';
  setings.style.borderRadius = "12px";
  setings.style.border = "2px solid black"
  setings.style.zIndex = "999";
  let Menu = false;
  setings.onclick = function () {
    if(Menu == false) {
      setingsMenu.style.display = "block";
      Menu = true;
    } else {
      setingsMenu.style.display = "none";
      Menu = false;
    }
  }
  document.body.appendChild(setings);
  setings.addEventListener('mouseenter', function() {
    setings.style.backgroundColor = 'green';
    setings.style.color = "white";
    setings.style.border = "2px solid white"
  });
  
  setings.addEventListener('mouseleave', function() {
    setings.style.backgroundColor = 'red';
    setings.style.color = "black";
    setings.style.border = "2px solid black"
  });
  setingsMenu = document.createElement("div");
  setingsMenu.classList.add("setingsMenu");
  setingsMenu.innerHTML = '<h3>Quizziz Hack</h3> <br> AutoPowerUps: <input type="checkbox" id="option1" value="AutoPowerUps"> <br> AutoMode: <input type="checkbox" id="option2" value="AutoMode"> <br> szybkość bota/wyświetlania odpowiedzi(sekundy) : <br> <input id="speed" type="number" value="1" />';
  setingsMenu.style.position = "fixed";
  setingsMenu.style.bottom = "50%";
  setingsMenu.style.right = "50%";
  setingsMenu.style.width = "300px";
  setingsMenu.style.height = "200px";
  setingsMenu.style.backgroundColor = "white";
  setingsMenu.style.border = "2px solid black";
  setingsMenu.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)";
  setingsMenu.style.zIndex = "999";
  if (window.innerWidth < 768) {
    setingsMenu.style.width = "100%";
    setingsMenu.style.height = "auto";
    setingsMenu.style.bottom = "50%";
    setingsMenu.style.right = "0";
    setingsMenu.style.left = "0";
    setingsMenu.style.padding = "10px";
    setingsMenu.querySelector("h3").style.fontSize = "24px";
    setingsMenu.querySelectorAll("input[type='checkbox']").forEach(function(checkbox) {
      checkbox.style.marginBottom = "10px";
    });
  }
  document.body.appendChild(setingsMenu);
  setingsMenu.style.display = "none";
  const checkbox1 = document.getElementById('option1');
  const checkbox2 = document.getElementById('option2');
  const speedE = document.getElementById('speed');
  checkbox1.addEventListener('change', function() {
    if (this.checked) {
      AutoPowerUpsEnabled = true;
    } else {
      AutoPowerUpsEnabled = false;
    }
  });
  checkbox2.addEventListener('change', function() {
    if (this.checked) {
      AutoModeEnabled = true;
    } else {
      AutoModeEnabled = false;
    }
  });
  speedE.addEventListener('change', function() { 
    speed = speedE.value;
    speed = speed * 1000;
  });
