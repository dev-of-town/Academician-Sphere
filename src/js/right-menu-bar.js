$(".right-menu-bar .filters a").click((event)=>{
    $(".right-menu-bar .filters li").removeClass("active-filter");
    $(event.currentTarget.parentElement).addClass("active-filter");
});