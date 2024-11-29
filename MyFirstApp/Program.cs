using System;
using System.Linq;
using System.Collections.Generic;
class Program
{
    static void Main(string[] args)
    {
        List<int> numbers = new List<int>
        {10,1,7,9,2,6,5,3,4,8};

        // Sort the numbers in ascending order
        var sortedNumbers = numbers.OrderBy(num => num);
        // Filtering by Even numbers
        var evenNumbers = sortedNumbers.Where(num=> num%2 == 0);
        // Sum of even Numbers
        var sumOfEvenNumbers = evenNumbers.Sum();

        Console.WriteLine("Sorted even numbers:");
        foreach(var num in evenNumbers)
        {
            Console.WriteLine(num);
        }

        Console.WriteLine("Ascending order");
        foreach(var num in sortedNumbers)
        {
            Console.WriteLine(num);
        }

        Console.WriteLine(sumOfEvenNumbers);


    }
}