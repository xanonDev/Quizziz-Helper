let showanswers;
let powerupsauto;
let button = "";
let AutoPowerUpsEnabled = false;
let AutoModeEnabled = false;
let speed = 1000;
let czypodkreslac = true;
let kolor = "#00FF00";
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

  function isUrl(str) {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
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
        if(czypodkreslac == true) {
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
              if(elementP) {
              elementP.style.backgroundColor = kolor;
              elementP.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
              if(AutoModeEnabled == true) {
              elementP.click();
              next = document.getElementsByClassName("right-navigator strip-default-btn-style");
              next = next[0];
              next.click();
              }
            }
              } catch (error) {
                console.log("błąd");
              }
            }
          }
        }
      }
        if(!foundAnswer) {
          const textareaElement = document.querySelector('textarea.typed-option-input.is-incorrect');
          if (textareaElement) {
            const inputEvent = new Event('input', { bubbles: true });
            textareaElement.value = answerArray[0];
            textareaElement.dispatchEvent(inputEvent);
            foundAnswer = true;
          } else {
          HTTPiden = answer.slice(8)
          for(var i = 0; i < answerArray.length; i++) {
            HTTPiden = isUrl(answerArray[i]);
            try {
              if(HTTPiden == true) {
              const divElement = document.querySelector(`.option-image[style*="background-image"][style*="${answerArray[i]}"]`);
            
              if(divElement) {
                foundAnswer = true;
                divElement.style.borderRadius = "4px";
                divElement.style.border = "30px solid " + kolor;
                if(AutoModeEnabled == true) {
                  divElement.click();
                  next = document.getElementsByClassName("right-navigator strip-default-btn-style");
                  next = next[0];
                  next.click();
                  }
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
                answer_element.style.backgroundColor = kolor;
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
        if(AutoModeEnabled == true) {
        submit = document.getElementsByClassName("submit-button exp-subtext");
        submit = submit[0];
        setTimeout(function(){
                  try {
                  submit.click();
                  }catch (error) {
                    console.log("nie ma submita");
                  }
        }, 500);
      }
      if(AutoModeEnabled == true) {
        submit = document.getElementsByClassName("submit-button");
        submit = submit[0];
        setTimeout(function(){
          try {
            submit.click();
            }catch (error) {
              console.log("nie ma submita");
            }
        }, 500);
      }

    } else {
        console.log('Nie znaleziono pytania na stronie.');
    }
  }
  function AutoPowerUps() {
    try {
     powerupsslots = document.getElementsByClassName("belt-slot strip-default-btn-style full-size powerup-slot h-full");
     for (var p = 0; p < powerupsslots.length; p++) {
      powerupsslot = powerupsslots[p];
      powerupsslot.click();
     }
     powerupsapply = document.getElementsByClassName("apply-now nud-btn strip-default-btn-style");
     for (var p = 0; p < powerupsapply.length; p++) {
      powerupsapply = powerupsapply[p];
      powerupsapply.click();
     }
     
    } catch (error) {
      console.log("nie ma okna powerupa");
    }
  }

  button = document.createElement("button");
  button.innerHTML = "Hack Answers";
  button.style.backgroundColor = '#8B008B';
  button.style.color = "white";
  button.style.position = 'fixed';
  button.style.bottom = '50px';
  button.style.right = '20px';
  button.style.padding = '30px';
  button.style.fontWeight = 'bold';
  button.style.boxShadow = "2px 2px 2px rgb(25,25,112)";
  button.style.borderRadius = "12px";
  button.style.border = "2px solid black"
  button.style.textShadow = "7px 4px 5px rgb(0,0,0)";
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
      Menu = false;
      let noti = document.createElement('p');
      noti.innerHTML = "odpowiedzi zostały pobrane możesz rozpocząć quiz, by ponownie wyświetlić przycisk do pobierania odpowiedzi kliknij h(na telefonie po prostu odśwież strone), pamiętaj przy rozpoczęciu następnego quizu musisz pobrać je ponownie, to powiadomienie zniknie po 6 sekundach";
      noti.style.backgroundColor = kolor;
      noti.style.padding = '8px';
      noti.style.color = 'white';
      noti.style.fontWeight = 'bold';
      noti.style.width = "100%";
      noti.style.position = "fixed";
      noti.style.bottom = "84%";
      noti.style.zIndex = "999";
      noti.style.fontSize = "18px";
      document.body.insertBefore(noti, document.body.firstChild);
      setTimeout(function(){
        noti.remove();
      }, 6000);
    }
    let noti = document.createElement('p');
      noti.innerHTML = "odpowiedzi zostały pobrane możesz rozpocząć quiz, by ponownie wyświetlić przycisk do pobierania odpowiedzi kliknij h(na telefonie po prostu odśwież strone), pamiętaj przy rozpoczęciu następnego quizu musisz pobrać je ponownie, to powiadomienie zniknie po 6 sekundach";
      noti.style.backgroundColor = kolor;
      noti.style.padding = '8px';
      noti.style.color = 'white';
      noti.style.fontWeight = 'bold';
      noti.style.width = "100%";
      noti.style.position = "fixed";
      noti.style.bottom = "84%";
      noti.style.zIndex = "999";
      noti.style.fontSize = "18px";
      document.body.insertBefore(noti, document.body.firstChild);
      setTimeout(function(){
        noti.remove();
      }, 6000);
  };
  button.addEventListener('mouseenter', function() {
    button.style.border = "2px solid white"
  });
  
  button.addEventListener('mouseleave', function() {
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
  setings.innerHTML = "settings";
  setings.style.backgroundColor = '#8B008B';
  setings.style.color = "white";
  setings.style.position = 'fixed';
  setings.style.bottom = '50px';
  setings.style.right = '195px';
  setings.style.boxShadow = "2px 2px 2px rgb(25,25,112)";
  setings.style.padding = '30px';
  setings.style.fontWeight = 'bold';
  setings.style.borderRadius = "12px";
  setings.style.textShadow = "7px 4px 5px rgb(0,0,0)";
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
    setings.style.border = "2px solid white"
  });
  
  setings.addEventListener('mouseleave', function() {
    setings.style.border = "2px solid black"
  });
  setingsMenu = document.createElement("div");
  setingsMenu.classList.add("setingsMenu");
  setingsMenu.innerHTML = '<h3 id="titleP">Quizziz Helper</h3> <button id="closeBTN">X</button> <br> AutoPowerUps: <input type="checkbox" id="option1" value="AutoPowerUps"> <br> AutoMode: <input type="checkbox" id="option2" value="AutoMode"> <br> szybkość bota/wyświetlania odpowiedzi(sekundy) : <br> <input type="range" id="speed" name="slider" min="1" max="20" step="1" value="1"> <span id="speedSH">1 sekundy</span> <br> <label> typ wyświetlania odpowiedzi: <select id="wyswietlanie"> <option value="opcja1">podświetlanie</option> <option value="opcja2">pokazywanie</option> </select> </label> <span id="wersja">by xanonDev wersja 1.7</span> <br> kolor odpowiedzi: <input type="color" id="color" name="color" value="#00FF00"> <br> <button id="reset">resetuj ustawień</button>';
  setingsMenu.style.position = "fixed";
  setingsMenu.style.bottom = "50%";
  setingsMenu.style.right = "50%";
  setingsMenu.style.width = "470px";
  setingsMenu.style.height = "250px";
  setingsMenu.style.backgroundColor = "#8B008B";
  setingsMenu.style.border = "4px solid black";
  setingsMenu.style.boxShadow = "10px 6px 7px rgb(25,25,112)";
  setingsMenu.style.zIndex = "999";
  setingsMenu.style.color = "#FFFF";
  setingsMenu.style.fontWeight = 'bold';
  setingsMenu.style.textShadow = "7px 4px 5px rgb(0,0,0)";
  setingsMenu.style.opacity = "0.8";
  if (window.innerWidth < 768) {
    setingsMenu.style.width = "100%";
    setingsMenu.style.height = "45%";
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
  const wybor = document.getElementById('wyswietlanie');
  const wersja = document.getElementById('wersja');
  const color = document.getElementById('color');
  const reset = document.getElementById('reset');
  const closeBTN = document.getElementById('closeBTN');
  checkbox1.addEventListener('change', function() {
    if (this.checked) {
      AutoPowerUpsEnabled = true;
    } else {
      AutoPowerUpsEnabled = false;
    }
  });
  checkbox2.addEventListener('change', function() {
    if (this.checked && czypodkreslac == true) {
      AutoModeEnabled = true;
    } else {
      AutoModeEnabled = false;
      this.checked = false;
    }
  });
  speedE.addEventListener('change', function() { 
    speed = speedE.value;
    speedSH = document.getElementById('speedSH');
    speedSH.innerHTML = speed + " sekundy";
    speed = speed * 1000;
  });
  wybor.addEventListener('change', function() { 
    if(wybor.value == "opcja1") {
      czypodkreslac = true;
    }else {
      if(wybor.value == "opcja2") {
        czypodkreslac = false;
        checkbox2.checked = false;
      }
    }
  });
  color.addEventListener('change', function() { 
    kolor = color.value;
    console.log(kolor);
  });
  wersja.style.position = "absolute";
  wersja.style.bottom = "2px";
  wersja.style.right = "2px";
  wersja.style.color = "red";
  wersja.style.fontSize = "85%";
  wersja.style.fontWeight = "bold";
  reset.style.border = "3px solid black";
  reset.style.borderRadius = "10px";
  reset.style.position = "absolute";
  reset.style.bottom = "8px";
  reset.style.right = "77%";
  checkbox1.style.scale = "1.5";
  checkbox2.style.scale = "1.5";
  color.style.backgroundColor = "#8B008B";
  wybor.style.backgroundColor = "#FF0066";
  reset.style.backgroundColor = "#CC0033";
  reset.style.boxShadow = "2px 2px 2px rgb(0,0,0)";
  closeBTN.style.border = "1px solid black";
  closeBTN.style.borderRadius = "3px";
  closeBTN.style.position = "absolute";
  closeBTN.style.backgroundColor = "#996699";
  closeBTN.style.bottom = "89%";
  closeBTN.style.right = "1%";
  closeBTN.style.scale = "1.2";
  closeBTN.style.width = "5%";
  reset.onclick = function () {
    AutoPowerUpsEnabled = false;
    AutoModeEnabled = false;
    speed = 1000;
    czypodkreslac = true;
    kolor = "#00FF00";
    wybor.value == "opcja1";
    speedE.value = "1";
    checkbox1.checked = false;
    checkbox2.checked = false;
    color.value = kolor;
    speedSH.innerHTML = "1 sekundy";

  }
  closeBTN.onclick = function () {
    setingsMenu.style.display = "none";
    Menu = false;
  }
  
