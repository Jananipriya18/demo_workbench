using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        Console.WriteLine("program started");
        await SimulateTaskAsync();
        Console.WriteLine("program ended.");
    }

    static async Task SimulateTaskAsync()
    {
        Console.WriteLine("Task Started...");
        await Task.Delay(2000);
        Console.WriteLine("Task Completed.");
    }
}