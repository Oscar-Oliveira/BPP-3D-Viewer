var THREEx = THREEx || {};

(function(){
	
    var toDataURL = function(renderer, mimetype) {
		mimetype = mimetype || "image/jpeg";
		var dataUrl = renderer.domElement.toDataURL(mimetype, 1);
		return dataUrl;
	}

    var _aspectResize = function(srcUrl, dstW, dstH, callback){
	
        var cpuScaleAspect	= function(maxW, maxH, curW, curH){
			var ratio = curH / curW;
			if( curW >= maxW && ratio <= 1 ) { 
				curW = maxW;
				curH = maxW * ratio;
			} else if(curH >= maxH) {
				curH = maxH;
				curW = maxH / ratio;
			}
			return { width: curW, height: curH };
		}
        
		var onLoad = function(){
			var canvas = document.createElement('canvas');
			canvas.width = dstW;
            canvas.height = dstH;
			var ctx	= canvas.getContext('2d');

			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			var scaled = cpuScaleAspect(canvas.width, canvas.height, image.width, image.height);

			var offsetX	= (canvas.width - scaled.width) / 2;
			var offsetY	= (canvas.height - scaled.height) / 2;
			ctx.drawImage(image, offsetX, offsetY, scaled.width, scaled.height);

			var mimetype = "image/jpeg";
            var newDataUrl = canvas.toDataURL(mimetype, 1);

            callback && callback(newDataUrl)
		}.bind(this);

		var image = new Image();
		image.onload = onLoad;
		image.src = srcUrl;
	}
	
    function call(renderer, opts) {
		opts = opts	|| {};
		var width = opts.width;
		var height = opts.height;
		var callback = opts.callback || function(url) {
			window.open(url, "name-" + Math.random());
		};

		var dataUrl	= this.toDataURL(renderer);
        if( width === undefined && height === undefined ) {
            callback( dataUrl )
        } else {
            _aspectResize(dataUrl, width, height, callback);		
        }
		
	}
    
	var bindKey	= function(renderer, opts) {
		opts = opts	|| {};
		var charCode = opts.charCode || 'p'.charCodeAt(0);
		var width = opts.width;
		var height = opts.height;
		var callback = opts.callback || function(url) {
			window.open(url, "name-" + Math.random());
		};

		var onKeyPress = function(event){
			if( event.which !== charCode ) { return; }
			var dataUrl	= this.toDataURL(renderer);
			if( width === undefined && height === undefined ) {
				callback( dataUrl )
			} else {
				_aspectResize(dataUrl, width, height, callback);		
			}
		}.bind(this);
        
        

		document.addEventListener('keypress', onKeyPress, false);

		return { unbind : function(){
				document.removeEventListener('keypress', onKeyPress, false); }
		};
	}

	THREEx.Screenshot = {
		toDataURL : toDataURL,
		bindKey : bindKey,
        call: call
	};
})();
