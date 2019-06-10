class GeneralHelper {
    static generateRandomNumber() {
        return (Math.round((Math.random() * (9999999 - 999999)))).toString().slice(0, 4);
    }

    static calPercentage(porcentage, value) {
        return value * (porcentage / 100);
    }

    static transformInDecimal(value, number = 0) {
        return (value / 100).toFixed(number);
    }
}

module.exports = GeneralHelper;
