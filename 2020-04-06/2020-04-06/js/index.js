let shopFirst=(function shopFirst(){
    let data=null;
    let nav=document.querySelectorAll('.nav li'),
    cardList=document.querySelector('.card');
    link=null;
    let queryData=function queryData(){
        let xhr= new XMLHttpRequest;
        xhr.open("GET","./json/product.json",false);
        xhr.onreadystatechange=()=>{
            if(xhr.readyState===4&&xhr.status===200){
                data=JSON.parse(xhr.responseText);
            }
        }
        xhr.send(null);
    }
    let render=function render(){
        let str=``;
        data.forEach((item)=>{
            let {
                price,
                img,
                title,
                time,
                hot
            }=item;
            str+=`<li>
            <img src="${img}" alt="">
            <h3>${title}</h3>
            <p>价格：${price}</p>
            <p>销量：${hot}</p>
            <p>时间：${time}</p>
        </li>`;
        })
        cardList.innerHTML=str;
    }
    let handle=function handle(){
        console.log(nav);
        Array.from(nav).forEach((item)=>{
            item.flag=-1;
            item.onclick=function(){
                this.flag*=-1;
                let pai=this.getAttribute('data-pai');
                data.sort((a,b)=>{
                    a=String(a[pai]).replace(/-/g,'');
                    b=String(b[pai]).replace(/-/g,'');
                    return (a-b)*this.flag;
                })
                render();
            }
        })
    }
    return{
        init(){
            queryData();
            render();
            handle();
        }
    }
})();
shopFirst.init();