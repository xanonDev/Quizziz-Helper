let showanswers;
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
            answer += answers[i]['answers'][j]['text'] + "|";
          }
          let answer_cut = answer.replace("<p>", "").replace("</p>", "");
          let question_and_answer = { 'pytanie': question, 'odpowiedz': answer_cut };
          questions_and_answers.push(question_and_answer);
        }
        

        showanswers = setInterval(() => Hack(questions_and_answers), 3000);
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
      });
  }

  function Hack(questions_and_answers) {
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
            if (elementP.textContent === answerElement) {
              elementP.style.color = "#00FF00";
              elementP.style.textDecoration = "underline";
              elementP.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
              console.log(answerArray);
            }
          }
        }
        
        const textareaElement = document.querySelector('textarea.typed-option-input.is-incorrect');
        if (textareaElement) {
          textareaElement.value = answerArray[1];
        } else {
        }
    } else {
        console.log('Nie znaleziono pytania na stronie.');
    }
  }
  let button = document.createElement("button");
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
  let czywyswietlany = true;
  button.onclick = function() {
    OnClick();
    button.innerHTML = "Hack Again";
    button.style.display = "none";
    czywyswietlany = false;
    button.onclick = function() {
      clearInterval(showanswers);
      OnClick();
      button.innerHTML = "Hack Again";
      button.style.display = "none";
      czywyswietlany = false;
      alert("odpowiedzi zostały pobrane możesz rozpocząć quiz, by ponownie wyświetlić przycisk do pobierania odpowiedzi kliknij h, pamiętaj przy rozpoczęciu następnego quizu musisz pobrać je ponownie");
    }
    alert("odpowiedzi zostały pobrane możesz rozpocząć quiz, by ponownie wyświetlić przycisk do pobierania odpowiedzi kliknij h, pamiętaj przy rozpoczęciu następnego quizu musisz pobrać je ponownie");
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
      czywyswietlany = false;
      } else {
        button.style.display = "block";
        czywyswietlany = true;
      }
    }
  });
