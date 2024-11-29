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
        // 
    }
}