<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);  // 오류 표시 켜기 (디버깅용)

require 'vendor/autoload.php';

use Dotenv\Dotenv;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;

// .env 파일 경로를 명시적으로 지정
$dotenv = Dotenv::createImmutable('/var/www/html');
$dotenv->load();

// 환경 변수 로드 테스트 (필요 시 주석 해제하여 확인)
// var_dump(getenv('AWS_ACCESS_KEY_ID'));
// var_dump(getenv('AWS_SECRET_ACCESS_KEY'));

$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'ap-northeast-2',
    'credentials' => [
        'key'    => getenv('AWS_ACCESS_KEY_ID'),
        'secret' => getenv('AWS_SECRET_ACCESS_KEY'),
    ],
]);

$bucket = 'ssalbtis3bucket';
$key = 'assets/data/participants.json';

header('Content-Type: application/json');

try {
    $s3Result = $s3->getObject([
        'Bucket' => $bucket,
        'Key'    => $key,
    ]);

    $data = json_decode($s3Result['Body'], true);

    if (isset($data['count'])) {
        $data['count'] += 1;
    } else {
        $data['count'] = 1;
    }

    // 참여자 수 업데이트
    $s3->putObject([
        'Bucket' => $bucket,
        'Key'    => $key,
        'Body'   => json_encode($data),
        'ContentType' => 'application/json',
    ]);

    // 디버깅용 로그 추가
    error_log("JSON 응답 전송: " . json_encode(['count' => $data['count']]));

    echo json_encode(['count' => $data['count']]);
} catch (AwsException $e) {
    error_log("AWS 예외 발생: " . $e->getMessage()); // 예외 메시지를 로그에 기록
    echo json_encode(['error' => 'Failed to fetch data from S3: ' . $e->getMessage()]);
} catch (Exception $e) {
    error_log("일반 예외 발생: " . $e->getMessage()); // 예외 메시지를 로그에 기록
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}
