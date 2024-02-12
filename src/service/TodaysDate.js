const TodaysDate = () => {
    const today = new Date();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
};

export default TodaysDate;