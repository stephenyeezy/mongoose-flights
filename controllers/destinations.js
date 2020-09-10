const Flight = require('../models/flight');


module.exports = {
    create,
    delete: deleteDestination
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        });
    });
}

function deleteDestination(req, res) {
  Flight.findById(req.params.flight, function(err, flight) {
     let idx = flight.destinations.findIndex(function(obj) {
          return (obj._id == req.params.dest)
      })
      flight.destinations.splice(idx, 1);
      flight.save(function(err) {
          res.redirect(`/flights/${flight._id}`)
      })
  })
}