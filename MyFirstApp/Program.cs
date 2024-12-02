using System;
using System.Diagnostics.Metrics;

class Program
{
    static void Main(string[] args)
    {
        Dictionary<string,int> ages = new Dictionary<string, int>
        {
            {"Alice",25},
            {"Bob",30},
            {"Charlie",35}
        };
        ages["Diana"]=28;
    }
}