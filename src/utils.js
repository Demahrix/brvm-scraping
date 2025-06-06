
class Utils {

    static months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    /**
     * 
     * @param {string} value ex: Jeudi, 5 juin, 2025 - 22:45
     * @returns 
     */
    static parseDate(value) {
        const p = value.split(',');
        const [day, month] = p[1].trim().split(' ');
        const [year, time] = p[2].trim().split('-');
        const [hour, minute] = time.trim().split(':');
        return new Date(parseInt(year.trim()), this.months.indexOf(month), parseInt(day), parseInt(hour), parseInt(minute));
    }

    /**
     * 
     * @param {string} value 
     */
    static parseNumber(value) {
        return parseFloat(value.split(' ').join('').replace(',', '.'));
    }

}

export { Utils };