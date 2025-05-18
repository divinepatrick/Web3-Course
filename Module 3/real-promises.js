function activityTable(day) {
  let table = [];
  for (let i = 0; i < 24; i++) table[i] = 0;

  return textFile("camera_logs.txt")
    .then(fileList => {
      const filePromises = fileList.split("\n").map(filename => 
        textFile(filename).then(log => {
          log.split("\n").forEach(timestamp => {
            const date = new Date(Number(timestamp));
            if (date.getDay() === day) {
              table[date.getHours()]++;
            }
          });
        })
      );
      return Promise.all(filePromises);
    })
    .then(() => table);
}

activityTable(6).then(table => console.log(activityGraph(table)));