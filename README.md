<p align="center">
  <img src = "https://github.com/user-attachments/assets/de4d3f00-526f-4e0c-bc58-e36cc3c7ab23" width ="400">
</p>
쌀 키우기 테스트는 [스푼랩](http://www.ssalfriends.com/)과의 협업 프로젝트로, ’쌀을 키우는 과정’을 스토리화하여 사용자가 8가지 질문에 답하면, 이를 기반으로 쌀과 관련된 가장 적합한 직업을 추천하는 웹 애플리케이션입니다.

이 프로젝트는 ‘쌀’을 단순한 음식 재료로만 인식하지 않고, 흥미로운 요소로 접근하여 사용자가 새로운 관점에서 쌀을 경험할 수 있도록 제작되었습니다.

## 최종 화면

<p align="center">
  <img src = "https://github.com/user-attachments/assets/5894248d-91a9-496e-8186-97edbc15fc81" width = "400">
</p>

## 테스트 링크

[쌀 키우기 테스트 바로가기](http://13.125.23.77)


## 프로젝트 구조

```
RiceGrowingTest
├── .github/workflows
│   └── s3-deploy.yml
├── .vscode
│   └── settings.json
├── assets
│   ├── css
│   ├── data
│   ├── fonts
│   ├── images
│   └── js
├── favicon.ico
├── index.html
├── loading.html
├── question.html
├── result.html
└── update_participants.php

```

## 사용된 기술

- **Frontend**
    - **기술 스택**: ****HTML, CSS, JavaScript
    - **버전 관리**: Git, GitHub
    - **CI/CD**: GitHub Actions
    - **정적 파일 배포**: AWS S3 (정적 호스팅)
- **Backend**
    - **기술 스택:** PHP
    - **데이터 통신**: JSON 형식
    - **역할**: 참여자 수 카운트
- **Cloud Services**: AWS S3, AWS EC2, AWS IAM
    
  <img src = "https://github.com/user-attachments/assets/124e4c55-510b-4f3b-a561-0e71931c5eef">

## 주요 기능

1. **참여자 수 업데이트**:
    - JavaScript를 이용해 서버와 통신하여 참여자 수를 실시간으로 업데이트.
    - PHP 서버는 JSON 데이터를 반환하여 클라이언트와의 통신을 유지.
2. **쌀 키우기 진행 과정**:
    - 8가지 질문으로 구성된 인터랙티브 테스트.
    - 각 질문의 선택에 따라 결과가 달라짐.
3. **결과 분석 및 추천**:
    - 테스트 결과를 바탕으로 쌀과 연관된 직업 추천.

## 도전과제 및 교훈

### 📌 트러블슈팅

- **문제**:
    - JavaScript와 PHP 간의 JSON 데이터 통신에서 파싱 오류 발생.
- **분석**:
    1. 서버 응답 형식을 텍스트로 확인.
    2. PHP에서 JSON 응답 형식 문제 수정.
    3. 클라이언트에서 JSON 파싱 방식 최적화.
- **해결**:
    1. response.json()을 사용하여 JSON 데이터 파싱.
    2. PHP에서 json_encode와 Content-Type: application/json 설정으로 일관된 JSON 응답 보장.
- **결과 코드**:
    1. JavaScript
        
        ```jsx
        function updateParticipants() {
        fetch('<http://3.35.52.206/update_participants.php>')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                if (data.count !== undefined) {
                    participantsText.textContent = `${data.count}명`;
                } else {
                    console.error("JSON 응답에서 count를 찾을 수 없습니다.", data);
                }
            })
            .catch(error => {
                console.error('참여자 수 불러오기 실패:', error);
                participantsText.textContent = '불러오기 실패';
            });
        }
        ```
        
    2. PHP
        
        ```
        header('Content-Type: application/json');
        try {
        	$s3Result = $s3->getObject(['Bucket' => $bucket, 'Key' => $key]);
        	$data = json_decode($s3Result['Body'], true);
        	$data['count'] = isset($data['count']) ? $data['count'] + 1 : 1;
          $s3->putObject([
        		'Bucket' => $bucket,
        		'Key' => $key,
            'Body' => json_encode($data),
            'ContentType' => 'application/json'
          ]);
          echo json_encode(['count' => $data['count']]);
        } catch (Exception $e) {
        	echo json_encode(['error' => $e->getMessage()]);
        }
        ```
        

---

- **문제**:
    - 과도하게 화질이 높은 이미지를 사용하여 초기 로딩 속도가 느려지는 UX 문제가 발생.
- **해결**:
    - 이미지 파일의 크기를 줄여 로딩 속도를 대폭 개선.
    - 결과적으로 페이지 로딩 시간이 단축되고 사용자 경험이 향상됨.

---

**성과**

- 쌀키우기 테스트 프로젝트와 [가나다 퍼즐 게임 프로젝트](https://github.com/fnfn0901/SpunPuzzleGame)의 성과로 **잇다 서포터즈 6기 활동**에서 **우수 서포터즈 표창**을 수상
