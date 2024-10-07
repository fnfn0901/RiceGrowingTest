import { jobs, addScore } from './jobData.js'; // jobData.js에서 jobs와 addScore를 가져옵니다.
import { questions } from './situation.js';

// 텍스트 타이핑 애니메이션 함수
function typeText(element, text, speed, callback) {
    let i = 0;
    let isTag = false;
    let html = "";

    function typeCharacter() {
        if (i < text.length) {
            const currentChar = text.charAt(i);

            if (currentChar === "<") {
                isTag = true; // HTML 태그 시작을 감지
            }

            html += currentChar; // 태그나 텍스트 모두 html에 추가
            if (!isTag) {
                element.innerHTML = html; // 태그가 아니면 한 글자씩 추가
            }

            if (currentChar === ">") {
                isTag = false; // HTML 태그 끝을 감지하고 태그 전체를 한 번에 추가
                element.innerHTML = html; // 태그가 끝나면 전체 태그를 추가
            }

            i++; // 다음 글자로 이동
            setTimeout(typeCharacter, speed); // speed에 맞춰 다음 글자 추가
        } else {
            if (callback) callback(); // 타이핑이 완료된 후 callback 실행
        }
    }

    typeCharacter(); // 타이핑 애니메이션 시작
}

// 사용자의 선택에 따른 결과 처리
function processUserAnswers(answers) {
    answers.forEach((answer, index) => {
        addScore(index, answer); // 점수 추가
    });

    let maxScore = Math.max(...jobs.map(job => job.score));
    let minScore = Math.min(...jobs.map(job => job.score));

    let finalJobs = jobs.filter(job => job.score === maxScore);
    let worstJobs = jobs.filter(job => job.score === minScore);

    let bestJob = finalJobs.length > 1 
        ? finalJobs[Math.floor(Math.random() * finalJobs.length)].name 
        : finalJobs[0].name;

    let worstJob = worstJobs.length > 1 
        ? worstJobs[Math.floor(Math.random() * worstJobs.length)].name 
        : worstJobs[0].name;

    return { bestJob, worstJob };
}

document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;
    let userAnswers = [];
    let clickable = false;

    const questionText = document.querySelector('.question-text');
    const imageBox = document.querySelector('.image-box img');
    const choiceA = document.querySelector('.choice-a .choice-text');
    const choiceB = document.querySelector('.choice-b .choice-text');
    const hearts = document.querySelectorAll('.progress-bar img');
    const choiceABox = document.querySelector('.choice-a');
    const choiceBBox = document.querySelector('.choice-b');

    function updateQuestion() {
        clickable = false;
        const currentQuestion = questions[currentQuestionIndex];
        imageBox.src = currentQuestion.image;
        typeText(questionText, currentQuestion.question, 50, function() {
            clickable = true;
        });
        choiceA.innerHTML = currentQuestion.choices[0];
        choiceB.innerHTML = currentQuestion.choices[1];

        hearts.forEach((heart, i) => {
            heart.src = i <= currentQuestionIndex ? './assets/images/filledHeart.svg' : './assets/images/emptyHeart.svg';
        });

        resetChoices();
    }

    function nextQuestion() {
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            updateQuestion();
        } else {
            const result = processUserAnswers(userAnswers);
            window.location.href = 'loading.html?bestJob=' + encodeURIComponent(result.bestJob) + '&worstJob=' + encodeURIComponent(result.worstJob);
        }
    }

    function handleChoiceSelection(choiceBox, choiceText, choiceValue) {
        if (!clickable) return;
        clickable = false;
    
        userAnswers.push(choiceValue);
        console.log("User Answer:", choiceValue); // 선택한 값 확인
    
        choiceBox.querySelector('img').src = './assets/images/selected.png';
        choiceText.style.color = '#ffffff';
    
        setTimeout(nextQuestion, 1000);
    }

    function resetChoices() {
        choiceABox.querySelector('img').src = './assets/images/unselected.png';
        choiceA.style.color = '#000000';
        choiceBBox.querySelector('img').src = './assets/images/unselected.png';
        choiceB.style.color = '#000000';
    }

    choiceABox.addEventListener('click', function() {
        handleChoiceSelection(choiceABox, choiceA, 'A');
    });

    choiceBBox.addEventListener('click', function() {
        handleChoiceSelection(choiceBBox, choiceB, 'B');
    });

    updateQuestion();
});