'use strict';

angular.module('fullstackJobApp')
	.controller('AddAchievementCtrl', ['$state', '$scope', 'Achievement', 'Upload',
		function ($state, $scope, Achievement, Upload) {
			var self = this;

			self.achievement = {
				pics:[],
				description: '',
				skills: [
					{
						name: '',
						learntime: '',
						link: ''
					}
				]
			};

			var MAX = Math.pow(2, 32);
    		var MIN = 1;
    		self.loaded = 0;

			self.save = function (form) {
				if (form.$valid) {
					Achievement.create(self.acheivement, function () {
						$state.go('view-achievements');
					});
				}
			};

			self.addkill = function () {
				self.achievement.skills.push({
						name: '',
						learntime: '',
						link: ''
					});
			};
			/*

			self.upload = function (files) {
		      var now = new Date().getTime();
		      var nowStr = now.toString();
		      var rand = (Math.floor(Math.random() * (MAX - MIN)) + MIN).toString();
		      var randStr = rand.toString();

		      if (files.length === 1) {
		        var file = files[0];
		        var filename = nowStr + '_' + randStr + '_' + file.name.replace(/[^0-9a-z\.]+/gi, '');
		        Upload.upload({
		          url: 'https://easybuy-products.s3-ap-southeast-1.amazonaws.com/', //S3 upload url including bucket name
		          method: 'POST',
		          fields : {
		            key: filename, // the key to store the file on S3, could be file name or customized
		            AWSAccessKeyId: 'AKIAIDILEVCF7N223VSQ',
		            acl: 'public-read', // sets the access to the uploaded file in the bucket: private or public
		            policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogImVhc3lidXktcHJvZHVjdHMifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInB1YmxpYy1yZWFkIn0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRDb250ZW50LVR5cGUiLCAiIl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRmaWxlbmFtZSIsICIiXSwKICAgIFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLCAwLCA1MjQyODgwMDBdCiAgXQp9', // base64-encoded json policy (see article below)
		            signature: 'gaavGW7Y1MaSJ6VDLUVjDs4eGLw=', // base64-encoded signature based on policy string (see article below)
		            'Content-Type': file.type !== '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
		            filename: filename // this is needed for Flash polyfill IE8-9
		          },
		          file: file,
		        }).then(function () {
		          self.product.imageName = filename;
		        }, function () {

		        }, function (evt) {
		          self.loaded = parseInt(100 * evt.loaded / evt.total, 10);
		          console.log('progress: ' + self.loaded + '% file :'+ evt.config.file.name);
		        });
		      }
		    };*/


		}]);