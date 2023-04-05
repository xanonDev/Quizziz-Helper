<h1>Quizziz Helper</h1>
Quizziz Helper to rozszerzenie do przeglądarek internetowych, które automatycznie pobiera odpowiedzi do pytań w Quizizz na platformie Quizit.

<h2>Jak korzystać z rozszerzenia?</h2>
1.Zainstaluj rozszerzenie w przeglądarce internetowej. <br>
2.Wejdź na stronę Quizizz. <br>
Odpowiedzi pojawią się automatycznie, gdy pojawi się pytanie.
<h2>Jak działa rozszerzenie? </h2>
Rozszerzenie wykorzystuje interwał czasowy setInterval(), aby uruchamiać kod co 7 sekund. Kod ten sprawdza, czy na stronie pojawiło się pytanie, a jeśli tak, pobiera odpowiedzi do bieżącej gry z API Quizit. Następnie analizuje dane odpowiedzi, aby wyodrębnić pytania i odpowiedzi i przechowuje je w tablicy.
<br>
Rozszerzenie następnie przeszukuje stronę w poszukiwaniu elementu zawierającego bieżące pytanie i dopasowuje go z odpowiedzią z tablicy. Jeśli odnajdzie dopasowanie, automatycznie wyświetli odpowiedź na górze strony.

<h2> Ostrzeżenie </h2>
rozszerzenie jest w fazie testów <br>
Zalecamy korzystanie z rozszerzenia wyłącznie w celach naukowych i testowych, a nie w celu oszukiwania w Quizizz.
