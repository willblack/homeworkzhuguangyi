function _Menu(){
    let data=null;

    function queryData(){
        let xhr=new XMLHttpRequest;
        xhr.open('GET','./json/person.json',false);
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&xhr.status===200){
                data=JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }
    // function bindData(){
    //     let=
    // }
    return {
        init(){
            queryData();
        }
    }   
}
_Menu().init();