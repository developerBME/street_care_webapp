module.exports = {
    formatDate(inputDate) {
        // Split the input date string by space
        let parts = inputDate.split(' ');
    
        // Extract month, day, year, hours, minutes, and AM/PM
        let month = parts[0];
        let day = parseInt(parts[1].replace(',', ''));
        let year = parseInt(parts[2]);
        let hours = parseInt(parts[4].split(':')[0]);
        let minutes = parseInt(parts[4].split(':')[1]);
        let ampm = parts[5];
    
        // Convert month abbreviation to a number (e.g., Jan -> 0, Feb -> 1, etc.)
        let monthNumber = new Date(Date.parse(month + ' 1, 2000')).getMonth() + 1;
    
        // Adjust hours if it's PM
        // if (ampm === 'PM' && hours < 12) {
        //     hours += 12;
        // }

        if(hours < 12){
            ampm = 'AM';
        } else {
            ampm = 'PM';
        }
    
        // Format the date as MM/DD/YYYY hh:mm
        let formattedDate = monthNumber.toString().padStart(2, '0') + '/' +
                            day.toString().padStart(2, '0') + '/' +
                            year + ' ' +
                            hours.toString().padStart(2, '0') + ':' +
                            minutes.toString().padStart(2, '0') + ' ' +
                            ampm;
    
        return formattedDate;
    }
}