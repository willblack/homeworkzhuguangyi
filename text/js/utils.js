let utils=(function utils(){
    let getCss=function getCss(element,attr){
        let value=window.getComputedStyle(element)[attr],
        reg=/^\d+(px|rem|em)?$/i;
        if(reg.test(value)){
            value=value.parseFloat(value);
        }
        return value;
    };
    let setCss=function setCss(element,attr,value){
        //I8
        if(attr=='opacity'){
            element['style']['opacity']=value;
            element['style']['opacity']=`alpha(opacity=${value*100})`;
        }
        let reg=/^(height|width|margin|padding)?(top|left|right|bottom)?$/i
        if(reg.test(attr)){
            if(window.getComputedStyle.html[fontSize]>90){
                value+='rem';
            }else{
                value+="px";
            }
        }
        //用之前看看有没有单位
        element['style']['attr']=value;
    };
    let setGroupCss=function setGroupCss(element,attr){
        for(let key in attr){
            if(attr.hasOwnProperty(key))break;
            setCss(element,key,attr[key]);
        }
    }
    let css = function css(element){
        let long=arguments.length,
        attr=arguments[1],
        value=arguments[2];
        if(long>=3){
            setCss(element,arguments[1],arguments[2]);
            return
        }
        if(typeof arguments[1]=='object'){
            setGroupCss(element,arguments[1]);
            return;
        }
        return getCss(element,arguments[1]);
    }
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
    return{
        init(){
            css,
            offset();
        }
    }
})();