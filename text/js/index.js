let waterFall=(function waterFall(){
    let data=null;
    let fall=document.querySelectorAll('.fall');
    let link=null;
    let realWidth=document.documentElement.clientWidth
    let queryData=function queryData(){
        let xhr= new XMLHttpRequest;
        xhr.open('GET','./json/data.json',false);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4&&xhr.status===200){
                data=JSON.parse(xhr.responseText);
                console.log(data);
            }
        }
        
        xhr.send(null);
    }
    let render=function render(){
        
        Array.from(data).forEach((item,index)=>{
            let {
                id,
                pic,
                width,
                height,
                title,
                link
            }=item;
            let _width=realWidth*0.8*0.21;

            let _height=_width*height/width;
            let card=document.createElement('div');
            card.className='card';
            card.innerHTML=`<div class="imageBox" isLoad="true" style="width:${_width+'px'};height:${_height+'px'};">
                            <img src="${pic}" alt="" data-image="${pic}">
                        </div>
                        <p>${title}</p>`;
                        let _data=Array.from(fall).sort((a,b)=>{
                            return a.offsetHeight-b.offsetHeight;
                        })[0];
                        _data.appendChild(card);
        })
        
    }
    let lazyFunc = function lazyFunc() {
		let imageBoxs = document.querySelectorAll('.imageBox');
		[].forEach.call(imageBoxs, imageBox => {
			let isLoad = imageBox.getAttribute('isLoad');
            if (isLoad === "true") return;
            let offset=function offset(element){
                let parent=element.offsetParent,
                top=element.offsetTop,
                left=element.offsetLeft;
                while(parent){
                    //此处有个兼容I8
                    if(!/MSIE 8/.test(navigator.userAgent)){
                        top+=parent.clientTop;
                        left+=parent.clientLeft; 
                    }
                    top+=parent.offsetTop;
                    left+=parent.offsetLeft;
                    parent=parent.offsetParent;
                }
                return{
                    top,
                    left
                }
            }
			let B =offset(imageBox).top +
				imageBox.offsetHeight / 2;
			let A = document.documentElement.clientHeight +
				document.documentElement.scrollTop;
			if (B <= A) {
				lazyImg(imageBox);
			}
		});
    };

    let lazyImg = function lazyImg(imageBox){
        let img = imageBox.querySelector('img'),
        dataImage = img.getAttribute('data-image'),
			tempImage = new Image;
		tempImage.src = dataImage;
		tempImage.onload = () => {
			img.src = dataImage;
			utils.css(img, 'opacity', 1);
		};
		img.removeAttribute('data-image');
		tempImage = null;
		imageBox.setAttribute('isLoad', 'true');
    }

    let isRender;
	let loadMoreData = function loadMoreData() {
		let HTML = document.documentElement;
		if (HTML.clientHeight + HTML.clientHeight / 2 + HTML.scrollTop >= HTML.scrollHeight) {
			if (isRender) return;
			isRender = true;
			queryData();
			render();
			lazyFunc();
			isRender = false;
		}
	};

    return {
        init(){
            queryData();
            render();
            lazyFunc();
			window.onscroll = function () {
				lazyFunc();
				loadMoreData();
			};
    }
}
})();
waterFall.init();