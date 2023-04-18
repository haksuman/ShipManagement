using System.Collections.Generic;
using System.Linq;
using GraphQL;
using System.Text.Json;
using GraphQL.Types;
using ShipAPI.Models;

namespace ShipAPI.GraphQL
{
    public class ShipQuery : ObjectGraphType
    {
        public ShipQuery()
        {
            Field<ListGraphType<ShipType>>(
                "ships",
                resolve: context => GetShips()
            );

            Field<ShipType>(
                "ship",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "id" }),
                resolve: context =>
                {
                    var id = context.GetArgument<string>("id");
                    return GetShipById(id);
                }
            );
        }

        private List<Ship> GetShips()
        {
            // Read ships from file
            var ships = System.IO.File.ReadAllText("./data/ships.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var shipList = JsonSerializer.Deserialize<List<Ship>>(ships, options);

            return shipList;
        }

        private Ship GetShipById(string id)
        {
            // Read ships from file
            var ships = System.IO.File.ReadAllText("./data/ships.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var shipList = JsonSerializer.Deserialize<List<Ship>>(ships, options);

            return shipList.FirstOrDefault(s => s.Id == id);
        }
    }
}