using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ShipAPI.Models;

namespace ShipAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipController : ControllerBase
    {
        private readonly List<Ship> _ships = new List<Ship>();
        private int _nextShipId = 1;

        // GET: api/Ship
        [HttpGet]
        public IEnumerable<Ship> GetAllShips()
        {
            return _ships;
        }

        // GET: api/Ship/5
        [HttpGet("{id}", Name = "GetShip")]
        public ActionResult<Ship> GetShip(int id)
        {
            var ship = _ships.Find(s => s.Id == id);
            if (ship == null)
            {
                return NotFound();
            }
            return ship;
        }

        // POST: api/Ship
        [HttpPost]
        public ActionResult<Ship> CreateShip([FromBody] Ship ship)
        {
            ship.Id = _nextShipId++;
            _ships.Add(ship);
            return CreatedAtRoute("GetShip", new { id = ship.Id }, ship);
        }

        // PUT: api/Ship/5
        [HttpPut("{id}")]
        public ActionResult UpdateShip(int id, [FromBody] Ship updatedShip)
        {
            var shipIndex = _ships.FindIndex(s => s.Id == id);
            if (shipIndex == -1)
            {
                return NotFound();
            }
            _ships[shipIndex] = updatedShip;
            return NoContent();
        }

        // DELETE: api/Ship/5
        [HttpDelete("{id}")]
        public ActionResult DeleteShip(int id)
        {
            var shipIndex = _ships.FindIndex(s => s.Id == id);
            if (shipIndex == -1)
            {
                return NotFound();
            }
            _ships.RemoveAt(shipIndex);
            return NoContent();
        }
    }
}