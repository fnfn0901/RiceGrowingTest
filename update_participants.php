<?php
// Composer의 autoload 파일을 포함합니다.
require 'vendor/autoload.php';

// Dotenv 클래스를 사용하기 위해 네임스페이스를 가져옵니다.
use Dotenv\Dotenv;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;

// .env 파일에서 환경 변수를 로드합니다.
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// S3 클라이언트 설정
$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'ap-northeast-2',
    'credentials' => [
        'key'    => getenv('AWS_ACCESS_KEY_ID'),      // .env 파일에서 AWS_ACCESS_KEY_ID 가져오기
        'secret' => getenv('AWS_SECRET_ACCESS_KEY'),    // .env 파일에서 AWS_SECRET_ACCESS_KEY 가져오기
    ],
]);

$bucket = 'ssalbtis3bucket';  // S3 버킷 이름
$key = 'assets/data/participants.json';  // S3 객체 키

try {
    // S3에서 participants.json 파일 가져오기
    $result = $s3->getObject([
        'Bucket' => $bucket,
        'Key'    => $key,
    ]);

    // 파일 내용 읽고 JSON 디코딩
    $data = json_decode($result['Body'], true);
    $data['count'] += 1;  // 참여자 수 증가

    // JSON 인코딩 후 다시 S3에 저장
    $s3->putObject([
        'Bucket' => $bucket,
        'Key'    => $key,
        'Body'   => json_encode($data),
        'ContentType' => 'application/json'
    ]);

    // 새로운 참여자 수를 JSON 형식으로 반환
    echo json_encode(['count' => $data['count']]);

} catch (AwsException $e) {
    // 오류가 발생한 경우 오류 메시지를 출력합니다.
    echo "Error: " . $e->getMessage();
}
?>