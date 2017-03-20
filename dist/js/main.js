$(function () {
    var ScreenWidth = $(window).width(),
        ScreenHeight = $(window).height();

    //обработка тачей
    if (isTouch()) {
        $('html').addClass('touch');
    }
    else{
        $('html').addClass('no-touch');
    }
    function isTouch(){
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch (e){
            return false;
        }
    }


/*    $(".js-menu").on('click', function(e){
        $(this).siblings('ul').slideToggle(300);
        $(this).toggleClass("active");
    });*/




    //main menu slide
    $(".sand-menu").click(function(){
        var elToggle = $('.js-menu'),
            elSlideLeft = elToggle.find('.js-slide-effect-left'),
            elSlideRight = elToggle.find('.js-slide-effect-right');
        elToggle.fadeToggle(500);
        $(this).toggleClass("active");
        elToggle.toggleClass("active");
        if($(this).hasClass('active')){
            slideEffectLeft(elSlideLeft,true,-200);
            slideEffectRight(elSlideRight,true,-200);
            $(this).closest('.menu').css('z-index','9998');
        }
        else{
            slideEffectLeft(elSlideLeft,false,-200);
            slideEffectRight(elSlideRight,false,-200);
            $(this).closest('.menu').animate({'z-index':'1'},500);
        }
    });

    function slideEffectLeft(el,state,pos){
        var counter = 500;
        el.children().css({'position':'relative'});
        if(state === true){
            el.children().each(function(){
                $(this).animate({'left':0},counter);
                counter += 150;
            });
        }
        else{
            el.children().each(function(){
                $(this).animate({'left':pos},counter);
                counter += 150;
            });
        }
    }
    function slideEffectRight(el,state,pos){
        var counter = 500;
        el.children().css({'position':'relative'});
        if(state === true){
            el.children().each(function(){
                $(this).animate({'right':0},counter);
                counter += 150;
            });
        }
        else{
            el.children().each(function(){
                $(this).animate({'right':pos},counter);
                counter += 150;
            });
        }
    }

    //full height element
    function fullHeight(el){
        el.height(ScreenHeight);
    }
    fullHeight($('.js-full-height'));


    //scroll to top
    function scrollTop(el) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 0) {
                el.fadeIn();
            } else {
                el.fadeOut();
            }
        });
        el.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    }
    scrollTop($('.js-to-top'));


/*    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.js-top-menu').slideDown();
        } else {
            $('.js-top-menu').slideUp();
        }
    });*/

    //if top menu more than window, we hide him
    function topMenuHide(el,outer){
        var liWidth = 0;
        el.find('li').each(function(){
            liWidth += $(this).outerWidth();
        });
        if(liWidth + outer > el.outerWidth()){
            el.css({'opacity':0,'z-index':0});
        }
        else{
            el.css({'opacity':1,'z-index':3});
        }
    }
    topMenuHide($('.js-top-menu'),150);


    var home = $('.menu-home'),
        portfolio = $('.menu-portfolio'),
        skills = $('.menu-skills'),
        resume = $('.menu-resume'),
        contacts = $('.menu-contacts');

    $('.js-anchor-menu li a').on('click',function(e){
        e.preventDefault();
        var curSection = '#'+$(this).attr('title').toLowerCase(),
            offsetTop = $(curSection).offset().top - 80;
        $("html, body").animate({ scrollTop: offsetTop }, "slow");
    });


    /*=================Plagins===============*/

    //plugin fsort
    $('.portfolio-project').fsort({
        ppp: 4
    });


    /*=================Plagins===============*/



    /*=================Validation===============*/

    /*===CONTACT===*/
    function formLabel(el){
        $(el).on('click contextmenu',function(e){
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === ''){
                    //если инпут или текстареа не пусты
                    $(this).removeClass('active');
                }
            });
            $(this).addClass('active');
        });
        $(document).mouseup(function(e){// событие клика по веб-документу
            $(el).each(function(){
                if($(this).find('input').val() === '' || $(this).find('textarea').val() === '' && !$(this).is(e.target) && $(this).has(e.target).length === 0){
                    //если инпут или текстареа не пусты и клик был не поселектору и не по его дочерним элементам
                    $(this).removeClass('active');
                }
            });
        });
    }
    formLabel('.js-form-group');

    function validateForms(el){
        var val = el.val(),
            id = el.attr('id');
        switch (id){
            case 'js-name':
                var vName = /^[a-zA-Zа-яА-Я]+$/;
                if(val.length >= 3 && val != '' && vName.test(val)){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
            case 'js-mail':
                var vMail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if(val != '' && vMail.test(val)){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
            case 'js-phone':
                var vPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                if(val.length >= 3 && val != '' && vPhone.test(val)){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
            case 'js-message':
                if(val.length >= 3 && val != ''){
                    el.parent().removeClass('error').addClass('not-error');
                }
                else{
                    el.parent().addClass('error').removeClass('not-error');
                }
                break;
        }
    }
    $('.validate-field').on('input', function(){
        validateForms($(this));
    });


    /*=================Validation===============*/




    if(ScreenWidth > 1680){

    }
    if(ScreenWidth < 1680){

    }
    if(ScreenWidth < 992){

    }
    if(ScreenWidth < 768){

    }
    if(ScreenWidth < 580){
       
    }
    if(ScreenWidth < 480){

    }

    $(window).resize(function(){
        ScreenWidth = $(window).width();
        ScreenHeight = $(window).height();

        fullHeight($('.js-full-height'));
        setTimeout(function(){
            topMenuHide($('.js-top-menu'),150);
        },500);

        /*setTimeout(function(){
            $('.portfolio-project').fsort({
                ppp: 4
            });
        },500);*/
    });

});

//preloader
$(window).on('load',function() {
    $(".j-loader-inner").fadeOut();
    $(".j-loader").delay(500).fadeOut("slow");
    $(".j-loader span").delay(500).animate({'width': 0},500);
});