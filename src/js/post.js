let forPostText = function(){
    let x = $(".post-content.text");
    console.log(x);
    let txt = x.text().substring(0,500) + "...";
    x.text(txt);
    console.log(txt);
};

forPostText();