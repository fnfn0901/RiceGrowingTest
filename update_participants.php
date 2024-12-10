<?php
// 오류 보고 설정
error_reporting(E_ALL);
ini_set('display_errors', 1);

// AWS SDK for PHP 로드
require '/var/www/html/vendor/autoload.php';

use Aws\S3\S3Client;
use Aws\Exception\AwsException;

// AWS S3 클라이언트 설정
$s3 = new S3Client([
    'version' => 'latest',
    'region'  => 'ap-northeast-2',
]);

// S3 버킷 정보
$bucket = 'ssalbtis3bucket';
$key = 'assets/data/participants.json';

// JSON 응답 헤더 설정
header('Content-Type: application/json');

// 출력 버퍼 시작
ob_start();

// 요청 매개변수 확인 (참여자 수 조회 또는 증가)
$action = isset($_GET['action']) ? $_GET['action'] : 'fetch';

try {
    // S3에서 participants.json 파일 가져오기
    $s3Result = $s3->getObject([
        'Bucket' => $bucket,
        'Key'    => $key,
    ]);

    // 파일 내용(JSON 데이터) 파싱
    $data = json_decode($s3Result['Body'], true);

    if ($action === 'increment') {
        // 참여자 수 증가
        if (isset($data['count'])) {
            $data['count'] += 1;
        } else {
            $data['count'] = 1;
        }

        // 수정된 데이터를 S3에 다시 업로드
        $s3->putObject([
            'Bucket' => $bucket,
            'Key'    => $key,
            'Body'   => json_encode($data),
            'ContentType' => 'application/json',
        ]);
    }

    // JSON 형식으로 응답 전송
    echo json_encode(['count' => $data['count']]);

} catch (AwsException $e) {
    // 오류 발생 시 오류 메시지 반환
    error_log("S3 오류: " . $e->getMessage());
    echo json_encode(['error' => "Failed to fetch data from S3: " . $e->getMessage()]);
}

// 출력 버퍼 내용만 출력
ob_end_flush();