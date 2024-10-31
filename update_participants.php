<?php
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

try {
    $result = $s3->getObject([
        'Bucket' => $bucket,
        'Key'    => $key,
    ]);

    // 파일 내용을 읽고 JSON 디코딩
    $data = json_decode($result['Body'], true);
    
    if (isset($data['count'])) {
        $data['count'] += 1;  // 참여자 수 증가
    } else {
        $data['count'] = 1;  // 참여자가 없으면 1로 초기화
    }

    // JSON 인코딩 후 다시 S3에 저장
    $s3->putObject([
        'Bucket' => $bucket,
        'Key'    => $key,
        'Body'   => json_encode($data),
        'ContentType' => 'application/json'
    ]);

    echo json_encode(['count' => $data['count']]);

} catch (AwsException $e) {
    echo "Error: " . $e->getMessage();
}
?>