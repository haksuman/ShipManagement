using Newtonsoft.Json;

namespace ShipAPI.Models

{
    public class Ship
    {
        [JsonProperty("id")]
        public string? Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("lengthInMeters")]
        public int LengthInMeters { get; set; }

        [JsonProperty("widthInMeters")]
        public int WidthInMeters { get; set; }

        [JsonProperty("code")]
        public string Code { get; set; }
    }
}
