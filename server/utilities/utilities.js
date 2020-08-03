const createMessage = (name, message) => {

    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    let time = '';
    if (minutes.toString.length === 1) {
        time = hours + ':0' + minutes;
    } else if (minutes.toString.length === 2) {
        time = hours + ':' + minutes;
    }

    return {
        name,
        message,
        time
    };

}

module.exports = {
    createMessage
}