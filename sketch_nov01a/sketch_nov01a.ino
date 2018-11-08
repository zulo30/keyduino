#include <LiquidCrystal.h>
/* Create object named lcd of the class LiquidCrystal */
LiquidCrystal lcd(13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3);  /* For 8-bit mode */
//LiquidCrystal lcd(13, 12, 11, 6, 5, 4, 3);  /* For 4-bit mode */
#define LCD_WIDTH 16
#define LCD_HEIGHT 2

/*
 *  U: up | arriba
 *  D: down | abajo
 *  L: left | izquierda
 *  R: right | derecha
 */

String command = "";
int x = 0;
int y = 0; 


void setup(void)
{
  Serial.begin(9600);
  byte i;
  lcd.begin(LCD_WIDTH, LCD_HEIGHT, 1);
  Serial.write("K");
  lcd.blink();
}



void loop() {
  lcd.setCursor(x,y);
  // when characters arrive over the serial port...
  if (Serial.available()){
    char received = Serial.read();
  // Process message when new line character is received
      if (received == '\n') 
         checkAction(command);
      command.concat(received);
    }
    lcd.clear();
}

void checkAction(String command){
  String ans = command.substring(2,command.length());
  if(command.startsWith("k:")){
    writeWithCursor(ans);
  }
  else{
    char n = ans.charAt(0);
    selectMouseMove(n);
  }
  
}

void selectMouseMove(char ans){
    switch (ans) {
    case 'u':
      moveCursorUp();
      break;
    case 'd':
      moveCursorDown();
      break;
    case 'l':
       moveCursorLeft();
      break;
    case 'r':
        moveCursorRight();
      break;
    default:
      break; 
   }
}



void moveCursorLeft(){
  if(x<15){
    x--;
  } 
}

void moveCursorRight(){
  if(x>0){
    x++;
  } 
}

void moveCursorUp(){
  if(y == 1){
    y = 0;
  } 
}

void moveCursorDown(){
  if(y == 0){
    y = 1;
  } 
}

void writeWithCursor(String msg){
  int res = msg.length() + x;
  if(res < 16){
     lcd.print(msg);
     x=res;
  }
  
}
