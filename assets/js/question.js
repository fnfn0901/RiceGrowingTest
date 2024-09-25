document.addEventListener('DOMContentLoaded', function() {
    const choiceA = document.querySelector('.choice-a');
    const choiceB = document.querySelector('.choice-b');

    choiceA.addEventListener('click', function() {
        console.log('A 선택됨');
        // 다음 질문으로 넘어가는 로직 추가
    });

    choiceB.addEventListener('click', function() {
        console.log('B 선택됨');
        // 다음 질문으로 넘어가는 로직 추가
    });
});