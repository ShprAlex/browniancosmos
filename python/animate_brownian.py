import pygame
import sys
import math
from brownian_to_wave import Simulation

def main():
    
    pygame.init()

    # Set the dimensions of the canvas
    canvas_width = 1200  # Width in pixels
    canvas_height = 800  # Height in pixels
    histogram_size = 200
    max_population = 10
    cell_size = max(1, 800//histogram_size)  # Size of each cell (square) in pixels
    step_size = 5

    # Calculate the number of columns to fill the whole width of the window
    num_columns = canvas_width // cell_size

    # Create the Pygame screen
    screen = pygame.display.set_mode((canvas_width, canvas_height))

    simulation = Simulation(max_population=max_population, histogram_size=histogram_size )

    # Clock to control the frame rate
    # clock = pygame.time.Clock()
    # clock.tick(100)  # 20 frames per second (adjust as needed)

    # Main loop
    grid = []
    count = 560
    while True:
        count+=1
        simulation.step(step_size)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

        n = int(pow(1.0085, abs((count)%(2060*2)-560)))
        n = min(60,n)
       
        smooth = False #(count//200)%3==0
        red_column = simulation.to_wave(n, smooth)
        green_column = simulation.to_wave(n/2+0.5, smooth)
        blue_column = simulation.to_wave(n/4+0.75, smooth)
        
        # grid.append(column)
        # # Remove the oldest column if the grid size exceeds the number of columns to display
        # if len(grid) > num_columns:
        #     grid.pop(0)
       
        # Draw the grid
        # screen.fill((0, 0, 0))  # Fill the screen with black
        i = count%(num_columns)
        #for i, col in enumerate(grid):
        for j in range(histogram_size):
            #value = col[j]*3+col[j-1]/2+col[j+1]/2
            #blue, green, red = column[j]
            red = red_column[j]
            green = green_column[j]
            blue = blue_column[j]
            
            color = (int(red * 255), int(green * 255), int(blue * 255))  # Use grayscale colors based on value
            pygame.draw.rect(screen, color, pygame.Rect(i * cell_size, j * cell_size, cell_size, cell_size))

        pygame.display.flip()
 

if __name__ == "__main__":

    main()