;(function($){
    var defaults = {
        ppp: 2,
        tag: '.js-filter-btn',
        more: '.more-search'
    };

    function Fsort(element,options){
        this.config = $.extend({},defaults,options);
        this.element = element;
        this.init();
    }
    $.extend(Fsort.prototype,{
        init: function(){
            var that = this,
                ppp = this.config.ppp,
                el = this.element,
                tag = this.config.tag,
                more = this.config.more;

            setTimeout(function() {
                that.showAllPosts(ppp, el);
            },500);

            var cat = [],
                catIter = 0,
                curPPP = ppp;

            that.btnAllActive(tag);
            that.showMore(cat,el,more);//проверка на показ кнопки More

            $(tag).on('click', function(){//клик на кнопку фильтра
                $(tag).css({'pointer-events':'none', 'cursor': 'default'});
                setTimeout(function(){
                    $(tag).css({'pointer-events':'auto', 'cursor': 'pointer'});
                },500);
                //loadFilterPost();//работа прелоадера
                if($(this).data('filter') == 'all'){
                    that.showAllPosts(ppp,el);
                    cat = [];//очищаем массив категорий
                    catIter = 0;//обнуляем счетчик итерации массива
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');//убираем класс active со всех кнопок
                }
                else{
                    if($(this).hasClass('active')){//забираем класс active
                        $(this).removeClass('active');
                        if(!$(this).siblings().hasClass('active')){
                            $(this).siblings('.tag-all').addClass('active');
                        }
                        cat.splice(cat.indexOf($(this).data('filter')), 1);//если не active стираем название категории из массива
                        catIter--;//уменьшаем счетчик массива
                    }
                    else{//раздаем класс active
                        $(this).addClass('active');
                        $(this).siblings('.tag-all').removeClass('active');
                        cat[catIter] = $(this).data('filter');//если active добавляем название категории в массива
                        catIter++;//увеличиваем счетчик массива
                    }
                }
                var count = 0;//счетчик выводимых постов
                $(el).each(function(index){
                    var slugs = $(this).data('slug').split(','),
                        inCategory = false;
                    for(var i = 0; i < slugs.length; i++){
                        if($.inArray(slugs[i], cat) != -1 && count < curPPP && $(this).data('show') == 1){//если категория текщего эл. есть в массиве + выведенных эл. меньше указанного + его атрибут show = 1(пост был раньше ваыведен)

                            $(this).addClass('show');
                            inCategory = true;
                        }
                        else if(inCategory == false){
                            $(this).removeClass('show');
                        }
                    }
                    if(inCategory == true){
                        count++;//увеличиваем счетчик выводимых постов
                    }
                });
                if(cat.length === 0){//если массив категорий пуст(ни одна из категорий не выведена)
                    $(el).each(function(){
                        if($(this).data('show') == 1){//если атрибут show = 1(эл. был раньше ваыведен)

                            $(this).addClass('show');
                        }
                        else{

                            $(this).removeClass('show');
                        }
                    });
                }
                that.elPosition(el);
                that.showMore(cat,el,more);//проверка на показ кнопки More

            });
            $(more).on('click',function (e){//клик на кнопку More
                e.preventDefault();
                $(more).css({'pointer-events':'none', 'cursor': 'default'});
                setTimeout(function () {
                    $(more).css({'pointer-events':'auto', 'cursor': 'pointer'});
                },500);
                //loadFilterPost();//работа прелоадера
                var count = curPPP;//счетчик выводимых постов
                curPPP += ppp;//увеличиваем тикущее количество выводимых эл. на указанное
                $(el).each(function(){
                    var slugs = $(this).data('slug').split(','),
                        inCategory = false;
                    if(cat.length === 0){//если массив категорий пуст(ни одна из категорий не выведена)
                        if(count < curPPP && $(this).data('show') != 1){//если счетчик выводимых эл. меньше чем текущее количество и атрибут show =0(пост не был раньше ваыведен)
                            $(this).addClass('show');
                            $(this).data('show',1);
                            count++;
                        }
                        else{
                            //$(this).removeClass('show');
                        }
                    }
                    else{
                        for(var i = 0; i < slugs.length; i++){
                            if($.inArray(slugs[i], cat) != -1 && count < curPPP && $(this).data('show') != 1){//если категория текщего эл. есть в массиве + выведенных эл. меньше указанного + его атрибут show =0(пост не был раньше ваыведен)
                                $(this).addClass('show');
                                $(this).data('show',1);
                                inCategory = true;
                            }
                            else{
                                if(inCategory == false && $(this).data('show') != 1){//атрибут show =0(пост не был раньше ваыведен)
                                    $(this).removeClass('show');
                                }
                            }
                        }
                        if(inCategory == true){
                            count++;//увеличиваем счетчик выводимых постов
                        }
                    }
                });
                that.elPosition(el);
                that.showMore(cat,el,more);//проверка на показ кнопки More
            });

            $(window).resize(function(){
                setTimeout(function(){
                    that.elPosition(el);
                },800);
            });
        },
        showAllPosts: function(ppp,el){
            var that = this;
            $(el).each(function(index){//проходимся по всем элементам
                if(index < ppp){//если индекс текущего эл. меньше заданого выводом
                    $(this).addClass('show');
                    $(this).data('show',1);//и атрибут show = 1
                    that.elPosition(el);
                }
            });
        },
        btnAllActive: function(tag){
            $(tag).each(function(){
                if($(this).data('filter') == 'all'){
                    $(this).addClass('tag-all active');
                }
                else{
                    $(this).removeClass('active');
                }
            });
        },
        showMore: function(cat,el,more){
            var btnShow = false;
            $(el).each(function(){
                var slugs = $(this).data('slug').split(',');
                if(cat.length === 0){//если массив категорий пуст(ни одна из категорий не выведена)
                    if ($(this).data('show') != 1){//атрибут show =0(пост не был раньше ваыведен)
                        btnShow = true;
                    }
                }
                else{
                    for(var i = 0; i < slugs.length; i++) {
                        if ($.inArray(slugs[i], cat) != -1 && $(this).data('show') != 1) {//если категория текщего эл. есть в массиве + его атрибут show =0(пост не был раньше ваыведен)
                            btnShow = true;
                        }
                    }
                }
            });
            if(btnShow === true){//выводим More когда условие срабатывает
                $(more).addClass('active');
            }
            else{
                $(more).removeClass('active');
            }
        },
        elPosition: function(el){
            var parentWidth = $(el).parent().width(),
                elWidth = 0,
                curLeft = 0,
                curTop = 0;
            $(el).each(function(index){//проходимся по всем элементам
                elWidth = $(this).outerWidth();
                if($(this).hasClass('show')){
                    if(curLeft + elWidth <= parentWidth){
                        $(this).css({'left': curLeft, 'top': curTop});
                        curLeft += $(this).outerWidth();
                    }
                    else{
                        curLeft = 0;
                        curTop += $(this).outerHeight();
                        $(this).css({'left': curLeft, 'top': curTop});
                        curLeft += $(this).outerWidth();
                    }
                }
                $(el).parent().height(curTop + $(this).outerHeight());
            });
        }

    });

    $.fn.fsort = function(options){
        new Fsort(this, options);
        return this;
    }
})(jQuery);