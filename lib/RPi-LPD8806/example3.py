#!/usr/bin/python

from time import sleep
from LPD8806 import *

num = 32;
led = LEDStrip(num)
#led.setChannelOrder(ChannelOrder.BRG) #Only use this if your strip does not use the GRB order
#led.setMasterBrightness(0.5) #use this to set the overall max brightness of the strip
led.all_off()


#scanner: single color and changing color
for l in range(25):
    for i in range(led.lastIndex*4):
	led.anim_larson_rainbow(2, 0.5)
	led.update()
	sleep(0.03)

led.all_off()



