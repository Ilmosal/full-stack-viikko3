const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
]

app.delete('/api/persons/:id', (req, res) => {
	console.log("TEst")
	const id = req.params.id
	persons = persons.filter(person => person.id != id)

	res.status(204).end()
}) 

app.get('/info', (req, res) => {
	res.writeHead(200, {'Content-type': 'text/plain'})
	res.end('Puhelinluettelossa ' + persons.length + ' henkilön tiedot\n' + new Date())
})

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id
	const person = persons.find(person => person.id == id)
	res.json(person)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.post('/api/persons', (req, res) => {
	console.log(req.body)
	if (req.body.name == undefined || req.body.number == undefined) {
		return res.status(400).json({error:'content missing'})
	}

	if (persons.map(per => per.name).includes(req.body.name)) {
		return res.status(400).json({error:'Name is not unique'})
	}

	const person = {
		name: req.body.name,
		number: req.body.number,
		id: Math.floor(Math.random()*10000000)
	}

	persons = persons.concat(person)
	res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	  console.log(`Server running on port ${PORT}`)
})

