#include <LiquidCrystal.h>
/* Create object named lcd of the class LiquidCrystal */
LiquidCrystal lcd(13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3);  /* For 8-bit mode */
//LiquidCrystal lcd(13, 12, 11, 6, 5, 4, 3);  /* For 4-bit mode */

unsigned char Character1[8] = { 0x04, 0x1F, 0x11, 0x11, 0x1F, 0x1F, 0x1F, 0x1F }; /* Custom Character 1 */
unsigned char Character2[8] = { 0x01, 0x03, 0x07, 0x1F, 0x1F, 0x07, 0x03, 0x01 }; /* Custom Character 2 */
String inData = "";

void setup() {
  Serial.begin(9600);
  lcd.begin(16,2);  /* Initialize 16x2 LCD */
  lcd.clear();  /* Clear the LCD */
  lcd.createChar(0, Character1);  /* Generate custom character */
  lcd.createChar(1, Character2);
}
void loop(){
  
    lcd.setCursor(0,0);
    lcd.print("hello word");
    lcd.setCursor(1,1);
    lcd.write(Serial.available());
    
    if (Serial.available()>0){
        lcd.write(Serial.available().toString);
     }
//    while (Serial.available() > 0) {
//        char received = Serial.read();
//        lcd.print(received);
//        inData.concat(received);
//
//        // Process message when new line character is received
//        //if (received == '\n') {
//            // Message is ready in inDate
//          // lcd.print(inData);
//        //}
//    }
}