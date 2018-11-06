#include <LiquidCrystal.h>
/* Create object named lcd of the class LiquidCrystal */
LiquidCrystal lcd(13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3);  /* For 8-bit mode */
//LiquidCrystal lcd(13, 12, 11, 6, 5, 4, 3);  /* For 4-bit mode */
#define LCD_WIDTH 16
#define LCD_HEIGHT 2

String inData = "";



void setup(void)
{
  Serial.begin(9600);  
  byte i;
  lcd.begin(LCD_WIDTH, LCD_HEIGHT,1);
 

}



void loop() {
  lcd.setCursor(0,0);
  lcd.write("keyduino: ");
  lcd.setCursor(1,1);
  // when characters arrive over the serial port...
   char received = Serial.read();
        inData.concat(received);

        // Process message when new line character is received
        if (received == '\n') {
            // Message is ready in inDate
        }
 
}
