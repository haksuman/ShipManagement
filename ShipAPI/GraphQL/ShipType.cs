using GraphQL.Types;
using ShipAPI.Models;

namespace ShipAPI.GraphQL
{
    public class ShipType : ObjectGraphType<Ship>
    {
        public ShipType()
        {
            Field(s => s.Id, type: typeof(IdGraphType)).Description("The ID of the ship");
            Field(s => s.Name).Description("The name of the ship");
            Field(s => s.LengthInMeters).Description("The length of the ship in meters");
            Field(s => s.WidthInMeters).Description("The width of the ship in meters");
            Field(s => s.Code).Description("The code of the ship");
        }
    }
}