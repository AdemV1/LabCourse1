namespace ProjektiEVoting.Models
{
    public class Kandidati
    {
        public int KandidatiId { get; set; }
        public string KandidatiName { get; set; }
        public string Subjekti { get; set; }

        public string DateOfJoining { get; set; }
        public string Shteti { get; set; }
        public string Qyteti { get; set; }

        public string PhotoFileName { get; set; }
    }
}
