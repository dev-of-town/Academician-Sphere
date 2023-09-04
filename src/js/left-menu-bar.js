$(".lmb-option.my-communities .lmb-op-btn").on("click",(event)=>{
    let x = event.currentTarget;
    x = x.parentElement;
    x = x.parentElement;
    let ele = $("."+x.className.split(" ")[0]+" > ul");
    ele.slideToggle();
    let y = event.currentTarget.children.item(0);
    if(y.textContent === "+"){
        y.textContent = "-";
    }else{
        y.textContent = "+";
    }
});

$(".a-community button").click((event)=>{

    let x = event.currentTarget;
    // $(x.before).attr("content","-");
    $(x).text() == "+" ? $(x).text("-"):$(x).text("+");
    // console.log(x);
    x = x.parentElement;
    // console.log(x);
    x = x.parentElement;

    // console.log(x);

    $(x).find("> ul").slideToggle(250);
});

$(".navbar button").click((event)=>{
    $(".left-menu-bar").toggle();
});