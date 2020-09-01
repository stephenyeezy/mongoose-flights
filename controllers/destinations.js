const Flight = require('../models/flight');


module.exports = {
    create,
    delete: deleteDestination
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${req.params.id}`)
        });
    });
}

function deleteDestination(req, res) {
    Flight.findById(req.params.flight)
      .then((flight) => {
        const idx = flight.destinations.findIndex(
          (dest) => req.params.dest == dest._id
        );
        flight.destinations.splice(idx, 1);
        flight.save(function (err) {
          res.redirect(`/flights/${flight._id}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }