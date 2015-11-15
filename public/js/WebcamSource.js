WebcamSource = function(videoDeviceId){

    this.options = {

        aspectRatio: 16 / 9,
        video: true,
        audio: false,
        width: 640

    };

    this.options.height = (1 / this.options.aspectRatio) * this.options.width;

    this.video = document.createElement('video');
    this.video.autoplay = true;

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.options.width;
    this.canvas.height = this.options.height;

    this.localMediaStream = null;

    // http://www.html5rocks.com/en/tutorials/getusermedia/intro/
    // https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js

    var constraints = {
        video: {deviceId: videoDeviceId ? {exact: videoDeviceId} : undefined}
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(this.startVideo.bind(this))
      .catch(this.errorCallback.bind(this));

};

WebcamSource.prototype = {

    errorCallback: function(e) {
        alert('Reeeejected!', e);
    },

    startVideo: function(stream) {
        this.video.srcObject = stream;
    },

    /**
     *
     * @param video
     * @param canvasContext
     * @returns {ImageData}
     */

    getImageData: function(){

        this.context.drawImage(this.video, 0, 0, this.options.width, this.options.height);

        return this.context.getImageData(0, 0, this.options.width, this.options.height);

    }

};
