// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';

// uploadFile(file) {
//   const contentType = file.type;
//   const bucket = new S3(
//     {
//       accessKeyId: 'AKIAIV5RC7OMX4BD7BUA',
//       secretAccessKey: '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',
//       region: 'US East (N. Virginia)'
//     }
//   );
//   const params = {
//     Bucket: 'opticloset',
//     Key: this.FOLDER + file.name,
//     Body: file,
//     ACL: 'public-read',
//     ContentType: contentType
//   };
//   bucket.upload(params, function (err, data) {
//     if (err) {
//       console.log('There was an error uploading your file: ', err);
//       return false;
//     }
//     console.log('Successfully uploaded file.', data);
//     return true;
//   });
//   //for upload progress   
//   /*bucket.upload(params).on('httpUploadProgress', function (evt) {
//             console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
//         }).send(function (err, data) {
//             if (err) {
//                 console.log('There was an error uploading your file: ', err);
//                 return false;
//             }
//             console.log('Successfully uploaded file.', data);
//             return true;
//         });*/
// }