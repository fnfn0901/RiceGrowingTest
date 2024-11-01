<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);  // 오류 표시 끄기 (프로덕션 환경)

require 'vendor/autoload.php';

use Dotenv\Dotenv;
use Aws\S3\S3Client;
use Aws\Exception\AwsException;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

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

    // 디버깅용 로그 추가
    error_log("JSON 응답 전송: " . json_encode(['count' => $data['count']]));

    header('Content-Type: application/json');
    echo json_encode(['count' => $data['count']]);
} catch (Exception $e) {
    error_log("예외 발생: " . $e->getMessage()); // 예외 메시지를 로그에 기록
    echo json_encode(['error' => $e->getMessage()]);
}