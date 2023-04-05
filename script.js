setInterval(function(){
    let app_header = document.querySelector('.app-header-container');
    if (app_header) {
    app_header.remove();
}
    let pin = window.location.href;
    let url = `https://api.quizit.online/quizizz/answers?pin=${pin}`;
    fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            let answers = data['data']['answers'];
            let questions_and_answers = [];

            // Iterate through all the answers and extract the questions and answers
            for (let i = 0; i < answers.length; i++) {
                let question = answers[i]['question']['text'];
                let question_cut = question.replace("<p>", "").replace("</p>", "");
                let answer = '';
                for (let j = 0; j < answers[i]['answers'].length; j++) {
                    answer += answers[i]['answers'][j]['text'] + " ";
                }
                let answer_cut = answer.replace("<p>", "").replace("</p>", "");
                let question_and_answer = {'pytanie': question_cut, 'odpowiedz': answer_cut};
                questions_and_answers.push(question_and_answer);
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
                        break;
                    }
                }

                // Add the answer to the top of the page
                let answer_element = document.createElement('div');
                answer_element.innerHTML = answer;
                answer_element.style.backgroundColor = 'green';
                answer_element.style.padding = '10px';
                answer_element.style.color = 'white';
                answer_element.style.fontWeight = 'bold';
                document.body.insertBefore(answer_element, document.body.firstChild);

                // Remove the answer element after 6 seconds
                setTimeout(function(){
                    answer_element.remove();
                }, 6000);
            } else {
                console.log('Nie znaleziono pytania na stronie.');
            }
        })
        .catch(error => console.error(error));
}, 7000);
