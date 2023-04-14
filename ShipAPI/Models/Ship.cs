namespace ShipAPI.Models
{
    public class Ship
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double LengthInMeters { get; set; }
        public double WidthInMeters { get; set; }
        public string Code { get; set; }
    }
}
