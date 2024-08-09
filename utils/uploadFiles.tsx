import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import { useState } from 'react';
import { Buffer } from 'buffer';
import awsconfig from '../aws-export';

const s3 = new AWS.S3({
    region: awsconfig.Storage.AWSS3.region,
    accessKeyId: awsconfig.Storage.AWSS3.accessKey,
    secretAccessKey: awsconfig.Storage.AWSS3.secretKey,
});

export function useS3Upload() {
    const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
    const [reading, setReading] = useState<{ [key: string]: boolean }>({});
    const [uri, setUri] = useState<string | undefined>(undefined);
    const [s3Files, setS3Files] = useState([]);

    const uploadtos3 = async (file) => {
        const chunkSize = 5 * 1024 * 1024;
        try {
            setUri(file.uri);
            const filePath = file.uri;
            setReading(prevReading => ({
                ...prevReading,
                [file.fileName ? file.fileName : file.name]: true,
            }));

            const fileStats = await RNFS.stat(filePath);
            const fileSize = fileStats.size;
            const totalParts = Math.ceil(fileSize / chunkSize);
            const timestamp = new Date().toISOString();
            const uniqueKey = `${timestamp}_${file.fileName ? file.fileName : file.name}`;

            const multipartParams = {
                Bucket: awsconfig.Storage.AWSS3.bucket,
                Key: uniqueKey,
                ContentType: file.mimeType,
                ACL: 'public-read'
            };

            const multipartUpload = await s3.createMultipartUpload(multipartParams).promise();
            const uploadId = multipartUpload.UploadId;
            const partPromises = [];

            for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
                const start = (partNumber - 1) * chunkSize;
                const end = Math.min(start + chunkSize, fileSize);
                const partBuffer = await RNFS.read(filePath, chunkSize, start, 'base64');
                const buffer = Buffer.from(partBuffer, 'base64');

                const partParams = {
                    Body: buffer,
                    Bucket: awsconfig.Storage.AWSS3.bucket,
                    Key: uniqueKey,
                    PartNumber: partNumber,
                    UploadId: uploadId,
                };

                const partPromise = s3.uploadPart(partParams).promise();
                partPromise.then(() => {
                    const progressPercentage = Math.round((partNumber / totalParts) * 100);
                    setUploadProgress(prev => ({
                        ...prev,
                        [file.fileName ? file.fileName : file.name]: progressPercentage,
                    }));
                });
                partPromises.push(partPromise);
            }
            const partsData = await Promise.all(partPromises);
            const completeParams = {
                Bucket: awsconfig.Storage.AWSS3.bucket,
                Key: uniqueKey,
                MultipartUpload: {
                    Parts: partsData.map((data, index) => ({
                        ETag: data.ETag,
                        PartNumber: index + 1,
                    })),
                },
                UploadId: uploadId,
            };

            await s3.completeMultipartUpload(completeParams).promise();
            const url = `https://${awsconfig.Storage.AWSS3.bucket}.s3.${awsconfig.Storage.AWSS3.region}.amazonaws.com/${uniqueKey}`;
            return url;
        } catch (error) {
            console.error('Error uploading file in chunks:', error);
            setReading(prevReading => ({
                ...prevReading,
                [file.fileName ? file.fileName : file.name]: false,
            }));
            throw error;
        }
    };

    const fetchS3Files = async () => {
        try {
            const response = await s3.listObjects({ Bucket: awsconfig.Storage.AWSS3.bucket }).promise();
            const files = response.Contents?.map(item => ({
                key: item.Key,
                url: s3.getSignedUrl('getObject', {
                    Bucket: awsconfig.Storage.AWSS3.bucket,
                    Key: item.Key,
                    Expires: 60 * 60
                })
            })) || [];
            setS3Files(files);
        } catch (error) {
            console.error('Error fetching S3 files:', error);
        }
    };

    return { reading, uploadtos3, uri, uploadProgress, fetchS3Files, s3Files };
}
