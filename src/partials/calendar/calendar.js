$(document).ready(function () {

    let today = new Date(),
        todayItem,
        currentMonth = today.getMonth(),
        currentYear = today.getFullYear(),
        months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентрябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        mark,
        markArrivalYear = currentYear,
        markArrivalMonth = currentMonth,
        markDepartureYear = currentYear,
        markDepartureMonth = currentMonth,
        markArrivalRow,
        markArrivalСolumn,
        markDepartureRow,
        markDepartureСolumn,
        markArrivalDate,
        markDepartureDate,
        markArrival = 'calendar__arrival',
        markDeparture = 'calendar__departure',
        markArrivalDay,
        markDepartureDay;

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function showCalendar(month, year) {
        let firstDay = (new Date(year, month)).getDay();
        let date = 1;
        let nextMonth = 1;
        let row = 6;

        $('.calendar__item:not(:first-child').remove();

        if (firstDay == 0) {
            firstDay = 7;
        }
        if (firstDay == 6 && daysInMonth(month + 1, year) == 31 || firstDay == 7) {
            row = 7;
        }

        for (let i = 2; i <= row; i++) {
            for (let j = 1; j <= 7; j++) {
                $(`.calendar__list:nth-child(${j}`).append('<li class="calendar__item"></li>');
                let item = $(`.calendar__list:nth-child(${j}) .calendar__item:nth-child(${i})`);
                item.css('opacity', '0.9');
                if (i === 2 && j < firstDay) {
                    item.html(String(daysInMonth(month, year) - firstDay + j + 1)).css('opacity', '0.4');
                } else if (date > daysInMonth(month + 1, year)) {
                    item.html(String(nextMonth++)).css('opacity', '0.4');
                } else {
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        item.addClass('calendar__today');
                        todayItem = item;
                    }
                    item.html(String(date));
                    date++;
                }
            }
        }

        // if mark arrival and departure is set

        if (markArrivalRow) {
            if (markArrivalYear == year) {
                if (markArrivalMonth == month) {
                    $(`.calendar__list:nth-child(${markArrivalСolumn}) .calendar__item:nth-child(${markArrivalRow})`).addClass(markArrival);
                }
            }
        }
        if (markDepartureRow) {
            if (markDepartureYear == year) {
                if (markDepartureMonth == month) {
                    $(`.calendar__list:nth-child(${markDepartureСolumn}) .calendar__item:nth-child(${markDepartureRow})`).addClass(markDeparture);
                }
            }
        }

        // set between marks background

        if (markArrivalRow && markDepartureRow && markArrivalDate != markDepartureDate) {
            let markBetween;
            let item;
            for (let j = 2; j <= row; j++) {
                for (let i = 1; i <= 7; i++) {
                    item = $(`.calendar__list:nth-child(${i}) .calendar__item:nth-child(${j})`)
                    if (item.css('opacity') != '0.4') {
                        markBetween = year * 365 + month * daysInMonth(month, year) + i + j * 7;
                        if (markBetween > markArrivalDate && markBetween < markDepartureDate) {
                            if (item.hasClass('calendar__today')) {
                                item.removeClass('calendar__today');
                                item.addClass('calendar__today-between');
                            }
                            item.addClass('mark-between');
                            $('.calendar__arrival').addClass('active');
                            $('.calendar__departure').addClass('active');
                        }
                    }

                    if (i == 1) {
                        item.addClass('active-left-round');
                    }
                    if (i == 7) {
                        item.addClass('active-right-round');
                    }
                }
            }
        }


        if (row != 7) {
            $('.calendar__item').css('margin-bottom', '5px');
        }

        // click on li element (item)

        $('.calendar__item').click(function () {
            if ($(this).css('opacity') != '0.4' && $(this).index() != 0) {
                //what is the mark
                mark = 'calendar__arrival';
                if (markArrivalRow && !markDepartureRow) {
                    console.log(1);
                    mark = markDeparture;
                } else if (markArrivalRow && markDepartureRow) {
                    console.log(2);
                    $('.calendar__item').removeClass(markArrival + ' ' + markDeparture + ' mark-between ' + 'mark-between--small');
                    mark = markArrival;
                    markArrivalRow = false;
                    markDepartureRow = false;
                }

                $(todayItem).addClass('calendar__today');
                $('.calendar__item').removeClass('mark-between active-left-round active-right-round active');
                $('.calendar__today-between').removeClass('calendar__today-between');

                if (markArrival == mark) {
                    markArrivalYear = currentYear;
                    markArrivalMonth = currentMonth;
                    markArrivalRow = $(this).index() + 1;
                    markArrivalСolumn = $(this).parent().index() + 1;
                } else if (markDeparture == mark) {
                    markDepartureYear = currentYear;
                    markDepartureMonth = currentMonth;
                    markDepartureRow = $(this).index() + 1;
                    markDepartureСolumn = $(this).parent().index() + 1;
                }

                // set mark

                if ($(this).index() != 0) {
                    $('.calendar__item').removeClass(mark);
                    $(this).addClass(mark);

                    markArrivalDate = markArrivalYear * 365 + markArrivalMonth * daysInMonth(markArrivalMonth, markArrivalYear) + markArrivalСolumn + markArrivalRow * 7;
                    markDepartureDate = markDepartureYear * 365 + markDepartureMonth * daysInMonth(markDepartureMonth, markDepartureYear) + markDepartureСolumn + markDepartureRow * 7;

                    // set between marks background

                    let item;

                    for (let j = 2; j <= row; j++) {
                        for (let i = 1; i <= 7; i++) {
                            item = $(`.calendar__list:nth-child(${i}) .calendar__item:nth-child(${j})`);

                            if (item.css('opacity') != '0.4') {
                                markBetween = year * 365 + month * daysInMonth(month, year) + i + j * 7;

                                if (markBetween > markArrivalDate && markBetween < markDepartureDate) {
                                    if (item.hasClass('calendar__today')) {
                                        item.removeClass('calendar__today');
                                        item.addClass('calendar__today-between');
                                    }
                                    if (markArrivalRow && markDepartureRow && markArrivalDate != markDepartureDate) {
                                        item.addClass('mark-between');
                                        $('.calendar__arrival').addClass('active');
                                        $('.calendar__departure').addClass('active');
                                    }
                                    if (i == 1) {
                                        item.addClass('active-left-round');
                                    }
                                    if (i == 7) {
                                        item.addClass('active-right-round');
                                    }

                                }

                            }
                        }
                    }
                }

            }

            mark == 'calendar__arrival' ? markArrivalDay = $('.calendar__arrival').html() : markDepartureDay = $('.calendar__departure').html();

        });

    }

    showCalendar(currentMonth, currentYear);


    // current month and year

    $('.calendar__header h2').html(months[today.getMonth()] + ' ' + today.getFullYear());

    // click on arrow to change page of calendar

    $('.arrow-right').parent().click(function () {
        ++currentMonth;
        if (currentMonth >= 12) {
            currentMonth = 0;
            ++currentYear;
        }
        $('.calendar__header h2').html(months[currentMonth] + ' ' + currentYear);
        showCalendar(currentMonth, currentYear);
    })

    $('.arrow-left').parent().click(function () {
        --currentMonth;
        if (currentMonth <= -1) {
            currentMonth = 11;
            --currentYear;
        }
        $('.calendar__header h2').html(months[currentMonth] + ' ' + currentYear);
        showCalendar(currentMonth, currentYear);
    })

});