const aws = require('aws-sdk');

const s3 = new aws.S3();

const upload = (image, itemName, bucketName) => {
  buf = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64');
  const params = {
    Bucket: bucketName, 
    Key: itemName, 
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  };
  s3.putObject(params, function(err, data){
      if (err) { 
        console.log(err);
        console.log('Error uploading data: ', data); 
      } else {
        console.log('succesfully uploaded the image!');
      }
  });
}


module.exports = upload;