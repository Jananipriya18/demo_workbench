using System;
using System.Linq;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int>
        {10,1,7,9,2,5,3,4,8};

        // Sort Ascending Order
        var sortedNumbers = numbers.OrderBy(num=>num);
        foreach(var num in sortedNumbers)
        {
            Console.WriteLine(num);
        }

        // Filtering even numbers
        var evenNumbers = sortedNumbers.Where( num => num%2 == 0);
        Console.WriteLine("Filtering by even numbers:");
        foreach(var num in evenNumbers)
        {
            Console.WriteLine(num);
        }

        // Find the sum of even Numbers
        Console.WriteLine("Finding the sum of even Numbers: ");
        var sumOfEvenNumbers = evenNumbers.Sum();
        Console.WriteLine(sumOfEvenNumbers);

        
    }

}