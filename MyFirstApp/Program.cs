using System;
namespace MultipleExceptionHandling
{
    class Program
    {
        static void Main(string[] args)
        {
            try{
                Console.WriteLine("Enter the size of the array");
                int size = int.Parse(Console.ReadLine());

                int[] numbers = new int[size];
                Console.WriteLine("Enter the numbers for the array:");
                for(int i = 0;i <size;i++)
                {
                    Console.WriteLine($"Enter the numbers of the array {i}");
                    numbers[i] = int.Parse(Console.ReadLine());
                }

                Console.WriteLine("Enter the index of numerator");
                int numeratorIndex = int.Parse(Console.ReadLine());

                Console.WriteLine("Enter the index of demoninator");
                int denominatorIndex = int.Parse(Console.ReadLine());

                int numerator = numbers[numeratorIndex];
                int denominator = numbers[denominatorIndex];

                int result = numerator/denominator;
                Console.WriteLine($"Result: {numerator}/{denominator} = {result}");
            }
            catch(IndexOutOfRangeException ex)
            {
                Console.WriteLine("Error: Index out of R")

            }
            finally{

            }
        }
    }
}