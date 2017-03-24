/*$('header').css({'opacity': '1'});*/
$(window).on('load',function () {
    //$('body').css({'overflow': 'visible'});
    $('.wrapper').css({'opacity': '1'});
});

$(function () {
    var ScreenWidth = $(window).width(),
        ScreenHeight = $(window).height(),
        TopMenuHeight = $('.js-top-menu').outerHeight(),
        fixedHamburger = $(".sand-menu"),
        spaceForEffect = 200;

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


    $(".js-menu a").on('click', function(e){
        var elToggle = $('.js-menu'),
            elSlideLeft = elToggle.find('.js-slide-effect-left'),
            elSlideRight = elToggle.find('.js-slide-effect-right');
        elToggle.fadeToggle(500);
        fixedHamburger.removeClass('active');
        elToggle.toggleClass("active");
        slideEffectLeft(elSlideLeft,false,-200);
        slideEffectRight(elSlideRight,false,-200);
        $(this).closest('.menu').animate({'z-index':'1'},500);
    });




    //main menu slide
    fixedHamburger.click(function(){
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


    //top menu background
    if($(window).scrollTop() > 0){
        $('.js-top-menu').addClass('active');
    } else {
        $('.js-top-menu').removeClass('active');
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.js-top-menu').addClass('active');
        } else {
            $('.js-top-menu').removeClass('active');
        }
    });

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




    //anchor position
    function anchorPosition(scroll){
        var home = $('#home'),
            portfolio = $('#portfolio'),
            skills = $('#skills'),
            resume = $('#resume'),
            contacts = $('#contacts');
        var homePos = home.offset().top,
            portfolioPos = portfolio.offset().top,
            skillsPos = skills.offset().top,
            resumePos = resume.offset().top,
            contactsPos = contacts.offset().top;
        var homeLi = $('.menu-home'),
            portfolioLi = $('.menu-portfolio'),
            skillsLi = $('.menu-skills'),
            resumeLi = $('.menu-resume'),
            contactsLi = $('.menu-contacts');
        var homeHref = homeLi.find('a').attr('href'),
            portfolioHref = portfolioLi.find('a').attr('href'),
            skillsHref = skillsLi.find('a').attr('href'),
            resumeHref = resumeLi.find('a').attr('href'),
            contactsHref = contactsLi.find('a').attr('href');

        if (scroll >= homePos && scroll < portfolioPos){
            homeLi.siblings().removeClass('active');
            homeLi.addClass('active');
            history.replaceState({page:homeHref}, null, homeHref);
            document.title = seo_title;
        }
        if (scroll >= portfolioPos && scroll < skillsPos){
            portfolioLi.siblings().removeClass('active');
            portfolioLi.addClass('active');
            history.replaceState({page:portfolioHref}, null, portfolioHref);
            document.title = portfolio_seo_title;
        }
        if (scroll >= skillsPos && scroll < resumePos){
            skillsLi.siblings().removeClass('active');
            skillsLi.addClass('active');
            history.replaceState({page:skillsHref}, null, skillsHref);
            document.title = skills_seo_title;
        }
        if (scroll >= resumePos && scroll < contactsPos){
            resumeLi.siblings().removeClass('active');
            resumeLi.addClass('active');
            history.replaceState({page:resumeHref}, null, resumeHref);
            document.title = resume_seo_title;
        }
        if (scroll >= contactsPos){
            contactsLi.siblings().removeClass('active');
            contactsLi.addClass('active');
            history.replaceState({page:contactsHref}, null, contactsHref);
            document.title = contact_seo_title;
        }

    }

    //anchor scrolling and click
    function frontAnchor(topMenuHeight){

        $(window).scroll(function () {
            var scroll = $(this).scrollTop() + topMenuHeight;
            anchorPosition(scroll);
        });

        $('.js-anchor-menu li a').on('click',function(e){
            e.preventDefault();
            var curSection = '#'+$(this).attr('title').toLowerCase(),
                offsetTop = $(curSection).offset().top - topMenuHeight + 1;
            $(this).closest('li').addClass();
            $("html, body").animate({scrollTop: offsetTop}, "slow");
        });
    }

    setTimeout(function(){
        frontAnchor(TopMenuHeight);
        anchorPosition(window.pageYOffset + TopMenuHeight);
    },500);

    function sideEffects(el){
        var scroll = $(this).scrollTop();
        el.each(function(){
            var halfHeight = $(this).outerHeight()/2;
            if($(this).offset().top > scroll - halfHeight && $(this).offset().top < scroll - halfHeight + $(window).height()){
                $(this).addClass('show');
            }
            else{
                $(this).removeClass('show');
            }
        });
    }

    function allEffects(){
        //Effects
        var topEffect = $('.js-top-effect'),
            bottomEffect = $('.js-bottom-effect'),
            leftEffect = $('.js-l-effect'),
            rightEffect = $('.js-r-effect'),
            opacityEffect = $('.js-opacity-effect');

        $(window).scroll(function() {
            sideEffects(topEffect);
            sideEffects(bottomEffect);
            sideEffects(leftEffect);
            sideEffects(rightEffect);
            sideEffects(opacityEffect);
        });
        sideEffects(topEffect);
        sideEffects(bottomEffect);
        sideEffects(leftEffect);
        sideEffects(rightEffect);
        sideEffects(opacityEffect);
    }




    /*=================Plagins===============*/

    //plugin fsort
    $('.portfolio-project').fsort({
        ppp: 5
    });


    /*=================Plagins===============*/



    /*=================Validation===============*/

    /*===CONTACT===*/
    function formLabel(el){
        $(el).on('click contextmenu focusin',function(e){
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
    if(ScreenWidth > 768){
        allEffects();
    }
    if(ScreenWidth > 768){

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

        allEffects();

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