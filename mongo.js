const mongoose = require('mongoose')
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://admin:${password}@cluster0.273tc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  "name": String,
  "number": String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  //display all persons
  Person.find({}).then(result => {
    result.forEach(p => console.log(p))
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    "name": process.argv[3],
    "number": process.argv[4],
  })
  console.log(person);
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
else {
  console.log('Please provide a correct name and number');
}