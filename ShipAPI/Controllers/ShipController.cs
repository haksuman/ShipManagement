using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using ShipAPI.Models;

namespace ShipAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipController : ControllerBase
    {
        private readonly string _filePath = "./data/ships.json";

        // GET: api/Ship
        [HttpGet]
        public IEnumerable<Ship> GetAllShips()
        {
            var ships = ReadShipsFromFile();
            return ships;
        }

        // GET: api/Ship/5
        [HttpGet("{id}", Name = "GetShip")]
        public ActionResult<Ship> GetShip(int id)
        {
            var ships = ReadShipsFromFile();
            var ship = ships.Find(s => s.Id == id);
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
            var ships = ReadShipsFromFile();
            ship.Id = GetNextShipId(ships);
            ships.Add(ship);
            WriteShipsToFile(ships);
            return CreatedAtRoute("GetShip", new { id = ship.Id }, ship);
        }

        // PUT: api/Ship/5
        [HttpPut("{id}")]
        public ActionResult UpdateShip(int id, [FromBody] Ship updatedShip)
        {
            var ships = ReadShipsFromFile();
            var shipIndex = ships.FindIndex(s => s.Id == id);
            if (shipIndex == -1)
            {
                return NotFound();
            }
            updatedShip.Id = id;
            ships[shipIndex] = updatedShip;
            WriteShipsToFile(ships);
            return NoContent();
        }

        // DELETE: api/Ship/5
        [HttpDelete("{id}")]
        public ActionResult DeleteShip(int id)
        {
            var ships = ReadShipsFromFile();
            var shipIndex = ships.FindIndex(s => s.Id == id);
            if (shipIndex == -1)
            {
                return NotFound();
            }
            ships.RemoveAt(shipIndex);
            WriteShipsToFile(ships);
            return NoContent();
        }

        private List<Ship> ReadShipsFromFile()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                return new List<Ship>();
            }

            var fileContent = System.IO.File.ReadAllText(_filePath);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var ships = JsonSerializer.Deserialize<List<Ship>>(fileContent, options);
            return ships;

        }

        private void WriteShipsToFile(List<Ship> ships)
        {
            var fileContent = JsonSerializer.Serialize(ships);
            System.IO.File.WriteAllText(_filePath, fileContent);
        }

        private int GetNextShipId(List<Ship> ships)
        {
            int nextId = 1;
            foreach (var ship in ships)
            {
                if (ship.Id >= nextId)
                {
                    nextId = ship.Id + 1;
                }
            }
            return nextId;
        }
    }
}