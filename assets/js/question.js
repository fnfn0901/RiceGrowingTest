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

document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: `농사 시작!<br>오늘 첫날인데 무엇을 할까요?`,
            image: './assets/images/question01.png',
            choices: ['A. 일단 이웃들과 친해져야지! 파종 파티를 열어볼까?', 'B. 여유롭게 논 주변을 천천히 둘러보자.']
        },
        {
            question: `갑자기 비가 쏟아집니다!<br>당신의 대처는?`,
            image: './assets/images/question02.png',
            choices: ['A. 나를 막을 순 없지! 우비 입고 출동!', 'B. 비 오는 날은 쉬라고 있는 거지. 휴식 모드로 전환!']
        },
        {
            question: '논에 잡초가 가득 자라고 있어요. 어떻게 할까요?',
            image: './assets/images/question03.png',
            choices: [`A. 잡초도 하나의 생명!<br>그냥 두자.`, 'B. 잡초는 작물의 적! 당장 뽑아내야지.']
        },
        {
            question: `수확철이 다가오고 있습니다.<br>당신의 수확 계획은?`,
            image: './assets/images/question04.png',
            choices: ['A. 특별한 요리를 도전해볼까? 쌀 젤라또나 쌀 피자는 어때?', 'B. 쌀은 나눌 때 더 맛있지! 이웃들과 나눠 먹으면 좋겠어.']
        },
        {
            question: '올해도 풍년입니다 ! 수확한 쌀을 어떻게 활용할까요?',
            image: './assets/images/question05.png',
            choices: ['A. 특별한 요리를 도전해 볼까? 쌀 아이스크림이나 쌀 피자는 어때?', 'B. 쌀은 나눌 때 더 맛있지! 이웃들과 나눠 먹으면 좋겠어.']
        },
        {
            question: `농사 성공을 축하하는 파티를 열려고 합니다.<br>어떤 스타일로 열까요?`,
            image: './assets/images/question06.png',
            choices: ['A. 혼자만의 시간을 갖고 조용히 힐링하는 게 나만의 축하 방식!', 'B. 기쁨은 나누면 두 배! 이웃들과 함께 신나는 파티를 열자!']
        },
        {
            question: '긴 휴경기, 당신은 이 시간을 어떻게 보낼까요?',
            image: './assets/images/question07.png',
            choices: ['A. 조용히 책을 읽거나 음악을 들으면서 에너지를 충전!', 'B. 야외 활동이나 운동을 하며 활력을 채워보자!']
        },
        {
            question: `올해 성공적으로 농사를 마쳤습니다.<br>내년을 준비할 때 당신은?`,
            image: './assets/images/question08.png',
            choices: ['A. 최신 농업 기술을 공부해서 좀 더 효율적으로 일해보자!', 'B. 자연스럽게, 친환경 방식으로 천천히 도전해보자.']
        },
    ];

    let currentQuestionIndex = 0;
    const totalQuestions = questions.length;
    let clickable = false;  // 클릭 가능 여부 플래그를 초기에는 false로 설정

    const questionText = document.querySelector('.question-text');
    const imageBox = document.querySelector('.image-box img');
    const choiceA = document.querySelector('.choice-a .choice-text');
    const choiceB = document.querySelector('.choice-b .choice-text');
    const hearts = document.querySelectorAll('.progress-bar img');
    const choiceABox = document.querySelector('.choice-a');
    const choiceBBox = document.querySelector('.choice-b');

    function updateQuestion() {
        clickable = false; // 새로운 질문이 시작되면 클릭을 막음
        const currentQuestion = questions[currentQuestionIndex];
        imageBox.src = currentQuestion.image;
        typeText(questionText, currentQuestion.question, 50, function() {
            clickable = true; // 타이핑이 끝나면 클릭 가능하게 설정
        });
        choiceA.innerHTML = currentQuestion.choices[0];
        choiceB.innerHTML = currentQuestion.choices[1];

        // 진행률 하트 업데이트
        for (let i = 0; i < hearts.length; i++) {
            if (i <= currentQuestionIndex) {
                hearts[i].src = './assets/images/filledHeart.svg';
            } else {
                hearts[i].src = './assets/images/emptyHeart.svg';
            }
        }

        resetChoices();
    }

    function nextQuestion() {
        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            updateQuestion();
        } else {
            console.log('모든 질문이 완료되었습니다.');
        }
    }

    function handleChoiceSelection(choiceBox, choiceText) {
        if (!clickable) return; // 클릭 불가능할 때는 함수 종료
        clickable = false;  // 클릭을 잠금

        // 선택된 이미지와 텍스트 스타일 변경
        choiceBox.querySelector('img').src = './assets/images/selected.png';
        choiceText.style.color = '#ffffff';

        // 1초 후에 다음 질문으로 이동
        setTimeout(nextQuestion, 1000);
    }

    function resetChoices() {
        choiceABox.querySelector('img').src = './assets/images/unselected.png';
        choiceA.style.color = '#000000';
        choiceBBox.querySelector('img').src = './assets/images/unselected.png';
        choiceB.style.color = '#000000';
    }

    // 선택 A 클릭 이벤트
    choiceABox.addEventListener('click', function() {
        handleChoiceSelection(choiceABox, choiceA);
    });

    // 선택 B 클릭 이벤트
    choiceBBox.addEventListener('click', function() {
        handleChoiceSelection(choiceBBox, choiceB);
    });

    // 첫 번째 질문을 화면에 표시
    updateQuestion();
});