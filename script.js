let showanswers;
function OnClick() {
    // Pobieramy adres URL bieżącej strony
    let pin = window.location.href;
    // Tworzymy adres URL API Quizizz, do którego będziemy wysyłać zapytania
    let url = `https://api.quizit.online/quizizz/answers?pin=${pin}`;
    console.log("pobierano odpowiedzi");
    
    // Wysyłamy zapytanie GET za pomocą funkcji `fetch()`
    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        // Tworzymy tablicę `questions_and_answers`, w której będziemy przechowywać pytania i odpowiedzi
        let answers = data['data']['answers'];
        let questions_and_answers = [];
  
        // Iterujemy przez wszystkie pytania i odpowiedzi i dodajemy je do tablicy `questions_and_answers`
        for (let i = 0; i < answers.length; i++) {
          let question = answers[i]['question']['text'];
          let question_cut = question.replace("<p>", "").replace("</p>", "");
          let answer = '';
          for (let j = 0; j < answers[i]['answers'].length; j++) {
            answer += answers[i]['answers'][j]['text'] + ", ";
          }
          let answer_cut = answer.replace("<p>", "").replace("</p>", "");
          let question_and_answer = { 'pytanie': question_cut, 'odpowiedz': answer_cut };
          questions_and_answers.push(question_and_answer);
        }
        
        // Po zakończeniu iteracji, wywołujemy funkcję `Hack()` i przekazujemy do niej tablicę `questions_and_answers`

        showanswers = setInterval(() => Hack(questions_and_answers, pin), 3000);
      })
      .catch(error => {
        console.error('Wystąpił błąd:', error);
      });
  }
  
  // Deklarujemy funkcję `Hack()` i przekazujemy do niej tablicę `questions_and_answers`
  function Hack(questions_and_answers) {
    let app_header = document.querySelector('.app-header-container');
    if (app_header) {
        app_header.parentNode.removeChild(app_header);
    }
    // Find an element similar to "<p style="display:inline">What is an adverb?</p>" on the page
    let question_element = document.querySelector('p[style="display:inline"]');

    if (question_element) {
        // Get the value of the question
        let question = question_element.textContent.trim();

        // Find the answer in the JSON data
        let answer = '';
        for (let i = 0; i < questions_and_answers.length; i++) {
            if (questions_and_answers[i]['pytanie'] === question) {
                answer = questions_and_answers[i]['odpowiedz'];
                answer = answer.slice(0, -2);
                break;
            }
        }

        // Add the answer to the top of the page
        let answer_element = document.createElement('div');
        answer_element.innerHTML = answer;
        answer_element.style.backgroundColor = 'green';
        answer_element.style.padding = '7px';
        answer_element.style.color = 'white';
        answer_element.style.fontWeight = 'bold';
        document.body.insertBefore(answer_element, document.body.firstChild);

        // Remove the answer element after 6 seconds
        setTimeout(function(){
            answer_element.remove();
        }, 3000);
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
    // Dodajemy styl CSS
    button.style.backgroundColor = 'green';
    button.style.color = "white";
    button.style.border = "2px solid white"
  });
  
  button.addEventListener('mouseleave', function() {
    // Przywracamy pierwotny styl
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
 
