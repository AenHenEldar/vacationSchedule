$(document).ready(function () {
    let today = new Date(),
        currentMonth = today.getMonth(),
        currentYear = today.getFullYear(),
        months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентрябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

            

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

            // month == i
            // j == all columns
            // itemIndex == month for every team member

            for(let j = 1; j <= weeks; j++) {

                for(let itemIndex = 2; itemIndex <= 6; itemIndex++) {
                    $(`.main__list:nth-child(${i + 2}) .main__item:nth-child(${itemIndex}) .main__months`).append('<li class="main__month"></li>');
                    let item = $(`.main__list:nth-child(${i + 2}) .main__item:nth-child(${itemIndex}) .main__months .main__month:nth-child(${j})`);

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
                    }

                    if(i == 4 && j == 1 && itemIndex == 4) {
                        item.css('background-color', '#1EBEB4');
                        // linear gradient
                    }
                }

                

                 
            }

        }
    }

    showCalendar(currentYear - 1)
})