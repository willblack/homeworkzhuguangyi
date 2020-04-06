(function(){
    let navList = document.querySelectorAll('.nav li'),
    productBox=document.querySelector('.cardBox'),
    cardList =null,
    data=null;
    let xhr = new XMLHttpRequest;
    xhr.open('GET','./json/product.json',false);
    xhr.onreadystatechange=()=>{
        if(xhr.readyState===4&&xhr.status===200){
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send(null);
    let str=``;
    data.forEach((item,index)=>{
        let{id,title,img,price,time,hot}=item;
    str+=`<div class="card" data-price="${price}" data-time="${time}" data-hot="${hot}">
    <img src="${img}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">价格：￥${price}</p>
        <p class="card-text">销量：${hot}</p>
        <p class="card-text">时间：${time}</p>
    </div>
</div>`;
    })
productBox.innerHTML=str;
cardList=productBox.querySelectorAll('.card');

console.log(cardList);
navList[2].onclick=function(){
    let item = Array.from(cardList);
                let c=0
    item.sort((a,b)=>{
                console.log(c++);
        return a.getAttribute('data-price')-b.getAttribute('data-price');
    })
    for(let i=0;i<item.length;i++){
        productBox.appendChild(item[i]);
    }
}

})();