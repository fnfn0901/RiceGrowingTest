<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


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

    $s3->putObject([
        'Bucket' => $bucket,
        'Key'    => $key,
        'Body'   => json_encode($data),
        'ContentType' => 'application/json'
    ]);

    header('Content-Type: application/json');
    echo json_encode(['count' => $data['count']]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>