#!/usr/bin/python

from time import sleep
from LPD8806 import *

num = 32;
led = LEDStrip(num)
#led.setChannelOrder(ChannelOrder.BRG) #Only use this if your strip does not use the GRB order
#led.setMasterBrightness(0.5) #use this to set the overall max brightness of the strip
led.all_off()

#setup colors to loop through for fade

r = 0
g = 0
b = 0
mode = 0
while mode < 7:
  if mode == 0:
    r = r+1
    if r > 255:
      r = 255
      mode = 1

  if mode == 1:
    g = g+1
    if g > 255:
      g = 255
      mode = 2

  if mode == 2:
    b = b + 1
    if b > 255:
      b = 255
      mode = 3

  if mode == 3:
    r = r - 1
    if r < 0:
      r = 0
      mode = 4

  if mode == 4:
    g = g - 1
    if g < 0:
      g = 0
      mode = 5

  if mode == 5:
    r = r + 1
    if r > 255:
      r = 255
      mode = 6

  if mode == 6:
    b = b - 1
    if b < 0:
      b = 0
      mode = 1 
  
  level = 1
  led.fill(Color(r, g, b, level))
  led.update()
  sleep(0.1)
		
led.all_off()


