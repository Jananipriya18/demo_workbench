using System;
using System.Diagnostics.Metrics;
class program{
    static void Main()
    {
        Func<int,int,int> add = (a,b) => a+b;

        int result = add(5,10);
        Console.WriteLine("Sum: "+result);
    }
}