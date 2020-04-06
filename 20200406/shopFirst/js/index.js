let shopText=(function shopText(){
    let data=null;

    let queryData=function queryData(){
        let xhr=new XMLHttpRequest;
        xhr.open('GET','./json/product.json',false);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4&&xhr.status===200){
                data=JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
        
    }
    return{
        init(){
            queryData();
            console.log(data);
        }
    }
})();
shopText.init();