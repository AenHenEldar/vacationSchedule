$(document).ready(function () {
    let today = new Date(),
        currentYear = today.getFullYear();

    $(`.main__months`).append('<div class="main__card"> <p class="main__card-name"></p> <div class="main__card-column"></div> <p class="main__card-period"></p> <p class="main__column-name"></p> </div>');
            

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function showCalendar(year) {
        for(let i = 1; i <= 12; i++) {
            let firstDay = new Date(year, i - 1, 1).getDay(),
                lastDay = new Date(year, i, 0).getDay(),
                firstWeek = firstDay == 0 ? 1 : firstDay == 1 ? 0 : 8 - firstDay,
                lastWeek = lastDay == 0 ? 7 : lastDay,
                weeks = (daysInMonth(i, year) - firstWeek - lastWeek) / 7 + 1 + (firstWeek ? 1 : 0);

                // minus one column in February 

                if(i == 2) {
                    weeks--;
                }

            // i == month
            // j == columns
            // itemIndex == month for every team member (row)

            for(let j = 1; j <= weeks; j++) {

                for(let itemIndex = 2; itemIndex <= 6; itemIndex++) {
                    $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__months`).append('<li class="main__month"></li>');
                    let item = $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__months .main__month:nth-of-type(${j})`),
                        itemCard =  $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__months .main__card`),
                        columnPeriodFrom,
                        columnPeriodTo;

                    if(firstWeek) {
                        if(j == 1) {
                            columnPeriodTo = firstWeek;
                            columnPeriodFrom = 0;
                        } else if(j != weeks) {
                            columnPeriodTo = j * 7 - (7 - firstWeek);
                            columnPeriodFrom = columnPeriodTo - 7;
                        } else {
                            columnPeriodTo = j * 7 - (7 - firstWeek) - (7 - lastWeek);
                            columnPeriodFrom = columnPeriodTo - lastWeek;
                        }
                    } else {
                        if(j != weeks) {
                            columnPeriodTo = j * 7;
                            columnPeriodFrom = columnPeriodTo - 7;
                        } else {
                            columnPeriodTo = j * 7 - (7 - lastWeek);
                            columnPeriodFrom = columnPeriodTo - lastWeek;
                        }
                    }

                    // set in card name and surname

                    $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__card-name`).html($(`.main__list:nth-of-type(1) .main__item:nth-of-type(${itemIndex})`).html());

                    // incomplete column height

                    if(j == 1 && firstWeek) {
                        let columnHeight = Math.round(16 / 7 * firstWeek)
                        item.css('height', columnHeight + 'px');
                    } else if(j == weeks) {
                        let columnHeight = Math.round(16 / 7 * lastWeek)
                        item.css('height', columnHeight + 'px');
                        if(columnHeight < 16) {
                            item.css('margin-bottom', 16 - columnHeight + 'px');
                        }
                    }  

                    // grey color

                    if(i <= 2) {
                        item.css('background-color', '#F6F6F6 ');
                    } else if(i == 3 && j < 3) {
                        item.css('background-color', '#F6F6F6 ');
                    }

                    // red color

                    if((i == 4 && j > 3 && itemIndex == 2) || (i == 4 && j > 4 && itemIndex == 6) || (i == 9 && itemIndex == 4 && (j == 4 || j == 6))) {
                        item.css('background-color', '#F16953');
                    }

                    // yellow color

                    if(i == 3 && j == 4 && itemIndex == 5) {
                        item.css('background-color', '#FCC659');
                    }

                    // green color

                    if((i == 3 && j == 5 && itemIndex == 4) || (i == 5 && j > 3 && (itemIndex % 2 == 0)) || (i == 6 && (j == 1 || j == 5) && itemIndex == 4) || (i == 8 && (j == 2 || j == 3) && itemIndex == 3)) {
                        item.css('background-color', '#1EBEB4');
                    }else if(i == 4 && j == 1 && itemIndex == 4) {
                        item.css('background', 'linear-gradient(to bottom ,#1EBEB4 0%, #1EBEB4 20%, #EAF9FF 20%, #EAF9FF 100%)');
                    }

                    // add card

                    if(item.css('background-color') != 'rgb(246, 246, 246)') {

                        item.mouseover(function() {
                            itemCard.addClass('active-card');

                            // set in card period and column name
                            $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__card-period`).html( (columnPeriodFrom > 9 ? '' : '0') + columnPeriodFrom + '.0' + i + '.' + year + ' - ' + (columnPeriodTo > 9 ? '' : '0') + columnPeriodTo + '.0' + i + '.' + year);

                            // column color in the card

                            if(item.css('background-color') == 'rgb(234, 249, 255)') {
                                $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__column-name`).html('Отпуск');
                            } else if(item.css('background-color') == 'rgb(241, 105, 83)') {
                                $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__column-name`).html('Красный');
                            } else if(item.css('background-color') == 'rgb(252, 198, 89)') {
                                $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__column-name`).html('Желтый');
                            } else if(item.css('background-color') == 'rgb(30, 190, 180)') {
                                $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__column-name`).html('Зеленый');
                            }

                            $(`.main__list:nth-of-type(${i + 2}) .main__item:nth-of-type(${itemIndex}) .main__card-column`).css('height', item.css('height')).css('background-color', item.css('background-color'));
                        
                        })
                        item.mouseout(function() {
                            itemCard.removeClass('active-card');
                        })
                    }

                    // image for card

                    if(itemIndex == 3) {
                        itemCard.css('background-image', 'url("../src/img/png/photo-2.png")');
                    }

                    //

                }

                

                 
            }

        }
    }

    showCalendar(currentYear - 1)
})