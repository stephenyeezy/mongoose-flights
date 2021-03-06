const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight,
}

function index(req, res) {
    Flight.find({}, function (err, flights) {
      res.render("flights/index", { title: "Flight List", flights });
    });
  }
  
  function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            const newFlights = new Flight();
            const dt = newFlights.departs;
            const departureDate = dt.toISOString().slice(0, 16);
            res.render('flights/show', {title: 'Details', flight, tickets, departureDate});
        })
    });
}
  
  function newFlight(req, res) {
    const newFlights = new Flight();
    const dt = newFlights.departs;
    const departureDate = dt.toISOString().slice(0, 16);
    res.render("flights/new", { departureDate, title: "New Flight"});
  }
  
  function create(req, res) {
    let flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) {
            return res.render('flights/new', { title: 'New Flight', departureDate: getDefaultDate() });
        } 
        res.redirect('/flights');
    })
}
  
  function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function (err, flight) {
      res.redirect("/flights");    
    });
  }