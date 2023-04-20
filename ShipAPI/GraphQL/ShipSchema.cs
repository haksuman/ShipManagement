using GraphQL;
using GraphQL.Types;
using System.Web.Http.Dependencies;

namespace ShipAPI.GraphQL
{
    public class ShipSchema : Schema
    {
        public ShipSchema(IServiceProvider provider) : base(provider)
        {
            Query = provider.GetService(typeof(ShipQuery)) as ShipQuery;
        }
    }
}