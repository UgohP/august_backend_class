const fs = require("fs");
/**
 * Returns total number of students in the database,
 * and in each fields with their first names.
 * @param {String} filePath - The file path
 * @author Paschal Ugoh <https://github.com/UgohP>
 */
function countStudents(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("Cannot load database");
  }
  if (!fs.statSync(filePath).isFile()) {
    throw new Error("Cannot load database");
  }
  try {
    const students = {};
    const fields = {};
    let length = 0;
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.toString().split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) {
        length += 1;
        const field = lines[i].trim().split(",");
        if (Object.prototype.hasOwnProperty.call(students, field[3])) {
          students[field[3]].push(field[0]);
        } else {
          students[field[3]] = [field[0]];
        }
      }
    }
    console.log(students)
  } catch (err) {
    console.error(err);
  }
}

countStudents("database.csv");
