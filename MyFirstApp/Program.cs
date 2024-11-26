using System;

class Program{
    public static void Main()
    {
        HashSet<string> uniqueitems = new HashSet<string>
        {
            "Pen","Notebook","Eraser"
        };
        uniqueitems.Add("Pen");
        uniqueitems.Add("Eraser");
        uniqueitems.Add("Marker");

        foreach(string item in uniqueitems)
        {
            Console.WriteLine(item);
        }
        
    }
}