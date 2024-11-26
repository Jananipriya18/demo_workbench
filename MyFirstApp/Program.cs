using System;

namespace DelegateEventExample
{
    public delegate void ButtonClickHandler();
    class Button{
        public event ButtonClickHandler ButtonClicked;

        public void Click()
        {
            Console.WriteLine("Button was clicked!");
            ButtonClicked?.Invoke();
        }
    }

    class Program
    {
        static void OnButtonClicked()
        {
            Console.WriteLine("Event triggered: ButtonClickHandler invoked!");
        }

        static void Main(string[] args)
        {
            Button button= new Button();
            button.ButtonClicked +=OnButtonClicked;
            Console.WriteLine("Press Enter to click a button.");
            Console.ReadLine();
            button.Click();
        }
    }
}