using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ShipAPI.Models;

namespace ShipAPI.Controllers
{
    [Route("api/graphql")]
    [ApiController]
    public class GraphQLController : ControllerBase
    {
        private readonly static string _filePath = "./data/ships.json";
        private readonly IDocumentExecuter _documentExecuter;
        private readonly ISchema _schema;

        public GraphQLController(ISchema schema, IDocumentExecuter documentExecuter)
        {
            _schema = schema;
            _documentExecuter = documentExecuter;
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] GraphQLQuery query)
        {
            var inputs = query.Variables.ToInputs();

            var executionOptions = new ExecutionOptions
            {
                Schema = _schema,
                Query = query.Query,
                //Inputs = inputs,
                Variables = inputs
            };

            var result = await new DocumentExecuter().ExecuteAsync(executionOptions);

            if (result.Errors?.Count > 0)
            {
                return BadRequest(result.Errors);
            }

            return Ok(result);
        }


        //private static readonly string _filePath = Path.Combine(Environment.CurrentDirectory, "ships.json");

        private static List<Ship> ReadShipsFromFile()
        {
            if (!System.IO.File.Exists(_filePath))
            {
                return new List<Ship>();
            }

            var fileContent = System.IO.File.ReadAllText(_filePath);
            var ships = JsonConvert.DeserializeObject<List<Ship>>(fileContent);
            return ships;
        }

        private void WriteShipsToFile(List<Ship> ships)
        {
            var fileContent = JsonConvert.SerializeObject(ships, Formatting.Indented);
            System.IO.File.WriteAllText(_filePath, fileContent);
        }

        public class ShipType : ObjectGraphType<Ship>
        {
            public ShipType()
            {
                Field(x => x.Id, type: typeof(IdGraphType)).Description("The ID of the ship.");
                Field(x => x.Name).Description("The name of the ship.");
                Field(x => x.LengthInMeters).Description("The length of the ship in meters.");
                Field(x => x.WidthInMeters).Description("The width of the ship in meters.");
                Field(x => x.Code).Description("The code of the ship.");
            }
        }

        public class GraphQLQuery
        {
            public string Query { get; set; }
            public Dictionary<string, object> Variables { get; set; }
        }

        public class ShipQuery : ObjectGraphType
        {
            public ShipQuery()
            {

                Field<ListGraphType<ShipType>>(
                    "ships",
                    resolve: context => ReadShipsFromFile()
                );

                Field<ShipType>(
                    "ship",
                    arguments: new QueryArguments(new QueryArgument<IdGraphType> { Name = "id" }),
                    resolve: context =>
                    {
                        var id = context.GetArgument<string>("id");
                        var ships = ReadShipsFromFile();
                        return ships.FirstOrDefault(s => s.Id == id);
                    }
                );
            }
        }

        public class ShipMutation : ObjectGraphType
        {
            public ShipMutation()
            {
                Field<ShipType>(
                    "createShip",
                    arguments: new QueryArguments(new QueryArgument<NonNullGraphType<ShipInputType>> { Name = "ship" }),
                    resolve: context =>
                    {
                        var ship = context.GetArgument<Ship>("ship");
                        var controller = new GraphQLController(null, null);
                        var ships = ReadShipsFromFile();
                        ship.Id = System.Guid.NewGuid().ToString();
                        ships.Add(ship);
                        controller.WriteShipsToFile(ships);
                        return ship;
                    }
                );
            }
            public class ShipInputType : InputObjectGraphType<Ship>
            {
                public ShipInputType()
                {
                    Name = "ShipInput";
                    Description = "Input type for creating or updating a ship.";

                    Field<NonNullGraphType<StringGraphType>>("name");
                    Field<NonNullGraphType<FloatGraphType>>("lengthInMeters");
                    Field<NonNullGraphType<FloatGraphType>>("widthInMeters");
                    Field<NonNullGraphType<StringGraphType>>("code");
                }
            }
        }
    }
}