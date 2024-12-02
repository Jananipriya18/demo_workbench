using System;
using System.Diagnostics.Metrics;
using System.Reflection.Metadata;

class Program
{
    static void Main(string[] args)
    {
        HashSet<int> rollnumbers = new HashSet<int>{100,101,102,103};
        rollnumbers.Add(104);
        rollnumbers.Add(100);

        Console.WriteLine("Unique elements in hashSet");
        foreach(int num in rollnumbers)
        {
            Console.WriteLine(num);
        }
        
    }
}