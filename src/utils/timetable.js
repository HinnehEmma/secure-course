const convertData = (courses) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const result = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };
  
    const currentDate = new Date(); // Get the current date and time
  
    courses.forEach((course) => {
      course.times.forEach((time, index) => {
        const [day, hourString] = time.toLowerCase().split(" at ");
        const dayIndex = daysOfWeek.indexOf(
          day.charAt(0).toUpperCase() + day.slice(1)
        );
  
        if (dayIndex !== -1) {
          const [hour, minute, period] = hourString.match(/(\d+):(\d+) (\w+)/).slice(1);
          let startHour = parseInt(hour, 10);
  
          if (period === "pm" && startHour !== 12) {
            startHour += 12;
          } else if (period === "am" && startHour === 12) {
            startHour = 0;
          }
  
          const startTime = `${startHour}:${minute} ${period}`;
  
          const endHour = startHour + 1; // Assuming each class is 1 hour long
          const endTime = `${endHour}:${minute} ${period}`;
  
          result[daysOfWeek[dayIndex].toLowerCase()].push({
            id: index + 1, // Or use another unique identifier if necessary
            name: course.course_name,
            type: "class",
            startTime: startTime,
            endTime: endTime,
          });
        }
      });
    });
  
    return result;
  };
  
  export { convertData };
  