import random
import math

class Simulation:
    def __init__(self, max_population, histogram_size):
        self.MAX_POPULATION = max_population
        self.HISTOGRAM_SIZE = histogram_size
        self.initialize_population()
        self.brighness = math.sqrt(self.MAX_POPULATION)/math.sqrt(self.HISTOGRAM_SIZE)

    def initialize_population(self):
        self.histogram = [0]*self.HISTOGRAM_SIZE
        for _ in range(self.MAX_POPULATION):
            self.histogram[random.randint(0,self.HISTOGRAM_SIZE-1)]+=1

    def update_population(self):
        hist2 = [0]*self.HISTOGRAM_SIZE
        for i in range(self.HISTOGRAM_SIZE):
            for j in range(self.histogram[i]):
                r = random.randint(-1,1)
                hist2[(i+r)%self.HISTOGRAM_SIZE]+=1
        self.histogram = hist2

    def normalize_brightness(self, value, n):
        return min(1,max(0, value/math.sqrt(n)/self.brighness/2))

    def to_wave_rough(self, n):
        column = [0]*len(self.histogram)
        r = int(n)
        fraction = n-r

        for i in range(self.HISTOGRAM_SIZE):
            for j in range(-r,r):
                v = self.histogram[(i+j)%self.HISTOGRAM_SIZE]
                if j<0:
                    column[i]+=v 
                else:
                    column[i]-=v

            if fraction>0:
                column[i]+=self.histogram[(i-r-1)%self.HISTOGRAM_SIZE]*fraction
                column[i]-=self.histogram[(i+r)%self.HISTOGRAM_SIZE]*fraction
                
            column[i] = self.normalize_brightness(column[i],n)

        return column

    def to_wave_smooth(self, n):
        column = [0]*self.HISTOGRAM_SIZE
        r = int(n)

        for i in range(self.HISTOGRAM_SIZE):
            quarter = 0# r//4
            for j in range(-r+quarter,0+quarter):
                v = self.histogram[(i+j)%self.HISTOGRAM_SIZE]
                k = r+j-quarter
                column[i]+=v*(r-abs(r-1-k*2))/r
                
            for j in range(0-quarter,r-quarter):
                v = self.histogram[(i+j)%self.HISTOGRAM_SIZE]
                k = j+quarter
                column[i]-=v*(r-abs(r-1-k*2))/r

            column[i] = self.normalize_brightness(column[i],n)

        return column     
    
    def to_wave(self, n, smooth=False):
        if smooth:
            return self.to_wave_smooth(n)
        return self.to_wave_rough(n)

    def step(self, generations=1):
        for _ in range(generations):
            self.update_population()


